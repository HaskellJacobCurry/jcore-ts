import { HKT } from '../util/HKT';
import { Functor } from './Functor';
import { Foldable } from './Foldable';
import { Applicative } from '../Control/Applicative';
/**
 * class (Functor t, Foldable t) => Traversable f where
 *  traverse? :: Applicative g => (a -> g b) -> f a -> g (f b)
 *  sequenceA? :: Applicative g => f (g a) -> g (f a)
 */
interface ITraversable<F> {
    traverse: <G>(_: Applicative<G>) => <A, B>(_: (_: A) => HKT<G, B>) => (_: HKT<F, A>) => HKT<G, HKT<F, B>>;
    sequenceA: <G>(_: Applicative<G>) => <A>(_: HKT<F, HKT<G, A>>) => HKT<G, HKT<F, A>>;
}
interface IExtTraversable<F> {
}
interface Traversable<F> extends ITraversable<F>, Functor<F>, Foldable<F> {
}
export { Traversable };
export { Traversable as ITraversable };
declare namespace Traversable {
    let Def: <F>(_: Traversable<F>) => ITraversable<F>;
    interface Ext<F> extends IExtTraversable<F> {
    }
    let Ext: <F>(_: Traversable<F>) => Ext<F>;
    let enhance: <F>(_: Traversable<F>) => Traversable<F> & Ext<F>;
}
export default Traversable;
