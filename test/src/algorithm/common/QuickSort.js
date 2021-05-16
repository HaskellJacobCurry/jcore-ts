let {_quickSort, QuickSort} = require('../../../../dist/algorithm/common/QuickSort');
let {Int} = require('../../../../dist/ts-toolbelt');
let {Array} = require('../../../../dist/container/Array')

let as = [1, 7, 2, 11, 3, -2, -100, 1000, 200, 99, -45, 900];
let array = new Array(as);
QuickSort.fn(array.begin(), array.end(), Int.strictWeakOrdering);
//_quickSort(as, 0, as.length, Int.strictWeakOrdering);
console.log(as)