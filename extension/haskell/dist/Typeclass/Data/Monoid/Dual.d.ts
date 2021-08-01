import { Dual, HDual as _HDual, Constructor } from './Dual_';
import { IShow } from '../Show';
import { String } from '../../../Instance/Data/String';
declare let show: <A>(_: IShow<A>) => (dualA: Dual<A>) => String;
export { show };
/** Show a => Show (Dual a) */
declare let Show: <A>(_: IShow<A>) => IShow<Dual<A>>;
export { Show };
interface HDual extends _HDual {
    Show: typeof Show;
    show: <A>(_: IShow<A>) => (dualA: Dual<A>) => String;
}
declare type _Dual<A> = Dual<A>;
declare let _Dual: Constructor & HDual;
export * from './Dual_';
export { _Dual as Dual };
export default _Dual;
