import {promisedTrampoline} from '../../../dist/common/promisedTrampoline'
import {Int} from '../../../dist/ts-toolbelt/Int'

promisedTrampoline<[Int, Int?], Int>((s, n, acc = 0) => (
	n == 0 ? acc : s(n - 1, acc + n)
))(1e5)
	.then(_ => console.log({_}));