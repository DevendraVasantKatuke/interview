JavaScript’s prototype system can be interpreted as a somewhat free-form take on abstract data types or classes. A class defines the shape of a type of object—what methods and properties it has. Such an object is called an instance of the class.

Prototypes are useful for defining properties for which all instances of a class share the same value. Properties that differ per instance, such as our rabbits’ type property, need to be stored directly in the objects themselves.

To create an instance of a given class, you have to make an object that derives from the proper prototype, but you also have to make sure it itself has the properties that instances of this class are supposed to have. This is what a constructor function does.
```
function makeRabbit(type) {
  let rabbit = Object.create(protoRabbit);
  rabbit.type = type;
  return rabbit;
}
```
JavaScript’s class notation makes it easier to define this type of function, along with a prototype object.

```
class Rabbit {
  constructor(type) {
    this.type = type;
  }
  speak(line) {
    console.log(`The ${this.type} rabbit says '${line}'`);
  }
}
```
The class keyword starts a class declaration, which allows us to define a constructor and a set of methods together. Any number of methods may be written inside the declaration’s braces. This code has the effect of defining a binding called Rabbit, which holds a function that runs the code in constructor and has a prototype property that holds the speak method.

This function cannot be called like a normal function. Constructors, in JavaScript, are called by putting the keyword new in front of them. Doing so creates a fresh instance object whose prototype is the object from the function’s prototype property, then runs the function with this bound to the new object, and finally returns the object.

let killerRabbit = new Rabbit("killer");
In fact, class was only introduced in the 2015 edition of JavaScript. Any function can be used as a constructor, and before 2015, the way to define a class was to write a regular function and then manipulate its prototype property.

```
function ArchaicRabbit(type) {
  this.type = type;
}
ArchaicRabbit.prototype.speak = function(line) {
  console.log(`The ${this.type} rabbit says '${line}'`);
};
let oldSchoolRabbit = new ArchaicRabbit("old school");
```
For this reason, all non-arrow functions start with a prototype property holding an empty object.

By convention, the names of constructors are capitalized so that they can easily be distinguished from other functions.

It is important to understand the distinction between the way a prototype is associated with a constructor (through its prototype property) and the way objects have a prototype (which can be found with Object.getPrototypeOf). The actual prototype of a constructor is Function.prototype since constructors are functions. The constructor function’s prototype property holds the prototype used for instances created through it.

```
console.log(Object.getPrototypeOf(Rabbit) == Function.prototype);
// → true
console.log(Object.getPrototypeOf(killerRabbit) == Rabbit.prototype);
// → true
```
Constructors will typically add some per-instance properties to this. It is also possible to declare properties directly in the class declaration. Unlike methods, such properties are added to instance objects and not the prototype.

```
class Particle {
  speed = 0;
  constructor(position) {
    this.position = position;
  }
}
```
Like function, class can be used both in statements and in expressions. When used as an expression, it doesn’t define a binding but just produces the constructor as a value. You are allowed to omit the class name in a class expression.

```
let object = new class { getWord() { return "hello"; } };
console.log(object.getWord());
// → hello
```