import { IShow } from '../Show';
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
/** Show a => Show (Sum a) */
declare let Show: <A>(_: IShow<A>) => IShow<Sum<A>>;
export { Show };
/** Num a => Semigroup (Sum a) */
declare let Semigroup: <A>(_: INum<A>) => ISemigroup<Sum<A>>;
export { Semigroup };
/** Num a => Monoid (Sum a) */
declare let Monoid: <A>(_: INum<A>) => IMonoid<Sum<A>> & IMonoid.Ext<Sum<A>>;
export { Monoid };
declare let Sum: (<A>(value: A) => Sum<A>) & {
    URI: "Sum";
    get: <A_1>(_: Sum<A_1>) => A_1;
    Show: <A_2>(_: IShow<A_2>) => IShow<Sum<A_2>>;
    Semigroup: <A_3>(_: INum<A_3>) => ISemigroup<Sum<A_3>>;
    Monoid: <A_4>(_: INum<A_4>) => IMonoid<Sum<A_4>> & IMonoid.Ext<Sum<A_4>>;
};
export default Sum;
