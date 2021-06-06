import { IShow } from './Show';
import { Functor1 } from './Functor';
import { Apply1 } from '../Control/Apply';
import { Bind1 } from '../Control/Bind';
import { ISemigroup } from './Semigroup';
import { IMonoid } from './Monoid';
/** data Maybe a = Just a | Nothing */
declare type Maybe<A> = IMaybe<A> & (Nothing | Just<A>);
export { Maybe };
interface IMaybe<A> {
    cata: <T, U>(fs: {
        Nothing: () => T;
        Just: (value: A) => U;
    }) => T | U;
}
interface Nothing {
    readonly tag: 'Nothing';
}
declare let Nothing: Maybe<never>;
export { Nothing };
interface Just<A> {
    readonly tag: 'Just';
    readonly value: A;
}
declare let Just: <A>(value: A) => Maybe<A>;
export { Just };
declare const URI: "Maybe";
declare type URI = typeof URI;
declare module '../util/HKT' {
    interface KindsByURI1<A> {
        [URI]: Maybe<A>;
    }
}
export { URI };
declare let Show: <A>(Show: IShow<A>) => IShow<Maybe<A>>;
export { Show };
declare let Functor: Functor1<URI>;
export { Functor };
declare let Apply: Apply1<URI> & Apply1.Ext<URI>;
export { Apply };
declare let Bind: Bind1<URI>;
export { Bind };
declare let Monoid: <A>(Semigroup: ISemigroup<A>) => IMonoid<Maybe<A>>;
export { Monoid };
declare let Maybe: {
    URI: "Maybe";
    reinterpret: <TMaybe>(maybe: TMaybe) => Maybe<TMaybe extends Maybe<infer T> ? T : never>;
    Nothing: IMaybe<never> & Nothing;
    Just: <A>(value: A) => Maybe<A>;
    Show: <A_1>(Show: IShow<A_1>) => IShow<Maybe<A_1>>;
    Functor: Functor1<"Maybe">;
    Apply: Apply1<"Maybe"> & Apply1.Ext<"Maybe">;
};
