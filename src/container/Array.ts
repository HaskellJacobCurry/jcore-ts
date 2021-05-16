import {
	Bool,
	Int,
	Function,
	RandomAccessIterator,
	MutableIterator,
	Json,
} from '../ts-toolbelt'

export declare namespace Array {
	export type InferElem<
		TThis extends Array
	> = TThis extends Array<infer T> ? T : never;

	export namespace Foldl {
		export interface Reducer<
			TThis extends Array,
			U extends any
		> {
			(acc: U, v: InferElem<TThis>): U;
		}
	}

	export namespace Foldr {
		export interface Reducer<
			TThis extends Array,
			U extends any
		> {
			(v: InferElem<TThis>, acc: U): U;
		}
	}

	export namespace Fmap {
		export interface Morphism<
			TThis extends Array,
			U extends any
		> {
			(v: InferElem<TThis>): U;
		}
	}

	export namespace Map {
		export interface Morphism<
			TThis extends Array,
			U extends any
		> {
			(v: InferElem<TThis>, i: Int): U;
		}
	}

	export namespace ForEach {
		export interface Callback<
			TThis extends Array
		> {
			(v: InferElem<TThis>, i: Int): void;
		}
	}

	export namespace Filter {
		export interface Predicate<
			TThis extends Array
		> {
			(v: InferElem<TThis>, i: Int): Bool;
		}
	}

	export namespace Some {
		export import Predicate = Filter.Predicate;
	}

	export namespace Every {
		export import Predicate = Filter.Predicate;
	}
}
export class Array<
	T extends any = any
> {
	private _: T[];
	constructor(_: T[] = []) {
		this._ = _;
	}

	unlift(): T[] {return this._}

	size(): Int {return this._.length}

	at(i: Int): T {
		if (!(i < 0) && i < this._.length) {
			return this._[i];
		}
		throw new Error('Array.prototype.at');
	}

	_at(i: Int): T {
		return this._[i];
	}

	foldl<
		U extends any
	>(reducer: Array.Foldl.Reducer<Array<T>, U>, seed: U): U {
		let acc = seed;
		for (let i = 0, iEnd = this._.length; i != iEnd; i++) {
			acc = reducer(acc, this._[i]);
		}
		return acc;
	}

	foldr<
		U extends any
	>(reducer: Array.Foldr.Reducer<Array<T>, U>, seed: U): U {
		let acc = seed;
		for (let i = this._.length - 1; !(i < 0); i--) {
			acc = reducer(this._[i], acc);
		}
		return acc;
	}

	push(vs: T[]): Array<T> {
		this._.push.apply(this._, vs);
		return this;
	}

	push_(v: T): Array<T> {
		this._[this._.length] = v;
		return this;
	}

	pop(): T {
		if (this._.length != 0) {
			return <T>(this._.pop());
		}
		throw new Error('Array.prototype.pop');
	}

	fmap<
		U extends any
	>(f: Array.Fmap.Morphism<Array<T>, U>): Array<U> {
		let i = 0;
		return this.foldl((acc, v) => {
			this._[i++] = <any>f(v);
			return acc;
		}, <Array<U>>this);
	}

	map<
		U extends any
	>(f: Array.Map.Morphism<Array<T>, U>): Array<U> {
		let i = 0;
		return this.foldl((acc, v) => {
			this._[i] = <any>f(v, i);
			i += 1;
			return acc;
		}, <Array<U>>this);
	}

	forEach(f: Array.ForEach.Callback<Array<T>>): Array<T> {
		for (let i = 0, iEnd = this._.length; i < iEnd; i++) {
			f(this._[i], i);
		}
		return this;
	}

	filter(pred: Array.Filter.Predicate<Array<T>>): Array<T> {
		let i = 0;
		return this.foldl((acc, v) => pred(v, i++) ? acc.push([v]) : acc, new Array());
	}

	some(pred: Array.Some.Predicate<Array<T>>): Bool {
		for (let i = 0, iEnd = this._.length; i < iEnd; i++) {
			if (pred(this._[i], i)) {
				return true;
			}
		}
		return false;
	}

	every(pred: Array.Every.Predicate<Array<T>>): Bool {
		for (let i = 0, iEnd = this._.length; i < iEnd; i++) {
			if (!pred(this._[i], i)) {
				return false;
			}
		}
		return true;
	}

	clone(): Array<T> {
		return this.foldl((acc, v) => acc.push([v]), new Array());
	}

	reverse(): Array<T> {
		return this.foldr((v, acc) => acc.push([v]), new Array());
	}

	slice(iBegin: Int = 0, iEnd: Int = this.size()): Array<T> {
		if (iBegin < 0 || !(iBegin < iEnd) || this._.length < iEnd) {
			throw new Error('Array.prototype.slice');
		}
		return this._slice(iBegin, iEnd);
	}

	_slice(iBegin: Int, iEnd: Int): Array<T> {
		let sliced = new Array<T>();
		while (iBegin < iEnd) {
			sliced.push_(this._at(iBegin++));
		}
		return sliced;
	}

	begin(): RandomAccessIterator<T> & MutableIterator<T> {
		return this.mutableIterator(0);
	}

	end(): RandomAccessIterator<T> & MutableIterator<T> {
		return this.mutableIterator(this._.length);
	}

	cbegin(): RandomAccessIterator<T> {
		return this.constantIterator(0);
	}

	cend(): RandomAccessIterator<T> {
		return this.constantIterator(this._.length);
	}

	constantIterator(i: Int): RandomAccessIterator<T> {
		return Function.define(this.iteratorGenerator())(i);
	}

	mutableIterator(i: Int): RandomAccessIterator<T> & MutableIterator<T> {
		type Iterator = RandomAccessIterator<T> & MutableIterator<T>;
		return Function.define<(i: Int) => Iterator>(
			rec => i => (
				Json.assign(this.iteratorGenerator<Iterator>()(rec)(i), <Iterator>{
					write: value => (this._[i] = value, rec()(i))
				})
			)
		)(i);
	}

	iteratorGenerator<
		TIterator extends RandomAccessIterator<T> = RandomAccessIterator<T>
	>(): Function.Define.Generator<(i: Int) => TIterator> {
		return rec => i => <TIterator>({
			read: () => this._[i],
			next: () => rec()(i + 1),
			distance: to => to.index() - rec()(i).index(),
			index: () => i,
			clone: () => rec()(i),
			equal: other => rec()(i).index() == other.index(),
			prev: () => rec()(i - 1),
			advance: (step) => rec()(i + step),
		})
	}
}
export default Array