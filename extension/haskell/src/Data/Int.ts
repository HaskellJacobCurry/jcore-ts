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

let Num = INum.enhance<Int>({
	add,
	sub,
	mul,
	zero: () => create(0),
	one: () => create(1),
	abs: int => create(Math.abs(int.value)),
});
export {Num}

let Show = IShow.enhance<Int>({
	show: int => String(`${int.value}`),
});
export {Show}

let Semiring = ISemiring.enhance<Int>({
	add: int0 => int1 => IInt.add(int0)(int1),
	zero: () => create(0),
	mul: int0 => int1 => IInt.mul(int0)(int1),
	one: () => create(1),
});
export {Semiring}

let Ring = IRing.enhance<Int>({
	...Semiring,
	sub: int0 => int1 => IInt.sub(int0)(int1),
	negate: int => IInt.negate(int),
});
export {Ring}

let Eq = IEq.enhance<Int>({
	eq: int0 => int1 => Bool(int0.value == int1.value),
});
export {Eq}

let Ord = IOrd.enhance<Int>(
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
	add,
	mul,
	sub,
	inc,
	dec,
	even,
	odd,
	Show,
	Semiring,
	Ring,
	Eq,
	Ord,
});
export default Int