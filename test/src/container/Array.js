let {Array} = require('../../../dist/container/Array_');
let {insertionSort} = require('../../../dist/algorithm/InsertionSort');
let {
	Int
} = require('../../../dist/ts-toolbelt');

let array = new Array([1, 5, 2]);
insertionSort(array.begin(), array.end(), Int.strictWeakOrdering);

for (let i = array.end().prev(), iEnd = array.begin().prev(); !i.equal(iEnd); i = i.prev()) {
	console.log({v: i.read()})
}