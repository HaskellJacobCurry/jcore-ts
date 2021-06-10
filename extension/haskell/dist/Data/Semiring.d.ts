/**
 * class Semiring f where
 *  add :: f -> f -> f
 *  zero :: Unit -> f
 *  mul :: f -> f -> f
 *  one :: Unit -> f
 */
interface Semiring<A> {
    add: (_: A) => (_: A) => A;
    zero: () => A;
    mul: (_: A) => (_: A) => A;
    one: () => A;
}
export { Semiring };
export { Semiring as ISemiring };
export default Semiring;
