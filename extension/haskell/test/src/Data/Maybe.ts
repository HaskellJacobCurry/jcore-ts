import {Maybe} from '../../../dist/Data/Maybe'
import {String} from '../../../dist/Data/String'

console.log({
	v: Maybe.Show(String.Show).show(Maybe.Just(String('shit'))).toString(),
	g: Maybe.Show(String.Show).show(
		Maybe.Functor.map((s: String) => s)(Maybe.Just(String('shit')))
	).toString(),
})