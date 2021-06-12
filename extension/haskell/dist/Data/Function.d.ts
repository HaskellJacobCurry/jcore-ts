import { Semigroupoid2 } from '../Control/Semigroupoid';
import { Category2 } from '../Control/Category';
import { Function as IFunction } from '../util/common';
declare const URI: "Function";
declare type URI = typeof URI;
export { URI };
declare module '../util/HKT' {
    interface KindsByURI2<T0, A> {
        [URI]: Function<T0, A>;
    }
}
interface Function<A, B> extends IFunction<[A], B> {
}
export { Function };
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
declare let define: IFunction.Define;
export { define };
declare let assign: <T>(_: T) => <U>(f: (_: T) => U) => U;
export { assign };
/** compose :: Semigroupoid Function => Function b c -> Function a b -> Function a c */
declare let Semigroupoid: Semigroupoid2<URI>;
export { Semigroupoid };
/** identity :: Category Function => Function a a */
declare let Category: Category2<URI>;
export { Category };
declare let id: <A>() => Function<A, A>;
export { id };
declare let Function: {
    URI: "Function";
    flip: <A, B, C>(_: (_: A) => (_: B) => C) => (_: B) => (_: A) => C;
    const: <A_1>(_: A_1) => <B_1>(_: B_1) => A_1;
    apply: <A_2, B_2>(_: (_: A_2) => B_2) => (_: A_2) => B_2;
    on: <B_3, C_1>(_: (_: B_3) => (_: B_3) => C_1) => <A_3>(_: (_: A_3) => B_3) => (_: A_3) => (_: A_3) => C_1;
    define: IFunction.Define;
    assign: <T>(_: T) => <U>(f: (_: T) => U) => U;
    id: <A_4>() => Function<A_4, A_4>;
    Semigroupoid: Semigroupoid2<"Function">;
    Category: Category2<"Function">;
};
