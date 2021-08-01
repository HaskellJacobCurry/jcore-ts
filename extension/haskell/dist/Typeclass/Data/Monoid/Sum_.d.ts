import { ISemigroup } from '../Semigroup';
import { IMonoid } from '../Monoid';
import { INum } from '../../GHC/Num';
declare const URI: "Sum";
declare type URI = typeof URI;
export { URI };
interface Sum<A> {
    URI: URI;
    value: A;
}
export { Sum };
declare let get: <A>(_: Sum<A>) => A;
export { get };
declare let createSum: <A>(value: A) => Sum<A>;
export { createSum as create };
declare let append: <A>(_: INum<A>) => (sum0: Sum<A>) => (sum1: Sum<A>) => Sum<A>;
export { append };
declare let mempty: <A>(_: INum<A>) => () => Sum<A>;
export { mempty };
/** Num a => Semigroup (Sum a) */
declare let Semigroup: <A>(_: INum<A>) => ISemigroup<Sum<A>>;
export { Semigroup };
/** Num a => Monoid (Sum a) */
declare let Monoid: <A>(_: INum<A>) => ISemigroup<Sum<A>> & IMonoid.Base<Sum<A>> & IMonoid.Ext<Sum<A>>;
export { Monoid };
declare type Constructor = typeof createSum;
export { Constructor };
interface HSum {
    URI: URI;
    get: <A>(_: Sum<A>) => A;
    create: <A>(value: A) => Sum<A>;
    Semigroup: typeof Semigroup;
    Monoid: typeof Monoid;
    append: <A>(_: INum<A>) => (sum0: Sum<A>) => (sum1: Sum<A>) => Sum<A>;
    mempty: <A>(_: INum<A>) => () => Sum<A>;
}
export { HSum };
declare let Sum: Constructor & HSum;
export default Sum;
