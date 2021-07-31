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
	compose,
	id,
	S
} from '../../Common'
import {Case} from '../../Common/Case'
import {Throwable} from '../../Common/Throwable'
import {String} from '../../Instance/Data/String'
import {Bool} from '../../Instance/Data/Bool'
import {Foldable1} from '../../Typeclass/Data/Foldable'
import {Populatable1} from '../../Typeclass/Data/Populatable'
import {IShow} from '../../Typeclass/Data/Show'
import {Monoid} from '../../Typeclass/Data/Monoid'
import {Maybe} from '../../Instance/Data/Maybe'
import {Tuple} from '../../Instance/Data/Tuple'
import {Int} from '../../Instance/Data/Int'
import {Ordering} from '../../Instance/Data/Ordering'
import IString from '../../Typeclass/Data/IString'

/** data List a = Nil | Cons a (List a) */
type List<A> = IList<A> & (Nil | Cons<A>) & {URI: URI};
export {List}

const URI = S('List');
type URI = typeof URI;
declare module '../../Common/HKT' {
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

let createList: <A>(_: A[]) => List<A> = (
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
export {createList as create}

let cons: <A>(head: A) => (tail: List<A>) => List<A> = (
	head => tail => Cons(head, tail)
);
export {cons}

let snoc: <A>(init: List<A>) => (last: A) => List<A> = (
	<A>(init: List<A>) => (last: A) => (
		foldr<A, List<A>>(cons)(singleton(last))(init)
	)
);
export {snoc}

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
								apply(Tuple.Bifunctor.lmap(cons(head)))
								(_ => apply(Maybe.Functor.fmap(_)))
								(_ => _(unsnoc(tail)))
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
									apply(Tuple.Bifunctor.rmap<A, A>(const_(head)))
									(_ => apply(Maybe.Functor.fmap(_)))
									(_ => apply(_(acc)))
									(cont)
								),
								Cons: () => (
									unsnoc(tail, done, acc, acc => (
										apply(Tuple.Bifunctor.lmap(cons(head)))
										(_ => apply(Maybe.Functor.fmap(_)))
										(_ => apply(_(acc)))
										(acc => unsnoc(list, Bool.True, acc, cont))
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

let shift: <A>(_: List<A>) => Maybe<List<A>> = (
	<A>(list: List<A>) => (
		list.cata({
			Nil: () => Maybe.Nothing_<List<A>>(),
			Cons: (_, tail) => Maybe.Just(tail)
		})
	)
);
export {shift}

let shiftN: (n: Int) => <A>(_: List<A>) => Maybe<List<A>> = (
	(n: Int) => <A>(listA: List<A>) => (
		apply(
			trampoline<Maybe<List<A>>>()((acc: List<A>, n: Int) => shiftN => (
				Int.gt(n)(Int(0)).cata({
					False: () => Maybe.Just(acc),
					True: () => (
						shift(acc).cata({
							Nothing: () => Maybe.Nothing_<List<A>>(),
							Just: acc => shiftN(acc, Int.dec(n)),
						})
					),
				})
			))
		)(_ => _(listA, n))
	)
);
export {shiftN}

let pop: <A>(_: List<A>) => Maybe<List<A>> = (
	<A>(listA: List<A>) => (
		unsnoc(listA).cata({
			Nothing: () => Maybe.Nothing_<List<A>>(),
			Just: _ => Maybe.Just(Tuple.fst(_)),
		})
	)
);
export {pop}

let index: (i: Int) => <A>(_: List<A>) => Maybe<A> = (
	(i: Int) => <A>(listA: List<A>) => (
		apply(
			trampoline<Maybe<A>>()((listA: List<A>, i: Int) => index => (
				listA.cata({
					Nil: () => Maybe.Nothing_<A>(),
					Cons: (head, tail) => (
						Int.gt(i)(Int(0)).cata({
							False: () => Maybe.Just(head),
							True: () => index(tail, Int.dec(i)),
						})
					),
				})
			))
		)(_ => _(listA, i))
	)
);
export {index}

let find_: <A>(f: (_: A) => Bool) => (_: List<A>) => Maybe<Tuple<A, Int>> = (
	<A>(f: (_: A) => Bool) => (listA: List<A>) => (
		apply(
			trampoline<Maybe<Tuple<A, Int>>>()((listA: List<A>, i: Int) => find_ => (
				listA.cata({
					Nil: () => Maybe.Nothing_<Tuple<A, Int>>(),
					Cons: (head, tail) => (
						f(head).cata({
							True: () => Maybe.Just(Tuple(head, i)),
							False: () => find_(tail, Int.inc(i)),
						})
					),
				})
			))
		)(_ => _(listA, Int(0)))
	)
);
export {find_}

let find: <A>(f: (_: A) => Bool) => (_: List<A>) => Maybe<A> = (
	<A>(f: (_: A) => Bool) => (listA: List<A>) => (
		apply(find_(f)(listA))
		(Maybe.Functor.fmap<Tuple<A, Int>, A>(Tuple.fst))
	)
);
export {find}

let reverseMap: <A, B>(f: (_: A) => B) => (_: List<A>) => List<B> = (
	<A, B>(f: (_: A) => B) => (listA: List<A>) => (
		foldl<A, List<B>>(acc => a => cons(f(a))(acc))(Nil)(listA)
	)
);
export {reverseMap}

let map: <A, B>(f: (_: A) => B) => (_: List<A>) => List<B> = (
	<A, B>(f: (_: A) => B) => (listA: List<A>) => (
		apply(reverseMap(f)(listA))
		(reverse)
	)
);
export {map}

let reverse: <A>(_: List<A>) => List<A> = (
	<A>(_: List<A>) => reverseMap<A, A>(id)(_)
);
export {reverse}

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
		apply(reverse(listA))
		(foldl<A, B>(b => a => f(a)(b))(b))
	)
);
export {foldr}

/** merge :: (a -> a -> Ordering) -> List a -> List a -> List a */
let merge: <A>(f: (_: A) => (_: A) => Ordering) => (_: List<A>) => (_: List<A>) => List<A> = (
	<A>(f: (_: A) => (_: A) => Ordering) => (list0: List<A>) => (list1: List<A>) => (
		apply(
			recurse<List<A>>()((list0: List<A>, list1: List<A>) => merge => (
				apply(
					list0.cata({
						Nil: () => Case(0, list1),
						Cons: (head0, tail0) => (
							list1.cata({
								Nil: () => Case(0, list0),
								Cons: (head1, tail1) => Case(1, head0, tail0, head1, tail1),
							})
						)
					})
				)(Case.infer).cata({
					0: list => list,
					1: (head0, tail0, head1, tail1) => (
						Ordering.eq(f(head0)(head1))(Ordering.LT).cata({
							True: () => cons(head0)(merge(tail0, list1)),
							False: () => cons(head1)(merge(list0, tail1))
						})
					)
				})
			))
		)(_ => _(list0, list1))
	)
);
merge = <A>(f: (_: A) => (_: A) => Ordering) => (list0: List<A>) => (list1: List<A>) => (
	apply(
		trampoline<List<A>>()((list0: List<A>, list1: List<A>, done: Bool, acc: List<A>, cont: trampoline.Cont<List<A>>) => merge => (
			done.cata({
				True: () => cont(acc),
				False: () => (
					apply(
						list0.cata({
							Nil: () => Case(0, list1),
							Cons: (head0, tail0) => (
								list1.cata({
									Nil: () => Case(0, list0),
									Cons: (head1, tail1) => Case(1, head0, tail0, head1, tail1),
								})
							)
						})
					)(Case.infer).cata({
						0: list => merge(list0, list1, Bool.True, list, cont),
						1: (head0, tail0, head1, tail1) => (
							Ordering.eq(f(head0)(head1))(Ordering.LT).cata({
								True: () => (
									merge(tail0, list1, done, acc, acc => (
										merge(list0, list1, Bool.True, cons(head0)(acc), cont)
									))
								),
								False: () => (
									merge(list0, tail1, done, acc, acc => (
										merge(list0, list1, Bool.True, cons(head1)(acc), cont)
									))
								),
							})
						)
					})
				),
			})
		))
	)(_ => _(list0, list1, Bool.False, Nil, _ => _))
);
export {merge}

/** mergeAll :: (a -> a -> Ordering) -> List (List a) -> List a */
let mergeAll: <A>(f: (_: A) => (_: A) => Ordering) => (_: List<List<A>>) => List<A> = (
	<A>(f: (_: A) => (_: A) => Ordering) => (lists: List<List<A>>) => (
		apply({
			/** mergePairs :: List (List a) -> List (List a) */
			mergePairs: create<(_: List<List<A>>) => List<List<A>>>(
				lists => (
					apply(
						recurse<List<List<A>>>()((lists: List<List<A>>) => mergePairs => (
							apply(
								lists.cata({
									Nil: () => Case(0, Nil_<List<A>>()),
									Cons: (head0, tail0) => (
										tail0.cata({
											Nil: () => Case(0, lists),
											Cons: (head1, tail1) => Case(1, head0, head1, tail1),
										})
									)
								})
							)(Case.infer).cata({
								0: lists => lists,
								1: (head0, head1, tail) => cons(merge(f)(head0)(head1))(mergePairs(tail)),
							})
						))
					)(_ => _(lists))
				)
			),
		})(({mergePairs}) => apply(
			recurse<List<A>>()((lists: List<List<A>>) => mergeAll => (
				lists.cata({
					Nil: () => Nil_<A>(),
					Cons: (head, tail) => (
						tail.cata({
							Nil: () => head,
							Cons: () => compose(mergeAll, mergePairs)(lists),
						})
					),
				})
			))
		))(_ => _(lists))
	)
);
mergeAll = <A>(f: (_: A) => (_: A) => Ordering) => (lists: List<List<A>>) => (
	apply({
		/** mergePairs :: List (List a) -> List (List a) */
		mergePairs: create<(_: List<List<A>>) => List<List<A>>>(
			lists => (
				apply(
					trampoline<List<List<A>>>()((lists: List<List<A>>, done: Bool, acc: List<List<A>>, cont: trampoline.Cont<List<List<A>>>) => mergePairs => (
						done.cata({
							True: () => cont(acc),
							False: () => (
								apply(
									lists.cata({
										Nil: () => Case(0, Nil_<List<A>>()),
										Cons: (head0, tail0) => (
											tail0.cata({
												Nil: () => Case(0, lists),
												Cons: (head1, tail1) => Case(1, head0, head1, tail1),
											})
										)
									})
								)(Case.infer).cata({
									0: lists => mergePairs(List.Nil, Bool.True, lists, cont),
									1: (head0, head1, tail) => (
										mergePairs(tail, done, acc, acc => (
											mergePairs(List.Nil, Bool.True, cons(merge(f)(head0)(head1))(acc), cont)
										))
									),
								})
							),
						})
					))
				)(_ => _(lists, Bool.False, List.Nil, _ => _))
			)
		),
	})(({mergePairs}) => apply(
		trampoline<List<A>>()((lists: List<List<A>>) => mergeAll => (
			lists.cata({
				Nil: () => Nil_<A>(),
				Cons: (head, tail) => (
					tail.cata({
						Nil: () => head,
						Cons: () => compose(mergeAll, mergePairs)(lists),
					})
				),
			})
		))
	))(_ => _(lists))
);
export {mergeAll}

/** sortBy :: (a -> a -> Ordering) -> List a -> List a */
let sortBy: <A>(f: (_: A) => (_: A) => Ordering) => (_: List<A>) => List<A> = (
	<A>(f: (_: A) => (_: A) => Ordering) => (list: List<A>) => (
		apply({
			/** sequences :: List a -> List (List a) */
			sequences: recurse<List<List<A>>>()((list: List<A>) => sequences => (
				apply({
					/** descending :: a -> List a -> List a -> List (List a) */
					descending: recurse<List<List<A>>>()((head: A, acc: List<A>, list: List<A>) => descending => (
						list.cata({
							Nil: () => singleton(cons(head)(acc)),
							Cons: (head0, tail0) => (
								Ordering.eq(f(head)(head0))(Ordering.GT).cata({
									True: () => descending(head0, cons(head)(acc), tail0),
									False: () => cons(cons(head)(acc))(sequences(list)),
								})
							)
						})
					)),
					/** ascending :: a -> (List a -> List a) -> List a -> List (List a) */
					ascending: recurse<List<List<A>>>()((head: A, acc: (_: List<A>) => List<A>, list: List<A>) => ascending => (
						list.cata({
							Nil: () => singleton(acc(singleton(head))),
							Cons: (head0, tail0) => (
								Ordering.eq(f(head)(head0))(Ordering.GT).cata({
									False: () => ascending(head0, tail1 => acc(cons(head)(tail1)), tail0),
									True: () => cons(acc(singleton(head)))(sequences(list)),
								})
							),
						})
					)),
				})(({descending, ascending}) => (
					list.cata({
						Nil: () => Nil_<List<A>>(),
						Cons: (head0, tail0) => (
							tail0.cata({
								Nil: () => singleton(list),
								Cons: (head1, tail1) => (
									Ordering.eq(f(head0)(head1))(Ordering.GT).cata({
										True: () => descending(head1, singleton(head0), tail1),
										False: () => ascending(head1, cons(head0), tail1),
									})
								)
							})
						),
					})
				))
			)),
		})(({sequences}) => compose(mergeAll(f), sequences)(list))
	)
);
export {sortBy}

type Constructor = typeof createList;
export {Constructor}

interface HList {
	URI: URI;
	Nil: List<never>;
	Nil_: <A>() => List<A>;
	Cons: <A>(head: A, tail: List<A>) => List<A>;
	infer: typeof infer;
	create: <A>(_: A[]) => List<A>;
	cons: <A>(head: A) => (tail: List<A>) => List<A>;
	snoc: <A>(init: List<A>) => (last: A) => List<A>;
	singleton: <A>(_: A) => List<A>;
	head: <A>(_: List<A>) => A;
	last: <A>(_: List<A>) => A;
	tail: <A>(_: List<A>) => List<A>;
	uncons: <A>(_: List<A>) => Maybe<Tuple<A, List<A>>>;
	unsnoc: <A>(_: List<A>) => Maybe<Tuple<List<A>, A>>
	shift: <A>(_: List<A>) => Maybe<List<A>>;
	shiftN: (n: Int) => <A>(_: List<A>) => Maybe<List<A>>;
	pop: <A>(_: List<A>) => Maybe<List<A>>;
	index: (i: Int) => <A>(_: List<A>) => Maybe<A>;
	find_: <A>(f: (_: A) => Bool) => (_: List<A>) => Maybe<Tuple<A, Int>>;
	find: <A>(f: (_: A) => Bool) => (_: List<A>) => Maybe<A>;
	reverseMap: <A, B>(f: (_: A) => B) => (_: List<A>) => List<B>;
	map: <A, B>(f: (_: A) => B) => (_: List<A>) => List<B>;
	reverse: <A>(_: List<A>) => List<A>;
	merge: <A>(f: (_: A) => (_: A) => Ordering) => (_: List<A>) => (_: List<A>) => List<A>;
	mergeAll: <A>(f: (_: A) => (_: A) => Ordering) => (_: List<List<A>>) => List<A>;
	sortBy: <A>(f: (_: A) => (_: A) => Ordering) => (_: List<A>) => List<A>;
}
export {HList}

let List: Constructor & HList = (
	Json.assign(createList, {
		URI,
		Nil,
		Nil_,
		Cons,
		infer,
		create: createList,
		cons,
		snoc,
		singleton,
		head,
		last,
		tail,
		uncons,
		unsnoc,
		shift,
		shiftN,
		pop,
		index,
		find_,
		find,
		reverseMap,
		map,
		reverse,
		merge,
		mergeAll,
		sortBy,
	})
);
export default List