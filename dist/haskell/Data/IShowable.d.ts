import { IString } from './IString';
import { Construct } from '../../ts-toolbelt';
interface Showable {
    show: (_: IShowable) => IString;
}
declare namespace Showable {
    let show: Showable['show'];
}
export { Showable };
export interface IShowable {
    construct: CShowable<IShowable>;
    show(): IString;
}
export interface CShowable<TShowable extends IShowable = IShowable> extends Construct<TShowable> {
}
