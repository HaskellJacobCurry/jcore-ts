import {_quickSort, quickSort} from '../../../../dist/algorithm/common/QuickSort'
import {Int} from '../../../../dist/ts-toolbelt'
import {Array} from '../../../../dist/container/Array'

let as = [1, 7, 2, 11, 3, -2, -100, 1000, 200, 99];
let array = new Array(as);
quickSort(array.begin(), array.end(), Int.strictWeakOrdering);
//_quickSort(as, 0, as.length, Int.strictWeakOrdering);
console.log(as)