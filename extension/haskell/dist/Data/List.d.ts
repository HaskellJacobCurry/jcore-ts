import { Bool } from './Bool';
import { Foldable1 } from './Foldable';
import { Populatable1 } from './Populatable';
import { IShow } from './Show';
import { Monoid } from './Monoid';
import { Maybe } from './Maybe';
import { Tuple } from './Tuple';
import { Int } from './Int';
import { Ordering } from './Ordering';
import IString from './IString';
/** data List a = Nil | Cons a (List a) */
declare type List<A> = IList<A> & (Nil | Cons<A>) & {
    URI: URI;
};
export { List };
declare const URI: "List";
declare type URI = typeof URI;
declare module '../util/HKT' {
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
declare let create_: <A>(_: A[]) => List<A>;
export { create_ as create };
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
declare let show: <A>(_: IShow<A>) => (_: List<A>) => IString;
export { show };
declare let foldMap: <G>(_: Monoid<G>) => <A>(_: (_: A) => G) => (_: List<A>) => G;
export { foldMap };
declare let foldl: <A, B>(_: (_: B) => (_: A) => B) => (_: B) => (_: List<A>) => B;
export { foldl };
declare let foldr: <A, B>(_: (_: A) => (_: B) => B) => (_: B) => (_: List<A>) => B;
export { foldr };
declare let seed: <A>() => List<A>;
export { seed };
declare let populate: <A>(..._s: A[]) => (_: List<A>) => List<A>;
export { populate };
/** merge :: (a -> a -> Ordering) -> List a -> List a -> List a */
declare let merge: <A>(f: (_: A) => (_: A) => Ordering) => (_: List<A>) => (_: List<A>) => List<A>;
export { merge };
/** show :: (Show a) => Show (List a) => List a -> String */
declare let Show: <A>(_: IShow<A>) => IShow<List<A>>;
export { Show };
declare let Foldable: Foldable1<"List"> & Foldable1.Ext<"List">;
export { Foldable };
declare let Populatable: Populatable1<"List">;
export { Populatable };
declare let List: {
    URI: "List";
    Nil: List<never>;
    Nil_: <A>() => List<A>;
    Cons: <A_1>(head: A_1, tail: List<A_1>) => List<A_1>;
    infer: <TList>(_: TList) => List<TList extends List<infer T> ? T : never>;
    create: <A_2>(_: A_2[]) => List<A_2>;
    cons: <A_3>(head: A_3) => (tail: List<A_3>) => List<A_3>;
    snoc: <A_4>(init: List<A_4>) => (last: A_4) => List<A_4>;
    singleton: <A_5>(_: A_5) => List<A_5>;
    head: <A_6>(_: List<A_6>) => A_6;
    last: <A_7>(_: List<A_7>) => A_7;
    tail: <A_8>(_: List<A_8>) => List<A_8>;
    uncons: <A_9>(_: List<A_9>) => Maybe<Tuple<A_9, List<A_9>>>;
    unsnoc: <A_10>(_: List<A_10>) => Maybe<Tuple<List<A_10>, A_10>>;
    shift: <A_11>(_: List<A_11>) => Maybe<List<A_11>>;
    shiftN: (n: Int) => <A_12>(_: List<A_12>) => Maybe<List<A_12>>;
    pop: <A_13>(_: List<A_13>) => Maybe<List<A_13>>;
    index: (i: Int) => <A_14>(_: List<A_14>) => Maybe<A_14>;
    find_: <A_15>(f: (_: A_15) => Bool) => (_: List<A_15>) => Maybe<Tuple<A_15, Int>>;
    reverseMap: <A_16, B>(f: (_: A_16) => B) => (_: List<A_16>) => List<B>;
    map: <A_17, B_1>(f: (_: A_17) => B_1) => (_: List<A_17>) => List<B_1>;
    reverse: <A_18>(_: List<A_18>) => List<A_18>;
    show: <A_19>(_: IShow<A_19>) => (_: List<A_19>) => IString;
    foldMap: <G>(_: Monoid<G>) => <A_20>(_: (_: A_20) => G) => (_: List<A_20>) => G;
    foldl: <A_21, B_2>(_: (_: B_2) => (_: A_21) => B_2) => (_: B_2) => (_: List<A_21>) => B_2;
    foldr: <A_22, B_3>(_: (_: A_22) => (_: B_3) => B_3) => (_: B_3) => (_: List<A_22>) => B_3;
    seed: <A_23>() => List<A_23>;
    populate: <A_24>(..._s: A_24[]) => (_: List<A_24>) => List<A_24>;
    merge: <A_25>(f: (_: A_25) => (_: A_25) => Ordering) => (_: List<A_25>) => (_: List<A_25>) => List<A_25>;
    Show: <A_26>(_: IShow<A_26>) => IShow<List<A_26>>;
    Foldable: Foldable1<"List"> & Foldable1.Ext<"List">;
    Populatable: Populatable1<"List">;
};
export default List;
