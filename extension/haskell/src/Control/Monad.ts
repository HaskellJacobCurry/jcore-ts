import {HKT, URI1, URI2, Kind1, Kind2} from '../util/HKT'
import {Applicative, Applicative1, Applicative2, Applicative2_} from './Applicative'
import {Bind, Bind1, Bind2, Bind2_} from './Bind'

/**
 * class (Applicative f, Bind f) <= Monad f
 * ap :: Monad f => f (a -> b) -> f a -> f b
 * map :: Monad f => (a -> b) -> f a -> f b
 */

interface Monad<F> extends Applicative<F>, Bind<F> {}
export {Monad}
export {Monad as IMonad}

interface Monad1<F extends URI1> extends Applicative1<F>, Bind1<F> {}
export {Monad1}

interface Monad2<F extends URI2> extends Applicative2<F>, Bind2<F> {}
export {Monad2}

interface Monad2_<F extends URI2, T0> extends Applicative2_<F, T0>, Bind2_<F, T0> {}
export {Monad2_}

export default Monad