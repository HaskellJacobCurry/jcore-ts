import { IString } from './IString';
import { IShow } from './Show';
interface String extends IString {
}
export { String };
declare let fromI: (_: IString) => String;
export { fromI };
declare let Show: IShow<String>;
export { Show };
declare let String: ((value: string) => String) & {
    fromI: (_: IString) => String;
    Show: IShow<String>;
};
export default String;
