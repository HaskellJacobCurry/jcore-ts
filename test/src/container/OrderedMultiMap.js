let {OrderedMultiMap} = require('../../../dist/container/OrderedMultiMap');

let tree = (
	new OrderedMultiMap((a, b) => a === b ? 0 : -1)
		.set('lol', 33).set('lol', 91).set('hey', 2)
);

console.log(tree.get('lol'));
console.log({size: tree.size()});
console.log('inorderTraverse');
tree.forEach((key, value) => console.log({key, value}));

tree.unset('hey').unset('yo').unset('lol');

console.log({size: tree.size()});
console.log('inorderTraverse');
tree.forEach((key, value) => console.log({key, value}));