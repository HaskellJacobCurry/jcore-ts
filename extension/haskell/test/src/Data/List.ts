import {List} from '../../../dist/Instance/Data/List'
import {Int} from '../../../dist/Instance/Data/Int'
import {Maybe} from '../../../dist/Instance/Data/Maybe'
import {Tuple} from '../../../dist/Instance/Data/Tuple'
import {LazySequence} from '../../../dist/DataStructure/Clojure/LazySequence'
import {
	apply,
	create,
	flip,
} from '../../../dist/Common/common'

({
	0: () => (
		apply(
			List.create(
				apply(
					create<Int[]>([])
				)(acc => {
					for (let i = 0; i < 1e1; i++) {
						acc[acc.length] = Int(i + 1);
					}
					return acc;
				})
			)
		)(list => apply(List.Foldable.foldl(Int.Ring.add)(Int(0))(list)
		))(_ => apply(Int.Show.show(_).toString()
		))(console.log)
	),
	1: () => (
		apply(
			apply((LazySequence(Int.inc)(Int(0))
			))(_ => apply(LazySequence.take(Int(9))(_)
			))(_ => apply(LazySequence.toPopulatable(List.Populatable)(_)
			))(list => List.snoc(list)(Int(101)))
		)(list => (
			apply(
				List.unsnoc(list)
			)(_ => apply(
				Maybe.Show(Tuple.Show(List.Show(Int.Show), Int.Show)).show(_).toString()
			))(console.log)
		))
	),
	'shiftN': () => (
		apply((
			apply((LazySequence(Int.inc)(Int(1))
			))(_ => apply(LazySequence.take(Int(1e5))(_)
			))(LazySequence.toPopulatable(List.Populatable))
		))(list => apply(List.shiftN(Int(1e5 - 2))(list)
		))(_ => apply(Maybe.Show(List.Show(Int.Show)).show(_).toString()
		))(console.log)
	),
	'index': () => (
		apply((
			apply((LazySequence(Int.inc)(Int(1))
			))(_ => apply(LazySequence.take(Int(1e1))(_)
			))(LazySequence.toPopulatable(List.Populatable))
		))(list => apply(List.index(Int(15))(list)
		))(_ => apply(Maybe.Show(Int.Show).show(_).toString()
		))(console.log)
	),
	'find': () => (
		apply((
			apply((LazySequence(Int.inc)(Int(1))
			))(_ => apply(LazySequence.take(Int(1e1))(_)
			))(LazySequence.toPopulatable(List.Populatable))
		))(list => apply(List.find_<Int>(a => Int.notGt(a)(Int(4)))(list)
		))(_ => apply(Maybe.show(Tuple.Show(Int.Show, Int.Show))(_).toString()
		))(console.log)
	),
	'merge': () => (
		apply({
			list0: (
				apply((LazySequence(Int.inc)(Int(1))
				))(_ => apply(LazySequence.take(Int(2e1))(_)
				))(LazySequence.toPopulatable(List.Populatable))
			), 
			list1: (
				apply((LazySequence(Int.inc)(Int(1))
				))(_ => apply(LazySequence.take(Int(15))(_)
				))(LazySequence.toPopulatable(List.Populatable))
			)
		})(({list0, list1}) => apply(List.merge(flip(Int.compare))(list0)(list1)
		))(_ => apply(List.show(Int.Show)(_).toString()
		))(console.log)
	),
	'sortBy': () => (
		apply({
			list0: List.create(
				[3, 6, 1, -1, 11, 9].map(Int)
			), 
		})(({list0}) => apply(List.sortBy(flip(Int.compare))(list0)
		))(_ => apply(List.show(Int.Show)(_).toString()
		))(console.log)
	)
})['sortBy']();
