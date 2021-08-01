import {Sum, HSum as _HSum, Constructor, URI} from './Sum_'
import {IShow} from '../Show'
import {String} from '../../../Instance/Data/String'
import {
	merge,
	apply,
	create,
} from '../../../Common/common'

let show: <A>(_: IShow<A>) => (sumA: Sum<A>) => String = (
	ShowA => sumA => (
		apply(String('Sum('))
		(_ => apply(String.Semigroup.append(_)(String.fromI(ShowA.show(sumA.value)))))
		(_ => String.Semigroup.append(_)(String(')')))
	)
);
export {show}

/** Show a => Show (Sum a) */
let Show = <A>(_: IShow<A>) => (
	IShow.instantiate<Sum<A>>()(create<IShow<Sum<A>>>({
		show: show(_),
	}))
);
export {Show}

interface HSum extends _HSum {
	Show: typeof Show;
	show: <A>(_: IShow<A>) => (sumA: Sum<A>) => String
}
export {HSum}

type _Sum<A> = Sum<A>;
let _Sum: Constructor & HSum = (
	merge(Sum, {
		Show,
		show,
	})
);

export * from './Sum_'
export {_Sum as Sum}
export default _Sum