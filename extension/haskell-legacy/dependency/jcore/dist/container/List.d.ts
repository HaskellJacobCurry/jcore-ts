import { Int, Bool } from '../ts-toolbelt';
export declare abstract class List<T = any> {
    constructor();
    abstract cata<U, K>(fs: List.Cata.Morphisms<T, U, K>): U | K;
    static singleton<T>(a: T): List<T>;
    static range(min: Int, max: Int): List<Int>;
    static cons<T>(a: T, as: List<T>): List<T>;
    static snoc<T>(as: List<T>, a: T): List<T>;
    static nil<T>(): List<T>;
    foldl<U>(reducer: (acc: U, value: T) => U, seed: U): U;
    foldr<U>(reducer: (value: T, acc: U) => U, seed: U): U;
    reverse(): List<T>;
    append(list: List<T>): List<T>;
    map<U>(f: (value: T) => U): List<U>;
    flatMap<U>(listF: List<(value: T) => U>): List<U>;
    size(): Int;
    head(): T | null;
    tail(): List<T> | null;
    last(): T | null;
    uncons(): [T, List<T>] | null;
    unsnoc(): [List<T>, T] | null;
    shift(): List<T> | null;
    shiftN(n: Int): List<T> | null;
    pop(): List<T> | null;
    popN(n: Int): List<T> | null;
    index(i: Int): T | null;
    findIndex(f: (value: T) => Bool): Int;
    insertAt(i: Int, value: T): List<T> | null;
    deleteAt(i: Int): List<T> | null;
    filter(f: (value: T) => Bool): List<T>;
}
export declare namespace List {
    namespace Tag {
        let Nil: "Nil";
        let Cons: "Cons";
    }
    namespace Cata {
        interface Morphisms<T, U, K> {
            Nil: () => U;
            Cons: (a: T, as: List<T>) => K;
        }
    }
    class Nil<T = any> extends List<T> {
        private tag;
        constructor();
        cata<U, K>(fs: List.Cata.Morphisms<T, U, K>): U | K;
    }
    class Cons<T = any> extends List<T> {
        private tag;
        private a;
        private as;
        constructor(a: T, as: List<T>);
        cata<U, K>(fs: List.Cata.Morphisms<T, U, K>): U | K;
    }
}
