import {Bool} from './Bool'
import {Compare} from './Compare'

export interface StrictWeakOrdering<
	T extends any = any
> {
	(a: T, b: T): Bool;
}
export namespace StrictWeakOrdering {
	export let fromCompare = <T extends any>(cmp: Compare<T>): StrictWeakOrdering<T> => (
		(a, b) => ((res = cmp(a, b)) => res == -1 ? true : false)()
	);
}
export default StrictWeakOrdering