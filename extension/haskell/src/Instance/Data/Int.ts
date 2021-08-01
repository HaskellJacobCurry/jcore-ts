import {Int, HInt as _HInt, Constructor, URI} from '../../DataStructure/Data/Int'
import {String} from '../../DataStructure/Data/String'
import {Bool} from './Bool'
import {Ordering} from '../../DataStructure/Data/Ordering'
import {INum} from '../../Typeclass/GHC/Num'
import {ISemiring} from '../../Typeclass/Data/Semiring'
import {IRing} from '../../Typeclass/Data/Ring'
import {IEq} from '../../Typeclass/Data/Eq'
import {IOrd} from '../../Typeclass/Data/Ord'
import {IShow} from '../../Typeclass/Data/Show'
import {
	Json,
	define,
	create,
	merge,
} from '../../Common'

export * from '../../DataStructure/Data/Int'

let notEq: (_: Int) => (_: Int) => Bool = (
	_0 => _1 => Bool.fromI(Eq.notEq(_0)(_1))
);
export {notEq}

let compare: (_: Int) => (_: Int) => Ordering = (
	int0 => int1 => (
		lt(int0)(int1).cata({
			True: () => Ordering.LT,
			False: () => (
				lt(int1)(int0).cata({
					True: () => Ordering.GT,
					False: () => Ordering.EQ,
				})
			)
		})
	)
);
export {compare}

let lt: (_: Int) => (_: Int) => Bool = (
	int0 => int1 => Bool(int0.value < int1.value)
);
export {lt}

let notLt: (_: Int) => (_: Int) => Bool = (
	_0 => _1 => Bool.fromI(Ord.notLt(_0)(_1))
);
export {notLt}

let gt: (_: Int) => (_: Int) => Bool = (
	_0 => _1 => Bool.fromI(Ord.gt(_0)(_1))
);
export {gt}

let notGt: (_: Int) => (_: Int) => Bool = (
	_0 => _1 => Bool.fromI(Ord.notGt(_0)(_1))
);
export {notGt}

let show: (_: Int) => String = (
	int => String(`${int.value}`)
);
export {show}

let Num = INum.instantiate<Int>({
	add: Int.add,
	sub: Int.sub,
	mul: Int.mul,
	zero: Int.zero,
	one: Int.one,
	abs: Int.abs,
});
export {Num}

let Show = IShow.instantiate<Int>()(create<IShow<Int>>({
	show,
}));
export {Show}

let Semiring = ISemiring.instantiate<Int>()(create<ISemiring<Int>>({
	add: Int.add,
	zero: Int.zero,
	mul: Int.mul,
	one: Int.one,
}));
export {Semiring}

let Ring = IRing.instantiate<Int>()(merge(Semiring, create<IRing.Base<Int>>({
	sub: Int.sub,
	negate: Int.negate,
})));
export {Ring}

let Eq = IEq.instantiate<Int>()(create<IEq<Int>>({
	eq: Int.eq,
}));
export {Eq}

let Ord = IOrd.instantiate<Int>()(merge(Eq, create<IOrd.Base<Int>>({
	compare,
	lt,
})));
export {Ord}

interface HInt extends _HInt {
	Num: typeof Num;
	Show: typeof Show;
	Semiring: typeof Semiring;
	Ring: typeof Ring;
	Eq: typeof Eq;
	Ord: typeof Ord;
	notEq: (_: Int) => (_: Int) => Bool;
	compare: (_: Int) => (_: Int) => Ordering;
	lt: (_: Int) => (_: Int) => Bool;
	notLt: (_: Int) => (_: Int) => Bool;
	gt: (_: Int) => (_: Int) => Bool;
	notGt: (_: Int) => (_: Int) => Bool;
	show: (_: Int) => String;
}
export {HInt}

type _Int = Int;
let _Int: Constructor & HInt = (
	Json.assign(Int, {
		Num,
		Show,
		Semiring,
		Ring,
		Eq,
		Ord,
		notEq,
		compare,
		lt,
		notLt,
		gt,
		notGt,
		show,
	})
);

export {_Int as Int}
export default _Int