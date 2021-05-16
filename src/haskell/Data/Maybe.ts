import {IFunctor, Functor} from './IFunctor'
import {S} from '../../ts-toolbelt/common'
import {
	Construct,
	Deconstruct,
	Json
} from '../../ts-toolbelt'

abstract class Maybe<A = any> implements IFunctor<A> {
	a: A = <any>undefined;
	abstract cata: Maybe.Cata<A>;
	static Nothing = <A = any>(): Maybe<A> => new Maybe._Nothing<A>();
	static Just = <A>(a: A): Maybe<A> => ((just = new Maybe._Just<A>()) => just)();

	map<B>(f: (_: A) => B): IFunctor<B> {
		return <any>1;
	}
}
namespace Maybe {
	export namespace Tag {
		export let Nothing = S('Nothing');
		export let Just = S('Just');
	}

	export interface Cata<A extends any> {
		<T, U>(fs: {
			Nothing: () => T;
			Just: (a: A) => U;
		}): T | U;
	}

	export class _Nothing<A = any> extends Maybe<A> {
		tag = Tag.Nothing;
		cata: Cata<A> = fs => fs[this.tag]();
	}

	export class _Just<A = any> extends Maybe<A> {
		tag = Tag.Just;
		cata: Cata<A> = fs => fs[this.tag](this.a);
	}
}
let _Maybe = <A extends Construct>(a: A) => (
	(Maybe => (
		Maybe
	))(Json.assign(Maybe, {
		Lift: (a: Deconstruct<A>) => Maybe.Just(a),
	}))
);
export {_Maybe as Maybe}
export default Maybe