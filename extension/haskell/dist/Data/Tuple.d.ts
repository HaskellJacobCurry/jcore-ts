import { IShow } from './Show';
import { ISemigroup } from './Semigroup';
import { IMonoid } from './Monoid';
import { Functor2 } from './Functor';
import { Apply2_ } from '../Control/Apply';
import { Bifunctor2 } from './Bifunctor';
import { ITuple } from './ITuple';
interface Tuple<A, B> extends ITuple<A, B> {
}
export { Tuple };
export declare const URI: "Tuple";
export declare type URI = typeof URI;
declare module '../util/HKT' {
    interface KindsByURI2<T0, A> {
        [URI]: Tuple<T0, A>;
    }
}
declare let fromI: <A, B>(_: ITuple<A, B>) => Tuple<A, B>;
export { fromI };
/** fst :: Tuple a b -> a */
declare let fst: <A, B>(_: Tuple<A, B>) => A;
export { fst };
/** snd :: Tuple a b -> b */
declare let snd: <A, B>(_: Tuple<A, B>) => B;
export { snd };
/** swap :: Tuple a b -> Tuple b a */
declare let swap: <A, B>(_: Tuple<A, B>) => Tuple<B, A>;
export { swap };
declare let create: <A, B>(fst: A, snd: B) => Tuple<A, B>;
export { create };
/** show :: (Show a, Show b) => Show (Tuple a b) => Tuple a b -> String */
declare let Show: <A, B>(_0: IShow<A>, _1: IShow<B>) => IShow<Tuple<A, B>>;
export { Show };
/** append :: (Semigroup a, Semigroup b) => Semigroup (Tuple a b) => Tuple a b -> Tuple a b -> Tuple a b */
declare let Semigroup: <A, B>(_0: ISemigroup<A>, _1: ISemigroup<B>) => ISemigroup<Tuple<A, B>>;
export { Semigroup };
/** mempty :: (Monoid a, Monoid b) => Monoid (Tuple a b) => Unit -> Tuple a b */
declare let Monoid: <A, B>(_0: IMonoid<A>, _1: IMonoid<B>) => IMonoid<Tuple<A, B>> & IMonoid.Ext<Tuple<A, B>>;
export { Monoid };
/** map :: Functor (Tuple a) => (b -> c) -> Tuple a b -> Tuple a c */
declare let Functor: Functor2<"Tuple"> & Functor2.Ext<"Tuple">;
export { Functor };
/** ap :: Semigroup a => Apply (Tuple a) => Tuple a (b -> c) -> Tuple a b -> Tuple a c */
declare let Apply: <T0>(_: ISemigroup<T0>) => Apply2_<"Tuple", T0> & Apply2_.Ext<"Tuple", T0>;
export { Apply };
/** bimap :: Bifunctor Tuple => (a -> c) -> (b -> d) -> Tuple a b -> Tuple c d */
declare let Bifunctor: Bifunctor2<"Tuple"> & Bifunctor2.Ext<"Tuple">;
export { Bifunctor };
declare let Tuple: (<A, B>(fst: A, snd: B) => Tuple<A, B>) & {
    fromI: <A_1, B_1>(_: ITuple<A_1, B_1>) => Tuple<A_1, B_1>;
    fst: <A_2, B_2>(_: Tuple<A_2, B_2>) => A_2;
    snd: <A_3, B_3>(_: Tuple<A_3, B_3>) => B_3;
    swap: <A_4, B_4>(_: Tuple<A_4, B_4>) => Tuple<B_4, A_4>;
    Show: <A_5, B_5>(_0: IShow<A_5>, _1: IShow<B_5>) => IShow<Tuple<A_5, B_5>>;
    Semigroup: <A_6, B_6>(_0: ISemigroup<A_6>, _1: ISemigroup<B_6>) => ISemigroup<Tuple<A_6, B_6>>;
    Monoid: <A_7, B_7>(_0: IMonoid<A_7>, _1: IMonoid<B_7>) => IMonoid<Tuple<A_7, B_7>> & IMonoid.Ext<Tuple<A_7, B_7>>;
    Functor: Functor2<"Tuple"> & Functor2.Ext<"Tuple">;
    Apply: <T0>(_: ISemigroup<T0>) => Apply2_<"Tuple", T0> & Apply2_.Ext<"Tuple", T0>;
    Bifunctor: Bifunctor2<"Tuple"> & Bifunctor2.Ext<"Tuple">;
};
export default Tuple;
