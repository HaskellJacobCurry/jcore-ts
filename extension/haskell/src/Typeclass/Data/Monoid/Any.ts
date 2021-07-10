import {Any} from './Any_'
import {IShow} from '../Show'
import {String} from '../../../DataStructure/Data/String'
import {Bool} from '../../../DataStructure/Data/Bool'
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

let _Any = Json.assign(Any, {
	Show,
});

export * from './Any_'
export {_Any as Any}
export default _Any