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

/** Semigroup Any */
let Semigroup: ISemigroup<Any> = ({
	append: any0 => any1 => Any(IBool.or(any0.value)(any1.value)),
});
export {Semigroup}

/** Monoid Any */
let Monoid: IMonoid<Any> & IMonoid.Ext<Any> = (
	assign(<IMonoid<Any>>{
		...Semigroup,
		mempty: () => Any(IBool.False),
	})(_ => Json.assign(_, IMonoid.Ext(_)))
);
export {Monoid}

let Any = Json.assign(
	(value: IBool) => <Any>{URI, value}, {
		URI,
		get,
		Semigroup,
		Monoid,
	}
);
export default Any