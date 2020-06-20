## Igor Rosenberg's JS demos

This repo saves *experiments* in JS. The code below should be seen as sandbox futilities.

#### node server

`node-server.js`, a quick HTTP file server, from <a href="https://stackoverflow.com/questions/16333790">stackoverflow-16333790</a>.

```
npm install finalhandler serve-static
cat > node-server.js
node node-server.js
firefox http://localhost:8000/
```
<a href="https://igorrosenberg.github.io/js_playground/node-server.js">Javascript source</a>.

#### AJAX scroll

Test an HTTP service via GET requests.
<a href="https://igorrosenberg.github.io/js_playground/ajax_scroll.html">Live Version</a>

#### Micro audio demo

Demo of the <audio> html tag.
<a href="https://igorrosenberg.github.io/js_playground/audio.html">Live Version</a>

#### Basic trigonometry

I needed some trig refreshers, for some image analysis project.
So I coded some math illustrations.
<a href="https://igorrosenberg.github.io/js_playground/basic-trigonometry.html">Live Version</a>

#### Dynamic tabs

Bootstrap dynamic tabs: add a tab if missing, then delete it on click.
<a href="https://igorrosenberg.github.io/js_playground/bootstrap-tabs.html">Live Version</a>

#### Using mobile camera

Use the device's image capture, crop the image, then send via XHR.
<a href="https://igorrosenberg.github.io/js_playground/camera.html">Live Version</a>

#### Claude's hex game

A brain-teaser: translate and rotate the pieces.
Colored paths form as the pieces touch each other.
Can you make 3 continuous paths: red, blue, yellow ?

Because I couldn't do it in my head, I wrote a JavaScript solver. Current version works nicely, but a complete rewrite is needed.
<a href="https://igorrosenberg.github.io/js_playground/claudes-hex-game.html">Live Version</a>

#### Dice run

A wooden brain-teaser: within a tower, four dice are inserted. They bear one of four colors on each side. The dice can be rotated in any direction. The objective is have each side of the column showing four different colors.

Because I couldn't do it in my head, I wrote a JavaScript solver. Optimizing the first naive version was fun.
<a href="https://igorrosenberg.github.io/js_playground/dice.html">Live Version</a>

#### element_extensions.js

Add nice functions to standard DOM elements: toggleDisplay, hasClass, addJavascript.
<a href="https://igorrosenberg.github.io/js_playground/element_extensions.js">Live Version</a>

#### Image I/O

Using `canvas` and `<input type="file">`, extract a region from an image. Still work in progress!
<a href="https://igorrosenberg.github.io/js_playground/image_io.html">Live Version</a>

#### Is internet alive ?

Via a CORS request, check that a remote site can be reached. This could be the start of an SPA monitoring framework.
<a href="https://igorrosenberg.github.io/js_playground/is-internet-alive.html">Live Version</a>

#### JQuery disable button

Simple demo of the 'disabled' attribute on a button.
<a href="https://igorrosenberg.github.io/js_playground/jquery-disabled-test.html">Live Version</a>

#### JQuery rewire

Given a server exposing HTML fragments, import them in another 'main' page via AJAX requests.
Heavily based on `$.load`, which seems tailored to this exact need.
<a href="https://igorrosenberg.github.io/js_playground/jquery-rewire.html">Live Version</a>

#### JS playground

Immediate feedback while coding in javascript : enter javascript code in the textarea,
and the result of the execution is displayed below, whenever a key is pressed.


This is similar to the w3schools tryit editor or jsfiddle or any modern browser's developper "console".
<a href="https://igorrosenberg.github.io/js_playground/js_playground.html">Live Version</a>

#### Oracle

Ask and answer questions.
<a href="https://igorrosenberg.github.io/js_playground/oracle.html">Live Version</a>

#### sort-implem.js

As a futile exercice, rewrite a well-known sort algorithm.
<a href="https://igorrosenberg.github.io/js_playground/sort-implem.js">Live Version</a>

#### Timer

Simple Countdown Timer.
<a href="https://igorrosenberg.github.io/js_playground/timer.html">Live Version</a>

#### xmas-tree.js

Via a long-running process, populate an array. It's a very naive basis for concurrent thinking in JS.
<a href="https://igorrosenberg.github.io/js_playground/xmas-tree.js">Live Version</a>

