import {Semiring} from './Semiring'
import {
	merge,
	assign,
} from '../../Common/common'

/**
 * class (Semiring f) <= Ring f where
 *  sub :: f -> f -> f
 * negate :: Ring f => f -> f
 */
interface IRing<A> {
	sub: (_: A) => (_: A) => A;
	negate: (_: A) => A;
}
interface Ring<A> extends IRing<A>, Semiring<A> {}
export {Ring}
export {Ring as IRing}
namespace Ring {
	export interface Base<A> extends IRing<A> {}
	
	export let instantiate: <A>() => <TRing extends Ring<A>>(_: TRing) => TRing = (
		() => _ => _
	);
}
export default Ring