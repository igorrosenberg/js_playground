const js = require('@eslint/js');
const globals = require('globals');
const html = require('eslint-plugin-html');

module.exports = [
    { ignores: ['docs/lib/**', 'node_modules/**'] },
    js.configs.recommended,
    {
        rules: {
            // Top-level functions are often only called from onclick attributes,
            // and handlers keep their (event, ...) signature for readability.
            'no-unused-vars': ['error', { vars: 'local', args: 'none', caughtErrors: 'none' }],
        },
    },
    {
        // Demo pages: classic browser scripts, inline or in docs/*.js.
        files: ['docs/**/*.js', 'docs/**/*.html'],
        plugins: { html },
        languageOptions: {
            sourceType: 'script',
            globals: {
                ...globals.browser,
                ...globals.jquery,
                // Loaded from a <script> tag on the pages that use them.
                Konva: 'readonly',
                easytimer: 'readonly',
                // Defined in docs/js_playground.js, used by js_playground.html.
                js_playground: 'readonly',
            },
        },
        rules: {
            // Pages define their own stop(), moveTo()... on purpose.
            'no-redeclare': ['error', { builtinGlobals: false }],
        },
    },
    {
        // `<\/div>` inside an inline script is needed to not close the tag.
        files: ['docs/**/*.html'],
        rules: { 'no-useless-escape': 'off' },
    },
    {
        files: ['docs/node-server.js', 'build.js', 'static-server.js', 'vendor.js', 'eslint.config.js', 'test/**/*.js'],
        languageOptions: { sourceType: 'commonjs', globals: globals.node },
    },
];
