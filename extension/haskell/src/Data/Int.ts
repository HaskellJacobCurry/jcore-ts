import {ISemiring} from './Semiring'
import {IRing} from './Ring'
import {IEq} from './Eq'
import {IOrd} from './Ord'
import {IShow} from './Show'
import {String} from './String'
import {Bool} from './Bool'
import {Ordering} from './Ordering'
import {
	Json,
	Function,
	reinterpret,
} from '../../dependency/jcore/dist/ts-toolbelt'

interface IInt {
	inc: (_: Int) => Int;
	dec: (_: Int) => Int;
	even: (_: Int) => Bool;
	odd: (_: Int) => Bool;
}

export let inc: IInt['inc'] = int => (int.value++, int);

export let dec: IInt['dec'] = int => (int.value--, int);

export let even: IInt['even'] = int => Bool(int.value % 2 == 0);

export let odd: IInt['odd'] = int => Bool(int.value % 2 != 0);

export let Show: IShow<Int> = ({
	show: int => String(`${int.value}`),
});

export let Semiring: ISemiring<Int> = ({
	add: int0 => int1 => Int(int0.value + int1.value),
	zero: () => Int(0),
	mul: int0 => int1 => Int(int0.value * int1.value),
	one: () => Int(1),
});

export let Ring: IRing<Int> = ({
	...Semiring,
	sub: int0 => int1 => Int(int0.value - int1.value),
	negate: int => Int(-int.value),
});

export let Eq: IEq<Int> & IEq.Ext<Int> = (
	Function.assign(<IEq<Int>>({
		eq: int0 => int1 => Bool(int0.value == int1.value),
	}))(Eq => Json.assign(Eq, IEq.Ext(Eq)))
);

export let Ord: IOrd<Int> & IOrd.Ext<Int> = (
	Function.assign(
		Function.define<IOrd<Int>>(Ord => ({
			...Eq,
			compare: int0 => int1 => (
				Ord().lt(int0)(int1).cata({
					True: () => Ordering.LT,
					False: () => (
						Ord().lt(int1)(int0).cata({
							True: () => Ordering.GT,
							False: () => Ordering.EQ,
						})
					)
				})
			),
			lt: int0 => int1 => Bool(int0.value < int1.value),
		}))
	)(Ord => Json.assign(Ord, IOrd.Ext(Ord)))
);

export interface Int {
	value: number;
}
export let Int = Json.assign(
	(value: number) => <Int>({value}), {
		inc,
		dec,
		even,
		odd,
		Show,
		Semiring,
		Ring,
		Eq,
		Ord,
	}
);