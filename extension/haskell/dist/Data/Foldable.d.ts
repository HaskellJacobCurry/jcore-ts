import { HKT, URI1, URI2, Kind1, Kind2 } from '../util/HKT';
import { Monoid } from './Monoid';
import { Applicative, Applicative1 } from '../Control/Applicative';
import { Eq } from './Eq';
import { IUnit } from './IUnit';
import { IInt } from './IInt';
import { IBool } from './IBool';
/**
 * class Foldable f where
 *  foldMap :: Monoid g => (a -> g) -> f a -> g
 * foldl :: (b -> a -> b) -> b -> f a -> b
 * foldr :: (a -> b -> b) -> b -> f a -> b
 * fold :: Monoid g => f g -> g
 * length :: f a -> Int
 * null :: f a -> Bool
 * elem :: Eq a => a -> f a -> Bool
 * notElem :: Eq a => a -> f a -> Bool
 * - Applicative actions
 * traverse_ :: Applicative g => (a -> g b) -> f a -> g ()
 * for_ :: Applicative g => f a -> (a -> g b) -> g ()
 *
 * default
 *  foldr f z t = appEndo (foldMap (Endo . f) t) z
 *  foldl f z t = appEndo (getDual (foldMap (Dual . Endo . flip f) t)) z
 *  fold = foldMap id
 *  length = getSum . foldMap (Sum . const 1)
 *  elem a = getAny . foldMap (Any . eq a)
 *  notElem = not . elem
 *  traverse_ f = foldr (/x k -> f x *> k) (pure ())
 *  for_ = flip traverse_
 */
interface IFoldable<F> {
    foldMap: <G>(_: Monoid<G>) => <A>(_: (_: A) => G) => (_: HKT<F, A>) => G;
}
interface IExtFoldable<F> {
    foldl: <A, B>(_: (_: B) => (_: A) => B) => (_: B) => (_: HKT<F, A>) => B;
    foldr: <A, B>(_: (_: A) => (_: B) => B) => (_: B) => (_: HKT<F, A>) => B;
    fold: <G>(_: Monoid<G>) => (_: HKT<F, G>) => G;
    length: <A>(_: HKT<F, A>) => IInt;
    null: <A>(_: HKT<F, A>) => IBool;
    elem: <A>(_: Eq<A>) => (_: A) => (_: HKT<F, A>) => IBool;
    notElem: <A>(_: Eq<A>) => (_: A) => (_: HKT<F, A>) => IBool;
    traverse_: <G>(_: Applicative<G>) => <A, B>(_: (_: A) => HKT<G, B>) => (_: HKT<F, A>) => HKT<G, IUnit>;
    for_: <G>(_: Applicative<G>) => <A>(_: HKT<F, A>) => <B>(_: (_: A) => HKT<G, B>) => HKT<G, IUnit>;
}
interface Foldable<F> extends IFoldable<F> {
    URI: F;
}
export { Foldable };
export { Foldable as IFoldable };
declare namespace Foldable {
    interface Ext<F> extends IExtFoldable<F> {
    }
    let Ext: <F>(_: Foldable<F>) => Ext<F>;
}
interface IFoldable1<F extends URI1> {
    foldMap: <G>(_: Monoid<G>) => <A>(_: (_: A) => G) => (_: Kind1<F, A>) => G;
}
interface IExtFoldable1<F extends URI1> {
    foldl: <A, B>(_: (_: B) => (_: A) => B) => (_: B) => (_: Kind1<F, A>) => B;
    foldr: <A, B>(_: (_: A) => (_: B) => B) => (_: B) => (_: Kind1<F, A>) => B;
    fold: <G>(_: Monoid<G>) => (_: Kind1<F, G>) => G;
    length: <A>(_: Kind1<F, A>) => IInt;
    null: <A>(_: Kind1<F, A>) => IBool;
    elem: <A>(_: Eq<A>) => (_: A) => (_: Kind1<F, A>) => IBool;
    notElem: <A>(_: Eq<A>) => (_: A) => (_: Kind1<F, A>) => IBool;
    traverse_: <G extends URI1>(_: Applicative1<G>) => <A, B>(_: (_: A) => Kind1<G, B>) => (_: Kind1<F, A>) => Kind1<G, IUnit>;
    for_: <G extends URI1>(_: Applicative1<G>) => <A>(_: Kind1<F, A>) => <B>(_: (_: A) => Kind1<G, B>) => Kind1<G, IUnit>;
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
interface Foldable2_<F extends URI2, T0> {
    URI: F;
    foldl: <A, B>(_: (_: B) => (_: A) => B) => (_: B) => (_: Kind2<F, T0, A>) => B;
    foldr: <A, B>(_: (_: A) => (_: B) => B) => (_: B) => (_: Kind2<F, T0, A>) => B;
    foldMap: <G>(_: Monoid<G>) => <A>(_: (_: A) => G) => (_: Kind2<F, T0, A>) => G;
}
export { Foldable2_ };
declare namespace Foldable1 {
    interface Ext<F extends URI1> extends IExtFoldable1<F> {
    }
    let Ext: <F extends URI1>(_: Foldable1<F>) => Ext<F>;
}
export default Foldable;
