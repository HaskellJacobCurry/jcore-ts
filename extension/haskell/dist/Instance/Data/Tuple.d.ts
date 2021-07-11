import { Tuple, HTuple as _HTuple, Constructor } from '../../DataStructure/Data/Tuple';
import { IShow } from '../../Typeclass/Data/Show';
import { ISemigroup } from '../../Typeclass/Data/Semigroup';
import { IMonoid } from '../../Typeclass/Data/Monoid';
import { Functor2 } from '../../Typeclass/Data/Functor';
import { Apply2C } from '../../Typeclass/Control/Apply';
import { Bifunctor2 } from '../../Typeclass/Data/Bifunctor';
export * from '../../DataStructure/Data/Tuple';
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
declare let Apply: <T0>(_: ISemigroup<T0>) => Apply2C<"Tuple", T0> & Apply2C.Ext<"Tuple", T0>;
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
}
export { HTuple };
declare type _Tuple<A, B> = Tuple<A, B>;
declare let _Tuple: Constructor & HTuple;
export { _Tuple as Tuple };
export default _Tuple;
