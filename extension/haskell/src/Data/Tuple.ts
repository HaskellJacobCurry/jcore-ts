import {IShow} from './Show'
import {ISemigroup} from './Semigroup'
import {IMonoid} from './Monoid'
import {Functor2} from './Functor'
import {Apply2_} from '../Control/Apply'
import {Bifunctor2} from './Bifunctor'
import {String} from './String'
import {Function} from './Function'
import {
	Json,
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

/** show :: (Show a, Show b) => Show (Tuple a b) => Tuple a b -> String */
let Show: <A, B>(_0: IShow<A>, _1: IShow<B>) => IShow<Tuple<A, B>> = (
	(ShowFst, ShowSnd) => ({
		show: tuple => (
			((fst = ShowFst.show(tuple.fst), snd = ShowSnd.show(tuple.snd)) => (
				String(`Tuple(${fst},${snd})`)
			))()
		)
	})
);
export {Show}

/** append :: (Semigroup a, Semigroup b) => Semigroup (Tuple a b) => Tuple a b -> Tuple a b -> Tuple a b */
let Semigroup: <A, B>(_0: ISemigroup<A>, _1: ISemigroup<B>) => ISemigroup<Tuple<A, B>> = (
	(SemigroupFst, SemigroupSnd) => ({
		append: tuple0 => tuple1 => (
			((fst = SemigroupFst.append(tuple0.fst)(tuple1.fst), snd = SemigroupSnd.append(tuple0.snd)(tuple1.snd)) => (
				Tuple(fst, snd)
			))()
		)
	})
);
export {Semigroup}

/** mempty :: (Monoid a, Monoid b) => Monoid (Tuple a b) => Unit -> Tuple a b */
let Monoid: <A, B>(_0: IMonoid<A>, _1: IMonoid<B>) => IMonoid<Tuple<A, B>> = (
	(MonoidFst, MonoidSnd) => ({
		...Semigroup(MonoidFst, MonoidSnd),
		mempty: () => Tuple(MonoidFst.mempty(), MonoidSnd.mempty()),
	})
);
export {Monoid}

/** map :: Functor (Tuple a) => (b -> c) -> Tuple a b -> Tuple a c */
let Functor: Functor2<URI> = {
	URI,
	map: f => tupleA => Tuple(tupleA.fst, f(tupleA.snd)),
};
export {Functor}

/** ap :: Semigroup a => Apply (Tuple a) => Tuple a (b -> c) -> Tuple a b -> Tuple a c */
let Apply: <T0>(_: ISemigroup<T0>) => Apply2_<URI, T0> & Apply2_.Ext<URI, T0> = (
	<T0>(Semigroup: ISemigroup<T0>): Apply2_<URI, T0> & Apply2_.Ext<URI, T0> => (
		(Apply => (
			Json.assign(Apply, Apply2_.Ext(Apply))
		))(<Apply2_<URI, T0>>{
			...Functor,
			ap: tupleF => tupleA => (
				Tuple(Semigroup.append(tupleF.fst)(tupleA.fst), tupleF.snd(tupleA.snd))
			),
		})
	)
);
export {Apply}

/** bimap :: Bifunctor Tuple => (a -> c) -> (b -> d) -> Tuple a b -> Tuple c d */
let Bifunctor: Bifunctor2<URI> & Bifunctor2.Ext<URI> = (
	(Bifunctor => (
		Json.assign(Bifunctor, Bifunctor2.Ext(Bifunctor))
	))(<Bifunctor2<URI>>{
		bimap: f => g => ({fst, snd}) => Tuple(f(fst), g(snd))
	})
);
export {Bifunctor}

interface Tuple<A, B> {
	fst: A;
	snd: B;
}
let Tuple = Json.assign(
	<A, B>(fst: A, snd: B) => <Tuple<A, B>>{fst, snd}, {
		fst,
		snd,
		swap,
		Show,
		Semigroup,
		Monoid,
		Functor,
		Apply,
		Bifunctor,
	}
);
export {Tuple}