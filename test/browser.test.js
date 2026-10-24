const test = require('node:test');
const assert = require('node:assert');
const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');
const { serve } = require('../static-server');

const docs = path.join(__dirname, '..', 'docs');
const pages = fs.readdirSync(docs).filter((file) => file.endsWith('.html'));

let server, browser, base;

test.before(async () => {
    ({ server, base } = await serve(docs));
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
        tab.on('console', (msg) => msg.type() === 'error' && errors.push(`${msg.text()} (${msg.location().url})`));
        tab.on('pageerror', (err) => errors.push(err.message));
        try {
            await tab.goto(base + page, { waitUntil: 'load' });
            await tab.waitForTimeout(500);
        } finally {
            await tab.close();
        }
        assert.deepStrictEqual(errors, []);
    });
}

test('js_playground.html evaluates typed code', async () => {
    const tab = await browser.newPage();
    const errors = [];
    tab.on('console', (msg) => msg.type() === 'error' && errors.push(msg.text()));
    tab.on('pageerror', (err) => errors.push(err.message));
    let results;
    try {
        await tab.goto(base + 'js_playground.html', { waitUntil: 'load' });
        await tab.fill('#input', '6 * 7');
        await tab.press('#input', 'End');
        await tab.waitForTimeout(500);
        results = await tab.locator('#here li').allTextContents();
    } finally {
        await tab.close();
    }
    assert.deepStrictEqual(errors, []);
    assert.match(results[0] ?? '', /^42 /);
});
