import {Maybe, HMaybe as _HMaybe, URI} from '../../DataStructure/Data/Maybe'
import {String} from './String'
import {IShow} from '../../Typeclass/Data/Show'
import {Functor1} from '../../Typeclass/Data/Functor'
import {Apply1} from '../../Typeclass/Control/Apply'
import {Applicative1} from '../../Typeclass/Control/Applicative'
import {Bind1} from '../../Typeclass/Control/Bind'
import {Monad1} from '../../Typeclass/Control/Monad'
import {ISemigroup} from '../../Typeclass/Data/Semigroup'
import {IMonoid} from '../../Typeclass/Data/Monoid'
import {Foldable1} from '../../Typeclass/Data/Foldable'
import {
	Json,
	apply,
	reinterpret,
	_,
	placeholder,
	merge,
	create,
} from '../../Common'

export * from '../../DataStructure/Data/Maybe'

let show: <A>(_: IShow<A>) => (_: Maybe<A>) => String = (
	ShowA => maybeA => (
		maybeA.cata({
			Nothing: () => String('Nothing'),
			Just: value => (
				apply(
					String.append(String('(Just '))(String.fromI(ShowA.show(value)))
				)(_ => String.append(_)(String(')')))
			),
		})
	)
);
export {show}

let bind: <A>(_: Maybe<A>) => <B>(_: (_: A) => Maybe<B>) => Maybe<B> = (
	maybeA => f => (
		apply(
			maybeA.cata({
				Just: f,
				Nothing: () => Maybe.Nothing,
			})
		)(Maybe.infer)
	)
);
export {bind}

let fmap: <A, B>(_: (_: A) => B) => (_: Maybe<A>) => Maybe<B> = (
	f => maybeA => (
		apply(
			maybeA.cata({
				Nothing: () => Maybe.Nothing,
				Just: value => Maybe.Just(f(value)),
			})
		)(Maybe.infer)
	)
);
export {fmap}

let ap: <A, B>(_: Maybe<(_: A) => B>) => (_: Maybe<A>) => Maybe<B> = (
	maybeF => maybeA => (
		apply(
			maybeF.cata({
				Just: f => Functor.fmap(f)(reinterpret(maybeA)),
				Nothing: () => Maybe.Nothing,
			})
		)(Maybe.infer)
	)
);
export {ap}

let pure: <A>(_: A) => Maybe<A> = (
	Maybe.Just
);
export {pure}

let append: <A>(_: ISemigroup<A>) => (_: Maybe<A>) => (_: Maybe<A>) => Maybe<A> = (
	SemigroupA => maybe0 => maybe1 => (
		maybe0.cata({
			Nothing: () => maybe1,
			Just: value0 => (
				maybe1.cata({
					Nothing: () => maybe0,
					Just: value1 => Maybe.Just(SemigroupA.append(value0)(value1)),
				})
			)
		})
	)
);
export {append}

let mempty: <A>() => Maybe<A> = (
	Maybe.Nothing_
);
export {mempty}

let Show = <A>(_: IShow<A>) => (
	IShow.instantiate<Maybe<A>>()(create<IShow<Maybe<A>>>({
		show: show(_),
	}))
);
export {Show}

let Functor = Functor1.instantiate<URI>()(create<Functor1<URI>>({
	URI,
	fmap,
}));
export {Functor}

let Apply = Apply1.instantiate<URI>()(merge(Functor, create<Apply1.Base<URI>>({
	ap,
	liftA2: _(),
})));
export {Apply}

let Applicative = Applicative1.instantiate<URI>()(merge(Apply, create<Applicative1.Base<URI>>({
	pure,
})));
export {Applicative}

let Bind = Bind1.instantiate<URI>()(merge(Apply, create<Bind1.Base<URI>>({
	bind,
})));
export {Bind}

let Monad = Monad1.instantiate<URI>()(merge(Applicative, Bind));
export {Monad}

let Semigroup = <A>(_: ISemigroup<A>) => (
	ISemigroup.instantiate<Maybe<A>>()(create<ISemigroup<Maybe<A>>>({
		append: append(_),
	}))
);
export {Semigroup}

let Monoid = <A>(_: ISemigroup<A>) => (
	IMonoid.instantiate<Maybe<A>>()(merge(Semigroup(_), create<IMonoid.Base<Maybe<A>>>({
		mempty
	})))
);
export {Monoid}

let foldMap: <G>(_: IMonoid<G>) => <A>(_: (_: A) => G) => (_: Maybe<A>) => G = (
	Monoid => Maybe.maybe(Monoid.mempty())
);
export {foldMap}

let Foldable = Foldable1.instantiate<URI>()(create<Foldable1<URI>>({
	URI,
	foldMap,
	foldr: placeholder(),
}));
export {Foldable}

interface HMaybe extends _HMaybe {
	Show: typeof Show;
	Functor: typeof Functor;
	Apply: typeof Apply;
	Applicative: typeof Applicative;
	Bind: typeof Bind;
	Monad: typeof Monad;
	Semigroup: typeof Semigroup;
	Monoid: typeof Monoid;
	Foldable: typeof Foldable;
	show: <A>(_: IShow<A>) => (_: Maybe<A>) => String;
	bind: <A>(_: Maybe<A>) => <B>(f: (_: A) => Maybe<B>) => Maybe<B>;
	fmap: <A, B>(_: (_: A) => B) => (_: Maybe<A>) => Maybe<B>;
	ap: <A, B>(_: Maybe<(_: A) => B>) => (_: Maybe<A>) => Maybe<B>;
	pure: <A>(_: A) => Maybe<A>;
	append: <A>(_: ISemigroup<A>) => (_: Maybe<A>) => (_: Maybe<A>) => Maybe<A>;
	mempty: <A>() => Maybe<A>;
	foldMap: <G>(_: IMonoid<G>) => <A>(_: (_: A) => G) => (_: Maybe<A>) => G;
}

type _Maybe<A> = Maybe<A>;
let _Maybe: HMaybe = (
	Json.assign(Maybe, {
		Show,
		Functor,
		Apply,
		Applicative,
		Bind,
		Monad,
		Semigroup,
		Monoid,
		Foldable,
		show,
		bind,
		fmap,
		ap,
		pure,
		append,
		mempty,
		foldMap,
	})
);

export {_Maybe as Maybe}
export default _Maybe