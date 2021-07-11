import {HKT2, URI1, URI2, Kind1, Kind2} from '../../Common/HKT'

/**
 * class Semigroupoid f where
 *  compose :: f b c -> f a b -> f a c
 */

interface Semigroupoid<F> {
	URI: F;
	compose: <B, C>(_: HKT2<F, B, C>) => <A>(_: HKT2<F, A, B>) => HKT2<F, A, C>;
}
export {Semigroupoid}
export {Semigroupoid as ISemigroupoid}

interface Semigroupoid2<F extends URI2> {
	URI: F;
	compose: <B, C>(_: Kind2<F, B, C>) => <A>(_: Kind2<F, A, B>) => Kind2<F, A, C>;
}
export {Semigroupoid2}

interface Semigroupoid2C<F extends URI2, T0> {
	URI: F;
	compose: <C>(_: Kind2<F, T0, C>) => <A>(_: Kind2<F, A, T0>) => Kind2<F, A, C>;
}
export {Semigroupoid2C}

export default Semigroupoid