import {List} from '../../../dist/Data/List'
import {Int} from '../../../dist/Data/Int'
import {
	apply,
	create
} from '../../../dist/util/common'

let list = List.create(
	apply(
		create<Int[]>([])
	)(acc => {
		for (let i = 0; i < 1e6 + 1; i++) {
			acc[acc.length] = Int(i + 1);
		}
		return acc;
	})
);

apply(
	List.last(list)
)(_ => apply(
	Int.Show.show(_).toString()
))(console.log)