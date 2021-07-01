import {HKT, URI1, URI2, Kind1, Kind2} from '../util/HKT'
import {
	Json,
	define
} from '../util'

interface IPopulatable<F> {
	seed: <A>() => HKT<F, A>;
	populate: <A>(..._s: A[]) => (_: HKT<F, A>) => HKT<F, A>,
}
interface Populatable<F> extends IPopulatable<F> {
	URI: F;
}
export {Populatable}
export {Populatable as IPopulatable}
namespace Populatable {
	export let instantiate = <F>(_: Populatable<F>) => _;
}

interface IPopulatable1<F extends URI1> {
	seed: <A>() => Kind1<F, A>;
	populate: <A>(..._s: A[]) => (_: Kind1<F, A>) => Kind1<F, A>,
}
interface Populatable1<F extends URI1> extends IPopulatable1<F> {
	URI: F;
}
export {Populatable1}
export {Populatable1 as IPopulatable1}

namespace Populatable1 {
	export let instantiate = <F extends URI1>(_: Populatable1<F>) => _;
}

export default Populatable