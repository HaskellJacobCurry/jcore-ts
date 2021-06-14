import { IString } from './IString';
import { IShow } from './Show';
import { ISemigroup } from './Semigroup';
declare const URI: "String";
declare type URI = typeof URI;
export { URI };
interface String extends IString {
    URI: URI;
    value: string;
}
export { String };
declare let fromI: (_: IString) => String;
export { fromI };
declare let Show: IShow<String>;
export { Show };
declare let Semigroup: ISemigroup<String>;
export { Semigroup };
declare let String: ((value: string) => String) & {
    URI: "String";
    fromI: (_: IString) => String;
    Show: IShow<String>;
    Semigroup: ISemigroup<String>;
};
export default String;
