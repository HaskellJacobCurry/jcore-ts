import {HKT, URI1, URI2, Kind1, Kind2} from '../util/HKT'
import {Apply, Apply1, Apply2, Apply2_} from './Apply'

interface Applicative<F> extends Apply<F> {
	readonly pure: <A>(_: A) => HKT<F, A>;
}
export {Applicative}
export {Applicative as IApplicative}

interface Applicative1<URI extends URI1> extends Apply1<URI> {
	readonly pure: <A>(_: A) => Kind1<URI, A>;
}
export {Applicative1}

interface Applicative2<URI extends URI2> extends Apply2<URI> {
	readonly pure: <T0, A>(_: A) => Kind2<URI, T0, A>;
}
export {Applicative2}

interface Applicative2_<URI extends URI2, T0> extends Apply2_<URI, T0> {
	readonly pure: <A>(_: A) => Kind2<URI, T0, A>;
}
export {Applicative2_}

export default Applicative