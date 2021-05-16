let {trampoline} = require('../../../dist/common/trampoline');

console.log(
	trampoline((s, n, acc = 0) => (
		n == 0 ?
		acc :
		s(n - 1, acc + n)
	))(1e5)
);