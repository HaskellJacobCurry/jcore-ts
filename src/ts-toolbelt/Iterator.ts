import {Int} from './Int'
import {Bool} from './Bool'

export interface Iterator<T = any> {
	read: () => T;
	next: () => this;
	distance: (to: this) => Int;
	index: () => Int;
	clone: () => this;
	equal: (other: this) => Bool;
}
export type BaseIterator<T = any> = Iterator<T>;
export namespace BaseIterator {
	export type Value<TIterator> = (
		TIterator extends BaseIterator<infer T> ? 
		T : 
		TIterator extends BidirectionalIterator<infer T> ? 
		T :
		TIterator extends RandomAccessIterator<infer T> ? 
		T :
		TIterator extends OutputIterator<infer T> ? 
		T :
		TIterator extends MutableIterator<infer T> ? 
		T :
		never
	);
}

export interface InputIterator<T = any> extends Iterator<T> {}

export interface ForwardIterator<T = any> extends InputIterator<T> {}

export interface BidirectionalIterator<T = any> extends ForwardIterator<T> {
	prev: () => this;
}

export interface RandomAccessIterator<T = any> extends BidirectionalIterator<T> {
	advance: (step: Int) => this;
}

export interface OutputIterator<T = any> extends Iterator<T> {
	write: (value: T) => this;
}

export interface MutableIterator<T = any> extends InputIterator<T>, OutputIterator<T> {}

export interface ConstantIterator<T = any> extends InputIterator<T> {}