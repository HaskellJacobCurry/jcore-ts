import {IEq, CEq} from './IEq'
import {IOrdering} from './IOrdering'
import {IBool, Bool} from './IBool'
import {IRing, Ring} from './IRing'
import { polymorph } from '../../ts-toolbelt';

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
export interface Ord {
	compare: <TOrd extends IOrd>(_: TOrd) => (_: TOrd) => IOrdering;
	lt: <TOrd extends IOrd>(_: TOrd) => (_: TOrd) => IBool;
	notLt: <TOrd extends IOrd>(_: TOrd) => (_: TOrd) => IBool;
	gt: <TOrd extends IOrd>(_: TOrd) => (_: TOrd) => IBool;
	notGt: <TOrd extends IOrd>(_: TOrd) => (_: TOrd) => IBool;
	min: <TOrd extends IOrd>(_: TOrd) => (_: TOrd) => TOrd;
	max: <TOrd extends IOrd>(_: TOrd) => (_: TOrd) => TOrd;
	clamp: <TOrd extends IOrd>(min: TOrd) => (max: TOrd) => (_: TOrd) => TOrd;
	between: <TOrd extends IOrd>(min: TOrd) => (max: TOrd) => (_: TOrd) => IBool;
	abs: <TOrd extends IOrd & IRing>(_: TOrd) => TOrd;
}
export namespace Ord {
	export let compare: Ord['compare'] = ord0 => ord1 => ord0.compare(ord1);

	export let lt: Ord['lt'] = ord0 => ord1 => ord0.lt(ord1);

	export let notLt: Ord['notLt'] = ord0 => ord1 => Bool.not(ord0.lt(ord1));

	export let gt: Ord['gt'] = ord0 => ord1 => ord1.lt(ord0);

	export let notGt: Ord['notGt'] = ord0 => ord1 => Bool.not(ord1.lt(ord0));

	export let min: Ord['min'] = ord0 => ord1 => (
		lt(ord0)(ord1).cata({
			True: () => ord0,
			False: () => ord1,
		})
	);

	export let max: Ord['max'] = ord0 => ord1 => (
		gt(ord0)(ord1).cata({
			True: () => ord0,
			False: () => ord1,
		})
	);

	export let clamp: Ord['clamp'] = min => max => ord => (
		ord.lt(min).cata({
			True: () => min,
			False: () => (
				max.lt(ord).cata({
					True: () => max,
					False: () => ord,
				})
			),
		})
	);

	export let between: Ord['between'] = min => max => ord => (
		clamp(min)(max)(ord).eq(ord)
	);

	export let abs: Ord['abs'] = ord => (
		ord.lt(<typeof ord>ord.construct.zero()).cata({
			True: () => Ring.negate(ord),
			False: () => ord,
		})
	);
}

export interface IOrd extends IEq {
	construct: COrd<IOrd>;
	compare(_: IOrd): IOrdering;
	lt(_: IOrd): IBool;
}
export interface COrd<TOrd extends IOrd = IOrd> extends CEq<TOrd> {}