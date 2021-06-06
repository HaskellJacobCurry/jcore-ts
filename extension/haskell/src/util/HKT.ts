interface HKT<URI, A> {
	readonly _URI: URI;
	readonly _A: A;
}
export {HKT}
export {HKT as HKT1}

interface HKT2<URI, A, B> extends HKT<URI, A> {
	readonly _B: B;
}
export {HKT2}

interface KindsByURI1<A> {}
export {KindsByURI1}
interface KindsByURI2<T0, A> {}
export {KindsByURI2}

type URI1 = keyof KindsByURI1<any>;
export {URI1}
type URI2 = keyof KindsByURI2<any, any>;
export {URI2}

type Kind1<URI extends URI1, A> = URI extends URI1 ? KindsByURI1<A>[URI] : any;
export {Kind1}
type Kind2<URI extends URI2, T0, A> = URI extends URI2 ? KindsByURI2<T0, A>[URI] : any;
export {Kind2}