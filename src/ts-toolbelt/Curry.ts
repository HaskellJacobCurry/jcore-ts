import {Function} from './Function'
import {Tuple} from './Tuple'
import {
	Cast,
	Partial,
	Required,
} from './common'
import {Array} from '../../dependency/dist/container/Array'

type _StrictCurry<
	TFunc extends Function,
	TArgs extends Function.Args<TFunc> = Function.Args<TFunc>,
	TRet extends Function.Ret<TFunc> = Function.Ret<TFunc>
> = (
	Tuple.Size<TArgs> extends 0 ?
	TRet :
	(a: Tuple.Head<TArgs>) => _StrictCurry<Function<Tuple.Tail<TArgs>, TRet>>
);
export type StrictCurry<
	TFunc extends Function,
	TArgs extends Function.Args<TFunc> = Function.Args<TFunc>,
	TRet extends Function.Ret<TFunc> = Function.Ret<TFunc>
> = (
	Tuple.Size<TArgs> extends 0 ?
	Function<[], TRet> :
	(a: Tuple.Head<TArgs>) => _StrictCurry<Function<Tuple.Tail<TArgs>, TRet>>
);
export namespace StrictCurry {
	export let fn = <TFunc extends Function>(f: TFunc) => <StrictCurry<TFunc>>(
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
}
export let strictCurry = StrictCurry.fn;

type _Curry<
	TFunc extends Function,
	TArgs extends Function.Args<TFunc> = Function.Args<TFunc>,
	TRet extends Function.Ret<TFunc> = Function.Ret<TFunc>
> = (
	Tuple.Size<TArgs> extends 0 ?
	TRet :
	<UArgs extends Cast<Partial<TArgs>, Tuple>>(...as: Cast<UArgs, Tuple>) => (
		Tuple.ShiftN<TArgs, Tuple.Size<UArgs>> extends infer TArgs ? (
			_Curry<Function<Cast<TArgs, Tuple>, TRet>>
		) : never
	)
);
export type Curry<
	TFunc extends Function,
	TArgs extends Function.Args<TFunc> = Function.Args<TFunc>,
	TRet extends Function.Ret<TFunc> = Function.Ret<TFunc>
> = (
	Tuple.Size<TArgs> extends 0 ?
	Function<[], TRet> :
	_Curry<TFunc, TArgs, TRet>
);
export namespace Curry {
	export let fn = <TFunc extends Function>(f: TFunc) => <Curry<TFunc>>(
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
}
export let curry = Curry.fn;