- 📜 [Recursion in JavaScript — Kevin Ennis](https://medium.freecodecamp.org/recursion-in-javascript-1608032c7a1f)
- 📜 [Understanding Recursion in JavaScript — Zak Frisch](https://medium.com/@zfrisch/understanding-recursion-in-javascript-992e96449e03)
- 📜 [Learn and Understand Recursion in JavaScript — Brandon Morelli](https://codeburst.io/learn-and-understand-recursion-in-javascript-b588218e87ea)
- 📜 [Recursion in Functional JavaScript — M. David Green](https://www.sitepoint.com/recursion-functional-javascript/)
- 📜 [Programming with JS: Recursion — Alexander Kondov](https://hackernoon.com/programming-with-js-recursion-31371e2bf808)
- 📜 [Anonymous Recursion in JavaScript — simo](https://dev.to/simov/anonymous-recursion-in-javascript)
- 📜 [Recursion, iteration and tail calls in JS — loverajoel](http://www.jstips.co/en/javascript/recursion-iteration-and-tail-calls-in-js/)
- 📜 [Understanding Recursion in JavaScript with Confidence — Jay](https://www.thecodingdelight.com/understanding-recursion-javascript/)
- 📜 [Intro to Recursion — Brad Newman](https://medium.com/@newmanbradm/intro-to-recursion-984a8bd50f4b)
- 📜 [Accio Recursion!: Your New Favorite JavaScript Spell — Leanne Cabey](https://medium.com/datadriveninvestor/accio-recursion-your-new-favorite-javascript-spell-7e10d3125fb3)
- 📜 [Recursion Explained (with Examples) — Christina](https://dev.to/christinamcmahon/recursion-explained-with-examples-4k1m)
- 🎥 [Recursion In JavaScript — techsith](https://www.youtube.com/watch?v=VtG0WAUvq2w)
- 🎥 [Recursion — Fun Fun Function](https://www.youtube.com/watch?v=k7-N8R0-KY4)
- 🎥 [Recursion and Recursive Functions — Hexlet](https://www.youtube.com/watch?v=vLhHyGTkjCs)
- 🎥 [Recursion: Recursion() — JS Monthly — Lucas da Costa](https://www.youtube.com/watch?v=kGXVsd8pBLw)
- 🎥 [Recursive Function in JavaScript — kudvenkat](https://www.youtube.com/watch?v=uyjsR9eNTIw)
- 🎥 [What on Earth is Recursion? — Computerphile](https://www.youtube.com/watch?v=Mv9NEXX1VHc)
- 🎥 [Javascript Tutorial 34: Introduction To Recursion — codedamn](https://www.youtube.com/watch?v=9NO5dXSlbv8)
- 🎥 [Recursion, Iteration, and JavaScript: A Love Story | JSHeroes 2018 — Anjana Vakil](https://www.youtube.com/watch?v=FmiQr4nfoPQ)
- 🎥 [Recursion crash course - Colt Steele](https://www.youtube.com/watch?v=lMBVwYrmFZQ&ab_channel=ColtSteele)

```
const appDiv = document.getElementById('app');
appDiv.innerHTML = `<h1>JS Starter</h1>`;

const person = {
  name: 'Adam',
  friends: [
    {
      name: 'John',
      friends: [
        {
          name: 'William',
          friends: [
            {
              name: 'Emma',
            },
          ],
        },
        {
          name: 'Olivia',
          friends: [
            {
              name: 'Michael',
              friends: [
                {
                  name: 'Eve',
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};

function getAllTheNames(person) {
  const names = [person.name];
  if (person.friends) {
    return names.concat(...person.friends.map(getAllTheNames));
  }
  return names;
}

console.log(getAllTheNames(person));
```
```
function pow(x, n) {
  if (n == 1) {
    return x;
  } else {
    return x * pow(x, n - 1);
  }
}

alert( pow(2, 3) ); // 8
```
```
let company = {
  sales: [{
    name: 'John',
    salary: 1000
  }, {
    name: 'Alice',
    salary: 1600
  }],

  development: {
    sites: [{
      name: 'Peter',
      salary: 2000
    }, {
      name: 'Alex',
      salary: 1800
    }],

    internals: [{
      name: 'Jack',
      salary: 1300
    }]
  }
};

let company = { // the same object, compressed for brevity
  sales: [{name: 'John', salary: 1000}, {name: 'Alice', salary: 1600 }],
  development: {
    sites: [{name: 'Peter', salary: 2000}, {name: 'Alex', salary: 1800 }],
    internals: [{name: 'Jack', salary: 1300}]
  }
};

// The function to do the job
function sumSalaries(department) {
  if (Array.isArray(department)) { // case (1)
    return department.reduce((prev, current) => prev + current.salary, 0); // sum the array
  } else { // case (2)
    let sum = 0;
    for (let subdep of Object.values(department)) {
      sum += sumSalaries(subdep); // recursively call for subdepartments, sum the results
    }
    return sum;
  }
}

alert(sumSalaries(company)); // 7700
```
## Recursive structures
### Linked list
`arr.unshift(obj)` operation has to renumber all elements to make room for a new `obj`, and if the array is big, it takes time. Same with `arr.shift()`.

So an array can be quite slow for big queues, when we have to work with the beginning.

The *linked list element* is recursively defined as an object with:
- `value`.
- `next` property referencing the next *linked list element* or `null` if that's the end.
```js
let list = {
  value: 1,
  next: {
    value: 2,
    next: {
      value: 3,
      next: {
        value: 4,
        next: null
      }
    }
  }
};
```
```
let list = { value: 1 };
list.next = { value: 2 };
list.next.next = { value: 3 };
list.next.next.next = { value: 4 };
list.next.next.next.next = null;
```
```
let secondList = list.next.next;
list.next.next = secondList;
```
```
let list = { value: 1 };
list.next = { value: 2 };
list.next.next = { value: 3 };
list.next.next.next = { value: 4 };

// prepend the new value to the list
list = { value: "new item", next: list };
```

To remove a value from the middle, change `next` of the previous one:
```
list.next = list.next.next;
```

Naturally, lists are not always better than arrays. Otherwise everyone would use only lists.

The main drawback is that we can't easily access an element by its number. In an array that's easy: `arr[n]` is a direct reference. But in the list we need to start from the first item and go `next` `N` times to get the Nth element.

Lists can be enhanced:
- We can add property `prev` in addition to `next` to reference the previous element, to move back easily.
- We can also add a variable named `tail` referencing the last element of the list (and update it when adding/removing elements from the end).
- The data structure may vary according to our needs.

#### sum
```
function sumTo(n) {
  if (n == 1) return 1;
  return n + sumTo(n - 1);
}
// Or
function sumTo(n) {
  return n * (n + 1) / 2;
}

alert( sumTo(100) );
```
#### factorial
```
function factorial(n) {
  return (n != 1) ? n * factorial(n - 1) : 1;
}
// Or
function factorial(n) {
  return n ? n * factorial(n - 1) : 1;
}

lert( factorial(5) ); // 120
```
#### Fibonacci numbers
```
// very slow for high numbers
function fib(n) {
  return n <= 1 ? n : fib(n - 1) + fib(n - 2);
}
// Or
function fib(n) {
  let a = 1;
  let b = 1;
  for (let i = 3; i <= n; i++) {
    let c = a + b;
    a = b;
    b = c;
  }
  return b;
}

alert( fib(77) ); // 5527939700884757
```
#### Output a single-linked list
1. Loop based solution (better one, since avoids nested function calls)
```
let list = {
  value: 1,
  next: {
    value: 2,
    next: {
      value: 3,
      next: {
        value: 4,
        next: null
      }
    }
  }
};

function printList(list) {
  let tmp = list;

  while (tmp) {
    alert(tmp.value);
    tmp = tmp.next;
  }

}

printList(list);
```
2. Recursive
```
let list = {
  value: 1,
  next: {
    value: 2,
    next: {
      value: 3,
      next: {
        value: 4,
        next: null
      }
    }
  }
};

function printList(list) {

  alert(list.value); // output the current item

  if (list.next) {
    printList(list.next); // do the same for the rest of the list
  }

}

printList(list);
```
#### Output a single-linked list in the reverse order
1. Using Loop
```
let list = {
  value: 1,
  next: {
    value: 2,
    next: {
      value: 3,
      next: {
        value: 4,
        next: null
      }
    }
  }
};

function printReverseList(list) {
  let arr = [];
  let tmp = list;

  while (tmp) {
    arr.push(tmp.value);
    tmp = tmp.next;
  }

  for (let i = arr.length - 1; i >= 0; i--) {
    alert( arr[i] );
  }
}

printReverseList(list);
```
2. Using Recursion
```
let list = {
  value: 1,
  next: {
    value: 2,
    next: {
      value: 3,
      next: {
        value: 4,
        next: null
      }
    }
  }
};

function printReverseList(list) {

  if (list.next) {
    printReverseList(list.next);
  }

  alert(list.value);
}

printReverseList(list);
```