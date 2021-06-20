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
	assign,
	S
} from '../util/common'

const URI = S('Maybe');
type URI = typeof URI;
declare module '../util/HKT' {
	interface KindsByURI1<A> {
		[URI]: Maybe<A>;
	}
}
export {URI}

/** data Maybe a = Just a | Nothing */
type Maybe<A> = IMaybe<A> & (Nothing | Just<A>) & {URI: URI};
export {Maybe}

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
let Nothing = <Maybe<never>>(
	Json.assign(
		<Nothing>{tag: 'Nothing'}, {URI}, <IMaybe<never>>{
			cata: fs => fs['Nothing'](),
		}
	)
);
export {Nothing}

interface Just<A> {
	tag: 'Just';
	value: A;
}
let Just: <A>(_: A) => Maybe<A> = (
	<A>(value: A) => <Maybe<A>>(
		Json.assign(
			<Just<A>>{tag: 'Just', value}, {URI}, <IMaybe<A>>{
				cata: fs => fs['Just'](value),
			}
		)
	)
);
export {Just}

let infer: <TMaybe>(maybe: TMaybe) => Maybe<TMaybe extends Maybe<infer T> ? T : never> = (
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

let Show = <A>(_: IShow<A>) => (
	((ShowA = _) => (
		IShow.enhance<Maybe<A>>({
			show: maybeA => maybeA.cata({
				Nothing: () => String('Nothing'),
				Just: value => String(`Just(${ShowA.show(value)})`),
			}),
		})
	))()
)
export {Show}

let Functor = Functor1.enhance<URI>({
	URI,
	fmap: f => maybeA => infer(
		maybeA.cata({
			Nothing: () => Nothing,
			Just: value => Just(f(value)),
		})
	),
});
export {Functor}

let Apply = Apply1.enhance<URI>({
	...Functor,
	ap: maybeF => maybeA => infer(
		maybeF.cata({
			Just: f => Functor.fmap(f)(reinterpret(maybeA)),
			Nothing: () => Nothing,
		})
	),
	liftA2: reinterpret(),
});
export {Apply}

let Applicative = Applicative1.enhance<URI>({
	...Apply,
	pure: Just,
});
export {Applicative}

let Bind = Bind1.enhance<URI>({
	...Apply,
	bind: maybeA => f => infer(
		maybeA.cata({
			Just: f,
			Nothing: () => Nothing,
		})
	)
});
export {Bind}

let Monad = Monad1.enhance<URI>({
	...Applicative,
	...Bind,
});
export {Monad}

let Semigroup = <A>(_: ISemigroup<A>) => (
	((SemigroupA = _) => (
		ISemigroup.enhance<Maybe<A>>({
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
		IMonoid.enhance<Maybe<A>>({
			...Semigroup(SemigroupA),
			mempty: () => reinterpret(Nothing),
		})
	))()
);
export {Monoid}

let Foldable = Foldable1.enhance<URI>({
	URI,
	foldMap: Monoid => maybe(Monoid.mempty()),
	foldr: reinterpret(),
});
export {Foldable}

let Maybe = {
	URI,
	Nothing,
	Just,
	infer,
	maybe,
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