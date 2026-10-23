// Add nice functions to standard DOM elements: toggleDisplay, hasClass, addJavascript.
// authors unknown, credits go to them

const element_extensions = (function(){ 
    return { 
		// Adding methods to all DOM Elements
		init: function() {
			Element.prototype.toggleDisplay = Element.prototype.toggleDisplay || function () { 
			   this.style.display = (this.style.display === 'none' || this.style.display === '' ? 'block' : 'none' ); 
			};

			// Toggle the display of all the {siblings of the considered DOM Element which have the specified class}  
			Element.prototype.toggleDisplayToSiblingIfClass = Element.prototype.toggleDisplayToSiblingIfClass || function (className) {
			  const elements = this.parentNode.getElementsByClassName(className);
			  for (let i=0; i < elements.length ; i++) {
				   elements[i].toggleDisplay();
			  }
			};

			// @returns whether the considered DOM Element has the specified class 
			Element.prototype.hasClass = Element.prototype.hasClass || function (cls) {
			  return (' ' + this.className + ' ').indexOf(' ' + cls + ' ') > -1;
			};

			// ex : document.head.addJavascript("function f() { alert(); }") ;
			Element.prototype.addJavascript = Element.prototype.addJavascript || function (scriptString) {
			  const s = document.createElement('script');
			  s.setAttribute('type','text/javascript');
			  s.text = scriptString;
			  this.appendChild(s);
			};
    	} 
	};
})();



