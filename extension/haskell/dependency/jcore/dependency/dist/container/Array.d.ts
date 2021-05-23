import { Bool, Int } from '../ts-toolbelt';
declare namespace Array {
    type InferElem<TThis extends Array> = TThis extends Array<infer T> ? T : never;
    namespace Foldl {
        interface Reducer<TThis extends Array, U extends any> {
            (acc: U, v: InferElem<TThis>): U;
        }
    }
    namespace Foldr {
        interface Reducer<TThis extends Array, U extends any> {
            (v: InferElem<TThis>, acc: U): U;
        }
    }
    namespace Fmap {
        interface Morphism<TThis extends Array, U extends any> {
            (v: InferElem<TThis>): U;
        }
    }
    namespace Map {
        interface Morphism<TThis extends Array, U extends any> {
            (v: InferElem<TThis>, i: Int): U;
        }
    }
    namespace ForEach {
        interface Callback<TThis extends Array> {
            (v: InferElem<TThis>, i: Int): void;
        }
    }
    namespace Filter {
        interface Predicate<TThis extends Array> {
            (v: InferElem<TThis>, i: Int): Bool;
        }
    }
    namespace Some {
        export import Predicate = Filter.Predicate;
    }
    namespace Every {
        export import Predicate = Filter.Predicate;
    }
}
declare class Array<T extends any = any> {
    private _;
    constructor(_?: T[]);
    unlift(): T[];
    static unlift<TThis extends Array, T extends Array.InferElem<TThis> = Array.InferElem<TThis>>(ins: TThis): T[];
    size(): Int;
    static size(ins: Array): Int;
    at(i: Int): T;
    static at<TThis extends Array, T extends Array.InferElem<TThis> = Array.InferElem<TThis>>(i: Int, ins: TThis): T;
    _at(i: Int): T;
    static _at<TThis extends Array, T extends Array.InferElem<TThis> = Array.InferElem<TThis>>(i: Int, ins: TThis): T;
    foldl<U extends any>(reducer: Array.Foldl.Reducer<Array<T>, U>, seed: U): U;
    static foldl<TThis extends Array, U extends any>(reducer: Array.Foldl.Reducer<TThis, U>, seed: U, ins: TThis): U;
    foldr<U extends any>(reducer: Array.Foldr.Reducer<Array<T>, U>, seed: U): U;
    static foldr<TThis extends Array, U extends any>(reducer: Array.Foldr.Reducer<TThis, U>, seed: U, ins: TThis): U;
    push(vs: T[]): Array<T>;
    static push<TThis extends Array, T extends Array.InferElem<TThis> = Array.InferElem<TThis>>(vs: T[], ins: TThis): Array<T>;
    push_(v: T): Array<T>;
    static push_<TThis extends Array, T extends Array.InferElem<TThis> = Array.InferElem<TThis>>(v: T, ins: TThis): Array<T>;
    pop(): T;
    static pop<TThis extends Array, T extends Array.InferElem<TThis> = Array.InferElem<TThis>>(ins: TThis): T;
    fmap<U extends any>(f: Array.Fmap.Morphism<Array<T>, U>): Array<U>;
    static fmap<TThis extends Array, U extends any, T extends Array.InferElem<TThis> = Array.InferElem<TThis>>(f: Array.Fmap.Morphism<Array<T>, U>, ins: TThis): Array<U>;
    map<U extends any>(f: Array.Map.Morphism<Array<T>, U>): Array<U>;
    static map<TThis extends Array, U extends any, T extends Array.InferElem<TThis> = Array.InferElem<TThis>>(f: Array.Map.Morphism<Array<T>, U>, ins: TThis): Array<U>;
    forEach(f: Array.ForEach.Callback<Array<T>>): Array<T>;
    static forEach<TThis extends Array, T extends Array.InferElem<TThis> = Array.InferElem<TThis>>(f: Array.ForEach.Callback<Array<T>>, ins: TThis): Array<T>;
    filter(pred: Array.Filter.Predicate<Array<T>>): Array<T>;
    static filter<TThis extends Array, T extends Array.InferElem<TThis> = Array.InferElem<TThis>>(pred: Array.Filter.Predicate<Array<T>>, ins: TThis): Array<T>;
    some(pred: Array.Some.Predicate<Array<T>>): Bool;
    static some<TThis extends Array, T extends Array.InferElem<TThis> = Array.InferElem<TThis>>(pred: Array.Some.Predicate<Array<T>>, ins: TThis): Bool;
    every(pred: Array.Every.Predicate<Array<T>>): Bool;
    static every<TThis extends Array, T extends Array.InferElem<TThis> = Array.InferElem<TThis>>(pred: Array.Every.Predicate<Array<T>>, ins: TThis): Bool;
    clone(): Array<T>;
    static clone<TThis extends Array, T extends Array.InferElem<TThis> = Array.InferElem<TThis>>(ins: TThis): Array<T>;
    reverse(): Array<T>;
    static reverse<TThis extends Array, T extends Array.InferElem<TThis> = Array.InferElem<TThis>>(ins: TThis): Array<T>;
    slice(iBegin?: Int, iEnd?: Int): Array<T>;
    _slice(iBegin: Int, iEnd: Int): Array<T>;
}
export default Array;
export { Array };
