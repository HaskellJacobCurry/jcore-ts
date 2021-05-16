import {IShowable} from './IShowable'
import {String} from './String'
import {S} from '../../ts-toolbelt/common'
import {
	Construct,
	Deconstruct,
	Json,
} from '../../ts-toolbelt'

class Int implements IShowable {
	construct = Int;
	_: number = 0;

	show = (): String => String.Lift(`${this._}`);
}
type Int_ = Int;
let Int_ = (
	(Int => (
		Int
	))(Json.assign(Int, {
		Lift: (_: number): Int => ((int = new Int()) => (int._ = _, int))(),
	}))
);
export {Int_ as Int}
export default Int_