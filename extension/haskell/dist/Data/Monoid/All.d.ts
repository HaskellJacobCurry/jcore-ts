import { All } from './All_';
import { IShow } from '../Show';
/** Show All */
declare let Show: IShow<All>;
export { Show };
declare let _All: ((value: import("../IBool").IBool) => All) & {
    URI: "All";
    get: (_: All) => import("../IBool").IBool;
    create: (value: import("../IBool").IBool) => All;
    Semigroup: import("../Semigroup").Semigroup<All>;
    Monoid: import("../Monoid").Monoid<All> & import("../Monoid").Monoid.Ext<All>;
} & {
    Show: IShow<All>;
};
export * from './Any_';
export { _All };
export default _All;
