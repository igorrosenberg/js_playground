
const js_playground = (function(){ 

	function htmlEntities(str) {
		return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
	}

	const module = {};
	module.attachTo = function(domReferences) {

	  domReferences = domReferences || {};

	  const inputElement = domReferences.inputElement || document.getElementById('input'); 
	  const resultList = domReferences.resultList || document.getElementById('here'); 
	  const helpElmt = domReferences.helpElmt || document.getElementById('help');
	  const clearAll = domReferences.clearAll || document.getElementById('clearAll');
	  const clearErrors = domReferences.clearErrors || document.getElementById('clearErrors');

	  resultList.addEventListener('click', function(event) {
		if (event.target.hasClass('codeToggle')) {
			event.target.toggleDisplayToSiblingIfClass('codeBlock');
			return false;		
			}
		return true;		
		});

	  clearAll.addEventListener('click', function() {
		 // remove all children
		 while (resultList.lastChild) {
		     resultList.removeChild(resultList.lastChild);
		 }
		 lastValue = lastValue + 1 ; 
		 return false; 
	  });

	  clearErrors.addEventListener('click', function() {
		 // remove all children that are errors
		 const errorNodes = resultList.getElementsByClassName('error');
		 while (errorNodes[0]) {  // live list => remove first shrinks list size
		      errorNodes[0].parentNode.removeChild(errorNodes[0]);
		 }
		 lastValue = lastValue + 1 ; 
		 return false; 
	  });

	  let lastValue = ''; 
	  let lastCount;   

	  let noHelp = function() {
		     helpElmt.parentNode.removeChild(helpElmt);
		     noHelp = function() {};
	  };

	  inputElement.addEventListener('keyup', function myFunction()  {

		 setTimeout(
		      function(){ 
		         noHelp ();
		         let result; 
		         const newdiv = document.createElement("LI");
		         try {
					 /*jshint evil:true */
		             result = eval(inputElement.value); 
					 /*jshint evil:false */
		             const addToScripts = document.getElementById('headInjectInput').checked;
		             if (addToScripts) {
		               document.head.addJavascript(inputElement.value);
		             }
		         } catch (e) { 
		            result = e.name + ': ' + e.message; 
		            newdiv.className = "error";
		            } 
		         if (result !== lastValue){
		           lastValue = result ;
		           lastCount = 1 ; 
		         } else {
		           lastCount += 1; 
		           result = '(' + lastCount + ') ' + result  ;
		           resultList.removeChild(resultList.firstChild);
		         }
		         newdiv.innerHTML = 
		              result +  // strings containing HTML tags are  interpreted ! 
		              " <a href='#' class='codeToggle'>code</a>" +  
		              '<div class="codeBlock"><pre>' + htmlEntities(inputElement.value) + '</pre></div>';
		         resultList.insertBefore(
		                 newdiv, resultList.firstChild);
		         },
		      1);    
		        
	  });

	};

	return module;   
})();

