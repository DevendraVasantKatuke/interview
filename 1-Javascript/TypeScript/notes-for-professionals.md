---
title: notes for professionals
date: 2021-12-24
---

## Basic syntax

```
var num: number = 5;
```

where `type` is any of:

- number (both integers and ﬂoating point numbers)
- string
- boolean
- Array: Array<T> or T[] // T for type, ie number, string..
- Tuples: [boolean, string]
- {}, {name: string, age: number}
- {[key: string]: number} - a dictionary of numbers indexed by string
- enum: { Red = 0, Blue, Green } - enumeration mapped to numbers
- Function
  - (param: number) => string - function taking one number parameter returning string
  - () => number - function with no parameters returning an number.
  - (a: string, b?: boolean) => void - function taking a string and optionally a boolean with no return value.
- any
- void: represents "nothing", can be used as a function return value. Only null and undefined are part of the void type.
- never
  - let foo: never; -As the type of variables under type guards that are never true.
  - function error(message: string): never { throw new Error(message); } - As the return type of functions that never return.
- null - type for the value null. null is implicitly part of every type, unless strict null checks are enabled.

### Casting

You can perform explicit casting through angle brackets, for instance:

```
// Option 1:
var derived: MyInterface;
(<ImplementingClass>derived).someSpecificMethod();

// Option 2: preferred way:
var derived: MyInterface;
(derived as ImplementingClass).someSpecificMethod();
```

### Class code

```
class Greeter {
    greeting: string;
    constructor(message: string) {
        this.greeting = message;
    }
    greet(): string {
        return this.greeting;
    }
};

let greeter = new Greeter("Hello, world!");
console.log(greeter.greet());
```

### Running TypeScript using ts-node

ts-node is an npm package which allows the user to run typescript ﬁles directly, without the need for precompilation using tsc. It also provides REPL.

```
npm install -g ts-node
npm install -g typescript

ts-node main.ts
// main.ts
console.log("Hello world");
```

### TypeScript REPL in Node.js

```
npm install -g tsun // tsun: TypeScript Upgraded Node
```

# TypeScript Core Types

## String Literal Types

```
let myFavoritePet: "dog";
myFavoritePet = "dog";

// myFavoritePet = "rock";
// Error: Type '"rock"' is not assignable to type '"dog"'.
```

Together with Type Aliases and Union Types you get a enum-like behavior.

```
type Species = "cat" | "dog" | "bird";

function buyPet(pet: Species, name: string) : Pet { /*...*/ }

buyPet(myFavoritePet /* "dog" as defined above */, "Rocky");
// Error: Argument of type '"rock"' is not assignable to parameter of type "'cat' | "dog" | "bird".
Type '"rock"' is not assignable to type '"bird"'.
// buyPet("rock", "Rocky");
```

String Literal Types can be used to distinguish overloads.

```
function buyPet(pet: Species, name: string) : Pet;
function buyPet(pet: "cat", name: string): Cat;
function buyPet(pet: "dog", name: string): Dog;
function buyPet(pet: "bird", name: string): Bird;
function buyPet(pet: Species, name: string) : Pet { /*...*/ }

let dog = buyPet(myFavoritePet /* "dog" as defined above */, "Rocky");
// dog is from type Dog (dog: Dog)
```

They works well for User-Deﬁned Type Guards.

```
interface Pet {
    species: Species;
    eat();
    sleep();
}

interface Cat extends Pet {
    species: "cat";
}

interface Bird extends Pet {
    species: "bird";
    sing();
}
function petIsCat(pet: Pet): pet is Cat {
    return pet.species === "cat";
}

function petIsBird(pet: Pet): pet is Bird {
    return pet.species === "bird";
}

function playWithPet(pet: Pet) {
    if (petIsCat(pet)) {
        // pet is now from type Cat (pet: Cat)
        pet.eat();
        pet.sleep();
    } else if (petIsBird(pet)) {
        // pet is now from type Bird (pet: Bird)
        pet.eat();
        pet.sing();
        pet.sleep();
    }
}
```

Full example code

```
let myFavoritePet: "dog";
myFavoritePet = "dog";

// Error: Type '"rock"' is not assignable to type '"dog"'.
// myFavoritePet = "rock";

type Species = "cat" | "dog" | "bird";

interface Pet {
    species: Species;
    name: string;
    eat();
    walk();
    sleep();
}

interface Cat extends Pet {
    species: "cat";
}

interface Dog extends Pet {
    species: "dog";
}

interface Bird extends Pet {
    species: "bird";
    sing();
}

// Error: Interface 'Rock' incorrectly extends interface 'Pet'. Types of property 'species' are incompatible. Type '"rock"' is not assignable to type '"cat" | "dog" | "bird"'. Type '"rock"' is not assignable to type '"bird"'.

// interface Rock extends Pet {
// type: "rock";
// }

function buyPet(pet: Species, name: string) : Pet;
function buyPet(pet: "cat", name: string): Cat;
function buyPet(pet: "dog", name: string): Dog;
function buyPet(pet: "bird", name: string): Bird;
function buyPet(pet: Species, name: string) : Pet {
if(pet === "cat") {
    return {
        species: "cat",
        name: name,
        eat: function () {
            console.log(`${this.name} eats.`);
        }, walk: function () {
            console.log(`${this.name} walks.`);
        }, sleep: function () {
            console.log(`${this.name} sleeps.`);
        }
    } as Cat;
} else if (pet === "dog") {
    return {
        species: "dog",
        name: name,
        eat: function () {
            console.log(`${this.name} eats.`);
        }, walk: function () {
            console.log(`${this.name} walks.`);
        }, sleep: function () {
            console.log(`${this.name} sleeps.`);
        }
    } as Dog;
} else if (pet === "bird") {
    return {
        species: "bird",
        name: name,
        eat: function () {
            console.log(`${this.name} eats.`);
        }, walk: function () {
            console.log(`${this.name} walks.`);
        }, sleep: function () {
            console.log(`${this.name} sleeps.`);
        }, sing: function () {
            console.log(`${this.name} sings.`);
        }
    } as Bird;
} else {
    throw `Sorry we do not have a ${pet}. Would you like to buy a dog?`;
    }
}

function petIsCat(pet: Pet): pet is Cat {
    return pet.species === "cat";
}

function petIsDog(pet: Pet): pet is Dog {
    return pet.species === "dog";
}

function petIsBird(pet: Pet): pet is Bird {
    return pet.species === "bird";
}

function playWithPet(pet: Pet) {
    console.log(`Hey ${pet.name}, lets play.`);
    if (petIsCat(pet)) {
        // pet is now from type Cat (pet: Cat)
        pet.eat();
        pet.sleep();

        // Error: Type '"bird"' is not assignable to type '"cat"'.
        // pet.type = "bird";

        // Error: Property 'sing' does not exist on type 'Cat'.
        // pet.sing();
    } else if (petIsDog(pet)) {
        // pet is now from type Dog (pet: Dog)
        pet.eat();
        pet.walk();
        pet.sleep();
    } else if (petIsBird(pet)) {
        // pet is now from type Bird (pet: Bird)
        pet.eat();
        pet.sing();
        pet.sleep();
    } else {
        throw "An unknown pet. Did you buy a rock?";
    }
}

let dog = buyPet(myFavoritePet /* "dog" as defined above */, "Rocky");
// dog is from type Dog (dog: Dog)

// Error: Argument of type '"rock"' is not assignable to parameter of type "'cat' | "dog" | "bird".
Type '"rock"' is not assignable to type '"bird"'.
// buyPet("rock", "Rocky");

playWithPet(dog);
// Output:  Hey Rocky, lets play.
//          Rocky eats.
//          Rocky walks.
//          Rocky sleeps.
```

## Tuple

Array type with known and possibly diﬀerent types:

```
let day: [number, string];
day = [0, 'Monday'];
// valid
day = ['zero', 'Monday']; // invalid: 'zero' is not numeric
console.log(day[0]); // 0
console.log(day[1]); // Monday

day[2] = 'Saturday'; // valid: [0, 'Saturday']
day[3] = false;
// invalid: must be union type of 'number | string'
```

## Boolean

A boolean represents the most basic datatype in TypeScript, with the purpose of assigning true/false values.

```
// set with initial value (either true or false)
let isTrue: boolean = true;

// defaults to 'undefined', when not explicitly set
let unsetBool: boolean;

// can also be set to 'null' as well
let nullableBool: boolean = null;
```

## Intersection Types

A Intersection Type combines the member of two or more types.

```
interface Knife {
    cut();
}

interface BottleOpener{
    openBottle();
}

interface Screwdriver{
    turnScrew();
}

type SwissArmyKnife = Knife & BottleOpener & Screwdriver;

function use(tool: SwissArmyKnife){
    console.log("I can do anything!");

    tool.cut();
    tool.openBottle();
    tool.turnScrew();
}
```

## Types in function arguments and return value. Number

When you create a function in TypeScript you can specify the data type of the function's arguments and the data type for the return value

Example:

```
function sum(x: number, y: number): number {
    return x + y;
}
```

Here the syntax `x: number, y: number` means that the function can accept two arguments `x` and `y` and they can only be numbers and (...): number { means that the return value can only be a number

Usage:

```
sum(84 + 76) // will be return 160
```

Note: You can not do so

```
function sum(x: string, y: string): number {
    return x + y;
}
```

or

```
function sum(x: number, y: number): string {
    return x + y;
}
```

it will receive the following errors:

```
error TS2322: Type 'string' is not assignable to type 'number' and error TS2322: Type 'number' is not assignable to type 'string' respectively
```

## Types in function arguments and return value. String

Example:

```
function hello(name: string): string {
    return `Hello ${name}!`;
}
```

Here the syntax `name: string` means that the function can accept one name argument and this argument can only be string and (...): string { means that the return value can only be a string

Usage:

```
hello('StackOverflow Documentation') // will be return Hello StackOverflow Documentation!
```

## const Enum

A const Enum is the same as a normal Enum. Except that no Object is generated at compile time. Instead, the literal values are substituted where the const Enum is used.

```
// TypeScript: A const Enum can be defined like a normal Enum (with start value, specific values, etc.)

const enum NinjaActivity {
    Espionage,
    Sabotage,
    Assassination
}
// JavaScript: But nothing is generated

// TypeScript: Except if you use it
let myFavoriteNinjaActivity = NinjaActivity.Espionage;
console.log(myFavoritePirateActivity); // 0
// JavaScript: Then only the number of the value is compiled into the code
// var myFavoriteNinjaActivity = 0 /* Espionage */;
// console.log(myFavoritePirateActivity); // 0

// TypeScript: The same for the other constant example
console.log(NinjaActivity["Sabotage"]); // 1

// JavaScript: Just the number and in a comment the name of the value
// console.log(1 /* "Sabotage" */); // 1

// TypeScript: But without the object none runtime access is possible
// Error: A const enum member can only be accessed using a string literal.
// console.log(NinjaActivity[myFavoriteNinjaActivity]);
```

For comparison, a normal Enum

```
// TypeScript: A normal Enum
enum PirateActivity {
    Boarding,
    Drinking,
    Fencing
}

// JavaScript: The Enum after the compiling
// var PirateActivity;
// (function (PirateActivity) {
//      PirateActivity[PirateActivity["Boarding"] = 0] = "Boarding";
//      PirateActivity[PirateActivity["Drinking"] = 1] = "Drinking";
//      PirateActivity[PirateActivity["Fencing"] = 2] = "Fencing";
//})(PirateActivity || (PirateActivity = {}));

// TypeScript: A normal use of this Enum
let myFavoritePirateActivity = PirateActivity.Boarding;
console.log(myFavoritePirateActivity); // 0

// JavaScript: Looks quite similar in JavaScript
// var myFavoritePirateActivity = PirateActivity.Boarding;
// console.log(myFavoritePirateActivity); // 0

// TypeScript: And some other normal use
console.log(PirateActivity["Drinking"]); // 1

// JavaScript: Looks quite similar in JavaScript
// console.log(PirateActivity["Drinking"]); // 1

// TypeScript: At runtime, you can access an normal enum
console.log(PirateActivity[myFavoritePirateActivity]); // "Boarding"

// JavaScript: And it will be resolved at runtime
// console.log(PirateActivity[myFavoritePirateActivity]); // "Boarding"
```

## Number

Like JavaScript, numbers are ﬂoating point values.

```
let pi: number = 3.14;              // base 10 decimal by default
let hexadecimal: number = 0xFF;     // 255 in decimal
```

ECMAScript 2015 allows binary and octal.

```
let binary: number = 0b10;          // 2 in decimal
let octal: number = 0o755;          // 493 in decimal
```

## String

Textual data type:

```
let singleQuotes: string = 'single';
let doubleQuotes: string = "double";
let templateString: string = `I am ${ singleQuotes }`; // I am single
```

## Array

An array of values:

```
let threePigs: number[] = [1, 2, 3];
let genericStringArray: Array<string> = ['first', '2nd', '3rd'];
```

## Enum

A type to name a set of numeric values:

Number values default to 0:

```
enum Day { Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday };
let bestDay: Day = Day.Saturday;
```

Set a default starting number:

```
enum TenPlus { Ten = 10, Eleven, Twelve }
```

or assign values:

```
enum MyOddSet { Three = 3, Five = 5, Seven = 7, Nine = 9 }
```

## Any

When unsure of a type, any is available:

```
let anything: any = 'I am a string';
anything = 5; // but now I am the number 5
```

## Void

If you have no type at all, commonly used for functions that do not return anything:

```
function log(): void {
    console.log('I return nothing');
}

void types Can only be assigned null or undefined.
```

# Arrays: Finding Object in Array

Using ﬁnd()

```
const inventory = [
    {name: 'apples', quantity: 2},
    {name: 'bananas', quantity: 0},
    {name: 'cherries', quantity: 5}
];

function findCherries(fruit) {
    return fruit.name === 'cherries';
}

inventory.find(findCherries); // { name: 'cherries', quantity: 5 }
/* OR */
inventory.find(e => e.name === 'apples'); // { name: 'apples', quantity: 2 }
```

# Enums

## Enums with explicit values

By default all enum values are resolved to numbers. Let's say if you have something like

```
enum MimeType {
    JPEG,
    PNG,
    PDF
}
```

the real value behind e.g. MimeType.PDF will be 2.

But some of the time it is important to have the enum resolve to a diﬀerent type. E.g. you receive the value from backend / frontend / another system which is deﬁnitely a string. This could be a pain, but luckily there is this method:

```
enum MimeType {
    JPEG = <any>'image/jpeg',
    PNG = <any>'image/png',
    PDF = <any>'application/pdf'
}
```

This resolves the MimeType.PDF to application/pdf.

It's possible to declare string enums:

```
enum MimeType {
    JPEG = 'image/jpeg',
    PNG = 'image/png',
    PDF = 'application/pdf',
}
```

You can explicitly provide numeric values using the same method

```
enum MyType {
    Value = 3,
    ValueEx = 30,
    ValueEx2 = 300
}
```

Fancier types also work, since non-const enums are real objects at runtime, for example

```
enum FancyType {
    OneArr = <any>[1],
    TwoArr = <any>[2, 2],
    ThreeArr = <any>[3, 3, 3]
}
```

becomes

```
var FancyType;
(function (FancyType) {
    FancyType[FancyType["OneArr"] = [1]] = "OneArr";
    FancyType[FancyType["TwoArr"] = [2, 2]] = "TwoArr";
    FancyType[FancyType["ThreeArr"] = [3, 3, 3]] = "ThreeArr";
})(FancyType || (FancyType = {}));
```

## How to get all enum values

```
enum SomeEnum { A, B }
let enumValues:Array<string>= [];
for(let value in SomeEnum) {
    if(typeof SomeEnum[value] === 'number') {
        enumValues.push(value);
    }
}
enumValues.forEach(v=> console.log(v))
//A
//B
```

## Extending enums without custom enum implementation

```
enum SourceEnum {
    value1 = <any>'value1',
    value2 = <any>'value2'
}

enum AdditionToSourceEnum {
    value3 = <any>'value3',
    value4 = <any>'value4'
}

// we need this type for TypeScript to resolve the types correctly
type TestEnumType = SourceEnum | AdditionToSourceEnum;
// and we need this value "instance" to use values
let TestEnum = Object.assign({}, SourceEnum, AdditionToSourceEnum);
// also works fine the TypeScript 2 feature
// let TestEnum = { ...SourceEnum, ...AdditionToSourceEnum };

function check(test: TestEnumType) {
    return test === TestEnum.value2;
}

console.log(TestEnum.value1);
console.log(TestEnum.value2 === <any>'value2');
console.log(check(TestEnum.value2));
console.log(check(TestEnum.value3));
```

## Custom enum implementation: extends for enums

Sometimes it is required to implement Enum on your own. E.g. there is no clear way to extend other enums.

Custom implementation allows this:

```
class Enum {
    constructor(protected value: string) {}

    public toString() {
        return String(this.value);
    }

    public is(value: Enum | string) {
        return this.value = value.toString();
    }
}

class SourceEnum extends Enum {
    public static value1 = new SourceEnum('value1');
    public static value2 = new SourceEnum('value2');
}

class TestEnum extends SourceEnum {
    public static value3 = new TestEnum('value3');
    public static value4 = new TestEnum('value4');
}

function check(test: TestEnum) {
    return test === TestEnum.value2;
}

let value1 = TestEnum.value1;

console.log(value1 + 'hello');
console.log(value1.toString() === 'value1');
console.log(value1.is('value1'));
console.log(!TestEnum.value3.is(TestEnum.value3));
console.log(check(TestEnum.value2));
// this works but perhaps your TSLint would complain
// attention! does not work with ===
// use .is() instead
console.log(TestEnum.value1 == <any>'value1');
```

# Functions

## Optional and Default Parameters

### Optional Parameters

In TypeScript, every parameter is assumed to be required by the function. You can add a ? at the end of a parameter name to set it as optional.

For example, the lastName parameter of this function is optional:

```
function buildName(firstName: string, lastName?: string) {
    // ...
}
```

Optional parameters must come after all non-optional parameters:

```
function buildName(firstName?: string, lastName: string) // Invalid
```

### Default Parameters

If the user passes undefined or doesn't specify an argument, the default value will be assigned. These are called `default-initialized` parameters.

For example, "Smith" is the default value for the lastName parameter.

```
function buildName(firstName:string, lastName = "Smith") {
    // ...
}
buildName('foo', 'bar');    // firstName == 'foo', lastName == 'bar'
buildName('foo');           // firstName == 'foo', lastName == 'Smith'
buildName('foo', undefined);// firstName == 'foo', lastName == 'Smith'
```

## Function as a parameter

Suppose we want to receive a function as a parameter, we can do it like this:

```
function foo(otherFunc: Function): void {
    ...
}
```

If we want to receive a constructor as a parameter:

```
function foo(constructorFunc: { new() }) {
    new constructorFunc();
}

function foo(constructorWithParamsFunc: { new(num: number) }) {
    new constructorWithParamsFunc(1);
}
```

Or to make it easier to read we can deﬁne an interface describing the constructor:

```
interface IConstructor {
    new();
}

function foo(contructorFunc: IConstructor) {
    new constructorFunc();
}
```

Or with parameters:

```
interface INumberConstructor {
    new(num: number);
}

function foo(contructorFunc: INumberConstructor) {
    new contructorFunc(1);
}
```

Even with generics:

```
interface ITConstructor<T, U> {
    new(item: T): U;
}

function foo<T, U>(contructorFunc: ITConstructor<T, U>, item: T): U {
    return new contructorFunc(item);
}
```

If we want to receive a simple function and not a constructor it's almost the same:

```
function foo(func: { (): void }) {
    func();
}

function foo(constructorWithParamsFunc: { (num: number): void }) {
    new constructorWithParamsFunc(1);
}
```

Or to make it easier to read we can deﬁne an interface describing the function:

```
interface IFunction {
    (): void;
}

function foo(func: IFunction ) {
    func();
}
```

Or with parameters:

```
interface INumberFunction {
    (num: number): string;
}

function foo(func: INumberFunction ) {
    func(1);
}
```

Even with generics:

```
interface ITFunc<T, U> {
    (item: T): U;
}

function foo<T, U>(contructorFunc: ITFunc<T, U>, item: T): U {
    return func(item);
}
```

## Functions with Union Types

A TypeScript function can take in parameters of multiple, predeﬁned types using union types.

```
function whatTime(hour:number|string, minute:number|string):string{
    return hour+':'+minute;
}

whatTime(1,30)      //'1:30'
whatTime('1',30)    //'1:30'
whatTime(1,'30')    //'1:30'
whatTime('1','30')  //'1:30'
```

TypeScript treats these parameters as a single type that is a union of the other types, so your function must be able to handle parameters of any type that is in the union.

```
function addTen(start: number|string): number {
    if (typeof number === 'string') {
        return parseInt(number)+10;
    } else {
        else return number+10;
    }
}
```

## Types of Functions

Named functions

```
function multiply(a, b) {
    return a * b;
}
```

Anonymous functions

```
let multiply = function(a, b) { return a * b; };
```

Lambda / arrow functions

```
let multiply = (a, b) => { return a * b; };
```

# Classes

TypeScript, like ECMAScript 6, support object-oriented programming using classes. This contrasts with older JavaScript versions, which only supported prototype-based inheritance chain.

The class support in TypeScript is similar to that of languages like Java and C#, in that classes may inherit from other classes, while objects are instantiated as class instances.

Also similar to those languages, TypeScript classes may implement interfaces or make use of generics.

## Abstract Classes

```
abstract class Machine {
    constructor(public manufacturer: string) {
    }

    // An abstract class can define methods of its own, or...
    summary(): string {
        return `${this.manufacturer} makes this machine.`;
    }

    // Require inheriting classes to implement methods
    abstract moreInfo(): string;
}

class Car extends Machine {
    constructor(manufacturer: string, public position: number, protected speed: number) {
        super(manufacturer);
    }

    move() {
        this.position += this.speed;
    }

    moreInfo() {
        return `This is a car located at ${this.position} and going ${this.speed}mph!`;
    }
}

let myCar = new Car("Konda", 10, 70);
myCar.move(); // position is now 80
console.log(myCar.summary()); // prints "Konda makes this machine."
console.log(myCar.moreInfo()); // prints "This is a car located at 80 and going 70mph!"
```

Abstract classes are base classes from which other classes can extend. They cannot be instantiated themselves (i.e. you cannot do `new Machine("Konda"))`.

The two key characteristics of an abstract class in TypeScript are:

1. They can implement methods of their own.
2. They can deﬁne methods that inheriting classes must implement.
   For this reason, abstract classes can conceptually be considered a combination of an interface and a class.

## Simple class

```
class Car {
    public position: number = 0;
    private speed: number = 42;

    move() {
        this.position += this.speed;
    }
}
```

In this example, we declare a simple class Car. The class has three members: a private property speed, a public property position and a public method move. Note that each member is public by default. That's why move() is public, even if we didn't use the public keyword.

```
var car = new Car();        // create an instance of Car
car.move();                 // call a method
console.log(car.position);  // access a public property
```

## Basic Inheritance

```
class Car {
    public position: number = 0;
    protected speed: number = 42;

    move() {
        this.position += this.speed;
    }
}

class SelfDrivingCar extends Car {
    move() {
        // start moving around :-)
        super.move();
        super.move();
    }
}
```

This examples shows how to create a very simple subclass of the Car class using the extends keyword. The SelfDrivingCar class overrides the move() method and uses the base class implementation using super.

## Constructors

In this example we use the constructor to declare a public property position and a protected property speed in the base class. These properties are called Parameter properties. They let us declare a constructor parameter and a
member in one place.

One of the best things in TypeScript, is automatic assignment of constructor parameters to the relevant property.

```
class Car {
    public position: number;
    protected speed: number;

    constructor(position: number, speed: number) {
        this.position = position;
        this.speed = speed;
    }

    move() {
        this.position += this.speed;
    }
}
```

All this code can be resumed in one single constructor:

```
class Car {
    constructor(public position: number, protected speed: number) {}

    move() {
        this.position += this.speed;
    }
}
```

And both of them will be transpiled from TypeScript (design time and compile time) to JavaScript with same result, but writing signiﬁcantly less code:

```
var Car = (function () {
    function Car(position, speed) {
        this.position = position;
        this.speed = speed;
    }
    Car.prototype.move = function () {
        this.position += this.speed;
    };
    return Car;
}());
```

Constructors of derived classes have to call the base class constructor with super().

```
class SelfDrivingCar extends Car {
    constructor(startAutoPilot: boolean) {
        super(0, 42);
        if (startAutoPilot) {
            this.move();
        }
    }
}

let car = new SelfDrivingCar(true);
console.log(car.position); // access the public property position
```

## Accessors

In this example, we modify the "Simple class" example to allow access to the speed property. TypeScript accessors allow us to add additional code in getters or setters.

```
class Car {
    public position: number = 0;
    private _speed: number = 42;
    private _MAX_SPEED = 100

    move() {
        this.position += this._speed;
    }

    get speed(): number {
        return this._speed;
    }

    set speed(value: number) {
        this._speed = Math.min(value, this._MAX_SPEED);
    }
}

let car = new Car();
car.speed = 120;
console.log(car.speed);
```

## Transpilation

Given a class SomeClass, let's see how the TypeScript is transpiled into JavaScript.

### TypeScript source

```
class SomeClass {
    public static SomeStaticValue: string = "hello";
    public someMemberValue: number = 15;
    private somePrivateValue: boolean = false;

    constructor () {
        SomeClass.SomeStaticValue = SomeClass.getGoodbye();
        this.someMemberValue = this.getFortyTwo();
        this.somePrivateValue = this.getTrue();
    }

    public static getGoodbye(): string {
        return "goodbye!";
    }

    public getFortyTwo(): number {
        return 42;
    }

    private getTrue(): boolean {
        return true;
    }
}
```

### JavaScript source

When transpiled using TypeScript v2.2.2, the output is like so:

```
var SomeClass = (function () {
    function SomeClass() {
        this.someMemberValue = 15;
        this.somePrivateValue = false;
        SomeClass.SomeStaticValue = SomeClass.getGoodbye();
        this.someMemberValue = this.getFortyTwo();
        this.somePrivateValue = this.getTrue();
    }

    SomeClass.getGoodbye = function () {
        return "goodbye!";
    };

    SomeClass.prototype.getFortyTwo = function () {
        return 42;
    };

    SomeClass.prototype.getTrue = function () {
        return true;
    };

    return SomeClass;
}());
SomeClass.SomeStaticValue = "hello";
```

### Observations

- The modiﬁcation of the class' prototype is wrapped inside an IIFE.
- Member variables are deﬁned inside the main class function.
- Static properties are added directly to the class object, whereas instance properties are added to the prototype.

## Monkey patch a function into an existing class

Sometimes it's useful to be able to extend a class with new functions. For example let's suppose that a string should be converted to a camel case string. So we need to tell TypeScript, that String contains a function called toCamelCase, which returns a string.

```
interface String {
    toCamelCase(): string;
}
```

Now we can patch this function into the String implementation.

```
String.prototype.toCamelCase = function() : string {
    return this.replace(/[^a-z ]/ig, '')
        .replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, (match: any, index: number) => {
            return +match === 0 ? "" : match[index === 0 ? 'toLowerCase' : 'toUpperCase']();
        });
}
```

If this extension of String is loaded, it's usable like this:

```
"This is an example".toCamelCase(); // => "thisIsAnExample"
```

# Class Decorator

## Generating metadata using a class decorator

This time we are going to declare a class decorator that will add some metadata to a class when we applied to it:

```
function addMetadata(target: any) {
    // Add some metadata
    target.__customMetadata = {
        someKey: "someValue"
    };

    // Return target
    return target;
}
```

We can then apply the class decorator:

```
@addMetadata
class Person {
    private _name: string;
    public constructor(name: string) {
        this._name = name;
    }

    public greet() {
        return this._name;
    }
}

function getMetadataFromClass(target: any) {
    return target.__customMetadata;
}

console.log(getMetadataFromClass(Person));
```

The decorator is applied when the class is declared not when we create instances of the class. This means that the metadata is shared across all the instances of a class:

```
function getMetadataFromInstance(target: any) {
    return target.constructor.__customMetadata;
}

let person1 = new Person("John");
let person2 = new Person("Lisa");

console.log(getMetadataFromInstance(person1));
console.log(getMetadataFromInstance(person2));
```

## Passing arguments to a class decorator

We can wrap a class decorator with another function to allow customization:

```
function addMetadata(metadata: any) {
    return function log(target: any) {
        // Add metadata
        target.__customMetadata = metadata;
        // Return target
        return target;
    }
}
```

The addMetadata takes some arguments used as conﬁguration and then returns an unnamed function which is the actual decorator. In the decorator we can access the arguments because there is a closure in place.

We can then invoke the decorator passing some conﬁguration values:

```
@addMetadata({ guid: "417c6ec7-ec05-4954-a3c6-73a0d7f9f5bf" })
class Person {
    private _name: string;

    public constructor(name: string) {
        this._name = name;
    }

    public greet() {
        return this._name;
    }
}
```

We can use the following function to access the generated metadata:

```
function getMetadataFromClass(target: any) {
    return target.__customMetadata;
}

console.log(getMetadataFromInstance(Person));
```

If everything went right the console should display:

```
{ guid: "417c6ec7-ec05-4954-a3c6-73a0d7f9f5bf" }
```

## Basic class decorator

A class decorator is just a function that takes the class as its only argument and returns it after doing something with it:

```
function log<T>(target: T) {
    // Do something with target
    console.log(target);
    // Return target
    return target;
}
```

We can then apply the class decorator to a class:

```
@log
class Person {
    private _name: string;

    public constructor(name: string) {
        this._name = name;
    }
    public greet() {
        return this._name;
    }
}
```

# Interfaces

An interfaces speciﬁes a list of ﬁelds and functions that may be expected on any class implementing the interface. Conversely, a class cannot implement an interface unless it has every ﬁeld and function speciﬁed on the interface.

The primary beneﬁt of using interfaces, is that it allows one to use objects of diﬀerent types in a polymorphic way.

This is because any class implementing the interface has at least those ﬁelds and functions.

## Extending Interface

Suppose we have an interface:

```
interface IPerson {
    name: string;
    age: number;
    breath(): void;
}
```

And we want to create more speciﬁc interface that has the same properties of the person, we can do it using the extends keyword:

```
interface IManager extends IPerson {
    managerId: number;

    managePeople(people: IPerson[]): void;
}
```

In addition it is possible to extend multiple interfaces.

## Class Interface

Declare public variables and methods type in the interface to deﬁne how other typescript code can interact with it.

```
interface ISampleClassInterface {
    sampleVariable: string;
    sampleMethod(): void;
    optionalVariable?: string;
}
```

Here we create a class that implements the interface.

```
class SampleClass implements ISampleClassInterface {
    public sampleVariable: string;
    private answerToLifeTheUniverseAndEverything: number;

    constructor() {
        this.sampleVariable = 'string value';
        this.answerToLifeTheUniverseAndEverything = 42;
    }

    public sampleMethod(): void {
        // do nothing
    }

    private answer(q: any): number {
        return this.answerToLifeTheUniverseAndEverything;
    }
}
```

The example shows how to create an interface ISampleClassInterface and a class SampleClass that implements the interface.

## Using Interfaces for Polymorphism

The primary reason to use interfaces to achieve polymorphism and provide developers to implement on their own way in future by implementing interface's methods.

Suppose we have an interface and three classes:

```
interface Connector {
    doConnect(): boolean;
}
```

This is connector interface. Now we will implement that for Wiﬁ communication.

```
export class WifiConnector implements Connector {
    public doConnect(): boolean {
        console.log("Connecting via wifi");
        console.log("Get password");
        console.log("Lease an IP for 24 hours");
        console.log("Connected");
        return true
    }
}
```

Here we have developed our concrete class named WifiConnector that has its own implementation. This is now type Connector.

Now we are creating our System that has a component Connector. This is called dependency injection.

```
export class System {
    constructor(private connector: Connector){ #inject Connector type
        connector.doConnect()
    }
}
```

`constructor(private connector: Connector)` this line is very important here. Connector is an interface and must have `doConnect()`. As `Connector` is an interface this class System has much more ﬂexibility. We can pass any Type
which has implemented `Connector` interface. In future developer achieves more ﬂexibility. For example, now developer want to add Bluetooth Connection module:

```
export class BluetoothConnector implements Connector {
    public doConnect(): boolean {
        console.log("Connecting via Bluetooth");
        console.log("Pair with PIN");
        console.log("Connected");
        return true
    }
}
```

See that Wiﬁ and Bluetooth have its own implementation. Their own diﬀerent way to connect. However, hence both have implemented Type Connector the are now Type Connector. So that we can pass any of those to System class as the constructor parameter. This is called polymorphism. The class System is now not aware of whether it is Bluetooth / Wiﬁ even we can add another Communication module like Infrared, Bluetooth5 and whatsoever by just implementing Connector interface.

This is called Duck typing. Connector type is now dynamic as doConnect() is just a placeholder and developer implement this as his/her own.

if at constructor(private connector: WifiConnector) where WifiConnector is a concrete class what will happen? Then System class will tightly couple only with WiﬁConnector nothing else. Here interface solved our problem by polymorphism.

## Generic Interfaces

Like classes, interfaces can receive polymorphic parameters (aka Generics) too.

### Declaring Generic Parameters on Interfaces

```
interface IStatus<U> {
    code: U;
}

interface IEvents<T> {
    list: T[];
    emit(event: T): void;
    getAll(): T[];
}
```

Here, you can see that our two interfaces take some generic parameters, T and U.

### Implementing Generic Interfaces

We will create a simple class in order to implements the interface IEvents.

```
class State<T> implements IEvents<T> {
    list: T[];

    constructor() {
        this.list = [];
    }

    emit(event: T): void {
        this.list.push(event);
    }

    getAll(): T[] {
        return this.list;
    }
}
```

Let's create some instances of our `State` class.

In our example, the State class will handle a generic status by using IStatus<T>. In this way, the interface `IEvent<T>` will also handle a `IStatus<T>`.

```
const s = new State<IStatus<number>>();
// The 'code' property is expected to be a number, so:
s.emit({ code: 200 }); // works
s.emit({ code: '500' }); // type error

s.getAll().forEach(event => console.log(event.code));
```

Here our State class is typed as IStatus<number>.

```
const s2 = new State<IStatus<Code>>();

//We are able to emit code as the type Code
s2.emit({ code: { message: 'OK', status: 200 } });

s2.getAll().map(event => event.code).forEach(event => {
console.log(event.message);
console.log(event.status);
});
```

Our State class is typed as `IStatus<Code>`. In this way, we are able to pass more complex type to our emit method.

As you can see, generic interfaces can be a very useful tool for statically typed code.

## Add functions or properties to an existing interface

Let's suppose we have a reference to the JQuery type deﬁnition and we want to extend it to have additional functions from a plugin we included and which doesn't have an oﬃcial type deﬁnition. We can easily extend it by declaring functions added by plugin in a separate interface declaration with the same JQuery name:

```
interface JQuery {
    pluginFunctionThatDoesNothing(): void;

    // create chainable function
    manipulateDOM(HTMLElement): JQuery;
}
```

The compiler will merge all declarations with the same name into one

## Implicit Implementation And Object Shape

TypeScript supports interfaces, but the compiler outputs JavaScript, which doesn't. Therefore, interfaces are eﬀectively lost in the compile step. This is why type checking on interfaces relies on the shape of the object meaning whether the object supports the ﬁelds and functions on the interface - and not on whether the interface is
actually implemented or not.

```
interface IKickable {
    kick(distance: number): void;
}

class Ball {
    kick(distance: number): void {
        console.log("Kicked", distance, "meters!");
    }
}

let kickable: IKickable = new Ball();
kickable.kick(40);
```

So even if Ball doesn't explicitly implement IKickable, a Ball instance may be assigned to (and manipulated as) an `IKickable`, even when the type is speciﬁed.

## Using Interfaces to Enforce Types

One of the core beneﬁts of TypeScript is that it enforces data types of values that you are passing around your code to help prevent mistakes.

Let's say you're making a pet dating application.

You have this simple function that checks if two pets are compatible with each other...

```
checkCompatible(petOne, petTwo) {
    if (petOne.species === petTwo.species &&
    Math.abs(petOne.age - petTwo.age) <= 5) {
        return true;
    }
}
```

This is completely functional code, but it would be far too easy for someone, especially other people working on this application who didn't write this function, to be unaware that they are supposed to pass it objects with 'species' and 'age' properties. They may mistakenly try checkCompatible(petOne.species, petTwo.species) and then be left to ﬁgure out the errors thrown when the function tries to access petOne.species.species or petOne.species.age!

One way we can prevent this from happening is to specify the properties we want on the pet parameters:

```
checkCompatible(petOne: {species: string, age: number}, petTwo: {species: string, age: number}) {
    //...
}
```

In this case, TypeScript will make sure everything passed to the function has 'species' and 'age' properties (it is okay if they have additional properties), but this is a bit of an unwieldy solution, even with only two properties speciﬁed.
With interfaces, there is a better way!

First we deﬁne our interface:

```
interface Pet {
    species: string;
    age: number;
    //We can add more properties if we choose.
}
```

Now all we have to do is specify the type of our parameters as our new interface, like so...

```
checkCompatible(petOne: Pet, petTwo: Pet) {
    //...
}
```

... and TypeScript will make sure that the parameters passed to our function contain the properties speciﬁed in the Pet interface!

# Generics

## Generic Interfaces

Declaring a generic interface

```
interface IResult<T> {
    wasSuccessful: boolean;
    error: T;
}

var result: IResult<string> = ....
var error: string = result.error;
```

Generic interface with multiple type parameters

```
interface IRunnable<T, U> {
    run(input: T): U;
}

var runnable: IRunnable<string, number> = ...
var input: string;
var result: number = runnable.run(input);
```

Implementing a generic interface

```
interface IResult<T> {
    wasSuccessful: boolean;
    error: T;
    clone(): IResult<T>;
}
```

Implement it with generic class:

```
class Result<T> implements IResult<T> {
    constructor(public result: boolean, public error: T) {
    }

    public clone(): IResult<T> {
        return new Result<T>(this.result, this.error);
    }
}
```

Implement it with non generic class:

```
class StringResult implements IResult<string> {
    constructor(public result: boolean, public error: string) {
    }

    public clone(): IResult<string> {
        return new StringResult(this.result, this.error);
    }
}
```

## Generic Class

```
class Result<T> {
    constructor(public wasSuccessful: boolean, public error: T) {
    }

    public clone(): Result<T> {
        ...
    }
}

let r1 = new Result(false, 'error: 42');    // Compiler infers T to string
let r2 = new Result(false, 42);             // Compiler infers T to number
let r3 = new Result<string>(true, null);    // Explicitly set T to string
let r4 = new Result<string>(true, 4);       // Compilation error because 4 is not a string
```

## Type parameters as constraints

With TypeScript 1.8 it becomes possible for a type parameter constraint to reference type parameters from the same type parameter list. Previously this was an error.

```
function assign<T extends U, U>(target: T, source: U): T {
    for (let id in source) {
        target[id] = source[id];
    }
    return target;
}
let x = { a: 1, b: 2, c: 3, d: 4 };
assign(x, { b: 10, d: 20 });
assign(x, { e: 0 }); // Error
```

## Generics Constraints

Simple constraint:

```
interface IRunnable {
    run(): void;
}

interface IRunner<T extends IRunnable> {
    runSafe(runnable: T): void;
}
```

More complex constraint:

```
interface IRunnble<U> {
    run(): U;
}

interface IRunner<T extends IRunnable<U>, U> {
    runSafe(runnable: T): U;
}
```

Even more complex:

```
interface IRunnble<V> {
    run(parameter: U): V;
}

interface IRunner<T extends IRunnable<U, V>, U, V> {
    runSafe(runnable: T, parameter: U): V;
}
```

Inline type constraints:

```
interface IRunnable<T extends { run(): void }> {
    runSafe(runnable: T): void;
}
```

## Generic Functions

In interfaces:

```
interface IRunner {
    runSafe<T extends IRunnable>(runnable: T): void;
}
```

In classes:

```
class Runner implements IRunner {
    public runSafe<T extends IRunnable>(runnable: T): void {
        try {
            runnable.run();
        } catch(e) {
        }
    }
}
```

Simple functions:

```
function runSafe<T extends IRunnable>(runnable: T): void {
    try {
        runnable.run();
    } catch(e) {
    }
}
```

## Using generic Classes and Functions:

Create generic class instance:

```
var stringRunnable = new Runnable<string>();
```

Run generic function:

```
function runSafe<T extends Runnable<U>, U>(runnable: T);
// Specify the generic types:
runSafe<Runnable<string>, string>(stringRunnable);

// Let typescript figure the generic types by himself:
runSafe(stringRunnable);
```

# Strict null checks

## Strict null checks in action

By default, all types in TypeScript allow null:

```
function getId(x: Element) {
    return x.id;
}

getId(null); // TypeScript does not complain, but this is a runtime error.
```

TypeScript 2.0 adds support for strict null checks. If you set --strictNullChecks when running tsc (or set this ﬂag in your tsconfig.json), then types no longer permit `null`:

```
function getId(x: Element) {
    return x.id;
}

getId(null); // error: Argument of type 'null' is not assignable to parameter of type 'Element'.
```

You must permit null values explicitly:

```
function getId(x: Element|null) {
    return x.id; // error TS2531: Object is possibly 'null'.
}

getId(null);
```

With a proper guard, the code type checks and runs correctly:

```
function getId(x: Element|null) {
    if (x) {
        return x.id; // In this branch, x's type is Element
    } else {
        return null; // In this branch, x's type is null.
    }
}

getId(null);
```

## Non-null assertions

The non-null assertion operator, !, allows you to assert that an expression isn't null or undefined when the TypeScript compiler can't infer that automatically:

```
type ListNode = { data: number; next?: ListNode; };

function addNext(node: ListNode) {
    if (node.next === undefined) {
        node.next = {data: 0};
    }
}

function setNextValue(node: ListNode, value: number) {
    addNext(node);

    // Even though we know `node.next` is defined because we just called `addNext`,
    // TypeScript isn't able to infer this in the line of code below:
    // node.next.data = value;
    // So, we can use the non-null assertion operator, !,
    // to assert that node.next isn't undefined and silence the compiler warning
    node.next!.data = value;
}
```

# User-deﬁned Type Guards

## Type guarding functions

You can declare functions that serve as type guards using any logic you'd like.

They take the form:

```
function functionName(variableName: any): variableName is DesiredType {
    // body that returns boolean
}
```

If the function returns true, TypeScript will narrow the type to DesiredType in any block guarded by a call to the function.

```
function isString(test: any): test is string {
    return typeof test === "string";
}

function example(foo: any) {
    if (isString(foo)) {
        // foo is type as a string in this block
        console.log("it's a string: " + foo);
    } else {
        // foo is type any in this block
        console.log("don't know what this is! [" + foo + "]");
    }
}

example("hello world");         // prints "it's a string: hello world"
example({ something: "else" }); // prints "don't know what this is! [[object Object]]"
```

A guard's function type predicate (the foo is Bar in the function return type position) is used at compile time to narrow types, the function body is used at runtime. The type predicate and function must agree, or your code won't work.

Type guard functions don't have to use typeof or instanceof, they can use more complicated logic.

For example, this code determines if you've got a jQuery object by checking for its version string.

```
function isJQuery(foo): foo is JQuery {
    // test for jQuery's version string
    return foo.jquery !== undefined;
}

function example(foo) {
    if (isJQuery(foo)) {
        // foo is typed JQuery here
        foo.eq(0);
    }
}
```

## Using instanceof

instanceof requires that the variable is of type any.

```
class Pet { }

class Dog extends Pet {
    bark() {
        console.log("woof");
    }
}

class Cat extends Pet {
    purr() {
        console.log("meow");
    }
}

function example(foo: any) {
    if (foo instanceof Dog) {
        // foo is type Dog in this block
        foo.bark();
    }
    if (foo instanceof Cat) {
        // foo is type Cat in this block
        foo.purr();
    }
}
example(new Dog()); // woof
example(new Cat()); // meow
```

## Using typeof

`typeof` is used when you need to distinguish between types number, string, boolean, and symbol. Other string constants will not error, but won't be used to narrow types either.

Unlike `instanceof`, `typeof` will work with a variable of any type. In the example below, foo could be typed as `number | string` without issue.

```
function example(foo: any) {
    if (typeof foo === "number") {
        // foo is type number in this block
        console.log(foo + 100);
    }
    if (typeof foo === "string") {
        // foo is type string in this block
        console.log("not a number: " + foo);
    }
}
example(23);    // 123
example("foo"); // not a number: foo
```

# TypeScript basic examples

## 1 basic class inheritance example using extends and super keyword

A generic Car class has some car property and a description method

```
class Car {
    name:string;
    engineCapacity:string;

    constructor(name:string,engineCapacity:string) {
        this.name = name;
        this.engineCapacity = engineCapacity;
    }

    describeCar() {
        console.log(`${this.name} car comes with ${this.engineCapacity} displacement`);
    }
}

new Car("maruti ciaz","1500cc").describeCar();
```

HondaCar extends the existing generic car class and adds new property.

```
class HondaCar extends Car {
    seatingCapacity:number;

    constructor(name:string,engineCapacity:string,seatingCapacity:number) {
        super(name,engineCapacity);
        this.seatingCapacity=seatingCapacity;
    }

    describeHondaCar() {
        super.describeCar();
        console.log(`this cars comes with seating capacity of ${this.seatingCapacity}`);
    }
}

new HondaCar("honda jazz","1200cc",4).describeHondaCar();
```

## 2 static class variable example - count how many time method is being invoked

here countInstance is a static class variable

```
class StaticTest {
    static countInstance : number= 0;

    constructor() {
        StaticTest.countInstance++;
    }
}

new StaticTest();
new StaticTest();
console.log(StaticTest.countInstance);
```

# Importing external libraries

## Finding deﬁnition ﬁles

deﬁnitions from `DeﬁnitelyTyped` are available via `@types npm` package

```
npm i --save lodash
npm i --save-dev @types/lodash
```

but in case if you want use types from other repos then can be used old way:

for typescript 1.x:
Typings is an npm package that can automatically install type deﬁnition ﬁles into a local project. I recommend that you read the quickstart.

```
npm install -global typings
```

Now we have access to the typings cli.

```
typings install dt~lodash --global --save
```

If we want to install typings that will be used for development environment only, we can supply the --savedev ﬂag:

```
typings install chai --save-dev
```

## Importing a module from npm

If you have a type deﬁnition ﬁle (d.ts) for the module, you can use an import statement.

```
import _ = require('lodash');
```

If you don't have a deﬁnition ﬁle for the module, TypeScript will throw an error on compilation because it cannot ﬁnd the module you are trying to import.

In this case, you can import the module with the normal runtime require function. This returns it as the any type,

however.

```
// The _ variable is of type any, so TypeScript will not perform any type checking.
const _: any = require('lodash');
```

As of TypeScript 2.0, you can also use a shorthand ambient module declaration in order to tell TypeScript that a module exists when you don't have a type deﬁnition ﬁle for the module. TypeScript won't be able to provide any meaningful typechecking in this case though.

```
declare module "lodash";
// you can now import from lodash in any way you wish:
import { flatten } from "lodash";
import * as _ from "lodash";
```

As of TypeScript 2.1, the rules have been relaxed even further. Now, as long as a module exists in your node_modules directory, TypeScript will allow you to import it, even with no module declaration anywhere. (Note that if using the --noImplicitAny compiler option, the below will still generate a warning.)

```
// Will work if `node_modules/someModule/index.js` exists, or if
`node_modules/someModule/package.json` has a valid "main" entry point
import { foo } from "someModule";
```

## Using global external libraries without typings

Although modules are ideal, if the library you are using is referenced by a global variable (like $ or \_), because it was loaded by a script tag, you can create an ambient declaration in order to refer to it:

```
declare const _: any;
```

## Finding deﬁnition ﬁles with TypeScript 2.x

With the 2.x versions of TypeScript, typings are now available from the npm @types repository. These are automatically resolved by the TypeScript compiler and are much simpler to use.

To install a type deﬁnition you simply install it as a dev dependency in your projects package.json

```
npm i -S lodash
npm i -D @types/lodash
```

after install you simply use the module as before

```
import * as _ from 'lodash'
```

# Modules - exporting and importing

## Hello world module

```
//hello.ts
export function hello(name: string) {
    console.log(`Hello ${name}!`);
}

function helloES(name: string){
    console.log(`Hola ${name}!`);
}

export {helloES};
export default hello;
```

### Load using directory index

If directory contains ﬁle named index.ts it can be loaded using only directory name (for index.ts ﬁlename is optional).

```
//welcome/index.ts
export function welcome(name: string){
    console.log(`Welcome ${name}!`);
}
```

Example usage of deﬁned modules

```
import {hello, helloES} from "./hello"; // load specified elements
import defaultHello from "./hello";     // load default export into name defaultHello
import * as Bundle from "./hello";      // load all exports as Bundle
import {welcome} from "./welcome";      // note index.ts is omitted

hello("World");                         // Hello World!
helloES("Mundo");                       // Hola Mundo!
defaultHello("World");                  // Hello World!

Bundle.hello("World");                  // Hello World!
Bundle.helloES("Mundo");                // Hola Mundo!

welcome("Human");                       // Welcome Human!
```

## Re-export

TypeScript allow to re-export declarations.

```
//Operator.ts
interface Operator {
    eval(a: number, b: number): number;
}
export default Operator;

//Add.ts
import Operator from "./Operator";
export class Add implements Operator {
    eval(a: number, b: number): number {
        return a + b;
    }
}

//Mul.ts
import Operator from "./Operator";
export class Mul implements Operator {
    eval(a: number, b: number): number {
        return a * b;
    }
}
```

You can bundle all operations in single library

```
//Operators.ts
import {Add} from "./Add";
import {Mul} from "./Mul";
export {Add, Mul};
```

Named declarations can be re-exported using shorter syntax

```
//NamedOperators.ts
export {Add} from "./Add";
export {Mul} from "./Mul";
```

Default exports can also be exported, but no short syntax is available. Remember, only one default export per module is possible.

```
//Calculator.ts
export {Add} from "./Add";
export {Mul} from "./Mul";
import Operator from "./Operator";
export default Operator;
```

Possible is re-export of bundled import

```
//RepackedCalculator.ts
export * from "./Operators";
```

When re-exporting bundle, declarations may be overridden when declared explicitly.

```
//FixedCalculator.ts
export * from "./Calculator"
import Operator from "./Calculator";
export class Add implements Operator {
    eval(a: number, b: number): number {
        return 42;
    }
}
```

Usage example

```
//run.ts
import {Add, Mul} from "./FixedCalculator";
const add = new Add();
const mul = new Mul();

console.log(add.eval(1, 1)); // 42
console.log(mul.eval(3, 4)); // 12
```

## Exporting/Importing declarations

Any declaration (variable, const, function, class, etc.) can be exported from module to be imported in other module.

TypeScript oﬀer two export types: named and default.

### Named export

```
// adams.ts
export function hello(name: string){
    console.log(`Hello ${name}!`);
}
export const answerToLifeTheUniverseAndEverything = 42;
export const unused = 0;
```

When importing named exports, you can specify which elements you want to import.

```
import {hello, answerToLifeTheUniverseAndEverything} from "./adams";
hello(answerToLifeTheUniverseAndEverything);
// Hello 42!
```

### Default export

Each module can have one default export

```
// dent.ts
const defaultValue = 54;
export default defaultValue;
```

which can be imported using

```
import dentValue from "./dent";
console.log(dentValue); // 54
```

### Bundled import

TypeScript oﬀers method to import whole module into variable

```
// adams.ts
export function hello(name: string){
console.log(`Hello ${name}!`);
}
export const answerToLifeTheUniverseAndEverything = 42;
import * as Bundle from "./adams";
Bundle.hello(Bundle.answerToLifeTheUniverseAndEverything);  // Hello 42!
console.log(Bundle.unused);                                 // 0
```

# Publish TypeScript deﬁnition ﬁles

- Include deﬁnition ﬁle with library on npm
- Add typings to your package.json

```
{
    ...
    "typings": "path/file.d.ts"
    ...
}
```

# Mixins

- `derivedCtor` The class that you want to use as the composition class
- `baseCtors` An array of classes to be added to the composition class

## Example of Mixins

To create mixins, simply declare lightweight classes that can be used as "behaviours".

```
class Flies {
    fly() {
        alert('Is it a bird? Is it a plane?');
    }
}

class Climbs {
    climb() {
        alert('My spider-sense is tingling.');
    }
}

class Bulletproof {
    deflect() {
        alert('My wings are a shield of steel.');
    }
}
```

You can then apply these behaviours to a composition class:

```
class BeetleGuy implements Climbs, Bulletproof {
    climb: () => void;
    deflect: () => void;
}
applyMixins (BeetleGuy, [Climbs, Bulletproof]);
```

The `applyMixins` function is needed to do the work of composition.

```
function applyMixins(derivedCtor: any, baseCtors: any[]) {
    baseCtors.forEach(baseCtor => {
        Object.getOwnPropertyNames(baseCtor.prototype).forEach(name => {
            if (name !== 'constructor') {
                derivedCtor.prototype[name] = baseCtor.prototype[name];
            }
        });
    });
}
```

# How to use a JavaScript library without a type deﬁnition ﬁle

While some existing JavaScript libraries have type deﬁnition ﬁles, there are many that don't.

TypeScript oﬀers a couple patterns to handle missing declarations.

## Make a module that exports a default any

For more complicated projects, or in cases where you intend to gradually type a dependency, it may be cleaner to create a module.

Using JQuery (although it does have typings available) as an example:

```
// place in jquery.d.ts
declare let $: any;
export default $;
```

And then in any ﬁle in your project, you can import this deﬁnition with:

```
// some other .ts file
import $ from "jquery";
```

After this import, $ will be typed as any.

If the library has multiple top-level variables, export and import by name instead:

```
// place in jquery.d.ts
declare module "jquery" {
    let $: any;
    let jQuery: any;
    export { $ };
    export { jQuery };
}
```

You can then import and use both names:

```
// some other .ts file
import {$, jQuery} from "jquery";

$.doThing();
jQuery.doOtherThing();
```

## Declare an any global

It is sometimes easiest to just declare a global of type any, especially in simple projects.

If jQuery didn't have type declarations (it does), you could put

```
declare var $: any;
```

Now any use of $ will be typed any.

## Use an ambient module

If you just want to indicate the intent of an import (so you don't want to declare a global) but don't wish to bother with any explicit deﬁnitions, you can import an ambient module.

```
// in a declarations file (like declarations.d.ts)
declare module "jquery"; // note that there are no defined exports
```

You can then import from the ambient module.

```
// some other .ts file
import {$, jQuery} from "jquery";
```

Anything imported from the declared module (like $ and jQuery) above will be of type any

# Using TypeScript with React (JS & native)

## ReactJS component written in TypeScript

You can use ReactJS's components easily in TypeScript. Just rename the 'jsx' ﬁle extension to 'tsx':

```
//helloMessage.tsx:
var HelloMessage = React.createClass({
    render: function() {
        return <div>Hello {this.props.name}</div>;
    }
});

ReactDOM.render(<HelloMessage name="John" />, mountNode);
```

But in order to make full use of TypeScript's main feature (static type checking) you must do a couple things:

- convert React.createClass to an ES6 Class:

```
//helloMessage.tsx:
class HelloMessage extends React.Component {
    render() {
        return <div>Hello {this.props.name}</div>;
    }
}

ReactDOM.render(<HelloMessage name="John" />, mountNode);
```

- Add Props and State interfaces:

```
interface Props {
    name:string;
    optionalParam?:number;
}

interface State {
    //empty in our case
}

class HelloMessage extends React.Component<Props, State> {
    render() {
        return <div>Hello {this.props.name}</div>;
    }
}

// TypeScript will allow you to create without the optional parameter
ReactDOM.render(<HelloMessage name="Sebastian" />, mountNode);

// But it does check if you pass in an optional parameter of the wrong type
ReactDOM.render(<HelloMessage name="Sebastian" optionalParam='foo' />, mountNode);
```

Now TypeScript will display an error if the programmer forgets to pass props. Or if trying to pass in props that are
not deﬁned in the interface.

# Unit Testing jest (ts-jest)

```
//fizzBuzz.ts
export function fizzBuzz(n: number): string {
    let output = "";
    for (let i = 1; i <= n; i++) {
        if (i % 5 && i % 3) {
            output += i + ' ';
        }
        if (i % 3 === 0) {
            output += 'Fizz ';
        }
        if (i % 5 === 0) {
            output += 'Buzz ';
        }
    }
    return output;
}

Example test could look like
```

//FizzBuzz.test.ts
/// <reference types="jest" />
import {fizzBuzz} from "./fizzBuzz";

test("FizzBuzz test", () => {
expect(fizzBuzz(2)).toBe("1 2 ");
expect(fizzBuzz(3)).toBe("1 2 Fizz ");
});

```

```
