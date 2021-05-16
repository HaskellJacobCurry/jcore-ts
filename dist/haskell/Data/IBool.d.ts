export interface Bool {
    not: <TBool extends IBool>(_: TBool) => TBool;
    and: <TBool extends IBool>(_: TBool) => (_: TBool) => TBool;
    or: <TBool extends IBool>(_: TBool) => (_: TBool) => TBool;
}
export declare namespace Bool {
    let not: Bool['not'];
    let and: Bool['and'];
    let or: Bool['and'];
}
export interface IBool {
    cata: IBool.Cata;
    not(): IBool;
    and(_: IBool): IBool;
    or(_: IBool): IBool;
}
export declare namespace IBool {
    interface Cata {
        <T, U>(fs: {
            True: () => T;
            False: () => U;
        }): T | U;
    }
}
