import { InputIterator, BaseIterator, StrictWeakOrdering, Int } from '../../ts-toolbelt';
export declare let _min: <T>(as: T[], iBegin: Int, iEnd: Int, ordering: StrictWeakOrdering<T>) => [number, T];
export declare namespace Min {
    type Iterator<T = any> = InputIterator<T>;
    let fn: <TIterator extends Iterator<any>, T extends BaseIterator.Value<TIterator>>(first: TIterator, last: TIterator, ordering: StrictWeakOrdering<T>) => TIterator;
}
export declare let min: <TIterator extends Min.Iterator<any>, T extends BaseIterator.Value<TIterator>>(first: TIterator, last: TIterator, ordering: StrictWeakOrdering<T>) => TIterator;
export default Min;
