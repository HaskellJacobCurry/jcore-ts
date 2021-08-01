import { Tuple, HTuple as _HTuple, Constructor } from '../../DataStructure/Data/Tuple';
import { IShow } from '../../Typeclass/Data/Show';
import { ISemigroup } from '../../Typeclass/Data/Semigroup';
import { IMonoid } from '../../Typeclass/Data/Monoid';
import { Functor2 } from '../../Typeclass/Data/Functor';
import { Apply2C } from '../../Typeclass/Control/Apply';
import { Bifunctor2 } from '../../Typeclass/Data/Bifunctor';
import { String } from '../../Instance/Data/String';
export * from '../../DataStructure/Data/Tuple';
declare let show: <A, B>(_0: IShow<A>, _1: IShow<B>) => (_: Tuple<A, B>) => String;
export { show };
declare let append: <A, B>(_0: ISemigroup<A>, _1: ISemigroup<B>) => (_: Tuple<A, B>) => (_: Tuple<A, B>) => Tuple<A, B>;
export { append };
declare let mempty: <A, B>(_0: IMonoid<A>, _1: IMonoid<B>) => () => Tuple<A, B>;
export { mempty };
declare let fmap: <A, B>(_: (_: A) => B) => <T0>(_: Tuple<T0, A>) => Tuple<T0, B>;
export { fmap };
declare let ap: <T0>(_: ISemigroup<T0>) => <A, B>(_: Tuple<T0, (_: A) => B>) => (_: Tuple<T0, A>) => Tuple<T0, B>;
export { ap };
declare let bimap: <A, C>(_: (_: A) => C) => <B, D>(_: (_: B) => D) => (_: Tuple<A, B>) => Tuple<C, D>;
export { bimap };
/** show :: (Show a, Show b) => Show (Tuple a b) => Tuple a b -> String */
declare let Show: <A, B>(_0: IShow<A>, _1: IShow<B>) => IShow<Tuple<A, B>>;
export { Show };
/** append :: (Semigroup a, Semigroup b) => Semigroup (Tuple a b) => Tuple a b -> Tuple a b -> Tuple a b */
declare let Semigroup: <A, B>(_0: ISemigroup<A>, _1: ISemigroup<B>) => ISemigroup<Tuple<A, B>>;
export { Semigroup };
/** mempty :: (Monoid a, Monoid b) => Monoid (Tuple a b) => Unit -> Tuple a b */
declare let Monoid: <A, B>(_0: IMonoid<A>, _1: IMonoid<B>) => ISemigroup<Tuple<A, B>> & IMonoid.Base<Tuple<A, B>> & IMonoid.Ext<Tuple<A, B>>;
export { Monoid };
/** map :: Functor (Tuple a) => (b -> c) -> Tuple a b -> Tuple a c */
declare let Functor: Functor2<"Tuple"> & Functor2.Ext<"Tuple">;
export { Functor };
/** ap :: Semigroup a => Apply (Tuple a) => Tuple a (b -> c) -> Tuple a b -> Tuple a c */
declare let Apply: <T0>(_: ISemigroup<T0>) => Functor2<"Tuple"> & Functor2.Ext<"Tuple"> & Apply2C.Base<"Tuple", T0> & Apply2C.Ext<"Tuple", T0>;
export { Apply };
/** bimap :: Bifunctor Tuple => (a -> c) -> (b -> d) -> Tuple a b -> Tuple c d */
declare let Bifunctor: Bifunctor2<"Tuple"> & Bifunctor2.Ext<"Tuple">;
export { Bifunctor };
interface HTuple extends _HTuple {
    Show: typeof Show;
    Semigroup: typeof Semigroup;
    Monoid: typeof Monoid;
    Functor: typeof Functor;
    Apply: typeof Apply;
    Bifunctor: typeof Bifunctor;
    show: <A, B>(_0: IShow<A>, _1: IShow<B>) => (_: Tuple<A, B>) => String;
    append: <A, B>(_0: ISemigroup<A>, _1: ISemigroup<B>) => (_: Tuple<A, B>) => (_: Tuple<A, B>) => Tuple<A, B>;
    mempty: <A, B>(_0: IMonoid<A>, _1: IMonoid<B>) => () => Tuple<A, B>;
    fmap: <A, B>(_: (_: A) => B) => <T0>(_: Tuple<T0, A>) => Tuple<T0, B>;
    ap: <T0>(_: ISemigroup<T0>) => <A, B>(_: Tuple<T0, (_: A) => B>) => (_: Tuple<T0, A>) => Tuple<T0, B>;
    bimap: <A, C>(_: (_: A) => C) => <B, D>(_: (_: B) => D) => (_: Tuple<A, B>) => Tuple<C, D>;
}
export { HTuple };
declare type _Tuple<A, B> = Tuple<A, B>;
declare let _Tuple: Constructor & HTuple;
export { _Tuple as Tuple };
export default _Tuple;
