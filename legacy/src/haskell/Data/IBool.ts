import {
	Construct,
	polymorph
} from '../../ts-toolbelt'

interface Bool {
	not: <TBool extends IBool>(_: TBool) => TBool;
	and: <TBool extends IBool>(_: TBool) => (_: TBool) => TBool;
	or: <TBool extends IBool>(_: TBool) => (_: TBool) => TBool;
}
namespace Bool {
	export let not: Bool['not'] = bool => polymorph(bool.not());

	export let and: Bool['and'] = bool0 => bool1 => polymorph(bool0.and(bool1));

	export let or: Bool['and'] = bool0 => bool1 => polymorph(bool0.or(bool1));
}
export {Bool}

interface IBool {
	construct: CBool<IBool>;
	cata: IBool.Cata;
	not(): IBool;
	and(_: IBool): IBool;
	or(_: IBool): IBool;
}
namespace IBool {
	export interface Cata {
		<T, U>(fs: {
			True: () => T;
			False: () => U;
		}): T | U;
	}
}
export {IBool}
export interface CBool<TBool extends IBool = IBool> extends Construct<TBool> {}