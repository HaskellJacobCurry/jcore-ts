import { MutableIterator, BaseIterator, StrictWeakOrdering, Int } from '../../ts-toolbelt';
export declare let _selectionSort: <T>(as: T[], iBegin: Int, iEnd: Int, ordering: StrictWeakOrdering<T>) => void;
export declare namespace SelectionSort {
    type Iterator<T = any> = MutableIterator<T>;
    let fn: <TIterator extends Iterator<any>, T extends BaseIterator.Value<TIterator>>(first: TIterator, last: TIterator, ordering: StrictWeakOrdering<T>) => void;
}
export declare let selectionSort: <TIterator extends SelectionSort.Iterator<any>, T extends BaseIterator.Value<TIterator>>(first: TIterator, last: TIterator, ordering: StrictWeakOrdering<T>) => void;
export default SelectionSort;
