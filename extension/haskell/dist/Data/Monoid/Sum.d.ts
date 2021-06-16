import { IShow } from '../Show';
import { ISemigroup } from '../Semigroup';
import { IMonoid } from '../Monoid';
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
/** Show a => Show (Sum a) */
declare let Show: <A>(_: IShow<A>) => IShow<Sum<A>>;
export { Show };
/** Semigroup a => Semigroup (Sum a) */
declare let Semigroup: <A>(_: ISemigroup<A>) => ISemigroup<Sum<A>>;
export { Semigroup };
declare let Monoid: <A>(_: IMonoid<A>) => IMonoid<Sum<A>> & IMonoid.Ext<Sum<A>>;
export { Monoid };
export default Sum;
