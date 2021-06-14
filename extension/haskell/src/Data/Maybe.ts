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
	Function,
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
	readonly tag: 'Nothing';
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
	readonly tag: 'Just';
	readonly value: A;
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

let Show: <A>(_: IShow<A>) => IShow<Maybe<A>> = (
	Show => ({
		show: maybeA => maybeA.cata({
			Nothing: () => String('Nothing'),
			Just: value => String(`Just(${Show.show(value)})`),
		}),
	})
);
export {Show}

let Functor: Functor1<URI> = ({
	URI,
	fmap: f => maybeA => (
		Maybe.infer(
			maybeA.cata({
				Nothing: () => Nothing,
				Just: value => Just(f(value)),
			})
		)
	),
});
export {Functor}

let Apply: Apply1<URI> & Apply1.Ext<URI> = (
	Function.assign(
		Function.assign(<Apply1<URI>>{
			...Functor,
			ap: maybeF => maybeA => Maybe.infer(
				maybeF.cata({
					Just: f => Functor.fmap(f)(reinterpret(maybeA)),
					Nothing: () => Maybe.Nothing,
				})
			),
		})(Apply => Json.assign(Apply1.Def(Apply), Apply))
	)(Apply => Json.assign(Apply, Apply1.Ext(Apply)))
);
export {Apply}

let Applicative: Applicative1<URI> = {
	...Apply,
	pure: Just,
};
export {Applicative}

let Bind: Bind1<URI> = ({
	...Apply,
	bind: maybeA => f => Maybe.infer(
		maybeA.cata({
			Just: f,
			Nothing: () => Maybe.Nothing,
		})
	)
});
export {Bind}

let Monad: Monad1<URI> & Monad1.Ext<URI> = {
	...Applicative,
	...Bind,
	return: Applicative.pure,
};
export {Monad}

let Semigroup: <A>(_: ISemigroup<A>) => ISemigroup<Maybe<A>> = (
	Semigroup => ({
		append: maybe0 => maybe1 => (
			maybe0.cata({
				Nothing: () => maybe1,
				Just: value0 => (
					maybe1.cata({
						Nothing: () => maybe0,
						Just: value1 => Just(Semigroup.append(value0)(value1)),
					})
				)
			})
		),
	})
);

let Monoid: <A>(_: ISemigroup<A>) => IMonoid<Maybe<A>> & IMonoid.Ext<Maybe<A>> = (
	<A>(SemigroupA: ISemigroup<A>) => (
		Function.assign(<IMonoid<Maybe<A>>>{
			...Semigroup(SemigroupA),
			mempty: () => reinterpret(Nothing),
		})(_ => Json.assign(_, IMonoid.Ext(_)))
	)
);
export {Monoid}

let Foldable: Foldable1<URI> & Foldable1.Ext<URI> = (
	assign(<Foldable1<URI>>{
		foldMap: Monoid => maybe(Monoid.mempty()),
	})(_ => Json.assign(_, Foldable1.Ext(_)))
);
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