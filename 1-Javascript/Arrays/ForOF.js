for (const v of ['a', 'b', 'c']) {
	console.log(v);
}
//get the index as well, using `entries()`
for (const [i, v] of ['a', 'b', 'c'].entries()) {
	console.log(i, v);
}
