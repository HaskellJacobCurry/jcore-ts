import { IBool } from './IBool';
/**
 * class Eq f where
 *  eq :: f -> f -> Bool
 * notEq :: Eq f => f -> f -> Bool
 */
export interface Eq {
    eq: <TEq extends IEq>(_: TEq) => (_: TEq) => IBool;
    notEq: <TEq extends IEq>(_: TEq) => (_: TEq) => IBool;
}
export declare namespace Eq {
    let eq: Eq['eq'];
    let notEq: Eq['notEq'];
}
export interface IEq {
    eq(_: IEq): IBool;
}
