import { Function, HFunction as _HFunction, Constructor, URI } from '../../DataStructure/Data/Function';
import { Semigroupoid2 } from '../../Typeclass/Control/Semigroupoid';
import { Category2 } from '../../Typeclass/Control/Category';
export * from '../../DataStructure/Data/Function';
/** compose :: Semigroupoid Function => Function b c -> Function a b -> Function a c */
declare let compose: <B, C>(_: Function<B, C>) => <A>(_: Function<A, B>) => Function<A, C>;
export { compose };
declare let Semigroupoid: Semigroupoid2<URI>;
export { Semigroupoid };
/** identity :: Category Function => Function a a */
declare let identity: <A>() => Function<A, A>;
export { identity };
declare let Category: Category2<URI>;
export { Category };
interface HFunction extends _HFunction {
    Semigroupoid: typeof Semigroupoid;
    Category: typeof Category;
    compose: <B, C>(_: Function<B, C>) => <A>(_: Function<A, B>) => Function<A, C>;
    identity: <A>() => Function<A, A>;
}
export { HFunction };
declare type _Function<A, B> = Function<A, B>;
declare let _Function: Constructor & HFunction;
export { _Function as Function };
export default _Function;
