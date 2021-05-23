import {Int} from './Int'
import {
	Cast,
	Default,
} from './common'

export type Tuple = any[];
export namespace Tuple {
	export type Size<
		TTuple extends Tuple
	> = Cast<TTuple['length'], Int>;

	export type Prepend<
		TTuple extends Tuple,
		THead extends any = any
	> = ((_: THead, ...as: TTuple) => any) extends ((...as: infer TTuple) => any) ? TTuple : never;

	export type Head<
		TTuple extends Tuple
	> = (
		Size<TTuple> extends 0 ? never : (
			((...as: TTuple) => any) extends ((a: infer THead, ...as: any[]) => any) ? THead : never
		)
	);

	export type Tail<
		TTuple extends Tuple
	> = (
		Size<TTuple> extends 0 ? never : (
			((...as: TTuple) => any) extends ((a: any, ...as: infer TTail) => any) ? Cast<TTail, Tuple> : never
		)
	);

	export type HasTail<
		TTuple extends Tuple
	> = Size<TTuple> extends 0 ? 0 : Size<TTuple> extends 1 ? 0 : 1;

	export type Last<
		TTuple extends Tuple
	> = {
		1: Last<Tail<TTuple>>;
		0: Head<TTuple>;
	}[HasTail<TTuple>];

	export type ShiftN<
		TTuple extends Tuple,
		N extends Int,
		TTmp extends Tuple = []
	> = {
		0: ShiftN<Default<Tail<TTuple>, []>, N, Prepend<TTmp>>;
		1: TTuple;
	}[Size<TTmp> extends N ? 1 : 0];

	export type Shift<
		TTuple extends Tuple
	> = ShiftN<TTuple, 1>;

	export type Reverse<
		TTuple extends Tuple,
		TAcc extends Tuple = []
	> = {
		0: Reverse<Shift<TTuple>, Prepend<TAcc, Head<TTuple>>>;
		1: TAcc;
	}[Size<TTuple> extends 0 ? 1 : 0];
	
	export type PopN<
		TTuple extends Tuple,
		N extends Int
	> = (
		Reverse<
			ShiftN<(
				Reverse<TTuple> extends infer TTuple ? Cast<TTuple, Tuple> : never
			), N> extends infer TTuple ? Cast<TTuple, Tuple> : never
		>
	);

	export type Pop<
		TTuple extends Tuple
	> = PopN<TTuple, 1>;

	export type Append<
		TTuple extends Tuple,
		TLast extends any = any
	> = (
		Reverse<
			Prepend<(
				Reverse<TTuple> extends infer TTuple ? Cast<TTuple, Tuple> : never
			), TLast> extends infer TTuple ? Cast<TTuple, Tuple> : never
		>
	);

	export type Concat<
		TTuple extends Tuple,
		TTail extends Tuple
	> = {
		0: Concat<(
			Append<TTuple, Head<TTail>> extends infer TTuple ? Cast<TTuple, Tuple> : never
		), Tail<TTail>>;
		1: TTuple;
	}[Size<TTail> extends 0 ? 1 : 0];
}
export let Tuple = <TTuple extends Tuple>(...tuple: TTuple) => tuple;

export default Tuple