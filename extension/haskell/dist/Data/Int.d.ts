import { IShow } from './Show';
export declare let Show: IShow<Int>;
export interface Int {
    value: number;
}
export declare let Int: ((value: number) => Int) & {
    Show: IShow<Int>;
};
