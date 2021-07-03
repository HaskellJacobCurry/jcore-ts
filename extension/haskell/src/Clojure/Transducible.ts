import {HKT, URI1, URI2, Kind1, Kind2} from '../util/HKT'
import {ITuple} from '../Data/ITuple'
import {IUnit} from '../Data/IUnit'
import {Reduced} from './Reduced'
import {Reducer} from './Reducer'
import {
	Json,
	create,
	const_,
	apply,
	define,
} from '../util'

interface ITransducible<F> {
	_reduce: <S, A, B>(f: (_: S) => (_: B) => (_: A) => ITuple<S, Reduced<B>>) => (_: S) => (_: B) => (_: HKT<F, A>) => ITuple<S, B>;
}
interface IExtTransducible<F> {
	reduce_: <S, A, B>(_: Reducer<S, A, B>) => (_: B) => (_: HKT<F, A>) => B;
}
interface Transducible<F> extends ITransducible<F> {
	URI: F;
}
export {Transducible}
export {Transducible as ITransducible}
namespace Transducible {
	export interface Ext<F> extends IExtTransducible<F> {}
	export let Ext: <F>(_: Transducible<F>) => Ext<F> = (
		<F>(TransducibleF: Transducible<F>) => define<Ext<F>>(Ext => ({
			reduce_: reducer => b => transducibleA => (
				apply((TransducibleF._reduce(reducer.step)(reducer.state)(b)(transducibleA)
				))(_ => reducer.complete(_.fst)(_.snd))
			),
		}))
	);

	export let instantiate = <F>(_: Transducible<F>) => (
		Json.assign(_, Ext(_))
	);
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
export {Transducible1}
export {Transducible1 as ITransducible1}

namespace Transducible1 {
	export interface Ext<F extends URI1> extends IExtTransducible1<F> {}
	export let Ext: <F extends URI1>(_: Transducible1<F>) => Ext<F> = (
		<F extends URI1>(TransducibleF: Transducible1<F>) => define<Ext<F>>(Ext => ({
			reduce_: reducer => b => transducibleA => (
				apply((TransducibleF._reduce(reducer.step)(reducer.state)(b)(transducibleA)
				))(_ => reducer.complete(_.fst)(_.snd))
			),
		}))
	);

	export let instantiate = <F extends URI1>(_: Transducible1<F>) => (
		Json.assign(_, Ext(_))
	);
}

export default Transducible