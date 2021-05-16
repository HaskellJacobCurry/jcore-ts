import { IShowable, IString } from './IShowable';
declare class String implements IShowable, IString {
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
