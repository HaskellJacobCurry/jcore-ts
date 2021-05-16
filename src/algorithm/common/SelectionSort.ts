import {
	MutableIterator,
	BaseIterator,
	StrictWeakOrdering,
	Int,
} from '../../ts-toolbelt'
import {_min, min} from './Min'
import {_swap, swap} from './Swap'

export let _selectionSort = <T>(as: T[], iBegin: Int, iEnd: Int, ordering: StrictWeakOrdering<T>) => {
	for (let i = iBegin; i < iEnd - 1; i++) {
		let [iMin, _] = _min(as, i, iEnd, ordering);
		_swap(as, i, iMin);
	}
}

export namespace SelectionSort {
	export type Iterator<T = any> = MutableIterator<T>;
	export let fn = (
		<TIterator extends Iterator, T extends BaseIterator.Value<TIterator>
		>(first: TIterator, last: TIterator, ordering: StrictWeakOrdering<T>): void => {
			for (let i = first; !i.next().equal(last); i = i.next()) {
				let iMin = min(i, last, ordering);
				swap(i, iMin);
			}
		}
	);
}
export let selectionSort = SelectionSort.fn;

export default SelectionSort