import { IArray } from './IArray';
import { Int } from '../../../../dist/Instance/Data/Int';
interface Array<A> extends IArray<A> {
}
export { Array };
declare const URI: "Tuple";
declare type URI = typeof URI;
export { URI };
declare module '../../Common/HKT' {
    interface KindsByURI1<A> {
        [URI]: Array<A>;
    }
}
declare let createArray: <A>(_: A[]) => Array<A>;
export { createArray as create };
declare let reduce: <A, B>(f: (i: Int) => (_: B) => (_: A) => B) => (_: B) => (_: Array<A>) => B;
export { reduce };
declare let reduceL: <A, B>(f: (i: Int) => (_: B) => (_: A) => B) => (_: B) => (_: Array<A>) => B;
export { reduceL };
declare let pushMT: <A>(_: A) => (_: Array<A>) => Array<A>;
export { pushMT };
declare type Constructor = typeof createArray;
export { Constructor };
interface HArray {
    URI: URI;
    create: <A>(_: A[]) => Array<A>;
    reduce: <A, B>(f: (i: Int) => (_: B) => (_: A) => B) => (_: B) => (_: Array<A>) => B;
    reduceL: <A, B>(f: (i: Int) => (_: B) => (_: A) => B) => (_: B) => (_: Array<A>) => B;
    pushMT: <A>(_: A) => (_: Array<A>) => Array<A>;
    map: <A, B>(f: (i: Int) => (_: A) => B) => (_: Array<A>) => Array<B>;
}
declare let Array: Constructor & HArray;
