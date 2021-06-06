import {HKT, URI1, URI2, Kind1, Kind2} from '../util/HKT'
import {Functor, Functor1, Functor2, Functor2_} from '../Data/Functor'
import {
	Function,
	reinterpret,
	cast,
} from '../../dependency/jcore/dist/ts-toolbelt'

interface Apply<F> extends Functor<F> {
	readonly ap: <A, B>(_: HKT<F, (_: A) => B>) => (_: HKT<F, A>) => HKT<F, B>;
}
export {Apply}
export {Apply as IApply}

interface Apply1<URI extends URI1> extends Functor1<URI> {
	readonly ap: <A, B>(_: Kind1<URI, (_: A) => B>) => (_: Kind1<URI, A>) => Kind1<URI, B>;
}
export {Apply1}

interface Apply2<URI extends URI2> extends Functor2<URI> {
	readonly ap: <T0, A, B>(_: Kind2<URI, T0, (_: A) => B>) => (_: Kind2<URI, T0, A>) => Kind2<URI, T0, B>;
}
export {Apply2}

interface Apply2_<URI extends URI2, T0> extends Functor2_<URI, T0> {
	readonly ap: <A, B>(_: Kind2<URI, T0, (_: A) => B>) => (_: Kind2<URI, T0, A>) => Kind2<URI, T0, B>;
}
export {Apply2_}

namespace Apply1 {
	export interface Ext<URI extends URI1> {
		readonly lift2: <A, B, C>(_: (_: A) => (_: B) => C) => (_: Kind1<URI, A>) => (_: Kind1<URI, B>) => Kind1<URI, C>;
	}
	export let Ext = <URI extends URI1>(Apply: Apply1<URI>) => (
		Function.define<Ext<URI>>(Ext => ({
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
	export interface Ext<URI extends URI2> {
		readonly lift2: <T0, A, B, C>(_: (_: A) => (_: B) => C) => (_: Kind2<URI, T0, A>) => (_: Kind2<URI, T0, B>) => Kind2<URI, T0, C>;
	}
	export let Ext = <URI extends URI2>(Apply: Apply2<URI>) => (
		Function.define<Ext<URI>>(Ext => ({
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
	export interface Ext<URI extends URI2, T0> {
		readonly lift2: <A, B, C>(_: (_: A) => (_: B) => C) => (_: Kind2<URI, T0, A>) => (_: Kind2<URI, T0, B>) => Kind2<URI, T0, C>;
	}
	export let Ext = <URI extends URI2, T0>(Apply: Apply2_<URI, T0>) => (
		Function.define<Ext<URI, T0>>(Ext => ({
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