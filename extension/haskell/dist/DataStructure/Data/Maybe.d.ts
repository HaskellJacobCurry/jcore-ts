/** data Maybe a = Just a | Nothing */
declare type Maybe<A> = IMaybe<A> & (Nothing | Just<A>) & {
    URI: URI;
};
export { Maybe };
declare const URI: "Maybe";
declare type URI = typeof URI;
declare module '../../Common/HKT' {
    interface KindsByURI1<A> {
        [URI]: Maybe<A>;
    }
}
export { URI };
interface IMaybe<A> {
    cata: <T, U>(fs: {
        Nothing: () => T;
        Just: (value: A) => U;
    }) => T | U;
}
interface Nothing {
    tag: 'Nothing';
}
declare let Nothing: Maybe<never>;
export { Nothing };
declare let Nothing_: <A>() => Maybe<A>;
export { Nothing_ };
interface Just<A> {
    tag: 'Just';
    value: A;
}
declare let Just: <A>(_: A) => Maybe<A>;
export { Just };
declare let infer: <TMaybe>(_: TMaybe) => Maybe<TMaybe extends Maybe<infer T> ? T : never>;
export { infer };
/** maybe :: b -> (a -> b) -> Maybe a -> b */
declare let maybe: <B>(_: B) => <A>(_: (_: A) => B) => (_: Maybe<A>) => B;
export { maybe };
interface HMaybe {
    URI: URI;
    Nothing: Maybe<never>;
    Nothing_: <A>() => Maybe<A>;
    Just: <A>(_: A) => Maybe<A>;
    infer: typeof infer;
    maybe: <B>(_: B) => <A>(_: (_: A) => B) => (_: Maybe<A>) => B;
}
export { HMaybe };
declare let Maybe: HMaybe;
export default Maybe;
