import { Semigroup } from './Semigroup';
interface Monoid<A> extends Semigroup<A> {
    mempty: () => A;
}
export { Monoid };
export { Monoid as IMonoid };
export default Monoid;
