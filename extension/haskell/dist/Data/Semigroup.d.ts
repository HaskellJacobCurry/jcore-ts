/**
 * class Semigroup f where
 *  append :: f -> f -> f
 */
interface Semigroup<A> {
    append: (_: A) => (_: A) => A;
}
export { Semigroup };
export { Semigroup as ISemigroup };
export default Semigroup;
