import {
	MutableIterator,
	BidirectionalIterator,
	BaseIterator,
	StrictWeakOrdering,
	Int,
	Function,
	trampoline,
} from '../../ts-toolbelt'
import {_swap, swap} from './Swap'
import {_partition, partition} from './Partition'

let _quickSort = <T>(as: T[], iBegin: Int, iLast: Int, ordering: StrictWeakOrdering<T>): void => (
	Function.define<Function<[T[], Int, Int, StrictWeakOrdering<T>], void>>(
		quickSort => (as, iLeft, iRight, ordering) => {
			if (iLeft < iRight) {
				let iPivot = _partition(as, iLeft, iRight, ordering);
				quickSort()(as, iLeft, iPivot - 1, ordering);
				quickSort()(as, iPivot + 1, iRight, ordering);
			}
		}
	)(as, iBegin, iLast - 1, ordering)
);
_quickSort = <T>(as: T[], iBegin: Int, iLast: Int, ordering: StrictWeakOrdering<T>): void => (
	_swap(as, iLast - 1, Int.random(iBegin, iLast - 1)),
	trampoline<[T[], Int, Int, StrictWeakOrdering<T>, Function<[], void | trampoline.State<void>>?], void>(
		(quickSort, as, iLeft, iRight, ordering, cont = () => {}) => {
			if (iLeft < iRight) {
				let iPivot = _partition(as, iLeft, iRight, ordering);
				return quickSort(as, iLeft, iPivot - 1, ordering, () => (
					quickSort(as, iPivot + 1, iRight, ordering, cont)
				));
			}
			return cont();
		}
	)(as, iBegin, iLast - 1, ordering)
);
export {_quickSort}

export namespace QuickSort {
	export type Iterator<T = any> = BidirectionalIterator<T> & MutableIterator<T>;
	export let fn = (
		<TIterator extends Iterator, T extends BaseIterator.Value<TIterator>
		>(first: TIterator, last: TIterator, ordering: StrictWeakOrdering<T>): void => {
			console.log('randomize'),
			trampoline<[TIterator, TIterator, StrictWeakOrdering<T>, Function<[], void | trampoline.State<void>>?], void>(
				(quickSort, left, right, ordering, cont = () => {}) => {
					if (left.index() < right.index()) {
						let pivot = partition(left, right, ordering);
						return quickSort(left, pivot.prev(), ordering, () => (
							quickSort(pivot.next(), right, ordering, cont)
						));
					}
					return cont();
				}
			)(first, last.prev(), ordering)
		}
	);
}
export let quickSort = QuickSort.fn;

export default QuickSort