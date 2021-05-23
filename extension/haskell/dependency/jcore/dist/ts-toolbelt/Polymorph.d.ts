export interface Polymorph {
    cast<T extends this>(): T;
}
export declare namespace Polymorph {
    let fn: <A, B extends A>(a: A) => B;
}
export declare let polymorph: <A, B extends A>(a: A) => B;
export default Polymorph;
