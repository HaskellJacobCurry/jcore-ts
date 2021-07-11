import { Dual, HDual as _HDual, Constructor } from './Dual_';
import { IShow } from '../Show';
/** Show a => Show (Dual a) */
declare let Show: <A>(_: IShow<A>) => IShow<Dual<A>>;
export { Show };
interface HDual extends _HDual {
    Show: typeof Show;
}
declare type _Dual<A> = Dual<A>;
declare let _Dual: Constructor & HDual;
export * from './Dual_';
export { _Dual as Dual };
export default _Dual;
