import {
	polymorph
} from '../../ts-toolbelt'

/**
 * class Semigroup f where
 *  append :: f -> f -> f
 */
export interface Semigroup {
	append: <TSemigroup extends ISemigroup>(_: TSemigroup) => (_: TSemigroup) => TSemigroup
}
export namespace Semigroup {
	export let append: Semigroup['append'] = semigroup0 => semigroup1 => polymorph(semigroup0.append(semigroup1));
}

export interface ISemigroup {
	append(_: ISemigroup): ISemigroup;
}