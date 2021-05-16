import {trampoline} from '../../../dist/common/trampoline'
import {
	Int
} from '../../../dist/ts-toolbelt'

console.log(
	trampoline<[Int, Int?], Int>((s, n, acc = 0) => (
		n == 0 ?
		acc :
		s(n - 1, acc + n)
	))(1e4)
);