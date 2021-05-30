import { IShow } from './Show';
import { Functor1 } from './Functor';
import { ISemigroup } from './Semigroup';
import { IMonoid } from './Monoid';
interface IMaybe<A> {
    cata: <T, U>(fs: {
        Nothing: () => T;
        Just: (value: A) => U;
    }) => T | U;
}
export interface Nothing {
    readonly tag: 'Nothing';
}
export interface Just<A> {
    readonly tag: 'Just';
    readonly value: A;
}
export declare let Nothing: () => Maybe<never>;
export declare let Just: <A>(value: A) => Maybe<A>;
export declare const URI: "Maybe";
export declare type URI = typeof URI;
declare module '../util/HKT' {
    interface KindsByURI1<A> {
        [URI]: Maybe<A>;
    }
}
export declare let Show: <A>(Show: IShow<A>) => IShow<Maybe<A>>;
export declare let Functor: Functor1<URI>;
export declare let Monoid: <A>(Semigroup: ISemigroup<A>) => IMonoid<Maybe<A>>;
export declare type Maybe<A> = IMaybe<A> & (Nothing | Just<A>);
export declare let Maybe: {
    URI: "Maybe";
    reinterpret: <TMaybe>(maybe: TMaybe) => Maybe<TMaybe extends Maybe<infer T> ? T : never>;
    Nothing: () => Maybe<never>;
    Just: <A>(value: A) => Maybe<A>;
    Show: <A_1>(Show: IShow<A_1>) => IShow<Maybe<A_1>>;
    Functor: Functor1<"Maybe">;
};
export {};
