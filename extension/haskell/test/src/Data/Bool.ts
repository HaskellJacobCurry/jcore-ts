import {Bool} from '../../../dist/Data/Bool'
import IBool from '../../../dist/Data/IBool'

console.log(
	IBool.and(Bool.True)(IBool.not(Bool.True)).cata({
		True: () => 11,
		False: () => 's'
	})
)