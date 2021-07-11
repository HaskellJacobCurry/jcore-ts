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
	placeholder,
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

let Show = <A>(_: IShow<A>) => apply(_)(ShowA => (
	IShow.instantiate<Maybe<A>>({
		show: show(ShowA),
	})
))
export {Show}

let Functor = Functor1.instantiate<URI>({
	URI,
	fmap: f => maybeA => (
		apply(
			maybeA.cata({
				Nothing: () => Maybe.Nothing,
				Just: value => Maybe.Just(f(value)),
			})
		)(Maybe.infer)
	),
});
export {Functor}

let Apply = Apply1.instantiate<URI>({
	...Functor,
	ap: maybeF => maybeA => (
		apply(
			maybeF.cata({
				Just: f => Functor.fmap(f)(reinterpret(maybeA)),
				Nothing: () => Maybe.Nothing,
			})
		)(Maybe.infer)
	),
	liftA2: reinterpret(),
});
export {Apply}

let Applicative = Applicative1.instantiate<URI>({
	...Apply,
	pure: Maybe.Just,
});
export {Applicative}

let Bind = Bind1.instantiate<URI>({
	...Apply,
	bind: maybeA => f => (
		apply(
			maybeA.cata({
				Just: f,
				Nothing: () => Maybe.Nothing,
			})
		)(Maybe.infer)
	)
});
export {Bind}

let Monad = Monad1.instantiate<URI>({
	...Applicative,
	...Bind,
});
export {Monad}

let Semigroup = <A>(_: ISemigroup<A>) => (
	((SemigroupA = _) => (
		ISemigroup.instantiate<Maybe<A>>({
			append: maybe0 => maybe1 => (
				maybe0.cata({
					Nothing: () => maybe1,
					Just: value0 => (
						maybe1.cata({
							Nothing: () => maybe0,
							Just: value1 => Maybe.Just(SemigroupA.append(value0)(value1)),
						})
					)
				})
			),
		})
	))()
);
export {Semigroup}

let Monoid = <A>(_: ISemigroup<A>) => (
	((SemigroupA = _) => (
		IMonoid.instantiate<Maybe<A>>({
			...Semigroup(SemigroupA),
			mempty: () => reinterpret(Maybe.Nothing),
		})
	))()
);
export {Monoid}

let Foldable = Foldable1.instantiate<URI>({
	URI,
	foldMap: Monoid => Maybe.maybe(Monoid.mempty()),
	foldr: placeholder(),
});
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
	})
);

export {_Maybe as Maybe}
export default _Maybe