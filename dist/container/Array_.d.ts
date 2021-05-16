import { Array } from './Array';
import { Int, Curry, Function, Bool } from '../ts-toolbelt';
declare class Array_<T extends any = any> extends Array<T> {
    static unlift<TThis extends Array, T extends Array.InferElem<TThis> = Array.InferElem<TThis>>(ins: TThis): T[];
    static size(ins: Array): Int;
    static at<TThis extends Array = Array, T extends Array.InferElem<TThis> = Array.InferElem<TThis>>(): Curry<Function<[Int, TThis], T>>;
    static _at<TThis extends Array = Array, T extends Array.InferElem<TThis> = Array.InferElem<TThis>>(): Curry<Function<[Int, TThis], T>>;
    static foldl<TThis extends Array = Array, U extends any = any>(): Curry<Function<[Array.Foldl.Reducer<TThis, U>, U, TThis], U>>;
    static foldr<TThis extends Array = Array, U extends any = any>(): Curry<Function<[Array.Foldr.Reducer<TThis, U>, U, TThis], U>>;
    static push<TThis extends Array = Array, T extends Array.InferElem<TThis> = Array.InferElem<TThis>>(): Curry<Function<[T[], TThis], Array<T>>>;
    static push_<TThis extends Array = Array, T extends Array.InferElem<TThis> = Array.InferElem<TThis>>(): Curry<Function<[T, TThis], Array<T>>>;
    static pop<TThis extends Array, T extends Array.InferElem<TThis> = Array.InferElem<TThis>>(ins: TThis): T;
    static fmap<TThis extends Array = Array, U extends any = any, T extends Array.InferElem<TThis> = Array.InferElem<TThis>>(): Curry<Function<[Array.Fmap.Morphism<Array<T>, U>, TThis], Array<U>>>;
    static map<TThis extends Array = Array, U extends any = any, T extends Array.InferElem<TThis> = Array.InferElem<TThis>>(): Curry<Function<[Array.Map.Morphism<Array<T>, U>, TThis], Array<U>>>;
    static forEach<TThis extends Array = Array, T extends Array.InferElem<TThis> = Array.InferElem<TThis>>(): Curry<Function<[Array.ForEach.Callback<Array<T>>, TThis], Array<T>>>;
    static filter<TThis extends Array = Array, T extends Array.InferElem<TThis> = Array.InferElem<TThis>>(): Curry<Function<[Array.Filter.Predicate<Array<T>>, TThis], Array<T>>>;
    static some<TThis extends Array = Array, T extends Array.InferElem<TThis> = Array.InferElem<TThis>>(): Curry<Function<[Array.Some.Predicate<Array<T>>, TThis], Bool>>;
    static every<TThis extends Array = Array, T extends Array.InferElem<TThis> = Array.InferElem<TThis>>(): Curry<Function<[Array.Every.Predicate<Array<T>>, TThis], Bool>>;
    static clone<TThis extends Array, T extends Array.InferElem<TThis> = Array.InferElem<TThis>>(ins: TThis): Array<T>;
    static reverse<TThis extends Array, T extends Array.InferElem<TThis> = Array.InferElem<TThis>>(ins: TThis): Array<T>;
    static slice<TThis extends Array, T extends Array.InferElem<TThis> = Array.InferElem<TThis>>(): Curry<Function<[Int, Int, TThis], Array<T>>>;
    static _slice<TThis extends Array, T extends Array.InferElem<TThis> = Array.InferElem<TThis>>(): Curry<Function<[Int, Int, TThis], Array<T>>>;
}
export default Array_;
export { Array_ as Array };
