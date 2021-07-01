import { HKT, URI1, URI2, Kind1, Kind2 } from '../util/HKT';
import { Apply, Apply1, Apply2, Apply2_ } from './Apply';
/**
 * class (Apply f) <= Applicative f where
 *  pure :: a -> f a
 *
 * laws
 *  identity - pure id <*> v = v
 *  composition - pure (.) <*> u <*> v <*> w = u <*> (v <*> w)
 *  homomorphism - pure f <*> pure x = pure (f x)
 *  interchange - u <*> pure y = pure ($ y) <*> u
 */
interface IApplicative<F> {
    pure: <A>(_: A) => HKT<F, A>;
}
interface Applicative<F> extends IApplicative<F>, Apply<F> {
}
export { Applicative };
export { Applicative as IApplicative };
interface IApplicative1<F extends URI1> {
    pure: <A>(_: A) => Kind1<F, A>;
}
interface Applicative1<F extends URI1> extends IApplicative1<F>, Apply1<F> {
}
export { Applicative1 };
interface IApplicative2<F extends URI2> {
    pure: <T0, A>(_: A) => Kind2<F, T0, A>;
}
interface Applicative2<F extends URI2> extends IApplicative2<F>, Apply2<F> {
}
export { Applicative2 };
interface IApplicative2_<F extends URI2, T0> {
    pure: <A>(_: A) => Kind2<F, T0, A>;
}
interface Applicative2_<F extends URI2, T0> extends IApplicative2_<F, T0>, Apply2_<F, T0> {
}
export { Applicative2_ };
declare namespace Applicative1 {
    let instantiate: <F extends "Endo" | "Maybe" | "List">(_: Applicative1<F>) => Applicative1<F>;
}
export default Applicative;
