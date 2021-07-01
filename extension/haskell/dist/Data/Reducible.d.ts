import { HKT, URI1, Kind1 } from '../util/HKT';
declare type Reducer<A, B> = (_: B) => (_: A) => B;
export { Reducer };
declare type Transducer_<A, B, C = A> = (_: Reducer<C, B>) => Reducer<A, B>;
export { Transducer_ };
declare type Transducer<A, B> = Transducer_<A, B>;
export { Transducer };
interface IReducible<F> {
    reduce: <A, B>(reducer: Reducer<A, B>) => (seed: B) => (_: HKT<F, A>) => B;
}
interface IExtReducible<F> {
    transduce: <A, B>(_: Transducer<A, B>) => (_: Reducer<A, B>) => (_: B) => (_: HKT<F, A>) => B;
}
interface Reducible<F> extends IReducible<F> {
    URI: F;
}
export { Reducible };
export { Reducible as IReducible };
declare namespace Reducible {
    interface Ext<F> extends IExtReducible<F> {
    }
    let Ext: <F>(_: Reducible<F>) => Ext<F>;
    let instantiate: <F>(_: Reducible<F>) => Reducible<F> & Ext<F>;
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
export { Reducible1 };
export { Reducible1 as IReducible1 };
declare namespace Reducible1 {
    interface Ext<F extends URI1> extends IExtReducible1<F> {
    }
    let Ext: <F extends URI1>(_: Reducible1<F>) => Ext<F>;
    let instantiate: <F extends "Endo" | "Maybe" | "List">(_: Reducible1<F>) => Reducible1<F> & Ext<F>;
}
export default Reducible;
