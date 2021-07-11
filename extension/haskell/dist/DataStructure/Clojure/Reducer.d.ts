import { ITuple } from '../../Typeclass/Data/ITuple';
import { IUnit } from '../../Typeclass/Data/IUnit';
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
declare type Constructor = typeof createReducer;
export { Constructor };
interface HReducer {
    create: <S, A, B>(_: Reducer<S, A, B>) => Reducer<S, A, B>;
    stateless: <A, B>(f: (_: B) => (_: A) => B) => Reducer<IUnit, A, B>;
}
export { HReducer };
declare let Reducer: Constructor & HReducer;
