import {Sum} from './Sum_'
import {IShow} from '../Show'
import {String} from '../String'
import {
	Json,
	assign,
} from '../../util/common'

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

let _Sum = Json.assign(Sum, {
	Show,
});

export * from './Sum_'
export {_Sum as Sum}
export default _Sum