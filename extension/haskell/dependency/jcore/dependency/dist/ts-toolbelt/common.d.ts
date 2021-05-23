import { Int } from './Int';
import { String } from './String';
export declare type Cast<T extends any, U extends any> = T extends U ? T : U;
export declare type Key = Int | String | symbol;
export declare type Record<TKey extends Key = Key, TVal extends any = any> = {
    [K in TKey]: TVal;
};
export declare type Exclude<T extends any, U extends any> = T extends U ? never : T;
export declare type Extract<T extends any, U extends any> = T extends U ? T : never;
export declare type Default<T extends any, U extends any> = [T] extends [never] ? U : T;
export declare type Partial<T extends any> = {
    [K in keyof T]?: T[K];
};
export declare type Required<T extends any> = {
    [K in keyof T]-?: T[K];
};
export declare type Readonly<T extends any> = {
    readonly [K in keyof T]: T[K];
};
