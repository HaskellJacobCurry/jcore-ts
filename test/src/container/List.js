let {List} = require('../../../dist/container/List');

let list = List.range(1, 1e1);
let list0 = list.append(List.range(11, 14)).flatMap(List.range(1, 3).map(_ => v => v * _).reverse());
list0.foldr((v, _) => console.log({v}), undefined);
console.log(
	list.foldl((acc, v) => acc + v, 0)
);
list = list.filter(v => v % 2 == 0);
list.foldr((v, _) => console.log({v}), undefined);