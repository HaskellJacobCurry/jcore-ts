import {Cast} from './common'

export interface Function<
	TArgs extends any[] = any[],
	TRet extends any = any
> {
	(...as: TArgs): TRet;
}
export namespace Function {
	export type Args<
		TFunc extends Function
	> = TFunc extends Function<infer TArgs, any> ? Cast<TArgs, any[]> : never;

	export type Ret<
		TFunc extends Function
	> = TFunc extends Function<any, infer TRet> ? TRet : never;
}

export default Function