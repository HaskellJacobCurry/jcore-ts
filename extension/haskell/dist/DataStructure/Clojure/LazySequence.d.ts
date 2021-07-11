import { Kind1, URI1 } from '../../Common/HKT';
import { Populatable1 } from '../../Typeclass/Data/Populatable';
import { Bool } from '../../Instance/Data/Bool';
import { Int } from '../../Instance/Data/Int';
import { Unit } from '../Data/Unit';
interface LazySequence<T> {
    value: T;
    done: Bool;
    next: () => LazySequence<T>;
}
export { LazySequence };
declare const URI: "LazySequence";
declare type URI = typeof URI;
declare module '../../Common/HKT' {
    interface KindsByURI1<A> {
        [URI]: LazySequence<A>;
    }
}
export { URI };
declare let createLazySequence: <T>(transform: (_: T) => T) => (seed: T) => LazySequence<T>;
export { createLazySequence as create };
declare let map: <A, B>(f: (_: A) => B) => (_: LazySequence<A>) => LazySequence<B>;
export { map };
declare let filter: <A>(f: (_: A) => Bool) => (_: LazySequence<A>) => LazySequence<A>;
export { filter };
declare let until: <A>(f: (_: A) => Bool) => (_: LazySequence<A>) => LazySequence<A>;
export { until };
declare let foldl: <A, B>(f: (_: B) => (_: A) => B) => (_: B) => (_: LazySequence<A>) => B;
export { foldl };
declare let evaluate: <A>(f: (_: A) => Unit) => (_: LazySequence<A>) => Unit;
export { evaluate };
declare let toPopulatable1: <F extends URI1>(_: Populatable1<F>) => <A>(_: LazySequence<A>) => Kind1<F, A>;
export { toPopulatable1 };
declare let toPopulatable: typeof toPopulatable1;
export { toPopulatable };
declare type Constructor = typeof createLazySequence;
export { Constructor };
interface HLazySequence {
    URI: URI;
    create: <T>(transform: (_: T) => T) => (seed: T) => LazySequence<T>;
    map: <A, B>(f: (_: A) => B) => (_: LazySequence<A>) => LazySequence<B>;
    filter: <A>(f: (_: A) => Bool) => (_: LazySequence<A>) => LazySequence<A>;
    until: <A>(f: (_: A) => Bool) => (_: LazySequence<A>) => LazySequence<A>;
    take: (_: Int) => <A>(_: LazySequence<A>) => LazySequence<A>;
    foldl: <A, B>(f: (_: B) => (_: A) => B) => (_: B) => (_: LazySequence<A>) => B;
    evaluate: <A>(f: (_: A) => Unit) => (_: LazySequence<A>) => Unit;
    toPopulatable1: <F extends URI1>(_: Populatable1<F>) => <A>(_: LazySequence<A>) => Kind1<F, A>;
    toPopulatable: this['toPopulatable1'];
}
export { HLazySequence };
declare let LazySequence: Constructor & HLazySequence;
export default LazySequence;
