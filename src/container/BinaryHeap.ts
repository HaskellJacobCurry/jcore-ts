import {
	Compare,
	Any,
	Int,
	trampoline,
} from '../ts-toolbelt'
import {_swap} from '../algorithm/common/Swap'
import {Array} from './Array'

export class BinaryHeap<T = any> {
	protected compare: Compare<T>;
	protected array: T[] = [];

	constructor(compare: Compare<T> = Any.compare) {
		this.compare = compare;
	}

	// precondition: left and right are heaps
	protected heapify(i: Int): void {
		trampoline<[Int], void>(
			(heapify, i) => {
				let iLeft = BinaryHeap.left(i);
				let iRight = BinaryHeap.right(i);
				let iMax = i;
				if (iLeft < this.array.length && this.compare(this.array[iMax], this.array[iLeft]) == -1) {
					iMax = iLeft;
				}
				if (iRight < this.array.length && this.compare(this.array[iMax], this.array[iRight]) == -1) {
					iMax = iRight;
				}
				if (iMax != i) {
					_swap(this.array, i, iMax);
					return heapify(iMax);
				}
			}
		)(i);
	}

	buildHeap(): void {
		for (let i = BinaryHeap.parent(this.array.length - 1); !(i < 0); i--) {
			this.heapify(i);
		}
	}

	push_(value: T): this {
		this.array[this.array.length] = value;
		return this;
	}

	push(values: T[]): this {
		return new Array(values).foldl((acc, value) => acc.push_(value), this);
	}

	// left(i) = 2*i where i is one-based
	protected static left(i: Int) {
		return (i + 1 << 1) - 1;
	}

	// right(i) = 2*i+1 where i is one-based
	protected static right(i: Int) {
		return i + 1 << 1;
	}

	// parent(i) = floor(i/2) where i is one-based
	protected static parent(i: Int) {
		return i >> 1;
	}
}