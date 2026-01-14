Nullish coalescing operator

```
null ?? 'I win';           //  'I win'
undefined ?? 'Me too';     //  'Me too'

false ?? 'I lose'          //  false
0 ?? 'I lose again'        //  0
'' ?? 'Damn it'            //  ''
```

Symbol

```
function*gen() { /*some code */}
var g = gen();

g[Symbol.iterator]() === g // true
```

Fibonacci

```
let fibonacci = {
  	[Symbol.iterator]() {
    	let pre = 0, cur = 1;
    	return {
      		next() {
        		[pre, cur] = [cur, pre + cur];
				return { done: false, value: cur }
      		}
    	}
  	}
}

for (var n of fibonacci) {
  	// truncate sequence at 1000
  	if (n > 1000) break;
  	console.log(n);
}
```

```
var gen = {};
gen[Symbol.iterator] = function*() {
  yield 1;
  yield 2;
  yield 3;
};

[...gen] // => [1, 2, 3]
```

Lexical this

```
var bob = {
	_name: "Bob",
  	_friends: ["Tom", "John"],
  	printFriends() {
    	this._friends.forEach(f =>
      		console.log(this._name + " knows " + f)
		);
	}
}

bob.printFriends();
```
