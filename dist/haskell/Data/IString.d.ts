import { Construct } from '../../ts-toolbelt';
export interface IString {
    construct: CString<IString>;
    toString(): string;
}
export interface CString<TString extends IString = IString> extends Construct<TString> {
}
