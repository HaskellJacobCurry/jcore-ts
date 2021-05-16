import {Function} from './Function'
import {Tuple} from './Tuple'
import {Function as Function_} from './Function'
import {Promise, Promisable} from './Promise'

export namespace PromisedTrampoline {
	export interface Function<
		TArgs extends Tuple = Tuple,
		TRet extends any = any
	> {
		(rec: Function_<TArgs, TRet>, ...as: TArgs): TRet;
	}
	export namespace Function {
		export type Args<TFunc> = TFunc extends Function<infer TArgs, any> ? TArgs : never;

		export type Ret<TFunc> = TFunc extends Function<any, infer TRet> ? TRet : never;
	}
}
export interface PromisedTrampoline {
	<
		TArgs extends Tuple = Tuple,
		TRet extends any = any
	>(f: PromisedTrampoline.Function<TArgs, Promisable<Promise.Unlift<TRet>>>): Function<TArgs, Promise<Promise.Unlift<TRet>>>;
}