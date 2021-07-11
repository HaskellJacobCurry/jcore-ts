import {LazySequence} from '../../../dist/DataStructure/Clojure/LazySequence'
import {Int} from '../../../dist/Instance/Data/Int'
import {Unit} from '../../../dist/Instance/Data/Unit'
import {Bool} from '../../../dist/Instance/Data/Bool'
import {
    trampoline,
    apply,
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
    )
})[2]();