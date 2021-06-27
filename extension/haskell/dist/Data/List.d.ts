import { Foldable1 } from './Foldable';
import { IShow } from './Show';
import { Monoid } from './Monoid';
import { Maybe } from './Maybe';
import { Tuple } from './Tuple';
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
declare let foldMap: <G>(_: Monoid<G>) => <A>(_: (_: A) => G) => (_: List<A>) => G;
export { foldMap };
declare let foldl: <A, B>(_: (_: B) => (_: A) => B) => (_: B) => (_: List<A>) => B;
export { foldl };
declare let foldr: <A, B>(_: (_: A) => (_: B) => B) => (_: B) => (_: List<A>) => B;
export { foldr };
/** show :: (Show a) => Show (List a) => List a -> String */
declare let Show: <A>(_: IShow<A>) => IShow<List<A>>;
export { Show };
declare let Foldable: Foldable1<"List"> & Foldable1.Ext<"List">;
export { Foldable };
declare let List: {
    URI: "List";
    Nil: List<never>;
    Nil_: <A>() => List<A>;
    Cons: <A_1>(head: A_1, tail: List<A_1>) => List<A_1>;
    infer: <TList>(_: TList) => List<TList extends List<infer T> ? T : never>;
    create: <A_2>(_: A_2[]) => List<A_2>;
    cons: <A_3>(head: A_3) => (tail: List<A_3>) => List<A_3>;
    singleton: <A_4>(_: A_4) => List<A_4>;
    head: <A_5>(_: List<A_5>) => A_5;
    last: <A_6>(_: List<A_6>) => A_6;
    tail: <A_7>(_: List<A_7>) => List<A_7>;
    uncons: <A_8>(_: List<A_8>) => Maybe<Tuple<A_8, List<A_8>>>;
    unsnoc: <A_9>(_: List<A_9>) => Maybe<Tuple<List<A_9>, A_9>>;
    foldMap: <G>(_: Monoid<G>) => <A_10>(_: (_: A_10) => G) => (_: List<A_10>) => G;
    foldl: <A_11, B>(_: (_: B) => (_: A_11) => B) => (_: B) => (_: List<A_11>) => B;
    foldr: <A_12, B_1>(_: (_: A_12) => (_: B_1) => B_1) => (_: B_1) => (_: List<A_12>) => B_1;
    Show: <A_13>(_: IShow<A_13>) => IShow<List<A_13>>;
    Foldable: Foldable1<"List"> & Foldable1.Ext<"List">;
};
export default List;
