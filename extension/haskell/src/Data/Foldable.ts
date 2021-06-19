import {HKT, URI1, URI2, Kind1, Kind2} from '../util/HKT'
import {Monoid} from './Monoid'
import {Apply, Apply1} from '../Control/Apply'
import {Applicative, Applicative1} from '../Control/Applicative'
import {Eq} from './Eq'
import {IUnit} from './IUnit'
import {IInt} from './IInt'
import {IBool} from './IBool'
import {Endo} from './Monoid/Endo'
import {Dual} from './Monoid/Dual_'
import {Sum} from './Monoid/Sum_'
import {Any} from './Monoid/Any_'
import {
	define,
	assign,
	flip,
	id,
	const_,
} from '../util/common'

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
				length: foldableA => (
					assign(
						Foldable.foldMap(Sum.Monoid(IInt.Num))
					)(_ => assign(
						_<any>(_ => Sum(const_(IInt.Num.one())(_)))
					))(_ => assign(
						_(foldableA)
					))(Sum.get)
				),
				null: foldableA => (
					assign(
						Ext().length(foldableA)
					)(IInt.Eq.eq(IInt.Num.zero()))
				),
				elem: EqA => a => foldableA => (
					assign(
						Foldable.foldMap(Any.Monoid)
					)(_ => assign(
						_<any>(_ => Any(EqA.eq(a)(_)))
					))(_ => Any.get(_(foldableA)))
				),
				notElem: EqA => _0 => _1 => IBool.not(Ext().elem(EqA)(_0)(_1)),
				traverse_: <G>(ApplicativeG: Applicative<G>) => <A, B>(f: (_: A) => HKT<G, B>) => (foldableA: HKT<F, A>) => (
					((ApplyExtG = Apply.Ext(ApplicativeG)) => (
						assign(
							Ext().foldr<A, HKT<G, IUnit>>(a => b => ApplyExtG.sndAp(f(a))(b))
						)(_ => assign(
							_(ApplicativeG.pure(IUnit()))
						))(_ => _(foldableA))
					))()
				),
				for_: ApplicativeG => _0 => _1 => Ext().traverse_(ApplicativeG)(_1)(_0),
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
	export interface Ext<F extends URI1> extends IExtFoldable1<F> {}
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
				length: foldableA => (
					assign(
						Foldable.foldMap(Sum.Monoid(IInt.Num))
					)(_ => assign(
						_<any>(_ => Sum(const_(IInt.Num.one())(_)))
					))(_ => assign(
						_(foldableA)
					))(Sum.get)
				),
				null: foldableA => (
					assign(
						Ext().length(foldableA)
					)(IInt.Eq.eq(IInt.Num.zero()))
				),
				elem: EqA => a => foldableA => (
					assign(
						Foldable.foldMap(Any.Monoid)
					)(_ => assign(
						_<any>(_ => Any(EqA.eq(a)(_)))
					))(_ => Any.get(_(foldableA)))
				),
				notElem: EqA => _0 => _1 => IBool.not(Ext().elem(EqA)(_0)(_1)),
				traverse_: <G extends URI1>(ApplicativeG: Applicative1<G>) => <A, B>(f: (_: A) => Kind1<G, B>) => (foldableA: Kind1<F, A>) => (
					((ApplyExtG = Apply1.Ext(ApplicativeG)) => (
						assign(
							Ext().foldr<A, Kind1<G, IUnit>>(a => b => ApplyExtG.sndAp(f(a))(b))
						)(_ => assign(
							_(ApplicativeG.pure(IUnit()))
						))(_ => _(foldableA))
					))()
				),
				for_: ApplicativeG => _0 => _1 => Ext().traverse_(ApplicativeG)(_1)(_0),
			}))
		)
	);
}

export default Foldable