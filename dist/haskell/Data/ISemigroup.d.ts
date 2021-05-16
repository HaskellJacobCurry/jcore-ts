import { Construct } from '../../ts-toolbelt';
/**
 * class Semigroup f where
 *  append :: f -> f -> f
 */
interface Semigroup {
    append: <TSemigroup extends ISemigroup>(_: TSemigroup) => (_: TSemigroup) => TSemigroup;
}
declare namespace Semigroup {
    let append: Semigroup['append'];
}
export { Semigroup };
export interface ISemigroup {
    construct: CSemigroup<ISemigroup>;
    append(_: ISemigroup): ISemigroup;
}
export interface CSemigroup<TSemigroup extends ISemigroup = ISemigroup> extends Construct<TSemigroup> {
}
