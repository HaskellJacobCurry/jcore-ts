import { Bool, Int, Function, RandomAccessIterator, MutableIterator } from '../ts-toolbelt';
export declare namespace Array {
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
export declare class Array<T extends any = any> {
    private _;
    constructor(_?: T[]);
    unlift(): T[];
    size(): Int;
    at(i: Int): T;
    _at(i: Int): T;
    foldl<U extends any>(reducer: Array.Foldl.Reducer<Array<T>, U>, seed: U): U;
    foldr<U extends any>(reducer: Array.Foldr.Reducer<Array<T>, U>, seed: U): U;
    push(vs: T[]): Array<T>;
    push_(v: T): Array<T>;
    pop(): T;
    fmap<U extends any>(f: Array.Fmap.Morphism<Array<T>, U>): Array<U>;
    map<U extends any>(f: Array.Map.Morphism<Array<T>, U>): Array<U>;
    forEach(f: Array.ForEach.Callback<Array<T>>): Array<T>;
    filter(pred: Array.Filter.Predicate<Array<T>>): Array<T>;
    some(pred: Array.Some.Predicate<Array<T>>): Bool;
    every(pred: Array.Every.Predicate<Array<T>>): Bool;
    clone(): Array<T>;
    reverse(): Array<T>;
    slice(iBegin?: Int, iEnd?: Int): Array<T>;
    _slice(iBegin: Int, iEnd: Int): Array<T>;
    begin(): RandomAccessIterator<T> & MutableIterator<T>;
    end(): RandomAccessIterator<T> & MutableIterator<T>;
    cbegin(): RandomAccessIterator<T>;
    cend(): RandomAccessIterator<T>;
    constantIterator(i: Int): RandomAccessIterator<T>;
    mutableIterator(i: Int): RandomAccessIterator<T> & MutableIterator<T>;
    iteratorGenerator<TIterator extends RandomAccessIterator<T> = RandomAccessIterator<T>>(): Function.Define.Generator<(i: Int) => TIterator>;
}
export default Array;
