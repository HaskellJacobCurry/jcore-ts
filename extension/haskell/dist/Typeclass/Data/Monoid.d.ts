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
    interface Base<A> extends IMonoid<A> {
    }
    interface Ext<A> extends IExtMonoid<A> {
    }
    let Ext: <A>(_: Monoid<A>) => Ext<A>;
    let instantiate: <A>() => <TMonoid extends Monoid<A>>(_: TMonoid) => TMonoid & Ext<A>;
}
export default Monoid;
