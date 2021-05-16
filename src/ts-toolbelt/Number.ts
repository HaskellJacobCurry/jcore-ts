import {Int} from './Int'

export type Number = number;
export namespace Number {
	export let floor = (a: Number): Int => Math.floor(a);
	export let ceil = (a: Number): Int => Math.ceil(a);
}

export default Number