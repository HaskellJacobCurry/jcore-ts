import {IOrdering} from '../../Typeclass/Data/IOrdering'
import {Eq as IEq} from '../../Typeclass/Data/Eq'
import {Ord as IOrd} from '../../Typeclass/Data/Ord'
import {IShow} from '../../Typeclass/Data/Show'
import {String} from './String'
import {Bool} from './Bool'
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

let eq: (_: Ordering) => (_: Ordering) => Bool = (
	ordering0 => ordering1 => Bool(ordering0.tag === ordering1.tag)
);
export {eq}

let notEq: (_: Ordering) => (_: Ordering) => Bool = (
	_0 => _1 => Bool.fromI(Eq.notEq(_0)(_1))
);
export {notEq}

let Show = IShow.instantiate<Ordering>({
	show: ordering => String(ordering.tag),
});
export {Show}

let Eq = IEq.instantiate<Ordering>({
	eq,
});
export {Eq}

let Ord = IOrd.instantiate<Ordering>(
	define<IOrd<Ordering>>(Ord => ({
		...Eq,
		compare: ordering0 => ordering1 => (
			ordering0.cata({
				LT: () => (
					ordering1.cata({
						LT: () => EQ,
						EQ: () => LT,
						GT: () => LT,
					})
				),
				EQ: () => (
					ordering1.cata({
						LT: () => GT,
						EQ: () => EQ,
						GT: () => LT,
					})
				),
				GT: () => (
					ordering1.cata({
						LT: () => GT,
						EQ: () => GT,
						GT: () => EQ,
					})
				)
			})
		),
		lt: ordering0 => ordering1 => (
			Ord().compare(ordering0)(ordering1).cata({
				LT: () => Bool.True,
				EQ: () => Bool.False,
				GT: () => Bool.False,
			})
		),
	}))
);
export {Ord}

let Ordering = {
	LT,
	EQ,
	GT,
	fromI,
	invert,
	eq,
	notEq,
	Show,
	Eq,
	Ord,
};