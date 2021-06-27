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
declare let create_: (value: IBool) => Any;
export { create_ as create };
/** Semigroup Any */
declare let Semigroup: ISemigroup<Any>;
export { Semigroup };
/** Monoid Any */
declare let Monoid: IMonoid<Any> & IMonoid.Ext<Any>;
export { Monoid };
declare let Any: ((value: IBool) => Any) & {
    URI: "Any";
    get: (_: Any) => IBool;
    create: (value: IBool) => Any;
    Semigroup: ISemigroup<Any>;
    Monoid: IMonoid<Any> & IMonoid.Ext<Any>;
};
export default Any;
