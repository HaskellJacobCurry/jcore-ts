import {Ordering} from '../../../dist/DataStructure/Data/Ordering'
import {Bool} from '../../../dist/DataStructure/Data/Bool'
import {
	reinterpret,
	cast
} from '../../../dependency/jcore/dist/ts-toolbelt'

console.log(
	Bool.Show.show(
		cast(Ordering.Ord.between(Ordering.LT)(Ordering.GT)(Ordering.GT))()
	).toString()
)