import { All, HAll as _HAll, Constructor } from './All_';
import { IShow } from '../Show';
/** Show All */
declare let Show: IShow<All>;
export { Show };
interface HAll extends _HAll {
    Show: typeof Show;
}
declare type _All = All;
declare let _All: Constructor & HAll;
export * from './All_';
export { _All as All };
export default _All;
