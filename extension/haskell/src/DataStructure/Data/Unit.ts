import {IUnit} from '../../Typeclass/Data/IUnit'
import {IShow} from '../../Typeclass/Data/Show'
import {String} from './String'
import {
	Json,
	cast,
} from '../../Common/common'

interface Unit extends IUnit {}
export {Unit}

let fromI: (_: IUnit) => Unit = (
	unit => cast(unit)()
);
export {fromI}

let Show = IShow.instantiate<Unit>({
	show: _ => String('Unit'),
});
export {Show}

let Unit = Json.assign(
	(): Unit => ({}), {
		fromI,
		Show
	}
);
export default Unit