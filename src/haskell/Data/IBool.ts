import {
	polymorph
} from '../../ts-toolbelt'

export interface Bool {
	not: <TBool extends IBool>(_: TBool) => TBool;
	and: <TBool extends IBool>(_: TBool) => (_: TBool) => TBool;
	or: <TBool extends IBool>(_: TBool) => (_: TBool) => TBool;
}
export namespace Bool {
	export let not: Bool['not'] = bool => polymorph(bool.not());

	export let and: Bool['and'] = bool0 => bool1 => polymorph(bool0.and(bool1));

	export let or: Bool['and'] = bool0 => bool1 => polymorph(bool0.or(bool1));
}

export interface IBool {
	cata: IBool.Cata;
	not(): IBool;
	and(_: IBool): IBool;
	or(_: IBool): IBool;
}
export namespace IBool {
	export interface Cata {
		<T, U>(fs: {
			True: () => T;
			False: () => U;
		}): T | U;
	}
}