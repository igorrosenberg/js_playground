const test = require('node:test');
const assert = require('node:assert');
const path = require('path');
const { chromium } = require('playwright');
const { serve } = require('../static-server');

let server, browser, base;

test.before(async () => {
    ({ server, base } = await serve(path.join(__dirname, '..', 'docs')));
    browser = await chromium.launch();
});

test.after(async () => {
    await browser?.close();
    server?.close();
});

// Real axis 0..1 and imaginary axis -2..-1, so a mix-up between them shows.
async function openView() {
    const tab = await browser.newPage();
    await tab.goto(base + 'mandelbrot.html', { waitUntil: 'load' });
    await tab.fill('#minX', '0');
    await tab.fill('#maxX', '1');
    await tab.fill('#minY', '-2');
    await tab.dispatchEvent('#zoomControl', 'input');
    return tab;
}

test('clicking the canvas reports the point under the cursor', async () => {
    const tab = await openView();
    try {
        // A quarter across and three quarters down: about 0.25 - 1.25i (the canvas border shifts it a pixel).
        await tab.click('#canvas', { position: { x: 50, y: 150 } });
        assert.match(await tab.textContent('#output-text'), /trans=0\.2\d, -1\.2\d/);
    } finally {
        await tab.close();
    }
});

test('the arrow buttons move the view the way they point', async () => {
    const tab = await openView();
    const minX = async () => Number(await tab.inputValue('#minX'));
    try {
        await tab.click('#left');
        assert.strictEqual(await minX(), -0.25);
        await tab.click('#right');
        await tab.click('#right');
        assert.strictEqual(await minX(), 0.25);
    } finally {
        await tab.close();
    }
});
