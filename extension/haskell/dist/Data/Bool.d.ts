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
declare let fromI: (_: IBool) => Bool;
export { fromI };
declare let and: (_: Bool) => (_: Bool) => Bool;
export { and };
declare let or: (_: Bool) => (_: Bool) => Bool;
export { or };
declare let not: (_: Bool) => Bool;
export { not };
declare let Show: IShow<Bool>;
export { Show };
declare let Bool: ((value: boolean) => Bool) & {
    fromI: (_: IBool) => Bool;
    and: (_: Bool) => (_: Bool) => Bool;
    or: (_: Bool) => (_: Bool) => Bool;
    not: (_: Bool) => Bool;
    False: Bool;
    True: Bool;
    Show: IShow<Bool>;
};
