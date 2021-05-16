export interface Showable {
	show: (_: IShowable) => IString;
}
export namespace Showable {
	export let show: Showable['show'] = showable => showable.show();
}

export interface IShowable {
	show(): IString;
}

export interface IString {
	toString(): string;
}