import { HKT, URI1, URI2, Kind1, Kind2 } from '../util/HKT';
import { Apply, Apply1, Apply2, Apply2_ } from './Apply';
interface Bind<F> extends Apply<F> {
    readonly bind: <A>(_: HKT<F, A>) => <B>(_: (_: A) => HKT<F, B>) => HKT<F, B>;
}
export { Bind };
export { Bind as IBind };
interface Bind1<URI extends URI1> extends Apply1<URI> {
    readonly bind: <A>(_: Kind1<URI, A>) => <B>(_: (_: A) => Kind1<URI, B>) => Kind1<URI, B>;
}
export { Bind1 };
interface Bind2<URI extends URI2> extends Apply2<URI> {
    readonly bind: <T0, A>(_: Kind2<URI, T0, A>) => <B>(_: (_: A) => Kind2<URI, T0, B>) => Kind2<URI, T0, B>;
}
export { Bind2 };
interface Bind2_<URI extends URI2, T0> extends Apply2_<URI, T0> {
    readonly bind: <A>(_: Kind2<URI, T0, A>) => <B>(_: (_: A) => Kind2<URI, T0, B>) => Kind2<URI, T0, B>;
}
export { Bind2_ };
export default Bind;
