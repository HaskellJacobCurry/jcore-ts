import {IBase} from '../IBase'
import {
	Construct,
} from '../../dependency/jcore/dist/ts-toolbelt'

interface Functor {
	map: <A extends IBase, B extends IBase>
		(f: (_: A) => B) => (_: IFunctor<A>) => IFunctor<B>;
}
namespace Functor {
	export let map: Functor['map'] = f => functorA => functorA.map(f);
}
export {Functor}

export interface IFunctor<A extends IBase = IBase> extends IBase {
	construct: CFunctor<IFunctor<A>>;
	map<B extends IBase>
	(f: (_: A) => B): IFunctor<B>;
}
export interface CFunctor<TFunctor extends IFunctor = IFunctor> extends Construct<TFunctor> {
	default: TFunctor;
}