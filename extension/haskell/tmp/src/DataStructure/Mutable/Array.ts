import {IArray} from './IArray'
import {Bool} from '../../../../dist/Instance/Data/Bool'
import {Int} from '../../../../dist/Instance/Data/Int'
import {
	merge,
	S,
	placeholder,
	cast,
	apply,
	chain,
	trampoline,
} from '../../Common'

interface Array<A> extends IArray<A> {}
export {Array}

const URI = S('Array');
type URI = typeof URI;
export {URI}

declare module '../../Common/HKT' {
	interface KindsByURI1<A> {
		[URI]: Array<A>;
	}
}

let createArray: <A>(_: A[]) => Array<A> = (
	_ => cast(_)()
);
export {createArray as create}

let empty: <A>() => Array<A> = (
	() => Array([])
);
export {empty}

let reduce: <A, B>(f: (i: Int) => (_: B) => (_: A) => B) => (_: B) => (_: Array<A>) => B = (
	<A, B>(f: (i: Int) => (_: B) => (_: A) => B) => (b: B) => (arrayA: Array<A>) => (
		apply(
			trampoline<B>()((b: B, i: number) => reduce => (
				Bool(i < arrayA.length).cata({
					False: () => b,
					True: () => reduce(f(Int(i))(b)(arrayA[i]), i + 1),
				})
			))
		)(_ => _(b, 0))
	)
);
export {reduce}

let reduceL: <A, B>(f: (i: Int) => (_: B) => (_: A) => B) => (_: B) => (_: Array<A>) => B = (
	reduce
);
export {reduceL}

let pushMT: <A>(_: A) => (_: Array<A>) => Array<A> = (
	<A>(a: A) => (arrayA: Array<A>) => (
		arrayA[arrayA.length] = a, arrayA
	)
);
export {pushMT}

let map: <A, B>(f: (i: Int) => (_: A) => B) => (_: Array<A>) => Array<B> = (
	<A, B>(f: (i: Int) => (_: A) => B) => (arrayA: Array<A>) => (
		chain(placeholder()
		)(next => _ => next(reduce<A, Array<B>>(i => arrayB => a => pushMT(f(i)(a))(arrayB))
		))(next => _ => _(Array.empty())(arrayA))
	)
);

let concat: <A>(_: Array<Array<A>>) => Array<A>;

let concatMT: <A>(src: Array<A>) => (dest: Array<A>) => Array<A> = (
	<A>(src: Array<A>) => (dest: Array<A>) => (
		apply(
			reduce<A, Array<A>>(() => acc => a => pushMT(a)(acc))(dest)
		)(_ => _(src))
	)
);
export {concatMT}

let concatMapMT: <A, B>(f: (_: A) => Array<B>) => (_: Array<A>) => Array<B> = (
	<A, B>(f: (_: A) => Array<B>) => (arrayA: Array<A>) => (
		apply(
			reduce<A, Array<B>>(() => acc => a => concatMT(f(a))(acc))(Array.empty())
		)(_ => _(arrayA))
	)
);
export {concatMapMT}

type Constructor = typeof createArray;
export {Constructor}

interface HArray {
	URI: URI;
	create: <A>(_: A[]) => Array<A>;
	empty: <A>() => Array<A>;
	reduce: <A, B>(f: (i: Int) => (_: B) => (_: A) => B) => (_: B) => (_: Array<A>) => B;
	reduceL: <A, B>(f: (i: Int) => (_: B) => (_: A) => B) => (_: B) => (_: Array<A>) => B;
	pushMT:  <A>(_: A) => (_: Array<A>) => Array<A>;
	map: <A, B>(f: (i: Int) => (_: A) => B) => (_: Array<A>) => Array<B>;
	concatMT: <A>(src: Array<A>) => (dest: Array<A>) => Array<A>;
	concatMapMT: <A, B>(f: (_: A) => Array<B>) => (_: Array<A>) => Array<B>;
}
export {HArray}

let Array: Constructor & HArray = (
	merge(createArray, {
		URI,
		create: createArray,
		empty,
		reduce,
		reduceL,
		pushMT,
		map,
		concatMT,
		concatMapMT,
	})
);