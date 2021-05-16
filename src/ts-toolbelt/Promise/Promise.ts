import { resolve } from 'dns'
import {Function} from '../Function'
import {Int} from '../Int'
import {Tuple} from '../Tuple'
import {RejectionTracker} from './RejectionTracker'

export let makePromiseCapability = () => (
	class PromiseCapability<
		T extends any = any
	> {
		resolve: Promise.Resolve<T>;
		reject: Promise.Reject;
		promise: Promise<T>;
		constructor() {
			this.resolve = <any>undefined;
			this.reject = <any>undefined;
			this.promise = new Promise((resolve, reject) => {
				this.resolve = resolve;
				this.reject = reject;
			});
			this.resolve.constructor = PromiseCapability;
			this.reject.constructor = PromiseCapability;
			this.promise.constructor = PromiseCapability;
		}
	}
)

let PromiseCapability = makePromiseCapability();

type PromiseState = 'pending' | 'fulfilled' | 'rejected';
interface PromiseNext {
	(state: PromiseState, value: any): void;
}

export class Promise<
	T extends any = any
> {
	private state: PromiseState;
	private value: any;
	private next: PromiseNext;
	private static rejectionTracker = new RejectionTracker();

	constructor(executor: Promise.Executor<T>) {
		this.state = 'pending';
		this.value = undefined;
		this.next = () => {};
		let {resolve, reject} = this.createResolutionFunctions();
		executor(resolve, reject);
	}

	private fmap<
		U extends any
	>(morphism: Promise.Fmap.Morphism<T, U>): Promise<U> {
		let capability = new PromiseCapability<U>();
		this.next = (state, value) => {
			if (state === 'fulfilled') {
				try {
					capability.resolve(morphism(value));
				} catch (err) {
					capability.reject(err);
				}
			} else if (state === 'rejected') {
				capability.reject(value);
			}
		};
		return capability.promise;
	}

	private apply<
		U extends any
	>(morphism: Promise.Apply.Morphism<T, U>): Promise<U> {
		let capability = new PromiseCapability<U>();
		this.next = (state, value) => {
			if (state === 'fulfilled') {
				morphism(value).fmap(capability.resolve).catch(capability.reject);
			} else if (state === 'rejected') {
				capability.reject(value);
			}
		};
		return capability.promise;
	}

	then<
		U extends any = T,
		K extends any = never
	>(onFulfilled?: Promise.OnFulfilled<T, U>, onRejected?: Promise.OnRejected<K>): Promise<U | K> {
		let capability = new PromiseCapability<U | K>();
		this.next = (state, value) => {
			if (state === 'fulfilled') {
				if (onFulfilled) {
					try {
						let nextValue = onFulfilled(value);
						if (Promise.validator<U>(nextValue)) {
							nextValue.then(capability.resolve, capability.reject);
						} else {
							capability.resolve(<U>nextValue);
						}
					} catch (reason) {
						capability.reject(reason);
					}
				} else {
					capability.resolve(<U>value);
				}
				Promise.rejectionTracker.pause();
			} else if (state === 'rejected') {
				if (onRejected) {
					try {
						let nextValue = onRejected(value);
						if (Promise.validator<K>(nextValue)) {
							nextValue.then(capability.resolve, capability.reject);
						} else {
							capability.resolve(<K>nextValue);
						}
					} catch (err) {
						capability.reject(err);
					}
					if (onRejected.constructor !== PromiseCapability) {
						Promise.rejectionTracker.pause();
					} else {
						Promise.rejectionTracker.resume(value);
					}
				} else {
					capability.reject(value);
					Promise.rejectionTracker.resume(value);
				}
			}
		};
		this.conditionalRestartMicrotask();
		return capability.promise;
	}

	catch<
		K extends any = never
	>(onRejected?: Promise.OnRejected<K>): Promise<T | K> {return this.then(undefined, onRejected)}

	static resolve<
		T extends any = void
	>(value?: Promisable<T>): Promise<T> {
		let capability = new PromiseCapability<T>();
		if (Promise.validator<T>(value)) {
			value.then(capability.resolve, capability.reject);
		} else {
			capability.resolve(value);
		}
		return capability.promise;
		return new Promise((resolve, _) => resolve(value));
	}

	static reject(reason?: any): Promise<never> {
		let capability = new PromiseCapability<never>();
		capability.reject(reason);
		return capability.promise;
		return new Promise((_, reject) => reject(reason))
	}

	static await(ms: Int): Promise<void> {return new Promise(resolve => setTimeout(resolve, ms))}

	static all_<
		TIterable extends Tuple
	>(...iterable: TIterable): Promise.All_.Ret<TIterable> extends Promise<infer T> ? Promise<T> : never {
		let capability = new PromiseCapability();
		let values = <any[]>[];
		let resolve = (
			((nResolve = 0) => (
				(value: any, i: Int) => {
					values[i] = value;
					if (++nResolve == values.length) {
						capability.resolve(values);
					}
				}
			))()
		);
		for (let i = 0, iEnd = iterable.length; i < iEnd; i++) {
			values[values.length] = undefined;
			Promise.resolve(iterable[i]).then(value => resolve(value, i), capability.reject);
		}
		return capability.promise;
	}

	static race<
		TIterable extends Tuple
	>(iterable: TIterable): Promise.Race.Ret<TIterable> extends Promise<infer T> ? Promise<T> : never {
		let capability = new PromiseCapability();
		let isSettled = false;
		let resolve = (value: any) => {
			if (!isSettled) {
				isSettled = true;
				capability.resolve(value);
			}
		};
		let reject = (reason: any) => {
			if (!isSettled) {
				isSettled = true;
				capability.reject(reason);
			}
		}
		for (let i = 0, iEnd = iterable.length; i < iEnd; i++) {
			Promise.resolve(iterable[i]).then(resolve, reject);
		}
		return capability.promise;
	}

	private createResolutionFunctions() {
		let this_ = this;
		let resolve: Promise.Resolve<T> = value => {
			if (Promise.validator<T>(value)) {
				(promise => {
					promise.fmap(value => queueMicrotask(() => this_.next(this_.state = promise.state, this_.value = value)));
				})(value);
			} else {
				queueMicrotask(() => this_.next(this_.state = 'fulfilled', this_.value = value));
			}
		};
		let reject: Promise.Reject = reason => {
			queueMicrotask(() => this_.next(this_.state = 'rejected', this_.value = reason));
			Promise.rejectionTracker.resume(reason);
		};
		return {resolve, reject};
	}

	private conditionalRestartMicrotask() {
		if (this.state === 'fulfilled') {
			let {next, state, value} = this;
			queueMicrotask(() => next(state, value));
		}
	}
}
export namespace Promise {
	export let validator = <T extends any = any>(a: any): a is Promise<T> => a && Function.validate(a.then);

	export type Unlift<
		T extends any
	> = {
		0: T extends Promise<infer T> ? Unlift<T> : T;
	}[T extends any ? 0 : 0];

	export interface Resolve<
		T extends any
	> {
		(value?: Promisable<T>): void;
	}

	export interface Reject {
		(reason?: any): void;
	}

	export interface Executor<
		T extends any
	> {
		(resolve: Resolve<T>, reject: Reject): void;
	}

	export interface OnFulfilled<
		T extends any,
		U extends any
	> {
		(value: T): Promisable<U>;
	}

	export interface OnRejected<
		K extends any
	> {
		(reason: any): Promisable<K>;
	}

	export namespace Fmap {
		export interface Morphism<
			T extends any,
			U extends any
		> {
			(val: T): U;
		}
	}

	export namespace Apply {
		export interface Morphism<
			T extends any,
			U extends any
		> {
			(val: T): Promise<U>;
		}
	}

	export namespace All_ {
		export type Ret<
			TIterable extends Tuple
		> = Promise<{ [K in keyof TIterable]: Promise.Unlift<TIterable[K]> }>;
	}

	export namespace Race {
		export type Ret<
			TIterable extends Tuple
		> = Promise<(
			TIterable extends (infer T)[] ? (
				T extends any ? Promise.Unlift<T> : never
			) : never
		)>;
	}
}

export type Promisable<T extends any> = T | Promise<T>;

export default Promise