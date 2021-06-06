import {HKT, URI1, URI2, Kind1, Kind2} from '../util/HKT'

interface Functor<F> {
	readonly URI: F;
	readonly map: <A, B>(_: (_: A) => B) => (_: HKT<F, A>) => HKT<F, B>;
}
export {Functor}
export {Functor as IFunctor};

interface Functor1<URI extends URI1> {
	readonly URI: URI;
	readonly map: <A, B>(_: (_: A) => B) => (_: Kind1<URI, A>) => Kind1<URI, B>;
}
export {Functor1}

interface Functor2<URI extends URI2> {
	readonly URI: URI;
	readonly map: <A, B>(_: (_: A) => B) => <T0>(_: Kind2<URI, T0, A>) => Kind2<URI, T0, B>;
}
export {Functor2}

interface Functor2_<URI extends URI2, T0> {
	readonly URI: URI;
	readonly map: <A, B>(_: (_: A) => B) => (_: Kind2<URI, T0, A>) => Kind2<URI, T0, B>;
}
export {Functor2_}

export default Functor