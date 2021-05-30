import {Maybe, Just, Nothing} from '../../dist/Data/Maybe';
import {Int} from '../../dist/Data/Int';
import {Ring} from '../../dist/Data/IRing';

let ret = Maybe(Int).Just(Int.Lift(33)).cata({
	Just: a => Ring.negate(a),
	Nothing: () => Int.Lift(1)
});

console.log(ret.show().toString())