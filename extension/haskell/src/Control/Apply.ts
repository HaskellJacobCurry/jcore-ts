import {HKT, URI1, URI2, Kind1, Kind2} from '../util/HKT'
import {Functor, Functor1, Functor2, Functor2_} from '../Data/Functor'
import {
	Function,
	reinterpret,
	id_,
	id,
	const_,
} from '../util/common'

/**
 * class (Functor f) <= Apply f where
 *  ap :: f (a -> b) -> f a -> f b
 *   alias :: [(<*>)]
 *  liftA2 :: (a -> b -> c) -> f a -> f b -> f c
 * fstAp :: f a -> f b -> f a
 *  alias :: [(<*)]
 * sndAp :: f a -> f b -> f b
 *  alias :: [(*>)]
 */
interface IApply<F> {
	ap: <A, B>(_: HKT<F, (_: A) => B>) => (_: HKT<F, A>) => HKT<F, B>;
	liftA2: <A, B, C>(_: (_: A) => (_: B) => C) => (_: HKT<F, A>) => (_: HKT<F, B>) => HKT<F, C>;
}
interface Apply<F> extends Functor<F>, IApply<F> {}
export {Apply}
export {Apply as IApply}

namespace Apply {
	export let Def: <F>(_: Apply<F>) => IApply<F> = (
		<F>(Apply: Apply<F>) => <IApply<F>>{
			ap: <A, B>(_0: HKT<F, (_: A) => B>) => (_1: HKT<F, A>) => (
				Apply.liftA2(id_<(_: A) => B>())(_0)(_1)
			),
			liftA2: f => applyA => applyB => (
				Function.assign(
					Apply.fmap(f)(applyA)
				)(_ => Apply.ap(_)(applyB))
			),
		}
	);

	export interface Ext<F> {
		fstAp: <A>(_: HKT<F, A>) => <B>(_: HKT<F, B>) => HKT<F, A>;
		sndAp: <A>(_: HKT<F, A>) => <B>(_: HKT<F, B>) => HKT<F, B>;
	}
	export let Ext: <F>(_: Apply<F>) => Ext<F> = (
		<F>(Apply: Apply<F>) => (
			Function.define<Ext<F>>(Ext => ({
				fstAp: applyA => applyB => (
					Function.assign(
						Apply.fmap(const_)(applyA)
					)(_ => Apply.ap(_)(applyB))
				),
				sndAp: applyA => applyB => (
					Function.assign(
						Apply.fmap(const_)(applyB)
					)(_ => Apply.ap(_)(applyA))
				),
			}))
		)
	);
}

interface IApply1<F extends URI1> {
	ap: <A, B>(_: Kind1<F, (_: A) => B>) => (_: Kind1<F, A>) => Kind1<F, B>;
	liftA2: <A, B, C>(_: (_: A) => (_: B) => C) => (_: Kind1<F, A>) => (_: Kind1<F, B>) => Kind1<F, C>;
}
interface Apply1<F extends URI1> extends Functor1<F>, IApply1<F> {}
export {Apply1}

interface IApply2<F extends URI2> {
	ap: <T0, A, B>(_: Kind2<F, T0, (_: A) => B>) => (_: Kind2<F, T0, A>) => Kind2<F, T0, B>;
	liftA2: <T0, A, B, C>(_: (_: A) => (_: B) => C) => (_: Kind2<F, T0, A>) => (_: Kind2<F, T0, B>) => Kind2<F, T0, C>;
}
interface Apply2<F extends URI2> extends Functor2<F>, IApply2<F> {}
export {Apply2}

interface IApply2_<F extends URI2, T0> {
	ap: <A, B>(_: Kind2<F, T0, (_: A) => B>) => (_: Kind2<F, T0, A>) => Kind2<F, T0, B>;
	liftA2: <A, B, C>(_: (_: A) => (_: B) => C) => (_: Kind2<F, T0, A>) => (_: Kind2<F, T0, B>) => Kind2<F, T0, C>;
}
interface Apply2_<F extends URI2, T0> extends Functor2_<F, T0>, IApply2_<F, T0> {}
export {Apply2_}

namespace Apply1 {
	export let Def: <F extends URI1>(_: Apply1<F>) => IApply1<F> = (
		<F extends URI1>(Apply: Apply1<F>) => <IApply1<F>>{
			ap: <A, B>(_0: Kind1<F, (_: A) => B>) => (_1: Kind1<F, A>) => (
				Apply.liftA2(id_<(_: A) => B>())(_0)(_1)
			),
			liftA2: f => applyA => applyB => (
				Function.assign(
					Apply.fmap(f)(applyA)
				)(_ => Apply.ap(_)(applyB))
			),
		}
	);

	export interface Ext<F extends URI1> {
	}
	export let Ext: <F extends URI1>(_: Apply1<F>) => Ext<F> = (
		<F extends URI1>(Apply: Apply1<F>) => (
			Function.define<Ext<F>>(Ext => ({
			}))
		)
	);
}

namespace Apply2 {
	export let Def: <F extends URI2>(_: Apply2<F>) => IApply2<F> = (
		<F extends URI2>(Apply: Apply2<F>) => <IApply2<F>>{
			ap: <T0, A, B>(_0: Kind2<F, T0, (_: A) => B>) => (_1: Kind2<F, T0, A>) => (
				Apply.liftA2<T0, (_: A) => B, A, B>(id)(_0)(_1)
			),
			liftA2: f => applyA => applyB => (
				Function.assign(
					Apply.fmap(f)(applyA)
				)(_ => Apply.ap(_)(applyB))
			),
		}
	);

	export interface Ext<F extends URI2> {
		
	}
	export let Ext: <F extends URI2>(_: Apply2<F>) => Ext<F> = (
		<F extends URI2>(Apply: Apply2<F>) => (
			Function.define<Ext<F>>(Ext => ({
			}))
		)
	);
}

namespace Apply2_ {
	export let Def: <F extends URI2, T0>(_: Apply2_<F, T0>) => IApply2_<F, T0> = (
		<F extends URI2, T0>(Apply: Apply2_<F, T0>) => <IApply2_<F, T0>>{
			ap: <A, B>(_0: Kind2<F, T0, (_: A) => B>) => (_1: Kind2<F, T0, A>) => (
				Apply.liftA2(id_<(_: A) => B>())(_0)(_1)
			),
			liftA2: f => applyA => applyB => (
				Function.assign(
					Apply.fmap(f)(applyA)
				)(_ => Apply.ap(_)(applyB))
			),
		}
	);

	export interface Ext<F extends URI2, T0> {
		
	}
	export let Ext: <F extends URI2, T0>(_: Apply2_<F, T0>) => Ext<F, T0> = (
		<F extends URI2, T0>(Apply: Apply2_<F, T0>) => (
			Function.define<Ext<F, T0>>(Ext => ({
			}))
		)
	);
}

export default Apply