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
declare let create_: (value: IBool) => All;
export { create_ as create };
/** Semigroup All */
declare let Semigroup: ISemigroup<All>;
export { Semigroup };
/** Monoid All */
declare let Monoid: IMonoid<All> & IMonoid.Ext<All>;
export { Monoid };
declare let All: ((value: IBool) => All) & {
    URI: "All";
    get: (_: All) => IBool;
    create: (value: IBool) => All;
    Semigroup: ISemigroup<All>;
    Monoid: IMonoid<All> & IMonoid.Ext<All>;
};
export default All;
