import {HKT2, URI1, URI2, Kind1, Kind2} from '../util/HKT'

/**
 * class Semigroupoid f where
 *  compose :: f b c -> f a b -> f a c
 */

interface Semigroupoid<F> {
	readonly URI: F;
	readonly compose: <B, C>(_: HKT2<F, B, C>) => <A>(_: HKT2<F, A, B>) => HKT2<F, A, C>;
}
export {Semigroupoid}
export {Semigroupoid as ISemigroupoid}

interface Semigroupoid2<URI extends URI2> {
	readonly URI: URI;
	readonly compose: <B, C>(_: Kind2<URI, B, C>) => <A>(_: Kind2<URI, A, B>) => Kind2<URI, A, C>;
}
export {Semigroupoid2}

interface Semigroupoid2_<URI extends URI2, T0> {
	readonly URI: URI;
	readonly compose: <C>(_: Kind2<URI, T0, C>) => <A>(_: Kind2<URI, A, T0>) => Kind2<URI, A, C>;
}
export {Semigroupoid2_}

export default Semigroupoid