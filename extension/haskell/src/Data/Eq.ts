import {IBool} from './IBool'

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
	export interface Ext<A> extends IExtEq<A> {}
	export let Ext = <A>(Eq: Eq<A>): Ext<A> => ({
		notEq: eq0 => eq1 => IBool.not(Eq.eq(eq0)(eq1))
	});
}
export default Eq