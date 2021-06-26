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
/** head :: [a] -> a */
declare let head: <A>(_: List<A>) => A;
export { head };
/** last :: [a] -> a  */
declare let last: <A>(_: List<A>) => A;
export { last };
declare let List: {
    URI: "List";
    Nil: List<never>;
    Nil_: <A>() => List<A>;
    Cons: <A_1>(head: A_1, tail: List<A_1>) => List<A_1>;
    infer: <TList>(_: TList) => List<TList extends List<infer T> ? T : never>;
    create: <A_2>(_: A_2[]) => List<A_2>;
    head: <A_3>(_: List<A_3>) => A_3;
    last: <A_4>(_: List<A_4>) => A_4;
};
export default List;
