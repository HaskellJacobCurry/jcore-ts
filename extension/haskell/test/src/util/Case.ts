import {Case} from '../../../dist/util/Case'
import {
	create
} from '../../../dist/util'

let merge: <T,U>(a: T, b:U) => T|U = <any>1;
let s = Case(44, ...create<[a: '', b: [123]]>(['', [123]]));
let t = merge(s, Case('yo', 3, []));
Case.infer(t).cata({
	'44': (a, b) => 1,
	'yo': () => 1,
	
});