// Runs a browser script from docs/ in a sandbox with a do-nothing DOM,
// so its top-level functions can be tested from Node.

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const docs = path.join(__dirname, '..', 'docs');

// Any property, call or `new` on the stub returns the stub again,
// except child lookups, which return null so `while (child)` loops end.
function stub() {
    const target = function () {};
    const proxy = new Proxy(target, {
        get(t, key) {
            if (key === Symbol.toPrimitive) return () => 0;
            if (key === Symbol.iterator) return function* () {};
            if (key === 'then') return undefined;
            if (key === 'length') return 0;
            if (typeof key === 'string' && /Child$/.test(key)) return null;
            return proxy;
        },
        set() {
            return true;
        },
        apply() {
            return proxy;
        },
        construct() {
            return proxy;
        },
    });
    return proxy;
}

// Source of a .js file, or of the inline <script> blocks of an .html file.
function source(file) {
    const text = fs.readFileSync(path.join(docs, file), 'utf8');
    if (!file.endsWith('.html')) return text;
    const blocks = [...text.matchAll(/<script(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/g)];
    return blocks.map((m) => m[1]).join('\n');
}

function loadScript(file) {
    const context = {
        console: { log() {}, warn() {}, error() {} },
        document: stub(),
        window: stub(),
        performance,
        Math,
        setTimeout() {},
    };
    vm.createContext(context);
    vm.runInContext(source(file), context, { filename: file });
    // Top-level let/const are not properties of the global object, so look up
    // any name the context lacks by evaluating it inside the context.
    return new Proxy(context, {
        get(target, key) {
            if (key in target || typeof key !== 'string') return target[key];
            return vm.runInContext(`typeof ${key} === 'undefined' ? undefined : ${key}`, target);
        },
    });
}

module.exports = { loadScript };
