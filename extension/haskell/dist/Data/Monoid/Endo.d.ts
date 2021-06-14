import { ISemigroup } from '../Semigroup';
import { IMonoid } from '../Monoid';
declare const URI: "Endo";
declare type URI = typeof URI;
declare module '../../util/HKT' {
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
declare let Semigroup: <A>() => ISemigroup<Endo<A>>;
export { Semigroup };
declare let Monoid: <A>() => IMonoid<Endo<A>> & IMonoid.Ext<Endo<A>>;
export { Monoid };
declare let Endo: (<A>(fn: (_: A) => A) => Endo<A>) & {
    URI: "Endo";
    get: <A_1>(_: Endo<A_1>) => (_: A_1) => A_1;
    Semigroup: <A_2>() => ISemigroup<Endo<A_2>>;
    Monoid: <A_3>() => IMonoid<Endo<A_3>> & IMonoid.Ext<Endo<A_3>>;
};
export default Endo;
