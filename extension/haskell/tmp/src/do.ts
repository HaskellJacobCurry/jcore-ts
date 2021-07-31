import {HKT} from './Common/HKT'
import {IMonad} from '../../dist/Typeclass/Control/Monad'
import {
	chain,
	_,
	merge,
	json,
} from './Common'

let MonadDo: <F>(_: IMonad<F>) => HKT<F, {}> = (
	MonadF => MonadF.pure({})
);

let MDo: <F>(_: IMonad<F>) => HKT<F, {}> = MonadDo;

let Do: <F>(_: IMonad<F>) => HKT<F, {}> = MDo;

let assign_: <F>(_: IMonad<F>) => <K extends string>(k: K) => <A, B>(f: (_: A) => HKT<F, B>) => (_: HKT<F, A>) => HKT<F, A & {[_ in K]: B}> = (
	<F>(MonadF: IMonad<F>) => <K extends string>(k: K) => <A, B>(f: (_: A) => HKT<F, B>) => (monadA: HKT<F, A>) => (
		MonadF.bind(monadA)(a => (
			MonadF.fmap((b: B) => merge({}, a, json(k, b)))(f(a))
		))
	)
);

let assign: <F>(_: IMonad<F>) => <A>(_: HKT<F, A>) => <K extends string>(k: K) => <B>(f: (_: A) => HKT<F, B>) => HKT<F, A & {[_ in K]: B}> = (
	<F>(MonadF: IMonad<F>) => <A>(monadA: HKT<F, A>) => <K extends string>(k: K) => <B>(f: (_: A) => HKT<F, B>) => (
		MonadF.bind(monadA)(a => (
			MonadF.fmap((b: B) => merge({}, a, json(k, b)))(f(a))
		))
	)
);

let bindFirst: <F>(_: IMonad<F>) => <A>(_: HKT<F, A>) => <B>(f: (_: A) => HKT<F, B>) => HKT<F, A> = (
	<F>(MonadF: IMonad<F>) => <A>(monadA: HKT<F, A>) => <B>(f: (_: A) => HKT<F, B>) => (
		MonadF.bind(monadA)(a => (
			MonadF.fmap((_: B) => a)(f(a))
		))
	)
);

let Monad = _<IMonad<'A'>>();

chain(_()
)(next => _ => next(Do(Monad)
))(next => _ => next(assign(Monad)(_)('hi')(() => Monad.pure('lol'))
))(next => _ => next(assign(Monad)(_)('a')(({hi}) => Monad.pure([1, hi]))
))(next => _ => _)