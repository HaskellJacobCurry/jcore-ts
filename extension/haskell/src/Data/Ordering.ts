import {IOrdering} from './IOrdering'
import {Eq as IEq} from './Eq'
import {Ord as IOrd} from './Ord'
import {IShow} from './Show'
import {String} from './String'
import {Bool} from './Bool'
import {
	Json,
	Function,
} from '../../dependency/jcore/dist/ts-toolbelt'

export interface LT {
	readonly tag: 'LT';
}
export interface EQ {
	readonly tag: 'EQ';
}
export interface GT {
	readonly tag: 'GT';
}

export let LT: Ordering = Json.assign(
	<LT>{tag: 'LT'}, <IOrdering>{
		cata: fs => fs['LT'](),
	}
);
export let EQ: Ordering = Json.assign(
	<EQ>{tag: 'EQ'}, <IOrdering>{
		cata: fs => fs['EQ'](),
	}
);
export let GT: Ordering = Json.assign(
	<GT>{tag: 'GT'}, <IOrdering>{
		cata: fs => fs['GT'](),
	}
);

export let Show: IShow<Ordering> = ({
	show: ordering => String(ordering.tag),
});

export let Eq: IEq<Ordering> & IEq.Ext<Ordering> = (
	(Eq => (
		Json.assign(Eq, IEq.Ext(Eq))
	))(<IEq<Ordering>>{
		eq: ordering0 => ordering1 => Bool(ordering0.tag === ordering1.tag),
	})
);

export let Ord: IOrd<Ordering> & IOrd.Ext<Ordering> = (
	(Ord => (
		Json.assign(Ord, IOrd.Ext(Ord))
	))(Function.define<IOrd<Ordering>>(Ord => ({
		...Eq,
		compare: ordering0 => ordering1 => (
			ordering0.cata({
				LT: () => (
					ordering1.cata({
						LT: () => EQ,
						EQ: () => LT,
						GT: () => LT,
					})
				),
				EQ: () => (
					ordering1.cata({
						LT: () => GT,
						EQ: () => EQ,
						GT: () => LT,
					})
				),
				GT: () => (
					ordering1.cata({
						LT: () => GT,
						EQ: () => GT,
						GT: () => EQ,
					})
				)
			})
		),
		lt: ordering0 => ordering1 => (
			Ord().compare(ordering0)(ordering1).cata({
				LT: () => Bool.True,
				EQ: () => Bool.False,
				GT: () => Bool.False,
			})
		),
	})))
);

interface COrdering {
	invert: (_: Ordering) => Ordering;
}
export let invert: COrdering['invert'] = ordering => (
	ordering.cata({
		LT: () => GT,
		EQ: () => EQ,
		GT: () => LT,
	})
);

export type Ordering = IOrdering & (LT | EQ | GT);
export let Ordering = {
	LT,
	EQ,
	GT,
	Show,
	Eq,
	Ord,
	invert,
};