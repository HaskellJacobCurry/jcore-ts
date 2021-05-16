import {
	MutableIterator,
	BaseIterator,
	Int,
	StrictWeakOrdering,
} from '../../ts-toolbelt'
import {_swap, swap} from './Swap'

export let _partition = <T>(as: T[], iLeft: Int, iRight: Int, ordering: StrictWeakOrdering<T>): Int => {
	let iPivot = iLeft;
	for (let i = iLeft; i < iRight; i++) {
		if (!ordering(as[iRight], as[i])) {
			_swap(as, iPivot++, i);
		}
	}
	_swap(as, iPivot, iRight);
	return iPivot;
};

export namespace Partition {
	export type Iterator<T = any> = MutableIterator<T>;
	export let fn = (
		<TIterator extends Iterator, T extends BaseIterator.Value<TIterator>
		>(left: TIterator, right: TIterator, ordering: StrictWeakOrdering<T>): TIterator => {
			let pivot = left;
			for (let i = left; !i.equal(right); i = i.next()) {
				if (!ordering(right.read(), i.read())) {
					swap(pivot, i);
					pivot = pivot.next();
				}
			}
			swap(pivot, right);
			return pivot;
		}
	);
}
export let partition = Partition.fn;

export default Partition