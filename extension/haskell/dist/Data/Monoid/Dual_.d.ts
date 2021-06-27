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
declare let create_: <A>(value: A) => Dual<A>;
export { create_ as create };
/** Semigroup a => Semigroup (Dual a) */
declare let Semigroup: <A>(_: ISemigroup<A>) => ISemigroup<Dual<A>>;
export { Semigroup };
declare let Monoid: <A>(_: IMonoid<A>) => IMonoid<Dual<A>> & IMonoid.Ext<Dual<A>>;
export { Monoid };
declare let Dual: (<A>(value: A) => Dual<A>) & {
    URI: "Dual";
    get: <A_1>(_: Dual<A_1>) => A_1;
    create: <A>(value: A) => Dual<A>;
    Semigroup: <A_2>(_: ISemigroup<A_2>) => ISemigroup<Dual<A_2>>;
    Monoid: <A_3>(_: IMonoid<A_3>) => IMonoid<Dual<A_3>> & IMonoid.Ext<Dual<A_3>>;
};
export default Dual;
