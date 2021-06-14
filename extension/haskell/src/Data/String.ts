import {IString} from './IString'
import {IShow} from './Show'
import {ISemigroup} from './Semigroup'
import {
	Json,
	cast,
	S,
} from '../util/common'

const URI = S('String');
type URI = typeof URI;
export {URI}

interface String extends IString {
	URI: URI;
	value: string;
}
export {String}

let fromI: (_: IString) => String = (
	string => cast(Json.assign(string, {URI}))()
);
export {fromI}

let Show: IShow<String> = ({
	show: string => `"${string.toString()}"`,
});
export {Show}

let Semigroup: ISemigroup<String> = ({
	append: _0 => _1 => String(`${_0.value}${_1.value}`)
});
export {Semigroup}

let String = Json.assign(
	(value: string): String => ({
		URI,
		value,
		toString: () => value,
	}), {
		URI,
		fromI,
		Show,
		Semigroup,
	}
);
export default String