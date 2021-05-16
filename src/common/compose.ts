import {Array} from '../../dependency/dist/container/Array'
import {Function} from '../ts-toolbelt/Function'

function compose(): <T>(_: T) => T;

function compose<TFunc extends Function>(f: TFunc): TFunc;

function compose<
	T0, T1, T2
>(
	f1: (_: T1) => T2,
	f0: (_: T0) => T1
): (_: T0) => T2;

function compose<
	T0, T1, T2, T3
>(
	f2: (_: T2) => T3,
	f1: (_: T1) => T2,
	f0: (_: T0) => T1
): (_: T0) => T3;

function compose<
	T0, T1, T2, T3, T4
>(
	f3: (_: T3) => T4,
	f2: (_: T2) => T3,
	f1: (_: T1) => T2,
	f0: (_: T0) => T1
): (_: T0) => T4;

function compose<
	T0, T1, T2, T3, T4, T5
>(
	f4: (_: T4) => T5,
	f3: (_: T3) => T4,
	f2: (_: T2) => T3,
	f1: (_: T1) => T2,
	f0: (_: T0) => T1
): (_: T0) => T5;

function compose<
	T0, T1, T2, T3, T4, T5, T6
>(
	f5: (_: T5) => T6,
	f4: (_: T4) => T5,
	f3: (_: T3) => T4,
	f2: (_: T2) => T3,
	f1: (_: T1) => T2,
	f0: (_: T0) => T1
): (_: T0) => T6;

function compose(...fs: Function[]): Function;

function compose(...fs: Function[]): Function {
	return ((fs) => {
		let sz = fs.size();
		if (sz == 0) {
			return <Function>(_ => _);
		} else if (sz == 1) {
			return fs._at(0);
		} else {
			return <Function>(_ => fs.foldr((f, acc) => f(acc), _));
		}
	})(new Array(fs));
}

export default compose
export {compose}