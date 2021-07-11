import {ITuple} from '../../Typeclass/Data/ITuple'
import {IUnit} from '../../Typeclass/Data/IUnit'
import {Reduced} from './Reduced'
import {
	Json,
	create,
	const_,
	id_,
} from '../../Common'

interface Reducer<S, A, B> {
	state: S;
	complete: (state: S) => (_: B) => B;
	step: (state: S) => (_: B) => (_: A) => ITuple<S, Reduced<B>>;
}
export {Reducer}

let createReducer: <S, A, B>(_: Reducer<S, A, B>) => Reducer<S, A, B> = create;
export {createReducer as create}

let stateless: <A, B>(f: (_: B) => (_: A) => B) => Reducer<IUnit, A, B> = (
	<A, B>(f: (_: B) => (_: A) => B) => createReducer({
		state: IUnit(),
		complete: const_(id_<B>()),
		step: (s: IUnit) => (b: B) => (a: A) => ITuple(s, Reduced.Continue(f(b)(a))),
	})
);
export {stateless}

type Constructor = typeof createReducer;
export {Constructor}

interface HReducer {
	create: <S, A, B>(_: Reducer<S, A, B>) => Reducer<S, A, B>;
	stateless: <A, B>(f: (_: B) => (_: A) => B) => Reducer<IUnit, A, B>;
}
export {HReducer}

let Reducer: Constructor & HReducer = (
	Json.assign(createReducer, {
		create: createReducer,
		stateless,
	})
);