import { Function } from './Function';
import { Tuple } from './Tuple';
import { Cast, Partial } from './common';
declare type _StrictCurry<TFunc extends Function, TArgs extends Function.Args<TFunc> = Function.Args<TFunc>, TRet extends Function.Ret<TFunc> = Function.Ret<TFunc>> = (Tuple.Size<TArgs> extends 0 ? TRet : (a: Tuple.Head<TArgs>) => _StrictCurry<Function<Tuple.Tail<TArgs>, TRet>>);
export declare type StrictCurry<TFunc extends Function, TArgs extends Function.Args<TFunc> = Function.Args<TFunc>, TRet extends Function.Ret<TFunc> = Function.Ret<TFunc>> = (Tuple.Size<TArgs> extends 0 ? Function<[], TRet> : (a: Tuple.Head<TArgs>) => _StrictCurry<Function<Tuple.Tail<TArgs>, TRet>>);
export declare namespace StrictCurry {
    let fn: <TFunc extends Function<any[], any>>(f: TFunc) => StrictCurry<TFunc, Function.Args<TFunc>, Function.Ret<TFunc>>;
}
export declare let strictCurry: <TFunc extends Function<any[], any>>(f: TFunc) => StrictCurry<TFunc, Function.Args<TFunc>, Function.Ret<TFunc>>;
declare type _Curry<TFunc extends Function, TArgs extends Function.Args<TFunc> = Function.Args<TFunc>, TRet extends Function.Ret<TFunc> = Function.Ret<TFunc>> = (Tuple.Size<TArgs> extends 0 ? TRet : <UArgs extends Cast<Partial<TArgs>, Tuple>>(...as: Cast<UArgs, Tuple>) => (Tuple.ShiftN<TArgs, Tuple.Size<UArgs>> extends infer TArgs ? (_Curry<Function<Cast<TArgs, Tuple>, TRet>>) : never));
export declare type Curry<TFunc extends Function, TArgs extends Function.Args<TFunc> = Function.Args<TFunc>, TRet extends Function.Ret<TFunc> = Function.Ret<TFunc>> = (Tuple.Size<TArgs> extends 0 ? Function<[], TRet> : _Curry<TFunc, TArgs, TRet>);
export declare namespace Curry {
    let fn: <TFunc extends Function<any[], any>>(f: TFunc) => Curry<TFunc, Function.Args<TFunc>, Function.Ret<TFunc>>;
}
export declare let curry: <TFunc extends Function<any[], any>>(f: TFunc) => Curry<TFunc, Function.Args<TFunc>, Function.Ret<TFunc>>;
export {};
