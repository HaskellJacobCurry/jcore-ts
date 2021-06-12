import { IUnit } from './IUnit';
import { IShow } from './Show';
interface Unit extends IUnit {
}
export { Unit };
declare let fromI: (_: IUnit) => Unit;
export { fromI };
declare let Show: IShow<Unit>;
export { Show };
declare let Unit: (() => Unit) & {
    fromI: (_: IUnit) => Unit;
    Show: IShow<Unit>;
};
export default Unit;
