let {OrderedMap} = require('../../../dist/container/OrderedMap');

let tree = (
	new OrderedMap((a, b) => a === b ? 0 : -1)
		.set('lol', 33).set('lol', 91).set('hey', 2)
);

console.log(tree.findByKey('lol'));
console.log({size: tree.size()});
console.log('inorderTraverse');
tree.inorderTraverse((key, values) => console.log({key, values}));

tree.unset('hey').unset('yo').unset('lol').set('hey', 23).set('hey', 3);

console.log({size: tree.size()});
console.log('inorderTraverse');
tree.inorderTraverse((key, values) => console.log({key, values}));