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
	_,
	placeholder,
	apply,
	S,
	create,
	merge,
} from '../../Common/common'

export * from '../../DataStructure/Data/Tuple'

let show: <A, B>(_0: IShow<A>, _1: IShow<B>) => (_: Tuple<A, B>) => String = (
	(ShowFst, ShowSnd) => tuple => (
		((fst = ShowFst.show(tuple.fst), snd = ShowSnd.show(tuple.snd)) => (
			apply(String('(Tuple '))
			(_ => apply(String.Semigroup.append(_)(String.fromI(fst))))
			(_ => apply(String.Semigroup.append(_)(String(' '))))
			(_ => apply(String.Semigroup.append(_)(String.fromI(snd))))
			(_ => String.Semigroup.append(_)(String(')')))
		))()
	)
);
export {show}

let append: <A, B>(_0: ISemigroup<A>, _1: ISemigroup<B>) => (_: Tuple<A, B>) => (_: Tuple<A, B>) => Tuple<A, B> = (
	(SemigroupFst, SemigroupSnd) => tuple0 => tuple1 => (
		((fst = SemigroupFst.append(tuple0.fst)(tuple1.fst), snd = SemigroupSnd.append(tuple0.snd)(tuple1.snd)) => (
			Tuple(fst, snd)
		))()
	)
);
export {append}

let mempty: <A, B>(_0: IMonoid<A>, _1: IMonoid<B>) => () => Tuple<A, B> = (
	(MonoidFst, MonoidSnd) => () => Tuple(MonoidFst.mempty(), MonoidSnd.mempty())
);
export {mempty}

let fmap: <A, B>(_: (_: A) => B) => <T0>(_: Tuple<T0, A>) => Tuple<T0, B> = (
	f => tupleA => Tuple(tupleA.fst, f(tupleA.snd))
);
export {fmap}

let ap: <T0>(_: ISemigroup<T0>) => <A, B>(_: Tuple<T0, (_: A) => B>) => (_: Tuple<T0, A>) => Tuple<T0, B> = (
	SemigroupT0 => tupleF => tupleA => (
		Tuple(SemigroupT0.append(tupleF.fst)(tupleA.fst), tupleF.snd(tupleA.snd))
	)
);
export {ap}

let bimap: <A, C>(_: (_: A) => C) => <B, D>(_: (_: B) => D) => (_: Tuple<A, B>) => Tuple<C, D> = (
	f => g => ({fst, snd}) => Tuple(f(fst), g(snd))
);
export {bimap}

/** show :: (Show a, Show b) => Show (Tuple a b) => Tuple a b -> String */
let Show = <A, B>(_0: IShow<A>, _1: IShow<B>) => IShow.instantiate<Tuple<A, B>>()(
	create<IShow<Tuple<A, B>>>({
		show: show(_0, _1),
	})
);
export {Show}

/** append :: (Semigroup a, Semigroup b) => Semigroup (Tuple a b) => Tuple a b -> Tuple a b -> Tuple a b */
let Semigroup = <A, B>(_0: ISemigroup<A>, _1: ISemigroup<B>) => ISemigroup.instantiate<Tuple<A, B>>()(
	create<ISemigroup<Tuple<A, B>>>({
		append: append(_0, _1),
	})
);
export {Semigroup}

/** mempty :: (Monoid a, Monoid b) => Monoid (Tuple a b) => Unit -> Tuple a b */
let Monoid = <A, B>(_0: IMonoid<A>, _1: IMonoid<B>) => IMonoid.instantiate<Tuple<A, B>>()(
	merge(Semigroup(_0, _1), create<IMonoid.Base<Tuple<A, B>>>({
		mempty: mempty(_0, _1),
	}))
);
export {Monoid}

/** map :: Functor (Tuple a) => (b -> c) -> Tuple a b -> Tuple a c */
let Functor = Functor2.instantiate<URI>()(
	create<Functor2<URI>>({
		URI,
		fmap,
	})
);
export {Functor}

/** ap :: Semigroup a => Apply (Tuple a) => Tuple a (b -> c) -> Tuple a b -> Tuple a c */
let Apply = <T0>(_: ISemigroup<T0>) => Apply2C.instantiate<URI, T0>()(
	merge(Functor, create<Apply2C.Base<URI, T0>>({
		ap: ap(_),
		liftA2: placeholder(),
	}))
);
export {Apply}

/** bimap :: Bifunctor Tuple => (a -> c) -> (b -> d) -> Tuple a b -> Tuple c d */
let Bifunctor = Bifunctor2.instantiate<URI>()(
	create<Bifunctor2<URI>>({
		URI,
		bimap,
	})
);
export {Bifunctor}

interface HTuple extends _HTuple {
	Show: typeof Show;
	Semigroup: typeof Semigroup;
	Monoid: typeof Monoid;
	Functor: typeof Functor;
	Apply: typeof Apply;
	Bifunctor: typeof Bifunctor;
	show: <A, B>(_0: IShow<A>, _1: IShow<B>) => (_: Tuple<A, B>) => String;
	append: <A, B>(_0: ISemigroup<A>, _1: ISemigroup<B>) => (_: Tuple<A, B>) => (_: Tuple<A, B>) => Tuple<A, B>;
	mempty: <A, B>(_0: IMonoid<A>, _1: IMonoid<B>) => () => Tuple<A, B>;
	fmap: <A, B>(_: (_: A) => B) => <T0>(_: Tuple<T0, A>) => Tuple<T0, B>;
	ap: <T0>(_: ISemigroup<T0>) => <A, B>(_: Tuple<T0, (_: A) => B>) => (_: Tuple<T0, A>) => Tuple<T0, B>;
	bimap: <A, C>(_: (_: A) => C) => <B, D>(_: (_: B) => D) => (_: Tuple<A, B>) => Tuple<C, D>;
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
		show,
		append,
		mempty,
		fmap,
		ap,
		bimap,
	})
);

export {_Tuple as Tuple}
export default _Tuple