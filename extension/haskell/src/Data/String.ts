import {
	Json
} from '../../dependency/jcore/dist/ts-toolbelt'
import {IShowable} from './IShowable'
import {IString} from './IString'

class String implements IShowable, IString {
	construct = String;
	_: string = '';

	show(): String {
		return this;
	}

	toString(): string {
		return this._;
	}
}
type _String = String;
let _String = (
	(String => (
		String
	))(Json.assign(String, {
		Lift: (_: string): String => ((string = new String()) => (string._ = _, string))()
	}))
);
export {_String as String}
export default _String