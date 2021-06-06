import {Cast} from './common'

export interface Function<
	TArgs extends any[] = any[],
	TRet extends any = any
> {
	(...as: TArgs): TRet;
}
export namespace Function {
	export let validate = (a: any): a is Function => typeof a === 'function';

	export type Args<
		TFunc extends Function
	> = TFunc extends Function<infer TArgs, any> ? Cast<TArgs, any[]> : never;

	export type Ret<
		TFunc extends Function
	> = TFunc extends Function<any, infer TRet> ? TRet : never;

	export type Id<T = any> = Function<[T], T>;

	interface X<T> {
		(x: Function<[X<T>], T>): T;
	}
	export namespace Define {
		export interface Generator<T> {
			(rec: Function<[], T>): T;
		}
	}
	export interface Define {
		<T>(f: Define.Generator<T>): T;
	}
	export let define: Define = <T>(f: Define.Generator<T>): T => (
		((a?: T) => (
			(x => x(x))((x: X<T>) => f(() => a || (a = x(x))))
		))()
	);

	export let assign = <T>(_: T) => <U>(f: (_: T) => U): U => f(_);
}

export default Function