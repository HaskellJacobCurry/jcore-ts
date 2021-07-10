interface IBool {
    cata: <T, U>(fs: {
        False: () => T;
        True: () => U;
    }) => T | U;
    not: () => IBool;
    and: (_: IBool) => IBool;
    or: (_: IBool) => IBool;
}
export { IBool };
declare let not: <TBool extends IBool>(_: TBool) => TBool;
export { not };
declare let and: <TBool extends IBool>(_: TBool) => (_: TBool) => TBool;
export { and };
declare let or: <TBool extends IBool>(_: TBool) => (_: TBool) => TBool;
export { or };
declare let True: IBool;
export { True };
declare let False: IBool;
export { False };
declare let IBool: ((value: boolean) => IBool) & {
    not: <TBool extends IBool>(_: TBool) => TBool;
    and: <TBool_1 extends IBool>(_: TBool_1) => (_: TBool_1) => TBool_1;
    or: <TBool_2 extends IBool>(_: TBool_2) => (_: TBool_2) => TBool_2;
    True: IBool;
    False: IBool;
};
export default IBool;
