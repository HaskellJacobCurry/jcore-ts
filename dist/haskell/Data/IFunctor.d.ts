import { Construct } from '../../ts-toolbelt';
interface Functor {
    map: <A, B>(f: (_: A) => B) => (_: IFunctor<A>) => IFunctor<B>;
}
declare namespace Functor {
    let map: Functor['map'];
}
export { Functor };
export interface IFunctor<A> {
    construct: CFunctor<IFunctor<A>>;
    map<B>(f: (_: A) => B): IFunctor<B>;
}
export interface CFunctor<TFunctor extends IFunctor<any> = IFunctor<any>> extends Construct<TFunctor> {
}
