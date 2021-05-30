import { Eq } from './Eq';
import { IOrdering } from './IOrdering';
import { IBool } from './IBool';
export interface Ord<A> extends Eq<A> {
    readonly compare: (_: A) => (_: A) => IOrdering;
    readonly lt: (_: A) => (_: A) => IBool;
}
export declare type IOrd<A> = Ord<A>;
export declare namespace Ord {
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
export default Ord;
