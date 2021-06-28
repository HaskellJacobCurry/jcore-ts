import { Bool } from '../../dist/Data/Bool';
import { Int } from '../../dist/Data/Int';
import { Unit } from '../../dist/Data/Unit';
interface LazySequence<T> {
    value: T;
    done: Bool;
    next: () => LazySequence<T>;
}
export { LazySequence };
declare let create_: <T>(transform: (_: T) => T) => (seed: T) => LazySequence<T>;
export { create_ as create };
declare let map: <A, B>(f: (_: A) => B) => (_: LazySequence<A>) => LazySequence<B>;
export { map };
declare let fmap: <A, B>(f: (_: A) => B) => (_: LazySequence<A>) => LazySequence<B>;
export { fmap };
declare let filter: <A>(f: (_: A) => Bool) => (_: LazySequence<A>) => LazySequence<A>;
export { filter };
declare let until: <A>(f: (_: A) => Bool) => (_: LazySequence<A>) => LazySequence<A>;
export { until };
declare let foldl: <A, B>(f: (_: B) => (_: A) => B) => (_: B) => (_: LazySequence<A>) => B;
export { foldl };
declare let evaluate: <A>(f: (_: A) => Unit) => (_: LazySequence<A>) => Unit;
export { evaluate };
declare let LazySequence: (<T>(transform: (_: T) => T) => (seed: T) => LazySequence<T>) & {
    create: <T>(transform: (_: T) => T) => (seed: T) => LazySequence<T>;
    map: <A, B>(f: (_: A) => B) => (_: LazySequence<A>) => LazySequence<B>;
    fmap: <A, B>(f: (_: A) => B) => (_: LazySequence<A>) => LazySequence<B>;
    filter: <A_1>(f: (_: A_1) => Bool) => (_: LazySequence<A_1>) => LazySequence<A_1>;
    until: <A_2>(f: (_: A_2) => Bool) => (_: LazySequence<A_2>) => LazySequence<A_2>;
    take: (_: Int) => <A_3>(_: LazySequence<A_3>) => LazySequence<A_3>;
    foldl: <A_4, B_1>(f: (_: B_1) => (_: A_4) => B_1) => (_: B_1) => (_: LazySequence<A_4>) => B_1;
    evaluate: <A_5>(f: (_: A_5) => Unit) => (_: LazySequence<A_5>) => Unit;
};
