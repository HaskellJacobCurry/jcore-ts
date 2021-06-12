import { IOrdering } from './IOrdering';
import { Eq as IEq } from './Eq';
import { Ord as IOrd } from './Ord';
import { IShow } from './Show';
declare type Ordering = IOrdering & (LT | EQ | GT);
export { Ordering };
interface LT {
    readonly tag: 'LT';
}
declare let LT: Ordering;
export { LT };
interface EQ {
    readonly tag: 'EQ';
}
declare let EQ: Ordering;
export { EQ };
interface GT {
    readonly tag: 'GT';
}
declare let GT: Ordering;
export { GT };
declare let fromI: (_: IOrdering) => Ordering;
export { fromI };
declare let invert: (_: Ordering) => Ordering;
export { invert };
declare let Show: IShow<Ordering>;
export { Show };
declare let Eq: IEq<Ordering> & IEq.Ext<Ordering>;
export { Eq };
declare let Ord: IOrd<Ordering> & IOrd.Ext<Ordering>;
export { Ord };
declare let Ordering: {
    LT: IOrdering & LT;
    EQ: IOrdering & EQ;
    GT: IOrdering & GT;
    fromI: (_: IOrdering) => Ordering;
    invert: (_: Ordering) => Ordering;
    Show: IShow<Ordering>;
    Eq: IEq<Ordering> & IEq.Ext<Ordering>;
    Ord: IOrd<Ordering> & IOrd.Ext<Ordering>;
};
