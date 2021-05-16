export interface Showable {
    show: (_: IShowable) => IString;
}
export declare namespace Showable {
    let show: Showable['show'];
}
export interface IShowable {
    show(): IString;
}
export interface IString {
    toString(): string;
}
