import { ISemigroup, CSemigroup } from './ISemigroup';
/**
 * class Monoid f where
 *  mempty :: Unit -> f
 */
interface Monoid {
    mempty: <TMonoid extends IMonoid>(_: CMonoid<TMonoid>) => () => TMonoid;
}
declare namespace Monoid {
    let mempty: Monoid['mempty'];
}
export { Monoid };
export interface IMonoid extends ISemigroup {
    construct: CMonoid<IMonoid>;
}
export interface CMonoid<TMonoid extends IMonoid = IMonoid> extends CSemigroup<TMonoid> {
    mempty: () => TMonoid;
}
