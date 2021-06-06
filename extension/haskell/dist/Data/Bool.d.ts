import { IBool } from './IBool';
import { IShow } from './Show';
/** data Bool = True | False */
declare type Bool = IBool & (False | True);
export { Bool };
interface False {
    readonly tag: 'False';
}
declare let False: Bool;
export { False };
interface True {
    readonly tag: 'True';
}
declare let True: Bool;
export { True };
declare let and: (bool0: Bool) => (bool1: Bool) => Bool;
export { and };
declare let or: (bool0: Bool) => (bool1: Bool) => Bool;
export { or };
declare let not: (bool: Bool) => Bool;
export { not };
declare let Show: IShow<Bool>;
export { Show };
declare let Bool: ((value: boolean) => Bool) & {
    and: (bool0: Bool) => (bool1: Bool) => Bool;
    or: (bool0: Bool) => (bool1: Bool) => Bool;
    not: (bool: Bool) => Bool;
    False: Bool;
    True: Bool;
    Show: IShow<Bool>;
};
