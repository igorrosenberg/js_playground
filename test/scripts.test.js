const test = require('node:test');
const assert = require('node:assert');
const { loadScript } = require('./load-script');

test('sort-implem sorts by second character, missing ones last', () => {
    const { sort, compare } = loadScript('sort-implem.js');
    const words = ['hk', 'a', 'cz', 'bx', 'ga', 'de', 'f'];
    sort(words, compare);
    assert.deepStrictEqual(words.slice(0, 5), ['ga', 'de', 'hk', 'bx', 'cz']);
    assert.deepStrictEqual(words.slice(5).sort(), ['a', 'f']);
});

test('oracle getQuestion returns a correct a op b = c', () => {
    const { getQuestion } = loadScript('oracle.js');
    const ops = {
        '+': (a, b) => a + b,
        '-': (a, b) => a - b,
        '*': (a, b) => a * b,
        '/': (a, b) => a / b,
    };
    for (const [op, apply] of Object.entries(ops)) {
        for (let i = 0; i < 200; i++) {
            const [a, b, c] = getQuestion(op);
            assert.strictEqual(apply(a, b), c, `${a} ${op} ${b} = ${c}`);
            assert.ok(c >= 0 && c <= 100, `${op} answer ${c} out of range`);
            if (op === '/') assert.notStrictEqual(b, 0);
        }
    }
});

test('mandelbrot c_mandel1 is 0 inside the set and > 0 outside', () => {
    const { c_mandel1 } = loadScript('mandelbrot.html');
    assert.strictEqual(c_mandel1(0, 0), 0);
    assert.strictEqual(c_mandel1(-1, 0), 0);
    assert.ok(c_mandel1(2, 2) > 0);
    assert.ok(c_mandel1(1, 1) > 0);
    assert.ok(c_mandel1(2, 2) > c_mandel1(0.4, 0.4), 'escapes faster further out');
});

test('dice shift and yaw are permutations, and count scores columns', () => {
    const page = loadScript('dice.html');
    const before = page.diceArray[1].slice();
    const faces = (dice) => dice.map((face) => face.x).sort();

    page.shift(1);
    assert.deepStrictEqual(faces(page.diceArray[1]), faces(before));
    page.shift(1);
    page.shift(1);
    page.shift(1);
    assert.deepStrictEqual(page.diceArray[1], before, 'four shifts go back to the start');

    page.yaw(1);
    assert.deepStrictEqual(faces(page.diceArray[1]), faces(before));
    page.yaw(1);
    page.yaw(1);
    page.yaw(1);
    assert.deepStrictEqual(page.diceArray[1], before, 'four yaws go back to the start');

    const score = page.count();
    assert.ok(score >= 0 && score <= 4);
});
