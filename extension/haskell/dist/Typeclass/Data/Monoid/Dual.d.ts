import { Dual } from './Dual_';
import { IShow } from '../Show';
/** Show a => Show (Dual a) */
declare let Show: <A>(_: IShow<A>) => IShow<Dual<A>>;
export { Show };
declare let _Dual: (<A>(value: A) => Dual<A>) & {
    URI: "Dual";
    get: <A_1>(_: Dual<A_1>) => A_1;
    create: <A>(value: A) => Dual<A>;
    Semigroup: <A_2>(_: import("../Semigroup").Semigroup<A_2>) => import("../Semigroup").Semigroup<Dual<A_2>>;
    Monoid: <A_3>(_: import("../Monoid").Monoid<A_3>) => import("../Monoid").Monoid<Dual<A_3>> & import("../Monoid").Monoid.Ext<Dual<A_3>>;
} & {
    Show: <A_4>(_: IShow<A_4>) => IShow<Dual<A_4>>;
};
export * from './Dual_';
export { _Dual as Dual };
export default _Dual;
