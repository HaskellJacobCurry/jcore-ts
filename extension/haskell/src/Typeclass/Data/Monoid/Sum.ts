import {Sum, HSum as _HSum, Constructor, URI} from './Sum_'
import {IShow} from '../Show'
import {String} from '../../../Instance/Data/String'
import {
	Json,
	assign,
} from '../../../Common/common'

/** Show a => Show (Sum a) */
let Show = <A>(_: IShow<A>) => (
	((ShowA = _) => (
		IShow.instantiate<Sum<A>>({
			show: sumA => (
				assign(
					String('Sum(')
				)(_ => assign(
					String.Semigroup.append(_)(String.fromI(ShowA.show(sumA.value)))
				))(_ => String.Semigroup.append(_)(String(')')))
			),
		})
	))()
);
export {Show}

interface HSum extends _HSum {
	Show: typeof Show;
}
export {HSum}

type _Sum<A> = Sum<A>;
let _Sum: Constructor & HSum = (
	Json.assign(Sum, {
		Show,
	})
);

export * from './Sum_'
export {_Sum as Sum}
export default _Sum