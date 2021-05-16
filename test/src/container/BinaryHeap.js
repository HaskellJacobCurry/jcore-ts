let {BinaryHeap} = require('../../../dist/container/BinaryHeap');

let heap = new BinaryHeap().push([6, 3, 1, 10, 55, 5]);
heap.buildHeap();
console.log(heap)