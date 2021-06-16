import {
	reinterpret,
	cast,
} from '../util/common'

interface IBool {
	cata: <T, U>(
		fs: {
			False: () => T;
			True: () => U;
		}
	) => T | U;
	not: () => IBool;
	and: (_: IBool) => IBool;
	or: (_: IBool) => IBool;
}
export {IBool}

let not: <TBool extends IBool>(_: TBool) => TBool = (
	bool => cast(bool.not())()
);
export {not}

let and: <TBool extends IBool>(_: TBool) => (_: TBool) => TBool = (
	bool0 => bool1 => cast(bool0.and(bool1))()
);
export {and}

let or: <TBool extends IBool>(_: TBool) => (_: TBool) => TBool = (
	bool0 => bool1 => cast(bool0.or(bool1))()
);
export {or}

let IBool = {
	not,
	and,
	or,
};
export default IBool