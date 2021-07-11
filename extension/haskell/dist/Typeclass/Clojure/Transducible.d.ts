import { HKT, URI1, Kind1 } from '../../Common/HKT';
import { ITuple } from '../Data/ITuple';
import { Reduced } from '../../DataStructure/Clojure/Reduced';
import { Reducer } from '../../DataStructure/Clojure/Reducer';
interface ITransducible<F> {
    _reduce: <S, A, B>(f: (_: S) => (_: B) => (_: A) => ITuple<S, Reduced<B>>) => (_: S) => (_: B) => (_: HKT<F, A>) => ITuple<S, B>;
}
interface IExtTransducible<F> {
    reduce_: <S, A, B>(_: Reducer<S, A, B>) => (_: B) => (_: HKT<F, A>) => B;
}
interface Transducible<F> extends ITransducible<F> {
    URI: F;
}
export { Transducible };
export { Transducible as ITransducible };
declare namespace Transducible {
    interface Ext<F> extends IExtTransducible<F> {
    }
    let Ext: <F>(_: Transducible<F>) => Ext<F>;
    let instantiate: <F>(_: Transducible<F>) => Transducible<F> & Ext<F>;
}
interface ITransducible1<F extends URI1> {
    _reduce: <S, A, B>(f: (_: S) => (_: B) => (_: A) => ITuple<S, Reduced<B>>) => (_: S) => (_: B) => (_: Kind1<F, A>) => ITuple<S, B>;
}
interface IExtTransducible1<F extends URI1> {
    reduce_: <S, A, B>(_: Reducer<S, A, B>) => (_: B) => (_: Kind1<F, A>) => B;
}
interface Transducible1<F extends URI1> extends ITransducible1<F> {
    URI: F;
}
export { Transducible1 };
export { Transducible1 as ITransducible1 };
declare namespace Transducible1 {
    interface Ext<F extends URI1> extends IExtTransducible1<F> {
    }
    let Ext: <F extends URI1>(_: Transducible1<F>) => Ext<F>;
    let instantiate: <F extends URI1>(_: Transducible1<F>) => Transducible1<F> & Ext<F>;
}
export default Transducible;
