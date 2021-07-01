import {Transducer, Transducer_} from './Reducible'
import {Bool} from './Bool'
import {Int} from './Int'

let map: <A, C = A>(f: (_: A) => C) => <B>() => Transducer_<A, B, C> = (
	f => () => reducer => (
		b => a => reducer(b)(f(a))
	)
);
export {map}

let filter: <A>(f: (_: A) => Bool) => <B>() => Transducer<A, B> = (
	f => () => reducer => (
		b => a => (
			f(a).cata({
				False: () => b,
				True: () => reducer(b)(a),
			})
		)
	)
);
export {filter}

let take: (n: Int) => <A, B>() => Transducer<A, B> = (
	n => () => reducer => (
		b => a => (
			Int.Ord.notLt(n = Int.dec(n))(Int(0)).cata({
				False: () => b,
				True: () => reducer(b)(a),
			})
		)
	)
);
export {take}

let Transducer = {
	map,
	filter,
	take,
};
export {Transducer}