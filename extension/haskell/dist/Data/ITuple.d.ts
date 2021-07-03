interface ITuple<A, B> {
    fst: A;
    snd: B;
}
export { ITuple };
declare let createTuple: <A, B>(fst: A, snd: B) => ITuple<A, B>;
export { createTuple as create };
declare let fst: <A, B>(_: ITuple<A, B>) => A;
export { fst };
declare let snd: <A, B>(_: ITuple<A, B>) => B;
export { snd };
declare let ITuple: (<A, B>(fst: A, snd: B) => ITuple<A, B>) & {
    create: <A, B>(fst: A, snd: B) => ITuple<A, B>;
    fst: <A_1, B_1>(_: ITuple<A_1, B_1>) => A_1;
    snd: <A_2, B_2>(_: ITuple<A_2, B_2>) => B_2;
};
