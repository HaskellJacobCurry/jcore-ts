import {ISemigroup} from '../Semigroup'
import {IMonoid} from '../Monoid'
import {IBool} from '../IBool'
import {
	Json,
	merge,
	S,
	create,
} from '../../../Common/common'

const URI = S('All');
type URI = typeof URI;
export {URI}

interface All {
	URI: URI;
	value: IBool;
}
export {All}

let get: (_: All) => IBool = _ => _.value;
export {get}

let createAll: (value: IBool) => All = (
	value => ({URI, value})
);
export {createAll as create}

let append: (_0: All) => (_1: All) => All = (
	_0 => _1 => createAll(IBool.and(_0.value)(_1.value))
);
export {append}

let mempty: () => All = (
	() => createAll(IBool.True)
);
export {mempty}

/** Semigroup All */
let Semigroup = ISemigroup.instantiate<All>()(create<ISemigroup<All>>({
	append,
}));
export {Semigroup}

/** Monoid All */
let Monoid = IMonoid.instantiate<All>()(merge(Semigroup, create<IMonoid.Base<All>>({
	mempty,
})));
export {Monoid}

type Constructor = typeof createAll;
export {Constructor}

interface HAll {
	URI: URI;
	get: (_: All) => IBool;
	create: (value: IBool) => All;
	Semigroup: typeof Semigroup;
	Monoid: typeof Monoid;
	append: (_0: All) => (_1: All) => All;
	mempty: () => All;
}
export {HAll}

let All: Constructor & HAll = (
	Json.assign(createAll, {
		URI,
		get,
		create: createAll,
		Semigroup,
		Monoid,
		append,
		mempty,
	})
);
export default All