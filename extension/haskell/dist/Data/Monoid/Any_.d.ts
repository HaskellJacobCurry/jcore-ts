import { ISemigroup } from '../Semigroup';
import { IMonoid } from '../Monoid';
import { IBool } from '../IBool';
declare const URI: "Any";
declare type URI = typeof URI;
export { URI };
interface Any {
    URI: URI;
    value: IBool;
}
export { Any };
declare let get: (_: Any) => IBool;
export { get };
/** Semigroup Any */
declare let Semigroup: ISemigroup<Any>;
export { Semigroup };
/** Monoid Any */
declare let Monoid: IMonoid<Any> & IMonoid.Ext<Any>;
export { Monoid };
declare let Any: ((value: IBool) => Any) & {
    URI: "Any";
    get: (_: Any) => IBool;
    Semigroup: ISemigroup<Any>;
    Monoid: IMonoid<Any> & IMonoid.Ext<Any>;
};
export default Any;
