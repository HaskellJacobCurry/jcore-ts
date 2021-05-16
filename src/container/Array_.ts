import {Array} from './Array'
import {curry} from '../common/curry'
import {
	Int,
	Curry,
	Function,
	Bool,
} from '../ts-toolbelt'

class Array_<
	T extends any = any
> extends Array<T> {
	static unlift<
		TThis extends Array,
		T extends Array.InferElem<TThis> = Array.InferElem<TThis>
	>(ins: TThis): T[] {
		return ins.unlift();
	}

	static size(ins: Array): Int {
		return ins.size()
	}

	static at<
		TThis extends Array = Array,
		T extends Array.InferElem<TThis> = Array.InferElem<TThis>
	>(): Curry<Function<[Int, TThis], T>> {
		return <any>curry((i: Int, ins: TThis): T => ins.at(i));
	}

	static _at<
		TThis extends Array = Array,
		T extends Array.InferElem<TThis> = Array.InferElem<TThis>
	>(): Curry<Function<[Int, TThis], T>> {
		return <any>curry((i: Int, ins: TThis): T => ins._at(i));
	}

	static foldl<
		TThis extends Array = Array,
		U extends any = any
	>(): Curry<Function<[Array.Foldl.Reducer<TThis, U>, U, TThis], U>> {
		return <any>curry((reducer: Array.Foldl.Reducer<TThis, U>, seed: U, ins: TThis): U => ins.foldl(reducer, seed));
	}

	static foldr<
		TThis extends Array = Array,
		U extends any = any
	>(): Curry<Function<[Array.Foldr.Reducer<TThis, U>, U, TThis], U>> {
		return <any>curry((reducer: Array.Foldr.Reducer<TThis, U>, seed: U, ins: TThis): U => ins.foldr(reducer, seed));
	}

	static push<
		TThis extends Array = Array,
		T extends Array.InferElem<TThis> = Array.InferElem<TThis>
	>(): Curry<Function<[T[], TThis], Array<T>>> {
		return <any>curry((vs: T[], ins: TThis): Array<T> => ins.push(vs));
	}

	static push_<
		TThis extends Array = Array,
		T extends Array.InferElem<TThis> = Array.InferElem<TThis>
	>(): Curry<Function<[T, TThis], Array<T>>> {
		return <any>curry((v: T, ins: TThis): Array<T> => ins.push_(v));
	}

	static pop<
		TThis extends Array,
		T extends Array.InferElem<TThis> = Array.InferElem<TThis>
	>(ins: TThis): T {
		return ins.pop();
	}
	
	static fmap<
		TThis extends Array = Array,
		U extends any = any,
		T extends Array.InferElem<TThis> = Array.InferElem<TThis>
	>(): Curry<Function<[Array.Fmap.Morphism<Array<T>, U>, TThis], Array<U>>> {
		return <any>curry((f: Array.Fmap.Morphism<Array<T>, U>, ins: TThis): Array<U> => ins.fmap(f));
	}
	
	static map<
		TThis extends Array = Array,
		U extends any = any,
		T extends Array.InferElem<TThis> = Array.InferElem<TThis>
	>(): Curry<Function<[Array.Map.Morphism<Array<T>, U>, TThis], Array<U>>> {
		return <any>curry((f: Array.Map.Morphism<Array<T>, U>, ins: TThis): Array<U> => ins.map(f));
	}
	
	static forEach<
		TThis extends Array = Array,
		T extends Array.InferElem<TThis> = Array.InferElem<TThis>
	>(): Curry<Function<[Array.ForEach.Callback<Array<T>>, TThis], Array<T>>> {
		return <any>curry((f: Array.ForEach.Callback<Array<T>>, ins: TThis): Array<T> => ins.forEach(f));
	}
	
	static filter<
		TThis extends Array = Array,
		T extends Array.InferElem<TThis> = Array.InferElem<TThis>
	>(): Curry<Function<[Array.Filter.Predicate<Array<T>>, TThis], Array<T>>> {
		return <any>curry((pred: Array.Filter.Predicate<Array<T>>, ins: TThis): Array<T> => ins.filter(pred));
	}
	
	static some<
		TThis extends Array = Array,
		T extends Array.InferElem<TThis> = Array.InferElem<TThis>
	>(): Curry<Function<[Array.Some.Predicate<Array<T>>, TThis], Bool>> {
		return <any>curry((pred: Array.Some.Predicate<Array<T>>, ins: TThis): Bool => ins.some(pred));
	}
	
	static every<
		TThis extends Array = Array,
		T extends Array.InferElem<TThis> = Array.InferElem<TThis>
	>(): Curry<Function<[Array.Every.Predicate<Array<T>>, TThis], Bool>> {
		return <any>curry((pred: Array.Every.Predicate<Array<T>>, ins: TThis): Bool => ins.every(pred));
	}
	
	static clone<
		TThis extends Array,
		T extends Array.InferElem<TThis> = Array.InferElem<TThis>
	>(ins: TThis): Array<T> {
		return ins.clone();
	}
	
	static reverse<
		TThis extends Array,
		T extends Array.InferElem<TThis> = Array.InferElem<TThis>
	>(ins: TThis): Array<T> {
		return ins.reverse();
	}
	
	static slice<
		TThis extends Array,
		T extends Array.InferElem<TThis> = Array.InferElem<TThis>
	>(): Curry<Function<[Int, Int, TThis], Array<T>>> {
		return <any>curry((iBegin: Int, iEnd: Int, ins: TThis): Array<T> => ins.slice(iBegin, iEnd));
	}
	
	static _slice<
		TThis extends Array,
		T extends Array.InferElem<TThis> = Array.InferElem<TThis>
	>(): Curry<Function<[Int, Int, TThis], Array<T>>> {
		return <any>curry((iBegin: Int, iEnd: Int, ins: TThis): Array<T> => ins._slice(iBegin, iEnd));
	}
}
export default Array_
export {Array_ as Array}