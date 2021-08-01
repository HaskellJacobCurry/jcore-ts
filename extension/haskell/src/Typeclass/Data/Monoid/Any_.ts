import {ISemigroup} from '../Semigroup'
import {IMonoid} from '../Monoid'
import {IBool} from '../IBool'
import {
	Json,
	S,
	merge,
	create,
} from '../../../Common/common'

const URI = S('Any');
type URI = typeof URI;
export {URI}

interface Any {
	URI: URI;
	value: IBool;
}
export {Any}

let get: (_: Any) => IBool = _ => _.value;
export {get}

let createAny: (value: IBool) => Any = (
	value => ({URI, value})
);
export {createAny as create}

let append: (any0: Any) => (any1: Any) => Any = (
	any0 => any1 => createAny(IBool.or(any0.value)(any1.value))
);
export {append}

let mempty: () => Any = (
	() => createAny(IBool.False)
);
export {mempty}

/** Semigroup Any */
let Semigroup = ISemigroup.instantiate<Any>()(create<ISemigroup<Any>>({
	append,
}));
export {Semigroup}

/** Monoid Any */
let Monoid = IMonoid.instantiate<Any>()(merge(Semigroup, create<IMonoid.Base<Any>>({
	mempty,
})));
export {Monoid}

type Constructor = typeof createAny;
export {Constructor}

interface HAny {
	URI: URI;
	get: (_: Any) => IBool;
	create: (value: IBool) => Any;
	Semigroup: typeof Semigroup;
	Monoid: typeof Monoid;
	append: (any0: Any) => (any1: Any) => Any;
	mempty: () => Any;
}
export {HAny}

let Any: Constructor & HAny = (
	Json.assign(createAny, {
		URI,
		get,
		create: createAny,
		Semigroup,
		Monoid,
		append,
		mempty,
	})
);
export default Any