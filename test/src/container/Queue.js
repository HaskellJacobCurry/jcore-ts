let {Queue} = require('../../../dist/container/Queue');

let queue = new Queue();
queue.enqueue(3, 4, 1, 44, 9, 3, 11, 98);
console.log(queue);
while (!(queue.size()< 4)) {
	let value = queue.dequeue();
	console.log({value});
}
console.log(queue);