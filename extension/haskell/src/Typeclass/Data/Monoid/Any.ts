import {Any, HAny as _HAny, Constructor, URI} from './Any_'
import {IShow} from '../Show'
import {String} from '../../../Instance/Data/String'
import {Bool} from '../../../Instance/Data/Bool'
import {
	Json,
	assign,
} from '../../../Common/common'

/** Show Any */
let Show: IShow<Any> = ({
	show: any => (
		assign(
			Bool.fromI(any.value)
		)(_ => assign(
			String(_.tag)
		))(_ => String.Semigroup.append(String('Any '))(_))
	),
});
export {Show}

interface HAny extends _HAny {
	Show: typeof Show;
}

type _Any = Any;
let _Any: Constructor & HAny = (
	Json.assign(Any, {
		Show,
	})
);

export * from './Any_'
export {_Any as Any}
export default _Any