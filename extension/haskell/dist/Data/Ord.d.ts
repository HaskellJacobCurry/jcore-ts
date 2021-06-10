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
interface Ord<A> extends Eq<A> {
    compare: (_: A) => (_: A) => IOrdering;
    lt: (_: A) => (_: A) => IBool;
}
declare namespace Ord {
    interface Ext<A> {
        notLt: (_: A) => (_: A) => IBool;
        gt: (_: A) => (_: A) => IBool;
        notGt: (_: A) => (_: A) => IBool;
        min: (_: A) => (_: A) => A;
        max: (_: A) => (_: A) => A;
        clamp: (min: A) => (max: A) => (_: A) => A;
        between: (min: A) => (max: A) => (_: A) => IBool;
    }
    let Ext: <A>(Ord: Ord<A>) => Ext<A>;
}
export { Ord };
export { Ord as IOrd };
export default Ord;
