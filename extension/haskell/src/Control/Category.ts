import {HKT2, URI1, URI2, Kind1, Kind2} from '../util/HKT'
import {Semigroupoid, Semigroupoid2} from './Semigroupoid'

/**
 * class (Semigroupoid f) <= Category f where
 *  identity :: Unit -> f a a
 */

interface Category<F> extends Semigroupoid<F> {
	URI: F;
	identity: <A>() => HKT2<F, A, A>;
}
export {Category}
export {Category as ICategory}

interface Category2<F extends URI2> extends Semigroupoid2<F> {
	URI: F;
	identity: <A>() => Kind2<F, A, A>;
}
export {Category2}

export default Category2