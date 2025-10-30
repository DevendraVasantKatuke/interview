1. let and const provide scoping mechanism
2. let and const provides block-scoping
```
var callbacks = []; 
(function() { 
	for (var i = 0; i < 5; i++) { 
		callbacks.push( function() { return i; } ); 
	}
})();
console.log(
	callbacks.map(function(cb) { 
		return cb(); 
	})
);
// [5, 5, 5, 5, 5]
```
```
var callbacks = []; 
(function() { 
	var i; 
	for (i = 0; i < 5; i++) { 
		callbacks.push( function() { return i; } ); 
	}
})();
console.log(
	callbacks.map(function(cb) {
		return cb(); 
	})
);
// [0, 1, 2, 3, 4]
```
```
var callbacks = []; 
(function() { 
	for (let i = 0; i < 5; i++) { 
		callbacks.push( function() { return i; } ); 
	} 
})();
console.log(
	callbacks.map(function(cb) { 
		return cb();
	})
);
// [0, 1, 2, 3, 4]
```