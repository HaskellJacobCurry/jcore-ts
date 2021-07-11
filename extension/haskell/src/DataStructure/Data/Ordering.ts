import {IOrdering} from '../../Typeclass/Data/IOrdering'
import {IEq} from '../../Typeclass/Data/Eq'
import {IOrd} from '../../Typeclass/Data/Ord'
import {IShow} from '../../Typeclass/Data/Show'
import {String} from './String'
import {Bool} from '../../Instance/Data/Bool'
import {
	Json,
	define,
} from '../../Common/common'

type Ordering = IOrdering & (LT | EQ | GT);
export {Ordering}

interface LT {
	readonly tag: 'LT';
}
let LT: Ordering = Json.assign(
	<LT>{tag: 'LT'}, <IOrdering>{
		cata: fs => fs['LT'](),
	}
);
export {LT}

interface EQ {
	readonly tag: 'EQ';
}
let EQ: Ordering = Json.assign(
	<EQ>{tag: 'EQ'}, <IOrdering>{
		cata: fs => fs['EQ'](),
	}
);
export {EQ}

interface GT {
	readonly tag: 'GT';
}
let GT: Ordering = Json.assign(
	<GT>{tag: 'GT'}, <IOrdering>{
		cata: fs => fs['GT'](),
	}
);
export {GT}

let fromI: (_: IOrdering) => Ordering = (
	ordering => (
		ordering.cata({
			LT: () => LT,
			EQ: () => EQ,
			GT: () => GT,
		})
	)
);
export {fromI}

let invert: (_: Ordering) => Ordering = (
	ordering => (
		ordering.cata({
			LT: () => GT,
			EQ: () => EQ,
			GT: () => LT,
		})
	)
);
export {invert}

interface HOrdering {
	LT: Ordering;
	EQ: Ordering;
	GT: Ordering;
	fromI: (_: IOrdering) => Ordering;
	invert: (_: Ordering) => Ordering;
}
export {HOrdering}

let Ordering: HOrdering = {
	LT,
	EQ,
	GT,
	fromI,
	invert,
};
export default Ordering