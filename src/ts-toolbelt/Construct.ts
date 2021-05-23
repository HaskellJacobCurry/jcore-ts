export type Construct<T = {}> = new(...as: any[]) => T;

export type Deconstruct<T> = T extends new(...as: any[]) => infer T ? T : never;

export interface Constructible {
	construct: Construct<Constructible> & {default: Constructible};
}