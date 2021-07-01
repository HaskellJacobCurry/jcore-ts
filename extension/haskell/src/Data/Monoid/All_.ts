import {ISemigroup} from '../Semigroup'
import {IMonoid} from '../Monoid'
import {INum} from '../../GHC/Num'
import {IBool} from '../IBool'
import {
	Json,
	assign,
	S,
} from '../../util/common'

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

let create_: (value: IBool) => All = (
	value => ({URI, value})
);
export {create_ as create}

/** Semigroup All */
let Semigroup = ISemigroup.instantiate<All>({
	append: _0 => _1 => create_(IBool.and(_0.value)(_1.value)),
});
export {Semigroup}

/** Monoid All */
let Monoid = IMonoid.instantiate<All>({
	...Semigroup,
	mempty: () => create_(IBool.True),
});
export {Monoid}

let All = Json.assign(create_, {
	URI,
	get,
	create: create_,
	Semigroup,
	Monoid,
});
export default All