/**
 * class Num a where
 *  add :: a -> a -> a
 *   alias :: (+)
 *  sub :: a -> a -> a
 *   alias :: (-)
 *  mul :: a -> a -> a
 *   alias :: (*)
 *  zero :: Unit -> a
 *  one :: Unit -> a
 *  abs :: a -> a
 *  signum :: a -> a
 * negate :: a -> a
 */
interface INum<A> {
    add: (_: A) => (_: A) => A;
    sub: (_: A) => (_: A) => A;
    mul: (_: A) => (_: A) => A;
    zero: () => A;
    one: () => A;
    abs: (_: A) => A;
}
interface IExtNum<A> {
    negate: (_: A) => A;
}
interface Num<A> extends INum<A> {
}
export { Num };
export { Num as INum };
declare namespace Num {
    interface Ext<A> extends IExtNum<A> {
    }
    let Ext: <A>(_: Num<A>) => Ext<A>;
    let instantiate: <A>(_: Num<A>) => Num<A> & Ext<A>;
}
export default Num;
