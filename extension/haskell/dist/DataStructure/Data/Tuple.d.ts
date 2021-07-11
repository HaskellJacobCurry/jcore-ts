import { ITuple } from '../../Typeclass/Data/ITuple';
interface Tuple<A, B> extends ITuple<A, B> {
}
export { Tuple };
export declare const URI: "Tuple";
export declare type URI = typeof URI;
declare module '../../Common/HKT' {
    interface KindsByURI2<T0, A> {
        [URI]: Tuple<T0, A>;
    }
}
declare let createTuple: <A, B>(fst: A, snd: B) => Tuple<A, B>;
export { createTuple as create };
declare let fromI: <A, B>(_: ITuple<A, B>) => Tuple<A, B>;
export { fromI };
/** fst :: Tuple a b -> a */
declare let fst: <A, B>(_: Tuple<A, B>) => A;
export { fst };
/** snd :: Tuple a b -> b */
declare let snd: <A, B>(_: Tuple<A, B>) => B;
export { snd };
/** swap :: Tuple a b -> Tuple b a */
declare let swap: <A, B>(_: Tuple<A, B>) => Tuple<B, A>;
export { swap };
declare type Constructor = typeof createTuple;
export { Constructor };
interface HTuple {
    URI: URI;
    create: <A, B>(fst: A, snd: B) => Tuple<A, B>;
    fromI: <A, B>(_: ITuple<A, B>) => Tuple<A, B>;
    fst: <A, B>(_: Tuple<A, B>) => A;
    snd: <A, B>(_: Tuple<A, B>) => B;
    swap: <A, B>(_: Tuple<A, B>) => Tuple<B, A>;
}
export { HTuple };
declare let Tuple: Constructor & HTuple;
export default Tuple;
