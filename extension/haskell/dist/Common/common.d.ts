import { Json } from '../../dependency/jcore/dist/ts-toolbelt';
export * from '../../dependency/jcore/dist/ts-toolbelt';
export * from '../../dependency/jcore/dist/ts-toolbelt/common';
export * from '../../dependency/jcore/dist/common/compose';
export * from '../../dependency/jcore/dist/common/pipe';
declare let placeholder: <A>() => A;
export { placeholder };
declare let id: <A>(_: A) => A;
export { id };
declare let id_: <A>() => (_: A) => A;
export { id_ };
declare let const_: <A>(_: A) => <B>(_: B) => A;
export { const_ as const };
export { const_ };
declare let flip: <A, B, C>(_: (_: A) => (_: B) => C) => (_: B) => (_: A) => C;
export { flip };
declare let assign: <T>(_: T) => <U>(f: (_: T) => U) => U;
export { assign };
declare let define: <T>(f: (_: () => T) => T) => T;
export { define };
declare let apply: <T>(_: T) => <U>(f: (_: T) => U) => U;
export { apply };
declare let create: <T>(_: T) => T;
export { create };
/** recurse :: ((...a[i]) -> ((...a[i]) -> b) -> b) -> (...a[i]) -> b */
declare let recurse: <B>() => <AS extends any[]>(f: (..._: AS) => (s: (..._: AS) => B) => B) => (..._: AS) => B;
export { recurse };
/** recurse_ :: (((...a[i]) -> b, ...a[i]) -> b) -> (...a[i]) -> b */
declare let recurse_: <AS extends any[], B>(f: (s: (..._: AS) => B, ..._: AS) => B) => (..._: AS) => B;
export { recurse_ };
interface X<A> {
    (x: X<A>): A;
}
export { X };
declare let merge: typeof Json.assign;
export { merge };
declare let json: <K extends string, V>(k: K, v: V) => {
    [_ in K]: V;
};
export { json };
declare let chain: <T>(_: T) => <U>(f: (next: typeof chain) => (_: T) => U) => U;
export { chain };
declare let _: <A>() => A;
export { _ };
