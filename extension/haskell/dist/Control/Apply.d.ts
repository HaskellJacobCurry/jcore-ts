import { HKT, URI1, URI2, Kind1, Kind2 } from '../util/HKT';
import { Functor, Functor1, Functor2, Functor2_ } from '../Data/Functor';
/**
 * class (Functor f) <= Apply f where
 *  ap :: f (a -> b) -> f a -> f b
 *   alias :: [(<*>)]
 *  liftA2 :: (a -> b -> c) -> f a -> f b -> f c
 * fstAp :: f a -> f b -> f a
 *  alias :: [(<*)]
 * sndAp :: f a -> f b -> f b
 *  alias :: [(*>)]
 */
interface IApply<F> {
    ap: <A, B>(_: HKT<F, (_: A) => B>) => (_: HKT<F, A>) => HKT<F, B>;
    liftA2: <A, B, C>(_: (_: A) => (_: B) => C) => (_: HKT<F, A>) => (_: HKT<F, B>) => HKT<F, C>;
}
interface Apply<F> extends Functor<F>, IApply<F> {
}
export { Apply };
export { Apply as IApply };
declare namespace Apply {
    let Def: <F>(_: Apply<F>) => IApply<F>;
    interface Ext<F> {
        fstAp: <A>(_: HKT<F, A>) => <B>(_: HKT<F, B>) => HKT<F, A>;
        sndAp: <A>(_: HKT<F, A>) => <B>(_: HKT<F, B>) => HKT<F, B>;
    }
    let Ext: <F>(_: Apply<F>) => Ext<F>;
}
interface IApply1<F extends URI1> {
    ap: <A, B>(_: Kind1<F, (_: A) => B>) => (_: Kind1<F, A>) => Kind1<F, B>;
    liftA2: <A, B, C>(_: (_: A) => (_: B) => C) => (_: Kind1<F, A>) => (_: Kind1<F, B>) => Kind1<F, C>;
}
interface Apply1<F extends URI1> extends Functor1<F>, IApply1<F> {
}
export { Apply1 };
interface IApply2<F extends URI2> {
    ap: <T0, A, B>(_: Kind2<F, T0, (_: A) => B>) => (_: Kind2<F, T0, A>) => Kind2<F, T0, B>;
    liftA2: <T0, A, B, C>(_: (_: A) => (_: B) => C) => (_: Kind2<F, T0, A>) => (_: Kind2<F, T0, B>) => Kind2<F, T0, C>;
}
interface Apply2<F extends URI2> extends Functor2<F>, IApply2<F> {
}
export { Apply2 };
interface IApply2_<F extends URI2, T0> {
    ap: <A, B>(_: Kind2<F, T0, (_: A) => B>) => (_: Kind2<F, T0, A>) => Kind2<F, T0, B>;
    liftA2: <A, B, C>(_: (_: A) => (_: B) => C) => (_: Kind2<F, T0, A>) => (_: Kind2<F, T0, B>) => Kind2<F, T0, C>;
}
interface Apply2_<F extends URI2, T0> extends Functor2_<F, T0>, IApply2_<F, T0> {
}
export { Apply2_ };
declare namespace Apply1 {
    let Def: <F extends URI1>(_: Apply1<F>) => IApply1<F>;
    interface Ext<F extends URI1> {
    }
    let Ext: <F extends URI1>(_: Apply1<F>) => Ext<F>;
}
declare namespace Apply2 {
    let Def: <F extends URI2>(_: Apply2<F>) => IApply2<F>;
    interface Ext<F extends URI2> {
    }
    let Ext: <F extends URI2>(_: Apply2<F>) => Ext<F>;
}
declare namespace Apply2_ {
    let Def: <F extends URI2, T0>(_: Apply2_<F, T0>) => IApply2_<F, T0>;
    interface Ext<F extends URI2, T0> {
    }
    let Ext: <F extends URI2, T0>(_: Apply2_<F, T0>) => Ext<F, T0>;
}
export default Apply;
