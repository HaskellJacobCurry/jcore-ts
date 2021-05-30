import {ISemiring, CSemiring} from './ISemiring'
import {
	Construct,
	polymorph
} from '../../dependency/jcore/dist/ts-toolbelt'

/**
 * class (Semiring f) <= Ring f where
 *  sub :: f -> f -> f
 * negate :: Ring f => f -> f
 */
export interface Ring {
	sub: <TRing extends IRing>(_: TRing) => (_: TRing) => TRing;
	negate: <TRing extends IRing>(_: TRing) => TRing;
}
export namespace Ring {
	export let sub: Ring['sub'] = ring0 => ring1 => polymorph(ring0.sub(ring1));

	export let negate: Ring['negate'] = ring => polymorph(ring.construct.zero().sub(ring));
}

export interface IRing extends ISemiring {
	construct: CRing<IRing>;
	sub(_: IRing): IRing;
}
export interface CRing<TRing extends IRing = IRing> extends CSemiring<TRing> {}