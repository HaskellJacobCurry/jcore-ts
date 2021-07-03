import {
	Json,
	create,
} from '../util'

interface ITuple<A, B> {
	fst: A;
	snd: B;
}
export {ITuple}

let createTuple: <A, B>(fst: A, snd: B) => ITuple<A, B> = (
	(fst, snd) => ({fst, snd})
);
export {createTuple as create}

let fst: <A, B>(_: ITuple<A, B>) => A = (
	tuple => tuple.fst
);
export {fst}

let snd: <A, B>(_: ITuple<A, B>) => B = (
	tuple => tuple.snd
);
export {snd}

let ITuple = Json.assign(createTuple, {
	create: createTuple,
	fst,
	snd,
});