import {Dual, HDual as _HDual, Constructor, URI} from './Dual_'
import {IShow} from '../Show'
import {String} from '../../../Instance/Data/String'
import {
	Json,
	assign,
} from '../../../Common/common'

/** Show a => Show (Dual a) */
let Show = <A>(_: IShow<A>) => (
	((ShowA = _) => (
		IShow.instantiate<Dual<A>>({
			show: dualA => (
				assign(
					String('Dual(')
				)(_ => assign(
					String.Semigroup.append(_)(String.fromI(ShowA.show(dualA.value)))
				))(_ => String.Semigroup.append(_)(String(')')))
			),
		})
	))()
);
export {Show}

interface HDual extends _HDual {
	Show: typeof Show;
}

type _Dual<A> = Dual<A>;
let _Dual: Constructor & HDual = (
	Json.assign(Dual, {
		Show,
	})
);

export * from './Dual_'
export {_Dual as Dual}
export default _Dual