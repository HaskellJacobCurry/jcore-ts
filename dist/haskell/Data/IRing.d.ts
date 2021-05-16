import { ISemiring, CSemiring } from './ISemiring';
/**
 * class (Semiring f) <= Ring f where
 *  sub :: f -> f -> f
 * negate :: Ring f => f -> f
 */
export interface Ring {
    sub: <TRing extends IRing>(_: TRing) => (_: TRing) => TRing;
    negate: <TRing extends IRing>(_: TRing) => TRing;
}
export declare namespace Ring {
    let sub: Ring['sub'];
    let negate: Ring['negate'];
}
export interface IRing extends ISemiring {
    construct: CRing<IRing>;
    sub(_: IRing): IRing;
}
export interface CRing<TRing extends IRing = IRing> extends CSemiring<TRing> {
}
