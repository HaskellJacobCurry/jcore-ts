export * from '../../dependency/jcore/dist/ts-toolbelt';
export * from '../../dependency/jcore/dist/ts-toolbelt/common';
export * from '../../dependency/jcore/dist/common/compose';
export * from '../../dependency/jcore/dist/common/pipe';
import { Function } from '../../dependency/jcore/dist/ts-toolbelt';
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
declare let define: Function.Define;
export { define };
declare let apply: <T>(_: T) => <U>(f: (_: T) => U) => U;
export { apply };
declare let create: <T>(_: T) => T;
export { create };
/** recurse :: ((...a[i]) -> ((...a[i]) -> b) -> b) -> (...a[i]) -> b */
declare let recurse: <B>() => <AS extends any[]>(f: (..._: AS) => (s: (..._: AS) => B) => B) => (..._: AS) => B;
export { recurse };
interface X<A> {
    (x: X<A>): A;
}
export { X };
