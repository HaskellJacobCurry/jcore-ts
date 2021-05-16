import { IBool } from './IBool';
import { IShowable } from './IShowable';
import { String } from './String';
declare abstract class Bool implements IBool, IShowable {
    construct: typeof Bool._True;
    abstract cata: Bool.Cata;
    static True: () => Bool;
    static False: () => Bool;
    show: () => String;
    not: () => Bool;
    and: (bool: Bool) => Bool;
    or: (bool: Bool) => Bool;
}
declare namespace Bool {
    namespace Tag {
        let True: "True";
        let False: "False";
    }
    interface Cata {
        <T, U>(fs: {
            True: () => T;
            False: () => U;
        }): T | U;
    }
    class _True extends Bool {
        tag: "True";
        cata: Cata;
    }
    class _False extends Bool {
        tag: "False";
        cata: Cata;
    }
}
declare type _Bool = Bool;
declare let _Bool: typeof Bool & {
    Lift: (_: boolean) => Bool;
    not: (bool: Bool) => Bool;
    and: (bool0: Bool) => (bool1: Bool) => Bool;
    or: (bool0: Bool) => (bool1: Bool) => Bool;
};
export { _Bool as Bool };
export default _Bool;
