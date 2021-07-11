import {String, HString as _HString, Constructor} from '../../DataStructure/Data/String'
import {IString} from '../../Typeclass/Data/IString'
import {IShow} from '../../Typeclass/Data/Show'
import {ISemigroup} from '../../Typeclass/Data/Semigroup'
import {IMonoid} from '../../Typeclass/Data/Monoid'
import {
	Json,
} from '../../Common'

export * from '../../DataStructure/Data/String'

let show: (_: String) => IString = (
	_ => Show.show(_)
);
export {show}

let append: (_: String) => (_: String) => String = (
	_0 => _1 => Semigroup.append(_0)(_1)
);
export {append}

let mempty: () => String = (
	() => Monoid.mempty()
);
export {mempty}

let mappend: (_: String) => (_: String) => String = (
	_0 => _1 => Monoid.mappend(_0)(_1)
);
export {mappend}

let Show = IShow.instantiate<String>({
	show: string => `"${string.toString()}"`,
});
export {Show}

let Semigroup = ISemigroup.instantiate<String>({
	append: _0 => _1 => String(`${_0.value}${_1.value}`)
});
export {Semigroup}

let Monoid = IMonoid.instantiate<String>({
	...Semigroup,
	mempty: () => String(''),
});
export {Monoid}

interface HString extends _HString {
	Show: typeof Show;
	Semigroup: typeof Semigroup;
	Monoid: typeof Monoid;
	show: (_: String) => IString;
	append: (_: String) => (_: String) => String;
	mempty: () => String;
	mappend: (_: String) => (_: String) => String;
}
export {HString}

type _String = String;
let _String: Constructor & HString = (
	Json.assign(String, {
		Show,
		Semigroup,
		Monoid,
		show,
		append,
		mempty,
		mappend,
	})
);

export {_String as String}
export default _String