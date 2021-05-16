import { MutableIterator, BidirectionalIterator, BaseIterator, StrictWeakOrdering, Int } from '../../ts-toolbelt';
declare let _quickSort: <T>(as: T[], iBegin: Int, iLast: Int, ordering: StrictWeakOrdering<T>) => void;
export { _quickSort };
export declare namespace QuickSort {
    type Iterator<T = any> = BidirectionalIterator<T> & MutableIterator<T>;
    let fn: <TIterator extends import("./InsertionSort").InsertionSort.Iterator<any>, T extends BaseIterator.Value<TIterator>>(first: TIterator, last: TIterator, ordering: StrictWeakOrdering<T>) => void;
}
export declare let quickSort: <TIterator extends import("./InsertionSort").InsertionSort.Iterator<any>, T extends BaseIterator.Value<TIterator>>(first: TIterator, last: TIterator, ordering: StrictWeakOrdering<T>) => void;
export default QuickSort;
