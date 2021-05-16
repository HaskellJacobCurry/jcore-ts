let {SelectionSort} = require('../../../../dist/algorithm/common/SelectionSort');
let {_min} = require('../../../../dist/algorithm/common/Min');
let {Int} = require('../../../../dist/ts-toolbelt');
let {Array} = require('../../../../dist/container/Array')

let as = [1, 7, 2, 11, 3, -2, -100, 1000, 200, 99];
let array = new Array(as);
SelectionSort.fn(array.begin(), array.end(), Int.strictWeakOrdering);
console.log(as)