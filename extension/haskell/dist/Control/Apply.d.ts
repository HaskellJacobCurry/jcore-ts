import { HKT, URI1, URI2, Kind1, Kind2 } from '../util/HKT';
import { Functor, Functor1, Functor2, Functor2_ } from '../Data/Functor';
interface Apply<F> extends Functor<F> {
    readonly ap: <A, B>(_: HKT<F, (_: A) => B>) => (_: HKT<F, A>) => HKT<F, B>;
}
export { Apply };
export { Apply as IApply };
interface Apply1<URI extends URI1> extends Functor1<URI> {
    readonly ap: <A, B>(_: Kind1<URI, (_: A) => B>) => (_: Kind1<URI, A>) => Kind1<URI, B>;
}
export { Apply1 };
interface Apply2<URI extends URI2> extends Functor2<URI> {
    readonly ap: <T0, A, B>(_: Kind2<URI, T0, (_: A) => B>) => (_: Kind2<URI, T0, A>) => Kind2<URI, T0, B>;
}
export { Apply2 };
interface Apply2_<URI extends URI2, T0> extends Functor2_<URI, T0> {
    readonly ap: <A, B>(_: Kind2<URI, T0, (_: A) => B>) => (_: Kind2<URI, T0, A>) => Kind2<URI, T0, B>;
}
export { Apply2_ };
declare namespace Apply1 {
    interface Ext<URI extends URI1> {
        readonly lift2: <A, B, C>(_: (_: A) => (_: B) => C) => (_: Kind1<URI, A>) => (_: Kind1<URI, B>) => Kind1<URI, C>;
    }
    let Ext: <URI extends "Maybe">(Apply: Apply1<URI>) => Ext<URI>;
}
declare namespace Apply2 {
    interface Ext<URI extends URI2> {
        readonly lift2: <T0, A, B, C>(_: (_: A) => (_: B) => C) => (_: Kind2<URI, T0, A>) => (_: Kind2<URI, T0, B>) => Kind2<URI, T0, C>;
    }
    let Ext: <URI extends "Tuple">(Apply: Apply2<URI>) => Ext<URI>;
}
declare namespace Apply2_ {
    interface Ext<URI extends URI2, T0> {
        readonly lift2: <A, B, C>(_: (_: A) => (_: B) => C) => (_: Kind2<URI, T0, A>) => (_: Kind2<URI, T0, B>) => Kind2<URI, T0, C>;
    }
    let Ext: <URI extends "Tuple", T0>(Apply: Apply2_<URI, T0>) => Ext<URI, T0>;
}
export default Apply;
