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
	recurse_,
	const_,
	S
} from '../util'
import {Throwable} from '../util/Throwable'
import {String} from './String'
import {Bool} from './Bool'
import {Foldable1} from './Foldable'
import {IShow} from './Show'
import {Monoid} from './Monoid'
import {Maybe} from './Maybe'
import {Tuple} from './Tuple'
import IString from './IString'

/** data List a = Nil | Cons a (List a) */
type List<A> = IList<A> & (Nil | Cons<A>) & {URI: URI};
export {List}

const URI = S('List');
type URI = typeof URI;
declare module '../util/HKT' {
	interface KindsByURI1<A> {
		[URI]: List<A>;
	}
}
export {URI}

interface IList<A> {
	cata: <T, U>(
		fs: {
			Nil: () => T;
			Cons: (head: A, tail: List<A>) => U;
		}
	) => T | U;
}

interface Nil {
	tag: 'Nil';
}
let Nil = create<List<never>>(
	Json.assign(
		{URI}, 
		create<Nil>({tag: 'Nil'}),
		create<IList<never>>({
			cata: fs => fs['Nil'](),
		})
	)
);
export {Nil}
let Nil_: <A>() => List<A> = (
	<A>() => Json.assign(
		{URI},
		create<Nil>({tag: 'Nil'}),
		create<IList<A>>({
			cata: fs => fs['Nil'](),
		})
	)
);
export {Nil_}

interface Cons<A> {
	tag: 'Cons';
	head: A;
	tail: List<A>;
}
let Cons: <A>(head: A, tail: List<A>) => List<A> = (
	<A>(head: A, tail: List<A>) => create<List<A>>(
		Json.assign(
			{URI},
			create<Cons<A>>({tag: 'Cons', head, tail}),
			create<IList<A>>({
				cata: fs => fs['Cons'](head, tail),
			})
		)
	)
);
export {Cons}

let infer: <TList>(_: TList) => List<TList extends List<infer T> ? T : never> = (
	list => reinterpret(list)
);
export {infer}

let create_: <A>(_: A[]) => List<A> = (
	<A>(as: A[]) => (
		apply(
			trampoline<List<A>>()((acc: List<A>, i: number) => collect => (
				Bool(i < 0).cata({
					False: () => collect(Cons(as[i], acc), i - 1),
					True: () => acc,
				})
			))
		)(_ => _(Nil, as.length - 1))
	)
);
export {create_ as create}

let cons: <A>(head: A) => (tail: List<A>) => List<A> = (
	head => tail => Cons(head, tail)
);
export {cons}

/** singleton :: a -> List a */
let singleton: <A>(_: A) => List<A> = (
	a => Cons(a, Nil)
);
export {singleton}

/** head :: List a -> a */
let head: <A>(_: List<A>) => A = (
	list => (
		list.cata({
			Nil: () => Throwable(String('EmptyList')),
			Cons: head => head,
		})
	)
);
export {head}

/** last :: [a] -> a  */
let last: <A>(_: List<A>) => A = (
	<A>(list: List<A>) => (
		recurse<A>()((_: List<A>) => last => (
			list.cata({
				Nil: () => Throwable(String('EmptyList')),
				Cons: (head, tail) => (
					tail.cata({
						Nil: () => head,
						Cons: () => last(tail),
					})
				),
			})
		))(list)
	)
);
last = <A>(list: List<A>) => (
	apply(
		trampoline_<[List<A>], A>((last, list) => (
			list.cata({
				Nil: () => Throwable(String('EmptyList')),
				Cons: (head, tail) => (
					tail.cata({
						Nil: () => head,
						Cons: () => last(tail),
					})
				),
			})
		))
	)(_ => _(list))
);
export {last}

/** tail :: [a] -> [a] */
let tail: <A>(_: List<A>) => List<A> = (
	list => (
		list.cata({
			Nil: () => Throwable(String('EmptyList')),
			Cons: (_, tail) => tail,
		})
	)
);
export {tail}

/** uncons :: List a -> Maybe (Tuple a (List a))  */
let uncons: <A>(_: List<A>) => Maybe<Tuple<A, List<A>>> = (
	list => (
		apply(
			list.cata({
				Nil: () => Maybe.Nothing,
				Cons: (head, tail) => Maybe.Just(Tuple(head, tail)),
			})
		)(Maybe.infer)
	)
);
export {uncons}

/** unsnoc :: List a -> Maybe (Tuple (List a) a) */
let unsnoc: <A>(_: List<A>) => Maybe<Tuple<List<A>, A>> = (
	<A>(list: List<A>) => (
		apply(
			recurse<Maybe<Tuple<List<A>, A>>>()((list: List<A>) => unsnoc => (
				list.cata({
					Nil: () => Maybe.Nothing,
					Cons: (head, tail) => (
						tail.cata({
							Nil: () => Maybe.Just(Tuple(Nil, head)),
							Cons: () => (
								apply((Tuple.Bifunctor.lmap(cons(head))
								))(_ => apply(Maybe.Functor.fmap(_)
								))(_ => _(unsnoc(tail)))
							),
						})
					),
				})
			))
		)(_ => _(list))
	)
);
unsnoc = <A>(list: List<A>) => (
	apply(
		trampoline<Maybe<Tuple<List<A>, A>>>()((list: List<A>, done: Bool, acc: Maybe<Tuple<List<A>, A>>, cont: trampoline.Cont<Maybe<Tuple<List<A>, A>>>) => unsnoc => (
			done.cata({
				True: () => cont(acc),
				False: () => (
					list.cata({
						Nil: () => cont(Maybe.Nothing),
						Cons: (head, tail) => (
							tail.cata({
								Nil: () => (
									apply((Tuple.Bifunctor.rmap<A, A>(const_(head))
									))(_ => apply(Maybe.Functor.fmap(_)
									))(_ => apply(_(acc)
									))(cont)
								),
								Cons: () => (
									unsnoc(tail, done, acc, acc => (
										apply((Tuple.Bifunctor.lmap(cons(head))
										))(_ => apply(Maybe.Functor.fmap(_)
										))(_ => apply(_(acc)
										))(acc => unsnoc(list, Bool.True, acc, cont))
									))
								),
							})
						),
					})
				)
			})
		))
	)(_ => _(list, Bool.False, Maybe.Just(Tuple(Nil, placeholder())), _ => _))
);
export {unsnoc}

let show: <A>(_: IShow<A>) => (_: List<A>) => IString = (
	<A>(ShowA: IShow<A>) => (listA: List<A>) => (
		apply(
			recurse<String>()((list: List<A>) => show => (
				list.cata({
					Nil: () => String('Nil'),
					Cons: (head, tail) => (
						apply((String('(Cons ')
						))(_ => apply(String.append(_)(String.fromI(ShowA.show(head)))
						))(_ => apply(String.append(_)(String(' '))
						))(_ => apply(String.append(_)(show(tail))
						))(_ => String.append(_)(String(')')))
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
								apply((String('(Cons ')
								))(_ => apply(String.append(_)(String.fromI(ShowA.show(head)))
								))(_ => apply(String.append(_)(String(' '))
								))(_ => apply(String.append(_)(acc)
								))(_ => apply(String.append(_)(String(')'))
								))(acc => show(list, Bool.True, acc, cont))
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
	_0 => _1 => _2 => Foldable.foldr(_0)(_1)(_2)
);
export {foldr}

/** show :: (Show a) => Show (List a) => List a -> String */
let Show = <A>(_: IShow<A>) => apply(_)(ShowA => (
	IShow.enhance<List<A>>({
		show: show(ShowA),
	})
));
export {Show}

let Foldable = Foldable1.enhance<URI>({
	URI,
	foldMap,
	foldr: placeholder(),
});
Foldable.foldl = foldl;
export {Foldable}

let List = {
	URI,
	Nil,
	Nil_,
	Cons,
	infer,
	create: create_,
	cons,
	singleton,
	head,
	last,
	tail,
	uncons,
	unsnoc,
	show,
	foldMap,
	foldl,
	foldr,
	Show,
	Foldable,
};
export default List