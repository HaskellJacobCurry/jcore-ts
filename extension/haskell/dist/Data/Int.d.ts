import { ISemiring } from './Semiring';
import { IRing } from './Ring';
import { IEq } from './Eq';
import { IOrd } from './Ord';
import { IShow } from './Show';
import { Bool } from './Bool';
interface IInt {
    inc: (_: Int) => Int;
    dec: (_: Int) => Int;
    even: (_: Int) => Bool;
    odd: (_: Int) => Bool;
}
export declare let inc: IInt['inc'];
export declare let dec: IInt['dec'];
export declare let even: IInt['even'];
export declare let odd: IInt['odd'];
export declare let Show: IShow<Int>;
export declare let Semiring: ISemiring<Int>;
export declare let Ring: IRing<Int>;
export declare let Eq: IEq<Int> & IEq.Ext<Int>;
export declare let Ord: IOrd<Int> & IOrd.Ext<Int>;
export interface Int {
    value: number;
}
export declare let Int: ((value: number) => Int) & {
    inc: (_: Int) => Int;
    dec: (_: Int) => Int;
    even: (_: Int) => Bool;
    odd: (_: Int) => Bool;
    Show: IShow<Int>;
    Semiring: ISemiring<Int>;
    Ring: IRing<Int>;
    Eq: IEq<Int> & IEq.Ext<Int>;
    Ord: IOrd<Int> & IOrd.Ext<Int>;
};
export {};
