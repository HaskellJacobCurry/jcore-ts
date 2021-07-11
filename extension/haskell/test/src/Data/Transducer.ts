import {Transducer} from '../../../dist/Typeclass/Data/Transducer'
import {Reducer} from '../../../dist/Typeclass/Data/Reducible'
import {Bool} from '../../../dist/Instance/Data/Bool'
import {Int} from '../../../dist/Instance/Data/Int'
import {
	apply,
	compose,
} from '../../../dist/Common'

let f = <A, B>(reducer: Reducer<A, B>) => (b: B, a: A) => reducer(b)(a);

apply(
	Array(...Array(1e1))
	.map((_, i) => i + 1)
	.reduce(
		apply(
			compose(
				Transducer.filter<number>(a => Bool(a % 2 == 0))<number[]>(),
				Transducer.map<number>(a => a * 2)<number[]>(),
				Transducer.take(Int(2))(),
			)(
				b => a => (b.push(a), b)
			)
		)(_ => f(_)),
		[]
	)
)(_ => (
	console.log({_})
));