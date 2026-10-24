const test = require('node:test');
const assert = require('node:assert');
const { spawnSync } = require('child_process');
const path = require('path');

test('docs/lib matches the library versions in package.json', () => {
    const run = spawnSync(process.execPath, [path.join(__dirname, '..', 'vendor.js'), '--check'], { encoding: 'utf8' });
    assert.strictEqual(run.status, 0, run.stderr);
});
