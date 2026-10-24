const test = require('node:test');
const assert = require('node:assert');
const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

const docs = path.join(__dirname, '..', 'docs');
const pages = fs.readdirSync(docs).filter((file) => file.endsWith('.html'));

for (const page of pages) {
    test(`${page} has a title and its local files exist`, () => {
        const $ = cheerio.load(fs.readFileSync(path.join(docs, page)));
        assert.ok($('head title').text().trim(), 'missing <title>');

        const refs = $('script[src], link[href], img[src]')
            .map((i, el) => $(el).attr('src') || $(el).attr('href'))
            .get()
            .filter((ref) => !/^([a-z]+:)?\/\//i.test(ref) && !/^(data|mailto):/.test(ref));
        for (const ref of refs) {
            const file = path.join(docs, ref.split(/[?#]/)[0]);
            assert.ok(fs.existsSync(file), `${ref} not found`);
        }
    });
}

for (const page of pages) {
    test(`${page} declares a language and a phone viewport`, () => {
        const $ = cheerio.load(fs.readFileSync(path.join(docs, page)));
        assert.ok($('html').attr('lang'), 'missing <html lang>');
        assert.strictEqual($('meta[name=viewport]').attr('content'), 'width=device-width, initial-scale=1');
    });
}

for (const page of pages) {
    test(`${page} loads no script, stylesheet or image from another site`, () => {
        // Raw source, so tags inside <!--[if IE]> comments are checked too.
        const html = fs.readFileSync(path.join(docs, page), 'utf8');
        const external = /^([a-z]+:)?\/\//i;
        const tags = html.match(/<(script|link|img)\b[^>]*>/gi) || [];
        const urls = tags
            .filter((tag) => /^<(script|img)/i.test(tag) || /rel=["']?stylesheet/i.test(tag))
            .map((tag) => (tag.match(/\b(?:src|href)=["']?([^"'\s>]+)/i) || [])[1])
            .filter(Boolean);
        const imports = [...html.matchAll(/@import\s+(?:url\()?["']?([^"')\s;]+)|url\(["']?([^"')]+)/gi)].map(
            (m) => m[1] || m[2],
        );
        assert.deepStrictEqual(
            [...urls, ...imports].filter((url) => external.test(url)),
            [],
        );
    });
}
