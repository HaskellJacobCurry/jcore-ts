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
declare let empty: <A = never>() => LazySequence<A>;
export { empty };
declare let singleton: <A>(_: A) => LazySequence<A>;
export { singleton };
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
declare let concat_: <A>(tail: LazySequence<A>) => (front: LazySequence<A>) => LazySequence<A>;
export { concat_ };
declare let concat: <A>(lazys: LazySequence<LazySequence<A>>) => LazySequence<A>;
export { concat };
declare let concatMap: <A, B>(f: (_: A) => LazySequence<B>) => (_: LazySequence<A>) => LazySequence<B>;
export { concatMap };
declare let toPopulatable1: <F extends URI1>(_: Populatable1<F>) => <A>(_: LazySequence<A>) => Kind1<F, A>;
export { toPopulatable1 };
declare let toPopulatable: typeof toPopulatable1;
export { toPopulatable };
declare let range: (min: Int, max: Int) => <F extends URI1>(_: Populatable1<F>) => Kind1<F, Int>;
export { range };
declare type Constructor = typeof createLazySequence;
export { Constructor };
interface HLazySequence {
    URI: URI;
    create: <T>(transform: (_: T) => T) => (seed: T) => LazySequence<T>;
    empty: <A = never>() => LazySequence<A>;
    singleton: <A>(_: A) => LazySequence<A>;
    map: <A, B>(f: (_: A) => B) => (_: LazySequence<A>) => LazySequence<B>;
    filter: <A>(f: (_: A) => Bool) => (_: LazySequence<A>) => LazySequence<A>;
    until: <A>(f: (_: A) => Bool) => (_: LazySequence<A>) => LazySequence<A>;
    take: (_: Int) => <A>(_: LazySequence<A>) => LazySequence<A>;
    foldl: <A, B>(f: (_: B) => (_: A) => B) => (_: B) => (_: LazySequence<A>) => B;
    evaluate: <A>(f: (_: A) => Unit) => (_: LazySequence<A>) => Unit;
    concat_: <A>(tail: LazySequence<A>) => (front: LazySequence<A>) => LazySequence<A>;
    concat: <A>(lazys: LazySequence<LazySequence<A>>) => LazySequence<A>;
    concatMap: <A, B>(f: (_: A) => LazySequence<B>) => (_: LazySequence<A>) => LazySequence<B>;
    toPopulatable1: <F extends URI1>(_: Populatable1<F>) => <A>(_: LazySequence<A>) => Kind1<F, A>;
    toPopulatable: this['toPopulatable1'];
    range: (min: Int, max: Int) => <F extends URI1>(_: Populatable1<F>) => Kind1<F, Int>;
}
export { HLazySequence };
declare let LazySequence: Constructor & HLazySequence;
export default LazySequence;
