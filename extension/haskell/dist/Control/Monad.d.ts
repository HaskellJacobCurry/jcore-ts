import { URI1, URI2 } from '../util/HKT';
import { Applicative, Applicative1, Applicative2, Applicative2_ } from './Applicative';
import { Bind, Bind1, Bind2, Bind2_ } from './Bind';
interface Monad<F> extends Applicative<F>, Bind<F> {
}
export { Monad };
export { Monad as IMonad };
interface Monad1<URI extends URI1> extends Applicative1<URI>, Bind1<URI> {
}
export { Monad1 };
interface Monad2<URI extends URI2> extends Applicative2<URI>, Bind2<URI> {
}
export { Monad2 };
interface Monad2_<URI extends URI2, T0> extends Applicative2_<URI, T0>, Bind2_<URI, T0> {
}
export { Monad2_ };
export default Monad;
