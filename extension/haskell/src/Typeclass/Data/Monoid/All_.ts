import {ISemigroup} from '../Semigroup'
import {IMonoid} from '../Monoid'
import {IBool} from '../IBool'
import {
	Json,
	S,
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

/** Semigroup All */
let Semigroup = ISemigroup.instantiate<All>({
	append: _0 => _1 => createAll(IBool.and(_0.value)(_1.value)),
});
export {Semigroup}

/** Monoid All */
let Monoid = IMonoid.instantiate<All>({
	...Semigroup,
	mempty: () => createAll(IBool.True),
});
export {Monoid}

type Constructor = typeof createAll;
export {Constructor}

interface HAll {
	URI: URI;
	get: (_: All) => IBool;
	create: (value: IBool) => All;
	Semigroup: typeof Semigroup;
	Monoid: typeof Monoid;
}
export {HAll}

let All: Constructor & HAll = (
	Json.assign(createAll, {
		URI,
		get,
		create: createAll,
		Semigroup,
		Monoid,
	})
);
export default All