import {Semiring} from './Semiring'

/**
 * class (Semiring f) <= Ring f where
 *  sub :: f -> f -> f
 * negate :: Ring f => f -> f
 */

interface Ring<A> extends Semiring<A> {
	sub: (_: A) => (_: A) => A;
	negate: (_: A) => A;
}
export {Ring}
export {Ring as IRing}
export default Ring