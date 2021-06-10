import {IOrdering} from './IOrdering'
import {Eq as IEq} from './Eq'
import {Ord as IOrd} from './Ord'
import {IShow} from './Show'
import {String} from './String'
import {Bool} from './Bool'
import {
	Json,
	Function,
} from '../util/common'

type Ordering = IOrdering & (LT | EQ | GT);
export {Ordering}

interface LT {
	readonly tag: 'LT';
}
let LT: Ordering = Json.assign(
	<LT>{tag: 'LT'}, <IOrdering>{
		cata: fs => fs['LT'](),
	}
);
export {LT}

interface EQ {
	readonly tag: 'EQ';
}
let EQ: Ordering = Json.assign(
	<EQ>{tag: 'EQ'}, <IOrdering>{
		cata: fs => fs['EQ'](),
	}
);
export {EQ}

interface GT {
	readonly tag: 'GT';
}
let GT: Ordering = Json.assign(
	<GT>{tag: 'GT'}, <IOrdering>{
		cata: fs => fs['GT'](),
	}
);
export {GT}

let from: (_: IOrdering) => Ordering = (
	ordering => (
		ordering.cata({
			LT: () => LT,
			EQ: () => EQ,
			GT: () => GT,
		})
	)
);
export {from}

let invert: (_: Ordering) => Ordering = (
	ordering => (
		ordering.cata({
			LT: () => GT,
			EQ: () => EQ,
			GT: () => LT,
		})
	)
);
export {invert}

let Show: IShow<Ordering> = ({
	show: ordering => String(ordering.tag),
});
export {Show}

let Eq: IEq<Ordering> & IEq.Ext<Ordering> = (
	Function.assign(<IEq<Ordering>>{
		eq: ordering0 => ordering1 => Bool(ordering0.tag === ordering1.tag),
	})(Eq => Json.assign(Eq, IEq.Ext(Eq)))
);
export {Eq}

let Ord: IOrd<Ordering> & IOrd.Ext<Ordering> = (
	Function.assign(
		Function.define<IOrd<Ordering>>(Ord => ({
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
		}))
	)(Ord => Json.assign(Ord, IOrd.Ext(Ord)))
);
export {Ord}

let Ordering = {
	LT,
	EQ,
	GT,
	from,
	invert,
	Show,
	Eq,
	Ord,
};