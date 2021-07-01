import {HKT, URI1, URI2, Kind1, Kind2} from '../util/HKT'
import {
	Json,
	define
} from '../util'

type Reducer<A, B> = (_: B) => (_: A) => B;
export {Reducer}
type Transducer_<A, B, C = A> = (_: Reducer<C, B>) => Reducer<A, B>;
export {Transducer_}
type Transducer<A, B> = Transducer_<A, B>;
export {Transducer}

interface IReducible<F> {
	reduce: <A, B>(reducer: Reducer<A, B>) => (seed: B) => (_: HKT<F, A>) => B;
}
interface IExtReducible<F> {
	transduce: <A, B>(_: Transducer<A, B>) => (_: Reducer<A, B>) => (_: B) => (_: HKT<F, A>) => B;
}
interface Reducible<F> extends IReducible<F> {
	URI: F;
}
export {Reducible}
export {Reducible as IReducible}
namespace Reducible {
	export interface Ext<F> extends IExtReducible<F> {}
	export let Ext: <F>(_: Reducible<F>) => Ext<F> = (
		<F>(ReducibleF: Reducible<F>) => (
			define<Ext<F>>(Ext => ({
				transduce: transducer => reducer => ReducibleF.reduce(transducer(reducer)),
			}))
		)
	);

	export let instantiate = <F>(_: Reducible<F>) => (
		Json.assign(_, Ext(_))
	);
}

interface IReducible1<F extends URI1> {
	reduce: <A, B>(reducer: Reducer<A, B>) => (seed: B) => (_: Kind1<F, A>) => B;
}
interface IExtReducible1<F extends URI1> {
	transduce: <A, B>(_: Transducer<A, B>) => (_: Reducer<A, B>) => (_: B) => (_: Kind1<F, A>) => B;
}
interface Reducible1<F extends URI1> extends IReducible1<F> {
	URI: F;
}
export {Reducible1}
export {Reducible1 as IReducible1}

namespace Reducible1 {
	export interface Ext<F extends URI1> extends IExtReducible1<F> {}
	export let Ext: <F extends URI1>(_: Reducible1<F>) => Ext<F> = (
		<F extends URI1>(ReducibleF: Reducible1<F>) => (
			define<Ext<F>>(Ext => ({
				transduce: transducer => reducer => ReducibleF.reduce(transducer(reducer)),
			}))
		)
	);

	export let instantiate = <F extends URI1>(_: Reducible1<F>) => (
		Json.assign(_, Ext(_))
	);
}

export default Reducible