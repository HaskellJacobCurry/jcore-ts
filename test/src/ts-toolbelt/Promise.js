let {Promise} = require('../../../dist/ts-toolbelt/Promise');
let {PromiseCapability} = require('../../../dist/ts-toolbelt/PromiseCapability');
let {Tuple: T} = require('../../../dist/ts-toolbelt/Tuple');

({
	0: () => {
		Promise.resolve(Promise.resolve(Promise.resolve(25)))
			.then(a => a * 2)
			.then(a => (console.log({a}), a))
			.then(_ => Promise.await(1e3).then(() => _))
			.then(_ => true ? Promise.reject('hi') : Promise.resolve(_))
			//.catch(_ => _)
			.then(a => Promise.await(1e3).then(() => Promise.resolve(`-${a}_`)))
			.then(a => console.log({a}))
			.catch(reason => (
				Promise.resolve()
					.then(() => console.log('wait'))
					.then(() => Promise.await(2e3))
					.then(() => {throw 'asshole'})
					.then(() => console.log({reason, msg:'err'}))
			));
	},
	1: () => {
		Promise.resolve()
			.then(() => (
				Promise.resolve()
					.then(() => Promise.reject('a'))
					.then(() => {})
					.catch(_ => {throw `${_}-b`})
			))
			.catch(_ => (
				Promise.resolve()
					.then(() => (
						Promise.resolve()
							.then(() => {throw ''})
							.catch(() => Promise.reject(`${_}-c`))
					))
			))
			.catch(console.log)
	},
	2: () => {
		new Promise((resolve) => {
			(function sum(n, acc = 0) {
				if (n == 0) {
					resolve(acc);
				} else {
					queueMicrotask(() => sum(n - 1, acc + n));
				}
			})(1e6)
		})
			.then(v => console.log({v}))
	},
	3: () => {
		Promise.all_(
			1, 
			Promise.resolve(['shit']), 
			Promise.await(2e2).then(() => 'ass'),
			//Promise.reject('shhhhhhh'),
			Promise.all_(
				'yo',
				Promise.await(1e3),
				Promise.await(2e3).then(() => Promise.resolve(123))
			)
		)
			.then(_ => console.log(_))
			.catch(console.log)
	},
	4: () => {
		let rejected = ((cap = new PromiseCapability()) => (cap.reject('shut'), cap.promise))();
		Promise.resolve(Promise.resolve(rejected))
			.catch(console.log)
	},
	5: () => {
		Promise.race([
			Promise.await(1e3).then(() => Promise.reject('yo')),
			Promise.await(1e2).then(() => Promise.resolve(1)),
			[333333333],
			's'
		])
			.then(_ => console.log(_))
			.catch(console.log)
	}
})['5']();