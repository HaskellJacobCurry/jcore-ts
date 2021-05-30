import { IString } from './IString';
import { IShow } from './Show';
export declare let Show: IShow<String>;
export interface String extends IString {
}
export declare let String: ((value: string) => String) & {
    Show: IShow<String>;
};
export default String;
