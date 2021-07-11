import {Tuple} from '../../../dist/Instance/Data/Tuple'
import {String} from '../../../dist/Instance/Data/String'
import {Int} from '../../../dist/Instance/Data/Int'

console.log(
	Tuple.Show(Int.Show, String.Show).show(
		Tuple.Bifunctor.lmap((fst: Int) => Int.Semiring.add(fst)(Int.Semiring.one()))(
			Tuple(Int(31), String('shit'))
		)
	).toString()
)