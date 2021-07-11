import {IUnit} from '../../Typeclass/Data/IUnit'
import {
	Json,
	cast,
} from '../../Common/common'

interface Unit extends IUnit {}
export {Unit}

let createUnit: () => Unit = (
	() => ({})
);
export {createUnit}

let fromI: (_: IUnit) => Unit = (
	unit => cast(unit)()
);
export {fromI}

type Constructor = typeof createUnit;
export {Constructor}

interface HUnit {
	create: () => Unit;
	fromI: (_: IUnit) => Unit;
}
export {HUnit}

let Unit: Constructor & HUnit = (
	Json.assign(createUnit, {
		create: createUnit,
		fromI,
	})
);
export default Unit