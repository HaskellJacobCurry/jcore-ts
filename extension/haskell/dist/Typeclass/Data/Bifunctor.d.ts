import { HKT2, URI2, Kind2 } from '../../Common/HKT';
/**
 * class Bifunctor f where
 *  bimap :: (a -> c) -> (b -> d) -> f a b -> f c d
 * lmap :: (a -> c) -> f a b -> f c b
 * rmap :: (b -> d) -> f a b -> f a d
 */
interface IBifunctor<F> {
    bimap: <A, C>(_: (_: A) => C) => <B, D>(_: (_: B) => D) => (_: HKT2<F, A, B>) => HKT2<F, C, D>;
}
interface IExtBifunctor<F> {
    lmap: <A, C>(_: (_: A) => C) => <B>(_: HKT2<F, A, B>) => HKT2<F, C, B>;
    rmap: <B, D>(_: (_: B) => D) => <A>(_: HKT2<F, A, B>) => HKT2<F, A, D>;
}
interface Bifunctor<F> extends IBifunctor<F> {
    URI: F;
}
export { Bifunctor };
export { Bifunctor as IBifunctor };
declare namespace Bifunctor {
    interface Ext<F> extends IExtBifunctor<F> {
    }
    let Ext: <F>(_: Bifunctor<F>) => Ext<F>;
    let instantiate: <F>(_: Bifunctor<F>) => Bifunctor<F> & Ext<F>;
}
interface IBifunctor2<F extends URI2> {
    bimap: <A, C>(_: (_: A) => C) => <B, D>(_: (_: B) => D) => (_: Kind2<F, A, B>) => Kind2<F, C, D>;
}
interface IExtBifunctor2<F extends URI2> {
    lmap: <A, C>(_: (_: A) => C) => <B>(_: Kind2<F, A, B>) => Kind2<F, C, B>;
    rmap: <B, D>(_: (_: B) => D) => <A>(_: Kind2<F, A, B>) => Kind2<F, A, D>;
}
interface Bifunctor2<F extends URI2> extends IBifunctor2<F> {
    URI: F;
}
export { Bifunctor2 };
declare namespace Bifunctor2 {
    interface Ext<F extends URI2> extends IExtBifunctor2<F> {
    }
    let Ext: <F extends URI2>(_: Bifunctor2<F>) => Ext<F>;
    let instantiate: <F extends URI2>(_: Bifunctor2<F>) => Bifunctor2<F> & Ext<F>;
}
export default Bifunctor;
