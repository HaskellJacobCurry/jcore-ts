import {
	Json
} from '../../ts-toolbelt'
import {IShowable, IString} from './IShowable'

class String implements IShowable, IString {
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