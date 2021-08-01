import {HKT, URI1, URI2, Kind1, Kind2} from '../../Common/HKT'
import {Apply, Apply1, Apply2, Apply2C} from './Apply'
import {
	Json,
	assign,
	define,
	merge,
	id_,
} from '../../Common/common'

/**
 * class (Apply f) <= Bind f where
 *  bind :: f a -> (a -> f b) -> f b
 *   alias :: (>>=)
 * sequence :: f a -> f b -> f b
 *  alias :: (>>)
 * 
 * law
 *  associativity - m >>= (\x -> k x >>= h) = (m >>= k) >>= h
 * 
 * default
 *  (>>) = (*>)
 */
interface IBind<F> {
	bind: <A>(_: HKT<F, A>) => <B>(_: (_: A) => HKT<F, B>) => HKT<F, B>;
}
interface IExtBind<F> {
	sequence: <A>(_: HKT<F, A>) => <B>(_: HKT<F, B>) => HKT<F, B>;
	bindFirst: <A>(_: HKT<F, A>) => <B>(f: (_: A) => HKT<F, B>) => HKT<F, A>;
}
interface Bind<F> extends IBind<F>, Apply<F> {}
export {Bind}
export {Bind as IBind}
namespace Bind {
	export interface Base<F> extends IBind<F> {}
	
	export interface Ext<F> extends IExtBind<F> {}
	export let Ext: <F>(_: Bind<F>) => Ext<F> = (
		<F>(BindF: Bind<F>) => (
			((ApplyExt = Apply.Ext(BindF)) => (
				define<Ext<F>>(Ext => ({
					sequence: ApplyExt.sndAp,
					bindFirst: <A>(BindA: HKT<F, A>) => <B>(f: (_: A) => HKT<F, B>) => (
						BindF.bind(BindA)(a => (
							BindF.fmap((_: B) => a)(f(a))
						))
					)
				}))
			))()
		)
	);

	export let instantiate: <F>() => <TBind extends Bind<F>>(_: TBind) => TBind & Ext<F> = (
		() => _ => assign(_)(_ => merge(_, Ext(_)))
	);
}

interface IBind1<F extends URI1> {
	bind: <A>(_: Kind1<F, A>) => <B>(_: (_: A) => Kind1<F, B>) => Kind1<F, B>;
}
interface IExtBind1<F extends URI1> {
	sequence: <A>(_: Kind1<F, A>) => <B>(_: Kind1<F, B>) => Kind1<F, B>;
	bindFirst: <A>(_: Kind1<F, A>) => <B>(f: (_: A) => Kind1<F, B>) => Kind1<F, A>;
}
interface Bind1<F extends URI1> extends IBind1<F>, Apply1<F> {}
export {Bind1}

interface IBind2<F extends URI2> {
	bind: <T0, A>(_: Kind2<F, T0, A>) => <B>(_: (_: A) => Kind2<F, T0, B>) => Kind2<F, T0, B>;
}
interface IExtBind2<F extends URI2> {
	sequence: <T0, A>(_: Kind2<F, T0, A>) => <B>(_: Kind2<F, T0, B>) => Kind2<F, T0, B>;
}
interface Bind2<F extends URI2> extends IBind2<F>, Apply2<F> {}
export {Bind2}

interface IBind2C<F extends URI2, T0> {
	bind: <A>(_: Kind2<F, T0, A>) => <B>(_: (_: A) => Kind2<F, T0, B>) => Kind2<F, T0, B>;
}
interface IExtBind2C<F extends URI2, T0> {
	sequence: <A>(_: Kind2<F, T0, A>) => <B>(_: Kind2<F, T0, B>) => Kind2<F, T0, B>;
}
interface Bind2C<F extends URI2, T0> extends IBind2C<F, T0>, Apply2C<F, T0> {}
export {Bind2C}

namespace Bind1 {
	export interface Base<F extends URI1> extends IBind1<F> {}
	
	export interface Ext<F extends URI1> extends IExtBind1<F> {}
	export let Ext: <F extends URI1>(_: Bind1<F>) => Ext<F> = (
		<F extends URI1>(BindF: Bind1<F>) => (
			((ApplyExt = Apply1.Ext(BindF)) => (
				define<Ext<F>>(Ext => ({
					sequence: ApplyExt.sndAp,
					bindFirst: <A>(BindA: Kind1<F, A>) => <B>(f: (_: A) => Kind1<F, B>) => (
						BindF.bind(BindA)(a => (
							BindF.fmap((_: B) => a)(f(a))
						))
					)
				}))
			))()
		)
	);

	export let instantiate: <F extends URI1>() => <TBind extends Bind1<F>>(_: TBind) => TBind & Ext<F> = (
		() => _ => assign(_)(_ => merge(_, Ext(_)))
	);
}

namespace Bind2 {
	export interface Base<F extends URI2> extends IBind2<F> {}
	
	export interface Ext<F extends URI2> extends IExtBind2<F> {}
	export let Ext: <F extends URI2>(_: Bind2<F>) => Ext<F> = (
		<F extends URI2>(Bind: Bind2<F>) => (
			((ApplyExt = Apply2.Ext(Bind)) => (
				define<Ext<F>>(Ext => ({
					sequence: ApplyExt.sndAp,
				}))
			))()
		)
	);

	export let instantiate: <F extends URI2>() => <TBind extends Bind2<F>>(_: TBind) => TBind & Ext<F> = (
		() => _ => assign(_)(_ => merge(_, Ext(_)))
	);
}

namespace Bind2C {
	export interface Base<F extends URI2, T0> extends IBind2C<F, T0> {}
	
	export interface Ext<F extends URI2, T0> extends IExtBind2C<F, T0> {}
	export let Ext: <F extends URI2, T0>(_: Bind2C<F, T0>) => Ext<F, T0> = (
		<F extends URI2, T0>(Bind: Bind2C<F, T0>) => (
			((ApplyExt = Apply2C.Ext(Bind)) => (
				define<Ext<F, T0>>(Ext => ({
					sequence: ApplyExt.sndAp,
				}))
			))()
		)
	);

	export let instantiate: <F extends URI2, T0>() => <TBind extends Bind2C<F, T0>>(_: TBind) => TBind & Ext<F, T0> = (
		() => _ => assign(_)(_ => merge(_, Ext(_)))
	);
}

export default Bind