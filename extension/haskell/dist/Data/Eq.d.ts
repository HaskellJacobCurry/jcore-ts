import { IBool } from './IBool';
interface Eq<A> {
    readonly eq: (_: A) => (_: A) => IBool;
}
declare namespace Eq {
    interface Ext<A> {
        readonly notEq: (_: A) => (_: A) => IBool;
    }
    let Ext: <A>(Eq: Eq<A>) => Ext<A>;
}
export { Eq };
export { Eq as IEq };
export default Eq;
