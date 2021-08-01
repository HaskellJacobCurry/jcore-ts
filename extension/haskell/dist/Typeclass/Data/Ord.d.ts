import { Eq } from './Eq';
import { IOrdering } from './IOrdering';
import { IBool } from './IBool';
/**
 * class (Eq f) <= Ord f where
 *  compare :: f -> f -> Ordering
 * lt :: f -> f -> Bool
 * notLt :: f -> f -> Bool
 * gt :: f -> f -> Bool
 * notGt :: f -> f -> Bool
 * min :: f -> f -> f
 * max :: f -> f -> f
 * clamp :: f -> f -> f -> f
 * between :: f -> f -> f -> Bool
 * abs :: Ring f => f -> f
 */
interface IOrd<A> {
    compare: (_: A) => (_: A) => IOrdering;
    lt: (_: A) => (_: A) => IBool;
}
interface IExtOrd<A> {
    notLt: (_: A) => (_: A) => IBool;
    gt: (_: A) => (_: A) => IBool;
    notGt: (_: A) => (_: A) => IBool;
    min: (_: A) => (_: A) => A;
    max: (_: A) => (_: A) => A;
    clamp: (min: A) => (max: A) => (_: A) => A;
    between: (min: A) => (max: A) => (_: A) => IBool;
}
interface Ord<A> extends IOrd<A>, Eq<A> {
}
declare namespace Ord {
    interface Base<A> extends IOrd<A> {
    }
    interface Ext<A> extends IExtOrd<A> {
    }
    let Ext: <A>(_: Ord<A>) => Ext<A>;
    let instantiate: <A>() => <TOrd extends Ord<A>>(_: TOrd) => TOrd & Ext<A>;
}
export { Ord };
export { Ord as IOrd };
export default Ord;
