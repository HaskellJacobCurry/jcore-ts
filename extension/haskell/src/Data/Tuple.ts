import {ISemigroup} from './Semigroup'
import {Functor2} from './Functor'
import {Apply2_} from '../Control/Apply'
import {
	Json,
	Function,
	reinterpret,
} from '../../dependency/jcore/dist/ts-toolbelt'
import {S} from '../../dependency/jcore/dist/ts-toolbelt/common'

export const URI = S('Tuple');
export type URI = typeof URI;

declare module '../util/HKT' {
	interface KindsByURI2<T0, A> {
		[URI]: Tuple<T0, A>;
	}
}

/** fst :: Tuple a b -> a */
let fst: <A>(_: Tuple<A, any>) => A = tuple => tuple.fst;
export {fst}

/** snd :: Tuple a b -> b */
let snd: <B>(_: Tuple<any, B>) => B = tuple => tuple.snd;
export {snd}

/** swap :: Tuple a b -> Tuple b a */
let swap: <A, B>(_: Tuple<A, B>) => Tuple<B, A> = ({fst, snd}) => Tuple(snd, fst);
export {swap}

/** map :: Functor (Tuple a) => (b -> c) -> Tuple a b -> Tuple a c */
let Functor: Functor2<URI> = {
	URI,
	map: f => tupleA => Tuple(tupleA.fst, f(tupleA.snd)),
};
export {Functor}

/** ap :: Semigroup a => Apply (Tuple a) => Tuple a (b -> c) -> Tuple a b -> Tuple a c */
let Apply = <T0>(Semigroup: ISemigroup<T0>): Apply2_<URI, T0> & Apply2_.Ext<URI, T0> => (
	(Apply => (
		Json.assign(Apply, Apply2_.Ext(Apply))
	))(<Apply2_<URI, T0>>{
		...Functor,
		ap: tupleF => tupleA => (
			Tuple(Semigroup.append(tupleF.fst)(tupleA.fst), tupleF.snd(tupleA.snd))
		),
	})
);
export {Apply}

interface Tuple<A, B> {
	fst: A;
	snd: B;
}
let Tuple = Json.assign(
	<A, B>(fst: A, snd: B) => <Tuple<A, B>>{fst, snd}, {
		fst,
		snd,
		swap,
		Apply,
	}
);
export {Tuple}