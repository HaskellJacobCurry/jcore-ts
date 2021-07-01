import {HKT, URI1, URI2, Kind1, Kind2} from '../../../dist/util/HKT'
import {Reducible, Reducible1} from './Reducible'

type Reducer<A, B> = (_: B) => (_: A) => B;
export {Reducer}
type Transducer_<A, B, C = A> = (_: Reducer<C, B>) => Reducer<A, B>;
export {Transducer_}
type Transducer<A, B> = Transducer_<A, B>;
export {Transducer}

interface ITransducible<F> {
	transduce: <A, B>(_: Transducer<A, B>) => (_: Reducer<A, B>) => (_: B) => (_: HKT<F, A>) => B;
}
interface Transducible<F> extends ITransducible<F>, Reducible<F> {}
export {Transducible}
export {Transducible as ITransducible}
namespace Transducible {
	export let Def: <F>(_: Transducible<F>) => ITransducible<F> = (
		TransducibleF => ({
			transduce: transducer => reducer => TransducibleF.reduce(transducer(reducer)),
		})
	);

	export let instantiate = <F>(_: Transducible<F>) => _;
}

interface ITransducible1<F extends URI1> {
	transduce: <A, B>(_: Transducer<A, B>) => (_: Reducer<A, B>) => (_: B) => (_: Kind1<F, A>) => B;
}
interface Transducible1<F extends URI1> extends ITransducible1<F>, Reducible1<F> {}
export {Transducible1}
export {Transducible1 as ITransducible1}

namespace Transducible1 {
	export let Def: <F extends URI1>(_: Transducible1<F>) => ITransducible1<F> = (
		TransducibleF => ({
			transduce: transducer => reducer => TransducibleF.reduce(transducer(reducer)),
		})
	);

	export let instantiate = <F extends URI1>(_: Transducible1<F>) => _;
}

export default Transducible