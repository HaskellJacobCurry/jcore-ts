import { IShow } from './Show';
import { Functor1 } from './Functor';
import { Apply1 } from '../Control/Apply';
import { Applicative1 } from '../Control/Applicative';
import { Bind1 } from '../Control/Bind';
import { Monad1 } from '../Control/Monad';
import { ISemigroup } from './Semigroup';
import { IMonoid } from './Monoid';
import { Foldable1 } from './Foldable';
declare const URI: "Maybe";
declare type URI = typeof URI;
declare module '../util/HKT' {
    interface KindsByURI1<A> {
        [URI]: Maybe<A>;
    }
}
export { URI };
/** data Maybe a = Just a | Nothing */
declare type Maybe<A> = IMaybe<A> & (Nothing | Just<A>) & {
    URI: URI;
};
export { Maybe };
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
interface Just<A> {
    tag: 'Just';
    value: A;
}
declare let Just: <A>(_: A) => Maybe<A>;
export { Just };
declare let infer: <TMaybe>(maybe: TMaybe) => Maybe<TMaybe extends Maybe<infer T> ? T : never>;
export { infer };
/** maybe :: b -> (a -> b) -> Maybe a -> b */
declare let maybe: <B>(_: B) => <A>(_: (_: A) => B) => (_: Maybe<A>) => B;
export { maybe };
declare let Show: <A>(_: IShow<A>) => IShow<Maybe<A>>;
export { Show };
declare let Functor: Functor1<"Maybe"> & Functor1.Ext<"Maybe">;
export { Functor };
declare let Apply: Apply1<"Maybe"> & Apply1.Ext<"Maybe">;
export { Apply };
declare let Applicative: Applicative1<"Maybe">;
export { Applicative };
declare let Bind: Bind1<"Maybe"> & Bind1.Ext<"Maybe">;
export { Bind };
declare let Monad: Monad1<"Maybe"> & Monad1.Ext<"Maybe">;
export { Monad };
declare let Semigroup: <A>(_: ISemigroup<A>) => ISemigroup<Maybe<A>>;
export { Semigroup };
declare let Monoid: <A>(_: ISemigroup<A>) => IMonoid<Maybe<A>> & IMonoid.Ext<Maybe<A>>;
export { Monoid };
declare let Foldable: Foldable1<"Maybe"> & Foldable1.Ext<"Maybe">;
export { Foldable };
declare let Maybe: {
    URI: "Maybe";
    Nothing: Maybe<never>;
    Just: <A>(_: A) => Maybe<A>;
    infer: <TMaybe>(maybe: TMaybe) => Maybe<TMaybe extends Maybe<infer T> ? T : never>;
    maybe: <B>(_: B) => <A_1>(_: (_: A_1) => B) => (_: Maybe<A_1>) => B;
    Show: <A_2>(_: IShow<A_2>) => IShow<Maybe<A_2>>;
    Functor: Functor1<"Maybe"> & Functor1.Ext<"Maybe">;
    Apply: Apply1<"Maybe"> & Apply1.Ext<"Maybe">;
    Applicative: Applicative1<"Maybe">;
    Bind: Bind1<"Maybe"> & Bind1.Ext<"Maybe">;
    Monad: Monad1<"Maybe"> & Monad1.Ext<"Maybe">;
    Semigroup: <A_3>(_: ISemigroup<A_3>) => ISemigroup<Maybe<A_3>>;
    Monoid: <A_4>(_: ISemigroup<A_4>) => IMonoid<Maybe<A_4>> & IMonoid.Ext<Maybe<A_4>>;
    Foldable: Foldable1<"Maybe"> & Foldable1.Ext<"Maybe">;
};
export default Maybe;
