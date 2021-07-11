import { IBool } from '../../Typeclass/Data/IBool';
/** data Bool = True | False */
declare type Bool = IBool & (False | True);
export { Bool };
interface False {
    tag: 'False';
}
declare let False: Bool;
export { False };
interface True {
    tag: 'True';
}
declare let True: Bool;
export { True };
declare let fromI: (_: IBool) => Bool;
export { fromI };
declare let createBool: (value: boolean) => Bool;
export { createBool as create };
declare let and: (_: Bool) => (_: Bool) => Bool;
export { and };
declare let or: (_: Bool) => (_: Bool) => Bool;
export { or };
declare let not: (_: Bool) => Bool;
export { not };
declare type Constructor = typeof createBool;
export { Constructor };
interface HBool {
    fromI: (_: IBool) => Bool;
    False: Bool;
    True: Bool;
    and: (_: Bool) => (_: Bool) => Bool;
    or: (_: Bool) => (_: Bool) => Bool;
    not: (_: Bool) => Bool;
}
export { HBool };
declare let Bool: Constructor & HBool;
export default Bool;
