import {
	Bool,
	Int,
} from '../ts-toolbelt'

declare namespace Array {
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
class Array<
	T extends any = any
> {
	private _: T[];
	constructor(_: T[] = []) {
		this._ = _;
	}

	unlift(): T[] {return this._}
	static unlift<
		TThis extends Array,
		T extends Array.InferElem<TThis> = Array.InferElem<TThis>
	>(ins: TThis): T[] {return ins.unlift()}

	size(): Int {return this._.length}
	static size(ins: Array): Int {return ins.size()}

	at(i: Int): T {
		if (!(i < 0) && i < this._.length) {
			return this._[i];
		}
		throw new Error('Array.prototype.at');
	}
	static at<
		TThis extends Array,
		T extends Array.InferElem<TThis> = Array.InferElem<TThis>
	>(i: Int, ins: TThis): T {return ins.at(i)}

	_at(i: Int): T {
		return this._[i];
	}
	static _at<
		TThis extends Array,
		T extends Array.InferElem<TThis> = Array.InferElem<TThis>
	>(i: Int, ins: TThis): T {return ins._at(i)}

	foldl<
		U extends any
	>(reducer: Array.Foldl.Reducer<Array<T>, U>, seed: U): U {
		let acc = seed;
		for (let i = 0, iEnd = this._.length; i != iEnd; i++) {
			acc = reducer(acc, this._[i]);
		}
		return acc;
	}
	static foldl<
		TThis extends Array,
		U extends any
	>(reducer: Array.Foldl.Reducer<TThis, U>, seed: U, ins: TThis): U {return ins.foldl(reducer, seed)}

	foldr<
		U extends any
	>(reducer: Array.Foldr.Reducer<Array<T>, U>, seed: U): U {
		let acc = seed;
		for (let i = this._.length - 1; !(i < 0); i--) {
			acc = reducer(this._[i], acc);
		}
		return acc;
	}
	static foldr<
		TThis extends Array,
		U extends any
	>(reducer: Array.Foldr.Reducer<TThis, U>, seed: U, ins: TThis): U {return ins.foldr(reducer, seed)}

	push(vs: T[]): Array<T> {
		this._.push.apply(this._, vs);
		return this;
	}
	static push<
		TThis extends Array,
		T extends Array.InferElem<TThis> = Array.InferElem<TThis>
	>(vs: T[], ins: TThis): Array<T> {return ins.push(vs)}

	push_(v: T): Array<T> {
		this._[this._.length] = v;
		return this;
	}
	static push_<
		TThis extends Array,
		T extends Array.InferElem<TThis> = Array.InferElem<TThis>
	>(v: T, ins: TThis): Array<T> {return ins.push_(v)}

	pop(): T {
		if (this._.length != 0) {
			return <T>(this._.pop());
		}
		throw new Error('Array.prototype.pop');
	}
	static pop<
		TThis extends Array,
		T extends Array.InferElem<TThis> = Array.InferElem<TThis>
	>(ins: TThis): T {return ins.pop()}

	fmap<
		U extends any
	>(f: Array.Fmap.Morphism<Array<T>, U>): Array<U> {
		let i = 0;
		return this.foldl((acc, v) => {
			this._[i++] = <any>f(v);
			return acc;
		}, <Array<U>>this);
	}
	static fmap<
		TThis extends Array,
		U extends any,
		T extends Array.InferElem<TThis> = Array.InferElem<TThis>
	>(f: Array.Fmap.Morphism<Array<T>, U>, ins: TThis): Array<U> {return ins.fmap(f)}

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
	static map<
		TThis extends Array,
		U extends any,
		T extends Array.InferElem<TThis> = Array.InferElem<TThis>
	>(f: Array.Map.Morphism<Array<T>, U>, ins: TThis): Array<U> {return ins.map(f)}

	forEach(f: Array.ForEach.Callback<Array<T>>): Array<T> {
		for (let i = 0, iEnd = this._.length; i < iEnd; i++) {
			f(this._[i], i);
		}
		return this;
	}
	static forEach<
		TThis extends Array,
		T extends Array.InferElem<TThis> = Array.InferElem<TThis>
	>(f: Array.ForEach.Callback<Array<T>>, ins: TThis): Array<T> {return ins.forEach(f)}

	filter(pred: Array.Filter.Predicate<Array<T>>): Array<T> {
		let i = 0;
		return this.foldl((acc, v) => pred(v, i++) ? acc.push([v]) : acc, new Array());
	}
	static filter<
		TThis extends Array,
		T extends Array.InferElem<TThis> = Array.InferElem<TThis>
	>(pred: Array.Filter.Predicate<Array<T>>, ins: TThis): Array<T> {return ins.filter(pred)}

	some(pred: Array.Some.Predicate<Array<T>>): Bool {
		for (let i = 0, iEnd = this._.length; i < iEnd; i++) {
			if (pred(this._[i], i)) {
				return true;
			}
		}
		return false;
	}
	static some<
		TThis extends Array,
		T extends Array.InferElem<TThis> = Array.InferElem<TThis>
	>(pred: Array.Some.Predicate<Array<T>>, ins: TThis): Bool {return ins.some(pred)}

	every(pred: Array.Every.Predicate<Array<T>>): Bool {
		for (let i = 0, iEnd = this._.length; i < iEnd; i++) {
			if (!pred(this._[i], i)) {
				return false;
			}
		}
		return true;
	}
	static every<
		TThis extends Array,
		T extends Array.InferElem<TThis> = Array.InferElem<TThis>
	>(pred: Array.Every.Predicate<Array<T>>, ins: TThis): Bool {return ins.every(pred)}

	clone(): Array<T> {
		return this.foldl((acc, v) => acc.push([v]), new Array());
	}
	static clone<
		TThis extends Array,
		T extends Array.InferElem<TThis> = Array.InferElem<TThis>
	>(ins: TThis): Array<T> {return ins.clone()}

	reverse(): Array<T> {
		return this.foldr((v, acc) => acc.push([v]), new Array());
	}
	static reverse<
		TThis extends Array,
		T extends Array.InferElem<TThis> = Array.InferElem<TThis>
	>(ins: TThis): Array<T> {return ins.reverse()}

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
}

export default Array
export {Array}