import { HKT, URI1, URI2, Kind1, Kind2 } from '../util/HKT';
import { Apply, Apply1, Apply2, Apply2_ } from './Apply';
/**
 * class (Apply f) <= Applicative f where
 *  pure :: a -> f a
 * map :: Apply f => (a -> b) -> f a -> f b
 */
interface Applicative<F> extends Apply<F> {
    pure: <A>(_: A) => HKT<F, A>;
}
export { Applicative };
export { Applicative as IApplicative };
interface Applicative1<F extends URI1> extends Apply1<F> {
    pure: <A>(_: A) => Kind1<F, A>;
}
export { Applicative1 };
interface Applicative2<F extends URI2> extends Apply2<F> {
    pure: <T0, A>(_: A) => Kind2<F, T0, A>;
}
export { Applicative2 };
interface Applicative2_<F extends URI2, T0> extends Apply2_<F, T0> {
    pure: <A>(_: A) => Kind2<F, T0, A>;
}
export { Applicative2_ };
export default Applicative;
