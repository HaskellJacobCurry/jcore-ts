import {IBase, ctor} from '../IBase'
import {IFunctor} from './IFunctor'
import {ISemigroup} from './ISemigroup'
import {IMonoid} from './IMonoid'
import {S} from '../../dependency/jcore/dist/ts-toolbelt/common'
import {Int} from './Int'
import {
	Construct,
	Deconstruct,
	Json,
	Function,
	cast,
	reinterpret
} from '../../dependency/jcore/dist/ts-toolbelt'

type Tag = typeof Tag['Just'] | typeof Tag['Nothing'];
namespace Tag {
	export let Nothing = S('Nothing');
	export let Just = S('Just');
}

interface Cata<A extends IBase> {
	<T, U>(fs: {
		Nothing: () => T;
		Just: (a: A) => U;
	}): T | U;
}

export let Maybe = <A extends IBase>(A: Construct<A>) => (
	((Maybe_ = Maybe) => (
		class Maybe implements IBase, IFunctor<A> {
			construct = Maybe;
			static default = new Maybe();
			a = cast()<A>();
			tag: Tag = Tag.Nothing;
			cata: Cata<A> = fs => fs[Tag.Nothing]();
			static Just = (_: A) => new (Just(A))(_);
			static Nothing = () => new (Nothing(A))();
	
			map =
				<B extends IBase>
				(f: (_: A) => B) => {
					let MaybeB = Maybe_(cast()<Construct<B>>());
					let ret = cast()<Deconstruct<typeof MaybeB>>();
					((A, B = f(cast(A.default)<A>()).construct) => {
						ret = this.cata({
							Just: a => Maybe_(B).Just(f(a)),
							Nothing: () => Maybe_(B).Nothing(),
						});
					})(ctor(A));
					return ret;
				};
		}
	))()
);

export let Just = <A extends IBase>(A: Construct<A>) => (
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

export let Nothing = <A extends IBase>(A: Construct<A>) => (
	((Nothing_ = Nothing) => (
		class Nothing extends Maybe(A) {
			tag = Tag.Nothing;
			cata: Cata<A> = fs => fs[this.tag]();
		}
	))()
);

export type Maybe = Function.Ret<typeof Maybe>;

let withMonoid = <A extends ISemigroup>(A: Construct<A>) => (
	<TBase extends Construct<Maybe>>(Base: TBase) => (
		class Maybe extends Base implements ISemigroup {
			construct = Maybe;
			static default = new Base();
			append = (maybe: Maybe): Maybe => maybe;
		}
	)
);