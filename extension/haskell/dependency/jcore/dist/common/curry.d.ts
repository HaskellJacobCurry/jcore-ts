import { StrictCurry, Curry } from '../ts-toolbelt/Curry';
import { Function } from '../ts-toolbelt/Function';
export declare let strictCurry: <TFunc extends Function<any[], any>>(f: TFunc) => StrictCurry<TFunc, Function.Args<TFunc>, Function.Ret<TFunc>>;
export declare let curry: <TFunc extends Function<any[], any>>(f: TFunc) => Curry<TFunc, Function.Args<TFunc>, Function.Ret<TFunc>>;
