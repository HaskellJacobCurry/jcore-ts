import { Int } from '../Int';
import { Tuple } from '../Tuple';
export declare let makePromiseCapability: () => {
    new <T extends unknown = any>(): {
        resolve: Promise.Resolve<T>;
        reject: Promise.Reject;
        promise: Promise<T>;
    };
};
export declare class Promise<T extends any = any> {
    private state;
    private value;
    private next;
    private static rejectionTracker;
    constructor(executor: Promise.Executor<T>);
    private fmap;
    private apply;
    then<U extends any = T, K extends any = never>(onFulfilled?: Promise.OnFulfilled<T, U>, onRejected?: Promise.OnRejected<K>): Promise<U | K>;
    catch<K extends any = never>(onRejected?: Promise.OnRejected<K>): Promise<T | K>;
    static resolve<T extends any = void>(value?: Promisable<T>): Promise<T>;
    static reject(reason?: any): Promise<never>;
    static await(ms: Int): Promise<void>;
    static all_<TIterable extends Tuple>(...iterable: TIterable): Promise.All_.Ret<TIterable> extends Promise<infer T> ? Promise<T> : never;
    static race<TIterable extends Tuple>(iterable: TIterable): Promise.Race.Ret<TIterable> extends Promise<infer T> ? Promise<T> : never;
    private createResolutionFunctions;
    private conditionalRestartMicrotask;
}
export declare namespace Promise {
    let validator: <T extends unknown = any>(a: any) => a is Promise<T>;
    type Unlift<T extends any> = {
        0: T extends Promise<infer T> ? Unlift<T> : T;
    }[T extends any ? 0 : 0];
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
    namespace All_ {
        type Ret<TIterable extends Tuple> = Promise<{
            [K in keyof TIterable]: Promise.Unlift<TIterable[K]>;
        }>;
    }
    namespace Race {
        type Ret<TIterable extends Tuple> = Promise<(TIterable extends (infer T)[] ? (T extends any ? Promise.Unlift<T> : never) : never)>;
    }
}
export declare type Promisable<T extends any> = T | Promise<T>;
export default Promise;
