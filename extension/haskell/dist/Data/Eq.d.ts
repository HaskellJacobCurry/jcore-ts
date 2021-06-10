import { IBool } from './IBool';
/**
 * class Eq f where
 *  eq :: f -> f -> Bool
 * notEq :: Eq f => f -> f -> Bool
 */
interface Eq<A> {
    eq: (_: A) => (_: A) => IBool;
}
declare namespace Eq {
    interface Ext<A> {
        notEq: (_: A) => (_: A) => IBool;
    }
    let Ext: <A>(Eq: Eq<A>) => Ext<A>;
}
export { Eq };
export { Eq as IEq };
export default Eq;
