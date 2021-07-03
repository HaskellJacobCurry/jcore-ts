import {IShow} from './Show'
import {Functor1} from './Functor'
import {Apply1} from '../Control/Apply'
import {Applicative1} from '../Control/Applicative'
import {Bind1} from '../Control/Bind'
import {Monad1} from '../Control/Monad'
import {ISemigroup} from './Semigroup'
import {IMonoid} from './Monoid'
import {Foldable1} from './Foldable'
import {String} from './String'
import {
	Json,
	reinterpret,
	cast,
	apply,
	create,
	S
} from '../util/common'

/** data Maybe a = Just a | Nothing */
type Maybe<A> = IMaybe<A> & (Nothing | Just<A>) & {URI: URI};
export {Maybe}

const URI = S('Maybe');
type URI = typeof URI;
declare module '../util/HKT' {
	interface KindsByURI1<A> {
		[URI]: Maybe<A>;
	}
}
export {URI}

interface IMaybe<A> {
	cata: <T, U>(
		fs: {
			Nothing: () => T;
			Just: (value: A) => U;
		}
	) => T | U;
}

interface Nothing {
	tag: 'Nothing';
}
let Nothing = create<Maybe<never>>(
	Json.assign(
		{URI}, 
		create<Nothing>({tag: 'Nothing'}),
		create<IMaybe<never>>({
			cata: fs => fs['Nothing'](),
		})
	)
);
export {Nothing}
let Nothing_: <A>() => Maybe<A> = (
	<A>() => Json.assign(
		{URI},
		create<Nothing>({tag: 'Nothing'}),
		create<IMaybe<A>>({
			cata: fs => fs['Nothing'](),
		})
	)
);
export {Nothing_}

interface Just<A> {
	tag: 'Just';
	value: A;
}
let Just: <A>(_: A) => Maybe<A> = (
	<A>(value: A) => create<Maybe<A>>(
		Json.assign(
			{URI},
			create<Just<A>>({tag: 'Just', value}),
			create<IMaybe<A>>({
				cata: fs => fs['Just'](value),
			})
		)
	)
);
export {Just}

let infer: <TMaybe>(_: TMaybe) => Maybe<TMaybe extends Maybe<infer T> ? T : never> = (
	maybe => reinterpret(maybe)
);
export {infer}

/** maybe :: b -> (a -> b) -> Maybe a -> b */
let maybe: <B>(_: B) => <A>(_: (_: A) => B) => (_: Maybe<A>) => B = (
	b => f => maybeA => (
		maybeA.cata({
			Nothing: () => b,
			Just: a => f(a),
		})
	)
);
export {maybe}

let show: <A>(_: IShow<A>) => (_: Maybe<A>) => String = (
	ShowA => maybeA => (
		maybeA.cata({
			Nothing: () => String('Nothing'),
			Just: value => (
				apply(
					String.Semigroup.append(String('(Just '))(String.fromI(ShowA.show(value)))
				)(_ => String.Semigroup.append(_)(String(')')))
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
				Nothing: () => Nothing,
				Just: value => Just(f(value)),
			})
		)(infer)
	),
});
export {Functor}

let Apply = Apply1.instantiate<URI>({
	...Functor,
	ap: maybeF => maybeA => (
		apply(
			maybeF.cata({
				Just: f => Functor.fmap(f)(reinterpret(maybeA)),
				Nothing: () => Nothing,
			})
		)(infer)
	),
	liftA2: reinterpret(),
});
export {Apply}

let Applicative = Applicative1.instantiate<URI>({
	...Apply,
	pure: Just,
});
export {Applicative}

let Bind = Bind1.instantiate<URI>({
	...Apply,
	bind: maybeA => f => (
		apply(
			maybeA.cata({
				Just: f,
				Nothing: () => Nothing,
			})
		)(infer)
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
							Just: value1 => Just(SemigroupA.append(value0)(value1)),
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
			mempty: () => reinterpret(Nothing),
		})
	))()
);
export {Monoid}

let Foldable = Foldable1.instantiate<URI>({
	URI,
	foldMap: Monoid => maybe(Monoid.mempty()),
	foldr: reinterpret(),
});
export {Foldable}

let Maybe = {
	URI,
	Nothing,
	Nothing_,
	Just,
	infer,
	maybe,
	show,
	Show,
	Functor,
	Apply,
	Applicative,
	Bind,
	Monad,
	Semigroup,
	Monoid,
	Foldable,
};
export default Maybe