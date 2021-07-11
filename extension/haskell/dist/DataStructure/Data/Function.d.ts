import { Function as IFunction } from '../../Common/common';
declare const URI: "Function";
declare type URI = typeof URI;
export { URI };
declare module '../../Common/HKT' {
    interface KindsByURI2<T0, A> {
        [URI]: Function<T0, A>;
    }
}
interface Function<A, B> extends IFunction<[A], B> {
}
export { Function };
declare let createFunction: <A, B>(_: (_: A) => B) => Function<A, B>;
export { createFunction as create };
/** flip :: (a -> b -> c) -> b -> a -> c */
declare let flip: <A, B, C>(_: (_: A) => (_: B) => C) => (_: B) => (_: A) => C;
export { flip };
/** const :: a -> b -> a */
declare let const_: <A>(_: A) => <B>(_: B) => A;
export { const_ };
/**
 * apply :: (a -> b) -> a -> b
 * alias :: [($)]
 */
declare let apply: <A, B>(_: (_: A) => B) => (_: A) => B;
export { apply };
/** on :: (b -> b -> c) -> (a -> b) -> a -> a -> c */
declare let on: <B, C>(_: (_: B) => (_: B) => C) => <A>(_: (_: A) => B) => (_: A) => (_: A) => C;
export { on };
declare let define: <T>(f: (_: () => T) => T) => T;
export { define };
declare let assign: <T>(_: T) => <U>(f: (_: T) => U) => U;
export { assign };
declare type Constructor = typeof createFunction;
export { Constructor };
interface HFunction {
    URI: URI;
    create: <A, B>(_: (_: A) => B) => Function<A, B>;
    flip: <A, B, C>(_: (_: A) => (_: B) => C) => (_: B) => (_: A) => C;
    const: <A>(_: A) => <B>(_: B) => A;
    apply: <A, B>(_: (_: A) => B) => (_: A) => B;
    on: <B, C>(_: (_: B) => (_: B) => C) => <A>(_: (_: A) => B) => (_: A) => (_: A) => C;
    define: <T>(f: (_: () => T) => T) => T;
    assign: <T>(_: T) => <U>(f: (_: T) => U) => U;
}
export { HFunction };
declare let Function: Constructor & HFunction;
export default Function;
