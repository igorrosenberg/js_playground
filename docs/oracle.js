function deleteChild(e) {
    var child = e.lastElementChild;
    while (child) {
        e.removeChild(child);
        child = e.lastElementChild;
    }
}

function responseListener(answer, responseElem, next) {
    return function () {
        if (responseElem.value == answer) {
            responseElem.className = 'good';
            responseElem.setAttribute("readonly", "true");
            next();
        } else {
            responseElem.className = 'bad';
        }
    }
}

function start() {
    deleteChild(document.body);
    var title = document.createElement('h1')
    title.innerHTML = "Test d'arithmétique";
    document.body.append(title);
}

function rand() {
    return Math.floor(Math.random() * 11);
}

function getQuestion(operator) {
    var a, b, c;
    if (operator == '*') {
        a = rand();
        b = rand();
        c = a * b;
    } else if (operator == '+') {
        a = rand();
        b = rand();
        c = a + b;
    } else if (operator == '-') {
        c = rand();
        b = rand();
        a = c + b;
    } else if (operator == '/') {
        c = rand();
        b = rand();
        if (b == 0) b = 2;
        a = b * c;
    }

    return [a, b, c];
}

var startDate = new Date();
var MAX = 1
var questionNb = 0;
var operator;

function setOperator() {
    if (questionNb++ < 1 * MAX)
        operator = '+';
    else if (questionNb < 2 * MAX)
        operator = '-';
    else if (questionNb < 3 * MAX)
        operator = '*';
    else if (questionNb < 4 * MAX)
        operator = '/';
}

function victoire() {
    var block = document.createElement('p')
    var delta = Math.floor((new Date().getTime() - startDate.getTime()) / 1000);
    block.innerHTML = "Tu as gagné! Ton temps: " + delta + " secondes";
    document.body.append(block);
}

function ask() {

    if (questionNb >= 4 * MAX)
        return victoire();
    setOperator();
    var data = getQuestion(operator);

    var block = document.createElement('div')
    var questionElem = document.createElement('span');
    questionElem.innerHTML = data[0] + ' ' + operator + ' ' + data[1] + ' =';
    block.append(questionElem);

    var answerElem = document.createElement('input');
    block.append(answerElem);
    answerElem.addEventListener(
        'input',
        responseListener(data[2], answerElem, ask)
    );

    document.body.append(block);
    answerElem.focus();
    return answerElem;
}

start();
ask();
