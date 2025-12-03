The only objects that don't inherit from `Object.prototype` are those with

- `null` prototype
- or descended from other null prototype objects

`Object.prototype` is the only object in the core JavaScript language that has immutable prototype — the **prototype of Object.prototype is always null** and **not changeable**.

All modern JavaScript utilities for working with objects are static:

- `valueOf()`, `toString()`, and `toLocaleString()` exist to be polymorphic and you should expect the object to define its own implementation with sensible behaviors, so you can call them as instance methods. However, `valueOf()` and `toString()` are usually implicitly called through type conversion and you don't need to call them yourself in your code.

- The `__proto__` property is deprecated and should not be used. The `Object.getPrototypeOf()` and `Object.setPrototypeOf()` alternatives are static methods.

- The `isPrototypeOf()` method can usually be replaced with `instanceof`, if you are checking the prototype property of a constructor.

In case where a semantically equivalent static method doesn't exist, or if you really want to use the Object.prototype method, you should directly `call()` the Object.prototype method on your target object instead, to prevent the object from having an overriding property that produces unexpected results.

```
const obj = {
  foo: 1,
  // You should not define such a method on your own object,
  // but you may not be able to prevent it from happening if
  // you are receiving the object from external input
  propertyIsEnumerable() {
    return false;
  },
};

obj.propertyIsEnumerable("foo"); // false; unexpected result
Object.prototype.propertyIsEnumerable.call(obj, "foo"); // true; expected result
```

null-prototype objects

```
const obj = Object.create(null);
const obj2 = { **proto**: null };
```

In practice, objects with `null` prototype are usually used as a cheap substitute for maps. The presence of `Object.prototype` properties will cause some bugs:

```
const ages = { alice: 18, bob: 27 };

function hasPerson(name) {
  return name in ages;
}

function getAge(name) {
  return ages[name];
}

hasPerson("hasOwnProperty"); // true
getAge("toString"); // [Function: toString]
```

Using a null-prototype object removes this hazard without introducing too much complexity to the hasPerson and getAge functions:

```
const ages = Object.create(null, {
  alice: { value: 18, enumerable: true },
  bob: { value: 27, enumerable: true },
});

hasPerson("hasOwnProperty"); // false
getAge("toString"); // undefined
```

In such case, the addition of any method should be done cautiously, as they can be confused with the other key-value pairs stored as data.

Making your object not inherit from Object.prototype also prevents prototype pollution attacks. If a malicious script adds a property to Object.prototype, it will be accessible on every object in your program, except objects that have null prototype.

JS
Copy to Clipboard
const user = {};

// A malicious script:
Object.prototype.authenticated = true;

// Unexpectedly allowing unauthenticated user to pass through
if (user.authenticated) {
// access confidential data
}
JavaScript also has built-in APIs that produce null-prototype objects, especially those that use objects as ad hoc key-value collections. For example:

The return value of Object.groupBy()
The groups and indices.groups properties of the result of RegExp.prototype.exec()
Array.prototype[@@unscopables] (all @@unscopables objects should have null-prototype)
import.meta
Module namespace objects, obtained through import \* as ns from "module"; or import()
The term "null-prototype object" often also includes any object without Object.prototype in its prototype chain. Such objects can be created with extends null when using classes.

Object coercion
Many built-in operations that expect objects first coerce their arguments to objects. The operation can be summarized as follows:

Objects are returned as-is.
undefined and null throw a TypeError.
Number, String, Boolean, Symbol, BigInt primitives are wrapped into their corresponding object wrappers.
There are two ways to achieve nearly the same effect in JavaScript.

Object.prototype.valueOf(): Object.prototype.valueOf.call(x) does exactly the object coercion steps explained above to convert x.
The Object() function: Object(x) uses the same algorithm to convert x, except that undefined and null don't throw a TypeError, but return a plain object.
Places that use object coercion include:

The object parameter of for...in loops.
The this value of Array methods.
Parameters of Object methods such as Object.keys().
Auto-boxing when a property is accessed on a primitive value, since primitives do not have properties.
The this value when calling a non-strict function. Primitives are boxed while null and undefined are replaced with the global object.
Unlike conversion to primitives, the object coercion process itself is not observable in any way, since it doesn't invoke custom code like toString or valueOf methods.

Constructor
Object()
Turns the input into an object.

Static methods
Object.assign()
Copies the values of all enumerable own properties from one or more source objects to a target object.

Object.create()
Creates a new object with the specified prototype object and properties.

Object.defineProperties()
Adds the named properties described by the given descriptors to an object.

Object.defineProperty()
Adds the named property described by a given descriptor to an object.

Object.entries()
Returns an array containing all of the [key, value] pairs of a given object's own enumerable string properties.

Object.freeze()
Freezes an object. Other code cannot delete or change its properties.

Object.fromEntries()
Returns a new object from an iterable of [key, value] pairs. (This is the reverse of Object.entries).

Object.getOwnPropertyDescriptor()
Returns a property descriptor for a named property on an object.

Object.getOwnPropertyDescriptors()
Returns an object containing all own property descriptors for an object.

Object.getOwnPropertyNames()
Returns an array containing the names of all of the given object's own enumerable and non-enumerable properties.

Object.getOwnPropertySymbols()
Returns an array of all symbol properties found directly upon a given object.

Object.getPrototypeOf()
Returns the prototype (internal [[Prototype]] property) of the specified object.

Object.groupBy()
Groups the elements of a given iterable according to the string values returned by a provided callback function. The returned object has separate properties for each group, containing arrays with the elements in the group.

Object.hasOwn()
Returns true if the specified object has the indicated property as its own property, or false if the property is inherited or does not exist.

Object.is()
Compares if two values are the same value. Equates all NaN values (which differs from both IsLooselyEqual used by == and IsStrictlyEqual used by ===).

Object.isExtensible()
Determines if extending of an object is allowed.

Object.isFrozen()
Determines if an object was frozen.

Object.isSealed()
Determines if an object is sealed.

Object.keys()
Returns an array containing the names of all of the given object's own enumerable string properties.

Object.preventExtensions()
Prevents any extensions of an object.

Object.seal()
Prevents other code from deleting properties of an object.

Object.setPrototypeOf()
Sets the object's prototype (its internal [[Prototype]] property).

Object.values()
Returns an array containing the values that correspond to all of a given object's own enumerable string properties.

Instance properties
These properties are defined on Object.prototype and shared by all Object instances.

Object.prototype.**proto** Deprecated
Points to the object which was used as prototype when the object was instantiated.

Object.prototype.constructor
The constructor function that created the instance object. For plain Object instances, the initial value is the Object constructor. Instances of other constructors each inherit the constructor property from their respective Constructor.prototype object.

Instance methods
Object.prototype.**defineGetter**() Deprecated
Associates a function with a property that, when accessed, executes that function and returns its return value.

Object.prototype.**defineSetter**() Deprecated
Associates a function with a property that, when set, executes that function which modifies the property.

Object.prototype.**lookupGetter**() Deprecated
Returns the function bound as a getter to the specified property.

Object.prototype.**lookupSetter**() Deprecated
Returns the function bound as a setter to the specified property.

Object.prototype.hasOwnProperty()
Returns a boolean indicating whether an object contains the specified property as a direct property of that object and not inherited through the prototype chain.

Object.prototype.isPrototypeOf()
Returns a boolean indicating whether the object this method is called upon is in the prototype chain of the specified object.

Object.prototype.propertyIsEnumerable()
Returns a boolean indicating whether the specified property is the object's enumerable own property.

Object.prototype.toLocaleString()
Calls toString().

Object.prototype.toString()
Returns a string representation of the object.

Object.prototype.valueOf()
Returns the primitive value of the specified object.

Examples
Constructing empty objects
The following example creates empty objects using the new keyword with different arguments:

JS
Copy to Clipboard
const o1 = new Object();
const o2 = new Object(undefined);
const o3 = new Object(null);
Using Object() constructor to turn primitives into an Object of their respective type
You can use the Object() constructor to create an object wrapper of a primitive value.

The following examples create variables o1 and o2 which are objects storing Boolean and BigInt values:

JS
Copy to Clipboard
// Equivalent to const o1 = new Boolean(true)
const o1 = new Object(true);

// No equivalent because BigInt() can't be called as a constructor,
// and calling it as a regular function won't create an object
const o2 = new Object(1n);
Object prototypes
When altering the behavior of existing Object.prototype methods, consider injecting code by wrapping your extension before or after the existing logic. For example, this (untested) code will pre-conditionally execute custom logic before the built-in logic or someone else's extension is executed.

When modifying prototypes with hooks, pass this and the arguments (the call state) to the current behavior by calling apply() on the function. This pattern can be used for any prototype, such as Node.prototype, Function.prototype, etc.

JS
Copy to Clipboard
const current = Object.prototype.valueOf;

// Since my property "-prop-value" is cross-cutting and isn't always
// on the same prototype chain, I want to modify Object.prototype:
Object.prototype.valueOf = function (...args) {
if (Object.hasOwn(this, "-prop-value")) {
return this["-prop-value"];
} else {
// It doesn't look like one of my objects, so let's fall back on
// the default behavior by reproducing the current behavior as best we can.
// The apply behaves like "super" in some other languages.
// Even though valueOf() doesn't take arguments, some other hook may.
return current.apply(this, args);
}
};
Warning: Modifying the prototype property of any built-in constructor is considered a bad practice and risks forward compatibility.

You can read more about prototypes in Inheritance and the prototype chain.
