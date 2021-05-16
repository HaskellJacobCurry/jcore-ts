import {
	Construct
} from '../../ts-toolbelt'

interface Functor {
	map: <A, B>(f: (_: A) => B) => (_: IFunctor<A>) => IFunctor<B>;
}
namespace Functor {
	export let map: Functor['map'] = f => functorA => functorA.map(f);
}
export {Functor}

export interface IFunctor<A> {
	construct: CFunctor<IFunctor<A>>;
	map<B>(f: (_: A) => B): IFunctor<B>;
}
export interface CFunctor<TFunctor extends IFunctor<any> = IFunctor<any>> extends Construct<TFunctor> {}