import { IString } from './IString';
/**
 * class Show f where
 *  show :: f -> String
 */
interface IShow<A> {
    show: (a: A) => IString;
}
interface Show<A> extends IShow<A> {
}
export { Show };
export { Show as IShow };
declare namespace Show {
    let instantiate: <A>(_: Show<A>) => Show<A>;
}
export default Show;
