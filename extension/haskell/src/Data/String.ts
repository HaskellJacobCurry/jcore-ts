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

let create = (value: string): String => ({
	URI,
	value,
	toString: () => value,
});
export {create}

let Show = IShow.enhance<String>({
	show: string => `"${string.toString()}"`,
});
export {Show}

let Semigroup = ISemigroup.enhance<String>({
	append: _0 => _1 => create(`${_0.value}${_1.value}`)
});
export {Semigroup}

let String = Json.assign(create, {
	URI,
	fromI,
	Show,
	Semigroup,
});
export default String