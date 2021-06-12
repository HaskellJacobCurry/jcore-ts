import { HKT, URI1, URI2, Kind1, Kind2 } from '../util/HKT';
import { IUnit } from './IUnit';
/**
 * class Functor f where
 *  fmap :: (a -> b) -> f a -> f b
 *   alias :: [(<$>)]
 * lfmap :: a -> f b -> f a
 *  alias :: [(<$)]
 * rfmap :: f a -> b -> f b
 *  alias :: [($>)]
 * ffmap :: f a -> (a -> b) -> f b
 *  alias :: [(<&>)]
 * void :: f a -> f Unit
 *
 * laws
 *  identity - fmap id == id
 *  composition - fmap (f . g) == fmap f . fmap g
 */
interface Functor<F> {
    URI: F;
    fmap: <A, B>(_: (_: A) => B) => (_: HKT<F, A>) => HKT<F, B>;
}
export { Functor };
export { Functor as IFunctor };
declare namespace Functor {
    interface Ext<F> {
        lfmap: <A>(_: A) => <B>(_: HKT<F, B>) => HKT<F, A>;
        rfmap: <A>(_: HKT<F, A>) => <B>(_: B) => HKT<F, B>;
        ffmap: <A>(_: HKT<F, A>) => <B>(_: (_: A) => B) => HKT<F, B>;
        void: <A>(_: HKT<F, A>) => HKT<F, IUnit>;
    }
    let Ext: <F>(_: Functor<F>) => Ext<F>;
}
interface Functor1<F extends URI1> {
    URI: F;
    fmap: <A, B>(_: (_: A) => B) => (_: Kind1<F, A>) => Kind1<F, B>;
}
export { Functor1 };
interface Functor2<F extends URI2> {
    URI: F;
    fmap: <A, B>(_: (_: A) => B) => <T0>(_: Kind2<F, T0, A>) => Kind2<F, T0, B>;
}
export { Functor2 };
interface Functor2_<F extends URI2, T0> {
    URI: F;
    fmap: <A, B>(_: (_: A) => B) => (_: Kind2<F, T0, A>) => Kind2<F, T0, B>;
}
export { Functor2_ };
declare namespace Functor1 {
    interface Ext<F extends URI1> {
        lfmap: <A>(_: A) => <B>(_: Kind1<F, B>) => Kind1<F, A>;
        rfmap: <A>(_: Kind1<F, A>) => <B>(_: B) => Kind1<F, B>;
        ffmap: <A>(_: Kind1<F, A>) => <B>(_: (_: A) => B) => Kind1<F, B>;
        void: <A>(_: Kind1<F, A>) => Kind1<F, IUnit>;
    }
    let Ext: <F extends URI1>(_: Functor1<F>) => Ext<F>;
}
declare namespace Functor2 {
    interface Ext<F extends URI2> {
        lfmap: <A>(_: A) => <T0, B>(_: Kind2<F, T0, B>) => Kind2<F, T0, A>;
        rfmap: <T0, A>(_: Kind2<F, T0, A>) => <B>(_: B) => Kind2<F, T0, B>;
        ffmap: <T0, A>(_: Kind2<F, T0, A>) => <B>(_: (_: A) => B) => Kind2<F, T0, B>;
        void: <T0, A>(_: Kind2<F, T0, A>) => Kind2<F, T0, IUnit>;
    }
    let Ext: <F extends URI2>(_: Functor2<F>) => Ext<F>;
}
declare namespace Functor2_ {
    interface Ext<F extends URI2, T0> {
        lfmap: <A>(_: A) => <B>(_: Kind2<F, T0, B>) => Kind2<F, T0, A>;
        rfmap: <A>(_: Kind2<F, T0, A>) => <B>(_: B) => Kind2<F, T0, B>;
        ffmap: <A>(_: Kind2<F, T0, A>) => <B>(_: (_: A) => B) => Kind2<F, T0, B>;
        void: <A>(_: Kind2<F, T0, A>) => Kind2<F, T0, IUnit>;
    }
    let Ext: <F extends URI2, T0>(_: Functor2_<F, T0>) => Ext<F, T0>;
}
export default Functor;
