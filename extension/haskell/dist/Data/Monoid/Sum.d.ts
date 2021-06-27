import { Sum } from './Sum_';
import { IShow } from '../Show';
/** Show a => Show (Sum a) */
declare let Show: <A>(_: IShow<A>) => IShow<Sum<A>>;
export { Show };
declare let _Sum: (<A>(value: A) => Sum<A>) & {
    URI: "Sum";
    get: <A_1>(_: Sum<A_1>) => A_1;
    create: <A_2>(value: A_2) => Sum<A_2>;
    Semigroup: <A_3>(_: import("../../GHC/Num").Num<A_3>) => import("../Semigroup").Semigroup<Sum<A_3>>;
    Monoid: <A_4>(_: import("../../GHC/Num").Num<A_4>) => import("../Monoid").Monoid<Sum<A_4>> & import("../Monoid").Monoid.Ext<Sum<A_4>>;
} & {
    Show: <A_5>(_: IShow<A_5>) => IShow<Sum<A_5>>;
};
export * from './Sum_';
export { _Sum as Sum };
export default _Sum;
