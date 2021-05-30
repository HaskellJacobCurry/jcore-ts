import { AVLTree } from './AVLTree';
import { Compare, Bool } from '../ts-toolbelt';
export declare class OrderedMultiMap<TKey extends any = any, TValue extends any = any> extends AVLTree<OrderedMultiMap.Value<TKey, TValue>, TKey> {
    constructor(compareKey?: Compare<TKey>);
    set(key: TKey, value: TValue): this;
    unset(key: TKey): this;
    unsetOne(key: TKey): this;
    get(key: TKey): TValue[];
    contain(key: TKey): Bool;
    forEach(cb: (key: TKey, value: TValue) => void): this;
    forEach_(cb: (key: TKey, value: TValue) => Bool): this;
    private makeValue;
}
export declare namespace OrderedMultiMap {
    interface Value<TKey extends any = any, TValue extends any = any> {
        key: TKey;
        value: TValue;
    }
}
export default OrderedMultiMap;
