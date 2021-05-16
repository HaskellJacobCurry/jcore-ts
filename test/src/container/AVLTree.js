let {AVLTree} = require('../../../dist/container/AVLTree');

let tree = new AVLTree().insert([33, 42, 35, 45, 1, 1, 33, 1, 2, 9, 44, 43, 34]);

console.log(tree.findByKey(2));
console.log({size: tree.size()});
console.log('inorderTraverse');
tree.inorderTraverse((key, values) => console.log({key, values}));

tree.remove([35, 42, 43]);
tree.insert([33, 45, 100]).remove([9, 1]);

console.log({size: tree.size()});
console.log('inorderTraverse');
tree.inorderTraverse((key, values) => console.log({key, values}));