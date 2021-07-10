import {Tuple} from '../../../dist/DataStructure/Data/Tuple'
import {String} from '../../../dist/DataStructure/Data/String'
import {Int} from '../../../dist/DataStructure/Data/Int'

console.log(
	Tuple.Show(Int.Show, String.Show).show(
		Tuple.Bifunctor.lmap((fst: Int) => Int.Semiring.add(fst)(Int.Semiring.one()))(
			Tuple(Int(31), String('shit'))
		)
	).toString()
)