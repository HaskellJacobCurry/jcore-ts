import { IOrdering } from './IOrdering';
import { Eq as IEq } from './Eq';
import { Ord as IOrd } from './Ord';
import { IShow } from './Show';
export interface LT {
    readonly tag: 'LT';
}
export interface EQ {
    readonly tag: 'EQ';
}
export interface GT {
    readonly tag: 'GT';
}
export declare let LT: Ordering;
export declare let EQ: Ordering;
export declare let GT: Ordering;
export declare let Show: IShow<Ordering>;
export declare let Eq: IEq<Ordering> & IEq.Ext<Ordering>;
export declare let Ord: IOrd<Ordering> & IOrd.Ext<Ordering>;
interface COrdering {
    invert: (_: Ordering) => Ordering;
}
export declare let invert: COrdering['invert'];
export declare type Ordering = IOrdering & (LT | EQ | GT);
export declare let Ordering: {
    LT: IOrdering & LT;
    EQ: IOrdering & EQ;
    GT: IOrdering & GT;
    Show: IShow<Ordering>;
    Eq: IEq<Ordering> & IEq.Ext<Ordering>;
    Ord: IOrd<Ordering> & IOrd.Ext<Ordering>;
    invert: (_: Ordering) => Ordering;
};
export {};
