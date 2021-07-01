import {ISemigroup} from '../Semigroup'
import {IMonoid} from '../Monoid'
import {INum} from '../../GHC/Num'
import {IBool} from '../IBool'
import {
	Json,
	assign,
	S,
} from '../../util/common'

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

let create_: (value: IBool) => Any = (
	value => ({URI, value})
);
export {create_ as create}

/** Semigroup Any */
let Semigroup = ISemigroup.instantiate<Any>({
	append: any0 => any1 => create_(IBool.or(any0.value)(any1.value)),
});
export {Semigroup}

/** Monoid Any */
let Monoid = IMonoid.instantiate<Any>({
	...Semigroup,
	mempty: () => create_(IBool.False),
});
export {Monoid}

let Any = Json.assign(create_, {
	URI,
	get,
	create: create_,
	Semigroup,
	Monoid,
});
export default Any