import { Bool, HBool as _HBool, Constructor } from '../../DataStructure/Data/Bool';
import { IShow } from '../../Typeclass/Data/Show';
export * from '../../DataStructure/Data/Bool';
declare let Show: IShow<Bool>;
export { Show };
interface HBool extends _HBool {
    Show: typeof Show;
}
export { HBool };
declare type _Bool = Bool;
declare let _Bool: Constructor & HBool;
export { _Bool as Bool };
export default _Bool;
