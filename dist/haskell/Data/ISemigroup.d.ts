/**
 * class Semigroup f where
 *  append :: f -> f -> f
 */
export interface Semigroup {
    append: <TSemigroup extends ISemigroup>(_: TSemigroup) => (_: TSemigroup) => TSemigroup;
}
export declare namespace Semigroup {
    let append: Semigroup['append'];
}
export interface ISemigroup {
    append(_: ISemigroup): ISemigroup;
}
