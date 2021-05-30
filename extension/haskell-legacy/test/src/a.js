let {Maybe, Just, Nothing} = require('../../dist/Data/Maybe');
let {Int} = require('../../dist/Data/Int');
let {Ring} = require('../../dist/Data/IRing');

let ret = Maybe(Int).Just(Int.Lift(33)).cata({
	Just: a => Ring.negate(a),
	Nothing: () => Int.Lift(1)
});

console.log(ret.show().toString())