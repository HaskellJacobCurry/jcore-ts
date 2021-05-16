import { IShowable } from './IShowable';
import { IString } from './IString';
declare class String implements IShowable, IString {
    construct: typeof String;
    _: string;
    show(): String;
    toString(): string;
}
declare type _String = String;
declare let _String: typeof String & {
    Lift: (_: string) => String;
};
export { _String as String };
export default _String;
