import { Sum, HSum as _HSum, Constructor } from './Sum_';
import { IShow } from '../Show';
import { String } from '../../../Instance/Data/String';
declare let show: <A>(_: IShow<A>) => (sumA: Sum<A>) => String;
export { show };
/** Show a => Show (Sum a) */
declare let Show: <A>(_: IShow<A>) => IShow<Sum<A>>;
export { Show };
interface HSum extends _HSum {
    Show: typeof Show;
    show: <A>(_: IShow<A>) => (sumA: Sum<A>) => String;
}
export { HSum };
declare type _Sum<A> = Sum<A>;
declare let _Sum: Constructor & HSum;
export * from './Sum_';
export { _Sum as Sum };
export default _Sum;
