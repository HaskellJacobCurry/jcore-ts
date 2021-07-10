import { S } from '../../../dependency/jcore/dist/ts-toolbelt/common'
import {Int} from '../../../dist/DataStructure/Data/Int'
import {String} from '../../../dist/DataStructure/Data/String'

console.log(
	String.Show.show(
		Int.Ord.gt(
			Int.Ring.add(Int(3))(Int.Semiring.one())
		)(
			Int(3)
		).cata({
			True: () => String('true'),
			False: () => String('false'),
		})
	).toString()
)