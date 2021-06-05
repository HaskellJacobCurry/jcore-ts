interface Bool {
    not: <TBool extends IBool>(_: TBool) => TBool;
    and: <TBool extends IBool>(_: TBool) => (_: TBool) => TBool;
    or: <TBool extends IBool>(_: TBool) => (_: TBool) => TBool;
}
declare let Bool: Bool;
export { Bool };
export { Bool as CBool };
export interface IBool {
    cata: <T, U>(fs: {
        False: () => T;
        True: () => U;
    }) => T | U;
    not(): IBool;
    and(other: IBool): IBool;
    or(other: IBool): IBool;
}
export default Bool;
