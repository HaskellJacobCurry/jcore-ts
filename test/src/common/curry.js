let {curry} = require('../../../dist/common/curry');

/** @type {import('./curry')['f']} */
let f = (a, b, c) => ({a, c, b});
let g = curry(f);

let s = g('dd', [1,2], )()()('aa');
let k = g('fff')([1, 2])()('aa');
console.log({s,k})