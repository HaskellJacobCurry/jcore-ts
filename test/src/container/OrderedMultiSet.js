let {OrderedMultiSet} = require('../../../dist/container/OrderedMultiSet');

let tree = (
	new OrderedMultiSet((a, b) => a < b ? 1 : b < a ? -1 : 0)
		.add([33, 42, 35, 45, 1, 1, 33, 1, 2, 9, 44, 43, 34, 45])
);

console.log(tree.findByKey(2));
console.log({size: tree.size()});
tree.inorderTraverse((key, values) => console.log({key, values}));
let i = 0;
tree.forEach_(v => {
	if (i++ < 1) {
		console.log({v});
		return true;
	}
	return false;
});
console.log('remove 1*3, max, min, min');
tree.removeOne_(1).removeOne_(1).removeOne_(1).removeMax().removeMin();
console.log({size: tree.size()});
tree.forEach(v => console.log({v}))

tree.remove([35, 42, 43]);
tree.insert([33, 45, 100]).remove([9, 1]);

console.log({size: tree.size()});
console.log('inorderTraverse');
tree.inorderTraverse((key, values) => console.log({key, values}));