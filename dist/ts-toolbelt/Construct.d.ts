export declare type Construct<T = any> = new () => T;
export declare type Deconstruct<T> = T extends new () => infer T ? T : never;
export interface Constructible<T = any> {
    new (): this;
}
