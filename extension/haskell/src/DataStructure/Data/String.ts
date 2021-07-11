import {IString} from '../../Typeclass/Data/IString'
import {IShow} from '../../Typeclass/Data/Show'
import {ISemigroup} from '../../Typeclass/Data/Semigroup'
import {IMonoid} from '../../Typeclass/Data/Monoid'
import {
	Json,
	cast,
	S,
} from '../../Common/common'

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

let createString: (value: string) => String = (
	value => ({
		URI,
		value,
		toString: () => value,
	})
);
export {createString as create}

type Constructor = typeof createString;
export {Constructor}

interface HString {
	URI: URI;
	create: (value: string) => String;
	fromI: (_: IString) => String;
}
export {HString}

let String: Constructor & HString = (
	Json.assign(createString, {
		URI,
		create: createString,
		fromI,
	})
);
export default String