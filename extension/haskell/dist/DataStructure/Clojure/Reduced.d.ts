declare type Reduced<A> = IReduced<A> & (Break<A> | Continue<A>);
export { Reduced };
declare const URI: "Reduced";
declare type URI = typeof URI;
declare module '../../Common/HKT' {
    interface KindsByURI1<A> {
        [URI]: Reduced<A>;
    }
}
export { URI };
interface IReduced<A> {
    cata: <T, U>(fs: {
        Break: (value: A) => T;
        Continue: (value: A) => U;
    }) => T | U;
}
interface Break<A> {
    tag: 'Break';
    value: A;
}
declare let Break: <A>(value: A) => Reduced<A>;
export { Break };
interface Continue<A> {
    tag: 'Continue';
    value: A;
}
declare let Continue: <A>(value: A) => Reduced<A>;
export { Continue };
declare let extract: <A>(_: Reduced<A>) => A;
export { extract };
declare type Constructor = typeof Break;
export { Constructor };
interface HReduced {
    URI: URI;
    Break: <A>(value: A) => Reduced<A>;
    Continue: <A>(value: A) => Reduced<A>;
    extract: <A>(_: Reduced<A>) => A;
}
declare let Reduced: Constructor & HReduced;
export default Reduced;
