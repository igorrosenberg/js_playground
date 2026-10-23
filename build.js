// https://www.sitepoint.com/beginners-guide-node-package-manager/
// npm install && node build.js

const fs = require('fs');
const cheerio = require('cheerio');

const root = "docs";
const homeUrl = "https://igorrosenberg.github.io/js_playground";

const exclusions = [
    'index.html',
    'extra.js',
    'jquery-rewire-fragment.html',
    'js_playground.js',
    'oracle.js',
    'node-server.js'
];

const pages = [];

fs.readdirSync(root).forEach(file => {
    for (let i=0; i<exclusions.length; i++)
    if (file == exclusions[i]) {
        return
    }
    let title, description ;
    if (file.match(/\.html$/)) {
        const $ = cheerio.load(fs.readFileSync(root + '/' + file));
        title = $('head title').text();
        description = $('#description').text().trim();
    } else if (file.match(/\.js$/)) {
        title = file;
        description = fs.readFileSync(root + '/' + file).toString().split(/\n/)[0].substr(3);
    } else {
        return;
    }
    pages.push({ file, title, description, url: `${homeUrl}/${file}` });
});

console.log(`${pages.length} pages found in ${root}/`);
