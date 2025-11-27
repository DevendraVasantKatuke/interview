---
title: notes
date: 2021-12-24
---

#### Intersection

```
type UserInfo = {
  first: string;
};

type AccountDetails = {
  email: string;
};

type User = UserInfo & AccountDetails;

const huxn: User = {
  first: "HuXn",
  email: "test@gmail.com",
};
```

#### Unions, (type narrowing)

```
let myVar: number | string;

function foo(param: string | string[]) {
  ..
}

interface MyInterface {
  myProp: string | number;
}
```

#### Literal Types

```
let color: "red" | "blue" | "green";
let number: 1 | 2 | 3;
let isTrue: true; // isTrue = false; // invalid
```

#### Tuples

```
let myTuple: [string, number] = ['hello', 42];
let [first, second] = myTuple;

let point: [number, number] = [10, 20];
let person: [string, number] = ['John Smith', 30];
```

#### Enums

```
enum WeatherConditions {
  Sunny,
  Cloudy,
}

enum WeatherConditions {
  Sunny = 'sunny',
  Cloudy = 'cloudy',
}

console.log(WeatherConditions.Sunny); // Sunny
```

#### Class

```
class Animal {
  a: string; // class property 'annotation'
  b: string;
  c: string = "USA"; // class field 'annotation', doesn't get passed into the constructor
  readonly d: string; // 'readonly property'
  public e: string; // anywhere
  protected f: string; // within the class and subclasses
  private g: string; // within the class
  public readonly h: string;

  constructor(a: string, b: string, d: string, e: string, f: string, g: string, h: string) {
    this.a = a;
    this.b = b;
    this.d = d;
    this.e = e;
    this.f = f;
    this.g = g;
    this.h = h;
  }

  // constructor(public a: string, private b: string) {
  //   ..
  // } // shorthand

//   public get e(): string { // Duplicate identifier 'e'
//     return this.e;
//   }

//   protected get f(): string { // Duplicate identifier 'f'
//     return this.f;
//   }

//   private get g(): string { // Duplicate identifier 'g'
//     return this.g;
//   }

//   set g(value: string) { // Duplicate identifier 'g'
//     this.g = value;
//   }

  private privateMethod(): void {
    console.log("Secret Method");
  }
}

const animal = new Animal("A", "B", "D", "E", "F", "G", "H");
// animal.d = "D1"; // ERROR
animal.e = "E1";
// console.log(animal.g); // error
// animal.privateMethod(); // error
```

#### Interface

```
interface Animal {
  name: string;
  readonly mark: string
  sayHello(): void;
}

interface Dog extends Animal {
  breed: string;
}

// Interface for a function
interface MathOperation {
  (x: number, y: number): number;
}
const add: MathOperation = (a, b) => a + b;
const subtract: MathOperation = (a, b) => a - b;

songInfo(song: string, singer: string): string;

interface MovieGenra extends MovieDetails {
  genra: string;
}

interface Vehicle {
  start(): void;
  stop(): void;
}

class Car implements Vehicle {
  start() { console.log("Car started") }
  stop() { console.log("Car stopped") }
}
```

#### Generics

```
function func<Type>(val1: Type, val2: Type): [Type, Type] {
  return [val1, val2];
}

const num = uniqueDataTypeFunc<number>(42, 0);
console.log(num); // Outputs: [42, 0]

const str = uniqueDataTypeFunc<string>("hello", "world");
console.log(str); // Outputs: ['hello', 'world']

interface Dog {
  name: string;
  breed: string;
}

const dogPair = uniqueDataTypeFunc<Dog>(
  { name: "Buddy", breed: "Labrador" },
  { name: "Default", breed: "Unknown" }
);

console.log(dogPair); // Outputs: [{ name: 'Buddy', breed: 'Labrador' }, { name: 'Default', breed: 'Unknown' }]
```

```
function reverse<T>(items: T[]): T[] {
  const reversed = [];
  for (let i = items.length - 1; i >= 0; i--) {
    reversed.push(items[i]);
  }
  return reversed;
}

const names = ["Alice", "Bob", "Charlie"];
const reversedNames = reverse<string>(names);
```

```
interface KeyValueStore<K, V> {
  get(key: K): V | undefined;
  set(key: K, value: V): void;
}
```

##### Generics-With-Multiple-Types

```
// Generic function to reverse the order of two values
function reversePair<T, U>(value1: T, value2: U): [U, T] {
  return [value2, value1];
}

// Example usage
const reversedPair = reversePair("Hello", 42);
console.log(reversedPair); // Outputs: [42, "Hello"]

// Generic function to combine two values into an array
function combineValues<T, U>(value1: T, value2: U): [T, U] {
  return [value1, value2];
}

// Example usage
const combinedStringAndNumber = combineValues("Hello", 42);
console.log(combinedStringAndNumber); // Outputs: ["Hello", 42]

const combinedBooleanAndArray = combineValues(true, [1, 2, 3]);
console.log(combinedBooleanAndArray); // Outputs: [true, [1, 2, 3]]
```

##### Function Signature

```
// Function Signature:

// function getRandomKeyValuePair<T>(obj: { [key: string]: T }): { key: string; value: T } { ... }
// The function is named getRandomKeyValuePair.
// It is a generic function denoted by <T>, meaning it can work with different types specified when calling the function.
// Parameters:

// obj: { [key: string]: T }: The function takes an object (obj) with keys of type string and values of type T.
// This is a common pattern in TypeScript to represent a dictionary-like object where keys are strings and values can be of any type (T).
// Function Body:

// const keys = Object.keys(obj);: Gets an array of keys from the input object using Object.keys.
// const randKey = keys[Math.floor(Math.random() * keys.length)];: Randomly selects a key from the array of keys using a random index.
// return { key: randKey, value: obj[randKey] };: Returns an object with two properties — key (the randomly chosen key) and value (the corresponding value from the input object).
// Return Type:

// : { key: string; value: T }: The function returns an object with a fixed structure — a key property of type string and a value property of type T.

// Generic function to get a random key-value pair from an object
function getRandomKeyValuePair<T>(obj: { [key: string]: T }): {
  key: string;
  value: T;
} {
  const keys = Object.keys(obj);
  const randKey = keys[Math.floor(Math.random() * keys.length)];
  return { key: randKey, value: obj[randKey] };
}

// Example usage with strings
const stringObject = { a: "apple", b: "banana", c: "cherry" };
const randomStringPair = getRandomKeyValuePair<string>(stringObject);
console.log(randomStringPair); // Outputs: { key: 'a', value: 'apple' } (random)

// Example usage with numbers
const numberObject = { one: 1, two: 2, three: 3, four: 4 };
const randomNumberPair = getRandomKeyValuePair<number>(numberObject);
console.log(randomNumberPair); // Outputs: { key: 'two', value: 2 } (random)

// Inferring type
const inferredStringPair = getRandomKeyValuePair(stringObject);
console.log(inferredStringPair); // Outputs: { key: 'b', value: 'banana' } (random)

const inferredNumberPair = getRandomKeyValuePair(numberObject);
console.log(inferredNumberPair); // Outputs: { key: 'three', value: 3 } (random)

// Generic function to filter an array based on a condition
function filterArray<T>(array: T[], condition: (item: T) => boolean): T[] {
  return array.filter((item) => condition(item));
}

// Example usage with an array of numbers
const numberArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const evenNumbers = filterArray<number>(numberArray, (num) => num % 2 === 0);
console.log(evenNumbers); // Outputs: [2, 4, 6, 8, 10]

// Example usage with an array of strings
const stringArray = ["apple", "banana", "cherry", "date"];
const shortWords = filterArray<string>(stringArray, (word) => word.length < 6);
console.log(shortWords); // Outputs: ["apple", "date"]

// Example usage with an array of objects
interface Fruit {
  name: string;
  color: string;
}

const fruitArray: Fruit[] = [
  { name: "Apple", color: "Red" },
  { name: "Banana", color: "Yellow" },
  { name: "Cherry", color: "Red" },
];

const redFruits = filterArray<Fruit>(
  fruitArray,
  (fruit) => fruit.color === "Red"
);
console.log(redFruits); // Outputs: [{ name: 'Apple', color: 'Red' }, { name: 'Cherry', color: 'Red' }]
```

##### Type-Constraints

```
// Type constraint using the 'extends' keyword
interface Identifiable {
  id: number;
}

// Generic function with a type constraint
function mergeObjects<T extends Identifiable, U extends Record<string, any>>(
  obj1: T,
  obj2: U
): T & U {
  return { ...obj1, ...obj2 };
}

// Example usage
const object1 = { id: 1, name: "Object 1" };
const object2 = { id: 2, description: "Object 2" };

const mergedObject = mergeObjects(object1, object2);
console.log(mergedObject);
// Outputs: { id: 1, name: 'Object 1', description: 'Object 2' }
```

##### generic-classes

```
class Box<T> {
  private content: T;

  constructor(initialContent: T) {
    this.content = initialContent;
  }

  getContent(): T {
    return this.content;
  }

  setContent(newContent: T): void {
    this.content = newContent;
  }
}

// Example usage
const stringBox = new Box<string>("Hello, TypeScript!");
console.log(stringBox.getContent()); // Outputs: Hello, TypeScript!
stringBox.setContent("New content");
console.log(stringBox.getContent()); // Outputs: New content

const numberBox = new Box<number>(42);
console.log(numberBox.getContent()); // Outputs: 42
numberBox.setContent(99);
console.log(numberBox.getContent()); // Outputs: 99
```
