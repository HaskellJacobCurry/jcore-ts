import { HKT2, URI2, Kind2 } from '../util/HKT';
/**
 * class Bifunctor f where
 *  bimap :: (a -> c) -> (b -> d) -> f a b -> f c d
 * lmap :: (a -> c) -> f a b -> f c b
 * rmap :: (b -> d) -> f a b -> f a d
 */
interface Bifunctor<F> {
    readonly URI: F;
    readonly bimap: <A, C>(_: (_: A) => C) => <B, D>(_: (_: B) => D) => (_: HKT2<F, A, B>) => HKT2<F, C, D>;
}
export { Bifunctor };
export { Bifunctor as IBifunctor };
interface Bifunctor2<URI extends URI2> {
    readonly URI: URI;
    readonly bimap: <A, C>(_: (_: A) => C) => <B, D>(_: (_: B) => D) => (_: Kind2<URI, A, B>) => Kind2<URI, C, D>;
}
export { Bifunctor2 };
declare namespace Bifunctor2 {
    interface Ext<URI extends URI2> {
        readonly lmap: <A, C>(_: (_: A) => C) => <B>(_: Kind2<URI, A, B>) => Kind2<URI, C, B>;
        readonly rmap: <B, D>(_: (_: B) => D) => <A>(_: Kind2<URI, A, B>) => Kind2<URI, A, D>;
    }
    let Ext: <URI extends URI2>(_: Bifunctor2<URI>) => Ext<URI>;
}
export default Bifunctor;
