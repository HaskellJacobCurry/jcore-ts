import {Tuple, HTuple as _HTuple, Constructor, URI} from '../../DataStructure/Data/Tuple'
import {IShow} from '../../Typeclass/Data/Show'
import {ISemigroup} from '../../Typeclass/Data/Semigroup'
import {IMonoid} from '../../Typeclass/Data/Monoid'
import {Functor2} from '../../Typeclass/Data/Functor'
import {Apply2C} from '../../Typeclass/Control/Apply'
import {Bifunctor2} from '../../Typeclass/Data/Bifunctor'
import {String} from '../../Instance/Data/String'
import {
	Json,
	reinterpret,
	apply,
	S,
} from '../../Common/common'

export * from '../../DataStructure/Data/Tuple'

/** show :: (Show a, Show b) => Show (Tuple a b) => Tuple a b -> String */
let Show = <A, B>(_0: IShow<A>, _1: IShow<B>) => (
	((ShowFst = _0, ShowSnd = _1) => (
		IShow.instantiate<Tuple<A, B>>({
			show: tuple => (
				((fst = ShowFst.show(tuple.fst), snd = ShowSnd.show(tuple.snd)) => (
					apply(
						String('(Tuple ')
					)(_ => apply(
						String.Semigroup.append(_)(String.fromI(fst))
					))(_ => apply(
						String.Semigroup.append(_)(String(' '))
					))(_ => apply(
						String.Semigroup.append(_)(String.fromI(snd))
					))(_ => String.Semigroup.append(_)(String(')')))
				))()
			)
		})
	))()
);;
export {Show}

/** append :: (Semigroup a, Semigroup b) => Semigroup (Tuple a b) => Tuple a b -> Tuple a b -> Tuple a b */
let Semigroup = <A, B>(_0: ISemigroup<A>, _1: ISemigroup<B>) => (
	((SemigroupFst = _0, SemigroupSnd = _1) => (
		ISemigroup.instantiate<Tuple<A, B>>({
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
		IMonoid.instantiate<Tuple<A, B>>({
			...Semigroup(MonoidFst, MonoidSnd),
			mempty: () => Tuple(MonoidFst.mempty(), MonoidSnd.mempty()),
		})
	))()
);
export {Monoid}

/** map :: Functor (Tuple a) => (b -> c) -> Tuple a b -> Tuple a c */
let Functor = Functor2.instantiate<URI>({
	URI,
	fmap: f => tupleA => Tuple(tupleA.fst, f(tupleA.snd)),
});
export {Functor}

/** ap :: Semigroup a => Apply (Tuple a) => Tuple a (b -> c) -> Tuple a b -> Tuple a c */
let Apply = <T0>(_: ISemigroup<T0>) => (
	((SemigroupT0 = _) => (
		Apply2C.instantiate<URI, T0>({
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
let Bifunctor = Bifunctor2.instantiate<URI>({
	URI,
	bimap: f => g => ({fst, snd}) => Tuple(f(fst), g(snd))
});
export {Bifunctor}

interface HTuple extends _HTuple {
	Show: typeof Show;
	Semigroup: typeof Semigroup;
	Monoid: typeof Monoid;
	Functor: typeof Functor;
	Apply: typeof Apply;
	Bifunctor: typeof Bifunctor;
}
export {HTuple}

type _Tuple<A, B> = Tuple<A, B>;
let _Tuple: Constructor & HTuple = (
	Json.assign(Tuple, {
		Show,
		Semigroup,
		Monoid,
		Functor,
		Apply,
		Bifunctor,
	})
);

export {_Tuple as Tuple}
export default _Tuple