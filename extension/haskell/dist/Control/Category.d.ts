import { HKT2, URI2, Kind2 } from '../util/HKT';
import { Semigroupoid, Semigroupoid2 } from './Semigroupoid';
/**
 * class (Semigroupoid f) <= Category f where
 *  identity :: Unit -> f a a
 */
interface Category<F> extends Semigroupoid<F> {
    readonly URI: F;
    readonly identity: <A>() => HKT2<F, A, A>;
}
export { Category };
export { Category as ICategory };
interface Category2<URI extends URI2> extends Semigroupoid2<URI> {
    readonly URI: URI;
    readonly identity: <A>() => Kind2<URI, A, A>;
}
export { Category2 };
export default Category2;
