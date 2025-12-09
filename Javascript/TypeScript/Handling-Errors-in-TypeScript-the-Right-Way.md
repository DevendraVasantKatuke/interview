### Challenge 1: TypeScript’s error type
```
try {
  throw new Error('oh no!')
} catch (error) {
  console.dir(error)
}
```
```
try {
  throw new Error('oh no!')
} catch (error) {
  console.log((error as Error).message)
}ttt
```
```
try {
  throw undefined
} catch (error) {
  console.log((error as Error).message)
}
```
> Uncaught TypeError: Cannot read properties of undefined (reading 'message') at <anonymous>:4:20

```
try {
  throw undefined
} catch (error) {
  console.log((error as Error).message)
} finally {
  console.log('this will log');
}
console.log('code here is unreachable because "catch" threw a TypeError')
```
try {
throw false
} catch (error) {
console.log((error as Error).message)
}
The primary distinction here is that, rather than throwing a TypeError, this will simply return undefined. While this is less disruptive since it won’t directly crash your application, it can introduce other issues, such as displaying undefined in your logs. Moreover, depending on how you use the undefined value, it could indirectly lead to application crashes. Consider the following example:

```
try {
  throw false
} catch (error) {
  console.log((error as Error).message.trim())
}
```

Here, invoking .trim() on undefined will trigger a TypeError, potentially crashing your application.

In essence, TypeScript aims to safeguard us by designating the type of catchables as unknown. This approach places the onus on developers to determine the correct type of the thrown value, helping to prevent runtime issues.

You could always safeguard your code by using optional chaining operators (?.) as shown below:

```
try {
  throw undefined
} catch (error) {
  console.log((error as Error)?.message?.trim?.())
}
```

While this approach can shield your code, it employs two TypeScript features that can complicate code maintenance:

- Type casting undermines TypeScript’s safeguards, ensuring that variables adhere to their specified types.
- Utilizing optional chaining operators on a non-optional type won’t raise any errors if someone omits them, given the type mismatch.

A preferable approach would be to leverage TypeScript’s type guards. Type guards are essentially functions that ensure a specific value matches a given type, confirming it’s safe to use as intended. Here’s an example of a type guard to verify if the caught variable is of type Error:

```
/**
 * Type guard to check if an `unknown` value is an `Error` object.
 *
 * @param value - The value to check.
 *
 * @returns `true` if the value is an `Error` object, otherwise `false`.
 */
export const isError = (value: unknown): value is Error =>
  !!value &&
  typeof value === 'object' &&
  'message' in value &&
  typeof value.message === 'string' &&
  'stack' in value &&
  typeof value.stack === 'string'
```

This type guard is straightforward. It first ensures that the value is not falsy, which means it won’t be undefined or null. It then checks if it’s an object with the expected attributes.

This type guard can be reused anywhere in the code to verify if an object is an Error. Here’s an example of its application:

```
const logError = (message: string, error: unknown): void => {
  if (isError(error)) {
    console.log(message, error.stack)
  } else {
    try {
      console.log(
        new Error(
          `Unexpected value thrown: ${
            typeof error === 'object' ? JSON.stringify(error) : String(error)
          }`
        ).stack
      )
    } catch {
      console.log(
        message,
        new Error(`Unexpected value thrown: non-stringifiable object`).stack
      )
    }
  }
}

try {
  const circularObject = { self: {} }
  circularObject.self = circularObject
  throw circularObject
} catch (error) {
  logError('Error while throwing a circular object:', error)
}
```

By creating a logError function that leverages the isError type guard, we can safely log standard errors as well as any other thrown values. This can be particularly useful for troubleshooting unexpected issues. However, we need to be cautious, as JSON.stringify can also throw errors. By encapsulating it within its own try/catch block, we aim to provide more detailed information for objects, rather than just logging their string representation, [object Object].

Furthermore, we can retrieve the stack trace leading up to the point where the new Error object was instantiated. This will include the location where the original value was thrown. While this method doesn’t provide a direct stack trace from the thrown values, it offers a trace from the point immediately after the throw, which should be adequate for tracing back to the problem’s origin.

### Challenge 2: Variable scoping

Scoping is likely one of the most common challenges in error handling, applicable to both JavaScript and TypeScript. Consider this example:

```
try {
  const fileContent = fs.readFileSync(filePath, 'utf8')
} catch {
  console.error(`Unable to load file`)
  return
}

console.log(fileContent)
```

In this case, because fileContent was defined inside the try block, it’s not accessible outside of it. To address this, you might be tempted to define the variable outside the try block:

```
let fileContent

try {
  fileContent = fs.readFileSync(filePath, 'utf8')
} catch {
  console.error(`Unable to load file`)
  return
}
console.log(fileContent)
```

This approach is less than ideal. By using let instead of const, you’re making the variable mutable, which can introduce potential bugs. Additionally, it makes the code harder to read.

One way to circumvent this issue is to wrap the try/catch block in a function:

```
const fileContent = (() => {
  try {
    return fs.readFileSync(filePath, 'utf8')
  } catch {
    console.error(`Unable to load file`)
    return
  }
})()

if (!fileContent) {
  return
}

console.log(fileContent)
```

While this approach addresses the mutability problem, it does make the code more complex. This issue could potentially be addressed by creating our own reusable wrapper function. However, before doing so, let’s review the last challenge to ensure we have a comprehensive understanding of all the problems.

### Challenge 3: Nesting

Here’s an example demonstrating how we would use the new logError function in a scenario where multiple errors could be thrown:

```
export const doStuff = async (): Promise<void> => {
  try {
    const fetchDataResponse = await fetch('https://api.example.com/fetchData')
    const fetchDataText = await fetchDataResponse.text()
    if (!fetchDataResponse.ok) {
      throw new Error(
        `Unexpected response while fetching data. Status: ${fetchDataResponse.status} | Status text: ${fetchDataResponse.statusText} | Body: ${fetchDataText}`
      )
    }
    let fetchData
    try {
      fetchData = JSON.parse(fetchDataText) as unknown
    } catch {
      throw new Error(`Failed to parse fetched data response as JSON: ${fetchDataText}`)
    }
    if (
      !fetchData ||
      typeof fetchData !== 'object' ||
      !('data' in fetchData) ||
      !fetchData.data
    ) {
      throw new Error(
        `Fetched data is not in the expected format. Body: ${fetchDataText}`
      )
    }
    const storeDataResponse = await fetch('https://api.example.com/storeData', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(fetchData),
    })
    const storeDataText = await storeDataResponse.text()
    if (!storeDataResponse.ok) {
      throw new Error(
        `Unexpected response while storing data. Status: ${storeDataResponse.status} | Status text: ${storeDataResponse.statusText} | Body: ${storeDataText}`
      )
    }
  } catch (error) {
    logError('An error occurred:', error)
  }
}
```

You might observe that we’re invoking the .text() API instead of .json(). This choice stems from the behavior of fetch: you can only call one of these two methods. As we aim to display the body content if the JSON conversion fails, we first call .text() and then manually revert to JSON, ensuring we catch any errors in the process. To avoid having cryptic errors like:

> Uncaught SyntaxError: Expected property name or '}' in JSON at position 42

While the details provided by the error will make this code easier to debug, its limited readability can make maintenance challenging. The nesting induced by the try/catch blocks increases the cognitive load when reading the function. However, there’s a way to simplify the code, as shown below:

```
export const doStuffV2 = async (): Promise<void> => {
  try {
    const fetchDataResponse = await fetch('https://api.example.com/fetchData')
    const fetchData = (await fetchDataResponse.json()) as unknown
    if (
      !fetchData ||
      typeof fetchData !== 'object' ||
      !('data' in fetchData) ||
      !fetchData.data
    ) {
      throw new Error('Fetched data is not in the expected format.')
    }
    const storeDataResponse = await fetch('https://api.example.com/storeData', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(fetchData),
    })
    if (!storeDataResponse.ok) {
      throw new Error(`Error storing data: ${storeDataResponse.statusText}`)
    }
  } catch (error) {
    logError('An error occurred:', error)
  }
}
```

This refactoring fixed the nesting problem but it introduced a new issue: a lack of granularity in error reporting. By removing checks, we become more reliant on the error message itself to understand issues. As we’ve seen from some of the JSON.parse errors, this might not always provide the best clarity.

Given all the challenges we’ve discussed, is there an optimal approach to handle errors effectively?

### The right way

Ok, so now that we’ve highlighted some of the challenges surrounding typings and the use of traditional try/catch blocks, the benefits of adopting a different approach become clearer. This suggests that we should seek a superior method than the conventional try/catch blocks for error handling. By harnessing the capabilities of TypeScript, we can effortlessly craft a wrapper function for this purpose.

The initial step involves determining how we wish to normalize the errors. Here’s one approach:

```
/** An `Error` object to safely handle `unknown` values being thrown. */
export class NormalizedError extends Error {
  /** The error's stack or a fallback to the `message` if the stack is unavailable. */
  stack: string = ''
  /** The original value that was thrown. */
  originalValue: unknown
  /**
   * Initializes a new instance of the `NormalizedError` class.
   *
   * @param error - An `Error` object.
   * @param originalValue - The original value that was thrown.
   */
  constructor(error: Error, originalValue?: unknown) {
    super(error.message)
    this.stack = error.stack ?? this.message
    this.originalValue = originalValue ?? error
    // Set the prototype explicitly, for `instanceof` to work correctly when transpiled to ES5.
    Object.setPrototypeOf(this, NormalizedError.prototype)
  }
}
```

The primary advantage of extending the Error object is that it behaves like a standard error. Creating a custom error object from scratch might lead to complications, especially when using the instanceof operator to check its type. This is why we set the prototype explicitly, ensuring that instanceof works correctly, especially when the code is transpiled to ES5.

Additionally, all the prototype functions from Error are available on the NormalizedError objects. The constructor’s design also simplifies the creation of new NormalizedError objects by requiring the first argument to be an actual Error. Here are the benefits of NormalizedError:

- It will always be a valid error since the constructor mandates an Error as its first argument.
- A new property, originalValue, has been added. This allows us to retrieve the original value that was thrown, which can be useful for extracting additional information from the error or during debugging.
- stack will never be undefined. In many cases, it’s more beneficial to log the stack property since it contains more information than the message property. However, TypeScript defines its type as string | undefined, primarily due to cross-environment compatibility (often observed in legacy environments). By overriding the type and guaranteeing that it will always be a string, its use is simplified.

Now that we’ve defined how we want to represent normalized errors, we need a function to easily convert unknown thrown values into a normalized error:

```
/**
 * Converts an `unknown` value that was thrown into a `NormalizedError` object.
 *
 * @param value - An `unknown` value.
 *
 * @returns A `NormalizedError` object.
 */
export const toNormalizedError = <E>(
  value: E extends NormalizedError ? never : E
): NormalizedError => {
  if (isError(value)) {
    return new NormalizedError(value)
  } else {
    try {
      return new NormalizedError(
        new Error(
          `Unexpected value thrown: ${
            typeof value === 'object' ? JSON.stringify(value) : String(value)
          }`
        ),
        value
      )
    } catch {
      return new NormalizedError(
        new Error(`Unexpected value thrown: non-stringifiable object`),
        value
      )
    }
  }
}
```

By using this approach, we no longer have to handle errors of type unknown. All errors will be proper Error objects, equipping us with as much information as possible and eliminating the risk of unexpected error values.

Note that E extends NormalizedError ? never is optional. However, it can help prevent mistakenly passing a NormalizedError object as an argument.

To safely use NormalizedError object, we also need to have a type guard function:

```
/**
 * Type guard to check if an `unknown` value is a `NormalizedError` object.
 *
 * @param value - The value to check.
 *
 * @returns `true` if the value is a `NormalizedError` object, otherwise `false`.
 */
export const isNormalizedError = (value: unknown): value is NormalizedError =>
  isError(value) && 'originalValue' in value && value.stack !== undefined
```

Now, we need to craft a function that will help us eliminate the use of try/catch blocks. Another crucial aspect to consider about errors is their occurrence, which can be either synchronous or asynchronous. Ideally, we’d want a single function capable of handling both scenarios. Let’s begin by creating a type guard to identify promises:

```
/**
 * Type guard to check if an `unknown` function call result is a `Promise`.
 *
 * @param result - The function call result to check.
 *
 * @returns `true` if the value is a `Promise`, otherwise `false`.
 */
export const isPromise = (result: unknown): result is Promise<unknown> =>
  !!result &&
  typeof result === 'object' &&
  'then' in result &&
  typeof result.then === 'function' &&
  'catch' in result &&
  typeof result.catch === 'function'
```

With the capability to safely identify promises in place, we can proceed to implement our new noThrow function:

```
type NoThrowResult<A> = A extends Promise<infer U>
  ? Promise<U | NormalizedError>
  : A | NormalizedError

/**
 * Perform an action without throwing errors.
 *
 * Try/catch blocks can be hard to read and can cause scoping issues. This wrapper
 * avoids those pitfalls by returning the appropriate result based on whether the function
 * executed successfully or not.
 *
 * @param action - The action to perform.
 *
 * @returns The result of the action when successful, or a `NormalizedError` object otherwise.
 */
export const noThrow = <A>(action: () => A): NoThrowResult<A> => {
  try {
    const result = action()
    if (isPromise(result)) {
      return result.catch(toNormalizedError) as NoThrowResult<A>
    }
    return result as NoThrowResult<A>
  } catch (error) {
    return toNormalizedError(error) as NoThrowResult<A>
  }
}
```

By harnessing the capabilities of TypeScript, we can dynamically support both asynchronous and synchronous function calls while maintaining accurate typing. This enables us to utilize a single utility function to manage all errors.

Also, as mentioned earlier, this can be especially useful to address scoping issues. Instead of wrapping a try/catch block in its own anonymous self-invoking function, we can simply use noThrow, making the code much more readable.

Let’s explore how we can use this approach to refactor the code we developed earlier:

```
export const doStuffV3 = async (): Promise<void> => {
  const fetchDataResponse = await fetch('https://api.example.com/fetchData').catch(toNormalizedError)
  if (isNormalizedError(fetchDataResponse)) {
    return console.log('Error fetching data:', fetchDataResponse.stack)
  }
  const fetchDataText = await fetchDataResponse.text()
  if (!fetchDataResponse.ok) {
    return console.log(
      `Unexpected response while fetching data. Status: ${fetchDataResponse.status} | Status text: ${fetchDataResponse.statusText} | Body: ${fetchDataText}`
    )
  }
  const fetchData = noThrow(() => JSON.parse(fetchDataText) as unknown)
  if (isNormalizedError(fetchData)) {
    return console.log(
      `Failed to parse fetched data response as JSON: ${fetchDataText}`,
      fetchData.stack
    )
  }
  if (
    !fetchData ||
    typeof fetchData !== 'object' ||
    !('data' in fetchData) ||
    !fetchData.data
  ) {
    return console.log(
      `Fetched data is not in the expected format. Body: ${fetchDataText}`,
      toNormalizedError(new Error('Invalid data format')).stack
    )
  }
  const storeDataResponse = await fetch('https://api.example.com/storeData', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(fetchData),
    }).catch(toNormalizedError)
  if (isNormalizedError(storeDataResponse)) {
    return console.log('Error storing data:', storeDataResponse.stack)
  }
  const storeDataText = await storeDataResponse.text()
  if (!storeDataResponse.ok) {
    return console.log(
      `Unexpected response while storing data. Status: ${storeDataResponse.status} | Status text: ${storeDataResponse.statusText} | Body: ${storeDataText}`
    )
  }
}
```

There we have it! We’ve addressed all the challenges:

- Types are now safe to use, so we no longer need logError and can log errors directly using console.log.
- Scoping is controlled by using noThrow, as demonstrated when defining the const fetchData which previously had to be a let fetchData.
- Nesting has been reduced to a single level, making the code easier to maintain.

You might have also noticed that we didn’t use noThrow on fetch. Instead, we used toNormalizedError, which has more or less the same effect as noThrow but with less nesting. Because of how we built the noThrow function, you could use it on fetch the same way we used it for sync functions:

```
const fetchDataResponse = await noThrow(() =>
    fetch('https://api.example.com/fetchData')
  )
```

I personally prefer the approach that we took in our example, and I would rather use noThrow in an async context when the code block contains more than a single function. toNormalizedError also doesn’t use a try/catch block under the hood which is better for performance.

### Performance Considerations

While the noThrow utility function offers a streamlined approach to error handling, it’s essential to understand that it still leverages try/catch blocks under the hood. This means that any performance implications associated with try/catch will still be present when using noThrow.

In performance-critical sections of your code, or “hot code paths,” it’s always a good idea to be judicious about introducing any abstractions, including error handling utilities. While modern JavaScript engines have made significant strides in optimizing try/catch performance, there can still be overhead, especially when used excessively.

Recommendations:

- Be Mindful in Hot Paths: If a particular section of your code is executed very frequently, consider the implications of any added abstractions, including error handling.
- Profile When in Doubt: If you’re unsure about the performance impact of your error handling strategy, use profiling tools to measure and compare execution times in your specific environment.
- Stay Informed: As always, keep abreast of the latest advancements in JavaScript engines and TypeScript. Performance characteristics can evolve, and what’s true today might change tomorrow.

In essence, while the noThrow function provides a more elegant way to handle errors in TypeScript, it’s essential to be aware of the underlying mechanisms and their potential implications.

### A Shift in Error Handling

The combination of the noThrow utility function and the NormalizedError class presents a novel approach to error handling in TypeScript, diverging from the traditional try/catch mechanism native to JavaScript. While this duo offers a streamlined and type-safe error handling experience, developers should be aware of the implications of this paradigm shift:

- Departure from the Standard: Using noThrow and NormalizedError is a significant departure from conventional JavaScript error handling. Those accustomed to the traditional try/catch might need to recalibrate their understanding when working within this new framework.
- Consistency is Crucial: If you opt to adopt the noThrow and NormalizedError approach in your codebase, it’s essential to apply it consistently. Intermingling this method with traditional try/catch blocks can introduce confusion and inconsistency, potentially complicating maintenance and debugging.
- Education and Onboarding: Given that neither noThrow nor NormalizedError are standard features in JavaScript or TypeScript, there’s a responsibility to ensure that all team members are well-versed in their usage and behavior. This might entail creating dedicated documentation, examples, or even training sessions to ensure everyone is on the same page.

### Conclusion

In the ever-evolving landscape of software development, error handling remains a cornerstone of robust application design. As we’ve explored in this article, traditional methods like try/catch blocks, while effective, can sometimes lead to convoluted code structures, especially when combined with the dynamic nature of JavaScript and TypeScript. By embracing the capabilities of TypeScript, we’ve demonstrated a streamlined approach to error handling that not only simplifies our code but also enhances its readability and maintainability.

The introduction of the NormalizedError class and the noThrow utility function showcases the power of modern programming paradigms. These tools allow developers to handle both synchronous and asynchronous errors with grace, ensuring that applications remain resilient in the face of unexpected issues.

As developers, our primary goal is to create software that’s both functional and user-friendly. By adopting the techniques discussed in this article, we can ensure that our applications not only meet these criteria but also stand the test of time. Happy coding!
