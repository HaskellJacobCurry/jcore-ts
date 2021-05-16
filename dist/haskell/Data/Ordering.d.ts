import { ISemigroup } from './ISemigroup';
import { IEq } from './IEq';
import { IOrdering } from './IOrdering';
import { IShowable } from './IShowable';
import { String } from './String';
import { Bool } from './Bool';
declare abstract class Ordering implements IShowable, ISemigroup, IEq, IOrdering {
    construct: typeof Ordering._LT;
    abstract cata: Ordering.Cata;
    static LT: () => Ordering;
    static GT: () => Ordering;
    static EQ: () => Ordering;
    show: () => String;
    append: (ordering: Ordering) => Ordering;
    eq: (ordering: Ordering) => Bool;
}
declare namespace Ordering {
    namespace Tag {
        let LT: "LT";
        let GT: "GT";
        let EQ: "EQ";
    }
    interface Cata {
        <T, U, K>(fs: {
            LT: () => T;
            GT: () => U;
            EQ: () => K;
        }): T | U | K;
    }
    class _LT extends Ordering {
        tag: "LT";
        cata: Cata;
    }
    class _GT extends Ordering {
        tag: "GT";
        cata: Cata;
    }
    class _EQ extends Ordering {
        tag: "EQ";
        cata: Cata;
    }
}
declare type Ordering_ = Ordering;
declare namespace Ordering_ {
    type Eq = (_: Ordering) => (_: Ordering) => Bool;
    type Invert = (_: Ordering) => Ordering;
}
declare let Ordering_: typeof Ordering & {
    invert: Ordering_.Invert;
};
export { Ordering_ as Ordering };
export default Ordering_;
