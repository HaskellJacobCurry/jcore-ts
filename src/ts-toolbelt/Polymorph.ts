export interface Polymorph {
	cast<T extends this>(): T;
}
export namespace Polymorph {
	export let fn = <A, B extends A>(a: A) => <B>a;
}
export let polymorph = Polymorph.fn;
export default Polymorph