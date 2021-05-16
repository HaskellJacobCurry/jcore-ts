let {Bool} = require('../../../../dist/haskell/Data/Bool');
let {Showable} = require('../../../../dist/haskell/Data/Showable');
console.log({
	true: Showable.show(Bool.True_()).toString(),
	false: Bool.False_().show().toString()
})