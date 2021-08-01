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
declare let append: (any0: Any) => (any1: Any) => Any;
export { append };
declare let mempty: () => Any;
export { mempty };
/** Semigroup Any */
declare let Semigroup: ISemigroup<Any>;
export { Semigroup };
/** Monoid Any */
declare let Monoid: ISemigroup<Any> & IMonoid.Base<Any> & IMonoid.Ext<Any>;
export { Monoid };
declare type Constructor = typeof createAny;
export { Constructor };
interface HAny {
    URI: URI;
    get: (_: Any) => IBool;
    create: (value: IBool) => Any;
    Semigroup: typeof Semigroup;
    Monoid: typeof Monoid;
    append: (any0: Any) => (any1: Any) => Any;
    mempty: () => Any;
}
export { HAny };
declare let Any: Constructor & HAny;
export default Any;
