import {
	Construct,
	polymorph
} from '../../dependency/jcore/dist/ts-toolbelt'

/**
 * class Semiring f where
 *  add :: f -> f -> f
 *  zero :: Unit -> f
 *  mul :: f -> f -> f
 *  one :: Unit -> f
 */
interface Semiring {
	add: <TSemiring extends ISemiring>(_: TSemiring) => (_: TSemiring) => TSemiring;
	zero: <TSemiring extends ISemiring>(_: CSemiring<TSemiring>) => () => TSemiring;
	mul: <TSemiring extends ISemiring>(_: TSemiring) => (_: TSemiring) => TSemiring;
	one: <TSemiring extends ISemiring>(_: CSemiring<TSemiring>) => () => TSemiring;
}
namespace Semiring {
	export let add: Semiring['add'] = semiring0 => semiring1 => polymorph(semiring0.add(semiring1));

	export let zero: Semiring['zero'] = construct => () => construct.zero();

	export let mul: Semiring['mul'] = semiring0 => semiring1 => polymorph(semiring0.mul(semiring1));
	
	export let one: Semiring['one'] = construct => () => construct.one();
}
export {Semiring}

export interface ISemiring {
	construct: CSemiring<ISemiring>;
	add(_: ISemiring): ISemiring;
	mul(_: ISemiring): ISemiring;
}
export interface CSemiring<TSemiring extends ISemiring = ISemiring> extends Construct<TSemiring> {
	zero: () => TSemiring;
	one: () => TSemiring;
}