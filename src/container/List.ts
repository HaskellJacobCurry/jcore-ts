import {S} from '../ts-toolbelt/common'
import {
	Int,
	Bool,
	trampoline,
	Function,
} from '../ts-toolbelt'

export abstract class List<T = any> {
	constructor() {}

	abstract cata<U, K>(fs: List.Cata.Morphisms<T, U, K>): U | K;

	static singleton<T>(a: T): List<T> {
		return new List.Cons(a, new List.Nil);
	}

	static range(min: Int, max: Int): List<Int> {
		if (max < min) throw new Error('List<T>.range(min: Int, max: Int): List<Int>');
		return trampoline<[Int, List<Int>?], List<Int>>(
			(range, i, list = new List.Nil) => (
				i < min ? 
				list :
				range(i - 1, new List.Cons(i, list))
			)
		)(max);
	}

	static cons<T>(a: T, as: List<T>): List<T> {
		return new List.Cons(a, as);
	}

	static snoc<T>(as: List<T>, a: T): List<T> {
		return new List.Cons(a, as);
	}

	static nil<T>(): List<T> {
		return new List.Nil;
	}

	foldl<U>(reducer: (acc: U, value: T) => U, seed: U): U {
		return trampoline<[List<T>?, U?], U>(
			(foldl, list = this, acc = seed) => (
				list.cata({
					Nil: () => acc,
					Cons: (a, as) => foldl(as, reducer(acc, a)),
				})
			)
		)();
	}

	foldr<U>(reducer: (value: T, acc: U) => U, seed: U): U {
		return this.reverse().foldl((acc, value) => reducer(value, acc), seed);
	}

	reverse(): List<T> {
		return this.foldl((acc, value) => new List.Cons(value, acc), List.nil());
	}

	append(list: List<T>): List<T> {
		return this.foldr(List.cons, list);
	}

	map<U>(f: (value: T) => U): List<U> {
		return this.foldr((value, acc) => List.cons(f(value), acc), List.nil());
	}

	flatMap<U>(listF: List<(value: T) => U>): List<U> {
		return trampoline<[List<Function<[T], U>>?, List<U>?], List<U>>(
			(flatMap, fs = listF, acc = List.nil()) => (
				fs.cata({
					Nil: () => acc,
					Cons: (f, fs) => flatMap(fs, acc.append(this.map(f))),
				})
			)
		)();
	}

	size(): Int {
		return this.foldl((acc, _) => acc + 1, 0);
	}

	head(): T | null {
		return this.cata({
			Nil: () => null,
			Cons: (a, _) => a,
		});
	}

	tail(): List<T> | null {
		return this.cata({
			Nil: () => null,
			Cons: (_, as) => as,
		});
	}

	last(): T | null {
		return trampoline<[List<T>?], T | null>(
			(last, list = this) => (
				list.cata({
					Nil: () => null,
					Cons: (a, as) => (
						as.cata({
							Nil: () => a,
							Cons: () => last(as),
						})
					),
				})
			)
		)();
	}

	uncons(): [T, List<T>] | null {
		return this.cata({
			Nil: () => null,
			Cons: (a, as) => [a, as],
		});
	}
	
	unsnoc(): [List<T>, T] | null {
		return trampoline<[List<T>?, List<T>?, trampoline.Cont<[List<T>, T] | null>?], [List<T>, T] | null>(
			(unsnoc, list = this, heads = List.nil(), cont = _ => _) => (
				list.cata({
					Nil: () => cont(null),
					Cons: (a, as) => (
						as.cata({
							Nil: () => cont([heads, a]),
							Cons: () => (
								unsnoc(as, heads, acc => (
									acc ?
									unsnoc(List.singleton(acc[1]), List.cons(a, acc[0]), cont) :
									unsnoc(List.nil(), heads, cont)
								))
							),
						})
					),
				})
			)
		)();
	}

	shift(): List<T> | null {
		return this.tail();
	}

	shiftN(n: Int): List<T> | null {
		return trampoline<[Int, List<T>?], List<T> | null>(
			(shiftN, n, acc = this) => (
				n == 0 ?
				acc :
				acc.cata({
					Nil: () => null,
					Cons: (_, as) => shiftN(n - 1, as),
				})
			)
		)(n);
	}

	pop(): List<T> | null {
		let tuple = this.unsnoc();
		return tuple ? tuple[0] : null;
	}

	popN(n: Int): List<T> | null {
		return trampoline<[Int, List<T>?], List<T> | null>(
			(popN, n, acc = this) => (
				n == 0 ?
				acc :
				((list = acc.pop()) => (
					list ?
					list.cata({
						Nil: () => null,
						Cons: () => popN(n - 1, list),
					}) : 
					null
				))()
			)
		)(n);
	}

	index(i: Int): T | null {
		if (i < 0) throw new Error('List<T>.prototype.index(i: Int): T | null');
		return trampoline<[Int, List<T>?], T | null>(
			(index, i, list = this) => (
				list.cata({
					Nil: () => null,
					Cons: (a, as) => i == 0 ? a : index(i - 1, as),
				})
			)
		)(i);
	}

	findIndex(f: (value: T) => Bool): Int {
		return trampoline<[Int?, List<T>?]>(
			(findIndex, i = 0, list = this) => (
				list.cata({
					Nil: () => -1,
					Cons: (a, as) => f(a) ? i : findIndex(i + 1, as),
				})
			)
		)();
	}

	insertAt(i: Int, value: T): List<T> | null {
		return trampoline<[Int, List<T>?, trampoline.Cont<List<T> | null>?], List<T> | null>(
			(insertAt, i, list = this, cont = _ => _) => (
				i == 0 ?
				cont(List.cons(value, list)) :
				list.cata({
					Nil: () => cont(null),
					Cons: (a, as) => (
						insertAt(i - 1, as, acc => (
							acc ? cont(List.cons(a, acc)) : cont(null)
						))
					),
				})
			)
		)(i);
		return Function.define<Function<[Int, List<T>?], List<T> | null>>(
			(insertAt) => (i, list = this) => (
				i == 0 ?
				List.cons(value, list) :
				list.cata({
					Nil: () => null,
					Cons: (a, as) => (
						((list = insertAt()(i - 1, as)) => (
							list ? List.cons(a, list) : null
						))()
					),
				})
			)
		)(i);
	}

	deleteAt(i: Int): List<T> | null {
		return trampoline<[Int, List<T>?, trampoline.Cont<List<T> | null>?], List<T> | null>(
			(deleteAt, i, list = this, cont = _ => _) => (
				list.cata({
					Nil: () => cont(null),
					Cons: (a, as) => (
						i == 0 ?
						cont(as) :
						deleteAt(i - 1, as, acc => (
							acc ? cont(List.cons(a, acc)) : cont(null)
						))
					),
				})
			)
		)(i);
		return Function.define<Function<[Int, List<T>?], List<T> | null>>(
			deleteAt => (i, list = this) => (
				list.cata({
					Nil: () => null,
					Cons: (a, as) => (
						i == 0 ?
						as :
						((list = deleteAt()(i - 1, as)) => (
							list ? List.cons(a, list) : null
						))()
					),
				})
			)
		)(i);
	}

	filter(f: (value: T) => Bool): List<T> {
		return this.foldr((value, acc) => f(value) ? List.cons(value, acc) : acc, List.nil());
	}
}
export namespace List {
	export namespace Tag {
		export let Nil = S('Nil');
		export let Cons = S('Cons');
	}
	export namespace Cata {
		export interface Morphisms<T, U, K> {
			Nil: () => U;
			Cons: (a: T, as: List<T>) => K;
		}
	}
	export class Nil<T = any> extends List<T> {
		private tag = Tag.Nil;

		constructor() {super()}
		
		cata<U, K>(fs: List.Cata.Morphisms<T, U, K>): U | K {
			return fs[this.tag]();
		}
	}
	export class Cons<T = any> extends List<T> {
		private tag = Tag.Cons;
		private a: T;
		private as: List<T>;
		constructor(a: T, as: List<T>) {
			super();
			this.a = a;
			this.as = as;
		}
		cata<U, K>(fs: List.Cata.Morphisms<T, U, K>): U | K {
			return fs[this.tag](this.a, this.as);
		}
	}
}