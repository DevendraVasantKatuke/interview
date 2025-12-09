---
title: typescript
date: 2021-12-24
---

- https://github.com/type-challenges/type-challenges
- https://ghaiklor.github.io/type-challenges-solutions/en/

- https://exercism.org/tracks/typescript
- https://exercism.org/tracks/typescript/exercises
- https://react-typescript-cheatsheet.netlify.app/docs/basic/setup
- https://www.totaltypescript.com/articles
- https://zod.dev/
- https://www.totaltypescript.com/tutorials
- https://www.typescripttutorial.net/
- https://www.typescriptlang.org/
- https://www.ibrahima-ndaw.com/
- https://fettblog.eu/advanced-typescript-guide/
- https://leanpub.com/functional-programming-in-Ts-with-categories
- https://leanpub.com/functionalprogrammingintypescriptapracticalguide
- https://www.w3schools.com/typescript/index.php
- https://basarat.gitbook.io/typescript/
- https://masteringbackend.com/posts/nestjs-typescrpt-ultimate-guide
- https://www.telerik.com/blogs/10-quick-tips-learned-using-typescript
- https://learntypescript.dev/03/l2-any
- https://www.tutorialsteacher.com/typescript
- https://www.javatpoint.com/typescript-tutorial
- https://www.learningtypescript.com/
- https://medium.com/free-code-camp/typescript-curry-ramda-types-f747e99744ab
- https://itnext.io/the-art-of-type-programming-cfd933bdfff7

```
type SanitizedInput = string; // Primitive
type MissingNo = 404; // Primitive
type Location = {
  x: number;
  y: number;
}; // Object Literal
type Data = [
  location: Location,
  timestamp: string
]; // Tuple
type Size = "small" | "medium" | "large" // Union

type Location = { x: number } & { y: number } // Intersection
// { x: number, y: number }

type Response = { data: { ... } } // Indexing
type Data = Response["data"]

```

```
// Interfaces are structural, anything that has the properties is compliant with
// the interface
interface Person {
  name: string;
  age?: number;
  move(): void;
}

let p: Person = { name: "Bobby", move: () => { } };
let validPerson: Person = { name: "Bobby", age: 42, move: () => { } };
let invalidPerson: Person = { name: "Bobby", age: true };

// Interfaces can also describe a function type
interface SearchFunc {
  (source: string, subString: string): boolean;
}
// Only the parameters' types are important, names are not important.
let mySearch: SearchFunc;
mySearch = function (src: string, sub: string) {
  return src.search(sub) != -1;
}

// Classes - members are public by default
class Point {
  // Properties
  x: number;

  // Constructor - the public/private keywords in this context will generate
  // the boiler plate code for the property and the initialization in the
  // constructor.
  // In this example, "y" will be defined just like "x" is, but with less code
  // Default values are also supported

  constructor(x: number, public y: number = 0) {
    this.x = x;
  }

  // Functions
  dist(): number { return Math.sqrt(this.x * this.x + this.y * this.y); }

  // Static members
  static origin = new Point(0, 0);
}

// Classes can be explicitly marked as implementing an interface.
// Any missing properties will then cause an error at compile-time.
class PointPerson implements Person {
    name: string
    move() {}
}

let p1 = new Point(10, 20);
let p2 = new Point(25); //y will be 0

// Inheritance
class Point3D extends Point {
  constructor(x: number, y: number, public z: number = 0) {
    super(x, y); // Explicit call to the super class constructor is mandatory
  }

  // Overwrite
  dist(): number {
    let d = super.dist();
    return Math.sqrt(d * d + this.z * this.z);
  }
}

// Modules, "." can be used as separator for sub modules
module Geometry {
  export class Square {
    constructor(public sideLength: number = 0) {
    }
    area() {
      return Math.pow(this.sideLength, 2);
    }
  }
}

let s1 = new Geometry.Square(5);

// Local alias for referencing a module
import G = Geometry;

let s2 = new G.Square(10);

// Generics
// Classes
class Tuple<T1, T2> {
  constructor(public item1: T1, public item2: T2) {
  }
}

// Interfaces
interface Pair<T> {
  item1: T;
  item2: T;
}

// And functions
let pairToTuple = function <T>(p: Pair<T>) {
  return new Tuple(p.item1, p.item2);
};

let tuple = pairToTuple({ item1: "hello", item2: "world" });

// Including references to a definition file:
/// <reference path="jquery.d.ts" />

// Template Strings (strings that use backticks)
// String Interpolation with Template Strings
let name = 'Tyrone';
let greeting = `Hi ${name}, how are you?`
// Multiline Strings with Template Strings
let multiline = `This is an example
of a multiline string`;

// READONLY: New Feature in TypeScript 3.1
interface Person {
  readonly name: string;
  readonly age: number;
}

var p1: Person = { name: "Tyrone", age: 42 };
p1.age = 25; // Error, p1.age is read-only

var p2 = { name: "John", age: 60 };
var p3: Person = p2; // Ok, read-only alias for p2
p3.age = 35; // Error, p3.age is read-only
p2.age = 45; // Ok, but also changes p3.age because of aliasing

class Car {
  readonly make: string;
  readonly model: string;
  readonly year = 2018;

  constructor() {
    this.make = "Unknown Make"; // Assignment permitted in constructor
    this.model = "Unknown Model"; // Assignment permitted in constructor
  }
}

let numbers: Array<number> = [0, 1, 2, 3, 4];
let moreNumbers: ReadonlyArray<number> = numbers;
moreNumbers[5] = 5; // Error, elements are read-only
moreNumbers.push(5); // Error, no push method (because it mutates array)
moreNumbers.length = 3; // Error, length is read-only
numbers = moreNumbers; // Error, mutating methods are missing

// Tagged Union Types for modelling state that can be in one of many shapes
type State =
  | { type: "loading" }
  | { type: "success", value: number }
  | { type: "error", message: string };

declare const state: State;
if (state.type === "success") {
  console.log(state.value);
} else if (state.type === "error") {
  console.error(state.message);
}

// Template Literal Types
// Use to create complex string types
type OrderSize = "regular" | "large";
type OrderItem = "Espresso" | "Cappuccino";
type Order = `A ${OrderSize} ${OrderItem}`;

let order1: Order = "A regular Cappuccino";
let order2: Order = "A large Espresso";
let order3: Order = "A small Espresso"; // Error

// Iterators and Generators

// for..of statement
// iterate over the list of values on the object being iterated
let arrayOfAnyType = [1, "string", false];
for (const val of arrayOfAnyType) {
    console.log(val); // 1, "string", false
}

let list = [4, 5, 6];
for (const i of list) {
   console.log(i); // 4, 5, 6
}

// for..in statement
// iterate over the list of keys on the object being iterated
for (const i in list) {
   console.log(i); // 0, 1, 2
}

// Type Assertion

let foo = {} // Creating foo as an empty object
foo.bar = 123 // Error: property 'bar' does not exist on `{}`
foo.baz = 'hello world' // Error: property 'baz' does not exist on `{}`

// Because the inferred type of foo is `{}` (an object with 0 properties), you
// are not allowed to add bar and baz to it. However with type assertion,
// the following will pass:

interface Foo {
  bar: number;
  baz: string;
}

let foo = {} as Foo; // Type assertion here
foo.bar = 123;
foo.baz = 'hello world'
```

https://github.com/type-challenges/type-challenges

- JSON
  - JSON Schema to TypeScript
- json
  - JSON Parser
- application
  - Chainable Options
  - Combination
- arguments
  - Append Argument
  - Flip Arguments
- array
  - First of Array
  - Concat
  - Includes
  - Push
  - Unshift
  - Last of Array
  - Pop
  - Promise.all
  - Flatten
  - AnyOf
  - Shift
  - FlattenDepth
  - Greater Than
  - Without
  - IndexOf
  - Join
  - LastIndexOf
  - Unique
  - Combination
  - All
  - Filter
  - Transpose
  - Square
  - Triangular number
  - MergeAll
  - Currying
  - Split
  - Intersection
  - Two Sum
  - Assign
  - Maximum
  - Capitalize Nest Object Keys
  - FizzBuzz
  - Slice
  - Inclusive Range
  - Sort
  - Assert Array Index
- built-in
  - Pick
  - Readonly
  - Exclude
  - Awaited
  - Parameters
  - Get Return Type
  - Omit
- deep
  - Deep Readonly
  - DeepMutable
  - Deep object to unique
  - DeepPick
- filter
- infer
  - Parameters
  - Get Return Type
  - Tuple to Union
  - Drop Char
  - AllCombinations
  - Union to Intersection
  - Get Required
  - Get Optional
  - Tuple Filter
  - Union to Tuple
  - Drop String
  - FizzBuzz
  - Inclusive Range
  - Sort
- map
  - Type Lookup
  - MapTypes
- math
  - Absolute
  - MinusOne
  - Transpose
  - Square
  - Triangular number
  - Binary to Decimal
  - Two Sum
  - FizzBuzz
  - Integers Comparator
  - Sum
  - Multiply
- number
  - IsNegativeNumber
- object
  - Merge
    - Diff
    - PickByType
    - PartialByKeys
    - RequiredByKeys
    - OmitByType
    - ObjectEntries
    - Tuple to Nested Object
    - InorderTraversal
    - Flip
    - MapTypes
    - MergeAll
    - ObjectFromEntries
    - Assign
    - Capitalize Nest Object Keys
- object-keys
  - Readonly
  - Tuple to Object
  - Readonly 2
  - Deep Readonly
  - Append to object
  - ReplaceKeys
  - Remove Index Signature
  - Mutable
  - Public Type
  - Object Key Paths
  - Get Readonly Keys
- promise
  - Awaited
  - Promise.all
- readonly
  - Readonly
  - Readonly 2
  - Deep Readonly
  - Mutable
  - DeepMutable
- recursion
  - Camelize
- split
  - Split
- string
  - String to Union
  - Combination
  - CheckRepeatedChars
  - FirstUniqueCharIndex
  - Split
  - IsPalindrome
  - SnakeCase
- template literal
  - IsNegativeNumber
- template-literal
  - Trim Left
  - Trim
  - Capitalize
  - Replace
  - ReplaceAll
  - Length of String
  - Absolute
  - KebabCase
  - Percentage Parser
  - Drop Char
  - StartsWith
  - EndsWith
  - BEM style string
  - AllCombinations
  - Trim Right
  - Trunc
  - Integer
  - Capitalize Words
  - CamelCase
  - C-printf Parser
  - Typed Get
  - String to Number
  - Tuple to Enum Object
  - printf
  - Length of String 2
  - Drop String
  - SnakeCase
  - Query String Parser
  - Integers Comparator
  - Sum
  - Multiply
  - JSON Parser
- this
  - Pinia
- tuple
  - Length of Tuple
  - Parameters
  - Tuple to Union
  - Tuple to Nested Object
  - Reverse
  - BEM style string
  - Zip
  - IsTuple
  - Chunk
  - Fill
  - Construct Tuple
  - Square
  - Triangular number
  - Tuple Filter
  - Tuple to Enum Object
  - Union to Tuple
  - Split
  - Subtract
- union
  - Pick
  - Exclude
  - Omit
  - Tuple to Union
  - Type Lookup
  - Permutation
  - String to Union
  - IsNever
  - IsUnion
  - BEM style string
  - AllCombinations
  - Without
  - Subsequence
  - CheckRepeatedChars
  - CartesianProduct
  - MergeAll
  - Union to Tuple
  - Camelize
  - Intersection
- utils
  - If
  - IsNever
  - MapTypes
  - Union to Intersection
  - Get Required
  - Get Optional
  - Required Keys
  - Optional Keys
  - IsAny
  - Typed Get
  - ClassPublicKeys
  - IsRequiredKey
  - Mutable Keys
  - Get Readonly Keys
