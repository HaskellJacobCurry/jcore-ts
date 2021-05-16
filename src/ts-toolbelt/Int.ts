import {Compare} from './Compare'
import {StrictWeakOrdering} from './StrictWeakOrdering'

export type Int = number;
export namespace Int {
	export let min = (a: Int, b: Int) => a < b ? a : b;
	export let max = (a: Int, b: Int) => b < a ? a : b;
	export let compare: Compare<Int> = (a, b) => a < b ? -1 : b < a ? 1 : 0;
	export let strictWeakOrdering = StrictWeakOrdering.fromCompare(compare);
	export let random = (min: Int, max: Int) => Date.now() % (max - min + 1) + min;
}

export default Int