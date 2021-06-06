export interface HKT<URI, A> {
	readonly _URI: URI;
	readonly _A: A;
}

export interface KindsByURI1<A> {}
export interface KindsByURI2<T0, A> {}

export type URI1 = keyof KindsByURI1<any>;
export type URI2 = keyof KindsByURI2<any, any>;

export type Kind1<URI extends URI1, A> = URI extends URI1 ? KindsByURI1<A>[URI] : any;
export type Kind2<URI extends URI2, T0, A> = URI extends URI2 ? KindsByURI2<T0, A>[URI] : any;