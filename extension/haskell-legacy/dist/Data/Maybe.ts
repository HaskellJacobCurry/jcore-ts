import {IFunctor} from './IFunctor'
import {IMonoid} from './IMonoid'
import {S} from '../../dependency/jcore/dist/ts-toolbelt/common'
import {Int} from './Int'
import {
	Construct,
	Deconstruct,
	Constructible,
	Json,
	Function,
	cast
} from '../../dependency/jcore/dist/ts-toolbelt'

type Tag = typeof Tag['Just'] | typeof Tag['Nothing'];
namespace Tag {
	export let Nothing = S('Nothing');
	export let Just = S('Just');
}

interface Cata<A extends Constructible> {
	<T, U>(fs: {
		Nothing: () => T;
		Just: (a: A) => U;
	}): T | U;
}

export let Maybe = <A extends Constructible>(A: Construct<A>) => (
	((Maybe_ = Maybe) => (
		class Maybe implements Constructible, IFunctor<A> {
			construct = Maybe;
			static default = new Maybe();
			a = cast()<A>();
			tag: Tag = Tag.Nothing;
			cata: Cata<A> = fs => fs[Tag.Nothing]();
			static Just = (_: A) => new (Just(A))(_);
			static Nothing = () => new (Nothing(A))();
	
			map =
				<B extends Constructible>
				(f: (_: A) => B) => {
					let MaybeB = Maybe_(cast()<Construct<B>>());
					let ret = cast()<Deconstruct<typeof MaybeB>>();
					ret = this.cata({
						Just: a => (
							((b = f(a), B = b.construct) => (
								Maybe_(B).Just(b)
							))()
						),
						Nothing: () => Maybe_(A).Nothing(),
					});
					return ret;
				};
		}
	))()
);

export let Just = <A extends Constructible>(A: Construct<A>) => (
	((Just_ = Just) => (
		class Just extends Maybe(A) {
			tag = Tag.Just;
			cata: Cata<A> = fs => fs[this.tag](this.a);
	
			constructor(a: A) {
				super();
				this.a = a;
			}
		}
	))()
);

export let Nothing = <A extends Constructible>(A: Construct<A>) => (
	((Nothing_ = Nothing) => (
		class Nothing extends Maybe(A) {
			tag = Tag.Nothing;
			cata: Cata<A> = fs => fs[this.tag]();
		}
	))()
);

export type Maybe = Function.Ret<typeof Maybe>;