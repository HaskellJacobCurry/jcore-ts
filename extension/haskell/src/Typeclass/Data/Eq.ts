import {IBool} from './IBool'
import {
	merge,
	define,
	assign,
} from '../../Common/common'

/**
 * class Eq f where
 *  eq :: f -> f -> Bool
 * notEq :: Eq f => f -> f -> Bool
 */
interface IEq<A> {
	eq: (_: A) => (_: A) => IBool;
}
interface IExtEq<A> {
	notEq: (_: A) => (_: A) => IBool;
}
interface Eq<A> extends IEq<A> {}
export {Eq}
export {Eq as IEq}
namespace Eq {
	export interface Base<A> extends Eq<A> {}

	export interface Ext<A> extends IExtEq<A> {}
	export let Ext = <A>(Eq: Eq<A>): Ext<A> => ({
		notEq: eq0 => eq1 => IBool.not(Eq.eq(eq0)(eq1))
	});

	export let instantiate: <A>() => <TEq extends Eq<A>>(_: TEq) => TEq & Ext<A> = (
		() => _ => assign(_)(_ => merge(_, Ext(_)))
	);
}
export default Eq