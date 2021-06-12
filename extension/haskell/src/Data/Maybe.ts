import {IShow} from './Show'
import {Functor1} from './Functor'
import {Apply1} from '../Control/Apply'
import {Bind1} from '../Control/Bind'
import {ISemigroup} from './Semigroup'
import {IMonoid} from './Monoid'
import {String} from './String'
import {
	Json,
	reinterpret,
	cast,
	Function,
	S
} from '../util/common'

/** data Maybe a = Just a | Nothing */
type Maybe<A> = IMaybe<A> & (Nothing | Just<A>);
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
let Nothing = <Maybe<never>>Json.assign(
	<Nothing>{tag: 'Nothing'}, <IMaybe<never>>{
		cata: fs => fs['Nothing'](),
	}
);
export {Nothing}

interface Just<A> {
	readonly tag: 'Just';
	readonly value: A;
}
let Just = <A>(value: A) => <Maybe<A>>Json.assign(
	<Just<A>>{tag: 'Just', value}, <IMaybe<A>>{
		cata: fs => fs['Just'](value),
	}
);
export {Just}

const URI = S('Maybe');
type URI = typeof URI;
declare module '../util/HKT' {
	interface KindsByURI1<A> {
		[URI]: Maybe<A>;
	}
}
export {URI}

let Show = <A>(Show: IShow<A>): IShow<Maybe<A>> => ({
	show: maybeA => maybeA.cata({
		Nothing: () => String('Nothing'),
		Just: value => String(`Just(${Show.show(value)})`),
	}),
});
export {Show}

let Functor: Functor1<URI> = ({
	URI,
	fmap: f => maybeA => (
		Maybe.reinterpret(
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
			ap: maybeF => maybeA => Maybe.reinterpret(
				maybeF.cata({
					Just: f => Functor.fmap(f)(reinterpret(maybeA)),
					Nothing: () => Maybe.Nothing,
				})
			),
		})(Apply => Json.assign(Apply1.Def(Apply), Apply))
	)(Apply => Json.assign(Apply, Apply1.Ext(Apply)))
);
export {Apply}

let Bind: Bind1<URI> = ({
	...Apply,
	bind: maybeA => f => Maybe.reinterpret(
		maybeA.cata({
			Just: f,
			Nothing: () => Maybe.Nothing,
		})
	)
});
export {Bind}

let Monoid = <A>(Semigroup: ISemigroup<A>): IMonoid<Maybe<A>> => ({
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
	mempty: () => reinterpret(Nothing),
});
export {Monoid}

let Maybe = {
	URI,
	reinterpret: <TMaybe>(maybe: TMaybe): Maybe<TMaybe extends Maybe<infer T> ? T : never> => reinterpret(maybe),
	Nothing,
	Just,
	Show,
	Functor,
	Apply,
};