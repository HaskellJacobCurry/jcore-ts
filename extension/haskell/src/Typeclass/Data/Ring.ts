import {Semiring} from './Semiring'

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
	export let instantiate: <A>(_: Ring<A>) => Ring<A> = (
		<A>(_: Ring<A>) => (
			_
		)
	);
}
export default Ring