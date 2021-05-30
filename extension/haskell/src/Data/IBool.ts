import {
	reinterpret,
	cast,
} from '../../dependency/jcore/dist/ts-toolbelt'

interface Bool {
	not: <TBool extends IBool>(_: TBool) => TBool;
	and: <TBool extends IBool>(_: TBool) => (_: TBool) => TBool;
	or: <TBool extends IBool>(_: TBool) => (_: TBool) => TBool;
}
let Bool: Bool = {
	not: bool0 => cast(bool0.not())(),
	and: bool0 => bool1 => cast(bool0.and(bool1))(),
	or: bool0 => bool1 => cast(bool0.or(bool1))(),
};
export {Bool}

export interface IBool {
	cata: <T, U>(
		fs: {
			False: () => T;
			True: () => U;
		}
	) => T | U;
	not(): IBool;
	and(other: IBool): IBool;
	or(other: IBool): IBool;
}

export default Bool