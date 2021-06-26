import {
	Json,
	reinterpret,
	cast,
	apply,
	create,
	trampoline_,
	trampoline,
	recurse,
	S
} from '../util'
import {Throwable} from '../util/Throwable'
import {String} from './String'
import {Bool} from './Bool'

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

/** head :: [a] -> a */
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

let List = {
	URI,
	Nil,
	Nil_,
	Cons,
	infer,
	create: create_,
	head,
	last,
};
export default List