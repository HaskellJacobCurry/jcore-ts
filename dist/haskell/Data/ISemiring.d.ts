import { Construct } from '../../ts-toolbelt';
/**
 * class Semiring f where
 *  add :: f -> f -> f
 *  zero :: Unit -> f
 *  mul :: f -> f -> f
 *  one :: Unit -> f
 */
interface Semiring {
    add: <TSemiring extends ISemiring>(_: TSemiring) => (_: TSemiring) => TSemiring;
    zero: <TSemiring extends ISemiring>(_: CSemiring<TSemiring>) => () => TSemiring;
    mul: <TSemiring extends ISemiring>(_: TSemiring) => (_: TSemiring) => TSemiring;
    one: <TSemiring extends ISemiring>(_: CSemiring<TSemiring>) => () => TSemiring;
}
declare namespace Semiring {
    let add: Semiring['add'];
    let zero: Semiring['zero'];
    let mul: Semiring['mul'];
    let one: Semiring['one'];
}
export { Semiring };
export interface ISemiring {
    construct: CSemiring<ISemiring>;
    add(_: ISemiring): ISemiring;
    mul(_: ISemiring): ISemiring;
}
export interface CSemiring<TSemiring extends ISemiring = ISemiring> extends Construct<TSemiring> {
    zero: () => TSemiring;
    one: () => TSemiring;
}
