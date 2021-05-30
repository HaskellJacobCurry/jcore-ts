import { Int } from './Int';
import { String } from './String';
import { Tuple } from './Tuple';
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
export declare let S: <T extends string>(_: T) => T;
export declare let N: <T extends number>(_: T) => T;
export declare let T: <T extends Tuple>(..._: T) => T;
export declare let cast: <T = any>(_?: T | undefined) => <U extends T>() => U;
export declare let reinterpret: <T = any>(_?: any) => T;
