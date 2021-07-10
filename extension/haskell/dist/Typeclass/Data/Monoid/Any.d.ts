import { Any } from './Any_';
import { IShow } from '../Show';
/** Show Any */
declare let Show: IShow<Any>;
export { Show };
declare let _Any: ((value: import("../IBool").IBool) => Any) & {
    URI: "Any";
    get: (_: Any) => import("../IBool").IBool;
    create: (value: import("../IBool").IBool) => Any;
    Semigroup: import("../Semigroup").Semigroup<Any>;
    Monoid: import("../Monoid").Monoid<Any> & import("../Monoid").Monoid.Ext<Any>;
} & {
    Show: IShow<Any>;
};
export * from './Any_';
export { _Any as Any };
export default _Any;
