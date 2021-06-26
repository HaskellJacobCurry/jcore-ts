import { Function } from './Function';
interface Rec {
    (f: Function, ...as: Function.Args<typeof f>): trampoline.State<Function.Ret<typeof f>>;
}
declare namespace trampoline {
    interface State<TRet = any> {
        rec: Rec;
        thunk: () => TRet | State<TRet>;
    }
    interface Func<TArgs extends any[] = any[], TRet extends any = any> {
        (rec: Function<TArgs, TRet | State<TRet>>, ...as: TArgs): TRet | State<TRet>;
    }
    namespace Func {
        type Args<TFunc> = TFunc extends Func<infer TArgs, any> ? TArgs : never;
        type Ret<TFunc> = TFunc extends Func<any, infer TRet> ? TRet : never;
    }
    interface Cont<T> {
        (acc: T): T | State<T>;
    }
}
interface trampoline {
    <TArgs extends any[] = any[], TRet extends any = any>(_: trampoline.Func<TArgs, TRet>): Function<TArgs, TRet>;
}
declare let trampoline: trampoline;
export { trampoline };
export default trampoline;
