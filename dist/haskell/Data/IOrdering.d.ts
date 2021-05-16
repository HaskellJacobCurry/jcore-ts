import { Construct } from '../../ts-toolbelt';
export interface IOrdering {
    construct: COrdering<IOrdering>;
    cata: IOrdering.Cata;
}
export declare namespace IOrdering {
    interface Cata {
        <T, U, K>(fs: {
            LT: () => T;
            GT: () => U;
            EQ: () => K;
        }): T | U | K;
    }
}
export interface COrdering<TOrdering extends IOrdering = IOrdering> extends Construct<TOrdering> {
}
