let {BinarySearchTreeAVL} = require('../../../dist/container/BinarySearchTreeAVL');

let tree = new BinarySearchTreeAVL().insert([33, 42, 35, 45, 1, 1, 33, 1, 2, 9, ]);

console.log(tree.findByKey(2));
console.log({size: tree.size()});
console.log('inorderTraverse');
tree.inorderTraverse((key, values) => console.log({key, values}));

tree.remove([33, 45, 35,]);
console.log({size: tree.size()});
console.log('inorderTraverse');
tree.inorderTraverse((key, values) => console.log({key, values}));