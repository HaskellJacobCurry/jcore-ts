import {IShow} from './Show'
import {Functor1} from './Functor'
import {ISemigroup} from './Semigroup'
import {IMonoid} from './Monoid'
import {String} from './String'
import {
	Json,
	reinterpret,
} from '../../dependency/jcore/dist/ts-toolbelt'
import {S} from '../../dependency/jcore/dist/ts-toolbelt/common'

interface IMaybe<A> {
	cata: <T, U>(
		fs: {
			Nothing: () => T;
			Just: (value: A) => U;
		}
	) => T | U;
}

export interface Nothing {
	readonly tag: 'Nothing';
}
export interface Just<A> {
	readonly tag: 'Just';
	readonly value: A;
}

export let Nothing = (): Maybe<never> => Json.assign(
	<Nothing>{tag: 'Nothing'}, <Maybe<never>>{
		cata: fs => fs['Nothing'](),
	}
);
export let Just = <A>(value: A): Maybe<A> => Json.assign(
	<Just<A>>{tag: 'Just', value}, <Maybe<A>>{
		cata: fs => fs['Just'](value),
	}
);

export const URI = S('Maybe');
export type URI = typeof URI;
declare module '../util/HKT' {
	interface KindsByURI1<A> {
		[URI]: Maybe<A>;
	}
}

export let Show = <A>(Show: IShow<A>): IShow<Maybe<A>> => ({
	show: maybeA => maybeA.cata({
		Nothing: () => String('Nothing'),
		Just: value => String(`Just(${Show.show(value)})`),
	}),
});

export let Functor: Functor1<URI> = ({
	URI,
	map: f => functorA => (
		Maybe.reinterpret(
			functorA.cata({
				Nothing: () => Nothing(),
				Just: value => Just(f(value)),
			})
		)
	),
});

export let Monoid = <A>(Semigroup: ISemigroup<A>): IMonoid<Maybe<A>> => ({
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
	mempty: () => reinterpret(Nothing()),
});

export type Maybe<A> = IMaybe<A> & (Nothing | Just<A>);
export let Maybe = {
	URI,
	reinterpret: <TMaybe>(maybe: TMaybe): Maybe<TMaybe extends Maybe<infer T> ? T : never> => reinterpret(maybe),
	Nothing,
	Just,
	Show,
	Functor,
};