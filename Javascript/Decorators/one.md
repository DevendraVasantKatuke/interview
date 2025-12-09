Decorators are a feature in TypeScript that allows you to add metadata and modify the behavior of classes, methods, properties, and parameters at compile time. Decorators are functions that are prefixed with the @ symbol.

Note: decorators are an experimental feature in TypeScript. To enable decorators in your TypeScript project, you must enable the "experimentalDecorators" compiler option in your tsconfig.json file.
```
// tsconfig.json
{
  "compilerOptions": {
    "experimentalDecorators": true,
    // other compiler options...
  }
}
```
Okay. Let’s see a simple example.
```
// 👇 uppercase decorator
function uppercase(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;

  descriptor.value = function (...args: any[]) {
    const result = originalMethod.apply(this, args);
    
    if (typeof result === "string") {
       return result.toUpperCase();
    }

    return result;
  };

  return descriptor;
}
```
```
class User {
  private name: string;

  constructor(name) {
    this.name = name;
  }
  
  // In this code, the uppercase decorator is applied to the getName method 
  // of the User class using the @uppercase syntax. 
  // This means that whenever the getName method is called, 
  // the uppercase decorator function will be invoked.

  // 👇 use like below
  @uppercase
  getName() {
    return this.name
  }
}

const user = new User("Arul Valan Anto");
console.log(user.getName());

// 🚀 output
// ARUL VALAN ANTO
```
This is the decorator function named uppercase. It takes three parameters:

- `target: any`: The target object or class on which the decorator is applied.
- `propertyKey: string`: The name of the property or method being decorated.
- `descriptor: PropertyDescriptor`: The property descriptor of the decorated property or method.

##### Use cases
- **Logging and debugging**: You can use decorators to add logging statements or debug information around methods or functions, helping you track the execution flow and inspect values during development.
- **Validation and data transformation**: Decorators can validate the input parameters of methods or ensure the correctness of data properties.
- **Authorization and access control**: Decorators can check user permissions or apply access control rules to methods or classes.
- **Dependency injection**: Decorators can be used in conjunction with dependency injection frameworks to automatically inject dependencies into classes. This practice is commonly observed in various places, notably within the Angular framework.
- **API documentation**: Decorators can be used for generating API documentation and configuring serialization/deserialization processes.

##### Example
Suppose you have a Node.js server application that handles various API routes, and you want to measure the execution time of certain methods to monitor performance. You can use decorators to create a reusable method timing decorator that logs the execution time of methods. Here’s an example implementation:
```
// 👇 Decorator to measure method execution time
function measureTime(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;

  descriptor.value = async function (...args: any[]) {
    const start = Date.now();
    const result = await originalMethod.apply(this, args);
    const end = Date.now();
    const executionTime = end - start;

    console.log(`${propertyKey} took ${executionTime}ms`);

    return result;
  };

  return descriptor;
}
```
```
class UserController {
  // 👇 Add metadata like this 
  @measureTime
  static async getUser(userId: string) {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    return { id: userId, name: 'John Doe' };
  }
}

// Express route handler
app.get('/users/:id', async (req, res) => {
  const userId = req.params.id;
  const user = await UserController.getUser(userId);
  res.json(user);
});
```