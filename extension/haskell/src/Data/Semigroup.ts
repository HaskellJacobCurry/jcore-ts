/**
 * class Semigroup f where
 *  append :: f -> f -> f
 *   alias :: (<>)
 * 
 * laws
 *  associativity - x <> (y <> z) = (x <> y) <> z
 */
interface ISemigroup<A> {
	append: (_: A) => (_: A) => A;
}
interface Semigroup<A> extends ISemigroup<A> {}
export {Semigroup}
export {Semigroup as ISemigroup};
export default Semigroup