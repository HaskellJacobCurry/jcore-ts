import {trampoline__} from '../../../dist/Common/trampoline_'
import {Promise} from '../../../dist/Common/Promise'
import {
	apply
} from '../../../dist/Common'

apply(
	trampoline__<[number, number?], number>((s, n: number, acc = 0) => (
		n == 0 ? Promise.resolve(acc) : (
			Promise.await(1e3)
				.then(() => console.log(n))
				.then(() => s(n - 1, acc + n))
		)
	))
)(_ => _(1e1))
	.then(_ => console.log({_}));