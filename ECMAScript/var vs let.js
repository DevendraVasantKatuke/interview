// - var is hoisted on function level
let x = function () {
	console.log(a);
	if (true) {
		var a = 1;
		var b = 2
		let c = 3;

	}
	console.log(b);
	console.log(c);
}
x();
// a: undefined
// b: 2
// c: error