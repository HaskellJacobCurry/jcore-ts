import {IBool} from './IBool'

/**
 * class Eq f where
 *  eq :: f -> f -> Bool
 * notEq :: Eq f => f -> f -> Bool
 */

interface Eq<A> {
	eq: (_: A) => (_: A) => IBool;
}
namespace Eq {
	export interface Ext<A> {
		notEq: (_: A) => (_: A) => IBool;
	}
	export let Ext = <A>(Eq: Eq<A>): Ext<A> => ({
		notEq: eq0 => eq1 => IBool.not(Eq.eq(eq0)(eq1))
	});
}
export {Eq}
export {Eq as IEq}
export default Eq