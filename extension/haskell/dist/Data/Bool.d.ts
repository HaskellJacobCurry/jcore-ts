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
export declare let Show: IShow<Bool>;
export declare type Bool = IBool & (False | True);
export declare let Bool: ((value: boolean) => Bool) & {
    False: Bool;
    True: Bool;
    Show: IShow<Bool>;
};
