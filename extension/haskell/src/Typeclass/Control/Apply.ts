import {HKT, URI1, URI2, Kind1, Kind2} from '../../Common/HKT'
import {Functor, Functor1, Functor2, Functor2C} from '../Data/Functor'
import {
	Json,
	assign,
	define,
	id_,
	id,
	const_,
	merge,
} from '../../Common/common'

/**
 * class (Functor f) <= Apply f where
 *  ap :: f (a -> b) -> f a -> f b
 *   alias :: (<*>)
 *  liftA2 :: (a -> b -> c) -> f a -> f b -> f c
 * fstAp :: f a -> f b -> f a
 *  alias :: (<*)
 * sndAp :: f a -> f b -> f b
 *  alias :: (*>)
 * 
 * laws
 *  - fmap f x = pure f <*> x
 * 
 * default
 *  (<*>) = liftA2 id
 *  liftA2 f x y = f <$> x <*> y
 *  u *> v = (id <$ u) <*> v
 *  u <* v = liftA2 const u v
 */
interface IApply<F> {
	ap: <A, B>(_: HKT<F, (_: A) => B>) => (_: HKT<F, A>) => HKT<F, B>;
	liftA2: <A, B, C>(_: (_: A) => (_: B) => C) => (_: HKT<F, A>) => (_: HKT<F, B>) => HKT<F, C>;
}
interface IExtApply<F> {
	fstAp: <A>(_: HKT<F, A>) => <B>(_: HKT<F, B>) => HKT<F, A>;
	sndAp: <A>(_: HKT<F, A>) => <B>(_: HKT<F, B>) => HKT<F, B>;
}
interface Apply<F> extends Functor<F>, IApply<F> {}
export {Apply}
export {Apply as IApply}

namespace Apply {
	export interface Base<F> extends IApply<F> {}
	
	export let Def: <F>(_: Apply<F>) => IApply<F> = (
		<F>(ApplyF: Apply<F>) => <IApply<F>>{
			ap: <A, B>(_0: HKT<F, (_: A) => B>) => (_1: HKT<F, A>) => (
				ApplyF.liftA2(id_<(_: A) => B>())(_0)(_1)
			),
			liftA2: f => applyA => applyB => (
				assign(
					ApplyF.fmap(f)(applyA)
				)(_ => ApplyF.ap(_)(applyB))
			),
		}
	);

	export interface Ext<F> extends IExtApply<F> {}
	export let Ext: <F>(_: Apply<F>) => Ext<F> = (
		<F>(Apply: Apply<F>) => (
			define<Ext<F>>(Ext => ({
				fstAp: _0 => _1 => Apply.liftA2(const_)(_0)(_1),
				sndAp: <A>(_0: HKT<F, A>) => <B>(_1: HKT<F, B>) => (
					assign(
						Apply.fmap(const_(id_<B>()))(_0)
					)(_ => Apply.ap(_)(_1))
				),
			}))
		)
	);

	export let instantiate: <F>() => <TApply extends Apply<F>>(_: TApply) => TApply & Ext<F> = (
		() => _ => assign(merge(Def(_), _))(_ => merge(_, Ext(_)))
	);
}

interface IApply1<F extends URI1> {
	ap: <A, B>(_: Kind1<F, (_: A) => B>) => (_: Kind1<F, A>) => Kind1<F, B>;
	liftA2: <A, B, C>(_: (_: A) => (_: B) => C) => (_: Kind1<F, A>) => (_: Kind1<F, B>) => Kind1<F, C>;
}
interface IExtApply1<F extends URI1> {
	fstAp: <A>(_: Kind1<F, A>) => <B>(_: Kind1<F, B>) => Kind1<F, A>;
	sndAp: <A>(_: Kind1<F, A>) => <B>(_: Kind1<F, B>) => Kind1<F, B>;
}
interface Apply1<F extends URI1> extends Functor1<F>, IApply1<F> {}
export {Apply1}

interface IApply2<F extends URI2> {
	ap: <T0, A, B>(_: Kind2<F, T0, (_: A) => B>) => (_: Kind2<F, T0, A>) => Kind2<F, T0, B>;
	liftA2: <T0, A, B, C>(_: (_: A) => (_: B) => C) => (_: Kind2<F, T0, A>) => (_: Kind2<F, T0, B>) => Kind2<F, T0, C>;
}
interface IExtApply2<F extends URI2> {
	fstAp: <T0, A>(_: Kind2<F, T0, A>) => <B>(_: Kind2<F, T0, B>) => Kind2<F, T0, A>;
	sndAp: <T0, A>(_: Kind2<F, T0, A>) => <B>(_: Kind2<F, T0, B>) => Kind2<F, T0, B>;
}
interface Apply2<F extends URI2> extends Functor2<F>, IApply2<F> {}
export {Apply2}

interface IApply2C<F extends URI2, T0> {
	ap: <A, B>(_: Kind2<F, T0, (_: A) => B>) => (_: Kind2<F, T0, A>) => Kind2<F, T0, B>;
	liftA2: <A, B, C>(_: (_: A) => (_: B) => C) => (_: Kind2<F, T0, A>) => (_: Kind2<F, T0, B>) => Kind2<F, T0, C>;
}
interface IExtApply2C<F extends URI2, T0> {
	fstAp: <A>(_: Kind2<F, T0, A>) => <B>(_: Kind2<F, T0, B>) => Kind2<F, T0, A>;
	sndAp: <A>(_: Kind2<F, T0, A>) => <B>(_: Kind2<F, T0, B>) => Kind2<F, T0, B>;
}
interface Apply2C<F extends URI2, T0> extends Functor2C<F, T0>, IApply2C<F, T0> {}
export {Apply2C}

namespace Apply1 {
	export interface Base<F extends URI1> extends IApply1<F> {}
	
	export let Def: <F extends URI1>(_: Apply1<F>) => IApply1<F> = (
		<F extends URI1>(Apply: Apply1<F>) => <IApply1<F>>{
			ap: <A, B>(_0: Kind1<F, (_: A) => B>) => (_1: Kind1<F, A>) => (
				Apply.liftA2(id_<(_: A) => B>())(_0)(_1)
			),
			liftA2: f => applyA => applyB => (
				assign(
					Apply.fmap(f)(applyA)
				)(_ => Apply.ap(_)(applyB))
			),
		}
	);

	export interface Ext<F extends URI1> extends IExtApply1<F> {}
	export let Ext: <F extends URI1>(_: Apply1<F>) => Ext<F> = (
		<F extends URI1>(Apply: Apply1<F>) => (
			define<Ext<F>>(Ext => ({
				fstAp: <A>(_0: Kind1<F, A>) => <B>(_1: Kind1<F, B>) => (
					Apply.liftA2<A, B, A>(const_)(_0)(_1)
				),
				sndAp: <A>(_0: Kind1<F, A>) => <B>(_1: Kind1<F, B>) => (
					assign(
						Apply.fmap(const_(id_<B>()))(_0)
					)(_ => Apply.ap(_)(_1))
				),
			}))
		)
	);

	export let instantiate: <F extends URI1>() => <TApply extends Apply1<F>>(_: TApply) => TApply & Ext<F> = (
		() => _ => assign(merge(Def(_), _))(_ => merge(_, Ext(_)))
	);
}

namespace Apply2 {
	export interface Base<F extends URI2> extends IApply2<F> {}
	
	export let Def: <F extends URI2>(_: Apply2<F>) => IApply2<F> = (
		<F extends URI2>(Apply: Apply2<F>) => <IApply2<F>>{
			ap: <T0, A, B>(_0: Kind2<F, T0, (_: A) => B>) => (_1: Kind2<F, T0, A>) => (
				Apply.liftA2<T0, (_: A) => B, A, B>(id)(_0)(_1)
			),
			liftA2: f => applyA => applyB => (
				assign(
					Apply.fmap(f)(applyA)
				)(_ => Apply.ap(_)(applyB))
			),
		}
	);

	export interface Ext<F extends URI2> extends IExtApply2<F> {}
	export let Ext: <F extends URI2>(_: Apply2<F>) => Ext<F> = (
		<F extends URI2>(Apply: Apply2<F>) => (
			define<Ext<F>>(Ext => ({
				fstAp: <T0, A>(_0: Kind2<F, T0, A>) => <B>(_1: Kind2<F, T0, B>) => (
					Apply.liftA2<T0, A, B, A>(const_)(_0)(_1)
				),
				sndAp: <T0, A>(_0: Kind2<F, T0, A>) => <B>(_1: Kind2<F, T0, B>) => (
					assign(
						Apply.fmap(const_(id_<B>()))(_0)
					)(_ => Apply.ap(_)(_1))
				),
			}))
		)
	);

	export let instantiate: <F extends URI2>() => <TApply extends Apply2<F>>(_: TApply) => TApply & Ext<F> = (
		() => _ => assign(merge(Def(_), _))(_ => merge(_, Ext(_)))
	);
}

namespace Apply2C {
	export interface Base<F extends URI2, T0> extends IApply2C<F, T0> {}
	
	export let Def: <F extends URI2, T0>(_: Apply2C<F, T0>) => IApply2C<F, T0> = (
		<F extends URI2, T0>(Apply: Apply2C<F, T0>) => <IApply2C<F, T0>>{
			ap: <A, B>(_0: Kind2<F, T0, (_: A) => B>) => (_1: Kind2<F, T0, A>) => (
				Apply.liftA2(id_<(_: A) => B>())(_0)(_1)
			),
			liftA2: f => applyA => applyB => (
				assign(
					Apply.fmap(f)(applyA)
				)(_ => Apply.ap(_)(applyB))
			),
		}
	);

	export interface Ext<F extends URI2, T0> extends IExtApply2C<F, T0> {}
	export let Ext: <F extends URI2, T0>(_: Apply2C<F, T0>) => Ext<F, T0> = (
		<F extends URI2, T0>(Apply: Apply2C<F, T0>) => (
			define<Ext<F, T0>>(Ext => ({
				fstAp: <A>(_0: Kind2<F, T0, A>) => <B>(_1: Kind2<F, T0, B>) => (
					Apply.liftA2<A, B, A>(const_)(_0)(_1)
				),
				sndAp: <A>(_0: Kind2<F, T0, A>) => <B>(_1: Kind2<F, T0, B>) => (
					assign(
						Apply.fmap(const_(id_<B>()))(_0)
					)(_ => Apply.ap(_)(_1))
				),
			}))
		)
	);

	export let instantiate: <F extends URI2, T0>() => <TApply extends Apply2C<F, T0>>(_: TApply) => TApply & Ext<F, T0> = (
		() => _ => assign(merge(Def(_), _))(_ => merge(_, Ext(_)))
	);
}

export default Apply