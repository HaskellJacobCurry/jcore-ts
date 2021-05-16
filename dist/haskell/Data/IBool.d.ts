import { Construct } from '../../ts-toolbelt';
interface Bool {
    not: <TBool extends IBool>(_: TBool) => TBool;
    and: <TBool extends IBool>(_: TBool) => (_: TBool) => TBool;
    or: <TBool extends IBool>(_: TBool) => (_: TBool) => TBool;
}
declare namespace Bool {
    let not: Bool['not'];
    let and: Bool['and'];
    let or: Bool['and'];
}
export { Bool };
interface IBool {
    construct: CBool<IBool>;
    cata: IBool.Cata;
    not(): IBool;
    and(_: IBool): IBool;
    or(_: IBool): IBool;
}
declare namespace IBool {
    interface Cata {
        <T, U>(fs: {
            True: () => T;
            False: () => U;
        }): T | U;
    }
}
export { IBool };
export interface CBool<TBool extends IBool = IBool> extends Construct<TBool> {
}
