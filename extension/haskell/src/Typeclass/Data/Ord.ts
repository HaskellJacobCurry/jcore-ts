import {Eq} from './Eq'
import {IOrdering} from './IOrdering'
import {IBool} from './IBool'
import {
	merge,
	assign,
	define,
} from '../../Common/common'

/**
 * class (Eq f) <= Ord f where
 *  compare :: f -> f -> Ordering
 * lt :: f -> f -> Bool
 * notLt :: f -> f -> Bool
 * gt :: f -> f -> Bool
 * notGt :: f -> f -> Bool
 * min :: f -> f -> f
 * max :: f -> f -> f
 * clamp :: f -> f -> f -> f
 * between :: f -> f -> f -> Bool
 * abs :: Ring f => f -> f
 */
interface IOrd<A> {
	compare: (_: A) => (_: A) => IOrdering;
	lt: (_: A) => (_: A) => IBool;
}
interface IExtOrd<A> {
	notLt: (_: A) => (_: A) => IBool;
	gt: (_: A) => (_: A) => IBool;
	notGt: (_: A) => (_: A) => IBool;
	min: (_: A) => (_: A) => A;
	max: (_: A) => (_: A) => A;
	clamp: (min: A) => (max: A) => (_: A) => A;
	between: (min: A) => (max: A) => (_: A) => IBool;
}
interface Ord<A> extends IOrd<A>, Eq<A> {}
namespace Ord {
	export interface Base<A> extends IOrd<A> {}

	export interface Ext<A> extends IExtOrd<A> {}
	export let Ext: <A>(_: Ord<A>) => Ext<A> = (
		<A>(Ord: Ord<A>) => (
			define<Ext<A>>(Ext => ({
				notLt: ord0 => ord1 => IBool.not(Ord.lt(ord0)(ord1)),
				gt: ord0 => ord1 => Ord.lt(ord1)(ord0),
				notGt: ord0 => ord1 => IBool.not(Ext().gt(ord0)(ord1)),
				min: ord0 => ord1 => (
					Ord.lt(ord0)(ord1).cata({
						True: () => ord0,
						False: () => ord1,
					})
				),
				max: ord0 => ord1 => (
					Ord.lt(ord0)(ord1).cata({
						True: () => ord1,
						False: () => ord0,
					})
				),
				clamp: min => max => ord => (
					Ord.lt(ord)(min).cata({
						True: () => min,
						False: () => (
							Ord.lt(max)(ord).cata({
								True: () => max,
								False: () => ord,
							})
						),
					})
				),
				between: min => max => ord => Ord.eq(Ext().clamp(min)(max)(ord))(ord),
			}))
		)
	);

	export let instantiate: <A>() => <TOrd extends Ord<A>>(_: TOrd) => TOrd & Ext<A> = (
		() => _ => assign(_)(_ => merge(_, Ext(_)))
	);
}
export {Ord}
export {Ord as IOrd}
export default Ord