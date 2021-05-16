export interface Functor {
    map: <A, B>(f: (_: A) => B) => (_: IFunctor<A>) => IFunctor<B>;
}
export declare namespace Functor {
    let map: Functor['map'];
}
export interface IFunctor<A> {
    map<B>(f: (_: A) => B): IFunctor<B>;
}
