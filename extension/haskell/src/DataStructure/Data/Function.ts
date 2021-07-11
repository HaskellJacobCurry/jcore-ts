import {
	Json,
	Function as IFunction,
	S,
	define as define_,
	assign as assign_,
} from '../../Common/common'

const URI = S('Function');
type URI = typeof URI;
export {URI}

declare module '../../Common/HKT' {
	interface KindsByURI2<T0, A> {
		[URI]: Function<T0, A>;
	}
}

interface Function<A, B> extends IFunction<[A], B> {}
export {Function}

let createFunction: <A, B>(_: (_: A) => B) => Function<A, B> = f => f;
export {createFunction as create}

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

let define = define_;
export {define}

let assign = assign_;
export {assign}

type Constructor = typeof createFunction;
export {Constructor}

interface HFunction {
	URI: URI;
	create: <A, B>(_: (_: A) => B) => Function<A, B>;
	flip: <A, B, C>(_: (_: A) => (_: B) => C) => (_: B) => (_: A) => C;
	const: <A>(_: A) => <B>(_: B) => A;
	apply: <A, B>(_: (_: A) => B) => (_: A) => B;
	on: <B, C>(_: (_: B) => (_: B) => C) => <A>(_: (_: A) => B) => (_: A) => (_: A) => C;
	define: <T>(f: (_: () => T) => T) => T;
	assign: <T>(_: T) => <U>(f: (_: T) => U) => U;
}
export {HFunction}

let Function: Constructor & HFunction = (
	Json.assign(createFunction, {
		URI,
		create: createFunction,
		flip,
		const: const_,
		apply,
		on,
		define,
		assign,
	})
);
export default Function