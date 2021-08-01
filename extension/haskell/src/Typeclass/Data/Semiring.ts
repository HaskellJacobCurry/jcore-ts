import {
	merge,
	assign,
} from '../../Common/common'

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
interface Semiring<A> extends ISemiring<A> {}
export {Semiring}
export {Semiring as ISemiring};
namespace Semiring {
	export interface Base<A> extends Semiring<A> {}

	export let instantiate: <A>() => <TSemiring extends Semiring<A>>(_: TSemiring) => TSemiring = (
		() => _ => _
	);
}
export default Semiring