import { IString } from '../../Typeclass/Data/IString';
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
declare let createString: (value: string) => String;
export { createString as create };
declare type Constructor = typeof createString;
export { Constructor };
interface HString {
    URI: URI;
    create: (value: string) => String;
    fromI: (_: IString) => String;
}
export { HString };
declare let String: Constructor & HString;
export default String;
