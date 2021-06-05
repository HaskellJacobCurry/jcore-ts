import {Bool} from '../../../dist/Data/Bool'

console.log(
	Bool.and(Bool.True)(Bool.not(Bool.True)).cata({
		True: () => 11,
		False: () => 's'
	})
)