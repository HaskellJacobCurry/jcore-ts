import { IEq, CEq } from './IEq';
import { IOrdering } from './IOrdering';
import { IBool } from './IBool';
import { IRing } from './IRing';
/**
 * class (Eq f) <= Ord f where
 *  compare :: f -> f -> Ordering
 * lt :: f -> f -> Bool
 * notLt :: f -> f -> Bool
 * gt :: f -> f -> Bool
 * notGt :: f -> f -> Bool
 * min :: f -> f -> f
 * max :: f -> f -> f
 * clamp :: f -> f -> f -> f
 * between :: f -> f -> f -> Bool
 * abs :: Ring f => f -> f
 */
export interface Ord {
    compare: <TOrd extends IOrd>(_: TOrd) => (_: TOrd) => IOrdering;
    lt: <TOrd extends IOrd>(_: TOrd) => (_: TOrd) => IBool;
    notLt: <TOrd extends IOrd>(_: TOrd) => (_: TOrd) => IBool;
    gt: <TOrd extends IOrd>(_: TOrd) => (_: TOrd) => IBool;
    notGt: <TOrd extends IOrd>(_: TOrd) => (_: TOrd) => IBool;
    min: <TOrd extends IOrd>(_: TOrd) => (_: TOrd) => TOrd;
    max: <TOrd extends IOrd>(_: TOrd) => (_: TOrd) => TOrd;
    clamp: <TOrd extends IOrd>(min: TOrd) => (max: TOrd) => (_: TOrd) => TOrd;
    between: <TOrd extends IOrd>(min: TOrd) => (max: TOrd) => (_: TOrd) => IBool;
    abs: <TOrd extends IOrd & IRing>(_: TOrd) => TOrd;
}
export declare namespace Ord {
    let compare: Ord['compare'];
    let lt: Ord['lt'];
    let notLt: Ord['notLt'];
    let gt: Ord['gt'];
    let notGt: Ord['notGt'];
    let min: Ord['min'];
    let max: Ord['max'];
    let clamp: Ord['clamp'];
    let between: Ord['between'];
    let abs: Ord['abs'];
}
export interface IOrd extends IEq {
    construct: COrd<IOrd>;
    compare(_: IOrd): IOrdering;
    lt(_: IOrd): IBool;
}
export interface COrd<TOrd extends IOrd = IOrd> extends CEq<TOrd> {
}
