import {IBool, Bool} from './IBool'
import {
	Construct,
	polymorph
} from '../../ts-toolbelt'

/**
 * class Eq f where
 *  eq :: f -> f -> Bool
 * notEq :: Eq f => f -> f -> Bool
 */
export interface Eq {
	eq: <TEq extends IEq>(_: TEq) => (_: TEq) => IBool;
	notEq: <TEq extends IEq>(_: TEq) => (_: TEq) => IBool;
}
export namespace Eq {
	export let eq: Eq['eq'] = eq0 => eq1 => eq0.eq(eq1);

	export let notEq: Eq['notEq'] = eq0 => eq1 => Bool.not(eq0.eq(eq1));
}

export interface IEq {
	construct: CEq<IEq>;
	eq(_: IEq): IBool;
}
export interface CEq<TEq extends IEq = IEq> extends Construct<TEq> {}