import { IMonoid } from '../IMonoid';
import { ISemigroup } from '../ISemigroup';
import { Construct, Deconstruct } from '../../../ts-toolbelt';
declare class A implements ISemigroup {
    append(_: A): A;
    a(): void;
    s(): A;
}
declare let _A: typeof A & IMonoid<typeof A>;
export { _A as A };
declare class Eff<A extends Construct> implements ISemigroup {
    a: Deconstruct<A>;
    constructor();
    append(aff: Eff<A>): Eff<A>;
}
declare let _Eff: <A_1 extends Construct<any>>(a: A_1) => typeof Eff & {
    Lift: (a: Deconstruct<A_1>) => Eff<A_1>;
} & (A_1 extends IMonoid<any> ? IMonoid<Construct<Eff<A_1>>> : {});
export { _Eff as Eff };
