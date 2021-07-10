import {
	Json,
	reinterpret,
	cast,
} from '../../Common/common'

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

let True: IBool = {
	cata: fs => fs['True'](),
	not: () => False,
	and: _ => _,
	or: _ => True,
};
export {True}

let False: IBool = {
	cata: fs => fs['False'](),
	not: () => True,
	and: _ => False,
	or: _ => _,
}; 
export {False}

let IBool = Json.assign(
	(value: boolean): IBool => value ? True : False, {
		not,
		and,
		or,
		True,
		False,
	}
);
export default IBool