import {A} from '../../../../dist/haskell/Data/Monoid/readme'
import {Maybe} from '../../../../dist/haskell/Data/Maybe'

let res = (
	Maybe(A).Lift(new A()).cata({
		Nothing: () => ['yo'],
		Just: (a) => 123
	})
);
console.log(res)