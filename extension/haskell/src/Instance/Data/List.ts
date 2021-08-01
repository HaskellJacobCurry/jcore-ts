import {List, HList as _HList, Constructor, URI} from '../../DataStructure/Data/List'
import {String} from './String'
import {Bool} from './Bool'
import {Maybe} from './Maybe'
import {Tuple} from './Tuple'
import {Int} from './Int'
import {Ordering} from './Ordering'
import {Foldable1} from '../../Typeclass/Data/Foldable'
import {Populatable1} from '../../Typeclass/Data/Populatable'
import {IShow} from '../../Typeclass/Data/Show'
import {Monoid} from '../../Typeclass/Data/Monoid'
import {
	Json,
	reinterpret,
	placeholder,
	cast,
	apply,
	create,
	trampoline_,
	trampoline,
	recurse,
} from '../../Common'

export * from '../../DataStructure/Data/List'

let show: <A>(_: IShow<A>) => (_: List<A>) => String = (
	<A>(ShowA: IShow<A>) => (listA: List<A>) => (
		apply(
			recurse<String>()((list: List<A>) => show => (
				list.cata({
					Nil: () => String('Nil'),
					Cons: (head, tail) => (
						apply(String('(Cons '))
						(_ => apply(String.append(_)(String.fromI(ShowA.show(head)))))
						(_ => apply(String.append(_)(String(' '))))
						(_ => apply(String.append(_)(show(tail))))
						(_ => String.append(_)(String(')')))
					)
				})
			))
		)(_ => _(listA))
	)
);
show = <A>(ShowA: IShow<A>) => (listA: List<A>) => (
	apply(
		trampoline<String>()((list: List<A>, done: Bool, acc: String, cont: trampoline.Cont<String>) => show => (
			done.cata({
				True: () => cont(acc),
				False: () => (
					list.cata({
						Nil: () => cont(String('Nil')),
						Cons: (head, tail) => (
							show(tail, done, acc, acc => (
								apply(String('(Cons '))
								(_ => apply(String.append(_)(String.fromI(ShowA.show(head)))))
								(_ => apply(String.append(_)(String(' '))))
								(_ => apply(String.append(_)(acc)))
								(_ => apply(String.append(_)(String(')'))))
								(acc => show(list, Bool.True, acc, cont))
							))
						)
					})
				)
			})
		))
	)(_ => _(listA, Bool.False, String.mempty(), _ => _))
);
export {show}

let foldMap: <G>(_: Monoid<G>) => <A>(_: (_: A) => G) => (_: List<A>) => G = (
	<G>(MonoidG: Monoid<G>) => <A>(f: (_: A) => G) => (listA: List<A>) => (
		apply({
			MonoidExtG: Monoid.Ext(MonoidG),
		})(({MonoidExtG}) => apply(
			recurse<G>()((acc: G, listA: List<A>) => foldMap => (
				listA.cata({
					Nil: () => acc,
					Cons: (head, tail) => apply(MonoidExtG.mappend(acc)(f(head)))(_ => foldMap(_, tail)),
				})
			))
		))(_ => _(MonoidG.mempty(), listA))
	)
);
foldMap = <G>(MonoidG: Monoid<G>) => <A>(f: (_: A) => G) => (listA: List<A>) => (
	apply({
		MonoidExtG: Monoid.Ext(MonoidG),
	})(({MonoidExtG}) => apply(
		trampoline<G>()((acc: G, listA: List<A>) => foldMap => (
			listA.cata({
				Nil: () => acc,
				Cons: (head, tail) => apply(MonoidExtG.mappend(acc)(f(head)))(_ => foldMap(_, tail)),
			})
		))
	))(_ => _(MonoidG.mempty(), listA))
);
export {foldMap}

let foldl: <A, B>(_: (_: B) => (_: A) => B) => (_: B) => (_: List<A>) => B = (
	<A, B>(f: (_: B) => (_: A) => B) => (b: B) => (listA: List<A>) => (
		apply(
			trampoline<B>()((acc: B, listA: List<A>) => foldl => (
				listA.cata({
					Nil: () => acc,
					Cons: (head, tail) => foldl(f(acc)(head), tail),
				})
			))
		)(_ => _(b, listA))
	)
);
export {foldl}

let foldr: <A, B>(_: (_: A) => (_: B) => B) => (_: B) => (_: List<A>) => B = (
	<A, B>(f: (_: A) => (_: B) => B) => (b: B) => (listA: List<A>) => (
		apply((List.reverse(listA)
		))(foldl<A, B>(b => a => f(a)(b))(b))
	)
);
export {foldr}

let seed: <A>() => List<A> = (
	() => List.Nil
);
export {seed}

let populate: <A>(..._s: A[]) => (_: List<A>) => List<A> = (
	<A>(...as: A[]) => (listA: List<A>) => (
		foldr<A, List<A>>(List.cons)(listA)(List(as))
	)
);
export {populate}

/** show :: (Show a) => Show (List a) => List a -> String */
let Show = <A>(_: IShow<A>) => (
	IShow.instantiate<List<A>>()(create<IShow<List<A>>>({
		show: show(_),
	}))
);
export {Show}

let Foldable = Foldable1.instantiate<URI>()(create<Foldable1<URI>>({
	URI,
	foldMap,
	foldr: placeholder(),
}));
Foldable.foldl = foldl;
Foldable.foldr = foldr;
export {Foldable}

let Populatable = Populatable1.instantiate<URI>()(create<Populatable1<URI>>({
	URI,
	seed,
	populate,
}));
export {Populatable}

interface HList extends _HList {
	Show: typeof Show;
	Foldable: typeof Foldable;
	Populatable: typeof Populatable;
	show: <A>(_: IShow<A>) => (_: List<A>) => String;
	foldMap: <G>(_: Monoid<G>) => <A>(_: (_: A) => G) => (_: List<A>) => G;
	foldl: <A, B>(_: (_: B) => (_: A) => B) => (_: B) => (_: List<A>) => B;
	foldr: <A, B>(_: (_: A) => (_: B) => B) => (_: B) => (_: List<A>) => B;
	seed: <A>() => List<A>;
	populate: <A>(..._s: A[]) => (_: List<A>) => List<A>;
}
export {HList}

type _List<A> = List<A>;
let _List: Constructor & HList = (
	Json.assign(List, {
		Show,
		Foldable,
		Populatable,
		show,
		foldMap,
		foldl,
		foldr,
		seed,
		populate,
	})
);

export {_List as List}
export default _List