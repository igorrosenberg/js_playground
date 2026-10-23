// Copies the browser libraries from node_modules into docs/lib.
// npm install && node vendor.js           refresh docs/lib
// node vendor.js --check                  fail if docs/lib is out of date

const fs = require('fs');
const path = require('path');

const lib = path.join(__dirname, 'docs', 'lib');

// File served in docs/lib -> file in node_modules.
// Names carry no version, so a Dependabot bump only changes the files below.
const files = {
    'bootstrap.min.css': 'bootstrap/dist/css/bootstrap.min.css',
    'bootstrap.min.js': 'bootstrap/dist/js/bootstrap.min.js',
    'easytimer.min.js': 'easytimer.js/dist/easytimer.min.js',
    'html5shiv.min.js': 'html5shiv/dist/html5shiv.min.js',
    'jquery.min.js': 'jquery/dist/jquery.min.js',
    'konva.min.js': 'konva/konva.min.js',
    'moment.min.js': 'moment/min/moment.min.js',
    'moment-timezone-10-year-range.min.js': 'moment-timezone/builds/moment-timezone-with-data-10-year-range.min.js',
    'respond.min.js': 'respond.js/dest/respond.min.js',
};

// The .map files are not copied, so drop the comment that points to them.
function read(source) {
    const text = fs.readFileSync(path.join(__dirname, 'node_modules', source), 'utf8');
    return text.replace(/\n\/[/*]# sourceMappingURL=\S+( \*\/)?\s*$/, '\n');
}

const check = process.argv.includes('--check');
const stale = [];

for (const [name, source] of Object.entries(files)) {
    const target = path.join(lib, name);
    const text = read(source);
    if (fs.existsSync(target) && fs.readFileSync(target, 'utf8') === text) continue;
    stale.push(name);
    if (!check) fs.writeFileSync(target, text);
}

for (const name of fs.readdirSync(lib)) {
    if (name in files) continue;
    stale.push(name);
    if (!check) fs.unlinkSync(path.join(lib, name));
}

if (check && stale.length) {
    console.error(`docs/lib is out of date (${stale.join(', ')}): run npm run vendor`);
    process.exit(1);
}
console.log(stale.length ? `docs/lib updated: ${stale.join(', ')}` : 'docs/lib is up to date');
