import { Bool } from '../../Instance/Data/Bool';
import { Maybe } from '../../Instance/Data/Maybe';
import { Tuple } from '../../Instance/Data/Tuple';
import { Int } from '../../Instance/Data/Int';
import { Ordering } from '../../Instance/Data/Ordering';
/** data List a = Nil | Cons a (List a) */
declare type List<A> = IList<A> & (Nil | Cons<A>) & {
    URI: URI;
};
export { List };
declare const URI: "List";
declare type URI = typeof URI;
declare module '../../Common/HKT' {
    interface KindsByURI1<A> {
        [URI]: List<A>;
    }
}
export { URI };
interface IList<A> {
    cata: <T, U>(fs: {
        Nil: () => T;
        Cons: (head: A, tail: List<A>) => U;
    }) => T | U;
}
interface Nil {
    tag: 'Nil';
}
declare let Nil: List<never>;
export { Nil };
declare let Nil_: <A>() => List<A>;
export { Nil_ };
interface Cons<A> {
    tag: 'Cons';
    head: A;
    tail: List<A>;
}
declare let Cons: <A>(head: A, tail: List<A>) => List<A>;
export { Cons };
declare let infer: <TList>(_: TList) => List<TList extends List<infer T> ? T : never>;
export { infer };
declare let createList: <A>(_: A[]) => List<A>;
export { createList as create };
declare let cons: <A>(head: A) => (tail: List<A>) => List<A>;
export { cons };
declare let snoc: <A>(init: List<A>) => (last: A) => List<A>;
export { snoc };
/** singleton :: a -> List a */
declare let singleton: <A>(_: A) => List<A>;
export { singleton };
/** head :: List a -> a */
declare let head: <A>(_: List<A>) => A;
export { head };
/** last :: [a] -> a  */
declare let last: <A>(_: List<A>) => A;
export { last };
/** tail :: [a] -> [a] */
declare let tail: <A>(_: List<A>) => List<A>;
export { tail };
/** uncons :: List a -> Maybe (Tuple a (List a))  */
declare let uncons: <A>(_: List<A>) => Maybe<Tuple<A, List<A>>>;
export { uncons };
/** unsnoc :: List a -> Maybe (Tuple (List a) a) */
declare let unsnoc: <A>(_: List<A>) => Maybe<Tuple<List<A>, A>>;
export { unsnoc };
declare let shift: <A>(_: List<A>) => Maybe<List<A>>;
export { shift };
declare let shiftN: (n: Int) => <A>(_: List<A>) => Maybe<List<A>>;
export { shiftN };
declare let pop: <A>(_: List<A>) => Maybe<List<A>>;
export { pop };
declare let index: (i: Int) => <A>(_: List<A>) => Maybe<A>;
export { index };
declare let find_: <A>(f: (_: A) => Bool) => (_: List<A>) => Maybe<Tuple<A, Int>>;
export { find_ };
declare let find: <A>(f: (_: A) => Bool) => (_: List<A>) => Maybe<A>;
export { find };
declare let reverseMap: <A, B>(f: (_: A) => B) => (_: List<A>) => List<B>;
export { reverseMap };
declare let map: <A, B>(f: (_: A) => B) => (_: List<A>) => List<B>;
export { map };
declare let reverse: <A>(_: List<A>) => List<A>;
export { reverse };
declare let foldl: <A, B>(_: (_: B) => (_: A) => B) => (_: B) => (_: List<A>) => B;
export { foldl };
declare let foldr: <A, B>(_: (_: A) => (_: B) => B) => (_: B) => (_: List<A>) => B;
export { foldr };
/** merge :: (a -> a -> Ordering) -> List a -> List a -> List a */
declare let merge: <A>(f: (_: A) => (_: A) => Ordering) => (_: List<A>) => (_: List<A>) => List<A>;
export { merge };
/** mergeAll :: (a -> a -> Ordering) -> List (List a) -> List a */
declare let mergeAll: <A>(f: (_: A) => (_: A) => Ordering) => (_: List<List<A>>) => List<A>;
export { mergeAll };
/** sortBy :: (a -> a -> Ordering) -> List a -> List a */
declare let sortBy: <A>(f: (_: A) => (_: A) => Ordering) => (_: List<A>) => List<A>;
export { sortBy };
declare type Constructor = typeof createList;
export { Constructor };
interface HList {
    URI: URI;
    Nil: List<never>;
    Nil_: <A>() => List<A>;
    Cons: <A>(head: A, tail: List<A>) => List<A>;
    infer: typeof infer;
    create: <A>(_: A[]) => List<A>;
    cons: <A>(head: A) => (tail: List<A>) => List<A>;
    snoc: <A>(init: List<A>) => (last: A) => List<A>;
    singleton: <A>(_: A) => List<A>;
    head: <A>(_: List<A>) => A;
    last: <A>(_: List<A>) => A;
    tail: <A>(_: List<A>) => List<A>;
    uncons: <A>(_: List<A>) => Maybe<Tuple<A, List<A>>>;
    unsnoc: <A>(_: List<A>) => Maybe<Tuple<List<A>, A>>;
    shift: <A>(_: List<A>) => Maybe<List<A>>;
    shiftN: (n: Int) => <A>(_: List<A>) => Maybe<List<A>>;
    pop: <A>(_: List<A>) => Maybe<List<A>>;
    index: (i: Int) => <A>(_: List<A>) => Maybe<A>;
    find_: <A>(f: (_: A) => Bool) => (_: List<A>) => Maybe<Tuple<A, Int>>;
    find: <A>(f: (_: A) => Bool) => (_: List<A>) => Maybe<A>;
    reverseMap: <A, B>(f: (_: A) => B) => (_: List<A>) => List<B>;
    map: <A, B>(f: (_: A) => B) => (_: List<A>) => List<B>;
    reverse: <A>(_: List<A>) => List<A>;
    merge: <A>(f: (_: A) => (_: A) => Ordering) => (_: List<A>) => (_: List<A>) => List<A>;
    mergeAll: <A>(f: (_: A) => (_: A) => Ordering) => (_: List<List<A>>) => List<A>;
    sortBy: <A>(f: (_: A) => (_: A) => Ordering) => (_: List<A>) => List<A>;
}
export { HList };
declare let List: Constructor & HList;
export default List;
