import { ITuple } from '../Data/ITuple';
import { IUnit } from '../Data/IUnit';
import { Reduced } from './Reduced';
interface Reducer<S, A, B> {
    state: S;
    complete: (state: S) => (_: B) => B;
    step: (state: S) => (_: B) => (_: A) => ITuple<S, Reduced<B>>;
}
export { Reducer };
declare let createReducer: <S, A, B>(_: Reducer<S, A, B>) => Reducer<S, A, B>;
export { createReducer as create };
declare let stateless: <A, B>(f: (_: B) => (_: A) => B) => Reducer<IUnit, A, B>;
export { stateless };
declare let Reducer: (<S, A, B>(_: Reducer<S, A, B>) => Reducer<S, A, B>) & {
    create: <S, A, B>(_: Reducer<S, A, B>) => Reducer<S, A, B>;
    stateless: <A_1, B_1>(f: (_: B_1) => (_: A_1) => B_1) => Reducer<IUnit, A_1, B_1>;
};
