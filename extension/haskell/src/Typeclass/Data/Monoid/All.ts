import {All, HAll as _HAll, Constructor, URI} from './All_'
import {IShow} from '../Show'
import {String} from '../../../Instance/Data/String'
import {Bool} from '../../../Instance/Data/Bool'
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

interface HAll extends _HAll {
	Show: typeof Show;
}

type _All = All;
let _All: Constructor & HAll = (
	Json.assign(All, {
		Show,
	})
);

export * from './All_'
export {_All as All}
export default _All