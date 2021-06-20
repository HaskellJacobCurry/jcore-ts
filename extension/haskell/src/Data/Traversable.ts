import {HKT, URI1, URI2, Kind1, Kind2} from '../util/HKT'
import {Functor} from './Functor'
import {Foldable} from './Foldable'
import {Applicative} from '../Control/Applicative'
import {
	Json,
	define,
	assign,
	id,
} from '../util/common'

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
			define<Ext<F>>(Ext => ({}))
		)
	);

	export let enhance = <F>(_: Traversable<F>) => (
		assign(Json.assign(Def(_), _))((_: Traversable<F>) => Json.assign(_, Ext(_)))
	);
}

export default Traversable