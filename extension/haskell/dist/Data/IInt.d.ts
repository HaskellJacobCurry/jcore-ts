interface IInt {
    value: number;
}
export { IInt };
declare let add: <TInt extends IInt>(_: TInt) => (_: TInt) => TInt;
export { add };
declare let subtract: <TInt extends IInt>(_: TInt) => (_: TInt) => TInt;
export { subtract };
declare let multiply: <TInt extends IInt>(_: TInt) => (_: TInt) => TInt;
export { multiply };
declare let negate: <TInt extends IInt>(_: TInt) => TInt;
export { negate };
declare let IInt: ((value: number) => IInt) & {
    add: <TInt extends IInt>(_: TInt) => (_: TInt) => TInt;
    subtract: <TInt_1 extends IInt>(_: TInt_1) => (_: TInt_1) => TInt_1;
    multiply: <TInt_2 extends IInt>(_: TInt_2) => (_: TInt_2) => TInt_2;
    negate: <TInt_3 extends IInt>(_: TInt_3) => TInt_3;
};
export default IInt;
