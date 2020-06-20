// Via a long-running process, populate an array. It's a very naive basis for concurrent thinking in JS.

var fibo = function (x) {
  if  (x === 0) 
      return 0;
  if (x === 1)
      return 1;
  else return fibo(x -1) + fibo(x-2);
};

console.log (fibo (11));

var results = {};
results.length = 5;
results.finished = 0;

for (var i=0; i< results.length; i++){
 var time = (results.length - i) % 4;
 my_apply(i, results, time) ;
}

function my_apply (i, results, time) {
  setTimeout(function(){delay(i, results);}, time);      
  };

function  delay(i, results){
  results[i] = fibo(i);
  results.finished +=1;  
  console.log (results);
  if (results.finished === results.length)
    console.log ("done");    
}
