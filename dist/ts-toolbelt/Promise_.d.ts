import { Int } from './Int';
export declare class Promise<T extends any = any> {
    private state;
    private value;
    private next;
    constructor(executor: Promise.Executor<T>);
    fmap<U extends any>(morphism: Promise.Fmap.Morphism<T, U>): Promise<U>;
    apply<U extends any>(morphism: Promise.Apply.Morphism<T, U>): Promise<U>;
    then<U extends any = T, K extends any = never>(onFulfilled?: Promise.OnFulfilled<T, U>, onRejected?: Promise.OnRejected<K>): Promise<U | K>;
    catch<K extends any = never>(onRejected?: Promise.OnRejected<K>): Promise<T | K>;
    static resolve<T extends any = void>(value?: T): Promise<Promise.Unlift<T>>;
    static reject(reason?: any): Promise<never>;
    static await(ms: Int): Promise<void>;
    private createResolutionFunctions;
}
export declare namespace Promise {
    let validator: (a: any) => a is Promise<any>;
    type Unlift<T extends any> = {
        1: T extends Promise<infer T> ? Unlift<T> : never;
        0: T;
    }[T extends Promise ? 1 : 0];
    interface Resolve<T extends any> {
        (value?: Promisable<T>): void;
    }
    interface Reject {
        (reason?: any): void;
    }
    interface Executor<T extends any> {
        (resolve: Resolve<T>, reject: Reject): void;
    }
    interface OnFulfilled<T extends any, U extends any> {
        (value: T): Promisable<U>;
    }
    interface OnRejected<K extends any> {
        (reason: any): Promisable<K>;
    }
    namespace Fmap {
        interface Morphism<T extends any, U extends any> {
            (val: T): U;
        }
    }
    namespace Apply {
        interface Morphism<T extends any, U extends any> {
            (val: T): Promise<U>;
        }
    }
}
export declare class PromiseCapability<T extends any> {
    resolve: Promise.Resolve<T>;
    reject: Promise.Reject;
    promise: Promise<T>;
    constructor();
}
export declare type Promisable<T extends any> = T | Promise<T>;
export default Promise;
