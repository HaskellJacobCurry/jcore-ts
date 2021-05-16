import { IFunctor } from './IFunctor';
import { Construct, Deconstruct } from '../../ts-toolbelt';
declare abstract class Maybe<A = any> implements IFunctor<A> {
    construct: typeof Maybe._Nothing;
    a: A;
    abstract cata: Maybe.Cata<A>;
    static Nothing: <A_1 = any>() => Maybe<A_1>;
    static Just: <A_1>(a: A_1) => Maybe<A_1>;
    map<B>(f: (_: A) => B): IFunctor<B>;
}
declare namespace Maybe {
    namespace Tag {
        let Nothing: "Nothing";
        let Just: "Just";
    }
    interface Cata<A extends any> {
        <T, U>(fs: {
            Nothing: () => T;
            Just: (a: A) => U;
        }): T | U;
    }
    class _Nothing<A = any> extends Maybe<A> {
        tag: "Nothing";
        cata: Cata<A>;
    }
    class _Just<A = any> extends Maybe<A> {
        tag: "Just";
        cata: Cata<A>;
    }
}
declare let _Maybe: <A extends Construct<any>>(a: A) => typeof Maybe & {
    Lift: (a: Deconstruct<A>) => Maybe<Deconstruct<A>>;
};
export { _Maybe as Maybe };
export default Maybe;
