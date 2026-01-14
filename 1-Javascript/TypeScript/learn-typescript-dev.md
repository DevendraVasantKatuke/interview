---
title: learn typescript
date: 2021-12-24
---

```
type VisitsData = {
  visits: Array<{
    page: {
      name: string;
    };
  }>;
  user: {
    name: string;
  };
};

function logVisits(data: VisitsData) {
  data.visits.forEach(visit => console.log(visit.page.name, data.user.name));
}

logVisits({
  visits: [{page: {name: "Page1"}}, {page: {name: "page2"}}],
  user: { name: "Bob" }
});
```

```
const formValues: { [field: string]: any } = {
  firstName: "Bob",
  surname: "Smith",
  age: 30,
};
```

```
let whatCanIHold: void;
whatCanIHold = undefined;
whatCanIHold = "something"; // warning
```

```
const numbers: Array<number> = []; // Or, const numbers: number[] = [];
numbers.push(1);
numbers.push("two"); // warning

// try
const numbers: Array<number> = [1, "two"]; // warning
```

```
function logScores(firstName: string, ...scores: number[]) {
  console.log(firstName, scores);
}
```

### A tuple can be thought of as an array with a fixed number of elements.

```
const tomScore: (string | number[])[] = ["Tom", [70]];
const tomScore: [string, number] = ["Tom", 70];
const tomScore:[name: string, ...scores: number[]] = ["Fred", 70, 60, 80];
const fredScores: [string, ...number[]] = ["Fred", 70, 60, 80];
const [state, setState] = useState(initialState);
```

### The return type is `never`

> Why isn't the return type `void`?

> `void` is when the function returns without a value. In this example, the function never returns.

```
const keepLogging = (message: string) => {
  while (true) {
    console.log(message);
  }
};

keepLogging("Hello");
```

```
type Status = "Pending" | "Working" | "Complete" | "Cancelled";
function doSomeAction(status: Status) {
  switch (status) {
    case "Pending":
      // some code
      break;
    case "Working":
      // some code
      break;
    case "Complete":
      // some code
      break;
    case "Cancelled":
      break;
    default:
      neverReached(status)
  }
}
doSomeAction("Pending");
function neverReached(never: never) {}
```

### unknown

```
function add(a: unknown, b: unknown) {
  // the line below is `type guard`
  if (typeof a === "number" && typeof b === "number") {
    return a + b;
  }
  return 0;
}
```

```
async function getData(path: string): Promise<unknown> {
  const response = await fetch(path);
  return await response.json();
}

type Person = {
  id: string;
  name: string;
};

async function getPerson(id: string): Promise<Person | null> {
  const person = await getData("/people/1");
  if (person && isPerson(person)) {
    return person;
  }
  return null;
}

function isPerson(person: any): person is Person {
  return "id" in person && "name" in person;
}
```

### enum

```
enum Level {
  High,
  Medium,
  Low
}
```

```
enum Day {
  Monday = 'MON',
  Tuesday = 'TUE',
  Sunday = 'WED',
}
```

### types

```
const tomScore: { name: string; score: number; } = {
  name: "Tom",
  score: 70
}
```

#### type aliases

```
type FirstName = string;
let firstName: FirstName = "Tom";
```

```
// arrow functions
type TypeAliasName = (paramName1: paramType1, ...) => ReturnType;

const log = (message: string) => {
  console.log(message);
};

const log: Log = (message: string) => {
  console.log(message);
}

// Optional parameters can be added to function type aliases
type TypeAliasName = (
  ...,
  optionalParam?: optionalParamType
) => ReturnType;


type Log = (
  message: string,
  category?: string
) => void;

const tomScore: { name: string; score: number } = {
  name: "Tom",
  score: 70,
};

type Score = { name: string; score: number };
const tomScore: Score = { name: "Tom", score: 70 };

type Score = {
  name: string;
  score: number;
  pass?: boolean;
  log: Log;
};

const tomScore: Score = {
  name: "Tom",
  score: 70,
  log
};
```

### interfaces

```
interface ButtonProps {
  text: string;
  onClick: () => void;
  onClick?: () => void; // optional
}

const buyButton: ButtonProps = {
  text: "Buy",
};
```

### Extending interfaces

```
interface ColoredButtonProps extends ButtonProps {
  color: string;
}

const greenBuyButton: ColoredButtonProps = {
  color: "Green",
  text: "Buy",
  onClick: () => console.log("Buy"),
};
```

### Using interfaces for functions

```
interface Log {
  (message: string): void;
}

const log: Log = (message: string) => {
  console.log(message);
}
```

### Declaration merging

> It is legal in TypeScript for multiple interfaces with the same name to be created. TypeScript will merge interfaces with the same name in a process called declaration merging.

### union

```
let age: number | null | undefined;
age = null;
age = 30;
age = undefined;

// type alias
type Age = number | null | undefined;
let age: Age;
```

### String literal unions are like string enums

```
type Fruit = "Banana" | "Apple" | "Pear";
let fruit: Fruit;
fruit = "Apple";
```

### Object union types

```
type Actions = { type: "loading" } | { type: "loaded"; data: { name: string } };
const loadingAction: Actions = { type: "loading" };
```

### intersection

```
type Name = {
  firstName: string;
  lastName: string;
};
type PhoneNumber = {
  landline: string;
  mobile: string;
};
type Contact = Name & PhoneNumber;

const fred: Contact = {
  firstName: "Fred",
  lastName: "Smith",
  landline: "0116 4238978",
  mobile: "079543 4355435",
};
```

### Intersection of common members

```
type BaseElement = {
  name: string;
  kind: "text" | "number" | "email";
};
type TextInput = {
  kind: "text";
};
type Field = BaseElement & TextInput;

const age: Field = {
  name: "Age",
  kind: "number" // Warning. Should br 'text'
};
```

```
type A = {
  doIt: (a: string) => void;
};
type B = {
  doIt: (a: string, b: string) => void;
};
type A_and_B = A & B;

const ab_v1: A_and_B = {
  doIt: (a: string) => {},
};

const ab_v2: A_and_B = {
  doIt: (a: string, b: string) => {}, // 'Warning'
};
```

### Interfaces v type aliases

- Primitive types: use Type Aliases

```
type Name = string;
```

- Arrays: use Type Aliases

```
type Names = string[];

interface Names {
  [index: number]: string;
}
```

- tuples: use Type Aliases

```
type Point = [number, number];
```

- functions: use Type Aliases

```
type Log = (message: string) => void;

interface Log {
  (message: string): void;
}
```

- union types: use Type Aliases
  > Type aliases can represent union types but interfaces can't:

```
type Status = "pending" | "working" | "complete";
```

- objects: No difference

```
type Person = {
  name: string;
  score: number;
};

interface Person {
  name: string;
  score: number;
}
```

- Composing objects: use Type Aliases

```
type Name = {
  firstName: string;
  lastName: string;
};
type PhoneNumber = {
  landline: string;
  mobile: string;
};
type Contact = Name & PhoneNumber;

interface Name {
  firstName: string;
  lastName: string;
}
interface PhoneNumber {
  landline: string;
  mobile: string;
}
interface Contact extends Name, PhoneNumber {}
```

- Type aliases can compose interfaces and visa versa:

```
type Name = {
  firstName: string;
  lastName: string;
};
interface PhoneNumber {
  landline: string;
  mobile: string;
}
type Contact = Name & PhoneNumber;
```

- Only type aliases can compose union types though:

```
type StringActions = { type: "loading" } | { type: "loaded"; data: string[] };
type NumberActions = { type: "loading" } | { type: "loaded"; data: number[] };
type Actions = StringActions & NumberActions;
```

- Authoring a library: use Interfaces
  > One important feature that interfaces have that type aliases don't is declaration merging:

```
interface ButtonProps {
  text: string;
  onClick: () => void;
}
interface ButtonProps {
  id: string;
}
```

This is is useful for adding missing type information on 3rd party libraries.

### Thinking about union and intersection types as sets

```
type OrderStatus = "pending" | "completed";
type DeliveryStatus = "completed" | "shipped";

type Status = OrderStatus | DeliveryStatus; // 'pending', 'completed', and 'shipped'

type Status = OrderStatus & DeliveryStatus; // 'completed'
```

### Function type compatibility

```
let add = (a: number, b: number): number => a + b;
let sum = (x: number, y: number): number => x + y;
sum = add; // OK

let add = (a: number, b: number, c: number): number => a + b + c;
let sum = (x: number, y: number): number => x + y;
sum = add; // Not OK

let add = (a: number, b: number, c?: number): number => a + b + (c || 0);
let sum = (x: number, y: number): number => x + y;
sum = add; // OK

let add = (a: number, b: number, c: number): number => a + b + c;
let sum = (x: number, y: number): number => x + y;
add = sum; // OK
```
