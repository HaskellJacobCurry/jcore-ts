import { Json } from '../../../dist/Common';
export * from '../../../dist/Common';
declare let merge: typeof Json.assign;
export { merge };
declare let chain: <T>(_: T) => <U>(f: (next: typeof chain) => (_: T) => U) => U;
export { chain };
