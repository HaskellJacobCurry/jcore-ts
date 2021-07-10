import {All} from './All_'
import {IShow} from '../Show'
import {String} from '../../../DataStructure/Data/String'
import {Bool} from '../../../DataStructure/Data/Bool'
import {
	Json,
	assign,
} from '../../../Common/common'

/** Show All */
let Show: IShow<All> = ({
	show: _ => (
		assign(
			Bool.fromI(_.value)
		)(_ => assign(
			String(_.tag)
		))(_ => String.Semigroup.append(String('All '))(_))
	),
});
export {Show}

let _All = Json.assign(All, {
	Show,
});

export * from './Any_'
export {_All}
export default _All