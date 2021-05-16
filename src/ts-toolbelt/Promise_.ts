import {Function} from './Function'
import {Int} from './Int'
import {
	Cast
} from './common'

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
	constructor(executor: Promise.Executor<T>) {
		this.state = 'pending';
		this.value = undefined;
		this.next = () => {};
		let {resolve, reject} = this.createResolutionFunctions();
		executor(resolve, reject);
	}

	fmap<
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

	apply<
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
						if (Promise.validator(nextValue)) {
							nextValue.fmap(capability.resolve).catch(capability.reject);
						} else {
							capability.resolve(<U>nextValue);
						}
					} catch (reason) {
						capability.reject(reason);
					}
				} else {
					capability.resolve(<U>value);
				}
			} else if (state === 'rejected') {
				if (onRejected) {
					try {
						let nextValue = onRejected(value);
						if (Promise.validator(nextValue)) {
							nextValue.fmap(capability.resolve).catch(capability.reject);
						} else {
							capability.resolve(<K>nextValue);
						}
					} catch (err) {
						capability.reject(err);
					}
				} else {
					capability.reject(value);
				}
			}
		};
		return capability.promise;
	}

	catch<
		K extends any = never
	>(onRejected?: Promise.OnRejected<K>): Promise<T | K> {return this.then(undefined, onRejected)}

	static resolve<
		T extends any = void
	>(value?: T): Promise<Promise.Unlift<T>> {
		let capability = new PromiseCapability<Promise.Unlift<T>>();
		if (Promise.validator(value)) {
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

	private createResolutionFunctions() {
		let this_ = this;
		let resolve: Promise.Resolve<T> = value => {
			if (Promise.validator(value)) {
				(promise => {
					promise.fmap(value => queueMicrotask(() => this_.next(this_.state = promise.state, this_.value = value)));
				})(value);
			} else {
				queueMicrotask(() => this_.next(this_.state = 'fulfilled', this_.value = value));
			}
		};
		let reject: Promise.Reject = reason => {
			queueMicrotask(() => this_.next(this_.state = 'rejected', this_.value = reason));
		};
		return {resolve, reject};
	}
}
export namespace Promise {
	export let validator = (a: any): a is Promise => a && Function.validate(a.then);

	export type Unlift<
		T extends any
	> = {
		1: T extends Promise<infer T> ? Unlift<T> : never;
		0: T;
	}[T extends Promise ? 1 : 0];

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
}

export class PromiseCapability<
	T extends any
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

export type Promisable<T extends any> = T | Promise<T>;

export default Promise