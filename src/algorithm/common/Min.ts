import {
	InputIterator,
	BaseIterator,
	StrictWeakOrdering,
	Int,
} from '../../ts-toolbelt'

export let _min = <T>(as: T[], iBegin: Int, iEnd: Int, ordering: StrictWeakOrdering<T>): [Int, T] => {
	let iMin = iBegin;
	for (let i = iBegin + 1; i < iEnd; i++) {
		if (ordering(as[i], as[iMin])) {
			iMin = i;
		}
	}
	return [iMin, as[iMin]];
}

export namespace Min {
	export type Iterator<T = any> = InputIterator<T>;
	export let fn = (
		<TIterator extends Iterator, T extends BaseIterator.Value<TIterator>
		>(first: TIterator, last: TIterator, ordering: StrictWeakOrdering<T>): TIterator => {
			let min = first;
			for (let i = first.next(); !i.equal(last); i = i.next()) {
				if (ordering(i.read(), min.read())) {
					min = i;
				}
			}
			return min;
		}
	);
}
export let min = Min.fn;

export default Min