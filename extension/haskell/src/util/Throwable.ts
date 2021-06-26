let Throwable: <A>(value: A) => never = (
	value => {throw value}
);
export {Throwable}