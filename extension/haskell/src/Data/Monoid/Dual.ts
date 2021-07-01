import {Dual} from './Dual_'
import {IShow} from '../Show'
import {String} from '../String'
import {
	Json,
	assign,
} from '../../util/common'

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

let _Dual = Json.assign(Dual, {
	Show,
});

export * from './Dual_'
export {_Dual as Dual}
export default _Dual