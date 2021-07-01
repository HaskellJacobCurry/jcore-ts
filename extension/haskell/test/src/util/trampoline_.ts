import {trampoline__} from '../../../dist/util/trampoline_'
import {Promise} from '../../../dist/util/Promise'
import {
	apply
} from '../../../dist/util'

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