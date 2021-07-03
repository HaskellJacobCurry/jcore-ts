import {ITuple} from '../Data/ITuple'
import {IUnit} from '../../../dist/Data/IUnit'
import {Reduced} from './Reduced'
import {
	Json,
	create,
	const_,
	id_,
} from '../../../dist/util'

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

let Reducer = Json.assign(createReducer, {
	create: createReducer,
	stateless,
});