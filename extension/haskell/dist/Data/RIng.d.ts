import { Semiring } from './Semiring';
export interface Ring<A> extends Semiring<A> {
    readonly sub: (_: A) => (_: A) => A;
    readonly negate: (_: A) => A;
}
export { Ring as IRing };
