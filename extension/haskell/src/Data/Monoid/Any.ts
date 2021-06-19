import {Any} from './Any_'
import {IShow} from '../Show'
import {String} from '../String'
import {Bool} from '../Bool'
import {
	Json,
	assign,
} from '../../util/common'

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

let _Any = Json.assign(Any, {
	Show,
});

export * from './Any_'
export {_Any as Any}
export default _Any