const test = require('node:test');
const assert = require('node:assert');
const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

const docs = path.join(__dirname, '..', 'docs');
const pages = fs.readdirSync(docs).filter(file => file.endsWith('.html'));

for (const page of pages) {
    test(`${page} has a title and its local files exist`, () => {
        const $ = cheerio.load(fs.readFileSync(path.join(docs, page)));
        assert.ok($('head title').text().trim(), 'missing <title>');

        const refs = $('script[src], link[href], img[src]')
            .map((i, el) => $(el).attr('src') || $(el).attr('href'))
            .get()
            .filter(ref => !/^([a-z]+:)?\/\//i.test(ref) && !/^(data|mailto):/.test(ref));
        for (const ref of refs) {
            const file = path.join(docs, ref.split(/[?#]/)[0]);
            assert.ok(fs.existsSync(file), `${ref} not found`);
        }
    });
}
