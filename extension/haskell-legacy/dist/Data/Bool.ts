import {IBool, Bool as Bool_} from './IBool'
import {IShowable} from './IShowable'
import {String} from './String'
import {S} from '../../dependency/jcore/dist/ts-toolbelt/common'
import {
	Construct,
	Deconstruct,
	Json,
} from '../../dependency/jcore/dist/ts-toolbelt'

abstract class Bool implements IBool, IShowable {
	construct = Bool._True;
	abstract cata: Bool.Cata;
	static True = (): Bool => new Bool._True();
	static False = (): Bool => new Bool._False();

	show = (): String => (
		this.cata({
			True: () => String.Lift('True'),
			False: () => String.Lift('False'),
		})
	);

	not = (): Bool => (
		this.cata({
			True: () => Bool.False(),
			False: () => Bool.True(),
		})
	);

	and = (bool: Bool): Bool => (
		this.cata({
			True: () => bool,
			False: () => this,
		})
	);

	or = (bool: Bool): Bool => (
		this.cata({
			True: () => this,
			False: () => bool,
		})
	);
}
namespace Bool {
	export namespace Tag {
		export let True = S('True');
		export let False = S('False');
	}

	export interface Cata {
		<T, U>(fs: {
			True: () => T;
			False: () => U;
		}): T | U;
	}

	export class _True extends Bool {
		tag = Tag.True;
		cata: Cata = fs => fs[this.tag]();
	}

	export class _False extends Bool {
		tag = Tag.False;
		cata: Cata = fs => fs[this.tag]();
	}
}
type _Bool = Bool;
let _Bool = (
	(Bool => (
		Bool
	))(Json.assign(Bool, {
		Lift: (_: boolean) => _ ? Bool.True() : Bool.False(),
		not: (bool: Bool) => Bool_.not(bool),
		and: (bool0: Bool) => (bool1: Bool) => Bool_.and(bool0)(bool1),
		or: (bool0: Bool) => (bool1: Bool) => Bool_.or(bool0)(bool1),
	}))
);
export {_Bool as Bool}
export default _Bool