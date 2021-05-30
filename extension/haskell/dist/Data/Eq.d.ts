import { IBool } from './IBool';
export interface Eq<A> {
    readonly eq: (_: A) => (_: A) => IBool;
}
export declare type IEq<A> = Eq<A>;
export declare namespace Eq {
    interface Ext<A> {
        readonly notEq: (_: A) => (_: A) => IBool;
    }
    let Ext: <A>(Eq: Eq<A>) => Ext<A>;
}
export default Eq;
