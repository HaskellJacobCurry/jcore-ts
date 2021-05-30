import { AVLTree } from './AVLTree';
import { Compare, Bool } from '../ts-toolbelt';
export declare class OrderedMultiSet<TValue extends any = any> extends AVLTree<TValue> {
    constructor(compareKey?: Compare<TValue>);
    add_(value: TValue): this;
    add(values: TValue[]): this;
    contain(value: TValue): Bool;
    forEach(cb: (value: TValue) => void): this;
    forEach_(cb: (value: TValue) => Bool): this;
}
export default OrderedMultiSet;
