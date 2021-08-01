import { Semiring } from './Semiring';
/**
 * class (Semiring f) <= Ring f where
 *  sub :: f -> f -> f
 * negate :: Ring f => f -> f
 */
interface IRing<A> {
    sub: (_: A) => (_: A) => A;
    negate: (_: A) => A;
}
interface Ring<A> extends IRing<A>, Semiring<A> {
}
export { Ring };
export { Ring as IRing };
declare namespace Ring {
    interface Base<A> extends IRing<A> {
    }
    let instantiate: <A>() => <TRing extends Ring<A>>(_: TRing) => TRing;
}
export default Ring;
