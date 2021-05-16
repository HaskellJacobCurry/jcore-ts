import {OrderedMultiMap} from './OrderedMultiMap'

export class OrderedMap<
	TKey extends any = any,
	TValue extends any = any
> extends OrderedMultiMap<TKey, TValue> {
	protected setTree(value: OrderedMap.Value<TKey, TValue>, key = this.getKey(value)): this {
		return this.isEmpty() ? super.setTree(value, key) : this;
	}
}
export namespace OrderedMap {
	export interface Value<
		TKey extends any = any,
		TValue extends any = any
	> {
		key: TKey;
		value: TValue;
	}
}
export default OrderedMap