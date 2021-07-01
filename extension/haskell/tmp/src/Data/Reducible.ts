import {HKT, URI1, URI2, Kind1, Kind2} from '../../../dist/util/HKT'

interface IReducible<F> {
	reduce: <A, B>(reducer: (_: B) => (_: A) => B) => (seed: B) => (_: HKT<F, A>) => B;
}
interface Reducible<F> extends IReducible<F> {
	URI: F;
}
export {Reducible}
export {Reducible as IReducible}
namespace Reducible {
	export let instantiate = <F>(_: Reducible<F>) => _;
}

interface IReducible1<F extends URI1> {
	reduce: <A, B>(reducer: (_: B) => (_: A) => B) => (seed: B) => (_: Kind1<F, A>) => B;
}
interface Reducible1<F extends URI1> extends IReducible1<F> {
	URI: F;
}
export {Reducible1}
export {Reducible1 as IReducible1}

namespace Reducible1 {
	export let instantiate = <F extends URI1>(_: Reducible1<F>) => _;
}

export default Reducible