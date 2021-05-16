import {StrictCurry, Curry} from '../ts-toolbelt/Curry'
import {Function} from '../ts-toolbelt/Function'
import {Array} from '../../dependency/dist/container/Array'

export let strictCurry = <TFunc extends Function>(f: TFunc) => <StrictCurry<TFunc>>(
	f.length == 0 ?
	f :
	(a: any) => (
		(function strictCurry(args = new Array([a])) {
			if (args.size() == f.length) {
				return f.apply(null, args.unlift());
			} else {
				return (a: any) => strictCurry(args.push_(a));
			}
		})()
	)
);

export let curry = <TFunc extends Function>(f: TFunc) => <Curry<TFunc>>(
	f.length == 0 ?
	f :
	(...as: any[]) => (
		(function curry(args = new Array(as)) {
			if (args.size() == f.length) {
				return f.apply(null, args.unlift());
			} else {
				return (...as: any[]) => curry(args.push(as));
			}
		})()
	)
);