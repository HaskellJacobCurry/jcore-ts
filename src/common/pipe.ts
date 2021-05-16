import {Array} from '../../dependency/dist/container/Array'
import {Function} from '../ts-toolbelt/Function'

function pipe(): <T>(_: T) => T;

function pipe<TFunc extends Function>(f: TFunc): TFunc;

function pipe<
	T0, T1, T2
>(
	f0: (_: T0) => T1,
	f1: (_: T1) => T2
): (_: T0) => T2;

function pipe<
	T0, T1, T2, T3
>(
	f0: (_: T0) => T1,
	f1: (_: T1) => T2,
	f2: (_: T2) => T3
): (_: T0) => T3;

function pipe<
	T0, T1, T2, T3, T4
>(
	f0: (_: T0) => T1,
	f1: (_: T1) => T2,
	f2: (_: T2) => T3,
	f3: (_: T3) => T4
): (_: T0) => T4;

function pipe<
	T0, T1, T2, T3, T4, T5
>(
	f0: (_: T0) => T1,
	f1: (_: T1) => T2,
	f2: (_: T2) => T3,
	f3: (_: T3) => T4,
	f4: (_: T4) => T5
): (_: T0) => T5;

function pipe<
	T0, T1, T2, T3, T4, T5, T6
>(
	f0: (_: T0) => T1,
	f1: (_: T1) => T2,
	f2: (_: T2) => T3,
	f3: (_: T3) => T4,
	f4: (_: T4) => T5,
	f5: (_: T5) => T6
): (_: T0) => T6;

function pipe(...fs: Function[]): Function;

function pipe(...fs: Function[]): Function {
	return ((fs) => {
		let sz = fs.size();
		if (sz == 0) {
			return <Function>(_ => _);
		} else if (sz == 1) {
			return fs._at(0);
		} else {
			return <Function>(_ => fs.foldl((acc, f) => f(acc), _));
		}
	})(new Array(fs));
}

export default pipe
export {pipe}