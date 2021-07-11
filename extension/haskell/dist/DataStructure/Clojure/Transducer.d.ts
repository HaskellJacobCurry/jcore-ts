import { Reducer } from './Reducer';
import { Bool } from '../../Instance/Data/Bool';
import { ITuple } from '../../Typeclass/Data/ITuple';
import { Int } from '../../Instance/Data/Int';
declare type Transducer<S0, S1, A, B> = <C>(_: Reducer<S0, A, C>) => Reducer<S1, B, C>;
export { Transducer };
declare let filter: <S>() => <A>(f: (_: A) => Bool) => Transducer<S, S, A, A>;
export { filter };
declare let take: <S, A>() => (n: Int) => Transducer<S, ITuple<Int, S>, A, A>;
export { take };
declare let map: <S>() => <A, B>(f: (_: A) => B) => Transducer<S, S, B, A>;
export { map };
declare let Transducer: {
    filter: <S>() => <A>(f: (_: A) => Bool) => Transducer<S, S, A, A>;
    take: <S_1, A_1>() => (n: Int) => Transducer<S_1, ITuple<import("../Data/Int").Int, S_1>, A_1, A_1>;
    map: <S_2>() => <A_2, B>(f: (_: A_2) => B) => Transducer<S_2, S_2, B, A_2>;
};
