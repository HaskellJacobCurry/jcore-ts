import {IInt} from './IInt'
import {INum} from '../GHC/Num'
import {ISemiring} from './Semiring'
import {IRing} from './Ring'
import {IEq} from './Eq'
import {IOrd} from './Ord'
import {IShow} from './Show'
import {String} from './String'
import {Bool} from './Bool'
import {Ordering} from './Ordering'
import {
	Json,
	assign,
	define,
	S,
} from '../util/common'

const URI = S('Int');
type URI = typeof URI;
export {URI}

interface Int extends IInt {
	URI: URI;
}
export {Int}

let fromI: (_: IInt) => Int = (
	int => ({URI, value: int.value})
);
export {fromI}

let create: (value: number) => Int = (
	value => ({URI, value})
);
export {create}

let zero: () => Int = () => create(0);
export {zero}

let one: () => Int = () => create(1);
export {one}

let add: (_: Int) => (_: Int) => Int = IInt.add;
export {add}

let mul: (_: Int) => (_: Int) => Int = IInt.mul;
export {mul}

let sub: (_: Int) => (_: Int) => Int = IInt.sub;
export {sub}

let inc: (_: Int) => Int = (
	int => Int(int.value + 1)
);
export {inc}

let dec: (_: Int) => Int = (
	int => Int(int.value - 1)
);
export {dec}

let even: (_: Int) => Bool = (
	int => Bool(int.value % 2 == 0)
);
export {even}

let odd: (_: Int) => Bool = (
	int => Bool(int.value % 2 != 0)
);
export {odd}

let abs: (_: Int) => Int = int => create(Math.abs(int.value));
export {abs}

let negate: (_: Int) => Int = IInt.negate;
export {negate}

let eq: (_: Int) => (_: Int) => Bool = (
	int0 => int1 => Bool(int0.value == int1.value)
);
export {eq}

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
	add,
	sub,
	mul,
	zero,
	one,
	abs,
});
export {Num}

let Show = IShow.instantiate<Int>({
	show: int => String(`${int.value}`),
});
export {Show}

let Semiring = ISemiring.instantiate<Int>({
	add,
	zero,
	mul,
	one,
});
export {Semiring}

let Ring = IRing.instantiate<Int>({
	...Semiring,
	sub,
	negate,
});
export {Ring}

let Eq = IEq.instantiate<Int>({
	eq,
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

let Int = Json.assign(create, {
	URI,
	fromI,
	zero,
	one,
	add,
	mul,
	sub,
	inc,
	dec,
	even,
	odd,
	abs,
	negate,
	eq,
	notEq,
	compare,
	lt,
	notLt,
	gt,
	notGt,
	Show,
	Semiring,
	Ring,
	Eq,
	Ord,
});
export default Int