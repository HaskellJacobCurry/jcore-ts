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
	export let instantiate = <A>(_: Semiring<A>) => (
		_
	);
}
export default Semiring