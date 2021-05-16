import {Array} from './Array'
import {Int} from '../ts-toolbelt/Int'

export class Stack<
	T extends any = any
> {
	private array: Array<T>;

	constructor() {
		this.array = new Array();
	}

	push(values: T[]): Stack<T> {
		this.array.push(values);
		return this;
	}

	push_(value: T): Stack<T> {
		this.array.push_(value);
		return this;
	}

	pop(): T {
		return this.array.pop();
	}

	size(): Int {
		return this.array.size();
	}
}
export default Stack