import { IInt } from './IInt';
import { IShowable } from './IShowable';
import { IRing } from './IRing';
import { IOrd } from './IOrd';
import { String } from './String';
import { Ordering } from './Ordering';
import { Bool } from './Bool';
declare class Int implements IInt, IShowable, IRing, IOrd {
    construct: typeof Int;
    _: number;
    inc: () => Int;
    dec: () => Int;
    isEven: () => Bool;
    isOdd: () => Bool;
    show: () => String;
    static Lift: (_: number) => Int;
    static zero: () => Int;
    static one: () => Int;
    add: (int: Int) => Int;
    mul: (int: Int) => Int;
    sub: (int: Int) => Int;
    eq: (int: Int) => Bool;
    compare: (int: Int) => Ordering;
    lt: (int: Int) => Bool;
}
declare type Int_ = Int;
declare let Int_: typeof Int;
export { Int_ as Int };
export default Int_;
