import {ISemigroup, CSemigroup} from './ISemigroup';
import {
	Construct,
	polymorph
} from '../../dependency/jcore/dist/ts-toolbelt'

/**
 * class Monoid f where
 *  mempty :: Unit -> f
 */
interface Monoid {
	mempty: <TMonoid extends IMonoid>(_: CMonoid<TMonoid>) => () => TMonoid;
}
namespace Monoid {
	export let mempty: Monoid['mempty'] = construct => () => construct.mempty();
}
export {Monoid}

export interface IMonoid extends ISemigroup {
	construct: CMonoid<IMonoid>;
}

export interface CMonoid<TMonoid extends IMonoid = IMonoid> extends CSemigroup<TMonoid> {
	mempty: () => TMonoid;
}