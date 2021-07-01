/**
 * class Semiring f where
 *  add :: f -> f -> f
 *  zero :: Unit -> f
 *  mul :: f -> f -> f
 *  one :: Unit -> f
 */
interface ISemiring<A> {
    add: (_: A) => (_: A) => A;
    zero: () => A;
    mul: (_: A) => (_: A) => A;
    one: () => A;
}
interface Semiring<A> extends ISemiring<A> {
}
export { Semiring };
export { Semiring as ISemiring };
declare namespace Semiring {
    let instantiate: <A>(_: Semiring<A>) => Semiring<A>;
}
export default Semiring;
