import { Deconstruct, Construct } from '../../ts-toolbelt';
import { ISemigroup } from './ISemigroup';
export interface IMonoid<T extends Construct<ISemigroup> = any> {
    mempty: () => Deconstruct<T>;
}
export declare namespace IMonoid {
    let validate: (a: any) => a is IMonoid<any>;
}
