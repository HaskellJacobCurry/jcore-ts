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
    placeholder,
    reinterpret,
    flip,
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

let tryBreak: <A>(_: LazySequence<A>) => <B>(_: (_: LazySequence<A>) => LazySequence<B>) => LazySequence<B> = (
    lazy => f => (
        lazy.done.cata({
            True: () => reinterpret(lazy),
            False: () => f(lazy),
        })
    )
);

let empty: <A = never>() => LazySequence<A> = (
    <A>() => (
        apply(
            recurse<LazySequence<A>>()(() => empty => ({
                value: placeholder(),
                done: Bool.True,
                next: () => empty(),
            }))
        )(_ => _())
    )
);
export {empty}

let singleton: <A>(_: A) => LazySequence<A> = (
    <A>(a: A) => ({
        value: a,
        done: Bool.False,
        next: () => empty(),
    })
);
export {singleton}

let map: <A, B>(f: (_: A) => B) => (_: LazySequence<A>) => LazySequence<B> = (
    <A, B>(f: (_: A) => B) => (lazyA: LazySequence<A>) => (
        apply(
            recurse<LazySequence<B>>()((lazy: LazySequence<A>) => map => (
                tryBreak(lazy)(lazy => (
                    create<LazySequence<B>>({
                        value: f(lazy.value),
                        done: lazy.done,
                        next: () => map(lazy.next())
                    })
                ))
            ))
        )(_ => _(lazyA))
    )
);
export {map}

let filter: <A>(f: (_: A) => Bool) => (_: LazySequence<A>) => LazySequence<A> = (
    <A>(f: (_: A) => Bool) => (lazyA: LazySequence<A>) => (
        apply(
            recurse<LazySequence<A>>()((lazy: LazySequence<A>) => filter => (
                tryBreak(lazy)(lazy => (
                    f(lazy.value).cata({
                        False: () => filter(lazy.next()),
                        True: () => create<LazySequence<A>>({
                            value: lazy.value,
                            done: lazy.done,
                            next: () => filter(lazy.next()),
                        }),
                    })
                ))
            ))
        )(_ => _(lazyA))
    )
);
export {filter}

let until: <A>(f: (_: A) => Bool) => (_: LazySequence<A>) => LazySequence<A> = (
    <A>(f: (_: A) => Bool) => (lazyA: LazySequence<A>) => (
        apply(
            recurse<LazySequence<A>>()((lazy: LazySequence<A>) => until => (
                tryBreak(lazy)(lazy => (
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
            ))
        )(_ => _(lazyA))
    )
);
export {until}

let take: (_: Int) => <A>(_: LazySequence<A>) => LazySequence<A> = (
    (n: Int) => <A>(lazyA: LazySequence<A>) => (
        apply(
            recurse<LazySequence<A>>()((lazy: LazySequence<A>, n: Int) => take => (
                tryBreak(lazy)(lazy => (
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

let concat_: <A>(tail: LazySequence<A>) => (front: LazySequence<A>) => LazySequence<A> = (
    <A>(tail: LazySequence<A>) => (front: LazySequence<A>) => (
        apply(
            recurse<LazySequence<A>>()((lazy: LazySequence<A>) => concat => (
                lazy.done.cata({
                    True: () => tail,
                    False: () => ({
                        value: lazy.value,
                        done: lazy.done,
                        next: () => concat(lazy.next()),
                    }),
                })
            ))
        )(_ => _(front))
    )
);
export {concat_}

let concat: <A>(lazys: LazySequence<LazySequence<A>>) => LazySequence<A> = (
    <A>(lazys: LazySequence<LazySequence<A>>) => (
        apply(
            LazySequence.foldl<LazySequence<A>, LazySequence<A>>(flip(concat_))
        )(_ => _(empty())(lazys))
    )
);
export {concat}

let concatMap: <A, B>(f: (_: A) => LazySequence<B>) => (_: LazySequence<A>) => LazySequence<B> = (
	<A, B>(f: (_: A) => LazySequence<B>) => (arrayA: LazySequence<A>) => (
		apply(
			foldl<A, LazySequence<B>>(acc => a => concat_(f(a))(acc))(empty())
		)(_ => _(arrayA))
	)
);
export {concatMap}

let toPopulatable1: <F extends URI1>(_: Populatable1<F>) => <A>(_: LazySequence<A>) => Kind1<F, A> = (
    <F extends URI1>(PopulatableF: Populatable1<F>) => <A>(lazyA: LazySequence<A>) => (
        foldl<A, Kind1<F, A>>(acc => a => PopulatableF.populate(a)(acc))(PopulatableF.seed())(lazyA)
    )
);
export {toPopulatable1}

let toPopulatable: typeof toPopulatable1 = toPopulatable1;
export {toPopulatable}

let range: (min: Int, max: Int) => <F extends URI1>(_: Populatable1<F>) => Kind1<F, Int> = (
    (min, max) => PopulatableF => (
        apply(createLazySequence(Int.inc)(min))
        (_ => apply(until(Int.lt(max))(_)))
        (toPopulatable(PopulatableF))
    )
);
export {range}

type Constructor = typeof createLazySequence;
export {Constructor}

interface HLazySequence {
    URI: URI;
    create: <T>(transform: (_: T) => T) => (seed: T) => LazySequence<T>;
    empty: <A = never>() => LazySequence<A>;
    singleton: <A>(_: A) => LazySequence<A>;
    map: <A, B>(f: (_: A) => B) => (_: LazySequence<A>) => LazySequence<B>;
    filter: <A>(f: (_: A) => Bool) => (_: LazySequence<A>) => LazySequence<A>;
    until: <A>(f: (_: A) => Bool) => (_: LazySequence<A>) => LazySequence<A>;
    take: (_: Int) => <A>(_: LazySequence<A>) => LazySequence<A>;
    foldl: <A, B>(f: (_: B) => (_: A) => B) => (_: B) => (_: LazySequence<A>) => B;
    evaluate: <A>(f: (_: A) => Unit) => (_: LazySequence<A>) => Unit;
    concat_: <A>(tail: LazySequence<A>) => (front: LazySequence<A>) => LazySequence<A>;
    concat: <A>(lazys: LazySequence<LazySequence<A>>) => LazySequence<A>;
    concatMap: <A, B>(f: (_: A) => LazySequence<B>) => (_: LazySequence<A>) => LazySequence<B>;
    toPopulatable1: <F extends URI1>(_: Populatable1<F>) => <A>(_: LazySequence<A>) => Kind1<F, A>;
    toPopulatable: this['toPopulatable1'];
    range: (min: Int, max: Int) => <F extends URI1>(_: Populatable1<F>) => Kind1<F, Int>
}
export {HLazySequence}

let LazySequence: Constructor & HLazySequence = (
    Json.assign(createLazySequence, {
        URI,
        create: createLazySequence,
        empty,
        singleton,
        map,
        filter,
        until,
        take,
        foldl,
        evaluate,
        concat_,
        concat,
        concatMap,
        toPopulatable,
        toPopulatable1,
        range,
    })
);
export default LazySequence