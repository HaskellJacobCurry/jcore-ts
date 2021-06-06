import { Cast } from './common';
export interface Function<TArgs extends any[] = any[], TRet extends any = any> {
    (...as: TArgs): TRet;
}
export declare namespace Function {
    let validate: (a: any) => a is Function<any[], any>;
    type Args<TFunc extends Function> = TFunc extends Function<infer TArgs, any> ? Cast<TArgs, any[]> : never;
    type Ret<TFunc extends Function> = TFunc extends Function<any, infer TRet> ? TRet : never;
    type Id<T = any> = Function<[T], T>;
    namespace Define {
        interface Generator<T> {
            (rec: Function<[], T>): T;
        }
    }
    interface Define {
        <T>(f: Define.Generator<T>): T;
    }
    let define: Define;
    let assign: <T>(_: T) => <U>(f: (_: T) => U) => U;
}
export default Function;
