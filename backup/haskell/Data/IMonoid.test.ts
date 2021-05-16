import {IMonoid} from './IMonoid'
import {ISemigroup} from '../../../dist/haskell/Data/ISemigroup'
import {
	Json,
	Construct,
	Deconstruct,
	Required,
} from '../../../dist/ts-toolbelt'

class A implements ISemigroup {
	append(_: A) {return _}
	a() {}
	s(): A {return this}
}
let _A = (
	(A => (
		Json.assign(A, <IMonoid<typeof A>>{
			mempty: () => new A
		})
	))(A)
);
export {_A as A}

let Test = (
	(Test => (
		Json.assign(Test, <IMonoid<typeof Test>>{
			mempty: () => new Test
		})
	))(
		class Test implements ISemigroup {
			append(_: Test) {return _}
			a() {}
			s(): Test {return this}
		}
	)
);

Test.mempty().append(Test.mempty()).s().a();

class Eff<A extends Construct> implements ISemigroup {
	a: Deconstruct<A>;
	constructor() {
		this.a = <any>undefined;
	}
	append(aff: Eff<A>) {return aff}
}
let _Eff = <A extends Construct>(a: A) => (
	(Aff => (
		(_ => (
			(_ => (
				Json.assign(Aff, _['Monoid'])
			))({
				'Monoid': <A extends IMonoid ? typeof _['Monoid'][1] : typeof _['Monoid'][0]>_['Monoid'][IMonoid.validate(a) ? 1 : 0]
			})
		))({
			'Monoid': {
				1: ((a: IMonoid<A>) => (<IMonoid<Construct<Eff<A>>>>{
					mempty: () => Aff.Lift(a.mempty())
				}))(<any>a),
				0: {},
			}
		})
	))(
		Json.assign(Eff, {
			Lift: (a: Deconstruct<A>): Eff<A> => (
				((aff = new Eff<A>()) => (aff.a = a, aff))()
			),
		})
	)
);
export {_Eff as Eff}

let Aff = (
	(Aff => <A extends Construct>(a: A) => (
		(Aff => (
			(Aff => (
				(_ => (
					(_ => (
						Json.assign(Aff, _['Monoid'])
					))({
						'Monoid': <A extends IMonoid ? typeof _['Monoid'][1] : typeof _['Monoid'][0]>_['Monoid'][IMonoid.validate(a) ? 1 : 0]
					})
				))({
					'Monoid': {
						1: ((a: IMonoid<A>) => (<IMonoid<typeof Aff>>{
							mempty: () => Aff.Lift(a.mempty())
						}))(<any>a),
						0: {},
					}
				})
			))(
				Json.assign(Aff, {
					Lift: (a: Deconstruct<A>): Deconstruct<typeof Aff> => (
						((aff = new Aff()) => (aff.a = a, aff))()
					),
				})
			)
		))(Aff(a))
	))(
		<A extends Construct>(a: A) => (
			class Aff implements ISemigroup {
				a: Deconstruct<A> = new a();
				constructor() {}
				append(aff: Aff) {return aff}
			}
		)
	)
);

class S{s:[] = []}
let AffS = Aff(S);
let r = AffS.Lift(new S());
let t = Aff(Test).mempty().append(new (Aff(Test))());
let s = new (Aff(Test))();