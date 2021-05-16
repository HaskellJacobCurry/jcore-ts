import { MutableIterator, Int } from '../../ts-toolbelt';
export declare let _swap: <T>(as: T[], i0: Int, i1: Int) => void;
export declare namespace Swap {
    type Iterator<T = any> = MutableIterator<T>;
    let fn: <TIterator extends Iterator<any>>(iter0: TIterator, iter1: TIterator) => void;
}
export declare let swap: <TIterator extends Swap.Iterator<any>>(iter0: TIterator, iter1: TIterator) => void;
export default Swap;
