// https://www.sitepoint.com/beginners-guide-node-package-manager/
// npm install && node build.js

const fs = require('fs');
const cheerio = require('cheerio');

const root = "docs";
const homeUrl = "https://igorrosenberg.github.io/js_playground";
const readme = "README.md";

const exclusions = [
    'index.html',
    'extra.js',
    'jquery-rewire-fragment.html',
    'js_playground.js',
    'oracle.js',
    'node-server.js'
];

let stream = ''; // fs.createWriteStream("output.txt");

function write(s) {
    stream += s + "\n"; // stream.write(s + "\n");
}

write(`## Igor Rosenberg's JS demos

This repo saves *experiments* in JS. The code below should be seen as sandbox futilities.

#### node server

\`node-server.js\`, a quick HTTP file server, from <a href="https://stackoverflow.com/questions/16333790">stackoverflow-16333790</a>.

\`\`\`
npm install finalhandler serve-static
cat > node-server.js
node node-server.js
firefox http://localhost:8000/
\`\`\`
<a href="https://igorrosenberg.github.io/js_playground/node-server.js">Javascript source</a>.
`);




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
    let liveLink = `<a href="${homeUrl}/${file}">Live Version</a>`;
    write(`#### ${title}`);
    write("");
    write(description);
    write(liveLink);
    write("");

});

// stream.end();
// stream.close();

console.log(fs.readFileSync(readme).toString() == stream.toString());