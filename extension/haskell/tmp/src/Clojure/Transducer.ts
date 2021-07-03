import {Reducer} from './Reducer'
import {Reduced} from './Reduced'
import {Bool} from '../../../dist/Data/Bool'
import {ITuple} from '../Data/ITuple'
import {Int} from '../../../dist/Data/Int'
import {IEq} from '../../../dist/Data/Eq'
import {Maybe} from '../../../dist/Data/Maybe'
//import {List} from '../../../dist/Data/List'
import {
    apply
} from '../../../dist/util'

type Transducer<S0, S1, A, B> = <C>(_: Reducer<S0, A, C>) => Reducer<S1, B, C>;
export {Transducer}

let filter: <S>() => <A>(f: (_: A) => Bool) => Transducer<S, S, A, A> = (
    () => f => reducer => Reducer({
        state: reducer.state,
        complete: reducer.complete,
        step: s => acc => a => (
            f(a).cata({
                True: () => reducer.step(s)(acc)(a),
                False: () => ITuple(s, Reduced.Continue(acc)),
            })
        ),
    })
);
export {filter}

let take: <S, A>() => (n: Int) => Transducer<S, ITuple<Int, S>, A, A> = (
    () => n => reducer => Reducer({
        state: ITuple(n, reducer.state),
        complete: s => reducer.complete(ITuple.snd(s)),
        step: ({fst: n, snd: s}) => acc => a => (
            Int.Ord.gt(n)(Int(0)).cata({
                False: () => ITuple(ITuple(n, s), Reduced(acc)),
                True: () => (
                    apply((reducer.step(s)(acc)(a)
                    ))(({fst: s, snd: reduced}) => ITuple(ITuple(Int.dec(n), s), reduced))
                ),
            })
        ),
    })
);
export {take}

let map: <S>() => <A, B>(f: (_: A) => B) => Transducer<S, S, B, A> = (
    () => f => reducer => Reducer({
        state: reducer.state,
        complete: reducer.complete,
        step: s => acc => a => reducer.step(s)(acc)(f(a)),
    })
);
export {map}

let partitionBy: <S>() => <B>(_: IEq<B>) => <A>(f: (_: A) => B) => Transducer<S, ITuple<Maybe<ITuple<A[], B>>, S>, A[], B>;

let Transducer = {
    filter,
    take,
    map,
};