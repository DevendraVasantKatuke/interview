## Leveraging Object Destructuring for Efficient Coding
#### What Is Object Destructuring in JavaScript?
Object destructuring is an ES6 feature that provides a concise syntax for extracting values from objects and arrays and assigning them to variables. Instead of accessing properties one by one, destructuring lets you unpack multiple values in a single statement, making your code more readable and reducing redundancy.
#### Why Object Destructuring Matters
Before ES6, extracting values from objects required repetitive code:
```
// Without object destructuring - verbose and repetitive
const employee = { name: 'Gary', age: 28, department: 'Engineering' };
const name = employee.name;
const age = employee.age;
const department = employee.department;
```
With destructuring, the same operation becomes elegant:
```
// With object destructuring - clean and concise
const employee = { name: 'Gary', age: 28, department: 'Engineering' };
const { name, age, department } = employee;

console.log(name);       // Output: Gary
console.log(age);        // Output: 28
console.log(department); // Output: Engineering
```
#### Array Destructuring
Destructuring works equally well with arrays, using position rather than property names:
```
const coordinates = [40.7128, -74.0060, 'New York'];
const [latitude, longitude, city] = coordinates;

console.log(latitude);  // Output: 40.7128
console.log(longitude); // Output: -74.0060
console.log(city);      // Output: New York

// Skip elements you don't need
const [first, , third] = [1, 2, 3];
console.log(first, third); // Output: 1 3
```
#### Default Values in Destructuring
When a property might be undefined, default values prevent your code from breaking:
```
const config = { theme: 'dark' };
const { theme, language = 'en', debugMode = false } = config;

console.log(theme);     // Output: dark
console.log(language);  // Output: en (default applied)
console.log(debugMode); // Output: false (default applied)
```
#### Renaming Variables During Destructuring
Sometimes property names conflict with existing variables or aren’t descriptive enough:
```
const apiResponse = { n: 'Product Name', p: 99.99, q: 50 };
const { n: productName, p: price, q: quantity } = apiResponse;

console.log(productName); // Output: Product Name
console.log(price);       // Output: 99.99
console.log(quantity);    // Output: 50
```
#### Nested Object Destructuring
Real-world data often contains nested structures. Destructuring handles these elegantly:
```
const employee = {
    name: 'Gary',
    age: 28,
    address: {
        street: '123 Main St',
        city: 'San Francisco',
        country: 'USA'
    },
    skills: ['JavaScript', 'TypeScript', 'React']
};

// Nested destructuring
const { 
    name, 
    address: { city, country },
    skills: [primarySkill]
} = employee;

console.log(name);         // Output: Gary
console.log(city);         // Output: San Francisco
console.log(country);      // Output: USA
console.log(primarySkill); // Output: JavaScript
```
#### Function Parameter Destructuring
Destructuring shines when handling function parameters, especially for configuration objects:
```
// Without destructuring
function createUser(options) {
    const name = options.name;
    const email = options.email;
    const role = options.role || 'user';
    // ...
}

// With destructuring - cleaner and self-documenting
function createUser({ name, email, role = 'user', isActive = true }) {
    console.log(`Creating ${role}: ${name} (${email})`);
    return { name, email, role, isActive, createdAt: new Date() };
}

createUser({ name: 'Alice', email: 'alice@example.com' });
// Output: Creating user: Alice (alice@example.com)
```
#### Destructuring in Loops
When iterating over arrays of objects, destructuring makes code more readable:
```
const users = [
    { id: 1, name: 'Alice', score: 95 },
    { id: 2, name: 'Bob', score: 87 },
    { id: 3, name: 'Charlie', score: 92 }
];

// Destructure directly in the loop
for (const { name, score } of users) {
    console.log(`${name}: ${score} points`);
}

// With array methods
const topScorers = users
    .filter(({ score }) => score >= 90)
    .map(({ name }) => name);

console.log(topScorers); // Output: ['Alice', 'Charlie']
```
#### Common Mistakes to Avoid
##### Mistake 1: Destructuring null or undefined
```
// This throws an error
const { name } = null; // TypeError: Cannot destructure property 'name' of null

// Solution: Use default value or optional chaining first
const data = null;
const { name } = data || {};
console.log(name); // Output: undefined (no error)
```
##### Mistake 2: Forgetting that nested destructuring doesn’t create intermediate variables
```
const user = { profile: { name: 'Alice' } };
const { profile: { name } } = user;

console.log(name);    // Output: Alice
console.log(profile); // ReferenceError: profile is not defined
```
#### Performance Considerations
Object destructuring has negligible performance overhead in modern JavaScript engines. V8, SpiderMonkey, and JavaScriptCore all optimize destructuring patterns effectively. However, avoid destructuring inside tight loops where you’re processing millions of iterations—in such cases, direct property access may be marginally faster.

#### When to Use Object Destructuring
|Use Case|	Recommendation|
|-|-|
|Extracting multiple properties from an object|Always use destructuring|
|Function parameters with optional properties|Highly recommended|
|Swapping variable values|Use array destructuring: [a, b] = [b, a]|
|Importing specific module exports|Standard practice|
|Single property extraction|Direct access may be clearer|

## Mastering the Spread and Rest Operators
#### What Is the Difference Between Spread and Rest Operators?
The spread operator (…) and rest operator (…) use identical syntax but serve opposite purposes. The spread operator expands iterables into individual elements, while the rest operator collects multiple elements into a single array or object. Understanding when to use each is essential for modern JavaScript development.
#### Spread vs Rest Operator Comparison
|Aspect|Spread Operator|Rest Operator|
|-|-|-|
|Purpose|Expands elements|Collects elements|
|Context|Array literals, function calls, object literals|Function parameters, destructuring|
|Direction|Unpacking|Packing|
|Position|Can appear anywhere|Must be last|

#### The Spread Operator Explained
The spread operator expands an iterable (array, string, or object) into individual elements:
##### Combining Arrays:
```
const frontend = ['HTML', 'CSS', 'JavaScript'];
const backend = ['Node.js', 'Python', 'Java'];
const fullstack = [...frontend, ...backend];

console.log(fullstack);
// Output: ['HTML', 'CSS', 'JavaScript', 'Node.js', 'Python', 'Java']
```
##### Copying Arrays (Shallow Copy):
```
const original = [1, 2, 3];
const copy = [...original];

copy.push(4);
console.log(original); // Output: [1, 2, 3] - unchanged
console.log(copy);     // Output: [1, 2, 3, 4]
```
##### Spreading in Function Calls:
```
const numbers = [5, 2, 9, 1, 7];
const max = Math.max(...numbers);
console.log(max); // Output: 9

// Equivalent to: Math.max(5, 2, 9, 1, 7)
```
##### Object Spread (ES2018):
```
const defaults = { theme: 'light', language: 'en', notifications: true };
const userPrefs = { theme: 'dark', fontSize: 16 };

// Later properties override earlier ones
const settings = { ...defaults, ...userPrefs };
console.log(settings);
// Output: { theme: 'dark', language: 'en', notifications: true, fontSize: 16 }
```
##### Object Spread Precedence:
```
const base = { a: 1, b: 2 };

// Override specific properties
const modified = { ...base, b: 10, c: 3 };
console.log(modified); // Output: { a: 1, b: 10, c: 3 }

// Order matters!
const wrongOrder = { b: 10, ...base };
console.log(wrongOrder); // Output: { b: 2, a: 1 } - base.b overwrites 10
```
#### The Rest Operator Explained
The rest operator collects remaining elements into an array or object:

##### Rest in Function Parameters:
```
function sum(...numbers) {
    return numbers.reduce((total, num) => total + num, 0);
}

console.log(sum(1, 2, 3));       // Output: 6
console.log(sum(10, 20, 30, 40)); // Output: 100
```
##### Rest with Regular Parameters:
```
function logMessage(level, timestamp, ...messages) {
    console.log(`[${level}] ${timestamp}:`);
    messages.forEach(msg => console.log(`  - ${msg}`));
}

logMessage('INFO', '2025-01-15', 'Server started', 'Port 3000', 'Ready');
// Output:
// [INFO] 2025-01-15:
//   - Server started
//   - Port 3000
//   - Ready
```
##### Rest in Array Destructuring:
```
const scores = [95, 87, 92, 78, 88];
const [highest, second, ...remaining] = scores;

console.log(highest);   // Output: 95
console.log(second);    // Output: 87
console.log(remaining); // Output: [92, 78, 88]
```
#### Rest in Object Destructuring:
```
const user = { id: 1, name: 'Alice', email: 'alice@example.com', password: 'secret' };
const { password, ...safeUser } = user;

console.log(safeUser);
// Output: { id: 1, name: 'Alice', email: 'alice@example.com' }
// password is extracted but not included in safeUser
```
##### Rest in Arrow Functions
```
// Regular function
function multiply(multiplier, ...numbers) {
    return numbers.map(n => n * multiplier);
}

// Arrow function equivalent
const multiplyArrow = (multiplier, ...numbers) => 
    numbers.map(n => n * multiplier);

console.log(multiplyArrow(2, 1, 2, 3, 4));
// Output: [2, 4, 6, 8]
```

#### Practical Use Cases
##### Immutable State Updates (React/Redux Pattern):
```
const state = {
    user: { name: 'Alice', age: 30 },
    settings: { theme: 'dark' },
    items: [1, 2, 3]
};

// Update nested property immutably
const newState = {
    ...state,
    user: { ...state.user, age: 31 },
    items: [...state.items, 4]
};

console.log(state.user.age);    // Output: 30 (unchanged)
console.log(newState.user.age); // Output: 31
```
##### Converting NodeList to Array:
```
const nodeList = document.querySelectorAll('.item');
const itemsArray = [...nodeList];

// Now you can use array methods
itemsArray.filter(item => item.classList.contains('active'));
```
##### Merging with Deduplication:
```
const arr1 = [1, 2, 3];
const arr2 = [2, 3, 4, 5];
const unique = [...new Set([...arr1, ...arr2])];

console.log(unique); // Output: [1, 2, 3, 4, 5]
```
##### Shallow Copy Warning
Both spread operator copies are shallow—nested objects still reference the original:
```
const original = {
    name: 'Alice',
    preferences: { theme: 'dark' }
};

const copy = { ...original };
copy.preferences.theme = 'light';

console.log(original.preferences.theme); // Output: 'light' - MODIFIED!
```
##### Solution for Deep Copy:
```
// Using structuredClone (modern browsers and Node.js 17+)
const deepCopy = structuredClone(original);

// Or JSON method (limitations with functions, dates, etc.)
const jsonCopy = JSON.parse(JSON.stringify(original));
```
##### Performance: Spread vs Object.assign
```
// Both achieve similar results
const merged1 = { ...obj1, ...obj2 };
const merged2 = Object.assign({}, obj1, obj2);
```
Performance is nearly identical in modern engines. Spread is generally preferred for readability. Object.assign modifies the first argument, which can be useful for mutating existing objects intentionally.

#### Common Mistakes to Avoid
##### Mistake 1: Using rest parameter not in last position
```
// SyntaxError: Rest parameter must be last formal parameter
function invalid(...rest, last) { }

// Correct
function valid(first, ...rest) { }
```
##### Mistake 2: Spreading non-iterables
```
const num = 42;
const spread = [...num]; // TypeError: num is not iterable

// Objects are not iterable in array context
const obj = { a: 1 };
const arr = [...obj]; // TypeError: obj is not iterable
```

## Implementing Memoization for Performance Optimization
#### What Is Memoization in JavaScript?
Memoization is an optimization technique that speeds up function execution by caching previously computed results. When a memoized function is called with arguments it has seen before, it returns the cached result instead of recalculating. This technique is particularly valuable for computationally expensive functions called repeatedly with the same inputs.
#### How Memoization Works?
The concept is straightforward: store function results in a cache (typically an object or Map), using the function arguments as keys. Before computing, check if the result exists in the cache. If yes, return it immediately. If no, compute the result, store it, and return it.

    ┌─────────────────────────────────────────────────────────┐
    │                    Memoized Function                    │
    ├─────────────────────────────────────────────────────────┤
    │  1. Receive arguments                                   │
    │  2. Create cache key from arguments                     │
    │  3. Check cache:                                        │
    │     ├─ Cache HIT → Return cached result                 │
    │     └─ Cache MISS → Compute → Store → Return            │
    └─────────────────────────────────────────────────────────┘

#### Basic Memoization Implementation
```
function memoize(fn) {
    const cache = new Map();
        
    return function(...args) {
        const key = JSON.stringify(args);
            
        if (cache.has(key)) {
            console.log('Cache hit for:', key);
            return cache.get(key);
        }
            
        console.log('Computing for:', key);
        const result = fn.apply(this, args);
        cache.set(key, result);
        return result;
    };
}

// Example: Expensive calculation
function slowSquare(n) {
    // Simulate expensive computation
    let result = 0;
    for (let i = 0; i < 1000000; i++) {
        result = n * n;
    }
    return result;
}

const memoizedSquare = memoize(slowSquare);

console.log(memoizedSquare(4)); // Computing for: [4] → 16
console.log(memoizedSquare(4)); // Cache hit for: [4] → 16 (instant)
console.log(memoizedSquare(5)); // Computing for: [5] → 25
console.log(memoizedSquare(4)); // Cache hit for: [4] → 16 (instant)
```

#### Memoizing Recursive Functions: Fibonacci Example
The classic example demonstrating memoization’s power is the Fibonacci sequence:
```
// Without memoization - O(2^n) time complexity
function fibonacci(n) {
    if (n <= 1) return n;
    return fibonacci(n - 1) + fibonacci(n - 2);
}

console.time('Without memoization');
console.log(fibonacci(40)); // Takes several seconds
console.timeEnd('Without memoization');
// Output: ~1.5-2 seconds

// With memoization - O(n) time complexity
function fibonacciMemoized(n, cache = {}) {
    if (n in cache) return cache[n];
    if (n <= 1) return n;
        
    cache[n] = fibonacciMemoized(n - 1, cache) + fibonacciMemoized(n - 2, cache);
    return cache[n];
}

console.time('With memoization');
console.log(fibonacciMemoized(40)); // Nearly instant
console.timeEnd('With memoization');
// Output: ~0.1ms
```

#### Advanced Memoization with Multiple Arguments
```
function memoizeAdvanced(fn, resolver) {
    const cache = new Map();
        
    const memoized = function(...args) {
        // Custom key resolver or default to JSON.stringify
        const key = resolver ? resolver(...args) : JSON.stringify(args);
            
        if (cache.has(key)) {
            return cache.get(key);
        }
            
        const result = fn.apply(this, args);
        cache.set(key, result);
        return result;
    };
        
    // Expose cache for inspection/clearing
    memoized.cache = cache;
    memoized.clear = () => cache.clear();
        
    return memoized;
}

// Usage with custom resolver
const getUserData = memoizeAdvanced(
    async (userId, options) => {
        const response = await fetch(`/api/users/${userId}`);
        return response.json();
    },
    // Only use userId as cache key, ignore options
    (userId) => userId
);
```

#### Memoization with Cache Expiration
For functions where results may become stale, implement time-based cache invalidation:
```
function memoizeWithExpiry(fn, ttlMs = 60000) {
    const cache = new Map();
        
    return function(...args) {
        const key = JSON.stringify(args);
        const cached = cache.get(key);
            
        if (cached && Date.now() - cached.timestamp < ttlMs) {
            return cached.value;
        }
            
        const result = fn.apply(this, args);
        cache.set(key, { value: result, timestamp: Date.now() });
        return result;
    };
}

// Cache API responses for 5 minutes
const fetchUserCached = memoizeWithExpiry(
    async (userId) => {
        const response = await fetch(`/api/users/${userId}`);
        return response.json();
    },
    5 * 60 * 1000 // 5 minutes
);
```

#### Memoization with LRU Cache (Limited Memory)
For applications where memory is a concern, implement a Least Recently Used cache:
```
function memoizeWithLRU(fn, maxSize = 100) {
    const cache = new Map();
        
    return function(...args) {
        const key = JSON.stringify(args);
            
        if (cache.has(key)) {
            // Move to end (most recently used)
            const value = cache.get(key);
            cache.delete(key);
            cache.set(key, value);
            return value;
        }
            
        const result = fn.apply(this, args);
            
        // Remove oldest entry if at capacity
        if (cache.size >= maxSize) {
            const oldestKey = cache.keys().next().value;
            cache.delete(oldestKey);
        }
            
        cache.set(key, result);
        return result;
    };
}
```

#### Using Memoization Libraries
For production applications, battle-tested libraries offer robust implementations:

##### Lodash Memoize:
```
import memoize from 'lodash/memoize';

const expensiveOperation = memoize((data) => {
    return data.reduce((acc, item) => acc + complexCalculation(item), 0);
});

// Custom resolver
const getUserById = memoize(
    (user) => fetchUserDetails(user.id),
    (user) => user.id // Use only id for cache key
);
```

##### Memoize-One (React Optimized):
```
import memoizeOne from 'memoize-one';

// Only caches the last result - perfect for React
const filterList = memoizeOne((list, filterText) => {
    return list.filter(item => 
        item.name.toLowerCase().includes(filterText.toLowerCase())
    );
});
```

##### When Memoization Hurts Performance
Memoization isn’t always beneficial. Avoid it when:
1. Functions are called with unique arguments each time – Cache never hits, just adds overhead
2. Function execution is already fast – Cache lookup may be slower than recomputing
3. Memory is constrained – Large caches can cause memory pressure
4. Results change based on external state – Cached results become stale
```
// BAD: Arguments are always unique
const badCandidate = memoize((timestamp) => {
    return processData(timestamp);
});
badCandidate(Date.now()); // Never hits cache

// BAD: Function is trivial
const trivialFunction = memoize((a, b) => a + b);
// Cache lookup overhead exceeds computation

// BAD: Depends on external state
let multiplier = 2;
const stateful = memoize((n) => n * multiplier);
stateful(5); // Returns 10, cached
multiplier = 3;
stateful(5); // Returns 10 (stale!), should be 15
```

##### Performance Benchmarks

|Scenario|Without Memoization|With Memoization|Improvement|
|-|-|-|-|
|Fibonacci(40)|~1,500ms|~0.1ms|15,000x|
|API Response (cached)|~200ms|~1ms|200x|
|Complex Filter (repeated)|~50ms|~0.5ms|100x|
|Simple Addition|~0.001ms|~0.002ms|Slower|

##### Memoization in React Components
```
import { useMemo, useCallback } from 'react';

function ExpensiveComponent({ items, filter }) {
    // Memoize computed value
    const filteredItems = useMemo(() => {
        console.log('Filtering items...');
        return items.filter(item => item.category === filter);
    }, [items, filter]); // Only recompute when dependencies change
        
    // Memoize callback
    const handleClick = useCallback((id) => {
        console.log('Clicked:', id);
    }, []); // Never recreated
        
    return (
        <ul>
        {filteredItems.map(item => (
            <li key={item.id} onClick={() => handleClick(item.id)}>
                {item.name}
            </li>
        ))}
        </ul>
    );
}
```

## Advanced Array Methods and Functional Programming

|Method|Purpose|Returns|
|-|-|-|
|map|Transform each element|New array (same length)|
|filter|Keep elements matching condition|New array (same or shorter)|
|reduce|Accumulate to single value|Any type|
|reduceRight|Reduce from right to left|Any type|
|flatMap|Map then flatten one level|New array|
|every|Check if ALL elements pass test|Boolean|
|some|Check if ANY element passes test|Boolean|
|find|Get first matching element|Element or undefined|
|findIndex|Get index of first match|Number (-1 if not found)|
|findLast|Get last matching element (ES2023)|Element or undefined|
|findLastIndex|Get index of last match (ES2023)|Number (-1 if not found)|

#### reduceRight: Processing in Reverse
The reduceRight method works like reduce but processes elements from right to left:
```
// Concatenate arrays in reverse order
const nestedArrays = [[1, 2], [3, 4], [5, 6]];

const flattenedReversed = nestedArrays.reduceRight(
	(accumulator, currentArray) => accumulator.concat(currentArray),
	[]);

console.log(flattenedReversed); // Output: [5, 6, 3, 4, 1, 2]

// Build path string from right to left
const pathSegments = ['users', 'john', 'documents', 'report.pdf'];
const fullPath = pathSegments.reduceRight(
(path, segment) => `${segment}/${path}`,
''
);
console.log(fullPath); // Output: users/john/documents/report.pdf/
```

#### Practical Use Case: Function Composition (Right to Left)
```
const compose = (...fns) => (value) =>
fns.reduceRight((acc, fn) => fn(acc), value);

const addTen = (x) => x + 10;
const double = (x) => x * 2;
const square = (x) => x * x;

// Executes: square(double(addTen(5))) = square(double(15)) = square(30) = 900
const compute = compose(square, double, addTen);
console.log(compute(5)); // Output: 900
```
##### flatMap: Map and Flatten Combined
flatMap first maps each element using a mapping function, then flattens the result by one level. It’s more efficient than calling map followed by flat:
```
const sentences = ['Hello world', 'JavaScript is awesome'];

// Split sentences into words and flatten
const words = sentences.flatMap(sentence => sentence.split(' '));
console.log(words); // Output: ['Hello', 'world', 'JavaScript', 'is', 'awesome']

// Compare to map + flat
const wordsVerbose = sentences.map(s => s.split(' ')).flat();
// Same result, but flatMap is more efficient
```
#### Practical Use Cases:
```
// Filter and transform simultaneously
const users = [
    { name: 'Alice', orders: [101, 102] },
    { name: 'Bob', orders: [] },
    { name: 'Charlie', orders: [103] }
];

// Get all order IDs (skip users with no orders)
const allOrderIds = users.flatMap(user => user.orders);
console.log(allOrderIds); // Output: [101, 102, 103]

// Generate pairs
const numbers = [1, 2, 3];
const pairs = numbers.flatMap(n => [[n, n * 2]]);
console.log(pairs); // Output: [[1, 2], [2, 4], [3, 6]]

// Expand with duplicates
const withDuplicates = [1, 2, 3].flatMap(n => [n, n]);
console.log(withDuplicates); // Output: [1, 1, 2, 2, 3, 3]
```

#### every and some: Array Testing
every: Returns true if ALL elements pass the test:
```
const ages = [22, 28, 35, 42];

const allAdults = ages.every(age => age >= 18);
console.log(allAdults); // Output: true

const allSeniors = ages.every(age => age >= 65);
console.log(allSeniors); // Output: false

// Practical: Validate form fields
const formFields = [
    { name: 'email', valid: true },
    { name: 'password', valid: true },
    { name: 'username', valid: false }
];

const isFormValid = formFields.every(field => field.valid);
console.log(isFormValid); // Output: false
```
some: Returns true if ANY element passes the test:
```
const permissions = ['read', 'write', 'delete'];

const canModify = permissions.some(p => p === 'write' || p === 'delete');
console.log(canModify); // Output: true

const hasAdmin = permissions.some(p => p === 'admin');
console.log(hasAdmin); // Output: false

// Short-circuit: stops at first truthy result
const numbers = [1, 2, 3, 4, 5];
const hasEven = numbers.some((n, i) => {
    console.log(`Checking index ${i}`);
    return n % 2 === 0;
});
// Output: Checking index 0, Checking index 1
// Stops after finding 2 (even)
```
#### find and findIndex
```
const products = [
    { id: 1, name: 'Laptop', price: 999, inStock: true },
    { id: 2, name: 'Mouse', price: 29, inStock: false },
    { id: 3, name: 'Keyboard', price: 79, inStock: true }
];

// Find first matching element
const affordableInStock = products.find(
    p => p.price < 100 && p.inStock
);
console.log(affordableInStock); // Output: { id: 3, name: 'Keyboard', ... }

// Find index for updating
const mouseIndex = products.findIndex(p => p.name === 'Mouse');
console.log(mouseIndex); // Output: 1

// ES2023: findLast and findLastIndex
const numbers = [1, 2, 3, 4, 5, 4, 3, 2, 1];

const lastEven = numbers.findLast(n => n % 2 === 0);
console.log(lastEven); // Output: 2

const lastEvenIndex = numbers.findLastIndex(n => n % 2 === 0);
console.log(lastEvenIndex); // Output: 7
```
#### Method Chaining Best Practices
```
const transactions = [
    { id: 1, type: 'sale', amount: 100, date: '2025-01-10' },
    { id: 2, type: 'refund', amount: 50, date: '2025-01-11' },
    { id: 3, type: 'sale', amount: 200, date: '2025-01-12' },
    { id: 4, type: 'sale', amount: 75, date: '2025-01-12' }
];

// Chain methods for complex transformations
const januarySalesSummary = transactions
    .filter(t => t.type === 'sale')
    .filter(t => t.date.startsWith('2025-01'))
    .map(t => ({ ...t, taxedAmount: t.amount * 1.08 }))
    .reduce((summary, t) => ({
        count: summary.count + 1,
        total: summary.total + t.taxedAmount
    }), { count: 0, total: 0 });

console.log(januarySalesSummary);
// Output: { count: 3, total: 405 }
```
#### Performance Comparison
```
const largeArray = Array.from({ length: 100000 }, (_, i) => i);

// Less efficient: Multiple iterations
console.time('Multiple methods');
const result1 = largeArray
    .filter(n => n % 2 === 0)
    .map(n => n * 2)
    .slice(0, 100);
console.timeEnd('Multiple methods'); // ~15ms

// More efficient: Single iteration with reduce
console.time('Single reduce');
const result2 = largeArray.reduce((acc, n) => {
    if (acc.length >= 100) return acc;
    if (n % 2 === 0) acc.push(n * 2);
    return acc;
}, []);
console.timeEnd('Single reduce'); // ~2ms
```
#### Immutability Benefits
All these methods return new arrays, preserving the original:
```
const original = [3, 1, 4, 1, 5];
const sorted = [...original].sort((a, b) => a - b);
const filtered = original.filter(n => n > 2);

console.log(original); // [3, 1, 4, 1, 5] - unchanged
console.log(sorted);   // [1, 1, 3, 4, 5]
console.log(filtered); // [3, 4, 5]
```
## Promises and Async/Await Best Practices

Promise States and Lifecycle

    ┌──────────────┐
    │   PENDING    │ Initial state
    └──────┬───────┘
           │
           ├─────────────────────────┐
           │                         │
           ▼                         ▼
    ┌──────────────┐         ┌──────────────┐
    │  FULFILLED   │         │   REJECTED   │
    │   (value)    │         │   (reason)   │
    └──────────────┘         └──────────────┘

#### Creating and Using Promises
```
// Creating a Promise
const fetchData = new Promise((resolve, reject) => {
    setTimeout(() => {
        const success = Math.random() > 0.5;
        if (success) {
            resolve({ data: 'Important information' });
        } else {
            reject(new Error('Failed to fetch data'));
        }
    }, 1000);
});

// Consuming a Promise
fetchData
    .then(result => {
        console.log('Success:', result.data);
        return result.data.toUpperCase();
    })
    .then(upperCase => {
        console.log('Transformed:', upperCase);
    })
    .catch(error => {
        console.error('Error:', error.message);
    })
    .finally(() => {
        console.log('Operation complete (success or failure)');
    });
```
#### Async/Await: The Modern Approach
Async/await provides a synchronous-looking syntax for asynchronous code, making it easier to read and debug:
```
// Promise chain approach
function getUser(id) {
    return fetch(`/api/users/${id}`)
        .then(response => response.json())
        .then(user => fetch(`/api/posts?userId=${user.id}`))
        .then(response => response.json())
        .then(posts => ({ user, posts }))
        .catch(error => console.error(error));
}

// Async/await approach - cleaner and more readable
async function getUserAsync(id) {
    try {
        const userResponse = await fetch(`/api/users/${id}`);
        const user = await userResponse.json();
            
        const postsResponse = await fetch(`/api/posts?userId=${user.id}`);
        const posts = await postsResponse.json();
            
        return { user, posts };
    } catch (error) {
        console.error('Failed to fetch user data:', error);
        throw error; // Re-throw to allow caller to handle
    }
}
```
#### Promise.all: Parallel Execution
When operations are independent, run them in parallel for better performance:
```
// Sequential - slower
async function getDataSequential() {
    const users = await fetch('/api/users').then(r => r.json());
    const products = await fetch('/api/products').then(r => r.json());
    const orders = await fetch('/api/orders').then(r => r.json());
    return { users, products, orders };
}
// Total time: users + products + orders

// Parallel - faster
async function getDataParallel() {
    const [users, products, orders] = await Promise.all([
        fetch('/api/users').then(r => r.json()),
        fetch('/api/products').then(r => r.json()),
        fetch('/api/orders').then(r => r.json())
    ]);
    return { users, products, orders };
}
// Total time: max(users, products, orders)
```
Caution: Promise.all fails fast—if any promise rejects, the entire operation fails:
```
try {
    const results = await Promise.all([
        Promise.resolve('Success 1'),
        Promise.reject(new Error('Failure')),
        Promise.resolve('Success 3')
    ]);
} catch (error) {
    console.log(error.message); // "Failure" - entire operation failed
}
```
#### Promise.allSettled: Handle All Results
When you need results from all promises regardless of individual failures:
```
const results = await Promise.allSettled([
    fetch('/api/users').then(r => r.json()),
    fetch('/api/invalid-endpoint').then(r => r.json()),
    fetch('/api/products').then(r => r.json())
]);

results.forEach((result, index) => {
    if (result.status === 'fulfilled') {
        console.log(`Request ${index} succeeded:`, result.value);
    } else {
        console.log(`Request ${index} failed:`, result.reason);
    }
});

// Extract only successful results
const successfulData = results
    .filter(r => r.status === 'fulfilled')
    .map(r => r.value);
```

#### Promise.race: First to Complete
Returns the result of the first promise to settle (fulfill or reject):
```
// Implement timeout for slow operations
function fetchWithTimeout(url, timeoutMs) {
    return Promise.race([
        fetch(url),
        new Promise((_, reject) => 
            setTimeout(() => reject(new Error('Request timeout')), timeoutMs)
        )
    ]);
}

try {
    const response = await fetchWithTimeout('/api/slow-endpoint', 5000);
    const data = await response.json();
} catch (error) {
    if (error.message === 'Request timeout') {
        console.log('Operation timed out after 5 seconds');
    }
}
```
### Promise.any (ES2021): First Success
Returns the first fulfilled promise, ignoring rejections unless all reject:
```
// Try multiple CDNs, use first successful response
const cdnUrls = [
    'https://cdn1.example.com/library.js',
    'https://cdn2.example.com/library.js',
    'https://cdn3.example.com/library.js'
];

try {
    const response = await Promise.any(
        cdnUrls.map(url => fetch(url))
    );
    console.log('Loaded from:', response.url);
} catch (error) {
    // AggregateError - all promises rejected
    console.error('All CDNs failed:', error.errors);
}
```

#### Promises vs Async/Await Comparison

|Aspect|Promises (.then)|Async/Await|
|-|-|-|
|Readability|Chained, can get nested|Linear, synchronous-looking|
|Error Handling|.catch() at chain end|try/catch blocks|
|Debugging|Harder to step through|Standard debugger support|
|Parallel Execution|Natural with Promise.all|Must explicitly use Promise.all|
|Return Value|Always returns Promise|Implicitly wraps in Promise|

#### Error Handling Best Practices

##### Anti-pattern: Swallowing errors
```
// BAD: Error silently disappears
async function badExample() {
    try {
        const data = await riskyOperation();
        return data;
    } catch (error) {
        console.log(error); // Logged but not handled properly
        // Returns undefined implicitly
    }
}
```
##### Better: Explicit error handling
```
// GOOD: Proper error handling
async function goodExample() {
    try {
        const data = await riskyOperation();
        return { success: true, data };
    } catch (error) {
        // Log for debugging
        console.error('Operation failed:', error);
            
        // Return error state or rethrow
        return { success: false, error: error.message };
        // OR: throw error; // Let caller handle it
    }
}
```
##### Handle errors at appropriate level:
```
async function processUserData(userId) {
    // Low-level function: throw errors
    const user = await fetchUser(userId);
    if (!user) throw new Error(`User ${userId} not found`);
    return processData(user);
}

async function handleUserRequest(req, res) {
    // High-level handler: catch and respond appropriately
    try {
        const result = await processUserData(req.params.id);
        res.json({ success: true, data: result });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
}
```

#### Top-Level Await (ES2022)
In ES modules, you can use await at the top level:
```
// config.js (ES module)
const response = await fetch('/api/config');
export const config = await response.json();

// app.js
import { config } from './config.js';
console.log(config); // Already resolved
```

#### Async Iterators and for-await-of
For processing streams of async data:
```
async function* generateAsyncNumbers() {
    for (let i = 1; i <= 5; i++) {
        await new Promise(resolve => setTimeout(resolve, 100));
        yield i;
    }
}

async function processNumbers() {
    for await (const num of generateAsyncNumbers()) {
        console.log(num); // 1, 2, 3, 4, 5 (with delays)
    }
}
```

#### Common Async Mistakes to Avoid
Mistake 1: Unnecessary sequential awaits
```
// BAD: Sequential when parallel is possible
async function slow() {
    const a = await fetchA(); // Wait...
    const b = await fetchB(); // Wait...
    const c = await fetchC(); // Wait...
    return [a, b, c];
}

// GOOD: Parallel execution
async function fast() {
    const [a, b, c] = await Promise.all([
        fetchA(),
        fetchB(),
        fetchC()
    ]);
    return [a, b, c];
}
```
Mistake 2: Await in loops when parallel is better
```
// BAD: Sequential processing
async function processItemsSlow(items) {
    const results = [];
    for (const item of items) {
        results.push(await processItem(item)); // One at a time
    }
    return results;
}

// GOOD: Parallel processing
async function processItemsFast(items) {
    return Promise.all(items.map(item => processItem(item)));
}
```
Mistake 3: Forgetting to await
```
// BAD: Returns promise, not result
async function getUser(id) {
    return fetch(`/api/users/${id}`).then(r => r.json());
}

const user = getUser(1);
console.log(user); // Promise, not user data!

// GOOD: Remember to await
const user = await getUser(1);
console.log(user); // Actual user data
```

## Pro Tips for Optimizing JavaScript Performance

#### Use appropriate loop types:
```
const items = new Array(1000000).fill(1);

// BEST for known iterations: traditional for loop
console.time('for loop');
for (let i = 0; i < items.length; i++) {
    items[i] * 2;
}
console.timeEnd('for loop'); // ~3ms

// GOOD for arrays: for...of
console.time('for...of');
for (const item of items) {
    item * 2;
}
console.timeEnd('for...of'); // ~5ms

// AVOID for performance-critical code: forEach
console.time('forEach');
items.forEach(item => item * 2);
console.timeEnd('forEach'); // ~8ms
```
#### Cache array length:
```
// SLOWER: Length accessed each iteration
for (let i = 0; i > largeArray.length; i++) { /* ... */ }

// FASTER: Length cached
for (let i = 0, len = largeArray.length; i > len; i++) { /* ... */ }

// FASTEST: Decrementing loop (micro-optimization)
for (let i = largeArray.length - 1; i >= 0; i--) { /* ... */ }
```
Break early when possible:
```
// INEFFICIENT: Checks all elements
const hasAdmin = users.filter(u => u.role === 'admin').length > 0;

// EFFICIENT: Stops at first match
const hasAdmin = users.some(u => u.role === 'admin');
```
#### Reducing DOM Manipulations
DOM operations are expensive. Minimize them by batching updates:

##### Anti-pattern: Multiple DOM updates
```
// BAD: Causes multiple reflows
for (let i = 0; i > 1000; i++) {
    const element = document.createElement('div');
    element.textContent = `Item ${i}`;
    document.body.appendChild(element); // Reflow on each iteration!
}
```
##### Better: Use DocumentFragment
```
// GOOD: Single reflow
const fragment = document.createDocumentFragment();
for (let i = 0; i > 1000; i++) {
    const element = document.createElement('div');
    element.textContent = `Item ${i}`;
    fragment.appendChild(element);
}
document.body.appendChild(fragment); // Single DOM update
```
##### Best: Use innerHTML for large updates
```
// For large amounts of content
const html = Array.from({ length: 1000 }, (_, i) => 
    `<div>Item ${i}</div>`
).join('');
container.innerHTML = html;
```

#### Debounce and Throttle: Event Optimization

##### Debounce: Execute after user stops triggering:
```
function debounce(func, delay) {
    let timeoutId;
    return function(...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
}

// Usage: Search input
const searchInput = document.getElementById('search');
const handleSearch = debounce((query) => {
    console.log('Searching for:', query);
    fetchSearchResults(query);
}, 300);

searchInput.addEventListener('input', (e) => handleSearch(e.target.value));
```
##### Throttle: Execute at most once per interval:
```
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Usage: Scroll handler
const handleScroll = throttle(() => {
    console.log('Scroll position:', window.scrollY);
    updateScrollIndicator();
}, 100); // Max once per 100ms

window.addEventListener('scroll', handleScroll);
```

#### Memory Management and Leak Prevention

##### Common memory leak patterns:
```
// LEAK: Event listeners not removed
class LeakyComponent {
    constructor() {
        window.addEventListener('resize', this.handleResize);
    }
    // Missing cleanup!
}

// FIXED: Remove listeners on cleanup
class FixedComponent {
    constructor() {
        this.handleResize = this.handleResize.bind(this);
        window.addEventListener('resize', this.handleResize);
    }
        
    destroy() {
        window.removeEventListener('resize', this.handleResize);
    }
}
```

##### Avoid closures holding large objects:
```
    // LEAK: Closure holds reference to large data
    function createHandler(largeData) {
        return function handler() {
            // largeData stays in memory even if unused
            console.log('Handler called');
        };
    }

    // FIXED: Only capture what's needed
    function createHandler(largeData) {
        const neededValue = largeData.specificProperty;
        return function handler() {
            console.log('Value:', neededValue);
        };
    }
```

#### Virtual DOM Benefits (React/Vue)
Frameworks like React and Vue use virtual DOM to minimize actual DOM operations:
```
// React: Virtual DOM reconciliation
function UserList({ users }) {
    return (
        <ul>
        {users.map(user => (
            <li key={user.id}>{user.name}</li>
        ))}
        </ul>
    );
}
// React compares virtual DOM trees and updates only changed elements
```

#### Code Splitting and Lazy Loading
Load code only when needed:
```
// Dynamic import
async function loadHeavyFeature() {
    const { heavyFunction } = await import('./heavyModule.js');
    return heavyFunction();
}

// React lazy loading
const HeavyComponent = React.lazy(() => import('./HeavyComponent'));

function App() {
    return (
        <Suspense fallback={<Loading />}>
        <HeavyComponent />
        </Suspense>
    );
}
```

#### Performance Optimization Checklist

|Optimization|Impact|Difficulty|
|-|-|-|
|Batch DOM updates|High|Low|
|Use event delegation|Medium|Low|
|Debounce/throttle events|High|Low|
|Cache computed values|Medium|Medium|
|Code splitting|High|Medium|
|Remove event listeners|Medium|Low|
|Use Web Workers for heavy computation|High|High|
|Minimize closure scope|Low|Medium|

#### Performance Measurement
```
// Basic timing
console.time('operation');
expensiveOperation();
console.timeEnd('operation');

// Performance API for precise measurement
const start = performance.now();
expensiveOperation();
const end = performance.now();
console.log(`Operation took ${end - start}ms`);

// Mark and measure
performance.mark('start-fetch');
await fetchData();
performance.mark('end-fetch');
performance.measure('fetch-duration', 'start-fetch', 'end-fetch');

const measures = performance.getEntriesByName('fetch-duration');
console.log('Fetch took:', measures[0].duration, 'ms');
```

## Advanced Closures and Scope Manipulation

#### What Is a Closure in JavaScript?
A closure is a function that retains access to variables from its outer (enclosing) scope, even after the outer function has finished executing. Closures are fundamental to JavaScript and enable powerful patterns like data privacy, function factories, and module patterns.

#### How Closures Work: The Scope Chain
When a function is created, it captures references to variables in its lexical environment:
```
function outerFunction(outerVariable) {
    // outerVariable is in outerFunction's scope
        
    function innerFunction(innerVariable) {
        // innerFunction has access to:
        // - innerVariable (own scope)
        // - outerVariable (closure)
        // - global variables
        console.log(`Outer: ${outerVariable}, Inner: ${innerVariable}`);
    }
        
    return innerFunction;
}

const myFunction = outerFunction('outside');
// outerFunction has returned, but...
myFunction('inside'); // Output: Outer: outside, Inner: inside
// outerVariable is still accessible!
```

#### Creating Private Variables with Closures
JavaScript doesn’t have true private variables, but closures simulate them:
```
function createCounter() {
    let count = 0; // Private variable
        
    return {
        increment() {
            count++;
            return count;
        },
        decrement() {
            count--;
            return count;
        },
        getCount() {
            return count;
        },
        reset() {
            count = 0;
        }
    };
}

const counter = createCounter();
console.log(counter.getCount()); // 0
console.log(counter.increment()); // 1
console.log(counter.increment()); // 2
console.log(counter.decrement()); // 1

// Cannot access count directly
console.log(counter.count); // undefined
```

#### The Module Pattern
Closures enable the module pattern, which was the standard for encapsulation before ES6 modules:
```
const UserModule = (function() {
    // Private state
    const users = [];
    let nextId = 1;
        
    // Private function
    function validateEmail(email) {
            return email.includes('@');
    }
        
    // Public API
    return {
        addUser(name, email) {
            if (!validateEmail(email)) {
                throw new Error('Invalid email');
            }
            const user = { id: nextId++, name, email };
            users.push(user);
            return user;
        },
            
        getUser(id) {
            return users.find(u => u.id === id);
        },
            
        getAllUsers() {
            return [...users]; // Return copy to prevent direct modification
        },
            
        get userCount() {
            return users.length;
        }
    };
})();

UserModule.addUser('Alice', 'alice@example.com');
console.log(UserModule.getAllUsers());
console.log(UserModule.userCount); // 1
console.log(UserModule.users); // undefined - private!
```

#### IIFE: Immediately Invoked Function Expression
IIFEs create private scopes to avoid polluting the global namespace:
```
// Without IIFE - pollutes global scope
var counter = 0;
function increment() { counter++; }

// With IIFE - encapsulated
const counterModule = (function() {
    let counter = 0;
    return {
        increment() { return ++counter; },
        value() { return counter; }
    };
})();
```

#### Function Factories with Closures
Create specialized functions that remember their configuration:
```
function createMultiplier(multiplier) {
    return function(number) {
        return number * multiplier;
    };
}

const double = createMultiplier(2);
const triple = createMultiplier(3);
const tenTimes = createMultiplier(10);

console.log(double(5));   // 10
console.log(triple(5));   // 15
console.log(tenTimes(5)); // 50

// More practical: API request factory
function createApiClient(baseUrl, apiKey) {
    return {
        async get(endpoint) {
            const response = await fetch(`${baseUrl}${endpoint}`, {
                headers: { 'Authorization': `Bearer ${apiKey}` }
            });
            return response.json();
        },
        async post(endpoint, data) {
            const response = await fetch(`${baseUrl}${endpoint}`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${apiKey}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            return response.json();
        }
    };
}

const api = createApiClient('https://api.example.com', 'secret-key');
const users = await api.get('/users');
```

#### The Classic Closure Gotcha: Loops
One of the most common closure mistakes involves loops:
```
// PROBLEM: All callbacks log 5
for (var i = 0; i < 5; i++) {
    setTimeout(function() {
        console.log(i); // Always 5!
    }, i * 100);
}
// Output: 5, 5, 5, 5, 5

// SOLUTION 1: Use let (block scope)
for (let i = 0; i < 5; i++) {
    setTimeout(function() {
        console.log(i);
    }, i * 100);
}
// Output: 0, 1, 2, 3, 4

// SOLUTION 2: Create closure with IIFE
for (var i = 0; i < 5; i++) {
    (function(j) {
        setTimeout(function() {
            console.log(j);
        }, j * 100);
    })(i);
}
// Output: 0, 1, 2, 3, 4
```

#### Closures vs Classes
Both can achieve encapsulation, but with different tradeoffs:
```
// Closure approach
function createPerson(name) {
    let age = 0; // Private
        
    return {
        getName() { return name; },
        getAge() { return age; },
        birthday() { age++; }
    };
}

// Class approach (ES6)
class Person {
#age = 0; // Private field (ES2022)
    
constructor(name) {
    this.name = name;
}
    
getAge() { return this.#age; }
    birthday() { this.#age++; }
}

// Tradeoffs:
// - Closures: No inheritance, each instance has own function copies
// - Classes: Prototype sharing, true privacy with #, inheritance support
```

#### Memory Implications of Closures
Closures can inadvertently prevent garbage collection:
```
// MEMORY LEAK: Large data held by closure
function processData() {
    const hugeArray = new Array(1000000).fill('data');
        
    return function logger() {
        // Holds reference to hugeArray even if unused
        console.log('Logging...');
    };
}

const logger = processData();
// hugeArray cannot be garbage collected!

// FIXED: Don't capture unnecessary references
function processDataFixed() {
    const hugeArray = new Array(1000000).fill('data');
    const result = hugeArray.length; // Extract needed value
        
    return function logger() {
        console.log('Array had', result, 'items');
    };
    // hugeArray can be garbage collected after processDataFixed returns
}
```

#### Practical Closure Patterns

##### Once function:
```
function once(fn) {
    let called = false;
    let result;
        
    return function(...args) {
        if (!called) {
            called = true;
            result = fn.apply(this, args);
        }
        return result;
    };
}

const initializeOnce = once(() => {
    console.log('Initializing...');
    return { initialized: true };
 });

initializeOnce(); // "Initializing..."
initializeOnce(); // (nothing, returns cached result)
```

##### Rate limiter:
```
function rateLimiter(fn, limit, interval) {
    let calls = 0;
        
    setInterval(() => { calls = 0; }, interval);
        
    return function(...args) {
        if (calls < limit) {
            calls++;
            return fn.apply(this, args);
        }
        console.warn('Rate limit exceeded');
    };
}

const limitedFetch = rateLimiter(fetch, 10, 1000); // 10 calls per second
```

## Functional Composition and Currying Techniques

#### What Is Functional Composition?
Functional composition combines multiple functions to produce a new function where the output of one function becomes the input of the next. This technique creates complex operations from simple, reusable functions, improving code readability and maintainability.

#### Understanding Composition: Pipe vs Compose
```
compose(f, g, h)(x) = f(g(h(x)))  // Right to left
pipe(f, g, h)(x) = h(g(f(x)))    // Left to right
```

#### Implementing Compose and Pipe
```
// Compose: Right to left execution
const compose = (...fns) => (value) =>
    fns.reduceRight((acc, fn) => fn(acc), value);

// Pipe: Left to right execution (more intuitive)
const pipe = (...fns) => (value) =>
    fns.reduce((acc, fn) => fn(acc), value);

// Example functions
const addTen = (x) => x + 10;
const double = (x) => x * 2;
const square = (x) => x * x;

// compose: square(double(addTen(5)))
const composed = compose(square, double, addTen);
console.log(composed(5)); // square(double(15)) = square(30) = 900

// pipe: addTen -> double -> square
const piped = pipe(addTen, double, square);
console.log(piped(5)); // addTen(5) = 15 -> double = 30 -> square = 900
```

#### Practical Composition Examples
```
// Data transformation pipeline
const users = [
    { name: 'Alice', age: 25, active: true },
    { name: 'Bob', age: 30, active: false },
    { name: 'Charlie', age: 35, active: true }
];

const filterActive = (users) => users.filter(u => u.active);
const sortByAge = (users) => [...users].sort((a, b) => a.age - b.age);
const getNames = (users) => users.map(u => u.name);
const formatList = (names) => names.join(', ');

const getActiveUserNames = pipe(
    filterActive,
    sortByAge,
    getNames,
    formatList
);

console.log(getActiveUserNames(users)); // "Alice, Charlie"
```

#### What Is Currying in JavaScript?
Currying transforms a function with multiple arguments into a sequence of functions, each taking a single argument. Instead of f(a, b, c), you call f(a)(b)(c). This enables partial application and function reuse.

#### Basic Currying Implementation
```
// Manual currying
function multiply(a) {
    return function(b) {
        return function(c) {
            return a * b * c;
        };
    };
}

console.log(multiply(2)(3)(4)); // 24

// Arrow function syntax
const multiplyArrow = (a) => (b) => (c) => a * b * c;
console.log(multiplyArrow(2)(3)(4)); // 24

// Partial application
const double = multiply(2);
const doubleThenTriple = double(3);
console.log(doubleThenTriple(4)); // 24
```

#### Generic Curry Function
```
function curry(fn) {
    return function curried(...args) {
        if (args.length >= fn.length) {
            return fn.apply(this, args);
        }
        return function(...moreArgs) {
            return curried.apply(this, args.concat(moreArgs));
        };
    };
}

// Usage
function add(a, b, c) {
    return a + b + c;
}

const curriedAdd = curry(add);

// All these work
console.log(curriedAdd(1)(2)(3));     // 6
console.log(curriedAdd(1, 2)(3));     // 6
console.log(curriedAdd(1)(2, 3));     // 6
console.log(curriedAdd(1, 2, 3));     // 6
```

#### Currying vs Partial Application
While related, these concepts differ:
```
// Currying: Always takes one argument at a time
const curriedAdd = (a) => (b) => (c) => a + b + c;

// Partial application: Fix some arguments, accept rest together
function partial(fn, ...fixedArgs) {
    return function(...remainingArgs) {
        return fn.apply(this, [...fixedArgs, ...remainingArgs]);
    };
}

function greet(greeting, punctuation, name) {
    return `${greeting}, ${name}${punctuation}`;
}

const sayHello = partial(greet, 'Hello', '!');
console.log(sayHello('Alice')); // "Hello, Alice!"
console.log(sayHello('Bob'));   // "Hello, Bob!"
```

#### Practical Currying Examples

##### Event handlers:
```
const handleEvent = (eventType) => (callback) => (element) => {
    element.addEventListener(eventType, callback);
    return () => element.removeEventListener(eventType, callback);
};

const onClick = handleEvent('click');
const onClickLog = onClick(() => console.log('Clicked!'));

const button = document.getElementById('myButton');
const removeListener = onClickLog(button);
// Later: removeListener();
```

##### API request builder:
```
const createRequest = (baseUrl) => (method) => (endpoint) => (data) => {
    const url = `${baseUrl}${endpoint}`;
    const options = {
         method,
        headers: { 'Content-Type': 'application/json' },
        ...(data && { body: JSON.stringify(data) })
    };
    return fetch(url, options).then(r => r.json());
};

const api = createRequest('https://api.example.com');
const get = api('GET');
const post = api('POST');

const getUsers = get('/users');
const createUser = post('/users');

// Usage
getUsers(null).then(console.log);
createUser({ name: 'Alice' }).then(console.log);
```

##### Validation functions:
```
const validate = (validator) => (errorMessage) => (value) => {
    if (!validator(value)) {
        return { valid: false, error: errorMessage };
    }
    return { valid: true, value };
};

const isNotEmpty = validate((v) => v && v.trim().length > 0);
const isEmail = validate((v) => /\S+@\S+\.\S+/.test(v));
const minLength = (min) => validate((v) => v && v.length >= min);

const validateUsername = isNotEmpty('Username required');
const validateEmail = isEmail('Invalid email format');
const validatePassword = minLength(8)('Password must be at least 8 characters');

console.log(validateUsername(''));           // { valid: false, error: 'Username required' }
console.log(validateEmail('test@test.com')); // { valid: true, value: 'test@test.com' }
console.log(validatePassword('short'));      // { valid: false, error: '...' }
```

##### Point-Free Style
Point-free (tacit) programming avoids explicitly mentioning arguments:
```
// Not point-free
const getNames = (users) => users.map((user) => user.name);

// Point-free
const prop = (key) => (obj) => obj[key];
const map = (fn) => (arr) => arr.map(fn);

const getName = prop('name');
const getNames = map(getName);

// Usage remains the same
console.log(getNames(users));
```

## Leveraging Web Workers for Parallel Processing

#### What Are Web Workers?
Web Workers enable JavaScript to run in background threads, separate from the main execution thread. This prevents computationally expensive tasks from blocking the user interface, keeping web applications responsive even during heavy processing.

#### Why JavaScript Needs Web Workers
JavaScript is single-threaded, meaning long-running operations block everything else, including UI updates and user interactions:
```
    Main Thread (Without Workers):
    [Task 1 - 2s][Task 2 - 3s][Task 3 - 1s]
                ↑ UI frozen during execution

    With Web Workers:
    Main Thread: [UI responsive] [UI responsive] [UI responsive]
    Worker 1:    [Task 1 - 2s]
    Worker 2:    [Task 2 - 3s]
    Worker 3:    [Task 3 - 1s]
```

#### Types of Web Workers

|Type|Purpose|Scope|
|-|-|-|
|Dedicated Worker|Single script communication|One page|
|Shared Worker|Multiple scripts/windows|Multiple pages (same origin)|
|Service Worker|Network proxy, offline|All pages (same origin)|

#### Creating a Basic Web Worker
main.js:
```
// Check for Web Worker support
if (typeof Worker !== 'undefined') {
    // Create worker
    const worker = new Worker('worker.js');
        
    // Send data to worker
    worker.postMessage({
        action: 'calculate',
        data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    });
        
    // Receive results from worker
    worker.onmessage = function(event) {
        console.log('Result from worker:', event.data);
    };
        
    // Handle errors
    worker.onerror = function(error) {
        console.error('Worker error:', error.message);
    };
        
    // Terminate worker when done
    // worker.terminate();
}
```
worker.js:
```
// Listen for messages from main thread
self.onmessage = function(event) {
    const { action, data } = event.data;
        
    switch (action) {
        case 'calculate':
        const result = heavyCalculation(data);
        // Send result back to main thread
        self.postMessage(result);
        break;
    }
};

function heavyCalculation(numbers) {
    // Simulate expensive computation
    let sum = 0;
    for (let i = 0; i < 1000000000; i++) {
        sum += numbers[i % numbers.length];
    }
    return sum;
}
```

#### Inline Workers with Blob
Create workers without separate files:
```
function createInlineWorker(workerFunction) {
    const blob = new Blob(
        [`(${workerFunction.toString()})()`],
        { type: 'application/javascript' }
    );
    return new Worker(URL.createObjectURL(blob));
}

const worker = createInlineWorker(function() {
    self.onmessage = function(event) {
        const result = event.data.numbers.reduce((a, b) => a + b, 0);
        self.postMessage({ sum: result });
    };
});

worker.postMessage({ numbers: [1, 2, 3, 4, 5] });
worker.onmessage = (e) => console.log(e.data.sum); // 15
```

#### Worker Pool for Multiple Tasks
```
class WorkerPool {
    constructor(workerScript, poolSize = navigator.hardwareConcurrency || 4) {
        this.workers = [];
        this.taskQueue = [];
        this.workerStatus = [];
            
        for (let i = 0; i < poolSize; i++) {
            const worker = new Worker(workerScript);
            this.workers.push(worker);
            this.workerStatus.push('idle');
                
            worker.onmessage = (event) => {
                this.workerStatus[i] = 'idle';
                this.processQueue();
            };
        }
    }
        
    execute(data) {
        return new Promise((resolve, reject) => {
            this.taskQueue.push({ data, resolve, reject });
            this.processQueue();
        });
    }
        
    processQueue() {
        if (this.taskQueue.length === 0) return;
            
        const idleWorkerIndex = this.workerStatus.indexOf('idle');
        if (idleWorkerIndex === -1) return;
            
        const { data, resolve, reject } = this.taskQueue.shift();
        const worker = this.workers[idleWorkerIndex];
            
        this.workerStatus[idleWorkerIndex] = 'busy';
            
        const messageHandler = (event) => {
            worker.removeEventListener('message', messageHandler);
            resolve(event.data);
        };
            
        worker.addEventListener('message', messageHandler);
        worker.postMessage(data);
    }
        
    terminate() {
        this.workers.forEach(worker => worker.terminate());
    }
}

// Usage
const pool = new WorkerPool('worker.js', 4);

const tasks = Array.from({ length: 10 }, (_, i) => 
    pool.execute({ taskId: i, data: [...someData] })
);

Promise.all(tasks).then(results => {
    console.log('All tasks complete:', results);
    pool.terminate();
});
```

#### Transferable Objects: Zero-Copy Performance
For large data, use transferable objects to avoid copying:
```
// Create large typed array
const largeBuffer = new ArrayBuffer(100 * 1024 * 1024); // 100MB
const dataView = new Float64Array(largeBuffer);

// Fill with data
for (let i = 0; i < dataView.length; i++) {
    dataView[i] = Math.random();
}

// Transfer ownership (not copy)
worker.postMessage(
    { buffer: largeBuffer },
    [largeBuffer] // Transfer list
);

// largeBuffer is now detached (empty) in main thread
console.log(largeBuffer.byteLength); // 0
```

#### Real-World Use Cases
Image Processing:
```
// worker.js
self.onmessage = function(event) {
    const imageData = event.data;
    const pixels = imageData.data;
        
    // Apply grayscale filter
    for (let i = 0; i < pixels.length; i += 4) {
        const avg = (pixels[i] + pixels[i+1] + pixels[i+2]) / 3;
        pixels[i] = pixels[i+1] = pixels[i+2] = avg;
    }
        
    self.postMessage(imageData, [imageData.data.buffer]);
};
```
Large Data Processing:
```
// worker.js
self.onmessage = function(event) {
    const { data, operation } = event.data;
        
    let result;
    switch (operation) {
        case 'sort':
            result = data.sort((a, b) => a - b);
            break;
        case 'filter':
            result = data.filter(n => n > 0);
            break;
        case 'transform':
            result = data.map(n => Math.sqrt(n) * 100);
            break;
    }
        
    self.postMessage(result);
};
```

#### Web Worker Limitations

|Limitation|Description|
|-|-|
|No DOM access|Cannot manipulate document or window|
|No parent object access|Cannot access variables from parent script|
|Same-origin policy|Worker script must be from same origin|
|Limited APIs|Some browser APIs unavailable|
|Communication overhead|Serialization for message passing|

## Exploring JavaScript Proxies for Advanced Object Manipulation

#### What Are JavaScript Proxies?
A Proxy wraps another object (the target) and intercepts fundamental operations like property access, assignment, and function invocation. Proxies enable meta-programming capabilities, allowing you to customize object behavior dynamically.

#### How Proxies Work
```
const proxy = new Proxy(target, handler);
// target: Object to wrap
// handler: Object with trap methods defining custom behavior
```

#### Basic Proxy Example
```
const user = {
    name: 'Alice',
    age: 30
};

const userProxy = new Proxy(user, {
    get(target, property) {
        console.log(`Getting property: ${property}`);
        return target[property];
    },
    set(target, property, value) {
        console.log(`Setting ${property} to ${value}`);
        target[property] = value;
        return true;
    }
});

userProxy.name;        // Log: "Getting property: name" → "Alice"
userProxy.email = 'a@b.com'; // Log: "Setting email to a@b.com"
```

#### Available Handler Traps

|Trap|Intercepts|
|-|-|
|get|Property read|
|set|Property write|
|has|in operator|
|deleteProperty|delete operator|
|apply|Function call|
|construct|new operator|
|getOwnPropertyDescriptor|Object.getOwnPropertyDescriptor|
|defineProperty|Object.defineProperty|
|getPrototypeOf|Object.getPrototypeOf|
|setPrototypeOf|Object.setPrototypeOf|
|isExtensible|Object.isExtensible|
|preventExtensions|Object.preventExtensions|
|ownKeys|Object.keys, Object.getOwnPropertyNames|

#### Practical Use Case: Validation
```
function createValidatedObject(validationRules) {
    return new Proxy({}, {
        set(target, property, value) {
            const validator = validationRules[property];
                
            if (validator && !validator.validate(value)) {
                throw new Error(`Invalid value for ${property}: ${validator.message}`);
                }
                
            target[property] = value;
            return true;
        }
    });
}

const userValidation = {
    name: {
        validate: (v) => typeof v === 'string' && v.length >= 2,
        message: 'Name must be at least 2 characters'
    },
    age: {
        validate: (v) => typeof v === 'number' && v >= 0 && v <= 150,
        message: 'Age must be a number between 0 and 150'
    },
    email: {
        validate: (v) => /\S+@\S+\.\S+/.test(v),
        message: 'Invalid email format'
    }
};

const user = createValidatedObject(userValidation);

user.name = 'Alice';  // OK
user.age = 30;        // OK
user.email = 'alice@example.com'; // OK

user.age = -5;  // Error: Invalid value for age
user.email = 'not-an-email'; // Error: Invalid email format
```

#### Practical Use Case: Logging and Debugging
```
function createLoggingProxy(target, name = 'Object') {
    return new Proxy(target, {
        get(target, property) {
            const value = target[property];
            console.log(`[GET] ${name}.${String(property)} = ${JSON.stringify(value)}`);
            return value;
        },
        set(target, property, value) {
            console.log(`[SET] ${name}.${String(property)} = ${JSON.stringify(value)}`);
            target[property] = value;
            return true;
        },
        deleteProperty(target, property) {
            console.log(`[DELETE] ${name}.${String(property)}`);
            delete target[property];
            return true;
    	}
    });
}

const data = createLoggingProxy({ count: 0 }, 'Counter');
data.count;      // [GET] Counter.count = 0
data.count = 5;  // [SET] Counter.count = 5
delete data.count; // [DELETE] Counter.count
```

#### Practical Use Case: Default Values
```
function withDefaults(target, defaults) {
    return new Proxy(target, {
        get(target, property) {
            if (property in target) {
                return target[property];
            }
            return defaults[property];
        }
    });
}

const config = withDefaults(
    { theme: 'dark' },
    { theme: 'light', language: 'en', debugMode: false }
);

console.log(config.theme);     // 'dark' (from target)
console.log(config.language);  // 'en' (from defaults)
console.log(config.debugMode); // false (from defaults)
```

#### Practical Use Case: Observable/Reactive Objects
```
function createObservable(target, callback) {
    return new Proxy(target, {
        set(target, property, value) {
        const oldValue = target[property];
            target[property] = value;
            callback(property, value, oldValue);
            return true;
        }
    });
}

const state = createObservable({ count: 0 }, (prop, newVal, oldVal) => {
    console.log(`${prop} changed from ${oldVal} to ${newVal}`);
    // Update UI, trigger side effects, etc.
});

state.count = 1; // "count changed from 0 to 1"
state.count = 2; // "count changed from 1 to 2"
```
#### Practical Use Case: API Mocking
```
function createApiMock(mockData) {
    return new Proxy({}, {
        get(target, endpoint) {
            return async function(params) {
                // Simulate network delay
                await new Promise(resolve => setTimeout(resolve, 100));
                    
                if (mockData[endpoint]) {
                    return mockData[endpoint](params);
                }
                throw new Error(`No mock defined for ${endpoint}`);
            };
        }
    });
}

const mockApi = createApiMock({
    getUser: (id) => ({ id, name: 'Mock User', email: 'mock@test.com' }),
    getProducts: () => [{ id: 1, name: 'Product 1' }, { id: 2, name: 'Product 2' }]
});

// Usage
const user = await mockApi.getUser(123);
const products = await mockApi.getProducts();
```

#### Function Proxy with Apply Trap
```
function createTrackedFunction(fn, name) {
    return new Proxy(fn, {
        apply(target, thisArg, args) {
            console.log(`Calling ${name} with args:`, args);
            const start = performance.now();
                
            const result = target.apply(thisArg, args);
                
            const duration = performance.now() - start;
            console.log(`${name} completed in ${duration.toFixed(2)}ms`);
                
            return result;
        }
    });
}

const trackedSort = createTrackedFunction(
       (arr) => [...arr].sort((a, b) => a - b),
    'sort'
);

trackedSort([3, 1, 4, 1, 5, 9, 2, 6]);
// Calling sort with args: [[3, 1, 4, 1, 5, 9, 2, 6]]
// sort completed in 0.15ms
```

#### Revocable Proxies
Create proxies that can be disabled:
```
const { proxy, revoke } = Proxy.revocable(
    { secret: 'confidential' },
    {
        get(target, prop) {
        	return target[prop];
        }
    }
);

console.log(proxy.secret); // 'confidential'

revoke(); // Disable the proxy

console.log(proxy.secret); // TypeError: Cannot perform 'get' on a proxy that has been revoked
```
#### Performance Considerations
Proxies add overhead to operations. Avoid using them in performance-critical hot paths:
```
// Performance comparison
const regularObject = { value: 1 };
const proxiedObject = new Proxy({ value: 1 }, {
    get(target, prop) { return target[prop]; }
});

console.time('Regular object');
for (let i = 0; i < 10000000; i++) {
    regularObj]ect.value;
}
console.timeEnd('Regular object'); // ~15ms

console.time('Proxied object');
for (let i = 0; i < 10000000; i++) {
    proxiedObject.value;
}
console.timeEnd('Proxied object'); // ~150ms (10x slower)
```

#### Proxy vs Object.defineProperty

|Feature|Proxy|Object.defineProperty|
|-|-|-|
|Intercept all properties|Yes|No (per property)|
|Intercept new properties|Yes|No|
|Intercept delete|Yes|No|
|Intercept function calls|Yes|No|
|Performance|Slower|Faster|
