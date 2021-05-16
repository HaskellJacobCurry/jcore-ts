declare let PromiseCapability: {
    new <T extends unknown = any>(): {
        resolve: import("./Promise").default.Resolve<T>;
        reject: import("./Promise").default.Reject;
        promise: import("./Promise").default<T>;
    };
};
export default PromiseCapability;
export { PromiseCapability };
