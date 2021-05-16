import {
} from '../../ts-toolbelt'

export interface Functor {
	map: <A, B>(f: (_: A) => B) => (_: IFunctor<A>) => IFunctor<B>;
}
export namespace Functor {
	export let map: Functor['map'] = f => functorA => functorA.map(f);
}

export interface IFunctor<A> {
	map<B>(f: (_: A) => B): IFunctor<B>;
}