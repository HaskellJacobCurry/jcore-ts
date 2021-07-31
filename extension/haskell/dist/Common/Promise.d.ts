import { Promise, Promisable } from '../../dependency/jcore/dist/ts-toolbelt/Promise';
declare let PromiseCapability: new <T extends unknown = any>() => {
    resolve: Promise.Resolve<T>;
    reject: Promise.Reject;
    promise: Promise<T>;
};
export { Promise, Promisable, PromiseCapability };
