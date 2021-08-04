import {LazySequence} from '../../../dist/Instance/Clojure/LazySequence'
import {Int} from '../../../dist/Instance/Data/Int'
import {Unit} from '../../../dist/Instance/Data/Unit'
import {Bool} from '../../../dist/Instance/Data/Bool'
import {Tuple} from '../../../dist/Instance/Data/Tuple'
import {Array} from '../../../dist/Instance/Mutable/Array'
import {
    trampoline,
    apply,
    apply_,
    merge,
} from '../../../dist/Common'

({
    0: () => (
        apply({
            lazy: (
                apply(
                    LazySequence<Int>(Int.Ring.add(Int(1)))(Int(1))
                )(_ => apply(
                    LazySequence.filter<Int>(Int.odd)(_)
                ))(_ => LazySequence.map(Int.Ring.mul(Int(3)))(_))
            )
        })(({lazy}) => (
            apply(
                trampoline<Unit>()((lazy: LazySequence<Int>) => next => (
                    Int.Ord.lt(lazy.value)(Int(45)).cata({
                        True: () => (
                            console.log({v: Int.Show.show(lazy.value).toString()}),
                            next(lazy.next())
                        ),
                        False: () => (
                            console.log('end'),
                            console.log({v: Int.Show.show(lazy.value).toString()}),
                            Unit()
                        )
                    })
                ))
            )(_ => _(lazy))
        ))
    ),
    1: () => (
        apply({
            lazy: (
                apply(
                    LazySequence(Int.inc)(Int(1))
                )(_ => apply(
                    LazySequence.filter<Int>(Int.odd)(_)
                ))(_ => apply(
                    LazySequence.map(Int.Ring.mul(Int(3)))(_)
                ))(_ => (
                    //LazySequence.take(Int(0))(_)
                    LazySequence.until<Int>(_ => Bool.fromI(Int.Ord.lt(Int(66))(_)))(_)
                ))
            )
        })(({lazy}) => (
            apply(
                LazySequence.evaluate<Int>(_ => (
                    console.log(Int.Show.show(_).toString()),
                    Unit()
                ))
            )(_ => _(lazy))
        ))
    ),
    2: () => (
        apply(
            apply((LazySequence(Int.inc)(Int(1))
            ))(LazySequence.take(Int(1e5)))
        )(lazy => apply(LazySequence.foldl(Int.add)(Int(0))(lazy)
        ))(_ => apply(Int.Show.show(_)
        ))(console.log)
    ),
    concat_: () => (
        apply({
            front: apply(LazySequence(Int.dec)(Int(55)))(LazySequence.until(Int.gt(Int(45)))),
            tail: apply(LazySequence(Int.inc)(Int(0)))(LazySequence.until(Int.lt(Int(15)))),
        })
        (_ => apply(
            apply(_)
            (({front, tail}) => merge(_, {
                merged: LazySequence.concat_(tail)(front),
            }))
        ))
        (({front, tail, merged}) => (
            apply(Array([front, tail, merged]))
            (Array.reduce<LazySequence<Int>, Unit>(() => _ => lazy => (
                console.log('----'),
                LazySequence.evaluate<Int>(_ => (
                    console.log(Int.Show.show(_).toString()),
                    Unit()
                ))(lazy),
                _
            ))(Unit()))
        ))
    ),
    concat: () => (
        apply([
            apply(LazySequence(Int.dec)(Int(55)))(LazySequence.until(Int.gt(Int(45)))),
            apply(LazySequence(Int.inc)(Int(0)))(LazySequence.until(Int.lt(Int(15)))), (
                apply(LazySequence(Int.inc)(Int(0)))
                (apply_(LazySequence.until(Int.lt(Int(25)))))
                (LazySequence.filter(Int.even))
            ), (
                apply(LazySequence(Int.dec)(Int(85)))
                (apply_(LazySequence.filter(Int.odd)))
                (LazySequence.until(Int.gt(Int(70))))
            ),
        ])
        (lazys => apply(
            apply(LazySequence(Int.inc)(Int(0)))
            (_ => apply(LazySequence.take(Int(lazys.length))(_)))
            (_ => LazySequence.map((i: Int) => lazys[i.value])(_))
        ))
        (apply_(LazySequence.concat))
        (LazySequence.evaluate<Int>(_ => (
            console.log(Int.Show.show(_).toString()),
            Unit()
        )))
    ),
    MDo: () => (
        LazySequence.Monad.Do(LazySequence.Monad)((Do, {assign, bind, run}) => (
            apply(Do)
            (_ => apply(assign(_)('a')(() => (
                apply(LazySequence(Int.inc)(Int(-7)))(LazySequence.until(Int.lt(Int(9))))
            ))))
            (_ => apply(assign(_)('b')(({a}) => (
                apply(LazySequence(Int.inc)(Int(-2)))(LazySequence.until(Int.lt(Int(15))))
            ))))
            (_ => apply(bind(_)(({a, b}) => (
                Int.eq(Int.add(a)(b))(Int(4)).cata({
                    True: () => LazySequence.singleton(Tuple(a, b)),
                    False: () => LazySequence.empty(),
                })
            ))))
            (_ => run(_)((_) => (
                console.log(Tuple.Show(Int.Show, Int.Show).show(_).toString()),
                LazySequence.empty()
            )))
        ))
    )
})['MDo']();