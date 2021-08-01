import { HKT, URI1, URI2, Kind1, Kind2 } from '../../Common/HKT';
import { Monoid } from './Monoid';
import { Applicative, Applicative1 } from '../Control/Applicative';
import { Monad, Monad1 } from '../Control/Monad';
import { Eq } from './Eq';
import { IUnit } from './IUnit';
import { IInt } from './IInt';
import { IBool } from './IBool';
/**
 * class Foldable f where
 *  foldMap? :: Monoid g => (a -> g) -> f a -> g
 *  foldr? :: (a -> b -> b) -> b -> f a -> b
 * foldl :: (b -> a -> b) -> b -> f a -> b
 * fold :: Monoid g => f g -> g
 * length :: f a -> Int
 * null :: f a -> Bool
 * elem :: Eq a => a -> f a -> Bool
 * notElem :: Eq a => a -> f a -> Bool
 * - Applicative actions
 * traverse_ :: Applicative g => (a -> g b) -> f a -> g ()
 * for_ :: Applicative g => f a -> (a -> g b) -> g ()
 * sequenceA_ :: Applicative g => f (g a) -> g ()
 * - Monadic folds
 * foldrM :: Monad g => (a -> b -> g b) -> b -> f a -> g b
 * foldlM :: Monad g => (b -> a -> g b) -> b -> f a -> g b
 *
 * default
 *  foldMap f = foldr (mappend . f) mempty
 *  foldr f z t = appEndo (foldMap (Endo . f) t) z
 *  foldl f z t = appEndo (getDual (foldMap (Dual . Endo . flip f) t)) z
 *  fold = foldMap id
 *  length = getSum . foldMap (Sum . const 1)
 *  elem a = getAny . foldMap (Any . eq a)
 *  notElem = not . elem
 *  traverse_ f = foldr (/x k -> f x *> k) (pure ())
 *  for_ = flip traverse_
 *  sequenceA_ = foldr (/m k -> m *> k) (pure ()) - list fusion and continuations
 *  foldrM f z0 xs = foldl (/k x z -> f x z >>= k) return xs z0 - list fusion and continuations
 *  foldlM f z0 xs = foldr (/x k z -> f z x >>= k) return xs z0 - list fusion and continuations
 */
interface IFoldable<F> {
    foldMap: <G>(_: Monoid<G>) => <A>(_: (_: A) => G) => (_: HKT<F, A>) => G;
    foldr: <A, B>(_: (_: A) => (_: B) => B) => (_: B) => (_: HKT<F, A>) => B;
}
interface IExtFoldable<F> {
    foldl: <A, B>(_: (_: B) => (_: A) => B) => (_: B) => (_: HKT<F, A>) => B;
    fold: <G>(_: Monoid<G>) => (_: HKT<F, G>) => G;
    length: <A>(_: HKT<F, A>) => IInt;
    null: <A>(_: HKT<F, A>) => IBool;
    elem: <A>(_: Eq<A>) => (_: A) => (_: HKT<F, A>) => IBool;
    notElem: <A>(_: Eq<A>) => (_: A) => (_: HKT<F, A>) => IBool;
    traverse_: <G>(_: Applicative<G>) => <A, B>(_: (_: A) => HKT<G, B>) => (_: HKT<F, A>) => HKT<G, IUnit>;
    for_: <G>(_: Applicative<G>) => <A>(_: HKT<F, A>) => <B>(_: (_: A) => HKT<G, B>) => HKT<G, IUnit>;
    sequenceA_: <G>(_: Applicative<G>) => <A>(_: HKT<F, HKT<G, A>>) => HKT<G, IUnit>;
    foldrM: <G>(_: Monad<G>) => <A, B>(_: (_: A) => (_: B) => HKT<G, B>) => (_: B) => (_: HKT<F, A>) => HKT<G, B>;
    foldlM: <G>(_: Monad<G>) => <A, B>(_: (_: B) => (_: A) => HKT<G, B>) => (_: B) => (_: HKT<F, A>) => HKT<G, B>;
}
interface Foldable<F> extends IFoldable<F> {
    URI: F;
}
export { Foldable };
export { Foldable as IFoldable };
declare namespace Foldable {
    interface Base<F> extends IFoldable<F> {
    }
    let Def: <F>(_: Foldable<F>) => IFoldable<F>;
    interface Ext<F> extends IExtFoldable<F> {
    }
    let Ext: <F>(_: Foldable<F>) => Ext<F>;
    let instantiate: <F>() => <TFoldable extends Foldable<F>>(_: TFoldable) => TFoldable & Ext<F>;
}
interface IFoldable1<F extends URI1> {
    foldMap: <G>(_: Monoid<G>) => <A>(_: (_: A) => G) => (_: Kind1<F, A>) => G;
    foldr: <A, B>(_: (_: A) => (_: B) => B) => (_: B) => (_: Kind1<F, A>) => B;
}
interface IExtFoldable1<F extends URI1> {
    foldl: <A, B>(_: (_: B) => (_: A) => B) => (_: B) => (_: Kind1<F, A>) => B;
    fold: <G>(_: Monoid<G>) => (_: Kind1<F, G>) => G;
    length: <A>(_: Kind1<F, A>) => IInt;
    null: <A>(_: Kind1<F, A>) => IBool;
    elem: <A>(_: Eq<A>) => (_: A) => (_: Kind1<F, A>) => IBool;
    notElem: <A>(_: Eq<A>) => (_: A) => (_: Kind1<F, A>) => IBool;
    traverse_: <G extends URI1>(_: Applicative1<G>) => <A, B>(_: (_: A) => Kind1<G, B>) => (_: Kind1<F, A>) => Kind1<G, IUnit>;
    for_: <G extends URI1>(_: Applicative1<G>) => <A>(_: Kind1<F, A>) => <B>(_: (_: A) => Kind1<G, B>) => Kind1<G, IUnit>;
    sequenceA_: <G extends URI1>(_: Applicative1<G>) => <A>(_: Kind1<F, Kind1<G, A>>) => Kind1<G, IUnit>;
    foldrM: <G extends URI1>(_: Monad1<G>) => <A, B>(_: (_: A) => (_: B) => Kind1<G, B>) => (_: B) => (_: Kind1<F, A>) => Kind1<G, B>;
    foldlM: <G extends URI1>(_: Monad1<G>) => <A, B>(_: (_: B) => (_: A) => Kind1<G, B>) => (_: B) => (_: Kind1<F, A>) => Kind1<G, B>;
}
interface Foldable1<F extends URI1> extends IFoldable1<F> {
    URI: F;
}
export { Foldable1 };
interface Foldable2<F extends URI2> {
    URI: F;
    foldl: <A, B>(_: (_: B) => (_: A) => B) => (_: B) => <T0>(_: Kind2<F, T0, A>) => B;
    foldr: <A, B>(_: (_: A) => (_: B) => B) => (_: B) => <T0>(_: Kind2<F, T0, A>) => B;
    foldMap: <G>(_: Monoid<G>) => <A>(_: (_: A) => G) => <T0>(_: Kind2<F, T0, A>) => G;
}
export { Foldable2 };
interface Foldable2C<F extends URI2, T0> {
    URI: F;
    foldl: <A, B>(_: (_: B) => (_: A) => B) => (_: B) => (_: Kind2<F, T0, A>) => B;
    foldr: <A, B>(_: (_: A) => (_: B) => B) => (_: B) => (_: Kind2<F, T0, A>) => B;
    foldMap: <G>(_: Monoid<G>) => <A>(_: (_: A) => G) => (_: Kind2<F, T0, A>) => G;
}
export { Foldable2C };
declare namespace Foldable1 {
    interface Base<F extends URI1> extends IFoldable1<F> {
    }
    let Def: <F extends URI1>(_: Foldable1<F>) => IFoldable1<F>;
    interface Ext<F extends URI1> extends IExtFoldable1<F> {
    }
    let Ext: <F extends URI1>(_: Foldable1<F>) => Ext<F>;
    let instantiate: <F extends URI1>() => <TFoldable extends Foldable1<F>>(_: TFoldable) => TFoldable & Ext<F>;
}
export default Foldable;
