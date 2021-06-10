import {Semigroup} from './Semigroup'

/*
 * class (Semigroup f) <= Monoid f where
 *  mempty :: Unit -> f
 */

interface Monoid<A> extends Semigroup<A> {
	mempty: () => A;
}
export {Monoid}
export {Monoid as IMonoid};
export default Monoid