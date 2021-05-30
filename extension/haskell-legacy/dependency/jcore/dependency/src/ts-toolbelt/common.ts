import {Int} from './Int'
import {String} from './String'

export type Cast<
	T extends any, 
	U extends any
> = T extends U ? T : U;

export type Key = Int | String | symbol;

export type Record<
	TKey extends Key = Key,
	TVal extends any = any
> = { [K in TKey]: TVal; };

export type Exclude<
	T extends any,
	U extends any
> = T extends U ? never : T;

export type Extract<
	T extends any,
	U extends any
> = T extends U ? T : never;

export type Default<
	T extends any,
	U extends any
> = [T] extends [never] ? U : T;

export type Partial<
	T extends any
> = { [K in keyof T]?: T[K]; };

export type Required<
	T extends any
> = { [K in keyof T]-?: T[K]; };

export type Readonly<
	T extends any
> = { readonly [K in keyof T]: T[K]; };