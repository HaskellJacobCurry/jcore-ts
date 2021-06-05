import {IBool, Bool} from './IBool'

interface Eq<A> {
	readonly eq: (_: A) => (_: A) => IBool;
}
namespace Eq {
	export interface Ext<A> {
		readonly notEq: (_: A) => (_: A) => IBool;
	}
	export let Ext = <A>(Eq: Eq<A>): Ext<A> => ({
		notEq: eq0 => eq1 => Bool.not(Eq.eq(eq0)(eq1))
	});
}
export {Eq}
export {Eq as IEq}
export default Eq