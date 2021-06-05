import {HKT, URI1, Kind1} from '../util/HKT'

export interface Functor<F> {
	readonly URI: F;
	readonly map: <A, B>(f: (_: A) => B) => (functorA: HKT<F, A>) => HKT<F, B>;
}
export {Functor as IFunctor};

export interface Functor1<URI extends URI1> {
	URI: URI;
	map: <A, B>(f: (_: A) => B) => (functorA: Kind1<URI, A>) => Kind1<URI, B>;
}

export default Functor