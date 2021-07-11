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
declare let createDual: <A>(value: A) => Dual<A>;
export { createDual as create };
/** Semigroup a => Semigroup (Dual a) */
declare let Semigroup: <A>(_: ISemigroup<A>) => ISemigroup<Dual<A>>;
export { Semigroup };
declare let Monoid: <A>(_: IMonoid<A>) => IMonoid<Dual<A>> & IMonoid.Ext<Dual<A>>;
export { Monoid };
declare type Constructor = typeof createDual;
export { Constructor };
interface HDual {
    URI: URI;
    get: <A>(_: Dual<A>) => A;
    create: <A>(value: A) => Dual<A>;
    Semigroup: typeof Semigroup;
    Monoid: typeof Monoid;
}
export { HDual };
declare let Dual: Constructor & HDual;
export default Dual;
