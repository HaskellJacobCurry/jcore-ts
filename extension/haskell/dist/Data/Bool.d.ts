import { IBool } from './IBool';
import { IShow } from './Show';
export interface False {
    readonly tag: 'False';
}
export interface True {
    readonly tag: 'True';
}
export declare let False: Bool;
export declare let True: Bool;
export declare let and: (bool0: Bool) => (bool1: Bool) => Bool;
export declare let or: (bool0: Bool) => (bool1: Bool) => Bool;
export declare let not: (bool: Bool) => Bool;
export declare let Show: IShow<Bool>;
export declare type Bool = IBool & (False | True);
export declare let Bool: ((value: boolean) => Bool) & {
    and: (bool0: Bool) => (bool1: Bool) => Bool;
    or: (bool0: Bool) => (bool1: Bool) => Bool;
    not: (bool: Bool) => Bool;
    False: Bool;
    True: Bool;
    Show: IShow<Bool>;
};
