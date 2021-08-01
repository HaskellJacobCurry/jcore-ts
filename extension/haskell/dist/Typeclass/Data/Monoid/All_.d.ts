import { ISemigroup } from '../Semigroup';
import { IMonoid } from '../Monoid';
import { IBool } from '../IBool';
declare const URI: "All";
declare type URI = typeof URI;
export { URI };
interface All {
    URI: URI;
    value: IBool;
}
export { All };
declare let get: (_: All) => IBool;
export { get };
declare let createAll: (value: IBool) => All;
export { createAll as create };
declare let append: (_0: All) => (_1: All) => All;
export { append };
declare let mempty: () => All;
export { mempty };
/** Semigroup All */
declare let Semigroup: ISemigroup<All>;
export { Semigroup };
/** Monoid All */
declare let Monoid: ISemigroup<All> & IMonoid.Base<All> & IMonoid.Ext<All>;
export { Monoid };
declare type Constructor = typeof createAll;
export { Constructor };
interface HAll {
    URI: URI;
    get: (_: All) => IBool;
    create: (value: IBool) => All;
    Semigroup: typeof Semigroup;
    Monoid: typeof Monoid;
    append: (_0: All) => (_1: All) => All;
    mempty: () => All;
}
export { HAll };
declare let All: Constructor & HAll;
export default All;
