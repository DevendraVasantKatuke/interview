Semicolon insertion
```js run
alert("There will be an error after this message")

[1, 2].forEach(alert)
```
There are 8 data types:

- `number` for both floating-point and integer numbers,
- `bigint` for integer numbers of arbitrary length,
- `string` for strings,
- `boolean` for logical values: `true/false`,
- `null` -- a type with a single value `null`, meaning "empty" or "does not exist",
- `undefined` -- a type with a single value `undefined`, meaning "not assigned",
- `object` and `symbol` -- for complex data structures and unique identifiers, we haven't learnt them yet.

The `typeof` operator returns the type for a value, with two exceptions:
```js
typeof null == "object" // error in the language
typeof function(){} == "function" // functions are treated specially
```
**The strict equality operator `===` doesn't do the conversion**

**Values `null` and `undefined` are special: they equal `==` each other and don't equal anything else.**
