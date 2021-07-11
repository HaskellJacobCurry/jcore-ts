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
declare let createAny: (value: IBool) => Any;
export { createAny as create };
/** Semigroup Any */
declare let Semigroup: ISemigroup<Any>;
export { Semigroup };
/** Monoid Any */
declare let Monoid: IMonoid<Any> & IMonoid.Ext<Any>;
export { Monoid };
declare type Constructor = typeof createAny;
export { Constructor };
interface HAny {
    URI: URI;
    get: (_: Any) => IBool;
    create: (value: IBool) => Any;
    Semigroup: typeof Semigroup;
    Monoid: typeof Monoid;
}
export { HAny };
declare let Any: Constructor & HAny;
export default Any;
