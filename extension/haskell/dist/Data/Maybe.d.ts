import { IShow } from './Show';
import { Functor1 } from './Functor';
import { Apply1 } from '../Control/Apply';
import { Applicative1 } from '../Control/Applicative';
import { Bind1 } from '../Control/Bind';
import { Monad1 } from '../Control/Monad';
import { ISemigroup } from './Semigroup';
import { IMonoid } from './Monoid';
import { Foldable1 } from './Foldable';
import { String } from './String';
/** data Maybe a = Just a | Nothing */
declare type Maybe<A> = IMaybe<A> & (Nothing | Just<A>) & {
    URI: URI;
};
export { Maybe };
declare const URI: "Maybe";
declare type URI = typeof URI;
declare module '../util/HKT' {
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
declare let show: <A>(_: IShow<A>) => (_: Maybe<A>) => String;
export { show };
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
    Nothing_: <A>() => Maybe<A>;
    Just: <A_1>(_: A_1) => Maybe<A_1>;
    infer: <TMaybe>(_: TMaybe) => Maybe<TMaybe extends Maybe<infer T> ? T : never>;
    maybe: <B>(_: B) => <A_2>(_: (_: A_2) => B) => (_: Maybe<A_2>) => B;
    show: <A_3>(_: IShow<A_3>) => (_: Maybe<A_3>) => String;
    Show: <A_4>(_: IShow<A_4>) => IShow<Maybe<A_4>>;
    Functor: Functor1<"Maybe"> & Functor1.Ext<"Maybe">;
    Apply: Apply1<"Maybe"> & Apply1.Ext<"Maybe">;
    Applicative: Applicative1<"Maybe">;
    Bind: Bind1<"Maybe"> & Bind1.Ext<"Maybe">;
    Monad: Monad1<"Maybe"> & Monad1.Ext<"Maybe">;
    Semigroup: <A_5>(_: ISemigroup<A_5>) => ISemigroup<Maybe<A_5>>;
    Monoid: <A_6>(_: ISemigroup<A_6>) => IMonoid<Maybe<A_6>> & IMonoid.Ext<Maybe<A_6>>;
    Foldable: Foldable1<"Maybe"> & Foldable1.Ext<"Maybe">;
};
export default Maybe;
