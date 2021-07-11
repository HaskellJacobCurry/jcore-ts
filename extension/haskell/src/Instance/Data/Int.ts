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
} from '../../Common'

export * from '../../DataStructure/Data/Int'

let notEq: (_: Int) => (_: Int) => Bool = (
	_0 => _1 => Bool.fromI(Eq.notEq(_0)(_1))
);
export {notEq}

let compare: (_: Int) => (_: Int) => Ordering = (
	_0 => _1 => Ordering.fromI(Ord.compare(_0)(_1))
);
export {compare}

let lt: (_: Int) => (_: Int) => Bool = (
	_0 => _1 => Bool.fromI(Ord.lt(_0)(_1))
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

let Num = INum.instantiate<Int>({
	add: Int.add,
	sub: Int.sub,
	mul: Int.mul,
	zero: Int.zero,
	one: Int.one,
	abs: Int.abs,
});
export {Num}

let Show = IShow.instantiate<Int>({
	show: int => String(`${int.value}`),
});
export {Show}

let Semiring = ISemiring.instantiate<Int>({
	add: Int.add,
	zero: Int.zero,
	mul: Int.mul,
	one: Int.one,
});
export {Semiring}

let Ring = IRing.instantiate<Int>({
	...Semiring,
	sub: Int.sub,
	negate: Int.negate,
});
export {Ring}

let Eq = IEq.instantiate<Int>({
	eq: Int.eq,
});
export {Eq}

let Ord = IOrd.instantiate<Int>(
	define<IOrd<Int>>(Ord => ({
		...Eq,
		compare: int0 => int1 => (
			Ord().lt(int0)(int1).cata({
				True: () => Ordering.LT,
				False: () => (
					Ord().lt(int1)(int0).cata({
						True: () => Ordering.GT,
						False: () => Ordering.EQ,
					})
				)
			})
		),
		lt: int0 => int1 => Bool(int0.value < int1.value),
	}))
);
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
	})
);

export {_Int as Int}
export default _Int