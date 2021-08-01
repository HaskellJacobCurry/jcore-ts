import {HKT, URI1, URI2, Kind1, Kind2} from '../../Common/HKT'
import {Applicative, Applicative1, Applicative2, Applicative2C} from './Applicative'
import {Bind, Bind1, Bind2, Bind2C} from './Bind'
import {
	Json,
	define,
	assign,
	merge,
	json,
} from '../../Common/common'

/**
 * class (Applicative f, Bind f) <= Monad f
 * return :: a -> f a
 * 
 * laws
 *  left identity - return a >>= k = k a
 *  right identity - m >>= return = m
 *  - pure = return
 *  - m1 <*> m2 = m1 >>= (x1 -> m2 >>= (x2 -> return (x1 x2)))
 *  - fmap f xs  =  xs >>= return . f
 */
interface IMonad<F> {}
interface IExtMonad<F> {
	return: <A>(_: A) => HKT<F, A>;
	assign_: <K extends string>(k: K) => <A, B>(f: (_: A) => HKT<F, B>) => (_: HKT<F, A>) => HKT<F, A & {[_ in K]: B}>;
	assign: <A>(_: HKT<F, A>) => <K extends string>(k: K) => <B>(f: (_: A) => HKT<F, B>) => HKT<F, A & {[_ in K]: B}>;
	run: <A>(_: HKT<F, A>) => <B>(f: (_: A) => HKT<F, B>) => HKT<F, A>;
	Do: <TMonad extends Monad<F>>(_: TMonad) => <A>(f: (Do: HKT<F, {}>, api: TMonad) => HKT<F, A>) => HKT<F, A>;
}
interface Monad<F> extends IMonad<F>, Applicative<F>, Bind<F> {}
export {Monad}
export {Monad as IMonad}
namespace Monad {
	export interface Base<F> extends IMonad<F> {}
	
	export interface Ext<F> extends IExtMonad<F> {}
	export let Ext: <F>(_: Monad<F>) => Ext<F> = (
		<F>(MonadF: Monad<F>) => (
			((BindExtF = Bind.Ext(MonadF)) => (
				define<Ext<F>>(Ext => ({
					return: MonadF.pure,
					assign_: <K extends string>(k: K) => <A, B>(f: (_: A) => HKT<F, B>) => (monadA: HKT<F, A>) => (
						MonadF.bind(monadA)(a => (
							MonadF.fmap((b: B) => merge({}, a, json(k, b)))(f(a))
						))
					),
					assign: <A>(monadA: HKT<F, A>) => <K extends string>(k: K) => <B>(f: (_: A) => HKT<F, B>) => (
						MonadF.bind(monadA)(a => (
							MonadF.fmap((b: B) => merge({}, a, json(k, b)))(f(a))
						))
					),
					run: BindExtF.bindFirst,
					Do: api => f => f(MonadF.pure({}), api),
				}))
			))()
		)
	);

	export let instantiate: <F>() => <TMonad extends Monad<F>>(_: TMonad) => TMonad & Ext<F> = (
		() => _ => assign(_)(_ => merge(_, Ext(_)))
	);
}

interface IMonad1<F extends URI1> {}
interface IExtMonad1<F extends URI1> {
	return: <A>(_: A) => Kind1<F, A>;
	assign_: <K extends string>(k: K) => <A, B>(f: (_: A) => Kind1<F, B>) => (_: Kind1<F, A>) => Kind1<F, A & {[_ in K]: B}>;
	assign: <A>(_: Kind1<F, A>) => <K extends string>(k: K) => <B>(f: (_: A) => Kind1<F, B>) => Kind1<F, A & {[_ in K]: B}>;
	run: <A>(_: Kind1<F, A>) => <B>(f: (_: A) => Kind1<F, B>) => Kind1<F, A>;
	Do: <TMonad extends Monad1<F>>(_: TMonad) => <A>(f: (Do: Kind1<F, {}>, api: TMonad) => Kind1<F, A>) => Kind1<F, A>;
}
interface Monad1<F extends URI1> extends IMonad1<F>, Applicative1<F>, Bind1<F> {}
export {Monad1}

interface IMonad2<F extends URI2> {}
interface IExtMonad2<F extends URI2> {
	return: <T0, A>(_: A) => Kind2<F, T0, A>;
}
interface Monad2<F extends URI2> extends IMonad2<F>, Applicative2<F>, Bind2<F> {}
export {Monad2}

interface IMonad2C<F extends URI2, T0> {}
interface IExtMonad2C<F extends URI2, T0> {
	return: <A>(_: A) => Kind2<F, T0, A>;
}
interface Monad2C<F extends URI2, T0> extends IMonad2C<F, T0>, Applicative2C<F, T0>, Bind2C<F, T0> {}
export {Monad2C}

namespace Monad1 {
	export interface Base<F extends URI1> extends IMonad1<F> {}
	
	export interface Ext<F extends URI1> extends IExtMonad1<F> {}
	export let Ext: <F extends URI1>(_: Monad1<F>) => Ext<F> = (
		<F extends URI1>(MonadF: Monad1<F>) => (
			((BindExtF = Bind1.Ext(MonadF)) => (
				define<Ext<F>>(Ext => ({
					return: MonadF.pure,
					assign_: <K extends string>(k: K) => <A, B>(f: (_: A) => Kind1<F, B>) => (monadA: Kind1<F, A>) => (
						MonadF.bind(monadA)(a => (
							MonadF.fmap((b: B) => merge({}, a, json(k, b)))(f(a))
						))
					),
					assign: <A>(monadA: Kind1<F, A>) => <K extends string>(k: K) => <B>(f: (_: A) => Kind1<F, B>) => (
						MonadF.bind(monadA)(a => (
							MonadF.fmap((b: B) => merge({}, a, json(k, b)))(f(a))
						))
					),
					run: BindExtF.bindFirst,
					Do: api => f => f(MonadF.pure({}), api),
				}))
			))()
		)
	);

	export let instantiate: <F extends URI1>() => <TMonad extends Monad1<F>>(_: TMonad) => TMonad & Ext<F> = (
		() => _ => assign(_)(_ => merge(_, Ext(_)))
	);
}

namespace Monad2 {
	export interface Base<F extends URI2> extends IMonad2<F> {}
	
	export interface Ext<F extends URI2> extends IExtMonad2<F> {}
	export let Ext: <F extends URI2>(_: Monad2<F>) => Ext<F> = (
		<F extends URI2>(Monad: Monad2<F>) => (
			define<Ext<F>>(Ext => ({
				return: Monad.pure,
			}))
		)
	);

	export let instantiate: <F extends URI2>(_: Monad2<F>) => Monad2<F> & Ext<F> = (
		<F extends URI2>(_: Monad2<F>) => (
			assign(_)((_: Monad2<F>) => Json.assign(_, Ext(_)))
		)
	);
}

namespace Monad2C {
	export interface Base<F extends URI2, T0> extends IMonad2C<F, T0> {}
	
	export interface Ext<F extends URI2, T0> extends IExtMonad2C<F, T0> {}
	export let Ext: <F extends URI2, T0>(_: Monad2C<F, T0>) => Ext<F, T0> = (
		<F extends URI2, T0>(Monad: Monad2C<F, T0>) => (
			define<Ext<F, T0>>(Ext => ({
				return: Monad.pure,
			}))
		)
	);

	export let instantiate: <F extends URI2, T0>() => <TMonad extends Monad2C<F, T0>>(_: TMonad) => TMonad & Ext<F, T0> = (
		() => _ => assign(_)(_ => merge(_, Ext(_)))
	);
}

export default Monad