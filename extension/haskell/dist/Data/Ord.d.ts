import { Eq } from './Eq';
import { IOrdering } from './IOrdering';
import { IBool } from './IBool';
interface Ord<A> extends Eq<A> {
    readonly compare: (_: A) => (_: A) => IOrdering;
    readonly lt: (_: A) => (_: A) => IBool;
}
declare namespace Ord {
    interface Ext<A> {
        readonly notLt: (_: A) => (_: A) => IBool;
        readonly gt: (_: A) => (_: A) => IBool;
        readonly notGt: (_: A) => (_: A) => IBool;
        readonly min: (_: A) => (_: A) => A;
        readonly max: (_: A) => (_: A) => A;
        readonly clamp: (min: A) => (max: A) => (_: A) => A;
        readonly between: (min: A) => (max: A) => (_: A) => IBool;
    }
    let Ext: <A>(Ord: Ord<A>) => Ext<A>;
}
export { Ord };
export { Ord as IOrd };
export default Ord;
