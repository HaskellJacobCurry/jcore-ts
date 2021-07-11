import {IInt} from '../../Typeclass/Data/IInt'
import {Bool} from '../../Instance/Data/Bool'
import {
	Json,
	S,
} from '../../Common'

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

let createInt: (value: number) => Int = (
	value => ({URI, value})
);
export {createInt as create}

let zero: () => Int = () => createInt(0);
export {zero}

let one: () => Int = () => createInt(1);
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

let abs: (_: Int) => Int = int => createInt(Math.abs(int.value));
export {abs}

let negate: (_: Int) => Int = IInt.negate;
export {negate}

let eq: (_: Int) => (_: Int) => Bool = (
	int0 => int1 => Bool(int0.value == int1.value)
);
export {eq}

type Constructor = typeof createInt;
export {Constructor}

interface HInt {
	create: (value: number) => Int;
	fromI: (_: IInt) => Int;
	zero: () => Int;
	one: () => Int;
	add: (_: Int) => (_: Int) => Int;
	mul: (_: Int) => (_: Int) => Int;
	sub: (_: Int) => (_: Int) => Int;
	inc: (_: Int) => Int;
	dec: (_: Int) => Int;
	even: (_: Int) => Bool;
	odd: (_: Int) => Bool;
	abs: (_: Int) => Int;
	negate: (_: Int) => Int;
	eq: (_: Int) => (_: Int) => Bool;
}
export {HInt}

let Int: Constructor & HInt = (
	Json.assign(createInt, {
		URI,
		create: createInt,
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
	})
);
export default Int