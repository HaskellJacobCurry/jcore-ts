export interface Semiring<A> {
	readonly add: (_: A) => (_: A) => A;
	readonly zero: () => A;
	readonly mul: (_: A) => (_: A) => A;
	readonly one: () => A;
}
export type ISemiring<A> = Semiring<A>;
export default Semiring