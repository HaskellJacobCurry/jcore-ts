let {OrderedMultiMap} = require('../../../dist/container/OrderedMultiMap');

let tree = (
	new OrderedMultiMap((a, b) => a === b ? 0 : -1)
		.set('lol', 33).set('lol', 91).set('hey', 2)
);

console.log(tree.get('lol'));
console.log({size: tree.size()});
console.log('inorderTraverse');
tree.forEach((key, value) => console.log({key, value}));
((i = 0) => {
	tree.forEach_((k, v) => {
		if (i++ < 2) {
			console.log({k,v});
			return true;
		}
		return false;
	})
})();

tree.unset('hey').unset('yo').unsetOne('lol');

console.log({size: tree.size()});
console.log('inorderTraverse');
tree.forEach((key, value) => console.log({key, value}));