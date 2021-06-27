import {List} from '../../../dist/Data/List'
import {Int} from '../../../dist/Data/Int'
import {Maybe} from '../../../dist/Data/Maybe'
import {Tuple} from '../../../dist/Data/Tuple'
import {
	apply,
	create,
} from '../../../dist/util/common'

let list = List.create(
	apply(
		create<Int[]>([])
	)(acc => {
		for (let i = 0; i < 4; i++) {
			acc[acc.length] = Int(i + 1);
		}
		return acc;
	})
);

({
	0: () => (
		apply(
			List.Foldable.foldl(Int.Ring.add)(Int(0))(list)
		)(_ => apply(
			Int.Show.show(_).toString()
		))(console.log)
	),
	1: () => (
		apply(
			List.unsnoc(list)
		)(_ => apply(
			Maybe.Show(Tuple.Show(List.Show(Int.Show), Int.Show)).show(_).toString()
		))(console.log)
	)
})['1']();
