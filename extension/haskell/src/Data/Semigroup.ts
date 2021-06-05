export interface Semigroup<A> {
	readonly append: (_: A) => (_: A) => A;
}
export {Semigroup as ISemigroup};
export default Semigroup