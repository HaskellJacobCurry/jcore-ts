import {
	Construct,
	polymorph
} from '../../ts-toolbelt'

/**
 * class Semigroup f where
 *  append :: f -> f -> f
 */
interface Semigroup {
	append: <TSemigroup extends ISemigroup>(_: TSemigroup) => (_: TSemigroup) => TSemigroup
}
namespace Semigroup {
	export let append: Semigroup['append'] = semigroup0 => semigroup1 => polymorph(semigroup0.append(semigroup1));
}
export {Semigroup}

export interface ISemigroup {
	construct: CSemigroup<ISemigroup>;
	append(_: ISemigroup): ISemigroup;
}
export interface CSemigroup<TSemigroup extends ISemigroup = ISemigroup> extends Construct<TSemigroup> {}