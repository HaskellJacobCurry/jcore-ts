import { HKT, URI1, Kind1 } from '../../../dist/util/HKT';
interface IReducible<F> {
    reduce: <A, B>(reducer: (_: B) => (_: A) => B) => (seed: B) => (_: HKT<F, A>) => B;
}
interface Reducible<F> extends IReducible<F> {
    URI: F;
}
export { Reducible };
export { Reducible as IReducible };
declare namespace Reducible {
    let instantiate: <F>(_: Reducible<F>) => Reducible<F>;
}
interface IReducible1<F extends URI1> {
    reduce: <A, B>(reducer: (_: B) => (_: A) => B) => (seed: B) => (_: Kind1<F, A>) => B;
}
interface Reducible1<F extends URI1> extends IReducible1<F> {
    URI: F;
}
export { Reducible1 };
export { Reducible1 as IReducible1 };
declare namespace Reducible1 {
    let instantiate: <F extends never>(_: Reducible1<F>) => Reducible1<F>;
}
export default Reducible;
