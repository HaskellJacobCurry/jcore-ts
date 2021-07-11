import {IShow} from '../../Typeclass/Data/Show'
import {Functor1} from '../../Typeclass/Data/Functor'
import {Apply1} from '../../Typeclass/Control/Apply'
import {Applicative1} from '../../Typeclass/Control/Applicative'
import {Bind1} from '../../Typeclass/Control/Bind'
import {Monad1} from '../../Typeclass/Control/Monad'
import {ISemigroup} from '../../Typeclass/Data/Semigroup'
import {IMonoid} from '../../Typeclass/Data/Monoid'
import {Foldable1} from '../../Typeclass/Data/Foldable'
import {String} from './String'
import {
	Json,
	reinterpret,
	cast,
	apply,
	create,
	S
} from '../../Common/common'

/** data Maybe a = Just a | Nothing */
type Maybe<A> = IMaybe<A> & (Nothing | Just<A>) & {URI: URI};
export {Maybe}

const URI = S('Maybe');
type URI = typeof URI;
declare module '../../Common/HKT' {
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

interface HMaybe {
	URI: URI;
	Nothing: Maybe<never>;
	Nothing_: <A>() => Maybe<A>;
	Just: <A>(_: A) => Maybe<A>;
	infer: typeof infer;
	maybe: <B>(_: B) => <A>(_: (_: A) => B) => (_: Maybe<A>) => B;
}
export {HMaybe}

let Maybe: HMaybe = {
	URI,
	Nothing,
	Nothing_,
	Just,
	infer,
	maybe,
};
export default Maybe