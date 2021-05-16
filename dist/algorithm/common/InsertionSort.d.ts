import { MutableIterator, BidirectionalIterator, BaseIterator, StrictWeakOrdering, Int } from '../../ts-toolbelt';
export declare let _insertionSort: <T>(as: T[], iBegin: Int, iEnd: Int, ordering: StrictWeakOrdering<T>) => void;
export declare namespace InsertionSort {
    type Iterator<T = any> = BidirectionalIterator<T> & MutableIterator<T>;
    let fn: <TIterator extends Iterator<any>, T extends BaseIterator.Value<TIterator>>(first: TIterator, last: TIterator, ordering: StrictWeakOrdering<T>) => void;
}
export declare let insertionSort: <TIterator extends InsertionSort.Iterator<any>, T extends BaseIterator.Value<TIterator>>(first: TIterator, last: TIterator, ordering: StrictWeakOrdering<T>) => void;
export default InsertionSort;
