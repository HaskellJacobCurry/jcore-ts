import { IString } from './IString';
export interface Show<A> {
    readonly show: (a: A) => IString;
}
export { Show as IShow };
export default Show;
