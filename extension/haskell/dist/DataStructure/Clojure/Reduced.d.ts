declare type Reduced<A> = IReduced<A> & (Break<A> | Continue<A>);
export { Reduced };
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
declare let Reduced: (<A>(value: A) => Reduced<A>) & {
    Break: <A>(value: A) => Reduced<A>;
    Continue: <A_1>(value: A_1) => Reduced<A_1>;
    extract: <A_2>(_: Reduced<A_2>) => A_2;
};
