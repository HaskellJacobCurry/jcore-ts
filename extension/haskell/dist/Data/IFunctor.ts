import {
	Construct,
	Constructible
} from '../../dependency/jcore/dist/ts-toolbelt'

interface Functor {
	map: <A extends Constructible, B extends Constructible>
		(f: (_: A) => B) => (_: IFunctor<A>) => IFunctor<B>;
}
namespace Functor {
	export let map: Functor['map'] = f => functorA => functorA.map(f);
}
export {Functor}

export interface IFunctor<A extends Constructible = Constructible> {
	construct: CFunctor<IFunctor<A>>;
	map<B extends Constructible>
	(f: (_: A) => B): IFunctor<B>;
}
export interface CFunctor<TFunctor extends IFunctor = IFunctor> extends Construct<TFunctor> {}