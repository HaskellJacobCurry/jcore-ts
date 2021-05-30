import { IString } from './IString';
export interface Show<A> {
    readonly show: (a: A) => IString;
}
export declare type IShow<A> = Show<A>;
export default Show;
