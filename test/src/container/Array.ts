import {Array} from '../../../dist/container/Array_'
import {
	Int,
	String,
} from '../../../dist/ts-toolbelt'

console.log(
	new Array([1, 5, 2]).fmap(v => v * 20).foldl((acc, v) => acc + v, 0)
);
console.log(
	Array.foldl<Array<Int>, String>()((acc, v) => `${acc}-${v}`, '0')(
		Array.push<Array<Int>>()([33, 22], new Array([1, 5, 2]))
			.reverse()
	)
);