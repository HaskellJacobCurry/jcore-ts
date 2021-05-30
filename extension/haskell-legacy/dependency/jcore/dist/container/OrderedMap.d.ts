import { OrderedMultiMap } from './OrderedMultiMap';
export declare class OrderedMap<TKey extends any = any, TValue extends any = any> extends OrderedMultiMap<TKey, TValue> {
    protected setTree(value: OrderedMap.Value<TKey, TValue>, key?: TKey): this;
}
export declare namespace OrderedMap {
    interface Value<TKey extends any = any, TValue extends any = any> {
        key: TKey;
        value: TValue;
    }
}
export default OrderedMap;
