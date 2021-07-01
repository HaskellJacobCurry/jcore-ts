declare type Rec = <AS extends any[], B>(f: (..._: AS) => StateLike<B>, ..._: AS) => State<B>;
interface State<T> {
    rec: Rec;
    thunk: () => StateLike<T>;
}
declare type StateLike<T> = T | State<T>;
declare namespace trampoline_ {
    type Cont<T> = (acc: T) => StateLike<T>;
}
declare let trampoline_: <AS extends any[], B>(f: (s: (..._: AS) => StateLike<B>, ..._: AS) => StateLike<B>) => (..._: AS) => B;
export { trampoline_ };
declare namespace trampoline {
    type Cont<T> = (acc: T) => StateLike<T>;
}
declare let trampoline: <B>() => <AS extends any[]>(f: (..._: AS) => (s: (..._: AS) => StateLike<B>) => StateLike<B>) => (..._: AS) => B;
export { trampoline };
export default trampoline;
