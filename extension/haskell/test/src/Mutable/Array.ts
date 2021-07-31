import {Array} from '../../../dist/Instance/Mutable/Array'
import {Int} from '../../../dist/Instance/Data/Int'
import {Unit} from '../../../dist/Instance/Data/Unit'
import {Tuple} from '../../../dist/Instance/Data/Tuple'
import {LazySequence} from '../../../dist/DataStructure/Clojure/LazySequence'
import {
	apply
} from '../../../dist/Common'

Array.Monad.Do(Array.Monad)((Do, {assign, bind, run}) => (
	apply(Do)
	(_ => apply(assign(_)('a')(() => (
		LazySequence.range(Int(-2), Int(6))(Array.Populatable)
	))))
	(_ => apply(assign(_)('b')(({a}) => (
		LazySequence.range(Int(-1), Int(5))(Array.Populatable)
	))))
	(_ => apply(bind(_)(({a, b}) => (
		Int.eq(Int.add(a)(b))(Int(3)).cata({
			True: () => Array.singleton(Tuple(a, b)),
			False: () => Array.empty(),
		})
	))))
	(_ => run(_)((_) => (
		console.log(Tuple.Show(Int.Show, Int.Show).show(_).toString()),
		Array.empty()
	)))
))