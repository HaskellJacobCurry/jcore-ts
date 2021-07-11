import { Ordering, HOrdering as _HOrdering } from '../../DataStructure/Data/Ordering';
import { Bool } from './Bool';
import { IEq } from '../../Typeclass/Data/Eq';
import { IOrd } from '../../Typeclass/Data/Ord';
import { IShow } from '../../Typeclass/Data/Show';
export * from '../../DataStructure/Data/Ordering';
declare let eq: (_: Ordering) => (_: Ordering) => Bool;
export { eq };
declare let notEq: (_: Ordering) => (_: Ordering) => Bool;
export { notEq };
declare let Show: IShow<Ordering>;
export { Show };
declare let Eq: IEq<Ordering> & IEq.Ext<Ordering>;
export { Eq };
declare let Ord: IOrd<Ordering> & IOrd.Ext<Ordering>;
export { Ord };
interface HOrdering extends _HOrdering {
    Show: typeof Show;
    Eq: typeof Eq;
    Ord: typeof Ord;
    eq: (_: Ordering) => (_: Ordering) => Bool;
    notEq: (_: Ordering) => (_: Ordering) => Bool;
}
export { HOrdering };
declare type _Ordering = Ordering;
declare let _Ordering: HOrdering;
export { _Ordering as Ordering };
export default _Ordering;
