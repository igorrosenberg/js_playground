// As a futile exercice, rewrite a well-known sort algorithm.

const compare = function (x, y) {
    if (x[1] === undefined) return false;
    if (y[1] === undefined) return true;
    return x[1] < y[1];
};

const sort = function (array, compare) {
    const max = array.length;
    for (let i = 1; i < max; i++) {
        console.log(array);
        let j = 0;
        while (j < i) {
            const c = compare(array[j], array[i]);
            console.log('a[' + j + ']=' + array[j] + ' a[' + i + ']=' + array[i] + ' c? ' + c);
            if (c === false) {
                const t = array[i];
                for (let k = i; k > j; k--) {
                    array[k] = array[k - 1];
                }
                array[j] = t;
                break;
            }
            j++;
        }
    }
};

const test = ['a', 'bx', 'cz', 'de', 'f', 'ga', 'hk'];

//console.log (test);
sort(test, compare);
console.log(test);
/*
  const max = test.length;
  for (let i=0; i < max; i++) {
    console.log (test[i] + " " +  test[i][1]);
  }
*/
