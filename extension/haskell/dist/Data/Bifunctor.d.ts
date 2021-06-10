import { HKT2, URI2, Kind2 } from '../util/HKT';
/**
 * class Bifunctor f where
 *  bimap :: (a -> c) -> (b -> d) -> f a b -> f c d
 * lmap :: (a -> c) -> f a b -> f c b
 * rmap :: (b -> d) -> f a b -> f a d
 */
interface Bifunctor<F> {
    URI: F;
    bimap: <A, C>(_: (_: A) => C) => <B, D>(_: (_: B) => D) => (_: HKT2<F, A, B>) => HKT2<F, C, D>;
}
export { Bifunctor };
export { Bifunctor as IBifunctor };
interface Bifunctor2<F extends URI2> {
    URI: F;
    bimap: <A, C>(_: (_: A) => C) => <B, D>(_: (_: B) => D) => (_: Kind2<F, A, B>) => Kind2<F, C, D>;
}
export { Bifunctor2 };
declare namespace Bifunctor2 {
    interface Ext<F extends URI2> {
        lmap: <A, C>(_: (_: A) => C) => <B>(_: Kind2<F, A, B>) => Kind2<F, C, B>;
        rmap: <B, D>(_: (_: B) => D) => <A>(_: Kind2<F, A, B>) => Kind2<F, A, D>;
    }
    let Ext: <F extends URI2>(_: Bifunctor2<F>) => Ext<F>;
}
export default Bifunctor;
