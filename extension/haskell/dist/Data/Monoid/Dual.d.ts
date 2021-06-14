import { IShow } from '../Show';
import { ISemigroup } from '../Semigroup';
import { IMonoid } from '../Monoid';
declare const URI: "Dual";
declare type URI = typeof URI;
export { URI };
interface Dual<A> {
    URI: URI;
    value: A;
}
export { Dual };
declare let get: <A>(_: Dual<A>) => A;
export { get };
/** Show a => Show (Dual a) */
declare let Show: <A>(_: IShow<A>) => IShow<Dual<A>>;
export { Show };
/** Semigroup a => Semigroup (Dual a) */
declare let Semigroup: <A>(_: ISemigroup<A>) => ISemigroup<Dual<A>>;
export { Semigroup };
declare let Monoid: <A>(_: IMonoid<A>) => IMonoid<Dual<A>> & IMonoid.Ext<Dual<A>>;
export { Monoid };
declare let Dual: (<A>(value: A) => Dual<A>) & {
    URI: "Dual";
    get: <A_1>(_: Dual<A_1>) => A_1;
    Show: <A_2>(_: IShow<A_2>) => IShow<Dual<A_2>>;
    Semigroup: <A_3>(_: ISemigroup<A_3>) => ISemigroup<Dual<A_3>>;
    Monoid: <A_4>(_: IMonoid<A_4>) => IMonoid<Dual<A_4>> & IMonoid.Ext<Dual<A_4>>;
};
export default Dual;
