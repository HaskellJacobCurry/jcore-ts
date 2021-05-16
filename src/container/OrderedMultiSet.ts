import {AVLTree} from './AVLTree'
import {Array} from './Array'
import {
	Compare,
	Any,
	Bool,
} from '../ts-toolbelt'

export class OrderedMultiSet<
	TValue extends any = any
> extends AVLTree<TValue> {
	constructor(
		compareKey: Compare<TValue> = Any.compare
	) {
		super(_ => _, compareKey);
	}

	add_(value: TValue): this {
		return this.insert_(value);
	}

	add(values: TValue[]): this {
		return this.insert(values);
	}

	contain(value: TValue): Bool {
		return this.findByKey(value).length != 0;
	}

	forEach(cb: (value: TValue) => void): this {
		return this.inorderTraverse((key, values) => new Array(values).forEach(cb));
	}
}
export default OrderedMultiSet