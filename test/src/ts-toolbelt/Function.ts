import {Function} from '../../../dist/ts-toolbelt/Function'

interface Json {
    a: string;
    f: (b: string) => [string];
}
let json = Function.define<Json>(rec => ({
    a: 'shit',
    f: b => [`${rec().a}-${b}`],
}));

console.log({
    a: json.a,
    c: json.f('lol')
})