import { IArray } from './IArray';
import { Int } from '../../Instance/Data/Int';
interface Array<A> extends IArray<A> {
}
export { Array };
declare const URI: "Array";
declare type URI = typeof URI;
export { URI };
declare module '../../Common/HKT' {
    interface KindsByURI1<A> {
        [URI]: Array<A>;
    }
}
declare let createArray: <A>(_: A[]) => Array<A>;
export { createArray as create };
declare let infer: <TArray>(_: TArray) => Array<TArray extends Array<infer T> ? T : never>;
export { infer };
declare let empty: <A = never>() => Array<A>;
export { empty };
declare let singleton: <A>(_: A) => Array<A>;
export { singleton };
declare let reduce: <A, B>(f: (i: Int) => (_: B) => (_: A) => B) => (_: B) => (_: Array<A>) => B;
export { reduce };
declare let reduceL: <A, B>(f: (i: Int) => (_: B) => (_: A) => B) => (_: B) => (_: Array<A>) => B;
export { reduceL };
declare let pushMT: <A>(_: A) => (_: Array<A>) => Array<A>;
export { pushMT };
declare let concat: <A>(_: Array<Array<A>>) => Array<A>;
export { concat };
declare let concatMT: <A>(src: Array<A>) => (dest: Array<A>) => Array<A>;
export { concatMT };
declare let concatMap: <A, B>(f: (_: A) => Array<B>) => (_: Array<A>) => Array<B>;
export { concatMap };
declare type Constructor = typeof createArray;
export { Constructor };
interface HArray {
    URI: URI;
    create: <A>(_: A[]) => Array<A>;
    infer: <TArray>(_: TArray) => Array<TArray extends Array<infer T> ? T : never>;
    empty: <A = never>() => Array<A>;
    singleton: <A>(_: A) => Array<A>;
    reduce: <A, B>(f: (i: Int) => (_: B) => (_: A) => B) => (_: B) => (_: Array<A>) => B;
    reduceL: <A, B>(f: (i: Int) => (_: B) => (_: A) => B) => (_: B) => (_: Array<A>) => B;
    pushMT: <A>(_: A) => (_: Array<A>) => Array<A>;
    map: <A, B>(f: (i: Int) => (_: A) => B) => (_: Array<A>) => Array<B>;
    concat: <A>(_: Array<Array<A>>) => Array<A>;
    concatMT: <A>(src: Array<A>) => (dest: Array<A>) => Array<A>;
    concatMap: <A, B>(f: (_: A) => Array<B>) => (_: Array<A>) => Array<B>;
}
export { HArray };
declare let Array: Constructor & HArray;
