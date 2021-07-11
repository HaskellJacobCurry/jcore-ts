import {Ordering} from '../../../dist/Instance/Data/Ordering'
import {Bool} from '../../../dist/Instance/Data/Bool'
import {
	reinterpret,
	cast
} from '../../../dependency/jcore/dist/ts-toolbelt'

console.log(
	Bool.Show.show(
		cast(Ordering.Ord.between(Ordering.LT)(Ordering.GT)(Ordering.GT))()
	).toString()
)