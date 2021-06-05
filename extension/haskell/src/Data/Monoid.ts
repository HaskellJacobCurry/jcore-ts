import {Semigroup} from './Semigroup'

export interface Monoid<A> extends Semigroup<A> {
	readonly mempty: () => A;
}
export {Monoid as IMonoid};
export default Monoid