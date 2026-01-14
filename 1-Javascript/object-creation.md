# Object creation using the object literal/initializer

```
o = {
  a: "foo",
  b: 42,
  c: {},
  1: "number literal property",
  "foo:bar": "string literal property",

  shorthandProperty,

  method(parameters) {
    // …
  },

  get property() {},
  set property(value) {},

  [expression]: "computed property",

  __proto__: prototype,

  ...spreadProperty,
};
```

#### Object literal syntax vs. JSON

1. JSON property name must be double-quoted, and the definition cannot be a shorthand.
2. Computed property names are not allowed either.
3. JSON cannot express methods or non-plain objects like Date or RegExp.
4. In JSON, `__proto__` is a normal property key. In an object literal, it sets the object's prototype.

JSON is a strict subset of the object literal syntax, meaning that every valid JSON text can be parsed as an object literal, and would likely not cause syntax errors. The only exception is that the object literal syntax prohibits duplicate `__proto__` keys, which does not apply to JSON.parse(). The latter treats `__proto__` like a normal property and takes the last occurrence as the property's value. The only time when the object value they represent (a.k.a. their semantic) differ is also when the source contains the `__proto__` key — for object literals, it sets the object's prototype; for JSON, it's a normal property.

```
console.log(JSON.parse('{ "__proto__": 0, "__proto__": 1 }')); // {__proto__: 1}
console.log({ "__proto__": 0, "__proto__": 1 }); // SyntaxError: Duplicate __proto__ fields are not allowed in object literals

console.log(JSON.parse('{ "__proto__": {} }')); // { __proto__: {} }
console.log({ "__proto__": {} }); // {} (with {} as prototype)
```

```
const a = "foo";

// Shorthand property names
const o = { a, b, c };

// In other words,
console.log(o.a === { a }.a); // true
```

```
const a = { x: 1, x: 2 };
console.log(a); // {x: 2}
```

After ES2015, duplicate property names are allowed everywhere, including strict mode. You can also have duplicate property names in classes. The only exception is private properties, which must be unique in the class body.

#### Method definitions

```
const o = {
  property: function (parameters) {},
  get property() {},
  set property(value) {},
};

// A shorthand notation is available, so that the keyword `function` is no longer necessary.
const o = {
  property(parameters) {},
};
```

There is also a way to concisely define generator methods.

```
const o = {
  *generator() {
    // …
  },
};

const o = {
  generator: function* () {
    // …
  },
};
```

Computed property names

```
// Computed property names
let i = 0;
const a = {
  [`foo${++i}`]: i,
  [`foo${++i}`]: i,
  [`foo${++i}`]: i,
};

console.log(a.foo1); // 1
console.log(a.foo2); // 2
console.log(a.foo3); // 3

const items = ["A", "B", "C"];
const obj = {
  [items]: "Hello",
};
console.log(obj); // A,B,C: "Hello"
console.log(obj["A,B,C"]); // "Hello"

const param = "size";
const config = {
  [param]: 12,
  [`mobile${param.charAt(0).toUpperCase()}${param.slice(1)}`]: 4,
};

console.log(config); // {size: 12, mobileSize: 4}
```

Spread properties
Object literals support the spread syntax. It copies own enumerable properties from a provided object onto a new object.

Shallow-cloning (excluding prototype) or merging objects is now possible using a shorter syntax than Object.assign().

> Warning: Note that Object.assign() triggers setters, whereas the spread syntax doesn't!

#### Prototype setter

A property definition of the form `__proto__: value` or `"__proto__": value` does not create a property with the name `__proto__`. Instead, if the provided value is an object or null, it points the [[Prototype]] of the created object to that value. (If the value is not an object or null, the object is not changed.)

Note that the `__proto__` key is standardized syntax, in contrast to the non-standard and non-performant `Object.prototype.__proto__` accessors. It sets the [[Prototype]] during object creation, similar to Object.create — instead of mutating the prototype chain.

```
const obj1 = {};
console.log(Object.getPrototypeOf(obj1) === Object.prototype); // true

const obj2 = { __proto__: null };
console.log(Object.getPrototypeOf(obj2)); // null

const protoObj = {};
const obj3 = { "__proto__": protoObj };
console.log(Object.getPrototypeOf(obj3) === protoObj); // true

const obj4 = { __proto__: "not an object or null" };
console.log(Object.getPrototypeOf(obj4) === Object.prototype); // true
console.log(Object.hasOwn(obj4, "__proto__")); // false
```

Only a single prototype setter is permitted in an object literal. Multiple prototype setters are a syntax error.

Property definitions that do not use "colon" notation are not prototype setters. They are property definitions that behave identically to similar definitions using any other name.

```
const __proto__ = "variable";

const obj1 = { __proto__ };
console.log(Object.getPrototypeOf(obj1) === Object.prototype); // true
console.log(Object.hasOwn(obj1, "__proto__")); // true
console.log(obj1.__proto__); // "variable"

const obj2 = { __proto__() { return "hello"; } };
console.log(obj2.__proto__()); // "hello"

const obj3 = { ["__proto__"]: 17 };
console.log(obj3.__proto__); // 17

// Mixing prototype setter with normal own properties with "__proto__" key
const obj4 = { ["__proto__"]: 17, __proto__: {} }; // {__proto__: 17} (with {} as prototype)
const obj5 = {
  ["__proto__"]: 17,
  __proto__: {},
  __proto__: null, // SyntaxError: Duplicate __proto__ fields are not allowed in object literals
};
const obj6 = {
  ["__proto__"]: 17,
  ["__proto__"]: "hello",
  __proto__: null,
}; // {__proto__: "hello"} (with null as prototype)
const obj7 =  {
  ["__proto__"]: 17,
  __proto__,
  __proto__: null,
}; // {__proto__: "variable"} (with null as prototype)
```
