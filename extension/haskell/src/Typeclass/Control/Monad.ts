import {HKT, URI1, URI2, Kind1, Kind2} from '../../Common/HKT'
import {Applicative, Applicative1, Applicative2, Applicative2C} from './Applicative'
import {Bind, Bind1, Bind2, Bind2C} from './Bind'
import {
	Json,
	define,
	assign,
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
}
interface Monad<F> extends IMonad<F>, Applicative<F>, Bind<F> {}
export {Monad}
export {Monad as IMonad}
namespace Monad {
	export interface Ext<F> extends IExtMonad<F> {}
	export let Ext: <F>(_: Monad<F>) => Ext<F> = (
		<F>(Monad: Monad<F>) => (
			define<Ext<F>>(Ext => ({
				return: Monad.pure,
			}))
		)
	);

	export let instantiate: <F>(_: Monad<F>) => Monad<F> & Ext<F> = (
		<F>(_: Monad<F>) => (
			assign(_)((_: Monad<F>) => Json.assign(_, Ext(_)))
		)
	);
}

interface IExtMonad1<F extends URI1> {
	return: <A>(_: A) => Kind1<F, A>;
}
interface Monad1<F extends URI1> extends Applicative1<F>, Bind1<F> {}
export {Monad1}

interface IExtMonad2<F extends URI2> {
	return: <T0, A>(_: A) => Kind2<F, T0, A>;
}
interface Monad2<F extends URI2> extends Applicative2<F>, Bind2<F> {}
export {Monad2}

interface IExtMonad2C<F extends URI2, T0> {
	return: <A>(_: A) => Kind2<F, T0, A>;
}
interface Monad2C<F extends URI2, T0> extends Applicative2C<F, T0>, Bind2C<F, T0> {}
export {Monad2C}

namespace Monad1 {
	export interface Ext<F extends URI1> extends IExtMonad1<F> {}
	export let Ext: <F extends URI1>(_: Monad1<F>) => Ext<F> = (
		<F extends URI1>(Monad: Monad1<F>) => (
			define<Ext<F>>(Ext => ({
				return: Monad.pure,
			}))
		)
	);

	export let instantiate: <F extends URI1>(_: Monad1<F>) => Monad1<F> & Ext<F> = (
		<F extends URI1>(_: Monad1<F>) => (
			assign(_)((_: Monad1<F>) => Json.assign(_, Ext(_)))
		)
	);
}

namespace Monad2 {
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
	export interface Ext<F extends URI2, T0> extends IExtMonad2C<F, T0> {}
	export let Ext: <F extends URI2, T0>(_: Monad2C<F, T0>) => Ext<F, T0> = (
		<F extends URI2, T0>(Monad: Monad2C<F, T0>) => (
			define<Ext<F, T0>>(Ext => ({
				return: Monad.pure,
			}))
		)
	);

	export let instantiate: <F extends URI2, T0>(_: Monad2C<F, T0>) => Monad2C<F, T0> & Ext<F, T0> = (
		<F extends URI2, T0>(_: Monad2C<F, T0>) => (
			assign(_)((_: Monad2C<F, T0>) => Json.assign(_, Ext(_)))
		)
	);
}

export default Monad