import {Semigroup} from './Semigroup'

export interface Monoid<A> extends Semigroup<A> {
	readonly mempty: () => A;
}
export type IMonoid<A> = Monoid<A>;
export default Monoid