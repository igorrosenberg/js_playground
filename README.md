## Igor Rosenberg's JS demos

This repo saves *experiments* in JS. The code below should be seen as sandbox futilities. 

Everything is in the gh-pages branch, and can be reached via the
<a href="https://igorrosenberg.github.io/js_playground/">gh-pages index</a>.

#### node server

`node-server.js`, a quick HTTP file server, from <a href="https://stackoverflow.com/questions/16333790">stackoverflow-16333790</a>.

``` 
npm install finalhandler serve-static
cat > node-server.js
node node-server.js 
firefox http://localhost:8000/
``` 

<a href="https://igorrosenberg.github.io/js_playground/node-server.html">Javascript source</a>.


#### js_playground

Immediate feedback while coding in javascript : enter javascript code in the textarea, and the result of the execution is displayed below, whenever a key is pressed.
  
This is similar to 
* <a href="http://www.w3schools.com/html/tryit.asp?filename=tryhtml_script">w3schools tryit editor</a> 
* <a href="http://jsfiddle.net/">jsfiddle</a>
* modern browser's developper "console"   

Find a live version 
<a href="http://igor.rosenberg.free.fr/public/dev/js_playground.html">here</a> 
and 
<a href="https://igorrosenberg.github.io/js_playground/js_playground.htm">here</a>.

#### Is internet alive ?

Via a CORS request, check that a remote site can be reached.

Find a live version here
<a href="https://igorrosenberg.github.io/js_playground/is-internet-alive.html">is-internet-alive?</a>.


#### Dice

A wooden brain-teaser: within a tower, four dice are inserted. They bear one of four colors on each side. The dice can be rotated in any direction. The objective is have each side of the column showing four different colors.

Because I couldn't do it in my head, I wrote a JavaScript solver. Optimizing the first naive version was fun. 

Find a live version here 
<a href="https://igorrosenberg.github.io/js_playground/dice.html">dice</a>.

#### Rewire

Given a server exposing HTML fragments, import them in another 'main' page via AJAX requests. Heavily based on `$.load`, which seems tailored to this exact need.

Find a live version here
<a href="https://igorrosenberg.github.io/js_playground/jquery-rewire.html">jquery-rewire</a>.

#### X-mas tree, or concurrent array updating

Via a long-running process, populate an array. It's a very naive basis for concurrent thinking in JS. 

<a href="https://igorrosenberg.github.io/js_playground/xmas-tree.js">xmas-tree Javascript source</a>.

#### Sort implementation

As a futile exercice, rewrite a well-known sort algorithm.

<a href="https://igorrosenberg.github.io/js_playground/sort-implem.js">sort-implem Javascript source</a>.

#### JQuery disable button

Simple demo of the 'disabled' attribute on a button.

Find a live version here
<a href="https://igorrosenberg.github.io/js_playground/jquery-disabled-test.html">jquery-disabled</a>.

#### AJAX scroll

Test via GET requests an HTTP service


Find a live version here
<a href="https://igorrosenberg.github.io/js_playground/ajax-scroll.html">ajax-scroll</a>.

#### element_extensions.js

Add nice functions to standard DOM elements: toggleDisplay, hasClass, addJavascript.

<a href="https://igorrosenberg.github.io/js_playground/element_extensions.js">element_extensions.js</a>.

