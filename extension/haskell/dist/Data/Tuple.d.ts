import { IShow } from './Show';
import { ISemigroup } from './Semigroup';
import { IMonoid } from './Monoid';
import { Functor2 } from './Functor';
import { Apply2_ } from '../Control/Apply';
import { Bifunctor2 } from './Bifunctor';
interface Tuple<A, B> {
    fst: A;
    snd: B;
}
export { Tuple };
export declare const URI: "Tuple";
export declare type URI = typeof URI;
declare module '../util/HKT' {
    interface KindsByURI2<T0, A> {
        [URI]: Tuple<T0, A>;
    }
}
/** fst :: Tuple a b -> a */
declare let fst: <A>(_: Tuple<A, any>) => A;
export { fst };
/** snd :: Tuple a b -> b */
declare let snd: <B>(_: Tuple<any, B>) => B;
export { snd };
/** swap :: Tuple a b -> Tuple b a */
declare let swap: <A, B>(_: Tuple<A, B>) => Tuple<B, A>;
export { swap };
/** show :: (Show a, Show b) => Show (Tuple a b) => Tuple a b -> String */
declare let Show: <A, B>(_0: IShow<A>, _1: IShow<B>) => IShow<Tuple<A, B>>;
export { Show };
/** append :: (Semigroup a, Semigroup b) => Semigroup (Tuple a b) => Tuple a b -> Tuple a b -> Tuple a b */
declare let Semigroup: <A, B>(_0: ISemigroup<A>, _1: ISemigroup<B>) => ISemigroup<Tuple<A, B>>;
export { Semigroup };
/** mempty :: (Monoid a, Monoid b) => Monoid (Tuple a b) => Unit -> Tuple a b */
declare let Monoid: <A, B>(_0: IMonoid<A>, _1: IMonoid<B>) => IMonoid<Tuple<A, B>>;
export { Monoid };
/** map :: Functor (Tuple a) => (b -> c) -> Tuple a b -> Tuple a c */
declare let Functor: Functor2<URI>;
export { Functor };
/** ap :: Semigroup a => Apply (Tuple a) => Tuple a (b -> c) -> Tuple a b -> Tuple a c */
declare let Apply: <T0>(_: ISemigroup<T0>) => Apply2_<URI, T0> & Apply2_.Ext<URI, T0>;
export { Apply };
/** bimap :: Bifunctor Tuple => (a -> c) -> (b -> d) -> Tuple a b -> Tuple c d */
declare let Bifunctor: Bifunctor2<URI> & Bifunctor2.Ext<URI>;
export { Bifunctor };
declare let Tuple: (<A, B>(fst: A, snd: B) => Tuple<A, B>) & {
    fst: <A_1>(_: Tuple<A_1, any>) => A_1;
    snd: <B_1>(_: Tuple<any, B_1>) => B_1;
    swap: <A_2, B_2>(_: Tuple<A_2, B_2>) => Tuple<B_2, A_2>;
    Show: <A_3, B_3>(_0: IShow<A_3>, _1: IShow<B_3>) => IShow<Tuple<A_3, B_3>>;
    Semigroup: <A_4, B_4>(_0: ISemigroup<A_4>, _1: ISemigroup<B_4>) => ISemigroup<Tuple<A_4, B_4>>;
    Monoid: <A_5, B_5>(_0: IMonoid<A_5>, _1: IMonoid<B_5>) => IMonoid<Tuple<A_5, B_5>>;
    Functor: Functor2<"Tuple">;
    Apply: <T0>(_: ISemigroup<T0>) => Apply2_<"Tuple", T0> & Apply2_.Ext<"Tuple", T0>;
    Bifunctor: Bifunctor2<"Tuple"> & Bifunctor2.Ext<"Tuple">;
};
export default Tuple;
