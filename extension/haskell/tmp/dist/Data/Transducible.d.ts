import { HKT, URI1, Kind1 } from '../../../dist/util/HKT';
import { Reducible, Reducible1 } from './Reducible';
declare type Reducer<A, B> = (_: B) => (_: A) => B;
export { Reducer };
declare type Transducer_<A, B, C = A> = (_: Reducer<C, B>) => Reducer<A, B>;
export { Transducer_ };
declare type Transducer<A, B> = Transducer_<A, B>;
export { Transducer };
interface ITransducible<F> {
    transduce: <A, B>(_: Transducer<A, B>) => (_: Reducer<A, B>) => (_: B) => (_: HKT<F, A>) => B;
}
interface Transducible<F> extends ITransducible<F>, Reducible<F> {
}
export { Transducible };
export { Transducible as ITransducible };
declare namespace Transducible {
    let Def: <F>(_: Transducible<F>) => ITransducible<F>;
    let instantiate: <F>(_: Transducible<F>) => Transducible<F>;
}
interface ITransducible1<F extends URI1> {
    transduce: <A, B>(_: Transducer<A, B>) => (_: Reducer<A, B>) => (_: B) => (_: Kind1<F, A>) => B;
}
interface Transducible1<F extends URI1> extends ITransducible1<F>, Reducible1<F> {
}
export { Transducible1 };
export { Transducible1 as ITransducible1 };
declare namespace Transducible1 {
    let Def: <F extends URI1>(_: Transducible1<F>) => ITransducible1<F>;
    let instantiate: <F extends never>(_: Transducible1<F>) => Transducible1<F>;
}
export default Transducible;
