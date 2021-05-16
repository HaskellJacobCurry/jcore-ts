import {
	MutableIterator,
	BidirectionalIterator,
	BaseIterator,
	StrictWeakOrdering,
	Int
} from '../../ts-toolbelt'

export let _insertionSort = <T>(as: T[], iBegin: Int, iEnd: Int, ordering: StrictWeakOrdering<T>): void => {
	for (let i = iBegin; i < iEnd; i++) {
		let a = as[i];
		let j = i - 1;
		for (; !(j < 0) && ordering(a, as[j]); j--) {
			as[j + 1] = as[j];
		}
		as[j + 1] = a;
	}
}

export namespace InsertionSort {
	export type Iterator<T = any> = BidirectionalIterator<T> & MutableIterator<T>;
	export let fn = (
		<TIterator extends Iterator, T extends BaseIterator.Value<TIterator>
		>(first: TIterator, last: TIterator, ordering: StrictWeakOrdering<T>): void => {
			for (let i = first; !i.equal(last); i = i.next()) {
				let v = i.read();
				let j = i.prev();
				for (let jEnd = first.prev(); !(j.equal(jEnd)) && ordering(v, j.read()); j = j.prev()) {
					j.next().write(j.read());
				}
				j.next().write(v);
			}
		}
	);
}
export let insertionSort = InsertionSort.fn;

export default InsertionSort