import { HKT, URI1, Kind1 } from '../../Common/HKT';
interface IPopulatable<F> {
    seed: <A>() => HKT<F, A>;
    populate: <A>(..._s: A[]) => (_: HKT<F, A>) => HKT<F, A>;
}
interface Populatable<F> extends IPopulatable<F> {
    URI: F;
}
export { Populatable };
export { Populatable as IPopulatable };
declare namespace Populatable {
    let instantiate: <F>(_: Populatable<F>) => Populatable<F>;
}
interface IPopulatable1<F extends URI1> {
    seed: <A>() => Kind1<F, A>;
    populate: <A>(..._s: A[]) => (_: Kind1<F, A>) => Kind1<F, A>;
}
interface Populatable1<F extends URI1> extends IPopulatable1<F> {
    URI: F;
}
export { Populatable1 };
export { Populatable1 as IPopulatable1 };
declare namespace Populatable1 {
    let instantiate: <F extends URI1>(_: Populatable1<F>) => Populatable1<F>;
}
export default Populatable;
