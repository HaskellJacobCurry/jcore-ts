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

let create_ = (value: string): String => ({
	URI,
	value,
	toString: () => value,
});
export {create_ as create}

let Show = IShow.instantiate<String>({
	show: string => `"${string.toString()}"`,
});
export {Show}

let show = Show.show;
export {show}

let Semigroup = ISemigroup.instantiate<String>({
	append: _0 => _1 => create_(`${_0.value}${_1.value}`)
});
export {Semigroup}

let append = Semigroup.append;
export {append}

let Monoid = IMonoid.instantiate<String>({
	...Semigroup,
	mempty: () => create_(''),
});
export {Monoid}

let mempty = Monoid.mempty;
export {mempty}

let mappend = Monoid.mappend;
export {mappend}

let String = Json.assign(create_, {
	URI,
	fromI,
	create: create_,
	show,
	append,
	mempty,
	mappend,
	Show,
	Semigroup,
	Monoid,
});
export default String