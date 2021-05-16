import {Function} from './Function'
import {Tuple} from './Tuple'
import {Function as Function_} from './Function'

interface X<
	TArgs extends Tuple,
	TRet extends any
> {
	(x: X<TArgs, TRet>): Function<TArgs, TRet>;
}

interface Rec {
	(f: Function, ...as: Function.Args<typeof f>): Trampoline.State<Function.Ret<typeof f>>;
}

export namespace Trampoline {
	export interface State<TRet = any> {
		rec: Rec;
		thunk: () => TRet | State<TRet>;
	}

	export interface Function<
		TArgs extends Tuple = Tuple,
		TRet extends any = any
	> {
		(rec: Function_<TArgs, TRet | State<TRet>>, ...as: TArgs): TRet | State<TRet>;
	}
	export namespace Function {
		export type Args<TFunc> = TFunc extends Trampoline.Function<infer TArgs, any> ? TArgs : never;

		export type Ret<TFunc> = TFunc extends Trampoline.Function<any, infer TRet> ? TRet : never;
	}

	export let fn: Trampoline = f => {
		let rec: Rec = (f, ...as) => ({ rec, thunk: () => f(...as) });
		type TArgs = Trampoline.Function.Args<typeof f>;
		type TRet = Trampoline.Function.Ret<typeof f>;
		let isState = (state: any): state is State => state && state.rec === rec;
		return (...as) => (
			((state: State<TRet> | TRet) => {
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
	};

	export type Cont<T> = (acc: T) => T | State<T>;
}
export interface Trampoline {
	<
		TArgs extends Tuple = Tuple,
		TRet extends any = any
	>(f: Trampoline.Function<TArgs, TRet>): Function<TArgs, TRet>;
}

export let trampoline = Trampoline.fn;

export default Trampoline