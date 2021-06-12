import {Semigroupoid2} from '../Control/Semigroupoid'
import {Category2} from '../Control/Category'
import {
	Function as IFunction,
	S,
} from '../util/common'

const URI = S('Function');
type URI = typeof URI;
export {URI}

declare module '../util/HKT' {
	interface KindsByURI2<T0, A> {
		[URI]: Function<T0, A>;
	}
}

interface Function<A, B> extends IFunction<[A], B> {}
export {Function}

/** flip :: (a -> b -> c) -> b -> a -> c */
let flip: <A, B, C>(_: (_: A) => (_: B) => C) => (_: B) => (_: A) => C = (
	f => b => a => f(a)(b)
);
export {flip}

/** const :: a -> b -> a */
let const_: <A>(_: A) => <B>(_: B) => A = (
	a => _ => a
);
export {const_}

/** 
 * apply :: (a -> b) -> a -> b
 * alias :: [($)]
 */
let apply: <A, B>(_: (_: A) => B) => (_: A) => B = (
	f => a => f(a)
);
export {apply}

/** on :: (b -> b -> c) -> (a -> b) -> a -> a -> c */
let on: <B, C>(_: (_: B) => (_: B) => C) => <A>(_: (_: A) => B) => (_: A) => (_: A) => C = (
	f => g => a0 => a1 => f(g(a0))(g(a1))
);
export {on}

let define = IFunction.define;
export {define}

let assign = IFunction.assign;
export {assign}

/** compose :: Semigroupoid Function => Function b c -> Function a b -> Function a c */
let Semigroupoid: Semigroupoid2<URI> = {
	URI,
	compose: f0 => f1 => a => f0(f1(a)),
};
export {Semigroupoid}

/** identity :: Category Function => Function a a */
let Category: Category2<URI> = {
	...Semigroupoid,
	identity: () => a => a,
};
export {Category}

let id = Category.identity;
export {id}

let Function = {
	URI,
	flip,
	const: const_,
	apply,
	on,
	define,
	assign,
	id,
	Semigroupoid,
	Category
};