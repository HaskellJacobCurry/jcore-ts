import {ISemiring, Semiring} from '../ISemiring'
import {ISemigroup} from '../ISemigroup'

class Int implements ISemiring, ISemigroup {
	construct = Int;
	add = <any>1;
	mul = <any>1;
	static zero = (): Int => <any>1;
	static one = (): Int => <any>1;
	append = <any>1;
}
let s = Semiring.zero(Int)();