import { IString } from './IString';
import { IShow } from './Show';
interface String extends IString {
}
export { String };
declare let from: (_: IString) => String;
export { from };
declare let Show: IShow<String>;
export { Show };
declare let String: ((value: string) => String) & {
    from: (_: IString) => String;
    Show: IShow<String>;
};
export default String;
