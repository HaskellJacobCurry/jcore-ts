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

/** Semigroup All */
let Semigroup: ISemigroup<All> = ({
	append: _0 => _1 => All(IBool.and(_0.value)(_1.value)),
});
export {Semigroup}

/** Monoid All */
let Monoid: IMonoid<All> & IMonoid.Ext<All> = (
	assign(<IMonoid<All>>{
		...Semigroup,
		mempty: () => All(IBool.True),
	})(_ => Json.assign(_, IMonoid.Ext(_)))
);
export {Monoid}

let All = Json.assign(
	(value: IBool) => <All>{URI, value}, {
		URI,
		get,
		Semigroup,
		Monoid,
	}
);
export default All