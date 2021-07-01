import { IBool } from './IBool';
/**
 * class Eq f where
 *  eq :: f -> f -> Bool
 * notEq :: Eq f => f -> f -> Bool
 */
interface IEq<A> {
    eq: (_: A) => (_: A) => IBool;
}
interface IExtEq<A> {
    notEq: (_: A) => (_: A) => IBool;
}
interface Eq<A> extends IEq<A> {
}
export { Eq };
export { Eq as IEq };
declare namespace Eq {
    interface Ext<A> extends IExtEq<A> {
    }
    let Ext: <A>(Eq: Eq<A>) => Ext<A>;
    let instantiate: <A>(_: Eq<A>) => Eq<A> & Ext<A>;
}
export default Eq;
