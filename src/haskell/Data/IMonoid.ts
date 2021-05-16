import {
	Deconstruct,
	Construct,
	Function,
} from '../../ts-toolbelt'
import {ISemigroup} from './ISemigroup'

export interface IMonoid<T extends Construct<ISemigroup> = any> {
	mempty: () => Deconstruct<T>;
}
export namespace IMonoid {
	export let validate = (a: any): a is IMonoid => Function.validate(a.mempty);
}