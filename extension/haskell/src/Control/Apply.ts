import {HKT, URI1, URI2, Kind1, Kind2} from '../util/HKT'
import {Functor, Functor1, Functor2, Functor2_} from '../Data/Functor'
import {
	Function,
	reinterpret,
	cast,
} from '../../dependency/jcore/dist/ts-toolbelt'

/**
 * class (Functor f) <= Apply f where
 *  ap :: f (a -> b) -> f a -> f b
 * apFirst :: f a -> f b -> f a
 * apSecond :: f a -> f b -> f b
 * lift2 :: Apply f => (a -> b -> c) -> f a -> f b -> f c
 */

interface Apply<F> extends Functor<F> {
	ap: <A, B>(_: HKT<F, (_: A) => B>) => (_: HKT<F, A>) => HKT<F, B>;
}
export {Apply}
export {Apply as IApply}

interface Apply1<F extends URI1> extends Functor1<F> {
	ap: <A, B>(_: Kind1<F, (_: A) => B>) => (_: Kind1<F, A>) => Kind1<F, B>;
}
export {Apply1}

interface Apply2<F extends URI2> extends Functor2<F> {
	ap: <T0, A, B>(_: Kind2<F, T0, (_: A) => B>) => (_: Kind2<F, T0, A>) => Kind2<F, T0, B>;
}
export {Apply2}

interface Apply2_<F extends URI2, T0> extends Functor2_<F, T0> {
	ap: <A, B>(_: Kind2<F, T0, (_: A) => B>) => (_: Kind2<F, T0, A>) => Kind2<F, T0, B>;
}
export {Apply2_}

namespace Apply1 {
	export interface Ext<F extends URI1> {
		lift2: <A, B, C>(_: (_: A) => (_: B) => C) => (_: Kind1<F, A>) => (_: Kind1<F, B>) => Kind1<F, C>;
	}
	export let Ext = <F extends URI1>(Apply: Apply1<F>) => (
		Function.define<Ext<F>>(Ext => ({
			lift2: f => applyA => applyB => (
				Function.assign(
					Function.assign(
						Apply.map(f)(applyA)
					)(_ => Apply.ap(_)(applyB))
				)(_ => cast(_)())
			),
		}))
	);
}

namespace Apply2 {
	export interface Ext<F extends URI2> {
		lift2: <T0, A, B, C>(_: (_: A) => (_: B) => C) => (_: Kind2<F, T0, A>) => (_: Kind2<F, T0, B>) => Kind2<F, T0, C>;
	}
	export let Ext = <F extends URI2>(Apply: Apply2<F>) => (
		Function.define<Ext<F>>(Ext => ({
			lift2: f => applyA => applyB => (
				Function.assign(
					Function.assign(
						Apply.map(f)(applyA)
					)(_ => Apply.ap(_)(applyB))
				)(_ => cast(_)())
			),
		}))
	);
}

namespace Apply2_ {
	export interface Ext<F extends URI2, T0> {
		lift2: <A, B, C>(_: (_: A) => (_: B) => C) => (_: Kind2<F, T0, A>) => (_: Kind2<F, T0, B>) => Kind2<F, T0, C>;
	}
	export let Ext = <F extends URI2, T0>(Apply: Apply2_<F, T0>) => (
		Function.define<Ext<F, T0>>(Ext => ({
			lift2: f => applyA => applyB => (
				Function.assign(
					Function.assign(
						Apply.map(f)(applyA)
					)(_ => Apply.ap(_)(applyB))
				)(_ => cast(_)())
			),
		}))
	);
}

export default Apply