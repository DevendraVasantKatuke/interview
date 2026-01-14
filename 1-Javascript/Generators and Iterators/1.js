import assert from 'node:assert/strict';

const arr = ['a', '', 'b', '', 'c', '', 'd', '', 'e'];
assert.deepEqual(
	arr.values() // creates an iterator
		.filter(x => x.length > 0)
		.drop(1)
		.take(3)
		.map(x => `=${x}=`)
		.toArray()
	,
	['=b=', '=c=', '=d='],
	'success'
);
console.log('All tests passed!');