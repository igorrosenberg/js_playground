var compare = function (x,y) { 
  if  (x[1] === undefined) 
      return false;
  if (y[1] === undefined)
      return true;
  return x[1] < y[1];
};

var sort = function (array, compare) {
  var max = array.length;
  for (var i=1; i < max; i++) {
    console.log (array);
    var j = 0; 
    while (j < i) {
       var c = compare(array[j] , array[i])
       console.log ( "a["+j+"]=" + array[j] + " a["+i+"]=" + array[i] + " c? " + c);
       if (c === false) {
         var t = array[i];
         for(var k=i; k >j; k--){
           array[k] = array[k-1];           
         }
         array[j] = t;
         break;    
       }  
      j++;
    }
 }
};

var test = ['a' , 'bx' , 'cz' , 'de', 'f' , 'ga', 'hk'];


//console.log (test);
sort(test, compare);
console.log (test);
/*
  var max = test.length;
  for (var i=0; i < max; i++) {
    console.log (test[i] + " " +  test[i][1]);
  }
*/  
