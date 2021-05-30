export interface Semigroup<A> {
    readonly append: (_: A) => (_: A) => A;
}
export declare type ISemigroup<A> = Semigroup<A>;
export default Semigroup;
