import {Dual, HDual as _HDual, Constructor, URI} from './Dual_'
import {IShow} from '../Show'
import {String} from '../../../Instance/Data/String'
import {
	merge,
	apply,
	create,
} from '../../../Common/common'

let show: <A>(_: IShow<A>) => (dualA: Dual<A>) => String = (
	ShowA => dualA => (
		apply(String('Dual('))
		(_ => apply(String.Semigroup.append(_)(String.fromI(ShowA.show(dualA.value)))))
		(_ => String.Semigroup.append(_)(String(')')))
	)
);
export {show}

/** Show a => Show (Dual a) */
let Show = <A>(_: IShow<A>) => (
	IShow.instantiate<Dual<A>>()(create<IShow<Dual<A>>>({
		show: show(_),
	}))
);
export {Show}

interface HDual extends _HDual {
	Show: typeof Show;
	show: <A>(_: IShow<A>) => (dualA: Dual<A>) => String;
}

type _Dual<A> = Dual<A>;
let _Dual: Constructor & HDual = (
	merge(Dual, {
		Show,
		show,
	})
);

export * from './Dual_'
export {_Dual as Dual}
export default _Dual