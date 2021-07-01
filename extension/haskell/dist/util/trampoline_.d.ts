import { Promise, Promisable } from './Promise';
declare type Rec = <AS extends any[], B>(f: (..._: AS) => Promisable<StateLike<Promisable<B>>>, ..._: AS) => State<Promisable<B>>;
interface State<T> {
    rec: Rec;
    thunk: () => Promisable<StateLike<T>>;
}
declare type StateLike<T> = T | State<T>;
declare namespace trampoline__ {
    type Cont<T> = (acc: T) => StateLike<T>;
}
declare let trampoline__: <AS extends any[], B>(f: (s: (..._: AS) => StateLike<Promisable<B>>, ..._: AS) => Promisable<StateLike<Promisable<B>>>) => (..._: AS) => Promise<B>;
export { trampoline__ };
