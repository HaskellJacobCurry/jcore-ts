import {Ordering, HOrdering as _HOrdering} from '../../DataStructure/Data/Ordering'
import {String} from '../../DataStructure/Data/String'
import {Bool} from './Bool'
import {IEq} from '../../Typeclass/Data/Eq'
import {IOrd} from '../../Typeclass/Data/Ord'
import {IShow} from '../../Typeclass/Data/Show'
import {
	merge,
	define,
	create
} from '../../Common'

export * from '../../DataStructure/Data/Ordering'

let show: (_: Ordering) => String = (
	ordering => String(ordering.tag)
);
export {show}

let eq: (_: Ordering) => (_: Ordering) => Bool = (
	ordering0 => ordering1 => Bool(ordering0.tag === ordering1.tag)
);
export {eq}

let notEq: (_: Ordering) => (_: Ordering) => Bool = (
	_0 => _1 => Bool.fromI(Eq.notEq(_0)(_1))
);
export {notEq}

let compare: (_: Ordering) => (_: Ordering) => Ordering = (
	ordering0 => ordering1 => (
		ordering0.cata({
			LT: () => (
				ordering1.cata({
					LT: () => Ordering.EQ,
					EQ: () => Ordering.LT,
					GT: () => Ordering.LT,
				})
			),
			EQ: () => (
				ordering1.cata({
					LT: () => Ordering.GT,
					EQ: () => Ordering.EQ,
					GT: () => Ordering.LT,
				})
			),
			GT: () => (
				ordering1.cata({
					LT: () => Ordering.GT,
					EQ: () => Ordering.GT,
					GT: () => Ordering.EQ,
				})
			)
		})
	)
);
export {compare}

let lt: (_: Ordering) => (_: Ordering) => Bool = (
	ordering0 => ordering1 => (
		compare(ordering0)(ordering1).cata({
			LT: () => Bool.True,
			EQ: () => Bool.False,
			GT: () => Bool.False,
		})
	)
);
export {lt}

let Show = IShow.instantiate<Ordering>()(
	create<IShow<Ordering>>({
		show: ordering => String(ordering.tag),
	})
);
export {Show}

let Eq = IEq.instantiate<Ordering>()(
	create<IEq<Ordering>>({
		eq,
	})
);
export {Eq}

let Ord = IOrd.instantiate<Ordering>()(
	merge(Eq, create<IOrd.Base<Ordering>>({
		compare,
		lt,
	}))
);
export {Ord}

interface HOrdering extends _HOrdering {
	Show: typeof Show;
	Eq: typeof Eq;
	Ord: typeof Ord;
	show: (_: Ordering) => String;
	eq: (_: Ordering) => (_: Ordering) => Bool;
	notEq: (_: Ordering) => (_: Ordering) => Bool;
	compare: (_: Ordering) => (_: Ordering) => Ordering;
	lt: (_: Ordering) => (_: Ordering) => Bool;
}
export {HOrdering}

type _Ordering = Ordering;
let _Ordering: HOrdering = (
	merge(Ordering, {
		Show,
		Eq,
		Ord,
		show,
		eq,
		notEq,
		compare,
		lt,
	})
);

export {_Ordering as Ordering}
export default _Ordering