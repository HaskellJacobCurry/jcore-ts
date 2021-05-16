let {_insertionSort, insertionSort} = require('../../../../dist/algorithm/common/InsertionSort');
let {Int} = require('../../../../dist/ts-toolbelt');
let {Array} = require('../../../../dist/container/Array')

let as = [1, 7, 2, 11, 3, -2, -100, 1000, 200, 99];
let array = new Array(as);
insertionSort(array.begin(), array.end(), Int.strictWeakOrdering);
//_insertionSort(as, Int.strictWeakOrdering);
console.log(as)