import {HKT, URI1, URI2, Kind1, Kind2} from '../util/HKT'
import {Monoid} from './Monoid'
import {Applicative1} from '../Control/Applicative'
import {IUnit} from './IUnit'
import {IInt} from './IInt'
import {Endo} from './Monoid/Endo'
import {Dual} from './Monoid/Dual_'
import {
	define,
	assign,
	flip,
	id,
} from '../util/common'

/**
 * class Foldable f where
 *  foldMap :: Monoid g => (a -> g) -> f a -> g
 * foldl :: (b -> a -> b) -> b -> f a -> b
 * foldr :: (a -> b -> b) -> b -> f a -> b
 * fold :: Monoid g => f g -> g
 * length :: f a -> Int
 * traverse_ :: Applicative g => (a -> g b) -> f a -> g Unit
 * 
 * default
 *  foldr f z t = appEndo (foldMap (Endo . f) t) z
 *  foldl f z t = appEndo (getDual (foldMap (Dual . Endo . flip f) t)) z
 *  fold = foldMap id
 *  length = getSum . foldMap (Sum . const 1)
 */
interface IFoldable<F> {
	foldMap: <G>(_: Monoid<G>) => <A>(_: (_: A) => G) => (_: HKT<F, A>) => G;
}
interface IExtFoldable<F> {
	foldl: <A, B>(_: (_: B) => (_: A) => B) => (_: B) => (_: HKT<F, A>) => B;
	foldr: <A, B>(_: (_: A) => (_: B) => B) => (_: B) => (_: HKT<F, A>) => B;
	fold: <G>(_: Monoid<G>) => (_: HKT<F, G>) => G;
}
interface Foldable<F> extends IFoldable<F> {
	URI: F;
}
export {Foldable}
export {Foldable as IFoldable}
namespace Foldable {
	export interface Ext<F> extends IExtFoldable<F> {}
	export let Ext: <F>(_: Foldable<F>) => Ext<F> = (
		<F>(Foldable: Foldable<F>) => (
			define<Ext<F>>(Ext => ({
				foldr: <A, B>(f: (_: A) => (_: B) => B) => (b: B) => (foldableA: HKT<F, A>) => (
					assign(
						Endo.Monoid<B>()
					)(_ => assign(
						Foldable.foldMap(_)((_: A) => Endo(f(_)))
					))(_ => assign(
						Endo.get(_(foldableA))
					))(_ => _(b))
				),
				foldl: <A, B>(f: (_: B) => (_: A) => B) => (b: B) => (foldableA: HKT<F, A>) => (
					assign(
						Dual.Monoid(Endo.Monoid<B>())
					)(_ => assign(
						Foldable.foldMap(_)((_: A) => Dual(Endo(flip(f)(_))))
					))(_ => assign(
						Endo.get(Dual.get(_(foldableA)))
					))(_ => _(b))
				),
				fold: Monoid => Foldable.foldMap(Monoid)(id),
			}))
		)
	);
}

interface IFoldable1<F extends URI1> {
	foldMap: <G>(_: Monoid<G>) => <A>(_: (_: A) => G) => (_: Kind1<F, A>) => G;
}
interface IExtFoldable1<F extends URI1> {
	foldl: <A, B>(_: (_: B) => (_: A) => B) => (_: B) => (_: Kind1<F, A>) => B;
	foldr: <A, B>(_: (_: A) => (_: B) => B) => (_: B) => (_: Kind1<F, A>) => B;
	fold: <G>(_: Monoid<G>) => (_: Kind1<F, G>) => G;
}
interface Foldable1<F extends URI1> extends IFoldable1<F> {
	URI: F;
}
export {Foldable1}

interface Foldable2<F extends URI2> {
	URI: F;
	foldl: <A, B>(_: (_: B) => (_: A) => B) => (_: B) => <T0>(_: Kind2<F, T0, A>) => B;
	foldr: <A, B>(_: (_: A) => (_: B) => B) => (_: B) => <T0>(_: Kind2<F, T0, A>) => B;
	foldMap: <G>(_: Monoid<G>) => <A>(_: (_: A) => G) => <T0>(_: Kind2<F, T0, A>) => G;
}
export {Foldable2}

interface Foldable2_<F extends URI2, T0> {
	URI: F;
	foldl: <A, B>(_: (_: B) => (_: A) => B) => (_: B) => (_: Kind2<F, T0, A>) => B;
	foldr: <A, B>(_: (_: A) => (_: B) => B) => (_: B) => (_: Kind2<F, T0, A>) => B;
	foldMap: <G>(_: Monoid<G>) => <A>(_: (_: A) => G) => (_: Kind2<F, T0, A>) => G;
}
export {Foldable2_}

namespace Foldable1 {
	export interface Ext<F extends URI1> extends IExtFoldable1<F> {
		//traverse_: <G extends URI1>(_: Applicative1<G>) => <A, B>(_: (_: A) => Kind1<G, B>) => (_: Kind1<F, A>) => Kind1<G, IUnit>;
	}
	export let Ext: <F extends URI1>(_: Foldable1<F>) => Ext<F> = (
		<F extends URI1>(Foldable: Foldable1<F>) => (
			define<Ext<F>>(Ext => ({
				foldr: <A, B>(f: (_: A) => (_: B) => B) => (b: B) => (foldableA: Kind1<F, A>) => (
					assign(
						Endo.Monoid<B>()
					)(_ => assign(
						Foldable.foldMap(_)((_: A) => Endo(f(_)))
					))(_ => assign(
						Endo.get(_(foldableA))
					))(_ => _(b))
				),
				foldl: <A, B>(f: (_: B) => (_: A) => B) => (b: B) => (foldableA: Kind1<F, A>) => (
					assign(
						Dual.Monoid(Endo.Monoid<B>())
					)(_ => assign(
						Foldable.foldMap(_)((_: A) => Dual(Endo(flip(f)(_))))
					))(_ => assign(
						Endo.get(Dual.get(_(foldableA)))
					))(_ => _(b))
				),
				fold: Monoid => Foldable.foldMap(Monoid)(id),
			}))
		)
	);
}

export default Foldable