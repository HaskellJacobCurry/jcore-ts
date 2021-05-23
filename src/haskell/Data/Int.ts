import {IInt} from './IInt'
import {IShowable} from './IShowable'
import {IRing} from './IRing'
import {IOrd} from './IOrd'
import {String} from './String'
import {Ordering} from './Ordering'
import {Bool} from './Bool'
import {S} from '../../ts-toolbelt/common'
import {
	Construct,
	Deconstruct,
	Json,
} from '../../ts-toolbelt'

class Int implements IInt, IShowable, IRing, IOrd {
	construct = Int;
	_: number = 0;

	inc = (): Int => Int.Lift(this._ + 1);

	dec = (): Int => Int.Lift(this._ - 1);

	isEven = (): Bool => Bool.Lift(this._ % 2 == 0);

	isOdd = (): Bool => Bool.Lift(this._ % 2 != 0);

	show = (): String => String.Lift(`${this._}`);

	static Lift = (_: number): Int => ((int = new Int()) => (int._ = _, int))();

	static zero = () => Int.Lift(0);

	static one = () => Int.Lift(1);

	add = (int: Int) => Int.Lift(this._ + int._);

	mul = (int: Int) => Int.Lift(this._ * int._);

	sub = (int: Int) => Int.Lift(this._ - int._);

	eq = (int: Int): Bool => Bool.Lift(this._ == int._);

	compare = (int: Int): Ordering => (
		this.lt(int).cata({
			True: () => Ordering.LT(),
			False: () => (
				int.lt(this).cata({
					True: () => Ordering.GT(),
					False: () => Ordering.EQ(),
				})
			)
		})
	);

	lt = (int: Int): Bool => Bool.Lift(this._ < int._);
}
type Int_ = Int;
let Int_ = (
	(Int => (
		Int
	))(Json.assign(Int, {
		//Lift: (_: number): Int => ((int = new Int()) => (int._ = _, int))(),
	}))
);
export {Int_ as Int}
export default Int_