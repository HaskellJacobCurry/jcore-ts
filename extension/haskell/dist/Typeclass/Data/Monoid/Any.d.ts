import { Any, HAny as _HAny, Constructor } from './Any_';
import { IShow } from '../Show';
/** Show Any */
declare let Show: IShow<Any>;
export { Show };
interface HAny extends _HAny {
    Show: typeof Show;
}
declare type _Any = Any;
declare let _Any: Constructor & HAny;
export * from './Any_';
export { _Any as Any };
export default _Any;
