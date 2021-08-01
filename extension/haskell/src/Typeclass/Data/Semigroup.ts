import {
	merge,
	assign
} from '../../Common/common'

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
namespace Semigroup {
	export let instantiate: <A>() => <TSemigroup extends Semigroup<A>>(_: TSemigroup) => TSemigroup = (
		() => _ => _
	);
}
export default Semigroup