import {IBool, Bool} from './IBool'

export interface Eq<A> {
	readonly eq: (_: A) => (_: A) => IBool;
}
export type IEq<A> = Eq<A>;
export namespace Eq {
	export interface Ext<A> {
		readonly notEq: (_: A) => (_: A) => IBool;
	}
	export let Ext = <A>(Eq: Eq<A>): Ext<A> => ({
		notEq: eq0 => eq1 => Bool.not(Eq.eq(eq0)(eq1))
	});
}
export default Eq