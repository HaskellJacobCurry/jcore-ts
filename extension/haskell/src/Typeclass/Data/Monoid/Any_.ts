import {ISemigroup} from '../Semigroup'
import {IMonoid} from '../Monoid'
import {IBool} from '../IBool'
import {
	Json,
	S,
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

/** Semigroup Any */
let Semigroup = ISemigroup.instantiate<Any>({
	append: any0 => any1 => createAny(IBool.or(any0.value)(any1.value)),
});
export {Semigroup}

/** Monoid Any */
let Monoid = IMonoid.instantiate<Any>({
	...Semigroup,
	mempty: () => createAny(IBool.False),
});
export {Monoid}

type Constructor = typeof createAny;
export {Constructor}

interface HAny {
	URI: URI;
	get: (_: Any) => IBool;
	create: (value: IBool) => Any;
	Semigroup: typeof Semigroup;
	Monoid: typeof Monoid;
}
export {HAny}

let Any: Constructor & HAny = (
	Json.assign(createAny, {
		URI,
		get,
		create: createAny,
		Semigroup,
		Monoid,
	})
);
export default Any