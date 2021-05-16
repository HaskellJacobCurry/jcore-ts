import {Compare} from './Compare'

export type Any = any;
export namespace Any {
	export let compare: Compare<Any> = (value0, value1) => (
		value0 < value1 ? -1 : value1 < value0 ? 1 : 0
	);
}