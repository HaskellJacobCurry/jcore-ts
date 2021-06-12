import {Eq} from './Eq'
import {IOrdering} from './IOrdering'
import {IBool, Bool} from './IBool'
import {
	Function,
} from '../util/common'

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

interface Ord<A> extends Eq<A> {
	compare: (_: A) => (_: A) => IOrdering;
	lt: (_: A) => (_: A) => IBool;
}
namespace Ord {
	export interface Ext<A> {
		notLt: (_: A) => (_: A) => IBool;
		gt: (_: A) => (_: A) => IBool;
		notGt: (_: A) => (_: A) => IBool;
		min: (_: A) => (_: A) => A;
		max: (_: A) => (_: A) => A;
		clamp: (min: A) => (max: A) => (_: A) => A;
		between: (min: A) => (max: A) => (_: A) => IBool;
	}
	export let Ext = <A>(Ord: Ord<A>) => Function.define<Ext<A>>(Ext => ({
		notLt: ord0 => ord1 => Bool.not(Ord.lt(ord0)(ord1)),
		gt: ord0 => ord1 => Ord.lt(ord1)(ord0),
		notGt: ord0 => ord1 => Bool.not(Ext().gt(ord0)(ord1)),
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
	}));
}
export {Ord}
export {Ord as IOrd}
export default Ord