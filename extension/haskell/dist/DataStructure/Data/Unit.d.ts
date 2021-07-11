import { IUnit } from '../../Typeclass/Data/IUnit';
interface Unit extends IUnit {
}
export { Unit };
declare let createUnit: () => Unit;
export { createUnit };
declare let fromI: (_: IUnit) => Unit;
export { fromI };
declare type Constructor = typeof createUnit;
export { Constructor };
interface HUnit {
    create: () => Unit;
    fromI: (_: IUnit) => Unit;
}
export { HUnit };
declare let Unit: Constructor & HUnit;
export default Unit;
