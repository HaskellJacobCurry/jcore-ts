import {Function} from './Function'

interface X<
	TArgs extends any[],
	TRet extends any
> {
	(x: X<TArgs, TRet>): Function<TArgs, TRet>;
}

interface Rec {
	(f: Function, ...as: Function.Args<typeof f>): trampoline.State<Function.Ret<typeof f>>;
}

namespace trampoline {
	export interface State<TRet = any> {
		rec: Rec;
		thunk: () => TRet | State<TRet>;
	}

	export type StateLike<T> = T | State<T>;

	export interface Func<
		TArgs extends any[] = any[],
		TRet extends any = any
	> {
		(rec: Function<TArgs, TRet | State<TRet>>, ...as: TArgs): TRet | State<TRet>;
	}
	export namespace Func {
		export type Args<TFunc> = TFunc extends Func<infer TArgs, any> ? TArgs : never;
		export type Ret<TFunc> = TFunc extends Func<any, infer TRet> ? TRet : never;
	}

	export interface Cont<T> {
		(acc: T): T | State<T>;
	}
}
interface trampoline {
	<
		TArgs extends any[],
		TRet extends any
	>(_: trampoline.Func<TArgs, TRet>): Function<TArgs, TRet>;
}
let trampoline: trampoline = (
	f => {
		let rec: Rec = (f, ...as) => ({ rec, thunk: () => f(...as) });
		type TArgs = trampoline.Func.Args<typeof f>;
		type TRet = trampoline.Func.Ret<typeof f>;
		let isState = (state: any): state is trampoline.State => state && state.rec === rec;
		return (...as) => (
			((state: trampoline.State<TRet> | TRet) => {
				while (isState(state)) {
					state = state.thunk();
				}
				return state;
			})(
				(x => x(x))(<X<TArgs, TRet>>
					(x => (...as) => (
						(s => (
							rec(() => f(s, ...as))
						))((...as: TArgs) => x(x)(...as))
					))
				)(...as)
			)
		);
	}
);
export {trampoline}
export default trampoline