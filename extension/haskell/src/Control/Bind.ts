import {HKT, URI1, URI2, Kind1, Kind2} from '../util/HKT'
import {Apply, Apply1, Apply2, Apply2_} from './Apply'

/**
 * class (Apply f) <= Bind f where
 *  bind :: f a -> (a -> f b) -> f b
 */

interface Bind<F> extends Apply<F> {
	bind: <A>(_: HKT<F, A>) => <B>(_: (_: A) => HKT<F, B>) => HKT<F, B>;
}
export {Bind}
export {Bind as IBind}

interface Bind1<F extends URI1> extends Apply1<F> {
	bind: <A>(_: Kind1<F, A>) => <B>(_: (_: A) => Kind1<F, B>) => Kind1<F, B>;
}
export {Bind1}

interface Bind2<F extends URI2> extends Apply2<F> {
	bind: <T0, A>(_: Kind2<F, T0, A>) => <B>(_: (_: A) => Kind2<F, T0, B>) => Kind2<F, T0, B>;
}
export {Bind2}

interface Bind2_<F extends URI2, T0> extends Apply2_<F, T0> {
	bind: <A>(_: Kind2<F, T0, A>) => <B>(_: (_: A) => Kind2<F, T0, B>) => Kind2<F, T0, B>;
}
export {Bind2_}

export default Bind