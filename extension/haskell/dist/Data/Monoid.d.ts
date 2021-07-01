import { Semigroup } from './Semigroup';
interface IMonoid<A> {
    mempty: () => A;
}
interface IExtMonoid<A> {
    mappend: (_: A) => (_: A) => A;
}
interface Monoid<A> extends IMonoid<A>, Semigroup<A> {
}
export { Monoid };
export { Monoid as IMonoid };
declare namespace Monoid {
    interface Ext<A> extends IExtMonoid<A> {
    }
    let Ext: <A>(_: Monoid<A>) => Ext<A>;
    let instantiate: <A>(_: Monoid<A>) => Monoid<A> & Ext<A>;
}
export default Monoid;
