import { MutableIterator, BaseIterator, Int, StrictWeakOrdering } from '../../ts-toolbelt';
export declare let _partition: <T>(as: T[], iLeft: Int, iRight: Int, ordering: StrictWeakOrdering<T>) => Int;
export declare namespace Partition {
    type Iterator<T = any> = MutableIterator<T>;
    let fn: <TIterator extends Iterator<any>, T extends BaseIterator.Value<TIterator>>(left: TIterator, right: TIterator, ordering: StrictWeakOrdering<T>) => TIterator;
}
export declare let partition: <TIterator extends Partition.Iterator<any>, T extends BaseIterator.Value<TIterator>>(left: TIterator, right: TIterator, ordering: StrictWeakOrdering<T>) => TIterator;
export default Partition;
