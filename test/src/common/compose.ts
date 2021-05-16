import {compose} from '../../../dist/common/compose'
import {Int} from '../../../dist/ts-toolbelt'

let f = (
	compose(
		(a: string) => [a],
		(a) => `${a}`,
		(a: Int) => a * 2
	)
)
let v = f(3);
console.log(v)