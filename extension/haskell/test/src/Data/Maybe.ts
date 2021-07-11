import {Maybe} from '../../../dist/Instance/Data/Maybe'
import {String} from '../../../dist/Instance/Data/String'
import {Int} from '../../../dist/Instance/Data/Int'
import {
	assign
} from '../../../dist/Common'
import {Bool} from '../../../dist/Instance/Data/Bool';

let maybeStr = (
	Maybe.Apply.liftA2((a: Int) => (b: Int) => (
		assign(
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
	assign((b: String) => (a: Int) => (
		String.Semigroup.append(b)(String.fromI(Int.Show.show(a)))
	))(_ => Maybe.Foldable.foldl(_)(String('-101-'))(a))
);
let c = (
	assign(
		Maybe.Foldable.length(a)
	)(_ => assign(
		Int.fromI(_)
	))(_ => assign(
		Int.Show.show(_)
	))(_ => _.toString())
);
let d = (
	assign(
		Maybe.Foldable.notElem(Int.Eq)
	)(_ => assign(
		_(Int(3))(a)
	))(_ => Bool.Show.show(Bool.fromI(_)).toString())
);

console.log(
	Maybe.Show(Int.Show).show(a).toString()
)
console.log(
	b.toString()
)
console.log({c});
console.log({d});