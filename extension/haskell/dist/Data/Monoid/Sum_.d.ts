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
/** Num a => Semigroup (Sum a) */
declare let Semigroup: <A>(_: INum<A>) => ISemigroup<Sum<A>>;
export { Semigroup };
/** Num a => Monoid (Sum a) */
declare let Monoid: <A>(_: INum<A>) => IMonoid<Sum<A>> & IMonoid.Ext<Sum<A>>;
export { Monoid };
declare let Sum: (<A>(value: A) => Sum<A>) & {
    URI: "Sum";
    get: <A_1>(_: Sum<A_1>) => A_1;
    Semigroup: <A_2>(_: INum<A_2>) => ISemigroup<Sum<A_2>>;
    Monoid: <A_3>(_: INum<A_3>) => IMonoid<Sum<A_3>> & IMonoid.Ext<Sum<A_3>>;
};
export default Sum;
