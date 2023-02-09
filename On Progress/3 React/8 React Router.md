// rewrite for react-router 6.x

```sh
$ npm install react-router-dom@6
$ yarn add react-router-dom@6
$ pnpm add react-router-dom@6
```
```js [3, 13-15]
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
```
Now you can use React Router anywhere in your app! For a simple example, open `src/App.js` and replace the default markup with some routes:
```js [2, 8-12]
import * as React from "react";
import { Routes, Route, Link } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <div className="App">
      <h1>Welcome to React Router!</h1>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="about" element={<About />} />
      </Routes>
    </div>
  );
}
```
## Configuring Routes
```jsx
import ReactDOM from "react-dom/client";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
// import your route components too

const root = ReactDOM.createRoot(
  document.getElementById("root")
);
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Home />} />
        <Route path="teams" element={<Teams />}>
          <Route path=":teamId" element={<Team />} />
          <Route path="new" element={<NewTeamForm />} />
          <Route index element={<LeagueStandings />} />
        </Route>
      </Route>
    </Routes>
  </BrowserRouter>
);
```
the URL `/teams/new` matches both of these route:

```jsx
<Route path="teams/:teamId" element={<Team />} />
<Route path="teams/new" element={<NewTeamForm />} />
```
But `teams/new` is a more specific match than `/teams/:teamId`, so `<NewTeamForm />` will render.
## Navigation

Use `Link` to let the user change the URL
```tsx
<Link to="/">Home</Link> |{" "}
```
or `useNavigate` to do it yourself (like after form submissions):
```tsx
import { useNavigate } from "react-router-dom";

function Invoices() {
  let navigate = useNavigate();
  return (
    <div>
      <NewInvoiceForm
        onSubmit={async (event) => {
          let newInvoice = await createInvoice(
            event.target
          );
          navigate(`/invoices/${newInvoice.id}`);
        }}
      />
    </div>
  );
}
```
## Reading URL Parameters
Use `:style` syntax in your route path and `useParams()` to read them:
```tsx
<Route path="invoices/:invoiceId" element={<Invoice />} />

function Invoice() {
  let params = useParams();
  return <h1>Invoice {params.invoiceId}</h1>;
}
```
```tsx
function Invoice() {
  let { invoiceId } = useParams();
  let invoice = useFakeFetch(`/api/invoices/${invoiceId}`);
  return invoice ? (
    <div>
      <h1>{invoice.customerName}</h1>
    </div>
  ) : (
    <Loading />
  );
}
```
## Nested Routes
Routes can be nested inside one another, and their paths will nest too (child inheriting the parent).
```tsx
<Route path="invoices" element={<Invoices />}>
  <Route path=":invoiceId" element={<Invoice />} />
  <Route path="sent" element={<SentInvoices />} />
</Route>
```
This route config defined three route paths:
- `"/invoices"`
- `"/invoices/sent"`
- `"/invoices/:invoiceId"`

When the URL is `"/invoices/sent"` the component tree will be:

```tsx
<App>
  <Invoices>
    <SentInvoices />
  </Invoices>
</App>
```

When the URL is `"/invoices/123"`, the component tree will be:

```tsx
<App>
  <Invoices>
    <Invoice />
  </Invoices>
</App>
```

Notice the inner component that changed with the URL (`<SentInvoices>` and `<Invoice>`). The parent route (`<Invoices>`) is responsible for making sure the matching child route is rendered with [`<Outlet>`](../api.md#outlet). Here's the full example:

```tsx [18]
import { Routes, Route, Outlet } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="invoices" element={<Invoices />}>
        <Route path=":invoiceId" element={<Invoice />} />
        <Route path="sent" element={<SentInvoices />} />
      </Route>
    </Routes>
  );
}

function Invoices() {
  return (
    <div>
      <h1>Invoices</h1>
      <Outlet />
    </div>
  );
}

function Invoice() {
  let { invoiceId } = useParams();
  return <h1>Invoice {invoiceId}</h1>;
}

function SentInvoices() {
  return <h1>Sent Invoices</h1>;
}
```
## Index Routes

Index routes can be thought of as "default child routes". When a parent route has multiple children, but the URL is just at the parent's path, you probably want to render something into the outlet.

Consider this example:

```tsx
function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="invoices" element={<Invoices />} />
        <Route path="activity" element={<Activity />} />
      </Route>
    </Routes>
  );
}

function Layout() {
  return (
    <div>
      <GlobalNav />
      <main>
        <Outlet />
      </main>
    </div>
  );
}
```

This page looks great at "/invoices" and "/activity", but at "/" it's just a blank page in `<main>` because there is no child route to render there. For this we can add an index route:

```tsx [5]
function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Activity />} />
        <Route path="invoices" element={<Invoices />} />
        <Route path="activity" element={<Activity />} />
      </Route>
    </Routes>
  );
}
```

Now at "/" the `<Activity>` element will render inside the outlet.

You can have an index route at any level of the route hierarchy that will render when the parent matches but none of its other children do.

```tsx
function App() {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="dashboard" element={<Dashboard />}>
        <Route index element={<DashboardHome />} />
        <Route path="invoices" element={<DashboardInvoices />} />
      </Route>
    </Routes>
  );
}
```

## Relative Links

Relative `<Link to>` values (that do not begin with a `/`) are relative to the path of the route that rendered them. The two links below will link to `/dashboard/invoices` and `/dashboard/team` because they're rendered inside of `<Dashboard>`. This is really nice when you change a parent's URL or re-arrange your components because all of your links automatically update.

```tsx
import {
  Routes,
  Route,
  Link,
  Outlet,
} from "react-router-dom";

function Home() {
  return <h1>Home</h1>;
}

function Dashboard() {
  return (
    <div>
      <h1>Dashboard</h1>
      <nav>
        <Link to="invoices">Invoices</Link>{" "}
        <Link to="team">Team</Link>
      </nav>
      <hr />
      <Outlet />
    </div>
  );
}

function Invoices() {
  return <h1>Invoices</h1>;
}

function Team() {
  return <h1>Team</h1>;
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="dashboard" element={<Dashboard />}>
        <Route path="invoices" element={<Invoices />} />
        <Route path="team" element={<Team />} />
      </Route>
    </Routes>
  );
}
```

## "Not Found" Routes

When no other route matches the URL, you can render a "not found" route using `path="*"`. This route will match any URL, but will have the weakest precedence so the router will only pick it if no other routes match.

```tsx
function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
```

## Multiple Sets of Routes

Although you should only ever have a single `<Router>` in an app, you may have as many [`<Routes>`](../api.md#routes) as you need, wherever you need them. Each `<Routes>` element operates independently of the others and picks a child route to render.

```tsx
function App() {
  return (
    <div>
      <Sidebar>
        <Routes>
          <Route path="/" element={<MainNav />} />
          <Route
            path="dashboard"
            element={<DashboardNav />}
          />
        </Routes>
      </Sidebar>

      <MainContent>
        <Routes>
          <Route path="/" element={<Home />}>
            <Route path="about" element={<About />} />
            <Route path="support" element={<Support />} />
          </Route>
          <Route path="dashboard" element={<Dashboard />}>
            <Route path="invoices" element={<Invoices />} />
            <Route path="team" element={<Team />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </MainContent>
    </div>
  );
}
```

## Descendant `<Routes>`

You can render [a `<Routes>` element][routes] anywhere you need one, including deep within the component tree of another `<Routes>`. These will work just the same as any other `<Routes>`, except they will automatically build on the path of the route that rendered them. If you do this, _make sure to put a \* at the end of the parent route's path_. Otherwise, the parent route won't match the URL when it is longer than the parent route's path, and your descendant `<Routes>` won't ever show up.

```tsx [5]
function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="dashboard/*" element={<Dashboard />} />
    </Routes>
  );
}

function Dashboard() {
  return (
    <div>
      <p>Look, more routes!</p>
      <Routes>
        <Route path="/" element={<DashboardGraphs />} />
        <Route path="invoices" element={<InvoiceList />} />
      </Routes>
    </div>
  );
}
```

And that's just about it! We haven't covered every API here, but these are definitely the most common ones you'll use. If you'd like to learn more, go ahead and follow [our tutorial][tutorial].

[tutorial]: ./tutorial
[concepts]: ./concepts
[routes]: ../components/routes

# Tutorial

## Introduction

[Check out the completed version of the app here][stackblitz-app].

React Router is a fully-featured client and server-side routing library for React, a JavaScript library for building user interfaces. React Router runs anywhere React runs; on the web, on the server with node.js, and on React Native.

If you're just getting started with React generally, we recommend you follow [the excellent Getting Started guide][reactjs-getting-started] in the official docs. There is plenty of information there to get you up and running. React Router is compatible with React >= 16.8.

We'll keep this tutorial quick and to the point. By the end you'll know the APIs you deal with day-to-day with React Router. After that, you can dig into some of the other docs to get a deeper understanding.

While building a little bookkeeping app we'll cover:

- Configuring Routes
- Navigating with Link
- Creating Links with active styling
- Using Nested Routes for Layout
- Navigating programmatically
- Using URL params for data loading
- Using URL Search params
- Creating your own behaviors through composition
- Server Rendering

## Installation

### Recommended: StackBlitz

To do this tutorial you'll need a working React app. We recommend skipping bundlers and using [this demo on StackBlitz][stackblitz-template] to code along in your browser:

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)][stackblitz-template]

As you edit files, the tutorial will update live.

### Using a bundler

Feel free to use your bundler of choice like [Create React App][cra] or [Vite][vite].

```sh
# create react app
npx create-react-app router-tutorial

# vite
npm init vite@latest router-tutorial --template react
```

Then install React Router dependencies:

```sh
cd router-tutorial
npm install react-router-dom@6
```

Then edit your App.js to be pretty boring:

```tsx filename=src/App.js
export default function App() {
  return (
    <div>
      <h1>Bookkeeper!</h1>
    </div>
  );
}
```

Actually, that "!" doesn't look boring at all. This is pretty exciting. We sat on React Router v6 beta for over a year as we shifted gears with our business after a global pandemic. THIS IS THE MOST EXCITING THING WE'VE DONE IN A WHILE!

Finally, go make sure `index.js` or `main.jsx` (depending on the bundler you used) is actually boring:

```tsx filename=src/main.jsx
import ReactDOM from "react-dom/client";
import App from "./App";

const root = ReactDOM.createRoot(
  document.getElementById("root")
);
root.render(<App />);
```

Finally, start your app:

```sh
# probably this
npm start

# or this
npm run dev
```

## Connect the URL

First things first, we want to connect your app to the browser's URL: import `BrowserRouter` and render it around your whole app.

```tsx lines=[2,9-11] filename=src/main.jsx
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

const root = ReactDOM.createRoot(
  document.getElementById("root")
);
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
```

Nothing changes in your app, but now we're ready to start messing with the URL.

## Add Some Links

Open up `src/App.js`, import `Link` and add some global navigation. Side note: don't take the styling too seriously in this tutorial, we're just using inline styles for convenience, style your apps however you want.

```tsx lines=[1,7-15] filename=src/App.js
import { Link } from "react-router-dom";

export default function App() {
  return (
    <div>
      <h1>Bookkeeper</h1>
      <nav
        style={{
          borderBottom: "solid 1px",
          paddingBottom: "1rem",
        }}
      >
        <Link to="/invoices">Invoices</Link> |{" "}
        <Link to="/expenses">Expenses</Link>
      </nav>
    </div>
  );
}
```

Go ahead and click the links and the back/forward button (if you're using StackBlitz, you'll need to click the "Open in New Window" button in the inline-browser's toolbar). React Router is now controlling the URL!

We don't have any routes that render when the URL changes yet, but Link is changing the URL without causing a full page reload.

## Add Some Routes

Add a couple new files:

- `src/routes/invoices.jsx`
- `src/routes/expenses.jsx`

(The location of the files doesn't matter, but when you decide you'd like an automatic backend API, server rendering, code splitting bundler and more for this app, naming your files like this way makes it easy to port this app to our other project, [Remix][remix] 😉)

Now fill 'em up with some code:

```tsx filename=src/routes/expenses.jsx
export default function Expenses() {
  return (
    <main style={{ padding: "1rem 0" }}>
      <h2>Expenses</h2>
    </main>
  );
}
```

```tsx filename=src/routes/invoices.jsx
export default function Invoices() {
  return (
    <main style={{ padding: "1rem 0" }}>
      <h2>Invoices</h2>
    </main>
  );
}
```

Finally, let's teach React Router how to render our app at different URLs by creating our first "Route Config" inside of `main.jsx` or `index.js`.

```tsx lines=[2,4-5,8-9,15-21] filename=src/main.jsx
import ReactDOM from "react-dom/client";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import App from "./App";
import Expenses from "./routes/expenses";
import Invoices from "./routes/invoices";

const root = ReactDOM.createRoot(
  document.getElementById("root")
);
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="expenses" element={<Expenses />} />
      <Route path="invoices" element={<Invoices />} />
    </Routes>
  </BrowserRouter>
);
```

Notice at `"/"` it renders `<App>`. At `"/invoices"` it renders `<Invoices>`. Nice work!

<docs-info>Remember if you're using StackBlitz to click the "Open in New Window" button in the inline browser's toolbar to be able to click the back/forward buttons in your browser.</docs-info>

## Nested Routes

You may have noticed when clicking the links that the layout in `App` disappears. Repeating shared layouts is a pain in the neck. We've learned that most UI is a series of nested layouts that almost always map to segments of the URL so this idea is baked right in to React Router.

Let's get some automatic, persistent layout handling by doing just two things:

1. Nest the routes inside of the App route
2. Render an Outlet

First let's nest the routes. Right now the expenses and invoices routes are siblings to the app, we want to make them _children_ of the app route:

```jsx lines=[17-20] filename=src/main.jsx
import ReactDOM from "react-dom/client";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import App from "./App";
import Expenses from "./routes/expenses";
import Invoices from "./routes/invoices";

const root = ReactDOM.createRoot(
  document.getElementById("root")
);
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route path="expenses" element={<Expenses />} />
        <Route path="invoices" element={<Invoices />} />
      </Route>
    </Routes>
  </BrowserRouter>
);
```

When routes have children it does two things:

1. It nests the URLs (`"/" + "expenses"` and `"/" + "invoices"`)
2. It will nest the UI components for shared layout when the child route matches:

However, before (2) will work we need to render an `Outlet` in the `App.jsx` "parent" route.

```jsx lines=[1,16] filename=src/App.jsx
import { Outlet, Link } from "react-router-dom";

export default function App() {
  return (
    <div>
      <h1>Bookkeeper</h1>
      <nav
        style={{
          borderBottom: "solid 1px",
          paddingBottom: "1rem",
        }}
      >
        <Link to="/invoices">Invoices</Link> |{" "}
        <Link to="/expenses">Expenses</Link>
      </nav>
      <Outlet />
    </div>
  );
}
```

Now click around again. The parent route (`App.js`) persists while the `<Outlet>` swaps between the two child routes (`<Invoices>` and `<Expenses>`)!

As we'll see later, this works at _any level_ of the route hierarchy and is incredibly powerful.

## Listing the Invoices

Normally you'd be fetching data from a server somewhere, but for this tutorial let's hard code some fake stuff so we can focus on routing.

Make a file at `src/data.js` and copy/paste this in there:

```js filename=src/data.js
let invoices = [
  {
    name: "Santa Monica",
    number: 1995,
    amount: "$10,800",
    due: "12/05/1995",
  },
  {
    name: "Stankonia",
    number: 2000,
    amount: "$8,000",
    due: "10/31/2000",
  },
  {
    name: "Ocean Avenue",
    number: 2003,
    amount: "$9,500",
    due: "07/22/2003",
  },
  {
    name: "Tubthumper",
    number: 1997,
    amount: "$14,000",
    due: "09/01/1997",
  },
  {
    name: "Wide Open Spaces",
    number: 1998,
    amount: "$4,600",
    due: "01/27/1998",
  },
];

export function getInvoices() {
  return invoices;
}
```

Now we can use it in the invoices route. Let's also add a bit of styling to get a sidebar nav layout going on. Feel free to copy/paste all of this, but take special note of the `<Link>` elements `to` prop:

```js lines=[17] filename=src/routes/invoices.jsx
import { Link } from "react-router-dom";
import { getInvoices } from "../data";

export default function Invoices() {
  let invoices = getInvoices();
  return (
    <div style={{ display: "flex" }}>
      <nav
        style={{
          borderRight: "solid 1px",
          padding: "1rem",
        }}
      >
        {invoices.map((invoice) => (
          <Link
            style={{ display: "block", margin: "1rem 0" }}
            to={`/invoices/${invoice.number}`}
            key={invoice.number}
          >
            {invoice.name}
          </Link>
        ))}
      </nav>
    </div>
  );
}
```

Cool! Now click an invoice link and see what happens.

😨😨😨

## Adding a "No Match" Route

That didn't go as you might have expected. If you click those links the page goes blank! That's because none of the routes we've defined match a URL like the ones we're linking to: `"/invoices/123"`.

Before we move on, it's good practice to always handle this "no match" case. Go back to your route config and add this:

```js lines=[5-12] filename=src/main.jsx
<Routes>
  <Route path="/" element={<App />}>
    <Route path="expenses" element={<Expenses />} />
    <Route path="invoices" element={<Invoices />} />
    <Route
      path="*"
      element={
        <main style={{ padding: "1rem" }}>
          <p>There's nothing here!</p>
        </main>
      }
    />
  </Route>
</Routes>
```

The `"*"` has special meaning here. It will match only when no other routes do.

## Reading URL Params

Alright, back to the individual invoice URLs. Let's add a route for a specific invoice. We just visited some URLs like `"/invoices/1998"` and `"/invoices/2005"`, let's make a new component at `src/routes/invoice.jsx` to render at those URLs:

```js filename=src/routes/invoice.jsx
export default function Invoice() {
  return <h2>Invoice #???</h2>;
}
```

We'd like to render the invoice number instead of `"???"`. Normally in React you'd pass this as a prop: `<Invoice invoiceId="123" />`, but you don't control that information because it comes from the URL.

Let's define a route that will match these kinds of URLs and enable us to get the invoice number from it.

Create a new `<Route>` _inside_ of the "invoices" route like this:

```js lines=[4-6] filename=src/main.jsx
<Routes>
  <Route path="/" element={<App />}>
    <Route path="expenses" element={<Expenses />} />
    <Route path="invoices" element={<Invoices />}>
      <Route path=":invoiceId" element={<Invoice />} />
    </Route>
    <Route
      path="*"
      element={
        <main style={{ padding: "1rem" }}>
          <p>There's nothing here!</p>
        </main>
      }
    />
  </Route>
</Routes>
```

A couple things to note:

- We just created a route that matches urls like "/invoices/2005" and "/invoices/1998". The `:invoiceId` part of the path is a "URL param", meaning it can match any value as long as the pattern is the same.
- The `<Route>` adds a second layer of route nesting when it matches: `<App><Invoices><Invoice /></Invoices></App>`. Because the `<Route>` is nested the UI will be nested too.

Alright, now go click a link to an invoice, note that the URL changes but the new invoice component doesn't show up yet. Do you know why?

That's right! We need to add an outlet to the parent layout route (we're really proud of you).

```tsx lines=[1,24] filename=src/routes/invoices.jsx
import { Link, Outlet } from "react-router-dom";
import { getInvoices } from "../data";

export default function Invoices() {
  let invoices = getInvoices();
  return (
    <div style={{ display: "flex" }}>
      <nav
        style={{
          borderRight: "solid 1px",
          padding: "1rem",
        }}
      >
        {invoices.map((invoice) => (
          <Link
            style={{ display: "block", margin: "1rem 0" }}
            to={`/invoices/${invoice.number}`}
            key={invoice.number}
          >
            {invoice.name}
          </Link>
        ))}
      </nav>
      <Outlet />
    </div>
  );
}
```

Okay, let's close the circle here. Open up the invoice component again and let's get the `:invoiceId` param from the URL:

```ts lines=[1,4] filename=src/routes/invoice.jsx
import { useParams } from "react-router-dom";

export default function Invoice() {
  let params = useParams();
  return <h2>Invoice: {params.invoiceId}</h2>;
}
```

Note that the key of the param on the `params` object is the same as the dynamic segment in the route path:

```
:invoiceId -> params.invoiceId
```

Let's use that information to build up a more interesting invoice page. Open up `src/data.js` and add a new function to lookup invoices by their number:

```js filename=src/data.js lines=[7-11]
// ...

export function getInvoices() {
  return invoices;
}

export function getInvoice(number) {
  return invoices.find(
    (invoice) => invoice.number === number
  );
}
```

And now back in `invoice.jsx` we use the param to look up an invoice and display more information:

```js filename=routes/invoice.jsx lines=[2,6]
import { useParams } from "react-router-dom";
import { getInvoice } from "../data";

export default function Invoice() {
  let params = useParams();
  let invoice = getInvoice(parseInt(params.invoiceId, 10));
  return (
    <main style={{ padding: "1rem" }}>
      <h2>Total Due: {invoice.amount}</h2>
      <p>
        {invoice.name}: {invoice.number}
      </p>
      <p>Due Date: {invoice.due}</p>
    </main>
  );
}
```

Note that we used `parseInt` around the param. It's very common for your data lookups to use a `number` type, but URL params are always `string`.

## Index Routes

Index routes are possibly the most difficult concept in React Router for people to understand. So if you've struggled before, we hope this can clarify it for you.

Right now you're probably looking at one of the invoices. Click on the "Invoices" link in the global nav of your app. Notice that the main content area goes blank! We can fix this with an "index" route.

```jsx filename=src/main.jsx lines=[5-12]
<Routes>
  <Route path="/" element={<App />}>
    <Route path="expenses" element={<Expenses />} />
    <Route path="invoices" element={<Invoices />}>
      <Route
        index
        element={
          <main style={{ padding: "1rem" }}>
            <p>Select an invoice</p>
          </main>
        }
      />
      <Route path=":invoiceId" element={<Invoice />} />
    </Route>
    <Route
      path="*"
      element={
        <main style={{ padding: "1rem" }}>
          <p>There's nothing here!</p>
        </main>
      }
    />
  </Route>
</Routes>
```

Sweet! Now the index route fills the empty space!

Notice it has the `index` prop instead of a `path`. That's because the index route shares the path of the parent. That's the whole point--it doesn't have a path.

Maybe you're still scratching your head. There are a few ways we try to answer the question "what is an index route?". Hopefully one of these sticks for you:

- Index routes render in the parent routes outlet at the parent route's path.
- Index routes match when a parent route matches but none of the other children match.
- Index routes are the default child route for a parent route.
- Index routes render when the user hasn't clicked one of the items in a navigation list yet.

## Active Links

It's very common, especially in navigation lists, to display the link as the active link the user is looking at. Let's add this treatment to our invoices list by swapping out `Link` for `NavLink`.

```jsx lines=[1,15-27] filename=src/routes/invoices.jsx
import { NavLink, Outlet } from "react-router-dom";
import { getInvoices } from "../data";

export default function Invoices() {
  let invoices = getInvoices();
  return (
    <div style={{ display: "flex" }}>
      <nav
        style={{
          borderRight: "solid 1px",
          padding: "1rem",
        }}
      >
        {invoices.map((invoice) => (
          <NavLink
            style={({ isActive }) => {
              return {
                display: "block",
                margin: "1rem 0",
                color: isActive ? "red" : "",
              };
            }}
            to={`/invoices/${invoice.number}`}
            key={invoice.number}
          >
            {invoice.name}
          </NavLink>
        ))}
      </nav>
      <Outlet />
    </div>
  );
}
```

We did three things there:

1. We swapped out `Link` for `NavLink`.
2. We changed the `style` from a simple object to a function that returns an object.
3. We changed the color of our link by looking at the `isActive` value that `NavLink` passed to our styling function.

You can do the same thing with `className` on `NavLink`:

```jsx
// normal string
<NavLink className="red" />

// function
<NavLink className={({ isActive }) => isActive ? "red" : "blue"} />
```

## Search Params

Search params are like URL params but they sit in a different position in the URL. Instead of being in the normal URL segments separated by `/`, they are at the end after a `?`. You've seen them across the web like `"/login?success=1"` or `"/shoes?brand=nike&sort=asc&sortby=price"`.

React Router makes it easy to read and manipulate the search params with `useSearchParams`. It works a lot like `React.useState()` but stores and sets the state in the URL search params instead of in memory.

Let's see it in action by adding a little filter on the invoices nav list.

```jsx filename=routes/invoices.jsx lines=[4,10,20-30,32-37]
import {
  NavLink,
  Outlet,
  useSearchParams,
} from "react-router-dom";
import { getInvoices } from "../data";

export default function Invoices() {
  let invoices = getInvoices();
  let [searchParams, setSearchParams] = useSearchParams();

  return (
    <div style={{ display: "flex" }}>
      <nav
        style={{
          borderRight: "solid 1px",
          padding: "1rem",
        }}
      >
        <input
          value={searchParams.get("filter") || ""}
          onChange={(event) => {
            let filter = event.target.value;
            if (filter) {
              setSearchParams({ filter });
            } else {
              setSearchParams({});
            }
          }}
        />
        {invoices
          .filter((invoice) => {
            let filter = searchParams.get("filter");
            if (!filter) return true;
            let name = invoice.name.toLowerCase();
            return name.startsWith(filter.toLowerCase());
          })
          .map((invoice) => (
            <NavLink
              style={({ isActive }) => ({
                display: "block",
                margin: "1rem 0",
                color: isActive ? "red" : "",
              })}
              to={`/invoices/${invoice.number}`}
              key={invoice.number}
            >
              {invoice.name}
            </NavLink>
          ))}
      </nav>
      <Outlet />
    </div>
  );
}
```

Check this out, as the user types:

- `setSearchParams()` is putting the `?filter=...` search params in the URL and rerendering the router.
- `useSearchParams` is now returning a [`URLSearchParams`](https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams) with `"filter"` as one of its values.
- We set the value of the input to whatever is in the filter search param (it's just like `useState` but in the URLSearchParams instead!)
- We filter our list of invoices based on the filter search param.

## Custom Behavior

If you filter the list and then click a link, you'll notice that the list is no longer filtered and the search param is cleared from the `<input>` and the URL. You might want this, you might not! Maybe you want to keep the list filtered and keep the param in the URL.

We can persist the query string when we click a link by adding it to the link's href. We'll do that by composing `NavLink` and `useLocation` from React Router into our own `QueryNavLink` (maybe there's a better name, but that's what we're going with today).

```js
import { useLocation, NavLink } from "react-router-dom";

function QueryNavLink({ to, ...props }) {
  let location = useLocation();
  return <NavLink to={to + location.search} {...props} />;
}
```

You can put that code anywhere you want in your app and then replace your `NavLink` in `src/routes/invoices.jsx` with `QueryNavLink` and you're done.

Like `useSearchParams`, `useLocation` returns a location that tells us information about the URL. A location looks something like this:

```js
{
  pathname: "/invoices",
  search: "?filter=sa",
  hash: "",
  state: null,
  key: "ae4cz2j"
}
```

With that information, the task in `QueryNavLink` is pretty simple: add the `location.search` onto the `to` prop. You might be thinking, "Geez, seems like this should be a built-in component of React Router or something?". Well, let's look at another example.

What if you had links like this on an ecommerce site.

```jsx
<Link to="/shoes?brand=nike">Nike</Link>
<Link to="/shoes?brand=vans">Vans</Link>
```

And then you wanted to style them as "active" when the url search params match the brand? You could make a component that does exactly that pretty quickly with stuff you've learned in this tutorial:

```jsx
function BrandLink({ brand, ...props }) {
  let [params] = useSearchParams();
  let isActive = params.getAll("brand").includes(brand);
  return (
    <Link
      style={{ color: isActive ? "red" : "" }}
      to={`/shoes?brand=${brand}`}
      {...props}
    />
  );
}
```

That's going to be active for `"/shoes?brand=nike"` as well as `"/shoes?brand=nike&brand=vans"`. Maybe you want it to be active when there's only one brand selected:

```js
let brands = params.getAll("brand");
let isActive =
  brands.includes(brand) && brands.length === 1;
// ...
```

Or maybe you want the links to be _additive_ (clicking Nike and then Vans adds both brands to the search params) instead of replacing the brand:

```jsx [4-6,10]
function BrandLink({ brand, ...props }) {
  let [params] = useSearchParams();
  let isActive = params.getAll("brand").includes(brand);
  if (!isActive) {
    params.append("brand", brand);
  }
  return (
    <Link
      style={{ color: isActive ? "red" : "" }}
      to={`/shoes?${params.toString()}`}
      {...props}
    />
  );
}
```

Or maybe you want it to add the brand if it's not there already and remove it if it's clicked again!

```jsx [7-12]
function BrandLink({ brand, ...props }) {
  let [params] = useSearchParams();
  let isActive = params.getAll("brand").includes(brand);
  if (!isActive) {
    params.append("brand", brand);
  } else {
    params = new URLSearchParams(
      Array.from(params).filter(
        ([key, value]) => key !== "brand" || value !== brand
      )
    );
  }
  return (
    <Link
      style={{ color: isActive ? "red" : "" }}
      to={`/shoes?${params.toString()}`}
      {...props}
    />
  );
}
```

As you can see, even in this fairly simple example there are a lot of valid behaviors you might want. React Router doesn't try to solve every use-case we've ever heard of directly. Instead, we give you the components and hooks to compose whatever behavior you need.

## Navigating Programmatically

Okay, back to our app. Hang in there, you're almost done!

Most of the time the URL changes is in response to the user clicking a link. But sometimes you, the programmer, want to change the URL. A very common use case is after a data update like creating or deleting a record.

Let's add a button that marks the invoice as paid and then navigates to the index route.

First you can copy and paste this function that deletes an invoice from our fake data store:

```js filename=src/data.js
export function deleteInvoice(number) {
  invoices = invoices.filter(
    (invoice) => invoice.number !== number
  );
}
```

Now let's add the delete button, call our new function, and navigate to the index route:

```js lines=[1-6,9-10,21-30] filename=src/routes/invoice.jsx
import {
  useParams,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { getInvoice, deleteInvoice } from "../data";

export default function Invoice() {
  let navigate = useNavigate();
  let location = useLocation();
  let params = useParams();
  let invoice = getInvoice(parseInt(params.invoiceId, 10));

  return (
    <main style={{ padding: "1rem" }}>
      <h2>Total Due: {invoice.amount}</h2>
      <p>
        {invoice.name}: {invoice.number}
      </p>
      <p>Due Date: {invoice.due}</p>
      <p>
        <button
          onClick={() => {
            deleteInvoice(invoice.number);
            navigate("/invoices" + location.search);
          }}
        >
          Delete
        </button>
      </p>
    </main>
  );
}
```

Notice we used `useLocation` again to persist the query string by adding `location.search` to the navigation link.

## Getting Help

Congrats! You're all done with this tutorial. We hope it helped you get your bearings with React Router.

If you're having trouble, check out the [Resources](/resources) page to get help. Good luck!

[stackblitz-app]: https://stackblitz.com/edit/github-agqlf5?file=src/App.jsx
[stackblitz-template]: https://stackblitz.com/github/remix-run/react-router/tree/main/tutorial?file=src/App.jsx
[reactjs-getting-started]: https://reactjs.org/docs/getting-started.html
[cra]: https://create-react-app.dev/
[vite]: https://vitejs.dev/guide/#scaffolding-your-first-vite-project
[remix]: https://remix.run

# FAQs

Here are some questions that people commonly have about React Router v6:

## What happened to withRouter? I need it!

This question usually stems from the fact that you're using React class components, which don't support hooks. In React Router v6, we fully embraced hooks and use them to share all the router's internal state. But that doesn't mean you can't use the router. Assuming you can actually use hooks (you're on React 16.8+), you just need a wrapper.

```js
import {
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";

function withRouter(Component) {
  function ComponentWithRouterProp(props) {
    let location = useLocation();
    let navigate = useNavigate();
    let params = useParams();
    return (
      <Component
        {...props}
        router={{ location, navigate, params }}
      />
    );
  }

  return ComponentWithRouterProp;
}
```

## Why does `<Route>` have an `element` prop instead of `render` or `component`?

In React Router v6 we switched from using v5's `<Route component>` and `<Route render>` APIs to `<Route element>`. Why is that?

For starters, we see React itself taking the lead here with the `<Suspense fallback={<Spinner />}>` API. The `fallback` prop takes a React **element**, not a **component**. This lets you easily pass whatever props you want to your `<Spinner>` from the component that renders it.

Using elements instead of components means we don't have to provide a `passProps`-style API, so you can get the props you need to your elements. For example, in a component-based API there is no good way to pass props to the `<Profile>` element that is rendered when `<Route path=":userId" component={Profile} />` matches. Most React libraries who take this approach end up with either an API like `<Route component={Profile} passProps={{ animate: true }} />` or use a render prop or higher-order component.

Also, `Route`'s rendering API in v5 was rather large. As we worked on v4/5, the conversation went something like this:

```js
// Ah, this is nice and simple!
<Route path=":userId" component={Profile} />

// But wait, how do I pass custom props to the <Profile> element??
// Hmm, maybe we can use a render prop in those situations?
<Route
  path=":userId"
  render={routeProps => (
    <Profile routeProps={routeProps} animate={true} />
  )}
/>

// Ok, now we have two ways to render something with a route. :/

// But wait, what if we want to render something when a route
// *doesn't* match the URL, like a Not Found page? Maybe we
// can use another render prop with slightly different semantics?
<Route
  path=":userId"
  children={({ match }) => (
    match ? (
      <Profile match={match} animate={true} />
    ) : (
      <NotFound />
    )
  )}
/>

// What if I want to get access to the route match, or I need
// to redirect deeper in the tree?
function DeepComponent(routeStuff) {
  // got routeStuff, phew!
}
export default withRouter(DeepComponent);

// Well hey, now at least we've covered all our use cases!
// ... *facepalm*
```

At least part of the reason for this API sprawl was that React did not provide any way for us to get the information from the `<Route>` to your route element, so we had to invent clever ways to get both the route data **and** your own custom props through to your elements: `component`, render props, `passProps` higher-order-components ... until **hooks** came along!

Now, the conversation above goes like this:

```js
// Ah, nice and simple API. And it's just like the <Suspense> API!
// Nothing more to learn here.
<Route path=":userId" element={<Profile />} />

// But wait, how do I pass custom props to the <Profile>
// element? Oh ya, it's just an element. Easy.
<Route path=":userId" element={<Profile animate={true} />} />

// Ok, but how do I access the router's data, like the URL params
// or the current location?
function Profile({ animate }) {
  let params = useParams();
  let location = useLocation();
}

// But what about components deep in the tree?
function DeepComponent() {
  // oh right, same as anywhere else
  let navigate = useNavigate();
}

// Aaaaaaaaand we're done here.
```

Another important reason for using the `element` prop in v6 is that `<Route children>` is reserved for nesting routes. You can read more about this in [the guide about getting started][nested-routes] with v6.

## How do I add a No Match (404) Route in react-router v6?

In v4 we would have just left the path prop off a route. In v5 we would have wrapped our 404 element in a Route and used `path="*"`. In v6 use the new element prop, pass `path="*"` instead:

```js
<Route path="*" element={<NoMatch />} />
```

## `<Route>` doesn't render? How do I compose?

In v5 the `<Route>` component was just a normal component that was like an `if` statement that rendered when the URL matched its path. In v6, a `<Route>` element doesn't actually ever render, it's simply there for configuration.

In v5, since routes were just components, `MyRoute` will be rendered when the path is "/my-route".

```tsx filename=v5.js
let App = () => (
  <div>
    <MyRoute />
  </div>
);

let MyRoute = ({ element, ...rest }) => {
  return (
    <Route path="/my-route" children={<p>Hello!</p>} />
  );
};
```

In v6, however, the `<Route>` is only used for its props, so the following code will never render `<p>Hello!</p>` because `<MyRoute>` has no path that `<Routes>` can see:

```tsx bad filename=v6-wrong.js
let App = () => (
  <Routes>
    <MyRoute />
  </Routes>
);

let MyRoute = () => {
  // won't ever render because the path is down here
  return (
    <Route path="/my-route" children={<p>Hello!</p>} />
  );
};
```

You can get the same behavior by:

- Only rendering `<Route>` elements inside of `<Routes>`
- Moving the composition into the `element` prop

```tsx filename=v6.js
let App = () => (
  <div>
    <Routes>
      <Route path="/my-route" element={<MyRoute />} />
    </Routes>
  </div>
);

let MyRoute = () => {
  return <p>Hello!</p>;
};
```

Having a full nested route config available statically in `<Routes>` is going to enable a lot of features in `v6.x`, so we encourage you to put your routes in one top-level config. If you really like the idea of components that match the URL independent of any other components, you can make a component that behaves similarly to the v5 `Route` with this:

```tsx
function MatchPath({ path, Comp }) {
  let match = useMatch(path);
  return match ? <Comp {...match} /> : null;
}

// Will match anywhere w/o needing to be in a `<Routes>`
<MatchPath path="/accounts/:id" Comp={Account} />;
```

## How do I nest routes deep in the tree?

In v5 you could render a `<Route>` or `<Switch>` anywhere you want. You can keep doing the very same thing, but you need to use `<Routes>` (`<Route>` without an 's' will not work). We call these "Descendant `<Routes>`".

It might have looked like this in v5

```tsx filename=v5.js
// somewhere up the tree
<Switch>
  <Route path="/users" component={Users} />
</Switch>;

// and now deeper in the tree
function Users() {
  return (
    <div>
      <h1>Users</h1>
      <Switch>
        <Route path="/users/account" component={Account} />
      </Switch>
    </div>
  );
}
```

In v6 it's almost the same:

- Note the `*` in the ancestor routes to get it to match deeper URLs even though it has no direct children
- You no longer need to know the entire child route path, you can use a relative route now

```tsx filename=v6.js
// somewhere up the tree
<Routes>
  <Route path="/users/*" element={<Users />} />
</Routes>;

// and now deeper in the tree
function Users() {
  return (
    <div>
      <h1>Users</h1>
      <Routes>
        <Route path="account" element={<Account />} />
      </Routes>
    </div>
  );
}
```

If you had a "floating route" in v5 (not wrapped in a `<Switch>`), simply wrap it in a `<Routes>` instead.

```tsx
// v5
<Route path="/contact" component={Contact} />

// v6
<Routes>
  <Route path="contact" element={<Contact />} />
</Routes>
```

## What Happened to Regexp Routes Paths?

Regexp route paths were removed for two reasons:

1. Regular expression paths in routes raised a lot of questions for v6's ranked route matching. How do you rank a regex?

2. We were able to shed an entire dependency (path-to-regexp) and cut the package weight sent to your user's browser significantly. If it were added back, it would represent 1/3 of React Router's page weight!

After looking at a lot of use cases, we found we can still meet them without direct regexp path support, so we made the tradeoff to significantly decrease the bundle size and avoid the open questions around ranking regexp routes.

The majority of regexp routes were only concerned about one URL segment at a time and doing one of two things:

1. Matching multiple static values
2. Validating the param in some way (is a number, not a number, etc.)

**Matching generally static values**

A very common route we've seen is a regex matching multiple language codes:

```tsx filename=v5-lang-route.js
function App() {
  return (
    <Switch>
      <Route path={/(en|es|fr)/} component={Lang} />
    </Switch>
  );
}

function Lang({ params }) {
  let lang = params[0];
  let translations = I81n[lang];
  // ...
}
```

These are all actually just static paths, so in v6 you can make three routes and pass the code directly to the component. If you've got a lot of them, make an array and map it into routes to avoid the repetition.

```tsx filename=v6-lang-route.js
function App() {
  return (
    <Routes>
      <Route path="en" element={<Lang lang="en" />} />
      <Route path="es" element={<Lang lang="es" />} />
      <Route path="fr" element={<Lang lang="fr" />} />
    </Routes>
  );
}

function Lang({ lang }) {
  let translations = I81n[lang];
  // ...
}
```

**Doing some sort of param validation**

Another common case was ensuring that parameters were an integer.

```tsx filename=v5-userId-route.js
function App() {
  return (
    <Switch>
      <Route path={/users\/(\d+)/} component={User} />
    </Switch>
  );
}

function User({ params }) {
  let id = params[0];
  // ...
}
```

In this case you have to do a bit of work yourself with the regex inside the matching component:

```tsx filename=v6-userId-route.js
function App() {
  return (
    <Routes>
      <Route path="/users/:id" element={<ValidateUser />} />
      <Route path="/users/*" element={<NotFound />} />
    </Routes>
  );
}

function ValidateUser() {
  let params = useParams();
  let userId = params.id.match(/\d+/);
  if (!userId) {
    return <NotFound />;
  }
  return <User id={params.userId} />;
}

function User(props) {
  let id = props.id;
  // ...
}
```

In v5 if the regex didn't match then `<Switch>` would keep trying to match the next routes:

```tsx filename=v5-switch.js
function App() {
  return (
    <Switch>
      <Route path={/users\/(\d+)/} component={User} />
      <Route path="/users/new" exact component={NewUser} />
      <Route
        path="/users/inactive"
        exact
        component={InactiveUsers}
      />
      <Route path="/users/*" component={NotFound} />
    </Switch>
  );
}
```

Looking at this example you might be concerned that in the v6 version your other routes won't get rendered at their URLs because the `:userId` route might match first. But, thanks to route ranking, that is not the case. The "new" and "inactive" routes will rank higher and therefore render at their respective URLs:

```tsx filename=v6-ranked.js
function App() {
  return (
    <Routes>
      <Route path="/users/:id" element={<ValidateUser />} />
      <Route path="/users/new" element={<NewUser />} />
      <Route
        path="/users/inactive"
        element={<InactiveUsers />}
      />
    </Routes>
  );
}
```

In fact, the v5 version has all sorts of problems if your routes aren't ordered _just right_. V6 completely eliminates this problem.

**Remix Users**

If you're using [Remix][remix], you can send proper 40x responses to the browser by moving this work into your loader. This also decreases the size of the browser bundles sent to the user because loaders only run on the server.

```tsx filename=remix-useLoaderData.js
import { useLoaderData } from "remix";

export async function loader({ params }) {
  if (!params.id.match(/\d+/)) {
    throw new Response("", { status: 400 });
  }

  let user = await fakeDb.user.find({
    where: { id: params.id },
  });
  if (!user) {
    throw new Response("", { status: 404 });
  }

  return user;
}

function User() {
  let user = useLoaderData();
  // ...
}
```

Instead of rending your component, remix will render the nearest [catch boundary][remix-catchboundary] instead.

[remix]: https://remix.run
[remix-catchboundary]: https://remix.run/docs/en/v1/api/conventions#catchboundary
[nested-routes]: ./overview#nested-routes

# Main Concepts

<docs-warning>This document is a deep dive into the core concepts behind routing as implemented in React Router. It's pretty long, so if you're looking for a more practical guide check out our [quick start tutorial][tutorial].</docs-warning>

You might be wondering what exactly React Router does. How can it help you build your app? What exactly is a **router**, anyway?

If you've ever had any of these questions, or you'd just like to dig into the fundamental pieces of routing, you're in the right place. This document contains detailed explanations of all the core concepts behind routing as implemented in React Router.

Please don't let this document overwhelm you! For everyday use, React Router is pretty simple. You don't need to go this deep to use it.

React Router isn't just about matching a url to a function or component: it's about building a full user interface that maps to the URL, so it might have more concepts in it than you're used to. We'll go into detail on the three main jobs of React Router:

1. Subscribing and manipulating the [history stack](#history-stack)
2. Matching the [URL](#url) to your [routes](#route-config)
3. Rendering a nested UI from the [route matches](#matches)

## Definitions

But first, some definitions! There are a lot of different ideas around routing from back and front end frameworks. Sometimes a word in one context might have different meaning than another.

Here are some words we use a lot when we talk about React Router. The rest of this guide will go into more detail on each one.

- <a id="url">**URL**</a> - The URL in the address bar. A lot of people use the term "URL" and "route" interchangeably, but this is not a route in React Router, it's just a URL.

- <a id="location">**Location**</a> - This is a React Router specific object that is based on the built-in browser's `window.location` object. It represents "where the user is at". It's mostly an object representation of the URL but has a bit more to it than that.

- <a id="location-state">**Location State**</a> - A value that persists with a [location](#location) that isn't encoded in the [URL](#url). Much like hash or search params (data encoded in the URL), but stored invisibly in the browser's memory.

- <a id="history-stack">**History Stack**</a> - As the user navigates, the browser keeps track of each [location](#location) in a stack. If you click and hold the back button in a browser you can see the browser's history stack right there.

- <a id="csr">**Client Side Routing (CSR)**</a> - A plain HTML document can link to other documents and the browser handles the [history stack](#history-stack) itself. Client Side Routing enables developers to manipulate the browser history stack without making a document request to the server.

- <a id="history-object">**History**</a> - An object that allows React Router to subscribe to changes in the [URL](#url) as well as providing APIs to manipulate the browser [history stack](#history-stack) programmatically.

- <a id="history-action">**History Action**</a> - One of `POP`, `PUSH`, or `REPLACE`. Users can arrive at a [URL](#url) for one of these three reasons. A push when a new entry is added to the history stack (typically a link click or the programmer forced a navigation). A replace is similar except it replaces the current entry on the stack instead of pushing a new one. Finally, a pop happens when the user clicks the back or forward buttons in the browser chrome.

- <a id="segment">**Segment**</a> - The parts of a [URL](#url) or [path pattern](#path-pattern) between the `/` characters. For example, "/users/123" has two segments.

- <a id="path-pattern">**Path Pattern**</a> - These look like URLs but can have special characters for matching URLs to routes, like **dynamic segments** (`"/users/:userId"`) or **star segments** (`"/docs/*"`). They aren't URLs, they're patterns that React Router will match.

- <a id="dynamic-segment">**Dynamic Segment**</a> - A segment of a path pattern that is dynamic, meaning it can match any values in the segment. For example the pattern `/users/:userId` will match URLs like `/users/123`

- <a id="url-params">**URL Params**</a> - The parsed values from the URL that matched a [dynamic segment](#dynamic-segment).

- <a id="router">**Router**</a> - Stateful, top-level component that makes all the other components and hooks work.

- <a id="route-config">**Route Config**</a> - A tree of **routes objects** that will be ranked and matched (with nesting) against the current location to create a branch of **route matches**.

- <a id="route">**Route**</a> - An object or Route Element typically with a shape of `{ path, element }` or `<Route path element>`. The `path` is a path pattern. When the path pattern matches the current URL, the element will be rendered.

- <a id="route-element">**Route Element**</a> - Or `<Route>`. This element's props are read to create a [route](#route) by `<Routes>`, but otherwise does nothing.

- <a id="nested-routes">**Nested Routes**</a> - Because routes can have children and each route defines a portion of the [URL](#url) through [segments](#segment), a single URL can match multiple routes in a nested "branch" of the tree. This enables automatic layout nesting through [outlet](#outlet), [relative links](#relative-links), and more.

- <a id="relative-links">**Relative links**</a> - Links that don't start with `/` will inherit the closest route in which they are rendered. This makes it easy to link to deeper URLs without having to know and build up the entire path.

- <a id="match">**Match**</a> - An object that holds information when a route matches the URL, like the [url params](#url-params) and pathname that matched.

- <a id="matches">**Matches**</a> - An array of routes (or branch of the [route config](#route-config)) that matches the current [location](#location). This structure enables [nested routes](#nested-routes).

- <a id="parent-route">**Parent Route**</a> - A route with child routes.

- <a id="outlet">**Outlet**</a> - A component that renders the next match in a set of [matches](#match).

- <a id="index-route">**Index Route**</a> - A child route with no path that renders in the parent's [outlet](#outlet) at the parent's [URL](#url).

- <a id="layout-route">**Layout Route**</a> - A **parent route** without a path, used exclusively for grouping child routes inside a specific layout.

## History and Locations

Before React Router can do anything, it has to be able to subscribe to changes in the browser [history stack](#history-stack).

Browsers maintain their own history stack as the user navigates around. That's how the back and forward buttons can work. In a traditional website (HTML documents without JavaScript) the browser will make requests to the server every time the user clicks a link, submits a form, or clicks the back and forward buttons.

For example, consider the user:

1. clicks a link to `/dashboard`
2. clicks a link to `/accounts`
3. clicks a link to `/customers/123`
4. clicks the back button
5. clicks a link to `/dashboard`

The history stack will change as follows where **bold** entries denote the current [URL](#url):

1. **`/dashboard`**
2. `/dashboard`, **`/accounts`**
3. `/dashboard`, `/accounts`, **`/customers/123`**
4. `/dashboard`, **`/accounts`**, `/customers/123`
5. `/dashboard`, `/accounts`, **`/dashboard`**

### History Object

With **client side routing**, developers are able to manipulate the browser [history stack](#history-stack) programmatically. For example, we can write some code like this to change the [URL](#url) without the browsers default behavior of making a request to the server:

```jsx
<a
  href="/contact"
  onClick={(event) => {
    // stop the browser from changing the URL and requesting the new document
    event.preventDefault();
    // push an entry into the browser history stack and change the URL
    window.history.pushState({}, undefined, "/contact");
  }}
/>
```

<docs-warning>For illustration only, don't use `window.history.pushState` directly in React Router</docs-warning>

This code changes the [URL](#url) but doesn't do anything for the UI. We would need to write some more code that changed some state somewhere to get the UI to change to the contact page. The trouble is, the browser doesn't give us a way to "listen to the URL" and subscribe to changes like this.

Well, that's not totally true. We can listen for changes to the URL via [pop](#history-actions) events:

```jsx
window.addEventListener("popstate", () => {
  // URL changed!
});
```

But that only fires when the user clicks the back or forward buttons. There is no event for when the programmer called `window.history.pushState` or `window.history.replaceState`.

That's where a React Router specific `history` object comes into play. It provides a way to "listen for [URL](#url)" changes whether the [history action](#history-actions) is **push**, **pop**, or **replace**.

```js
let history = createBrowserHistory();
history.listen(({ location, action }) => {
  // this is called whenever new locations come in
  // the action is POP, PUSH, or REPLACE
});
```

Apps don't need to set up their own history objects--that's job of `<Router>`. It sets up one of these objects, subscribe to changes in the [history stack](#history-stack), and finally updates its state when the [URL](#url) changes. This causes the app to re-render and the correct UI to display. The only thing it needs to put on state is a `location`, everything else works from that single object.

### Locations

The browser has a location object on `window.location`. It tells you information about the [URL](#url) but also has some methods to change it:

```js
window.location.pathname; // /getting-started/concepts/
window.location.hash; // #location
window.location.reload(); // force a refresh w/ the server
// and a lot more
```

<docs-warning>For illustration. You don't typically work with `window.location` in a React Router app</docs-warning>

Instead of using `window.location`, React Router has the concept of a [location](#location) that's patterned after `window.location` but is much simpler. It looks like this:

```js
{
  pathname: "/bbq/pig-pickins",
  search: "?campaign=instagram",
  hash: "#menu",
  state: null,
  key: "aefz24ie"
}
```

The first three: `{ pathname, search, hash }` are exactly like `window.location`. If you just add up the three you'll get the [URL](#url) the user sees in the browser:

```js
location.pathname + location.search + location.hash;
// /bbq/pig-pickins?campaign=instagram#menu
```

The last two, `{ state, key }`, are React Router specific.

**Location Pathname**

This is the part of [URL](#url) after the origin, so for `https://example.com/teams/hotspurs` the pathname is `/teams/hotspurs`. This is the only part of the location that routes match against.

**Location Search**

People use a lot of different terms for this part of the [URL](#url):

- location search
- search params
- URL search params
- query string

In React Router we call it the "location search". However, location search is a serialized version of [`URLSearchParams`](https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams). So sometimes we might call it "URL search params" as well.

```js
// given a location like this:
let location = {
  pathname: "/bbq/pig-pickins",
  search: "?campaign=instagram&popular=true",
  hash: "",
  state: null,
  key: "aefz24ie",
};

// we can turn the location.search into URLSearchParams
let params = new URLSearchParams(location.search);
params.get("campaign"); // "instagram"
params.get("popular"); // "true"
params.toString(); // "campaign=instagram&popular=true",
```

When being precise, refer to the serialized string version as "search" and the parsed version as "search params", but it's common to use the terms interchangeably when precision isn't important.

**Location Hash**

Hashes in URLs indicate a scroll position _on the current page_. Before the `window.history.pushState` API was introduced, web developers did client side routing exclusively with the hash portion of the [URL](#url), it was the only part we could manipulate without making a new request to the server. However, today we can use it for its designed purpose.

**Location State**

You may have wondered why the `window.history.pushState()` API is called "push state". State? Aren't we just changing the [URL](#url)? Shouldn't it be `history.push`? Well, we weren't in the room when the API was designed, so we're not sure why "state" was the focus, but it is a cool feature of browsers nonetheless.

Browsers let us persist information about a transition by passing a value to `pushState`. When the user clicks back, the value on `history.state` changes to whatever was "pushed" before.

```js
window.history.pushState("look ma!", undefined, "/contact");
window.history.state; // "look ma!"
// user clicks back
window.history.state; // undefined
// user clicks forward
window.history.state; // "look ma!"
```

<docs-warning>For illustration. You don't read `history.state` directly in React Router apps</docs-warning>

React Router takes advantage of this browser feature, abstracts it a bit, and surfaces the values on the `location` instead of `history`.

You can think about `location.state` just like `location.hash` or `location.search` except instead of putting the values in the [URL](#url) it's hidden--like a super secret piece of the URL only the programmer knows about.

A couple of great use-cases for location state are:

- Telling the next page where the user came from and branching the UI. The most popular implementation here is showing a record in a modal if the user clicked on an item in a grid view, but if they show up to the URL directly, show the record in its own layout (pinterest, old instagram).
- Sending a partial record from a list to the next screen so it can render the partial data immediately and then fetching the rest of the data afterward.

You set location state in two ways: on `<Link>` or `navigate`:

```jsx
<Link to="/pins/123" state={{ fromDashboard: true }} />;

let navigate = useNavigate();
navigate("/users/123", { state: partialUser });
```

And on the next page you can access it with `useLocation`:

```jsx
let location = useLocation();
location.state;
```

<docs-info>Location state values will get serialized, so something like `new Date()` will be turned into a string.</docs-info>

**Location Key**

Each location gets a unique key. This is useful for advanced cases like location-based scroll management, client side data caching, and more. Because each new location gets a unique key, you can build abstractions that store information in a plain object, `new Map()`, or even `locationStorage`.

For example, a very basic client side data cache could store values by location key (and the fetch [URL](#url)) and skip fetching the data when the user clicks back into it:

```jsx
let cache = new Map();

function useFakeFetch(URL) {
  let location = useLocation();
  let cacheKey = location.key + URL;
  let cached = cache.get(cacheKey);

  let [data, setData] = useState(() => {
    // initialize from the cache
    return cached || null;
  });

  let [state, setState] = useState(() => {
    // avoid the fetch if cached
    return cached ? "done" : "loading";
  });

  useEffect(() => {
    if (state === "loading") {
      let controller = new AbortController();
      fetch(URL, { signal: controller.signal })
        .then((res) => res.json())
        .then((data) => {
          if (controller.signal.aborted) return;
          // set the cache
          cache.set(cacheKey, data);
          setData(data);
        });
      return () => controller.abort();
    }
  }, [state, cacheKey]);

  useEffect(() => {
    setState("loading");
  }, [URL]);

  return data;
}
```

## Matching

On the initial render, and when the [history stack](#history-stack) changes, React Router will match the [location](#location) against your [route config](#route-config) to come up with a set of [matches](#match) to render.

### Defining Routes

A route config is a tree of [routes](#route) that looks something like this:

```js
<Routes>
  <Route path="/" element={<App />}>
    <Route index element={<Home />} />
    <Route path="teams" element={<Teams />}>
      <Route path=":teamId" element={<Team />} />
      <Route path=":teamId/edit" element={<EditTeam />} />
      <Route path="new" element={<NewTeamForm />} />
      <Route index element={<LeagueStandings />} />
    </Route>
  </Route>
  <Route element={<PageLayout />}>
    <Route path="/privacy" element={<Privacy />} />
    <Route path="/tos" element={<Tos />} />
  </Route>
  <Route path="contact-us" element={<Contact />} />
</Routes>
```

The `<Routes>` component recurses through its `props.children`, strips their props, and generates an object like this:

```js
let routes = [
  {
    element: <App />,
    path: "/",
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "teams",
        element: <Teams />,
        children: [
          {
            index: true,
            element: <LeagueStandings />,
          },
          {
            path: ":teamId",
            element: <Team />,
          },
          {
            path: ":teamId/edit",
            element: <EditTeam />,
          },
          {
            path: "new",
            element: <NewTeamForm />,
          },
        ],
      },
    ],
  },
  {
    element: <PageLayout />,
    children: [
      {
        element: <Privacy />,
        path: "/privacy",
      },
      {
        element: <Tos />,
        path: "/tos",
      },
    ],
  },
  {
    element: <Contact />,
    path: "/contact-us",
  },
];
```

In fact, instead of `<Routes>` you can use the hook `useRoutes(routesGoHere)` instead. That's all `<Routes>` is doing.

As you can see, routes can define multiple [segments](#segment) like `:teamId/edit`, or just one like `:teamId`. All of the segments down a branch of the [route config](#route-config) are added together to create a final [path pattern](#path-pattern) for a route.

### Match Params

Note the `:teamId` segments. This is what we call a [dynamic segment](#dynamic-segment) of the [path pattern](#path-pattern), meaning it doesn't match the URL statically (the actual characters) but it matches it dynamically. Any value can fill in for `:teamId`. Both `/teams/123` or `/teams/cupcakes` will match. We call the parsed values [URL params](#url-params). So in this case our `teamId` param would be `"123"` or `"cupcakes"`. We'll see how to use them in your app in the [Rendering](#rendering) section.

### Ranking Routes

If we add up all the segments of all the branches of our [route config](#route-config), we end up with the following path patterns that our app responds to:

```js
[
  "/",
  "/teams",
  "/teams/:teamId",
  "/teams/:teamId/edit",
  "/teams/new",
  "/privacy",
  "/tos",
  "/contact-us",
];
```

Now this is where things get really interesting. Consider the [URL](#url) `/teams/new`. Which pattern in that list matches the URL?

That's right, two of them!

```
/teams/new
/teams/:teamId
```

React Router has to make a decision here, there can be only one. Many routers, both client side and server side, will simply process the patterns in the order in which they were defined. First to match wins. In this case we would match `/` and render the `<Home/>` component. Definitely not what we wanted. These kinds of routers require us to order our routes perfectly to get the expected result. This is how React Router has worked up until v6, but now it's much smarter.

Looking at those patterns, you intuitively know that we want `/teams/new` to match the URL `/teams/new`. It's a perfect match! React Router also knows that. When matching, it will rank your routes according the number of segments, static segments, dynamic segments, star patterns, etc. and pick the most specific match. You'll never have to think about ordering your routes.

### Pathless Routes

You may have noticed the weird routes from earlier:

```jsx
<Route index element={<Home />} />
<Route index element={<LeagueStandings />} />
<Route element={<PageLayout />} />
```

They don't even have a path, how can they be a route? This is where the word "route" in React Router is used pretty loosely. `<Home/>` and `<LeagueStandings/>` are [index routes](#index-route) and `<PageLayout/>` is a [layout route](#layout-route). We'll discuss how they work in the [Rendering](#rendering) section. Neither really has much to do with matching.

### Route Matches

When a route matches the URL, it's represented by a [match](#match) object. A match for `<Route path=":teamId" element={<Team/>}/>` would look something like this:

```js
{
  pathname: "/teams/firebirds",
  params: {
    teamId: "firebirds"
  },
  route: {
    element: <Team />,
    path: ":teamId"
  }
}
```

`pathname` holds the portion of the URL that matched this route (in our case it's all of it). `params` holds the parsed values from any [dynamic segments](#dynamic-segment) that matched. Note that the param's object keys map directly to the name of the segment: `:teamId` becomes `params.teamId`.

Because our routes are a tree, a single URL can match an entire branch of the tree. Consider the URL `/teams/firebirds`, it would be the following route branch:

```jsx [2,4,5]
<Routes>
  <Route path="/" element={<App />}>
    <Route index element={<Home />} />
    <Route path="teams" element={<Teams />}>
      <Route path=":teamId" element={<Team />} />
      <Route path=":teamId/edit" element={<EditTeam />} />
      <Route path="new" element={<NewTeamForm />} />
      <Route index element={<LeagueStandings />} />
    </Route>
  </Route>
  <Route element={<PageLayout />}>
    <Route path="/privacy" element={<Privacy />} />
    <Route path="/tos" element={<Tos />} />
  </Route>
  <Route path="contact-us" element={<Contact />} />
</Routes>
```

React Router will create an array of [matches](#match) from these routes and the url so it can render a nested UI that matches the route nesting.

```js
[
  {
    pathname: "/",
    params: null,
    route: {
      element: <App />,
      path: "/",
    },
  },
  {
    pathname: "/teams",
    params: null,
    route: {
      element: <Teams />,
      path: "teams",
    },
  },
  {
    pathname: "/teams/firebirds",
    params: {
      teamId: "firebirds",
    },
    route: {
      element: <Team />,
      path: ":teamId",
    },
  },
];
```

## Rendering

The final concept is rendering. Consider that the entry to your app looks like this:

```jsx
const root = ReactDOM.createRoot(
  document.getElementById("root")
);
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Home />} />
        <Route path="teams" element={<Teams />}>
          <Route path=":teamId" element={<Team />} />
          <Route path="new" element={<NewTeamForm />} />
          <Route index element={<LeagueStandings />} />
        </Route>
      </Route>
      <Route element={<PageLayout />}>
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/tos" element={<Tos />} />
      </Route>
      <Route path="contact-us" element={<Contact />} />
    </Routes>
  </BrowserRouter>
);
```

Let's use the `/teams/firebirds` URL as an example again. `<Routes>` will match the [location](#location) to your [route config](#route-config), get a set of [matches](#match), and then render a React element tree like this:

```jsx
<App>
  <Teams>
    <Team />
  </Teams>
</App>
```

Each match rendered inside the parent route's element is a really powerful abstraction. Most websites and apps share this characteristic: boxes inside of boxes inside of boxes, each with a navigation section that changes a child section of the page.

### Outlets

This nested element tree won't happen automatically. `<Routes>` will render the first match's element for you (In our case that's `<App/>`). The next match's element is `<Teams>`. In order to render that, `App` needs to render an [outlet](#outlet).

```jsx [5]
function App() {
  return (
    <div>
      <GlobalNav />
      <Outlet />
      <GlobalFooter />
    </div>
  );
}
```

The `Outlet` component will always render the next match. That means `<Teams>` also needs an outlet to render `<Team/>`.

If the URL were `/contact-us`, the element tree would change to:

```jsx
<ContactForm />
```

Because the contact form is not under the main `<App>` route.

If the URL were `/teams/firebirds/edit`, the element tree would change to:

```jsx
<App>
  <Teams>
    <EditTeam />
  </Teams>
</App>
```

The outlet swaps out the child for the new child that matches, but the parent layout persists. It's subtle but very effective at cleaning up your components.

### Index Routes

Remember the [route config](#route-config) for `/teams`:

```js
<Route path="teams" element={<Teams />}>
  <Route path=":teamId" element={<Team />} />
  <Route path="new" element={<NewTeamForm />} />
  <Route index element={<LeagueStandings />} />
</Route>
```

If the URL were `/teams/firebirds`, the element tree would be:

```jsx
<App>
  <Teams>
    <Team />
  </Teams>
</App>
```

But if the URL were `/teams`, the element tree would be:

```jsx
<App>
  <Teams>
    <LeagueStandings />
  </Teams>
</App>
```

League standings? How the heck did `<Route index element={<LeagueStandings>}/>` pop in there? It doesn't even have a path! The reason is that it's an [index route](#index-route). Index routes render in their parent route's [outlet](#outlet) at the parent route's path.

Think of it this way, if you're not at one of the child routes' paths, the `<Outlet>` will render nothing in the UI:

```jsx
<App>
  <Teams />
</App>
```

If all the teams are in a list on the left then an empty outlet means you've got a blank page on the right! Your UI needs something to fill the space: index routes to the rescue.

Another way to think of an index route is that it's the default child route when the parent matches but none of its children do.

Depending on the user interface, you might not need an index route, but if there is any sort of persistent navigation in the parent route you'll most likely want index route to fill the space when the user hasn't clicked one of the items yet.

### Layout Routes

Here's a part of our route config we haven't matched yet: `/privacy`. Let's look at the route config again, highlighting the matched routes:

```jsx [2,11,12]
<Routes>
  <Route path="/" element={<App />}>
    <Route index element={<Home />} />
    <Route path="teams" element={<Teams />}>
      <Route path=":teamId" element={<Team />} />
      <Route path=":teamId/edit" element={<EditTeam />} />
      <Route path="new" element={<NewTeamForm />} />
      <Route index element={<LeagueStandings />} />
    </Route>
  </Route>
  <Route element={<PageLayout />}>
    <Route path="/privacy" element={<Privacy />} />
    <Route path="/tos" element={<Tos />} />
  </Route>
  <Route path="contact-us" element={<Contact />} />
</Routes>
```

And the resulting element tree rendered will be:

```jsx
<App>
  <PageLayout>
    <Privacy />
  </PageLayout>
</App>
```

The `PageLayout` route is admittedly weird. We call it a [layout route](#layout-route) because it doesn't participate in the matching at all (though its children do). It only exists to make wrapping multiple child routes in the same layout simpler. If we didn't allow this then you'd have to handle layouts in two different ways: sometimes your routes do it for you, sometimes you do it manually with lots of layout component repetition throughout your app:

<docs-error>You can do it like this, but we recommend using a layout route</docs-error>

```jsx bad lines=[14-16,22-24]
<Routes>
  <Route path="/" element={<App />}>
    <Route index element={<Home />} />
    <Route path="teams" element={<Teams />}>
      <Route path=":teamId" element={<Team />} />
      <Route path=":teamId/edit" element={<EditTeam />} />
      <Route path="new" element={<NewTeamForm />} />
      <Route index element={<LeagueStandings />} />
    </Route>
  </Route>
  <Route
    path="/privacy"
    element={
      <PageLayout>
        <Privacy />
      </PageLayout>
    }
  />
  <Route
    path="/tos"
    element={
      <PageLayout>
        <Tos />
      </PageLayout>
    }
  />
  <Route path="contact-us" element={<Contact />} />
</Routes>
```

So, yeah, the semantics of a layout "route" is a bit silly since it has nothing to do with the URL matching, but it's just too convenient to disallow.

## Navigating

When the [URL](#url) changes we call that a "navigation". There are two ways to navigate in React Router:

- `<Link>`
- `navigate`

### Link

This is the primary means of navigation. Rendering a `<Link>` allows the user to change the URL when they click it. React Router will prevent the browser's default behavior and tell the [history](#history) to push a new entry into the [history stack](#history-stack). The [location](#location) changes and the new [matches](#match) will render.

However, links are accessible in that they:

- Still render a `<a href>` so all default accessibility concerns are met (like keyboard, focusability, SEO, etc.)
- Don't prevent the browser's default behavior if it's a right click or command/control click to "open in new tab"

[Nested routes](#nested-routes) aren't just about rendering layouts; they also enable "relative links". Consider our `teams` route from before:

```jsx
<Route path="teams" element={<Teams />}>
  <Route path=":teamId" element={<Team />} />
</Route>
```

The `<Teams>` component can render links like:

```jsx
<Link to="psg" />
<Link to="new" />
```

The full path it links to will be `/teams/psg` and `/teams/new`. They inherit the route within which they are rendered. This makes it so your route components don't have to really know anything about the rest of the routes in the app. A very large amount of links just go one more [segment](#segment) deeper. You can rearrange your whole [route config](#route-config) and these links will likely still work just fine. This is very valuable when building out a site in the beginning and the designs and layouts are shifting around.

### Navigate Function

This function is returned from the `useNavigate` hook and allows you, the programmer, to change the URL whenever you want. You could do it on a timeout:

```js
let navigate = useNavigate();
useEffect(() => {
  setTimeout(() => {
    navigate("/logout");
  }, 30000);
}, []);
```

Or after a form is submitted:

```js
<form onSubmit={event => {
  event.preventDefault();
  let data = new FormData(event.target)
  let urlEncoded = new URLSearchParams(data)
  navigate("/create", { state: urlEncoded })
}}>
```

Like `Link`, `navigate` works with nested "to" values as well.

```js
navigate("psg");
```

You should have a good reason to use `navigate` instead of `<Link>`. This makes us very sad:

```js bad nonumber
<li onClick={() => navigate("/somewhere")} />
```

Aside from links and forms, very few interactions should change the URL because it introduces complexity around accessibility and user expectations.

## Data Access

Finally, an application is going to want to ask React Router for a few pieces of information in order to build out the full UI. For this, React Router has a pile of hooks

```js
let location = useLocation();
let urlParams = useParams();
let [urlSearchParams] = useSearchParams();
```

## Review

Let's put it all together from the top!

1. You render your app:

   ```jsx
   const root = ReactDOM.createRoot(
     document.getElementById("root")
   );
   root.render(
     <BrowserRouter>
       <Routes>
         <Route path="/" element={<App />}>
           <Route index element={<Home />} />
           <Route path="teams" element={<Teams />}>
             <Route path=":teamId" element={<Team />} />
             <Route path="new" element={<NewTeamForm />} />
             <Route index element={<LeagueStandings />} />
           </Route>
         </Route>
         <Route element={<PageLayout />}>
           <Route path="/privacy" element={<Privacy />} />
           <Route path="/tos" element={<Tos />} />
         </Route>
         <Route path="contact-us" element={<Contact />} />
       </Routes>
     </BrowserRouter>
   );
   ```

2. `<BrowserRouter>` creates a [history](#history), puts the initial [location](#location) in to state, and subscribes to the [URL](#url).

3. `<Routes>` recurses its [child routes](#child-route) to build a [route config](#route-config), matches those routes against the [location](#location), creates some route [matches](#match), and renders the first match's route element.

4. You render an [`<Outlet/>`](#outlet) in each [parent route](#parent-route).

5. The outlets render the next match in the route [matches](#match).

6. The user clicks a link

7. The link calls `navigate()`

8. The [history](#history) changes the URL and notifies `<BrowserRouter>`.

9. `<BrowserRouter>` rerenders, start over at (2)!

That's it! We hope this guide has helped you gain a deeper understanding of the main concepts in React Router.

[tutorial]: ./tutorial

# `<BrowserRouter>`


  <summary>Type declaration</summary>

```tsx
declare function BrowserRouter(
  props: BrowserRouterProps
): React.ReactElement;

interface BrowserRouterProps {
  basename?: string;
  children?: React.ReactNode;
  window?: Window;
}
```



`<BrowserRouter>` is the recommended interface for running React Router in a web browser. A `<BrowserRouter>` stores the current location in the browser's address bar using clean URLs and navigates using the browser's built-in history stack.

`<BrowserRouter window>` defaults to using the current [document's `defaultView`][defaultview], but it may also be used to track changes to another window's URL, in an `<iframe>`, for example.

```tsx
import * as React from "react";
import * as ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

ReactDOM.render(
  <BrowserRouter>
    {/* The rest of your app goes here */}
  </BrowserRouter>,
  root
);
```

[defaultview]: https://developer.mozilla.org/en-US/docs/Web/API/Document/defaultView

# `<HashRouter>`


  <summary>Type declaration</summary>

```tsx
declare function HashRouter(
  props: HashRouterProps
): React.ReactElement;

interface HashRouterProps {
  basename?: string;
  children?: React.ReactNode;
  window?: Window;
}
```



`<HashRouter>` is for use in web browsers when the URL should not (or cannot) be sent to the server for some reason. This may happen in some shared hosting scenarios where you do not have full control over the server. In these situations, `<HashRouter>` makes it possible to store the current location in the `hash` portion of the current URL, so it is never sent to the server.

`<HashRouter window>` defaults to using the current [document's `defaultView`][defaultview], but it may also be used to track changes to another window's URL, in an `<iframe>`, for example.

```tsx
import * as React from "react";
import * as ReactDOM from "react-dom";
import { HashRouter } from "react-router-dom";

ReactDOM.render(
  <HashRouter>
    {/* The rest of your app goes here */}
  </HashRouter>,
  root
);
```

<docs-warning>We strongly recommend you do not use `HashRouter` unless you absolutely have to.</docs-warning>

[defaultview]: https://developer.mozilla.org/en-US/docs/Web/API/Document/defaultView

# `<unstable_HistoryRouter>`


  <summary>Type declaration</summary>

```tsx
declare function HistoryRouter(
  props: HistoryRouterProps
): React.ReactElement;

interface HistoryRouterProps {
  basename?: string;
  children?: React.ReactNode;
  history: History;
}
```



`<unstable_HistoryRouter>` takes an instance of the [`history`][history] library as prop. This allows you to use that instance in non-React contexts or as a global variable.

```tsx
import * as React from "react";
import * as ReactDOM from "react-dom";
import { unstable_HistoryRouter as HistoryRouter } from "react-router-dom";
import { createBrowserHistory } from "history";

const history = createBrowserHistory({ window });

ReactDOM.render(
  <HistoryRouter history={history}>
    {/* The rest of your app goes here */}
  </HistoryRouter>,
  root
);
```

<docs-warning>This API is currently prefixed as `unstable_` because you may unintentionally add two versions of the `history` library to your app, the one you have added to your package.json and whatever version React Router uses internally. If it is allowed by your tooling, it's recommended to not add `history` as a direct dependency and instead rely on the nested dependency from the `react-router` package. Once we have a mechanism to detect mis-matched versions, this API will remove its `unstable_` prefix.</docs-warning>

[history]: https://github.com/remix-run/history

# `<MemoryRouter>`


  <summary>Type declaration</summary>

```tsx
declare function MemoryRouter(
  props: MemoryRouterProps
): React.ReactElement;

interface MemoryRouterProps {
  basename?: string;
  children?: React.ReactNode;
  initialEntries?: InitialEntry[];
  initialIndex?: number;
}
```



A `<MemoryRouter>` stores its locations internally in an array. Unlike `<BrowserHistory>` and `<HashHistory>`, it isn't tied to an external source, like the history stack in a browser. This makes it ideal for scenarios where you need complete control over the history stack, like testing.

- `<MemoryRouter initialEntries>` defaults to `["/"]` (a single entry at the root `/` URL)
- `<MemoryRouter initialIndex>` defaults to the last index of `initialEntries`

> **Tip:**
>
> Most of React Router's tests are written using a `<MemoryRouter>` as the
> source of truth, so you can see some great examples of using it by just
> [browsing through our tests][tests].

```tsx
import * as React from "react";
import { create } from "react-test-renderer";
import {
  MemoryRouter,
  Routes,
  Route,
} from "react-router-dom";

describe("My app", () => {
  it("renders correctly", () => {
    let renderer = create(
      <MemoryRouter initialEntries={["/users/mjackson"]}>
        <Routes>
          <Route path="users" element={<Users />}>
            <Route path=":id" element={<UserProfile />} />
          </Route>
        </Routes>
      </MemoryRouter>
    );

    expect(renderer.toJSON()).toMatchSnapshot();
  });
});
```

[tests]: https://github.com/remix-run/react-router/tree/main/packages/react-router/__tests__

# `<NativeRouter>`


  <summary>Type declaration</summary>

```tsx
declare function NativeRouter(
  props: NativeRouterProps
): React.ReactElement;

interface NativeRouterProps extends MemoryRouterProps {}
```



`<NativeRouter>` is the recommended interface for running React Router in a [React Native][react-native] app.

- `<NativeRouter initialEntries>` defaults to `["/"]` (a single entry at the root `/` URL)
- `<NativeRouter initialIndex>` defaults to the last index of `initialEntries`

```tsx
import * as React from "react";
import { NativeRouter } from "react-router-native";

function App() {
  return (
    <NativeRouter>
      {/* The rest of your app goes here */}
    </NativeRouter>
  );
}
```

[react-native]: https://reactnative.dev

# `<Router>`


  <summary>Type declaration</summary>

```tsx
declare function Router(
  props: RouterProps
): React.ReactElement | null;

interface RouterProps {
  basename?: string;
  children?: React.ReactNode;
  location: Partial<Location> | string;
  navigationType?: NavigationType;
  navigator: Navigator;
  static?: boolean;
}
```



`<Router>` is the low-level interface that is shared by all router components (like `<BrowserRouter>` and `<StaticRouter>`). In terms of React, `<Router>` is a [context provider][context] that supplies routing information to the rest of the app.

You probably never need to render a `<Router>` manually. Instead, you should use one of the higher-level routers depending on your environment. You only ever need one router in a given app.

The `<Router basename>` prop may be used to make all routes and links in your app relative to a "base" portion of the URL pathname that they all share. This is useful when rendering only a portion of a larger app with React Router or when your app has multiple entry points. Basenames are not case-sensitive.

[context]: https://reactjs.org/docs/context.html#contextprovider

# `<StaticRouter>`


  <summary>Type declaration</summary>

```tsx
declare function StaticRouter(
  props: StaticRouterProps
): React.ReactElement;

interface StaticRouterProps {
  basename?: string;
  children?: React.ReactNode;
  location?: Path | LocationPieces;
}
```



`<StaticRouter>` is used to render a React Router web app in [node][node]. Provide the current location via the `location` prop.

- `<StaticRouter location>` defaults to `"/"`

```tsx
import * as React from "react";
import * as ReactDOMServer from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import http from "http";

function requestHandler(req, res) {
  let html = ReactDOMServer.renderToString(
    <StaticRouter location={req.url}>
      {/* The rest of your app goes here */}
    </StaticRouter>
  );

  res.write(html);
  res.end();
}

http.createServer(requestHandler).listen(3000);
```

[node]: https://nodejs.org


# `<Link>`

> **Note:**
>
> This is the web version of `<Link>`. For the React Native version,
> [go here][link-native].


  <summary>Type declaration</summary>

```tsx
declare function Link(props: LinkProps): React.ReactElement;

interface LinkProps
  extends Omit<
    React.AnchorHTMLAttributes<HTMLAnchorElement>,
    "href"
  > {
  replace?: boolean;
  state?: any;
  to: To;
  reloadDocument?: boolean;
}

type To = Partial<Location> | string;
```



A `<Link>` is an element that lets the user navigate to another page by clicking or tapping on it. In `react-router-dom`, a `<Link>` renders an accessible `<a>` element with a real `href` that points to the resource it's linking to. This means that things like right-clicking a `<Link>` work as you'd expect. You can use `<Link reloadDocument>` to skip client side routing and let the browser handle the transition normally (as if it were an `<a href>`).

```tsx
import * as React from "react";
import { Link } from "react-router-dom";

function UsersIndexPage({ users }) {
  return (
    <div>
      <h1>Users</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <Link to={user.id}>{user.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
```

A relative `<Link to>` value (that does not begin with `/`) resolves relative to the parent route, which means that it builds upon the URL path that was matched by the route that rendered that `<Link>`. It may contain `..` to link to routes further up the hierarchy. In these cases, `..` works exactly like the command-line `cd` function; each `..` removes one segment of the parent path.

> **Note:**
>
> `<Link to>` with a `..` behaves differently from a normal `<a href>` when the
> current URL ends with `/`. `<Link to>` ignores the trailing slash, and removes
> one URL segment for each `..`. But an `<a href>` value handles `..`
> differently when the current URL ends with `/` vs when it does not.

[link-native]: ./link-native

# `<NavLink>`


  <summary>Type declaration</summary>

```tsx
declare function NavLink(
  props: NavLinkProps
): React.ReactElement;

interface NavLinkProps
  extends Omit<
    LinkProps,
    "className" | "style" | "children"
  > {
  caseSensitive?: boolean;
  children?:
    | React.ReactNode
    | ((props: { isActive: boolean }) => React.ReactNode);
  className?:
    | string
    | ((props: {
        isActive: boolean;
      }) => string | undefined);
  end?: boolean;
  style?:
    | React.CSSProperties
    | ((props: {
        isActive: boolean;
      }) => React.CSSProperties);
}
```



A `<NavLink>` is a special kind of [`<Link>`][link] that knows whether or not it is "active". This is useful when building a navigation menu such as a breadcrumb or a set of tabs where you'd like to show which of them is currently selected. It also provides useful context for assistive technology like screen readers.

By default, an `active` class is added to a `<NavLink>` component when it is active. This provides the same simple styling mechanism for most users who are upgrading from v5. One difference as of `v6.0.0-beta.3` is that `activeClassName` and `activeStyle` have been removed from `NavLinkProps`. Instead, you can pass a function to either `style` or `className` that will allow you to customize the inline styling or the class string based on the component's active state. You can also pass a function as children to customize the content of the `<NavLink>` component based on their active state, specially useful to change styles on internal elements.

```tsx
import * as React from "react";
import { NavLink } from "react-router-dom";

function NavList() {
  // This styling will be applied to a <NavLink> when the
  // route that it links to is currently selected.
  let activeStyle = {
    textDecoration: "underline",
  };

  let activeClassName = "underline";

  return (
    <nav>
      <ul>
        <li>
          <NavLink
            to="messages"
            style={({ isActive }) =>
              isActive ? activeStyle : undefined
            }
          >
            Messages
          </NavLink>
        </li>
        <li>
          <NavLink
            to="tasks"
            className={({ isActive }) =>
              isActive ? activeClassName : undefined
            }
          >
            Tasks
          </NavLink>
        </li>
        <li>
          <NavLink to="tasks">
            {({ isActive }) => (
              <span
                className={
                  isActive ? activeClassName : undefined
                }
              >
                Tasks
              </span>
            )}
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
```

If you prefer the v5 API, you can create your own `<NavLink />` as a wrapper component:

```tsx
import * as React from "react";
import { NavLink as BaseNavLink } from "react-router-dom";

const NavLink = React.forwardRef(
  ({ activeClassName, activeStyle, ...props }, ref) => {
    return (
      <BaseNavLink
        ref={ref}
        {...props}
        className={({ isActive }) =>
          [
            props.className,
            isActive ? activeClassName : null,
          ]
            .filter(Boolean)
            .join(" ")
        }
        style={({ isActive }) => ({
          ...props.style,
          ...(isActive ? activeStyle : null),
        })}
      />
    );
  }
);
```

If the `end` prop is used, it will ensure this component isn't matched as "active" when its descendant paths are matched. For example, to render a link that is only active at the website root and not any other URLs, you can use:

```tsx
<NavLink to="/" end>
  Home
</NavLink>
```

[link]: ./link


# `<Navigate>`


  <summary>Type declaration</summary>

```tsx
declare function Navigate(props: NavigateProps): null;

interface NavigateProps {
  to: To;
  replace?: boolean;
  state?: any;
}
```



A `<Navigate>` element changes the current location when it is rendered. It's a component wrapper around [`useNavigate`][use-navigate], and accepts all the same arguments as props.

> **Note:**
>
> Having a component-based version of the `useNavigate` hook makes it easier to
> use this feature in a [`React.Component`](https://reactjs.org/docs/react-component.html)
> subclass where hooks are not able to be used.

```tsx
import * as React from "react";
import { Navigate } from "react-router-dom";

class LoginForm extends React.Component {
  state = { user: null, error: null };

  async handleSubmit(event) {
    event.preventDefault();
    try {
      let user = await login(event.target);
      this.setState({ user });
    } catch (error) {
      this.setState({ error });
    }
  }

  render() {
    let { user, error } = this.state;
    return (
      <div>
        {error && <p>{error.message}</p>}
        {user && (
          <Navigate to="/dashboard" replace={true} />
        )}
        <form
          onSubmit={(event) => this.handleSubmit(event)}
        >
          <input type="text" name="username" />
          <input type="password" name="password" />
        </form>
      </div>
    );
  }
}
```

[use-navigate]: ../hooks/use-navigate

# `<Outlet>`


  <summary>Type declaration</summary>

```tsx
interface OutletProps {
  context?: unknown;
}
declare function Outlet(
  props: OutletProps
): React.ReactElement | null;
```



An `<Outlet>` should be used in parent route elements to render their child route elements. This allows nested UI to show up when child routes are rendered. If the parent route matched exactly, it will render a child index route or nothing if there is no index route.

```tsx
function Dashboard() {
  return (
    <div>
      <h1>Dashboard</h1>

      {/* This element will render either <DashboardMessages> when the URL is
          "/messages", <DashboardTasks> at "/tasks", or null if it is "/"
      */}
      <Outlet />
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />}>
        <Route
          path="messages"
          element={<DashboardMessages />}
        />
        <Route path="tasks" element={<DashboardTasks />} />
      </Route>
    </Routes>
  );
}
```

# `<Routes>` and `<Route>`


  <summary>Type declaration</summary>

```tsx
declare function Routes(
  props: RoutesProps
): React.ReactElement | null;

interface RoutesProps {
  children?: React.ReactNode;
  location?: Partial<Location> | string;
}

declare function Route(
  props: RouteProps
): React.ReactElement | null;

interface RouteProps {
  caseSensitive?: boolean;
  children?: React.ReactNode;
  element?: React.ReactNode | null;
  index?: boolean;
  path?: string;
}
```



`<Routes>` and `<Route>` are the primary ways to render something in React Router based on the current [`location`][location]. You can think about a `<Route>` kind of like an `if` statement; if its `path` matches the current URL, it renders its `element`! The `<Route caseSensitive>` prop determines if the matching should be done in a case-sensitive manner (defaults to `false`).

Whenever the location changes, `<Routes>` looks through all its `children` `<Route>` elements to find the best match and renders that branch of the UI. `<Route>` elements may be nested to indicate nested UI, which also correspond to nested URL paths. Parent routes render their child routes by rendering an [`<Outlet>`][outlet].

```tsx
<Routes>
  <Route path="/" element={<Dashboard />}>
    <Route
      path="messages"
      element={<DashboardMessages />}
    />
    <Route path="tasks" element={<DashboardTasks />} />
  </Route>
  <Route path="about" element={<AboutPage />} />
</Routes>
```

> **Note:**
>
> If you'd prefer to define your routes as regular JavaScript objects instead
> of using JSX, [try `useRoutes` instead][use-routes].

The default `<Route element>` is an [`<Outlet>`][outlet]. This means the route will still render its children even without an explicit `element` prop, so you can nest route paths without nesting UI around the child route elements.

For example, in the following config the parent route renders an `<Outlet>` by default, so the child route will render without any surrounding UI. But the child route's path is `/users/:id` because it still builds on its parent.

```tsx
<Route path="users">
  <Route path=":id" element={<UserProfile />} />
</Route>
```

[location]: ../utils/location
[outlet]: ./outlet
[use-route]: ../hooks/use-routes

# `useHref`


  <summary>Type declaration</summary>

```tsx
declare function useHref(to: To): string;
```



The `useHref` hook returns a URL that may be used to link to the given `to` location, even outside of React Router.

> **Tip:**
>
> You may be interested in taking a look at the source for the `<Link>`
> component in `react-router-dom` to see how it uses `useHref` internally to
> determine its own `href` value.

# `useInRouterContext`


  <summary>Type declaration</summary>

```tsx
declare function useInRouterContext(): boolean;
```



The `useInRouterContext` hooks returns `true` if the component is being rendered in the context of a `<Router>`, `false` otherwise. This can be useful for some 3rd-party extensions that need to know if they are being rendered in the context of a React Router app.

# `useLinkClickHandler`


  <summary>Type declaration</summary>

```tsx
declare function useLinkClickHandler<
  E extends Element = HTMLAnchorElement
>(
  to: To,
  options?: {
    target?: React.HTMLAttributeAnchorTarget;
    replace?: boolean;
    state?: any;
  }
): (event: React.MouseEvent<E, MouseEvent>) => void;
```



The `useLinkClickHandler` hook returns a click event handler for navigation when building a custom `<Link>` in `react-router-dom`.

```tsx
import {
  useHref,
  useLinkClickHandler,
} from "react-router-dom";

const StyledLink = styled("a", { color: "fuchsia" });

const Link = React.forwardRef(
  (
    {
      onClick,
      replace = false,
      state,
      target,
      to,
      ...rest
    },
    ref
  ) => {
    let href = useHref(to);
    let handleClick = useLinkClickHandler(to, {
      replace,
      state,
      target,
    });

    return (
      <StyledLink
        {...rest}
        href={href}
        onClick={(event) => {
          onClick?.(event);
          if (!event.defaultPrevented) {
            handleClick(event);
          }
        }}
        ref={ref}
        target={target}
      />
    );
  }
);
```

# `useLinkPressHandler`


  <summary>Type declaration</summary>

```tsx
declare function useLinkPressHandler(
  to: To,
  options?: {
    replace?: boolean;
    state?: any;
  }
): (event: GestureResponderEvent) => void;
```



The `react-router-native` counterpart to `useLinkClickHandler`, `useLinkPressHandler` returns a press event handler for custom `<Link>` navigation.

```tsx
import { TouchableHighlight } from "react-native";
import { useLinkPressHandler } from "react-router-native";

function Link({
  onPress,
  replace = false,
  state,
  to,
  ...rest
}) {
  let handlePress = useLinkPressHandler(to, {
    replace,
    state,
  });

  return (
    <TouchableHighlight
      {...rest}
      onPress={(event) => {
        onPress?.(event);
        if (!event.defaultPrevented) {
          handlePress(event);
        }
      }}
    />
  );
}
```

# `useLocation`


  <summary>Type declaration</summary>

```tsx
declare function useLocation(): Location;

interface Location extends Path {
  state: unknown;
  key: Key;
}
```



This hook returns the current [`location`][location] object. This can be useful if you'd like to perform some side effect whenever the current location changes.

```tsx
import * as React from 'react';
import { useLocation } from 'react-router-dom';

function App() {
  let location = useLocation();

  React.useEffect(() => {
    ga('send', 'pageview');
  }, [location]);

  return (
    // ...
  );
}
```

[location]: ../utils/location

# `useMatch`


  <summary>Type declaration</summary>

```tsx
declare function useMatch<ParamKey extends string = string>(
  pattern: PathPattern | string
): PathMatch<ParamKey> | null;
```



Returns match data about a route at the given path relative to the current location.

See [`matchPath`][matchpath] for more information.

[matchpath]: ../utils/match-path

# `useNavigate`


  <summary>Type declaration</summary>

```tsx
declare function useNavigate(): NavigateFunction;

interface NavigateFunction {
  (
    to: To,
    options?: { replace?: boolean; state?: any }
  ): void;
  (delta: number): void;
}
```



The `useNavigate` hook returns a function that lets you navigate programmatically, for example after a form is submitted.

```tsx
import { useNavigate } from "react-router-dom";

function SignupForm() {
  let navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    await submitForm(event.target);
    navigate("../success", { replace: true });
  }

  return <form onSubmit={handleSubmit}>{/* ... */}</form>;
}
```

The `navigate` function has two signatures:

- Either pass a `To` value (same type as `<Link to>`) with an optional second `{ replace, state }` arg or
- Pass the delta you want to go in the history stack. For example, `navigate(-1)` is equivalent to hitting the back button.

# `useNavigationType`


  <summary>Type declaration</summary>

```tsx
declare function useNavigationType(): NavigationType;

type NavigationType = "POP" | "PUSH" | "REPLACE";
```



This hook returns the current type of navigation or how the user came to the current page; either via a pop, push, or replace action on the history stack.


# `useOutlet`


  <summary>Type declaration</summary>

```tsx
declare function useOutlet(): React.ReactElement | null;
```



Returns the element for the child route at this level of the route hierarchy. This hook is used internally by [`<Outlet>`][outlet] to render child routes.

[outlet]: ../components/outlet

# `useOutletContext`


  <summary>Type declaration</summary>

```tsx
declare function useOutletContext<
  Context = unknown
>(): Context;
```



Often parent routes manage state or other values you want shared with child routes. You can create your own [context provider](https://reactjs.org/docs/context.html) if you like, but this is such a common situation that it's built-into `<Outlet />`:

```tsx lines=[3]
function Parent() {
  const [count, setCount] = React.useState(0);
  return <Outlet context={[count, setCount]} />;
}
```

```tsx lines=[2]
import { useOutletContext } from "react-router-dom";

function Child() {
  const [count, setCount] = useOutletContext();
  const increment = () => setCount((c) => c + 1);
  return <button onClick={increment}>{count}</button>;
}
```

If you're using TypeScript, we recommend the parent component provide a custom hook for accessing the context value. This makes it easier for consumers to get nice typings, control consumers, and know who's consuming the context value. Here's a more realistic example:

```tsx filename=src/routes/dashboard.tsx lines=[12,17-19]
import * as React from "react";
import type { User } from "./types";
import { Outlet, useOutletContext } from "react-router-dom";

type ContextType = { user: User | null };

export default function Dashboard() {
  const [user, setUser] = React.useState<User | null>(null);

  return (
    <div>
      <h1>Dashboard</h1>
      <Outlet context={{ user }} />
    </div>
  );
}

export function useUser() {
  return useOutletContext<ContextType>();
}
```

```tsx filename=src/routes/dashboard/messages.tsx lines=[1,4]
import { useUser } from "../dashboard";

export default function DashboardMessages() {
  const { user } = useUser();
  return (
    <div>
      <h2>Messages</h2>
      <p>Hello, {user.name}!</p>
    </div>
  );
}
```

# `useParams`


  <summary>Type declaration</summary>

```tsx
declare function useParams<
  K extends string = string
>(): Readonly<Params<K>>;
```



The `useParams` hook returns an object of key/value pairs of the dynamic params from the current URL that were matched by the `<Route path>`. Child routes inherit all params from their parent routes.

```tsx
import * as React from 'react';
import { Routes, Route, useParams } from 'react-router-dom';

function ProfilePage() {
  // Get the userId param from the URL.
  let { userId } = useParams();
  // ...
}

function App() {
  return (
    <Routes>
      <Route path="users">
        <Route path=":userId" element={<ProfilePage />} />
        <Route path="me" element={...} />
      </Route>
    </Routes>
  );
}
```

# `useResolvedPath`


  <summary>Type declaration</summary>

```tsx
declare function useResolvedPath(to: To): Path;
```



This hook resolves the `pathname` of the location in the given `to` value against the pathname of the current location.

This is useful when building links from relative values. For example, check out the source to [`<NavLink>`][navlink] which calls `useResolvedPath` internally to resolve the full pathname of the page being linked to.

See [resolvePath][resolvepath] for more information.

[navlink]: ../components/nav-link
[resolvepath]: ../utils/resolve-path

# `useRoutes`


  <summary>Type declaration</summary>

```tsx
declare function useRoutes(
  routes: RouteObject[],
  location?: Partial<Location> | string;
): React.ReactElement | null;
```



The `useRoutes` hook is the functional equivalent of [`<Routes>`][routes], but it uses JavaScript objects instead of `<Route>` elements to define your routes. These objects have the same properties as normal [`<Route>` elements][route], but they don't require JSX.

The return value of `useRoutes` is either a valid React element you can use to render the route tree, or `null` if nothing matched.

```tsx
import * as React from "react";
import { useRoutes } from "react-router-dom";

function App() {
  let element = useRoutes([
    {
      path: "/",
      element: <Dashboard />,
      children: [
        {
          path: "messages",
          element: <DashboardMessages />,
        },
        { path: "tasks", element: <DashboardTasks /> },
      ],
    },
    { path: "team", element: <AboutPage /> },
  ]);

  return element;
}
```

[routes]: ../components/routes
[route]: ../components/route

# `useSearchParams`

> **Note:**
>
> This is the web version of `useSearchParams`. For the React Native version,
> [go here][usesearchparams-native].


  <summary>Type declaration</summary>

```tsx
declare function useSearchParams(
  defaultInit?: URLSearchParamsInit
): [URLSearchParams, SetURLSearchParams];

type ParamKeyValuePair = [string, string];

type URLSearchParamsInit =
  | string
  | ParamKeyValuePair[]
  | Record<string, string | string[]>
  | URLSearchParams;

type SetURLSearchParams = (
  nextInit?: URLSearchParamsInit,
  navigateOpts?: : { replace?: boolean; state?: any }
) => void;
```



The `useSearchParams` hook is used to read and modify the query string in the URL for the current location. Like React's own [`useState` hook](https://reactjs.org/docs/hooks-reference.html#usestate), `useSearchParams` returns an array of two values: the current location's [search params](https://developer.mozilla.org/en-US/docs/Web/API/URL/searchParams) and a function that may be used to update them.

```tsx
import * as React from "react";
import { useSearchParams } from "react-router-dom";

function App() {
  let [searchParams, setSearchParams] = useSearchParams();

  function handleSubmit(event) {
    event.preventDefault();
    // The serialize function here would be responsible for
    // creating an object of { key: value } pairs from the
    // fields in the form that make up the query.
    let params = serializeFormQuery(event.target);
    setSearchParams(params);
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>{/* ... */}</form>
    </div>
  );
}
```

> **Note:**
>
> The `setSearchParams` function works like [`navigate`][usenavigate], but
> only for the [search portion](https://developer.mozilla.org/en-US/docs/Web/API/Location/search)
> of the URL. Also note that the second arg to `setSearchParams` is
> the same type as the second arg to `navigate`.

[usesearchparams-native]: ./use-search-params-rn
[usenavigate]: ./use-navigate

# `createRoutesFromChildren`


  <summary>Type declaration</summary>

```tsx
declare function createRoutesFromChildren(
  children: React.ReactNode
): RouteObject[];

interface RouteObject {
  caseSensitive?: boolean;
  children?: RouteObject[];
  element?: React.ReactNode;
  index?: boolean;
  path?: string;
}
```



`createRoutesFromChildren` is a helper that creates route objects from `<Route>` elements. It is used internally in a [`<Routes>` element][routes] to generate a route config from its [`<Route>`][route] children.

[routes]: ../components/routes
[route]: ../components/route

# `createSearchParams`


  <summary>Type declaration</summary>

```tsx
declare function createSearchParams(
  init?: URLSearchParamsInit
): URLSearchParams;
```



`createSearchParams` is a thin wrapper around [`new URLSearchParams(init)`](https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams/URLSearchParams) that adds support for using objects with array values. This is the same function that `useSearchParams` uses internally for creating `URLSearchParams` objects from `URLSearchParamsInit` values.

# `generatePath`


  <summary>Type declaration</summary>

```tsx
declare function generatePath(
  path: string,
  params?: Params
): string;
```



`generatePath` interpolates a set of params into a route path string with `:id` and `*` placeholders. This can be useful when you want to eliminate placeholders from a route path so it matches statically instead of using a dynamic parameter.

```tsx
generatePath("/users/:id", { id: 42 }); // "/users/42"
generatePath("/files/:type/*", {
  type: "img",
  "*": "cat.jpg",
}); // "/files/img/cat.jpg"
```

# `Location`

The term "location" in React Router refers to [the `Location` interface](https://github.com/remix-run/history/blob/main/docs/api-reference.md#location) from the [history](https://github.com/remix-run/history) library.

> **Note:**
>
> The `history` package is React Router's only dependency and many of the
> core types in React Router come directly from that library including
> `Location`, `To`, `Path`, and others. You can read more about
> the history library in [its documentation](https://github.com/remix-run/history/tree/main/docs).

# `matchPath`


  <summary>Type declaration</summary>

```tsx
declare function matchPath<
  ParamKey extends string = string
>(
  pattern: PathPattern | string,
  pathname: string
): PathMatch<ParamKey> | null;

interface PathMatch<ParamKey extends string = string> {
  params: Params<ParamKey>;
  pathname: string;
  pattern: PathPattern;
}

interface PathPattern {
  path: string;
  caseSensitive?: boolean;
  end?: boolean;
}
```



`matchPath` matches a route path pattern against a URL pathname and returns information about the match. This is useful whenever you need to manually run the router's matching algorithm to determine if a route path matches or not. It returns `null` if the pattern does not match the given pathname.

The [`useMatch` hook][usematch] uses this function internally to match a route path relative to the current location.

[usematch]: ../hooks/use-match


# `matchRoutes`


  <summary>Type declaration</summary>

```tsx
declare function matchRoutes(
  routes: RouteObject[],
  location: Partial<Location> | string,
  basename?: string
): RouteMatch[] | null;

interface RouteMatch<ParamKey extends string = string> {
  params: Params<ParamKey>;
  pathname: string;
  route: RouteObject;
}
```



`matchRoutes` runs the route matching algorithm for a set of routes against a given [`location`][location] to see which routes (if any) match. If it finds a match, an array of `RouteMatch` objects is returned, one for each route that matched.

This is the heart of React Router's matching algorithm. It is used internally by [`useRoutes`][useroutes] and the [`<Routes>` component][routes] to determine which routes match the current location. It can also be useful in some situations where you want to manually match a set of routes.

[location]: ./location
[useroutes]: ../hooks/use-routes
[routes]: ../components/routes

# `renderMatches`


  <summary>Type declaration</summary>

```tsx
declare function renderMatches(
  matches: RouteMatch[] | null
): React.ReactElement | null;
```



`renderMatches` renders the result of `matchRoutes()` into a React element.

# `resolvePath`


  <summary>Type declaration</summary>

```tsx
declare function resolvePath(
  to: To,
  fromPathname?: string
): Path;

type To = Partial<Location> | string;

interface Path {
  pathname: string;
  search: string;
  hash: string;
}
```



`resolvePath` resolves a given `To` value into an actual `Path` object with an absolute `pathname`. This is useful whenever you need to know the exact path for a relative `To` value. For example, the `<Link>` component uses this function to know the actual URL it points to.

The [`useResolvedPath` hook][useresolvedpath] uses `resolvePath` internally to resolve the pathname. If `to` contains a pathname, it is resolved against the current route pathname. Otherwise, it is resolved against the current URL (`location.pathname`).

[useresolvedpath]: ../hooks/use-resolved-path

# Basic Example

This example demonstrates some of the basic features of React Router, including:

- Layouts and nested `<Route>`s
- Index `<Route>`s
- Catch-all `<Route>`s
- Using `<Outlet>` as a placeholder for child routes
- Using `<Link>`s for navigation

## Preview

Open this example on [StackBlitz](https://stackblitz.com):

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/remix-run/react-router/tree/main/examples/basic?file=src/App.tsx)

# Auth Example

This example demonstrates how to restrict access to routes to authenticated users.

Be sure to pay attention to the following features:

- The use of the `useNavigate()` hook and the `<Navigate>` component for navigating both imperatively after the login form is submitted and declaratively when a non-authenticated user visits a particular route
- The use of `location.state` to preserve the previous location so you can send the user there after they authenticate
- The use of `navigate("...", { replace: true })` to replace the `/login` route in the history stack so the user doesn't return to the login page when clicking the back button after logging in

## Preview

Open this example on [StackBlitz](https://stackblitz.com):

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/remix-run/react-router/tree/main/examples/auth?file=src/App.tsx)

# Custom Filter Link Example

This example demonstrates how to use a query string parameter to mark a link as "active" or not. This is a common technique when implementing a filter in a sidebar where you're browsing products.

## Preview

Open this example on [StackBlitz](https://stackblitz.com):

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/remix-run/react-router/tree/main/examples/custom-filter-link?file=src/App.tsx)

# Custom Link Example

This example demonstrates how to make a custom `<Link>` component to render something different when the link is "active" using the `useMatch()` and `useResolvedPath()` hooks.

## Preview

Open this example on [StackBlitz](https://stackblitz.com):

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/remix-run/react-router/tree/main/examples/custom-link?file=src/App.tsx)

# Custom Query Parsing Example

This example demonstrates how to store a complex data structure in the URL query string using a custom hook.

It's a good example of how React Router's low-level hooks provide you with all the flexibility you need to create your own custom hooks that fit the needs of your app.

## Preview

Open this example on [StackBlitz](https://stackblitz.com):

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/remix-run/react-router/tree/main/examples/custom-query-parsing?file=src/App.tsx)

# Lazy Loading Example

This example demonstrates how to lazily load both

- individual route elements
- entire portions of your route hierarchy

on demand using `React.lazy()` and dynamic `import()`. Using this technique,
pages that are not required on the home page can be split out into separate
bundles, thereby decreasing load time on the initial page and improving
performance.

## Preview

Open this example on [StackBlitz](https://stackblitz.com):

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/remix-run/react-router/tree/main/examples/lazy-loading?file=src/App.tsx)

# Modal Example

## Preview

Open this example on [StackBlitz](https://stackblitz.com):

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/remix-run/react-router/tree/main/examples/modal?file=src/App.tsx)]

# Multi App Example

This example demonstrates how to build a site with multiple React Router apps by mounting each at a URL pathname prefix using the `<Router basename>` prop. This essentially decouples the apps from each other and allows them to be portable and even deployed separately.

## Preview

Open this example on [StackBlitz](https://stackblitz.com):

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/remix-run/react-router/tree/main/examples/multi-app?file=home/main.jsx)

# Route Objects Example

This example demonstrates how to use the `useRoutes()` hook to define and render routes using regular JavaScript objects instead of `<Routes>` and `<Route>` elements. This is mainly a stylistic preference that may make more sense in some scenarios, depending on the data structures you're working with to define your routes.

One interesting thing to note is that even if you don't use this hook directly, `<Routes>` uses it internally. So either way you're using the exact same code path!

## Preview

Open this example on [StackBlitz](https://stackblitz.com):

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/remix-run/react-router/tree/main/examples/route-objects?file=src/App.tsx)

# Search Params Example

This example demonstrates how to read and write the URL query string using the `useSearchParams()` hook. This hook is similar to the `useNavigate()` hook, but just for the [`search` portion of the URL](https://developer.mozilla.org/en-US/docs/Web/API/Location/search).

In this example, we have a form to search for a user on GitHub and display their user profile.

## Preview

Open this example on [StackBlitz](https://stackblitz.com):

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/remix-run/react-router/tree/main/examples/search-params?file=src/App.tsx)

# Server-side Rendering Example

This example adds [server-side rendering](https://reactjs.org/docs/react-dom-server.html) (SSR) to our basic example.

With SSR, the server renders your app and sends real HTML to the browser instead of an empty HTML document with a bunch of `<script>` tags. After the browser loads the HTML and JavaScript from the server, React "hydrates" the HTML document using the same components it used to render the app on the server.

This example contains a server (see [server.js](server.js)) that can run in both development and production modes.

In the browser entry point (see [src/entry.client.tsx](src/entry.client.tsx)), we use React Router like we would traditionally do in a purely client-side app and render a `<BrowserRouter>` to provide routing context to the rest of the app. The main difference is that instead of using `ReactDOM.render()` to render the app, since the HTML was already sent by the server, all we need is `ReactDOM.hydrate()`.

On the server (see [src/entry.server.tsx](src/entry.server.tsx)), we use React Router's `<StaticRouter>` to render the app and plug in the URL we get from the incoming HTTP request.

## Preview

Open this example on [StackBlitz](https://stackblitz.com):

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/remix-run/react-router/tree/main/examples/ssr?file=src/App.tsx)

# Server-Side Rendering

The most basic server rendering in React Router is pretty straightforward. However, there's a lot more to consider than just getting the right routes to render. Here's an incomplete list of things you'll need to handle:

- Bundling your code for the server and the browser
- Not bundling server-only code into the browser bundles
- Code splitting that works on the server and in the browser
- Server Side data loading so you actually have something to render
- Data loading strategies that work on the client and server
- Handling code splitting in the server and client
- Proper HTTP status codes and redirects
- Environment variables and secrets
- Deployment

Setting all of this up well can be pretty involved but is worth the performance and UX characteristics you can only get when server rendering.

If you want to server render your React Router app, we highly recommend you use [Remix](https://remix.run). This is another project of ours that's built on top of React Router and handles all of the things mentioned above and more. Give it a shot!

If you want to tackle it on your own, you'll need to use `<StaticRouter>` on the server.

First you'll need some sort of "app" or "root" component that gets rendered on the server and in the browser:

```js filename=App.js
export default function App() {
  return (
    <html>
      <head>
        <title>Server Rendered App</title>
      </head>
      <body>
        <Routes>
          <Route path="/" element={<div>Home</div>} />
          <Route path="/about" element={<div>About</div>} />
        </Routes>
        <script src="/build/client.entry.js" />
      </body>
    </html>
  );
}
```

Here's a simple express server that renders the app on the server. Note the use of `StaticRouter`.

```js filename=server.entry.js
import express from "express";
import ReactDOMServer from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import App from "./App";

let app = express();

app.get("*", (req, res) => {
  let html = ReactDOMServer.renderToString(
    <StaticRouter location={req.url}>
      <App />
    </StaticRouter>
  );
  res.send("<!DOCTYPE html>" + html);
});

app.listen(3000);
```

And finally, you'll need a similar file to "hydrate" the app with your JavaScript bundle that includes the very same `App` component. Note the use of `BrowserRouter` instead of `StaticRouter`.

```js filename=client.entry.js
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

ReactDOM.hydrate(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.documentElement
);
```

The only real differences from the client entry are:

- `StaticRouter` instead of `BrowserRouter`
- passing the URL from the server to `<StaticRouter url>`
- Using `ReactDOMServer.renderToString` instead of `ReactDOM.render`.

Some parts you'll need to do yourself for this to work:

- How to bundle the code to work in the browser and server
- How to know where the client entry is for `<script>` in the `<App>` component.
- Figuring out data loading (especially for the `<title>`).

Again, we recommend you give [Remix](https://remix.run) a look. It's the best way to server render a React Router app--and perhaps the best way to build any React app 😉.