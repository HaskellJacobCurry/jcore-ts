import {ITuple} from '../../Typeclass/Data/ITuple'
import {
	Json,
	S,
} from '../../Common/common'

interface Tuple<A, B> extends ITuple<A, B> {}
export {Tuple}

export const URI = S('Tuple');
export type URI = typeof URI;

declare module '../../Common/HKT' {
	interface KindsByURI2<T0, A> {
		[URI]: Tuple<T0, A>;
	}
}

let createTuple: <A, B>(fst: A, snd: B) => Tuple<A, B> = (
	(fst, snd) => ({fst, snd})
);
export {createTuple as create}

let fromI: <A, B>(_: ITuple<A, B>) => Tuple<A, B> = (
	({fst, snd}) => createTuple(fst, snd)
);
export {fromI}

/** fst :: Tuple a b -> a */
let fst: <A, B>(_: Tuple<A, B>) => A = tuple => tuple.fst;
export {fst}

/** snd :: Tuple a b -> b */
let snd: <A, B>(_: Tuple<A, B>) => B = tuple => tuple.snd;
export {snd}

/** swap :: Tuple a b -> Tuple b a */
let swap: <A, B>(_: Tuple<A, B>) => Tuple<B, A> = ({fst, snd}) => Tuple(snd, fst);
export {swap}

type Constructor = typeof createTuple;
export {Constructor}

interface HTuple {
	URI: URI;
	create: <A, B>(fst: A, snd: B) => Tuple<A, B>;
	fromI: <A, B>(_: ITuple<A, B>) => Tuple<A, B>;
	fst: <A, B>(_: Tuple<A, B>) => A;
	snd: <A, B>(_: Tuple<A, B>) => B;
	swap: <A, B>(_: Tuple<A, B>) => Tuple<B, A>;
}
export {HTuple}

let Tuple: Constructor & HTuple = (
	Json.assign(createTuple, {
		URI,
		create: createTuple,
		fromI,
		fst,
		snd,
		swap,
	})
);
export default Tuple