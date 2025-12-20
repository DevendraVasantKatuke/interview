You must enable strict mode in your tsconfig.json. This is a best practice for all TypeScript projects.
```
// tsconfig.json
{
  	"compilerOptions": {
    	"strict": true
	}
}
```
```
const sum = (a: number, b: number): number => a + b;
```

```
const greaterThan = (n: number) => {
  return (x: number) => x > n;
};

const greaterThanTwo = greaterThan(10);
```

```
type MyFunc<T> = (s: T) => (c: number) => number;

const genericFunc: MyFunc<number> = (n: number) => (c: number) => n / c;
```

#### Function Composition

```
// const result = firstFunction(secondFunction(thirdFunction(input)));

const sum = (n: number) => n + 10;
const double = (n: number) => n * 2;
const divide = (n: number) => n / 2;

const combine = (result, nextFun) => nextFun(result);

const pipe = (...fns) => x => fns.reduce(combine, x);

const result = pipe(sum, double, divide)(10);
```

```
let age?: number // optional prop
let makeNoise: () => void; // "void" because it doesn't return anything
let age: number | string; //age can either be a number or a string
let bestFriend: [string, number]; //the array takes two elements of type string and number, respectively.
```

```
//sampleStateTwo is a string or number
const [sampleStateTwo, setSampleStateTwo] = useState<string | number>("");
//sampleStateThree is an array of string
const [sampleStateThree, setSampleStateThree] = useState<string[]>([""]);
```

```
const handleClick = (event: MouseEvent) => {
    event.preventDefault();
    console.log(event); //logs the event object to the console
};

<button onClick={handleClick}>Click!!</button>
```

```
const divRef = useRef < HTMLDivElement > null;

//divRef.current contains a reference to the div tag rendered below
return <div ref={divRef}>...other nested elements</div>;
```

## A React ToDo example

```
import React, { useState, useRef, FormEvent, useEffect } from "react";
import { TodoComponent } from './components/Todo'
import "./App.css";

/*define the type for a Todo Object*/
export type Todo = {
  id: number;
  todo: string;
  isDone: boolean;
};

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [todo, setTodo] = useState<string>("")
  const inputRef = useRef<HTMLInputElement>(null);
  //effect to focus on the input field on load
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  //add a single todo to the todos array
  const handleAdd = (event: FormEvent) => {
    event.preventDefault();
    if (inputRef.current?.value.length === 0) return;
    setTodos((prevTodos) => [
     ...prevTodos,
       {
        id: Date.now(),
        todo: `${inputRef.current?.value}`,
        isDone: false,
      },
    ]);
    setTodo("")
  };

  //delete todo with a given id from the array
  const deleteTodo = (id: number) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  //toggle the isDone property of a given todo
  const toggleDone = (id: number) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
      )
    );
  };

  return (
     <div className="App">
      <h1>React-TypeScript To-do list</h1>
      <form onSubmit={handleAdd}>
        <input type="text" ref={inputRef} onChange={(e) => setTodo(e.target.value)} value={todo} />
        <button type="submit">Add New</button>
      </form>
      <ul className="todos">
        {todos.map((todo, key) => (
          <TodoComponent
            key={key}
            id={todo.id}
            todo={todo.todo}
            isDone={todo.isDone}
            deleteTodo={deleteTodo}
            toggleDone={toggleDone}
          />
        ))}
      </ul>
    </div>
  );
}

export default App;
```

TodoComponent.tsx

```
import React from "react";
import { Todo } from "../App";

/* create the prop types by merging the Todo types and other expected props from the App component */
type TodoProps = Todo & {
  deleteTodo: (id: number) => void,
  toggleDone: (id: number) => void,
};

//define the Todo Component
export const TodoComponent = ({
  id,
  todo,
  isDone,
  deleteTodo,
  toggleDone,
}: TodoProps) => {
  return (
    <li
      className={isDone ? "todo done" : "todo"}
      onClick={() => toggleDone(id)}
    >
      <div>
        <p>{todo}</p>
      </div>
      <button onClick={() => deleteTodo(id)}>delete</button>
    </li>
  );
};
```
