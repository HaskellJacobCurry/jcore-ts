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
	S,
} from '../util/common'

interface Tuple<A, B> {
	fst: A;
	snd: B;
}
export {Tuple}

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

let create = <A, B>(fst: A, snd: B) => <Tuple<A, B>>{fst, snd};
export {create}

/** show :: (Show a, Show b) => Show (Tuple a b) => Tuple a b -> String */
let Show = <A, B>(_0: IShow<A>, _1: IShow<B>) => (
	((ShowFst = _0, ShowSnd = _1) => (
		IShow.enhance<Tuple<A, B>>({
			show: tuple => (
				((fst = ShowFst.show(tuple.fst), snd = ShowSnd.show(tuple.snd)) => (
					String(`Tuple(${fst},${snd})`)
				))()
			)
		})
	))()
);;
export {Show}

/** append :: (Semigroup a, Semigroup b) => Semigroup (Tuple a b) => Tuple a b -> Tuple a b -> Tuple a b */
let Semigroup = <A, B>(_0: ISemigroup<A>, _1: ISemigroup<B>) => (
	((SemigroupFst = _0, SemigroupSnd = _1) => (
		ISemigroup.enhance<Tuple<A, B>>({
			append: tuple0 => tuple1 => (
				((fst = SemigroupFst.append(tuple0.fst)(tuple1.fst), snd = SemigroupSnd.append(tuple0.snd)(tuple1.snd)) => (
					Tuple(fst, snd)
				))()
			)
		})
	))()
);
export {Semigroup}

/** mempty :: (Monoid a, Monoid b) => Monoid (Tuple a b) => Unit -> Tuple a b */
let Monoid = <A, B>(_0: IMonoid<A>, _1: IMonoid<B>) => (
	((MonoidFst = _0, MonoidSnd = _1) => (
		IMonoid.enhance<Tuple<A, B>>({
			...Semigroup(MonoidFst, MonoidSnd),
			mempty: () => Tuple(MonoidFst.mempty(), MonoidSnd.mempty()),
		})
	))()
);
export {Monoid}

/** map :: Functor (Tuple a) => (b -> c) -> Tuple a b -> Tuple a c */
let Functor = Functor2.enhance<URI>({
	URI,
	fmap: f => tupleA => create(tupleA.fst, f(tupleA.snd)),
});
export {Functor}

/** ap :: Semigroup a => Apply (Tuple a) => Tuple a (b -> c) -> Tuple a b -> Tuple a c */
let Apply = <T0>(_: ISemigroup<T0>) => (
	((SemigroupT0 = _) => (
		Apply2_.enhance<URI, T0>({
			...Functor,
			ap: tupleF => tupleA => (
				Tuple(SemigroupT0.append(tupleF.fst)(tupleA.fst), tupleF.snd(tupleA.snd))
			),
			liftA2: reinterpret(),
		})
	))()
);
export {Apply}

/** bimap :: Bifunctor Tuple => (a -> c) -> (b -> d) -> Tuple a b -> Tuple c d */
let Bifunctor = Bifunctor2.enhance<URI>({
	URI,
	bimap: f => g => ({fst, snd}) => create(f(fst), g(snd))
});
export {Bifunctor}

let Tuple = Json.assign(create, {
	fst,
	snd,
	swap,
	Show,
	Semigroup,
	Monoid,
	Functor,
	Apply,
	Bifunctor,
});
export default Tuple