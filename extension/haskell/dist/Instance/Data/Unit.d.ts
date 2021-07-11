import { Unit, HUnit as _HUnit, Constructor } from '../../DataStructure/Data/Unit';
import { IShow } from '../../Typeclass/Data/Show';
export * from '../../DataStructure/Data/Unit';
declare let Show: IShow<Unit>;
export { Show };
interface HUnit extends _HUnit {
    Show: typeof Show;
}
export { HUnit };
declare type _Unit = Unit;
declare let _Unit: Constructor & HUnit;
export { _Unit as Unit };
export default _Unit;
