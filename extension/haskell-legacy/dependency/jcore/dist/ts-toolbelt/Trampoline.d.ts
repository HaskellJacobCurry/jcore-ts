import { Function } from './Function';
import { Tuple } from './Tuple';
import { Function as Function_ } from './Function';
interface Rec {
    (f: Function, ...as: Function.Args<typeof f>): Trampoline.State<Function.Ret<typeof f>>;
}
export declare namespace Trampoline {
    interface State<TRet = any> {
        rec: Rec;
        thunk: () => TRet | State<TRet>;
    }
    interface Function<TArgs extends Tuple = Tuple, TRet extends any = any> {
        (rec: Function_<TArgs, TRet | State<TRet>>, ...as: TArgs): TRet | State<TRet>;
    }
    namespace Function {
        type Args<TFunc> = TFunc extends Trampoline.Function<infer TArgs, any> ? TArgs : never;
        type Ret<TFunc> = TFunc extends Trampoline.Function<any, infer TRet> ? TRet : never;
    }
    let fn: Trampoline;
    type Cont<T> = (acc: T) => T | State<T>;
}
export interface Trampoline {
    <TArgs extends Tuple = Tuple, TRet extends any = any>(f: Trampoline.Function<TArgs, TRet>): Function<TArgs, TRet>;
}
export declare let trampoline: Trampoline;
export default Trampoline;
