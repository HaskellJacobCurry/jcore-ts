import {AVLTree} from './AVLTree'
import {Array} from './Array'
import {
	Compare,
	Any,
	Bool,
} from '../ts-toolbelt'

export class OrderedMultiMap<
	TKey extends any = any,
	TValue extends any = any
> extends AVLTree<OrderedMultiMap.Value<TKey, TValue>, TKey> {
	constructor(
		compareKey: Compare<TKey> = Any.compare
	) {
		super(value => value.key, compareKey);
	}

	set(key: TKey, value: TValue): this {
		return this.insert_({key, value});
	}

	unset(key: TKey): this {
		return this.remove_(this.makeValue(key));
	}

	get(key: TKey): TValue[] {
		return new Array(this.findByKey(key)).map(({value}) => value).unlift();
	}

	contain(key: TKey): Bool {
		return this.findByKey(key).length != 0;
	}

	forEach(cb: (key: TKey, value: TValue) => void): this {
		return this.inorderTraverse((key, values) => new Array(values).forEach(({value}) => cb(key, value)));
	}

	private makeValue(key: TKey): OrderedMultiMap.Value<TKey, TValue> {
		return {key, value: <any>undefined};
	}
}
export namespace OrderedMultiMap {
	export interface Value<
		TKey extends any = any,
		TValue extends any = any
	> {
		key: TKey;
		value: TValue;
	}
}
export default OrderedMultiMap