//import {IEq} from './IEq'

export interface IOrdering {
	cata: IOrdering.Cata;
}
export namespace IOrdering {
	export interface Cata {
		<T, U, K>(fs: {
			LT: () => T;
			GT: () => U;
			EQ: () => K;
		}): T | U | K;
	}
}