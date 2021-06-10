import { HKT, URI1, URI2, Kind1, Kind2 } from '../util/HKT';
import { Monoid } from './Monoid';
import { Applicative1 } from '../Control/Applicative';
import { IUnit } from './IUnit';
/**
 * class Foldable f where
 *  foldl :: (b -> a -> b) -> b -> f a -> b
 *  foldr :: (a -> b -> b) -> b -> f a -> b
 *  foldMap :: Monoid g => (a -> g) -> f a -> g
 * traverse_ :: Applicative g => (a -> g b) -> f a -> g Unit
 */
interface Foldable<F> {
    URI: F;
    foldl: <A, B>(_: (_: B) => (_: A) => B) => (_: B) => (_: HKT<F, A>) => B;
    foldr: <A, B>(_: (_: A) => (_: B) => B) => (_: B) => (_: HKT<F, A>) => B;
    foldMap: <G>(G: Monoid<G>) => <A>(_: (_: A) => G) => (_: HKT<F, A>) => G;
}
export { Foldable };
export { Foldable as IFoldable };
interface Foldable1<F extends URI1> {
    URI: F;
    foldl: <A, B>(_: (_: B) => (_: A) => B) => (_: B) => (_: Kind1<F, A>) => B;
    foldr: <A, B>(_: (_: A) => (_: B) => B) => (_: B) => (_: Kind1<F, A>) => B;
    foldMap: <G>(G: Monoid<G>) => <A>(_: (_: A) => G) => (_: Kind1<F, A>) => G;
}
export { Foldable1 };
interface Foldable2<F extends URI2> {
    URI: F;
    foldl: <A, B>(_: (_: B) => (_: A) => B) => (_: B) => <T0>(_: Kind2<F, T0, A>) => B;
    foldr: <A, B>(_: (_: A) => (_: B) => B) => (_: B) => <T0>(_: Kind2<F, T0, A>) => B;
    foldMap: <G>(G: Monoid<G>) => <A>(_: (_: A) => G) => <T0>(_: Kind2<F, T0, A>) => G;
}
export { Foldable2 };
interface Foldable2_<F extends URI2, T0> {
    URI: F;
    foldl: <A, B>(_: (_: B) => (_: A) => B) => (_: B) => (_: Kind2<F, T0, A>) => B;
    foldr: <A, B>(_: (_: A) => (_: B) => B) => (_: B) => (_: Kind2<F, T0, A>) => B;
    foldMap: <G>(_: Monoid<G>) => <A>(_: (_: A) => G) => (_: Kind2<F, T0, A>) => G;
}
export { Foldable2_ };
declare namespace Foldable1 {
    interface Ext<F extends URI1> {
        traverse_: <G extends URI1>(_: Applicative1<G>) => <A, B>(_: (_: A) => Kind1<G, B>) => (_: Kind1<F, A>) => Kind1<G, IUnit>;
    }
}
export default Foldable;
