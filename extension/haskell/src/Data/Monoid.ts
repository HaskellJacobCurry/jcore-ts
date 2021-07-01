import {Semigroup} from './Semigroup'
import {
	Json,
	define,
	assign
} from '../util/common'

/*
 * class (Semigroup f) <= Monoid f where
 *  mempty :: Unit -> f
 * mappend :: a -> a -> a
 */
interface IMonoid<A> {
	mempty: () => A;
}
interface IExtMonoid<A> {
	mappend: (_: A) => (_: A) => A;
}
interface Monoid<A> extends IMonoid<A>, Semigroup<A> {}
export {Monoid}
export {Monoid as IMonoid}
namespace Monoid {
	export interface Ext<A> extends IExtMonoid<A> {}
	export let Ext: <A>(_: Monoid<A>) => Ext<A> = (
		Monoid => (
			define(Ext => ({
				mappend: Monoid.append,
			}))
		)
	);

	export let instantiate = <A>(_: Monoid<A>) => (
		assign(_)((_: Monoid<A>) => Json.assign(_, Ext(_)))
	);
}
export default Monoid