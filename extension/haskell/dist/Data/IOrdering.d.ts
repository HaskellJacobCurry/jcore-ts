interface IOrdering {
    cata: <T, U, K>(fs: {
        LT: () => T;
        GT: () => U;
        EQ: () => K;
    }) => T | U | K;
}
export { IOrdering };
export default IOrdering;
