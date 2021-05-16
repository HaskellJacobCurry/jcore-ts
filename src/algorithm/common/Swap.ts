import {
	MutableIterator,
	BaseIterator,
	Int,
} from '../../ts-toolbelt'

export let _swap = <T>(as: T[], i0: Int, i1: Int): void => {
	let a0 = as[i0];
	as[i0] = as[i1];
	as[i1] = a0;
};

export namespace Swap {
	export type Iterator<T = any> = MutableIterator<T>;
	export let fn = (
		<TIterator extends Iterator
		>(iter0: TIterator, iter1: TIterator): void => {
			let a0 = iter0.read();
			iter0.write(iter1.read());
			iter1.write(a0);
		}
	);
}
export let swap = Swap.fn;

export default Swap