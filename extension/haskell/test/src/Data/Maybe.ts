import {Maybe} from '../../../dist/Data/Maybe'
import {String} from '../../../dist/Data/String'
import {Int} from '../../../dist/Data/Int'

/*
console.log({
	v: Maybe.Show(String.Show).show(Maybe.Just(String('shit'))).toString(),
	g: Maybe.Show(String.Show).show(
		Maybe.Functor.map((s: String) => s)(Maybe.Just(String('shit')))
	).toString(),
})
*/

let maybeStr = (
	Maybe.Apply.lift2((a: Int) => (b: Int) => (
		Int.Show.show(Int.Ring.mul(a)(b))
	))(Maybe.Just(Int(33)))(Maybe.Just(Int(11)))
);
console.log(
	Maybe.Show(String.Show).show(maybeStr).toString()
)