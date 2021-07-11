import { ISemigroup } from '../Semigroup';
import { IMonoid } from '../Monoid';
declare const URI: "Endo";
declare type URI = typeof URI;
declare module '../../../Common/HKT' {
    interface KindsByURI1<A> {
        [URI]: Endo<A>;
    }
}
export { URI };
interface Endo<A> {
    URI: URI;
    fn: (_: A) => A;
}
export { Endo };
declare let get: <A>(_: Endo<A>) => (_: A) => A;
export { get };
declare let createEndo: <A>(fn: (_: A) => A) => Endo<A>;
export { createEndo as create };
declare let Semigroup: <A>() => ISemigroup<Endo<A>>;
export { Semigroup };
declare let Monoid: <A>() => IMonoid<Endo<A>> & IMonoid.Ext<Endo<A>>;
export { Monoid };
declare type Constructor = typeof createEndo;
export { Constructor };
interface HEndo {
    URI: URI;
    get: <A>(_: Endo<A>) => (_: A) => A;
    create: <A>(fn: (_: A) => A) => Endo<A>;
    Semigroup: typeof Semigroup;
    Monoid: typeof Monoid;
}
export { HEndo };
declare let Endo: Constructor & HEndo;
export default Endo;
