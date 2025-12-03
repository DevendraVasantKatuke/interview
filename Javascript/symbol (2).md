# Symbol type
`Symbol` is a primitive type for unique identifiers.

By specification, object property keys may be either of string type, or of symbol type. Not numbers, not booleans, only strings or symbols, these two types.

A "symbol" represents a unique identifier.
```js
// id is a new symbol
let id = Symbol();
let id = Symbol("id");
```
```js run
let id1 = Symbol("id");
let id2 = Symbol("id");

alert(id1 == id2); // false
```
```js run
let id = Symbol("id");
alert(id); // TypeError: Cannot convert a Symbol value to a string
```
```js run
let id = Symbol("id");
alert(id.toString()); // Symbol(id), now it works
alert(id.description); // id
```
## "Hidden" properties
```js run
let user = { // belongs to another code
  name: "John"
};

let id = Symbol("id");
user[id] = 1;
alert( user[id] ); // we can access the data using the symbol as the key
```
Also, imagine that another script wants to have its own identifier inside `user`, for its own purposes. That may be another JavaScript library, so that the scripts are completely unaware of each other.
```js
// ...
let id = Symbol("id");

user[id] = "Their id value";
```
There will be no conflict between our and their identifiers, because symbols are always different, even if they have the same name.
### Symbols in an object literal

If we want to use a symbol in an object literal `{...}`, we need square brackets around it.
```js
let id = Symbol("id");

let user = {
  name: "John",
  [id]: 123 // not "id": 123
};
```
### Symbols are skipped by for..in
```js run
let id = Symbol("id");
let user = {
  name: "John",
  age: 30,
  [id]: 123
};

for (let key in user) alert(key); // name, age (no symbols)

// the direct access by the symbol works
alert( "Direct: " + user[id] );
```
`Object.keys(user)` also ignores them.

In contrast, `object.assign` copies both string and symbol properties:
```js run
let id = Symbol("id");
let user = {
  [id]: 123
};

let clone = Object.assign({}, user);

alert( clone[id] ); // 123
```
## Global symbols
In order to read (create if absent) a symbol from the registry, use `Symbol.for(key)`.
```js run
// read from the global registry
let id = Symbol.for("id"); // if the symbol did not exist, it is created

// read it again (maybe from another part of the code)
let idAgain = Symbol.for("id");

// the same symbol
alert( id === idAgain ); // true
```
### Symbol.keyFor
```js run
// get symbol by name
let sym = Symbol.for("name");
let sym2 = Symbol.for("id");

// get name by symbol
alert( Symbol.keyFor(sym) ); // name
alert( Symbol.keyFor(sym2) ); // id
```
`Symbol.keyFor` doesn't work for non-global symbols.
```js run
let globalSymbol = Symbol.for("name");
let localSymbol = Symbol("name");

alert( Symbol.keyFor(globalSymbol) ); // name, global symbol
alert( Symbol.keyFor(localSymbol) ); // undefined, not global

alert( localSymbol.description ); // name
```
## System symbols
There exist many "system" symbols that JavaScript uses internally.
- `Symbol.hasInstance`
- `Symbol.isConcatSpreadable`
- `Symbol.iterator`
- `Symbol.toPrimitive`
- ...and so on.

For instance, `Symbol.toPrimitive` allows us to describe object to primitive conversion.

Technically, symbols are not 100% hidden. There is a built-in method `Object.getOwnPropertySymbols(obj)` that allows us to get all symbols.

Also there is a method named `Reflect.ownKeys(obj)` that returns *all* keys of an object including symbolic ones.
