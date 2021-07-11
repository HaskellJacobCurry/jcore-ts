import {Kind1, URI1} from '../../Common/HKT'
import {Populatable1} from '../../Typeclass/Data/Populatable'
import {Bool} from '../../Instance/Data/Bool'
import {Int} from '../../Instance/Data/Int'
import {Unit} from '../Data/Unit'
import {
    S,
    create,
    trampoline,
    recurse,
    apply,
    Json,
} from '../../Common'

interface LazySequence<T> {
    value: T;
    done: Bool;
    next: () => LazySequence<T>;
}
export {LazySequence}

const URI = S('LazySequence');
type URI = typeof URI;
declare module '../../Common/HKT' {
	interface KindsByURI1<A> {
		[URI]: LazySequence<A>;
	}
}
export {URI}

let createLazySequence: <T>(transform: (_: T) => T) => (seed: T) => LazySequence<T> = (
    <T>(transform: (_: T) => T) => (seed: T) => (
        apply(
            recurse<LazySequence<T>>()((value: T) => makeSequence => ({
                value,
                done: Bool.False,
                next: () => makeSequence(transform(value)),
            }))
        )(_ => _(seed))
    )
);
export {createLazySequence as create}

let map: <A, B>(f: (_: A) => B) => (_: LazySequence<A>) => LazySequence<B> = (
    <A, B>(f: (_: A) => B) => (lazyA: LazySequence<A>) => (
        apply(
            recurse<LazySequence<B>>()((lazy: LazySequence<A>) => map => ({
                value: f(lazy.value),
                done: lazy.done,
                next: () => map(lazy.next())
            }))
        )(_ => _(lazyA))
    )
);
export {map}

let filter: <A>(f: (_: A) => Bool) => (_: LazySequence<A>) => LazySequence<A> = (
    <A>(f: (_: A) => Bool) => (lazyA: LazySequence<A>) => (
        apply(
            recurse<LazySequence<A>>()((lazy: LazySequence<A>) => filter => (
                f(lazy.value).cata({
                    False: () => filter(lazy.next()),
                    True: () => create<LazySequence<A>>({
                        value: lazy.value,
                        done: lazy.done,
                        next: () => filter(lazy.next()),
                    }),
                })
            ))
        )(_ => _(lazyA))
    )
);
export {filter}

let until: <A>(f: (_: A) => Bool) => (_: LazySequence<A>) => LazySequence<A> = (
    <A>(f: (_: A) => Bool) => (lazyA: LazySequence<A>) => (
        apply(
            recurse<LazySequence<A>>()((lazy: LazySequence<A>) => until => (
                f(lazy.value).cata({
                    False: () => create<LazySequence<A>>({
                        value: lazy.value,
                        done: lazy.done,
                        next: () => until(lazy.next()),
                    }),
                    True: () => create<LazySequence<A>>({
                        value: lazy.value,
                        done: Bool.True,
                        next: () => lazy.next(),
                    }),
                })
            ))
        )(_ => _(lazyA))
    )
);
export {until}

let take: (_: Int) => <A>(_: LazySequence<A>) => LazySequence<A> = (
    (n: Int) => <A>(lazyA: LazySequence<A>) => (
        apply(
            recurse<LazySequence<A>>()((lazy: LazySequence<A>, n: Int) => take => (
                Int.Ord.gt(n)(Int(0)).cata({
                    False: () => create<LazySequence<A>>({
                        value: lazy.value,
                        done: Bool.True,
                        next: () => lazy.next()
                    }),
                    True: () => create<LazySequence<A>>({
                        value: lazy.value,
                        done: lazy.done,
                        next: () => take(lazy.next(), Int.sub(n)(Int(1))),
                    }),
                })
            ))
        )(_ => _(lazyA, n))
    )
);

let foldl: <A, B>(f: (_: B) => (_: A) => B) => (_: B) => (_: LazySequence<A>) => B = (
    <A, B>(f: (_: B) => (_: A) => B) => (b: B) => (lazyA: LazySequence<A>) => (
        apply(
            trampoline<B>()((lazy: LazySequence<A>, acc: B) => next => (
                lazy.done.cata({
                    True: () => acc,
                    False: () => next(lazy.next(), f(acc)(lazy.value)),
                })
            ))
        )(_ => _(lazyA, b))
    )
);
export {foldl}

let evaluate: <A>(f: (_: A) => Unit) => (_: LazySequence<A>) => Unit = (
    <A>(f: (_: A) => Unit) => (_: LazySequence<A>) => (
        foldl<A, Unit>(_ => f)(Unit())(_)
    )
);
export {evaluate}

let toPopulatable1: <F extends URI1>(_: Populatable1<F>) => <A>(_: LazySequence<A>) => Kind1<F, A> = (
    <F extends URI1>(PopulatableF: Populatable1<F>) => <A>(lazyA: LazySequence<A>) => (
        foldl<A, Kind1<F, A>>(acc => a => PopulatableF.populate(a)(acc))(PopulatableF.seed())(lazyA)
    )
);
export {toPopulatable1}

let toPopulatable: typeof toPopulatable1 = toPopulatable1;
export {toPopulatable}

type Constructor = typeof createLazySequence;
export {Constructor}

interface HLazySequence {
    URI: URI;
    create: <T>(transform: (_: T) => T) => (seed: T) => LazySequence<T>;
    map: <A, B>(f: (_: A) => B) => (_: LazySequence<A>) => LazySequence<B>;
    filter: <A>(f: (_: A) => Bool) => (_: LazySequence<A>) => LazySequence<A>;
    until: <A>(f: (_: A) => Bool) => (_: LazySequence<A>) => LazySequence<A>;
    take: (_: Int) => <A>(_: LazySequence<A>) => LazySequence<A>;
    foldl: <A, B>(f: (_: B) => (_: A) => B) => (_: B) => (_: LazySequence<A>) => B;
    evaluate: <A>(f: (_: A) => Unit) => (_: LazySequence<A>) => Unit;
    toPopulatable1: <F extends URI1>(_: Populatable1<F>) => <A>(_: LazySequence<A>) => Kind1<F, A>;
    toPopulatable: this['toPopulatable1'];
}
export {HLazySequence}

let LazySequence: Constructor & HLazySequence = (
    Json.assign(createLazySequence, {
        URI,
        create: createLazySequence,
        map,
        filter,
        until,
        take,
        foldl,
        evaluate,
        toPopulatable,
        toPopulatable1,
    })
);
export default LazySequence