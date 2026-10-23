// extra.js: a minimal side-effect script, to try out loading extra JS into the JS playground.
//
// It has no exports: importing it only runs the console.log below. Because it
// has no `export`, it also still works as a classic <script src="extra.js">.
//
// How to use it from js_playground.js
// -----------------------------------
// js_playground.js is a classic script (not a module), so a static
// `import './extra.js';` at its top would be a syntax error. Use the dynamic
// import() form instead, which works in classic scripts too, e.g. inside
// module.attachTo():
//
//     import('./extra.js')
//       .then(function () { console.log('extra.js loaded'); })
//       .catch(function (e) { console.error('extra.js failed to load', e); });
//
// The path is resolved against js_playground.js's own URL, so './extra.js'
// finds this file next to it in docs/.
//
// Turning js_playground.js into a module (<script type="module">) would allow
// a static `import './extra.js';`, but its top-level `const js_playground` would
// then no longer be a global, so the inline script in js_playground.html would
// need `window.js_playground = js_playground;` or to import it as well.
//
// From the playground page itself, typing this in the textarea works too,
// since eval() supports dynamic import():
//
//     import('./extra.js')
//
// Modules are cached, so the message is only logged once, even though the
// playground re-evaluates the code on every keystroke.
//
// Note: browsers refuse to load modules from file:// URLs. Serve docs/ over
// HTTP (for example with node-server.js) or use the GitHub Pages site.

console.log( "some extra js" );
