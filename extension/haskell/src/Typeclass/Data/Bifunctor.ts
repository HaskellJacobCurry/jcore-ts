import {HKT2, URI1, URI2, Kind1, Kind2} from '../../Common/HKT'
import {
	merge,
	define,
	assign,
	id_,
} from '../../Common/common'

/**
 * class Bifunctor f where
 *  bimap :: (a -> c) -> (b -> d) -> f a b -> f c d
 * lmap :: (a -> c) -> f a b -> f c b
 * rmap :: (b -> d) -> f a b -> f a d
 */
interface IBifunctor<F> {
	bimap: <A, C>(_: (_: A) => C) => <B, D>(_: (_: B) => D) => (_: HKT2<F, A, B>) => HKT2<F, C, D>;
}
interface IExtBifunctor<F> {
	lmap: <A, C>(_: (_: A) => C) => <B>(_: HKT2<F, A, B>) => HKT2<F, C, B>;
	rmap: <B, D>(_: (_: B) => D) => <A>(_: HKT2<F, A, B>) => HKT2<F, A, D>;
}
interface Bifunctor<F> extends IBifunctor<F> {
	URI: F;
}
export {Bifunctor}
export {Bifunctor as IBifunctor}
namespace Bifunctor {
	export interface Ext<F> extends IExtBifunctor<F> {}
	export let Ext: <F>(_: Bifunctor<F>) => Ext<F> = (
		<F>(BifunctorF: Bifunctor<F>) => (
			define<Ext<F>>(Ext => ({
				lmap: <A, C>(f: (_: A) => C) => <B>(bifunctor: HKT2<F, A, B>) => (
					BifunctorF.bimap(f)(id_<B>())(bifunctor)
				),
				rmap: <B, D>(f: (_: B) => D) => <A>(bifunctor: HKT2<F, A, B>) => (
					BifunctorF.bimap(id_<A>())(f)(bifunctor)
				),
			}))
		)
	);

	export let instantiate: <F>() => <TBifunctor extends Bifunctor<F>>(_: TBifunctor) => TBifunctor & Ext<F> = (
		() => _ => assign(_)(_ => merge(_, Ext(_)))
	);
}

interface IBifunctor2<F extends URI2> {
	bimap: <A, C>(_: (_: A) => C) => <B, D>(_: (_: B) => D) => (_: Kind2<F, A, B>) => Kind2<F, C, D>;
}
interface IExtBifunctor2<F extends URI2> {
	lmap: <A, C>(_: (_: A) => C) => <B>(_: Kind2<F, A, B>) => Kind2<F, C, B>;
	rmap: <B, D>(_: (_: B) => D) => <A>(_: Kind2<F, A, B>) => Kind2<F, A, D>;
}
interface Bifunctor2<F extends URI2> extends IBifunctor2<F> {
	URI: F;
}
export {Bifunctor2}

namespace Bifunctor2 {
	export interface Ext<F extends URI2> extends IExtBifunctor2<F> {}
	export let Ext: <F extends URI2>(_: Bifunctor2<F>) => Ext<F> = (
		<F extends URI2>(BifunctorF: Bifunctor2<F>) => (
			define<Ext<F>>(Ext => ({
				lmap: <A, C>(f: (_: A) => C) => <B>(bifunctor: Kind2<F, A, B>) => (
					BifunctorF.bimap(f)(id_<B>())(bifunctor)
				),
				rmap: <B, D>(f: (_: B) => D) => <A>(bifunctor: Kind2<F, A, B>) => (
					BifunctorF.bimap(id_<A>())(f)(bifunctor)
				),
			}))
		)
	);

	export let instantiate: <F extends URI2>() => <TBifunctor extends Bifunctor2<F>>(_: TBifunctor) => TBifunctor & Ext<F> = (
		() => _ => assign(_)(_ => merge(_, Ext(_)))
	);
}

export default Bifunctor