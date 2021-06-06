import { ISemigroup } from './Semigroup';
import { Functor2 } from './Functor';
import { Apply2_ } from '../Control/Apply';
export declare const URI: "Tuple";
export declare type URI = typeof URI;
declare module '../util/HKT' {
    interface KindsByURI2<T0, A> {
        [URI]: Tuple<T0, A>;
    }
}
/** fst :: Tuple a b -> a */
declare let fst: <A>(_: Tuple<A, any>) => A;
export { fst };
/** snd :: Tuple a b -> b */
declare let snd: <B>(_: Tuple<any, B>) => B;
export { snd };
/** swap :: Tuple a b -> Tuple b a */
declare let swap: <A, B>(_: Tuple<A, B>) => Tuple<B, A>;
export { swap };
/** map :: Functor (Tuple a) => (b -> c) -> Tuple a b -> Tuple a c */
declare let Functor: Functor2<URI>;
export { Functor };
/** ap :: Semigroup a => Apply (Tuple a) => Tuple a (b -> c) -> Tuple a b -> Tuple a c */
declare let Apply: <T0>(Semigroup: ISemigroup<T0>) => Apply2_<"Tuple", T0> & Apply2_.Ext<"Tuple", T0>;
export { Apply };
interface Tuple<A, B> {
    fst: A;
    snd: B;
}
declare let Tuple: (<A, B>(fst: A, snd: B) => Tuple<A, B>) & {
    fst: <A_1>(_: Tuple<A_1, any>) => A_1;
    snd: <B_1>(_: Tuple<any, B_1>) => B_1;
    swap: <A_2, B_2>(_: Tuple<A_2, B_2>) => Tuple<B_2, A_2>;
    Apply: <T0>(Semigroup: ISemigroup<T0>) => Apply2_<"Tuple", T0> & Apply2_.Ext<"Tuple", T0>;
};
export { Tuple };
