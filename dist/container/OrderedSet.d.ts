import { OrderedMultiSet } from './OrderedMultiSet';
export declare class OrderedSet<TValue extends any = any> extends OrderedMultiSet<TValue> {
    protected setTree(value: TValue, key?: TValue): this;
}
export default OrderedSet;
