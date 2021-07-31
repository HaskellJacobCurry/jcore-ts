import {
    Json,
    cast,
    placeholder,
} from '../../../dist/Common'

export * from '../../../dist/Common'

let merge = Json.assign;
export {merge}

let json: <K extends string, V>(k: K, v: V) => {[_ in K]: V} = (
    (k, v) => cast({[k]: v})()
);
export {json}

let chain: <T>(_: T) => <U>(f: (next: typeof chain) => (_: T) => U) => U = (
    _ => f => f(chain)(_)
);
export {chain}

let _ = placeholder;
export {_}