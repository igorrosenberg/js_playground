const test = require('node:test');
const assert = require('node:assert');
const fs = require('fs');
const http = require('http');
const path = require('path');
const { chromium } = require('playwright');

const docs = path.join(__dirname, '..', 'docs');
const pages = fs.readdirSync(docs).filter(file => file.endsWith('.html'));
const types = { '.html': 'text/html', '.js': 'text/javascript', '.json': 'application/json',
    '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.gif': 'image/gif' };

let server, browser, base;

test.before(async () => {
    server = http.createServer((req, res) => {
        const file = path.join(docs, decodeURIComponent(new URL(req.url, 'http://x').pathname));
        if (!file.startsWith(docs) || !fs.existsSync(file) || fs.statSync(file).isDirectory()) {
            res.writeHead(404).end();
            return;
        }
        res.writeHead(200, { 'Content-Type': types[path.extname(file).toLowerCase()] || 'application/octet-stream' });
        fs.createReadStream(file).pipe(res);
    });
    await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
    base = `http://127.0.0.1:${server.address().port}/`;
    browser = await chromium.launch();
});

test.after(async () => {
    await browser?.close();
    server?.close();
});

for (const page of pages) {
    test(`${page} loads without console errors`, async () => {
        const tab = await browser.newPage();
        const errors = [];
        tab.on('console', msg => msg.type() === 'error' && errors.push(`${msg.text()} (${msg.location().url})`));
        tab.on('pageerror', err => errors.push(err.message));
        try {
            await tab.goto(base + page, { waitUntil: 'load' });
            await tab.waitForTimeout(500);
        } finally {
            await tab.close();
        }
        assert.deepStrictEqual(errors, []);
    });
}
