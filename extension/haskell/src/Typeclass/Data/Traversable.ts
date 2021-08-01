import {HKT, URI1, URI2, Kind1, Kind2} from '../../Common/HKT'
import {Functor, Functor1} from './Functor'
import {Foldable, Foldable1} from './Foldable'
import {Applicative, Applicative1} from '../Control/Applicative'
import {Monad, Monad1} from '../Control/Monad'
import {
	merge,
	define,
	assign,
	apply,
	id,
} from '../../Common/common'

/**
 * class (Functor t, Foldable t) => Traversable f where
 *  traverse? :: Applicative g => (a -> g b) -> f a -> g (f b)
 *  sequenceA? :: Applicative g => f (g a) -> g (f a) 
 */
interface ITraversable<F> {
	traverse: <G>(_: Applicative<G>) => <A, B>(_: (_: A) => HKT<G, B>) => (_: HKT<F, A>) => HKT<G, HKT<F, B>>;
	sequenceA: <G>(_: Applicative<G>) => <A>(_: HKT<F, HKT<G, A>>) => HKT<G, HKT<F, A>>;
}
interface IExtTraversable<F> {
	mapM: <G>(_: Monad<G>) => <A, B>(_: (_: A) => HKT<G, B>) => (_: HKT<F, A>) => HKT<G, HKT<F, B>>;
	sequenceM: <G>(_: Monad<G>) => <A>(_: HKT<F, HKT<G, A>>) => HKT<G, HKT<F, A>>;
	sequence: <G>(_: Monad<G>) => <A>(_: HKT<F, HKT<G, A>>) => HKT<G, HKT<F, A>>;
}
interface Traversable<F> extends ITraversable<F>, Functor<F>, Foldable<F> {}
export {Traversable}
export {Traversable as ITraversable}
namespace Traversable {
	export let Def: <F>(_: Traversable<F>) => ITraversable<F> = (
		<F>(TraversableF: Traversable<F>) => ({
			traverse: <G>(ApplicativeG: Applicative<G>) => <A, B>(f: (_: A) => HKT<G, B>) => (traversable: HKT<F, A>) => (
				assign(
					TraversableF.fmap(f)(traversable)
				)(_ => TraversableF.sequenceA(ApplicativeG)(_))
			),
			sequenceA: <G>(ApplicativeG: Applicative<G>) => <A>(traversable: HKT<F, HKT<G, A>>) => (
				assign(
					TraversableF.traverse(ApplicativeG)
				)(_ => _<HKT<G, A>, A>(id)(traversable))
			),
		})
	);

	export interface Ext<F> extends IExtTraversable<F> {}
	export let Ext: <F>(_: Traversable<F>) => Ext<F> = (
		<F>(TraversableF: Traversable<F>) => (
			define<Ext<F>>(Ext => ({
				mapM: MonadG => TraversableF.traverse(MonadG),
				sequenceM: MonadG => TraversableF.sequenceA(MonadG),
				sequence: MonadG => Ext().sequenceM(MonadG),
			}))
		)
	);

	export let instantiate: <F>() => <TTraversable extends Traversable<F>>(_: TTraversable) => TTraversable & Ext<F> = (
		() => _ => assign(merge(Def(_), _))(_ => merge(_, Ext(_)))
	);
}

interface ITraversable1<F extends URI1> {
	traverse: <G extends URI1>(_: Applicative1<G>) => <A, B>(_: (_: A) => Kind1<G, B>) => (_: Kind1<F, A>) => Kind1<G, Kind1<F, B>>;
	sequenceA: <G extends URI1>(_: Applicative1<G>) => <A>(_: Kind1<F, Kind1<G, A>>) => Kind1<G, Kind1<F, A>>;
}
interface IExtTraversable1<F extends URI1> {
	mapM: <G extends URI1>(_: Monad1<G>) => <A, B>(_: (_: A) => Kind1<G, B>) => (_: Kind1<F, A>) => Kind1<G, Kind1<F, B>>;
	sequenceM: <G extends URI1>(_: Monad1<G>) => <A>(_: Kind1<F, Kind1<G, A>>) => Kind1<G, Kind1<F, A>>;
	sequence: <G extends URI1>(_: Monad1<G>) => <A>(_: Kind1<F, Kind1<G, A>>) => Kind1<G, Kind1<F, A>>;
}
interface Traversable1<F extends URI1> extends ITraversable1<F>, Functor1<F>, Foldable1<F> {}
export {Traversable1}

namespace ITraversable1 {
	export let Def: <F extends URI1>(_: Traversable1<F>) => ITraversable1<F> = (
		<F extends URI1>(TraversableF: Traversable1<F>) => ({
			traverse: <G extends URI1>(ApplicativeG: Applicative1<G>) => <A, B>(f: (_: A) => Kind1<G, B>) => (traversable: Kind1<F, A>) => (
				assign(
					TraversableF.fmap(f)(traversable)
				)(_ => TraversableF.sequenceA(ApplicativeG)(_))
			),
			sequenceA: <G extends URI1>(ApplicativeG: Applicative1<G>) => <A>(traversable: Kind1<F, Kind1<G, A>>) => (
				assign(
					TraversableF.traverse(ApplicativeG)
				)(_ => _<Kind1<G, A>, A>(id)(traversable))
			),
		})
	);

	export interface Ext<F extends URI1> extends IExtTraversable1<F> {}
	export let Ext: <F extends URI1>(_: Traversable1<F>) => Ext<F> = (
		<F extends URI1>(TraversableF: Traversable1<F>) => (
			define<Ext<F>>(Ext => ({
				mapM: MonadG => TraversableF.traverse(MonadG),
				sequenceM: MonadG => TraversableF.sequenceA(MonadG),
				sequence: MonadG => Ext().sequenceM(MonadG),
			}))
		)
	);

	export let instantiate: <F extends URI1>() => <TTraversable extends Traversable1<F>>(_: TTraversable) => TTraversable & Ext<F> = (
		() => _ => assign(merge(Def(_), _))(_ => merge(_, Ext(_)))
	);
}

export default Traversable