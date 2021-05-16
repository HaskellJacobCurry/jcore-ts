import {
	Int
} from '../ts-toolbelt'
import {Array} from './Array'

export class Queue<
	T extends any = any
> {
	private array: Array<T>;
	private iFront: Int;
	private iEnd: Int;

	constructor() {
		this.array = new Array();
		this.iFront = this.iEnd = 0;
	}

	enqueue_(value: T): Queue<T> {
		this.array.push_(value);
		this.iEnd++;
		return this;
	}

	enqueue(values: T[]): Queue<T> {
		return new Array(values).foldl((acc, v) => acc.enqueue_(v), <Queue<T>>this);
	}

	size(): Int {
		return this.iEnd - this.iFront;
	}

	dequeue(): T {
		if (this.size() == 0) {
			throw new Error('Queue.prototype.dequeue');
		}
		return this._dequeue();
	}

	_dequeue(): T {
		let value = this.array._at(this.iFront++);
		this.conditionalResize();
		return value;
	}

	_front(): T {
		return this.array._at(this.iFront);
	}

	front(): T {
		if (this.size() == 0) {
			throw new Error('Queue.prototype.front');
		}
		return this._front();
	}

	_back(): T {
		return this.array._at(this.iEnd - 1);
	}

	back(): T {
		if (this.size() == 0) {
			throw new Error('Queue.prototype.back');
		}
		return this._back();
	}

	private conditionalResize() {
		let sz = this.size();
		if (sz * 2 < this.array.size()) {
			this.array = this.array._slice(this.iFront, this.iEnd);
			this.iFront = 0;
			this.iEnd = sz;
		}
	}
}
export default Queue