import {OrderedMultiSet} from './OrderedMultiSet'

export class OrderedSet<
	TValue extends any = any
> extends OrderedMultiSet<TValue> {
	protected setTree(value: TValue, key = this.getKey(value)): this {
		return this.isEmpty() ? super.setTree(value, key) : this;
	}
}
export default OrderedSet