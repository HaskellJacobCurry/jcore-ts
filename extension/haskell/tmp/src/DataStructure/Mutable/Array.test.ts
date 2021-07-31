import {Array} from './Array'
import {
	merge,
	S,
	placeholder,
	cast,
	apply,
	chain,
	trampoline,
} from '../../Common'

chain(placeholder()
)(next => _ => next(Array([1, 3, 22])
))(next => _ => next(Array.map<number, [number]>(i => a => [a * 3])(_)
))(next => _ => console.log(_))