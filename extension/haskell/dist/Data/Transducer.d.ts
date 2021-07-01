import { Transducer, Transducer_ } from './Reducible';
import { Bool } from './Bool';
import { Int } from './Int';
declare let map: <A, C = A>(f: (_: A) => C) => <B>() => Transducer_<A, B, C>;
export { map };
declare let filter: <A>(f: (_: A) => Bool) => <B>() => Transducer<A, B>;
export { filter };
declare let take: (n: Int) => <A, B>() => Transducer<A, B>;
export { take };
declare let Transducer: {
    map: <A, C = A>(f: (_: A) => C) => <B>() => Transducer_<A, B, C>;
    filter: <A_1>(f: (_: A_1) => Bool) => <B_1>() => Transducer_<A_1, B_1, A_1>;
    take: (n: Int) => <A_2, B_2>() => Transducer_<A_2, B_2, A_2>;
};
export { Transducer };
