import { IOrdering } from '../../Typeclass/Data/IOrdering';
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
interface HOrdering {
    LT: Ordering;
    EQ: Ordering;
    GT: Ordering;
    fromI: (_: IOrdering) => Ordering;
    invert: (_: Ordering) => Ordering;
}
export { HOrdering };
declare let Ordering: HOrdering;
export default Ordering;
