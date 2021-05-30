import {
	Construct
} from '../dependency/jcore/dist/ts-toolbelt'

export let Maybe = <A>(a: Construct<A>) => (
	class _ {
		f(): 3{return <any>1}
		g = () => new (Maybe(a))();
		map = <B>(f: (a: A) => B) => {
			let cons: Construct<B> = <any>1;
			return new (Maybe(cons))();
		};
	}
);
export let Just = <A>(a: Construct<A>) => (
	class _ extends Maybe(a) {}
);

export class F {}
class G {}
export let ff = new (Just(F))().map(a => new G()).map(a => 1)