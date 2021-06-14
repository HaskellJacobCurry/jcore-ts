import {Maybe} from '../../../dist/Data/Maybe'
import {String} from '../../../dist/Data/String'
import {Int} from '../../../dist/Data/Int'
import {
	Function
} from '../../../dist/util/common'

let maybeStr = (
	Maybe.Apply.liftA2((a: Int) => (b: Int) => (
		Function.assign(
			Int.Show.show(Int.Ring.mul(a)(b))
		)(_ => String.fromI(_))
	))(Maybe.Just(Int(33)))(Maybe.Just(Int(11)))
);
console.log(
	Maybe.Show(String.Show).show(maybeStr).toString()
)

let a = (
	Maybe.Apply.fstAp(Maybe.Just(Int(3)))(Maybe.Just(String('shit')))
);
let b = (
	Function.assign((b: String) => (a: Int) => (
		String.Semigroup.append(b)(String.fromI(Int.Show.show(a)))
	))(_ => Maybe.Foldable.foldl(_)(String('-101-'))(a))
);
console.log(
	Maybe.Show(Int.Show).show(a).toString()
)
console.log(
	b.toString()
)