import {ISemigroup} from './ISemigroup'
import {IEq} from './IEq'
import {IOrdering} from './IOrdering'
import {IShowable} from './IShowable'
import {String} from './String'
import {Bool} from './Bool'
import {S} from '../../ts-toolbelt/common'
import {
	Construct,
	Deconstruct,
	Json,
} from '../../ts-toolbelt'

abstract class Ordering implements IShowable, ISemigroup, IEq, IOrdering {
	abstract cata: Ordering.Cata;
	static LT = (): Ordering => new Ordering._LT();
	static GT = (): Ordering => new Ordering._GT();
	static EQ = (): Ordering => new Ordering._EQ();

	show = (): String => (
		this.cata({
			LT: () => String.Lift('LT'),
			GT: () => String.Lift('GT'),
			EQ: () => String.Lift('EQ'),
		})
	);

	append = (ordering: Ordering): Ordering => (
		this.cata({
			LT: () => this,
			GT: () => this,
			EQ: () => ordering,
		})
	);

	eq = (ordering: Ordering): Bool => (
		this.cata({
			LT: () => (
				ordering.cata({
					LT: () => Bool.True(),
					GT: () => Bool.False(),
					EQ: () => Bool.False(),
				})
			),
			GT: () => (
				ordering.cata({
					LT: () => Bool.False(),
					GT: () => Bool.True(),
					EQ: () => Bool.False(),
				})
			),
			EQ: () => (
				ordering.cata({
					LT: () => Bool.False(),
					GT: () => Bool.False(),
					EQ: () => Bool.True(),
				})
			)
		})
	);
}
namespace Ordering {
	export namespace Tag {
		export let LT = S('LT');
		export let GT = S('GT');
		export let EQ = S('EQ');
	}

	export interface Cata {
		<T, U, K>(fs: {
			LT: () => T;
			GT: () => U;
			EQ: () => K;
		}): T | U | K;
	}

	export class _LT extends Ordering {
		tag = Tag.LT;
		cata: Cata = fs => fs[this.tag]();
	}

	export class _GT extends Ordering {
		tag = Tag.GT;
		cata: Cata = fs => fs[this.tag]();
	}

	export class _EQ extends Ordering {
		tag = Tag.EQ;
		cata: Cata = fs => fs[this.tag]();
	}
}
type Ordering_ = Ordering;
namespace Ordering_ {
	export type Eq = (_: Ordering) => (_: Ordering) => Bool;
	export type Invert = (_: Ordering) => Ordering;
}
let Ordering_ = (
	(Ordering => (
		Ordering
	))(Json.assign(Ordering, {
		invert: <Ordering_.Invert>(ordering => (
			ordering.cata({
				LT: () => Ordering.LT(),
				GT: () => Ordering.LT(),
				EQ: () => ordering,
			})
		)),
	}))
);
export {Ordering_ as Ordering}
export default Ordering_