# Feature Overview

## Client Side Routing

React Router enables "client side routing".

In traditional websites, the browser requests a document from a web server, downloads and evaluates CSS and JavaScript assets, and renders the HTML sent from the server. When the user clicks a link, it starts the process all over again for a new page.

Client side routing allows your app to update the URL from a link click without making another request for another document from the server. Instead, your app can immediately render some new UI and make data requests with `fetch` to update the page with new information.

This enables faster user experiences because the browser doesn't need to request an entirely new document or re-evaluate CSS and JavaScript assets for the next page. It also enables more dynamic user experiences with things like animation.

Client side routing is enabled by creating a `Router` and linking/submitting to pages with `Link` and `<Form>`:

```jsx [10,16,27]
import React from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <div>
        <h1>Hello World</h1>
        <Link to="about">About Us</Link>
      </div>
    ),
  },
  {
    path: "about",
    element: <div>About</div>,
  },
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
```

## Nested Routes

Nested Routing is the general idea of coupling segments of the URL to component hierarchy and data. React Router's nested routes were inspired by the routing system in Ember.js circa 2014. The Ember team realized that in nearly every case, segments of the URL determine:

- The layouts to render on the page
- The data dependencies of those layouts

React Router embraces this convention with APIs for creating nested layouts coupled to URL segments and data.

```jsx
// Configure nested routes with JSX
createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />}>
      <Route path="contact" element={<Contact />} />
      <Route
        path="dashboard"
        element={<Dashboard />}
        loader={({ request }) =>
          fetch("/api/dashboard.json", {
            signal: request.signal,
          })
        }
      />
      <Route element={<AuthLayout />}>
        <Route
          path="login"
          element={<Login />}
          loader={redirectIfUser}
        />
        <Route path="logout" />
      </Route>
    </Route>
  )
);

// Or use plain objects
createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "contact",
        element: <Contact />,
      },
      {
        path: "dashboard",
        element: <Dashboard />,
        loader: ({ request }) =>
          fetch("/api/dashboard.json", {
            signal: request.signal,
          }),
      },
      {
        element: <AuthLayout />,
        children: [
          {
            path: "login",
            element: <Login />,
            loader: redirectIfUser,
          },
          {
            path: "logout",
            action: logoutUser,
          },
        ],
      },
    ],
  },
]);
```

This [visualization](https://remix.run/_docs/routing) might be helpful.

## Dynamic Segments

Segments of the URL can be dynamic placeholders that are parsed and provided to various apis.

```jsx
<Route path="projects/:projectId/tasks/:taskId" />
```

The two segments with `:` are dynamic, and provided to the following APIs:

```jsx
// If the current location is /projects/abc/tasks/3
<Route
  // sent to loaders
  loader={({ params }) => {
    params.projectId; // abc
    params.taskId; // 3
  }}
  // and actions
  action={({ params }) => {
    params.projectId; // abc
    params.taskId; // 3
  }}
  element={<Task />}
/>;

function Task() {
  // returned from `useParams`
  const params = useParams();
  params.projectId; // abc
  params.taskId; // 3
}

function Random() {
  const match = useMatch(
    "/projects/:projectId/tasks/:taskId"
  );
  match.params.projectId; // abc
  match.params.taskId; // 3
}
```

See:

- [`<Route path>`][path]
- [`<Route loader>`][loader]
- [`<Route action>`][action]
- [`useParams`][useparams]
- [`useMatch`][usematch]

## Ranked Route Matching

When matching URLs to routes, React Router will rank the routes according to the number of segments, static segments, dynamic segments, splats, etc. and pick the _most specific_ match.

For example, consider these two routes:

```jsx
<Route path="/teams/:teamId" />
<Route path="/teams/new" />
```

Now consider the URL is http://example.com/teams/new.

Even though both routes technically match the URL (`new` could be the `:teamId`), you intuitively know that we want the second route (`/teams/new`) to be picked. React Router's matching algorithm knows that, too.

With ranked routes, you don't have to worry about route ordering.

## Active Links

Most web apps have persistent navigation sections at the top of the UI, the sidebar, and often multiple levels. Styling the active navigation items so the user knows where they are (`isActive`) or where they're going (`isPending`) in the app is done easily with `<NavLink>`.

```jsx
<NavLink
  style={({ isActive, isPending }) => {
    return {
      color: isActive ? "red" : "inherit",
    };
  }}
  className={({ isActive, isPending }) => {
    return isActive ? "active" : isPending ? "pending" : "";
  }}
/>
```

You can also [`useMatch`][usematch] for any other "active" indication outside of links.

```jsx
function SomeComp() {
  const match = useMatch("/messages");
  return <li className={Boolean(match) ? "active" : ""} />;
}
```

See:

- [`NavLink`][navlink]
- [`useMatch`][usematch]

## Relative Links

Like HTML `<a href>`, `<Link to>` and `<NavLink to>` can take relative paths, with enhanced behavior with nested routes.

Given the following route config:

```jsx
<Route path="home" element={<Home />}>
  <Route path="project/:projectId" element={<Project />}>
    <Route path=":taskId" element={<Task />} />
  </Route>
</Route>
```

Consider the url https://example.com/home/project/123, which renders the following route component hierarchy:

```jsx
<Home>
  <Project />
</Home>
```

If `<Project />` renders the following links, the hrefs of the links will resolve like so:

| In `<Project>` @ `/home/project/123` | Resolved `<a href>`     |
| ------------------------------------ | ----------------------- |
| `<Link to="abc">`                    | `/home/project/123/abc` |
| `<Link to=".">`                      | `/home/project/123`     |
| `<Link to="..">`                     | `/home`                 |
| `<Link to=".." relative="path">`     | `/home/project`         |

Note that the first `..` removes both segments of the `project/:projectId` route. By default, the `..` in relative links traverse the route hierarchy, not the URL segments. Adding `relative="path"` in the next example allows you to traverse the path segments instead.

Relative links are always relative to the route path they are _rendered in_, not to the full URL. That means if the user navigates deeper with `<Link to="abc">` to `<Task />` at the URL `/home/project/123/abc`, the hrefs in `<Project>` will not change (contrary to plain `<a href>`, a common problem with client side routers).

## Data Loading

Because URL segments usually map to your app's persistent data, React Router provides conventional data loading hooks to initiate data loading during a navigation. Combined with nested routes, all of the data for multiple layouts at a specific URL can be loaded in parallel.

```jsx
<Route
  path="/"
  loader={async ({ request }) => {
    // loaders can be async functions
    const res = await fetch("/api/user.json", {
      signal: request.signal,
    });
    const user = await res.json();
    return user;
  }}
  element={<Root />}
>
  <Route
    path=":teamId"
    // loaders understand Fetch Responses and will automatically
    // unwrap the res.json(), so you can simply return a fetch
    loader={({ params }) => {
      return fetch(`/api/teams/${params.teamId}`);
    }}
    element={<Team />}
  >
    <Route
      path=":gameId"
      loader={({ params }) => {
        // of course you can use any data store
        return fakeSdk.getTeam(params.gameId);
      }}
      element={<Game />}
    />
  </Route>
</Route>
```

Data is made available to your components through `useLoaderData`.

```jsx
function Root() {
  const user = useLoaderData();
  // data from <Route path="/">
}

function Team() {
  const team = useLoaderData();
  // data from <Route path=":teamId">
}

function Game() {
  const game = useLoaderData();
  // data from <Route path=":gameId">
}
```

When the user visits or clicks links to https://example.com/real-salt-lake/45face3, all three route loaders will be called and loaded in parallel, before the UI for that URL renders.

## Redirects

While loading or changing data, it's common to [redirect][redirect] the user to a different route.

```jsx
<Route
  path="dashboard"
  loader={async () => {
    const user = await fake.getUser();
    if (!user) {
      // if you know you can't render the route, you can
      // throw a redirect to stop executing code here,
      // sending the user to a new route
      throw redirect("/login");
    }

    // otherwise continue
    const stats = await fake.getDashboardStats();
    return { user, stats };
  }}
/>
```

```jsx
<Route
  path="project/new"
  action={async ({ request }) => {
    const data = await request.formData();
    const newProject = await createProject(data);
    // it's common to redirect after actions complete,
    // sending the user to the new record
    return redirect(`/projects/${newProject.id}`);
  }}
/>
```

See:

- [`redirect`][redirect]
- [Throwing in Loaders][throwing]
- [`useNavigate`][usenavigate]

## Pending Navigation UI

When users navigate around the app, the data for the next page is loaded before the page is rendered. It's important to provide user feedback during this time so the app doesn't feel like it's unresponsive.

```jsx lines=[2,5]
function Root() {
  const navigation = useNavigation();
  return (
    <div>
      {navigation.state === "loading" && <GlobalSpinner />}
      <FakeSidebar />
      <Outlet />
      <FakeFooter />
    </div>
  );
}
```

See:

- [`useNavigation`][usenavigation]

## Skeleton UI with `<Suspense>`

Instead of waiting for the data for the next page, you can [`defer`][defer] data so the UI flips over to the next screen with placeholder UI immediately while the data loads.

```jsx lines=[12,22-29,32-35,42]
<Route
  path="issue/:issueId"
  element={<Issue />}
  loader={async ({ params }) => {
    // these are promises, but *not* awaited
    const comments = fake.getIssueComments(params.issueId);
    const history = fake.getIssueHistory(params.issueId);
    // the issue, however, *is* awaited
    const issue = await fake.getIssue(params.issueId);

    // defer enables suspense for the un-awaited promises
    return defer({ issue, comments, history });
  }}
/>;

function Issue() {
  const { issue, history, comments } = useLoaderData();
  return (
    <div>
      <IssueDescription issue={issue} />

      {/* Suspense provides the placeholder fallback */}
      <Suspense fallback={<IssueHistorySkeleton />}>
        {/* Await manages the deferred data (promise) */}
        <Await resolve={history}>
          {/* this calls back when the data is resolved */}
          {(resolvedHistory) => (
            <IssueHistory history={resolvedHistory} />
          )}
        </Await>
      </Suspense>

      <Suspense fallback={<IssueCommentsSkeleton />}>
        <Await resolve={comments}>
          {/* ... or you can use hooks to access the data */}
          <IssueComments />
        </Await>
      </Suspense>
    </div>
  );
}

function IssueComments() {
  const comments = useAsyncValue();
  return <div>{/* ... */}</div>;
}
```

See

- [Deferred Data Guide][deferreddata]
- [`defer`][defer]
- [`Await`][await]
- [`useAsyncValue`][useasyncvalue]

## Data Mutations

HTML forms are navigation events, just like links. React Router supports HTML form workflows with client side routing.

When a form is submitted, the normal browser navigation event is prevented and a [`Request`][request], with a body containing the [`FormData`][formdata] of the submission, is created. This request is sent to the `<Route action>` that matches the form's `<Form action>`.

Form elements's `name` prop are submitted to the action:

```jsx
<Form action="/project/new">
  <label>
    Project title
    <br />
    <input type="text" name="title" />
  </label>

  <label>
    Target Finish Date
    <br />
    <input type="date" name="due" />
  </label>
</Form>
```

The normal HTML document request is prevented and sent to the matching route's action (`<Route path>` that matches the `<form action>`), including the `request.formData`.

```jsx
<Route
  path="project/new"
  action={async ({ request }) => {
    const formData = await request.formData();
    const newProject = await createProject({
      title: formData.get("title"),
      due: formData.get("due"),
    });
    return redirect(`/projects/${newProject.id}`);
  }}
/>
```

## Data Revalidation

Decades old web conventions indicate that when a form is posted to the server, data is changing and a new page is rendered. That convention is followed in React Router's HTML-based data mutation APIs.

After route actions are called, the loaders for all of the data on the page is called again to ensure the UI stays up-to-date with the data automatically. No cache keys to expire, no context providers to reload.

See:

- [Tutorial "Creating Contacts"][creatingcontacts]

## Busy Indicators

When forms are being submitted to route actions, you have access to the navigation state to display busy indicators, disable fieldsets, etc.

```jsx lines=[2,3,6,19-21]
function NewProjectForm() {
  const navigation = useNavigation();
  const busy = navigation.state === "submitting";
  return (
    <Form action="/project/new">
      <fieldset disabled={busy}>
        <label>
          Project title
          <br />
          <input type="text" name="title" />
        </label>

        <label>
          Target Finish Date
          <br />
          <input type="date" name="due" />
        </label>
      </fieldset>
      <button type="submit" disabled={busy}>
        {busy ? "Creating..." : "Create"}
      </button>
    </Form>
  );
}
```

See:

- [`useNavigation`][usenavigation]

## Optimistic UI

Knowing the [`formData`][formdata] being sent to an [action][action] is often enough to skip the busy indicators and render the UI in the next state immediately, even if your asynchronous work is still pending. This is called "optimistic UI".

```jsx
function LikeButton({ tweet }) {
  const fetcher = useFetcher();

  // if there is `formData` then it is posting to the action
  const liked = fetcher.formData
    ? // check the formData to be optimistic
      fetcher.formData.get("liked") === "yes"
    : // if its not posting to the action, use the record's value
      tweet.liked;

  return (
    <fetcher.Form method="post" action="toggle-liked">
      <button
        type="submit"
        name="liked"
        value={liked ? "yes" : "no"}
      />
    </fetcher.Form>
  );
}
```

(Yes, HTML buttons can have a `name` and a `value`).

While it is more common to do optimistic UI with a [`fetcher`][fetcher], you can do the same with a normal form using [`navigation.formData`][navigationformdata].

## Data Fetchers

HTML Forms are the model for mutations but they have one major limitation: you can have only one at a time because a form submission is a navigation.

Most web apps need to allow for multiple mutations to be happening at the same time, like a list of records where each can be independently deleted, marked complete, liked, etc.

[Fetchers][fetcher] allow you to interact with the route [actions][action] and [loaders][loader] without causing a navigation in the browser, but still getting all the conventional benefits like error handling, revalidation, interruption handling, and race condition handling.

Imagine a list of tasks:

```jsx
function Tasks() {
  const tasks = useLoaderData();
  return tasks.map((task) => (
    <div>
      <p>{task.name}</p>
      <ToggleCompleteButton task={task} />
    </div>
  ));
}
```

Each task can be marked complete independently of the rest, with its own pending state and without causing a navigation with a [fetcher][fetcher]:

```jsx
function ToggleCompleteButton({ task }) {
  const fetcher = useFetcher();

  return (
    <fetcher.Form method="post" action="/toggle-complete">
      <fieldset disabled={fetcher.state !== "idle"}>
        <input type="hidden" name="id" value={task.id} />
        <input
          type="hidden"
          name="status"
          value={task.complete ? "incomplete" : "complete"}
        />
        <button type="submit">
          {task.status === "complete"
            ? "Mark Incomplete"
            : "Mark Complete"}
        </button>
      </fieldset>
    </fetcher.Form>
  );
}
```

See:

- [`useFetcher`][fetcher]

## Race Condition Handling

React Router will cancel stale operations and only commit fresh data automatically.

Any time you have asynchronous UI you have the risk of race conditions: when an async operation starts after but completes before an earlier operation. The result is a user interface that shows the wrong state.

Consider a search field that updates a list as the user types:

```
?q=ry    |---------------|
                         ^ commit wrong state
?q=ryan     |--------|
                     ^ lose correct state
```

Even though the query for `q?=ryan` went out later, it completed earlier. If not handled correctly, the results will briefly be the correct values for `?q=ryan` but then flip over the incorrect results for `?q=ry`. Throttling and debouncing are not enough (you can still interrupt the requests that get through). You need cancellation.

If you're using React Router's data conventions you avoid this problem completely and automatically.

```
?q=ry    |-----------X
                     ^ cancel wrong state when
                       correct state completes earlier
?q=ryan     |--------|
                     ^ commit correct state
```

Not only does React Router handle race conditions for a navigation like this, it also handles it for many other cases like loading results for an autocomplete or performing multiple concurrent mutations with [`fetcher`][fetcher] (and its automatic, concurrent revalidations).

## Error Handling

The vast majority of your application errors are handled automatically by React Router. It will catch any errors that are thrown while:

- rendering
- loading data
- updating data

In practice, this is pretty much every error in your app except those thrown in event handlers (`<button onClick>`) or `useEffect`. React Router apps tend to have very few of either.

When an error is thrown, instead of rendering the route's [`element`][element], the [`errorElement`][errorelement] is rendered.

```jsx
<Route
  path="/"
  loader={() => {
    something.that.throws.an.error();
  }}
  // this will not be rendered
  element={<HappyPath />}
  // but this will instead
  errorElement={<ErrorBoundary />}
/>
```

If a route doesn't have an `errorElement`, the error will bubble to the nearest parent route with an `errorElement`:

```jsx
<Route
  path="/"
  element={<HappyPath />}
  errorElement={<ErrorBoundary />}
>
  {/* Errors here bubble up to the parent route */}
  <Route path="login" element={<Login />} />
</Route>
```

See:

- [`<Route errorElement>`][errorelement]
- [`useRouteError`][userouteerror]

## Scroll Restoration

React Router will emulate the browser's scroll restoration on navigation, waiting for data to load before scrolling. This ensures the scroll position is restored to the right spot.

You can also customize the behavior by restoring based on something other than locations (like a url pathname) and preventing the scroll from happening on certain links (like tabs in the middle of a page).

See:

- [`<ScrollRestoration>`][scrollrestoration]

## Web Standard APIs

React Router is built on web standard APIs. [Loaders][loader] and [actions][action] receive standard Web Fetch API [`Request`][request] objects and can return [`Response`][response] objects, too. Cancellation is done with [Abort Signals][signal], search params are handled with [`URLSearchParams`][urlsearchparams], and data mutations are handled with [HTML Forms][htmlform].

When you get better at React Router, you get better at the web platform.

## Search Params

<docs-info>TODO:</docs-info>

## Location State

<docs-info>TODO:</docs-info>

[path]: ../route/route#path
[loader]: ../route/loader
[action]: ../route/action
[useparams]: ../hooks/use-params
[usematch]: ../hooks/use-match
[navlink]: ../components/nav-link
[redirect]: ../fetch/redirect
[throwing]: ../route/loader#throwing-in-loaders
[usenavigate]: ../hooks/use-navigate
[useparams]: ../hooks/use-params
[usematch]: ../hooks/use-match
[defer]: ../utils/defer
[await]: ../components/await
[useasyncvalue]: ../hooks/use-async-value
[deferreddata]: ../guides/deferred
[usenavigation]: ../hooks/use-navigation
[request]: https://developer.mozilla.org/en-US/docs/Web/API/Request
[formdata]: https://developer.mozilla.org/en-US/docs/Web/API/FormData
[creatingcontacts]: ../start/tutorial#creating-contacts
[navigationformdata]: ../hooks/use-navigation#navigationformdata
[fetcher]: ../hooks/use-fetcher
[errorelement]: ../route/error-element
[userouteerror]: ../hooks/use-route-error
[element]: ../route/route#element
[scrollrestoration]: ../components/scroll-restoration
[request]: https://developer.mozilla.org/en-US/docs/Web/API/Request
[response]: https://developer.mozilla.org/en-US/docs/Web/API/Response
[signal]: https://developer.mozilla.org/en-US/docs/Web/API/AbortSignal
[urlsearchparams]: https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams
[htmlform]: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form

# Tutorial

Welcome to the tutorial! We'll be building a small, but feature-rich app that lets you keep track of your contacts. We expect it to take between 30-60m if you're following along.

![Alt text](https://reactrouter.com/_docs/tutorial/15.webp "a title")

👉 **Every time you see this it means you need to do something in the app!**

The rest is just there for your information and deeper understanding. Let's get to it.

## Setup

<docs-info>If you're not going to follow along in your own app, you can skip this section</docs-info>

We'll be using [Vite][vite] for our bundler and dev server for this tutorial. You'll need [Node.js][node] installed for the `npm` command line tool.

👉️ **Open up your terminal and bootstrap a new React app with Vite:**

```sh
npm create vite@latest name-of-your-project -- --template react
# follow prompts
cd <your new project directory>
npm install react-router-dom localforage match-sorter sort-by
npm run dev
```

You should be able to visit the URL printed in the terminal:

```
 VITE v3.0.7  ready in 175 ms

  ➜  Local:   http://127.0.0.1:5173/
  ➜  Network: use --host to expose
```

We've got some pre-written CSS for this tutorial so we can stay focused on React Router. Feel free to judge it harshly or write your own 😅 (We did things we normally wouldn't in CSS so that the markup in this tutorial could stay as minimal as possible.)

👉 **Copy/Paste the tutorial CSS [found here][tutorial-css] into `src/index.css`**

This tutorial will be creating, reading, searching, updating, and deleting data. A typical web app would probably be talking to an API on your web server, but we're going to use browser storage and fake some network latency to keep this focused. None of this code is relevant to React Router, so just go ahead and copy/paste it all.

👉 **Copy/Paste the tutorial data module [found here][tutorial-data] into `src/contacts.js`**

All you need in the src folder are `contacts.js`, `main.jsx`, and `index.css`. You can delete anything else (like `App.js` and `assets`, etc.).

👉 **Delete unused files in `src/` so all you have left are these:**

```
src
├── contacts.js
├── index.css
└── main.jsx
```

If your app is running, it might blow up momentarily, just keep going 😋. And with that, we're ready to get started!

## Adding a Router

First thing to do is create a [Browser Router][createbrowserrouter] and configure our first route. This will enable client side routing for our web app.

The `main.jsx` file is the entry point. Open it up and we'll put React Router on the page.

👉 **Create and render a [browser router][createbrowserrouter] in `main.jsx`**

```jsx lines=[3-6,9-14,18] filename=src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <div>Hello world!</div>,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
```

This first route is what we often call the "root route" since the rest of our routes will render inside of it. It will serve as the root layout of the UI, we'll have nested layouts as we get farther along.

## The Root Route

Let's add the global layout for this app.

👉 **Create `src/routes` and `src/routes/root.jsx`**

```sh
mkdir src/routes
touch src/routes/root.jsx
```

<small>(If you don't want to be a command line nerd, use your editor instead of those commands 🤓)</small>

👉 **Create the root layout component**

```jsx filename=src/routes/root.jsx
export default function Root() {
  return (
    <>
      <div id="sidebar">
        <h1>React Router Contacts</h1>
        <div>
          <form id="search-form" role="search">
            <input
              id="q"
              aria-label="Search contacts"
              placeholder="Search"
              type="search"
              name="q"
            />
            <div
              id="search-spinner"
              aria-hidden
              hidden={true}
            />
            <div
              className="sr-only"
              aria-live="polite"
            ></div>
          </form>
          <form method="post">
            <button type="submit">New</button>
          </form>
        </div>
        <nav>
          <ul>
            <li>
              <a href={`/contacts/1`}>Your Name</a>
            </li>
            <li>
              <a href={`/contacts/2`}>Your Friend</a>
            </li>
          </ul>
        </nav>
      </div>
      <div id="detail"></div>
    </>
  );
}
```

Nothing React Router specific yet, so feel free to copy/paste all of that.

👉 **Set `<Root>` as the root route's [`element`][routeelement]**

```jsx filename=src/main.jsx lines=[2,7]
/* existing imports */
import Root from "./routes/root";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
```

The app should look something like this now. It sure is nice having a designer who can also write the CSS, isn't it? (Thank you [Jim][jim] 🙏).

![Alt text](https://reactrouter.com/_docs/tutorial/01.webp "a title")

## Handling Not Found Errors

It's always a good idea to know how your app responds to errors early in the project because we all write far more bugs than features when building a new app! Not only will your users get a good experience when this happens, but it helps you during development as well.

We added some links to this app, let's see what happens when we click them?

👉 **Click one of the sidebar names**

![Alt text](https://reactrouter.com/_docs/tutorial/02.webp "a title")


Gross! This is the default error screen in React Router, made worse by our flex box styles on the root element in this app 😂.

Anytime your app throws an error while rendering, loading data, or performing data mutations, React Router will catch it and render an error screen. Let's make our own error page.

👉 **Create an error page component**

```sh
touch src/error-page.jsx
```

```jsx filename=src/error-page.jsx
import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
}
```

👉 **Set the `<ErrorPage>` as the [`errorElement`][errorelement] on the root route**

```jsx filename=src/main.jsx lines=[2,8]
/* previous imports */
import ErrorPage from "./error-page";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
```

The error page should now look like this:

![Alt text](https://reactrouter.com/_docs/tutorial/03.webp "a title")

<small>(Well, that's not much better. Maybe somebody forgot to ask the designer to make an error page. Maybe everybody forgets to ask the designer to make an error page and then blames the designer for not thinking of it 😆)</small>

Note that [`useRouteError`][userouteerror] provides the error that was thrown. When the user navigates to routes that don't exist you'll get an [error response][isrouteerrorresponse] with a "Not Found" `statusText`. We'll see some other errors later in the tutorial and discuss them more.

For now, it's enough to know that pretty much all of your errors will now be handled by this page instead of infinite spinners, unresponsive pages, or blank screens 🙌

## The Contact Route UI

Instead of a 404 "Not Found" page, we want to actually render something at the URLs we've linked to. For that, we need to make a new route.

👉 **Create the contact route module**

```sh
touch src/routes/contact.jsx
```

👉 **Add the contact component UI**

It's just a bunch of elements, feel free to copy/paste.

```jsx filename=src/routes/contact.jsx
import { Form } from "react-router-dom";

export default function Contact() {
  const contact = {
    first: "Your",
    last: "Name",
    avatar: "https://placekitten.com/g/200/200",
    twitter: "your_handle",
    notes: "Some notes",
    favorite: true,
  };

  return (
    <div id="contact">
      <div>
        <img
          key={contact.avatar}
          src={contact.avatar || null}
        />
      </div>

      <div>
        <h1>
          {contact.first || contact.last ? (
            <>
              {contact.first} {contact.last}
            </>
          ) : (
            <i>No Name</i>
          )}{" "}
          <Favorite contact={contact} />
        </h1>

        {contact.twitter && (
          <p>
            <a
              target="_blank"
              href={`https://twitter.com/${contact.twitter}`}
            >
              {contact.twitter}
            </a>
          </p>
        )}

        {contact.notes && <p>{contact.notes}</p>}

        <div>
          <Form action="edit">
            <button type="submit">Edit</button>
          </Form>
          <Form
            method="post"
            action="destroy"
            onSubmit={(event) => {
              if (
                !confirm(
                  "Please confirm you want to delete this record."
                )
              ) {
                event.preventDefault();
              }
            }}
          >
            <button type="submit">Delete</button>
          </Form>
        </div>
      </div>
    </div>
  );
}

function Favorite({ contact }) {
  // yes, this is a `let` for later
  let favorite = contact.favorite;
  return (
    <Form method="post">
      <button
        name="favorite"
        value={favorite ? "false" : "true"}
        aria-label={
          favorite
            ? "Remove from favorites"
            : "Add to favorites"
        }
      >
        {favorite ? "★" : "☆"}
      </button>
    </Form>
  );
}
```

Now that we've got a component, let's hook it up to a new route.

👉 **Import the contact component and create a new route**

```js filename=main.jsx lines=[2,10-13]
/* existing imports */
import Contact from "./routes/contact";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
  },
  {
    path: "contacts/:contactId",
    element: <Contact />,
  },
]);

/* existing code */
```

Now if we click one of the links or visit `/contacts/1` we get our new component!

![Alt text](https://reactrouter.com/_docs/tutorial/04.webp "a title")

However, it's not inside of our root layout 😠

## Nested Routes

We want the contact component to render _inside_ of the `<Root>` layout like this.

![Alt text](https://reactrouter.com/_docs/tutorial/05.webp "a title")

We do it by making the contact route a _child_ of the root route.

👉 **Move the contacts route to be a child of the root route**

```jsx filename=src/main.jsx lines=[6-11]
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "contacts/:contactId",
        element: <Contact />,
      },
    ],
  },
]);
```

You'll now see the root layout again but a blank page on the right. We need to tell the root route _where_ we want it to render its child routes. We do that with [`<Outlet>`][outlet].

Find the `<div id="detail">` and put an outlet inside

👉 **Render an [`<Outlet>`][outlet]**

```jsx filename=src/routes/root.jsx lines=[1,8]
import { Outlet } from "react-router-dom";

export default function Root() {
  return (
    <>
      {/* all the other elements */}
      <div id="detail">
        <Outlet />
      </div>
    </>
  );
}
```

## Client Side Routing

You may or may not have noticed, but when we click the links in the sidebar, the browser is doing a full document request for the next URL instead of using React Router.

Client side routing allows our app to update the URL without requesting another document from the server. Instead, the app can immediately render new UI. Let's make it happen with [`<Link>`][link].

👉 **Change the sidebar `<a href>` to `<Link to>`**

```jsx filename=src/routes/root.jsx lines=[1,12,15]
import { Outlet, Link } from "react-router-dom";

export default function Root() {
  return (
    <>
      <div id="sidebar">
        {/* other elements */}

        <nav>
          <ul>
            <li>
              <Link to={`contacts/1`}>Your Name</Link>
            </li>
            <li>
              <Link to={`contacts/2`}>Your Friend</Link>
            </li>
          </ul>
        </nav>

        {/* other elements */}
      </div>
    </>
  );
}
```

You can open the network tab in the browser devtools to see that it's not requesting documents anymore.

## Loading Data

URL segments, layouts, and data are more often than not coupled (tripled?) together. We can see it in this app already:

| URL Segment  | Component   | Data               |
| ------------ | ----------- | ------------------ |
| /            | `<Root>`    | list of contacts   |
| contacts/:id | `<Contact>` | individual contact |

Because of this natural coupling, React Router has data conventions to get data into your route components easily.

There are two APIs we'll be using to load data, [`loader`][loader] and [`useLoaderData`][useloaderdata]. First we'll create and export a loader function in the root module, then we'll hook it up to the route. Finally, we'll access and render the data.

👉 **Export a loader from `root.jsx`**

```jsx filename=src/routes/root.jsx lines=[2,4-7]
import { Outlet, Link } from "react-router-dom";
import { getContacts } from "../contacts";

export async function loader() {
  const contacts = await getContacts();
  return { contacts };
}
```

👉 **Configure the loader on the route**

```jsx filename=src/main.jsx lines=[2,9]
/* other imports */
import Root, { loader as rootLoader } from "./routes/root";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    loader: rootLoader,
    children: [
      {
        path: "contacts/:contactId",
        element: <Contact />,
      },
    ],
  },
]);
```

👉 **Access and render the data**

```jsx filename=src/routes/root.jsx lines=[4,11,19-40]
import {
  Outlet,
  Link,
  useLoaderData,
} from "react-router-dom";
import { getContacts } from "../contacts";

/* other code */

export default function Root() {
  const { contacts } = useLoaderData();
  return (
    <>
      <div id="sidebar">
        <h1>React Router Contacts</h1>
        {/* other code */}

        <nav>
          {contacts.length ? (
            <ul>
              {contacts.map((contact) => (
                <li key={contact.id}>
                  <Link to={`contacts/${contact.id}`}>
                    {contact.first || contact.last ? (
                      <>
                        {contact.first} {contact.last}
                      </>
                    ) : (
                      <i>No Name</i>
                    )}{" "}
                    {contact.favorite && <span>★</span>}
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p>
              <i>No contacts</i>
            </p>
          )}
        </nav>

        {/* other code */}
      </div>
    </>
  );
}
```

That's it! React Router will now automatically keep that data in sync with your UI. We don't have any data yet, so you're probably getting a blank list like this:

![Alt text](https://reactrouter.com/_docs/tutorial/06.webp "a title")

## Data Writes + HTML Forms

We'll create our first contact in a second, but first let's talk about HTML.

React Router emulates HTML Form navigation as the data mutation primitive, according to web development before the JavaScript cambrian explosion. It gives you the UX capabilities of client rendered apps with the simplicity of the "old school" web model.

While unfamiliar to some web developers, HTML forms actually cause a navigation in the browser, just like clicking a link. The only difference is in the request: links can only change the URL while forms can also change the request method (GET vs POST) and the request body (POST form data).

Without client side routing, the browser will serialize the form's data automatically and send it to the server as the request body for POST, and as URLSearchParams for GET. React Router does the same thing, except instead of sending the request to the server, it uses client side routing and sends it to a route [`action`][action].

We can test this out by clicking the "New" button in our app. The app should blow up because the Vite server isn't configured to handle a POST request (it sends a 404, though it should probably be a 405 🤷).

![Alt text](https://reactrouter.com/_docs/tutorial/07.webp "a title")

Instead of sending that POST to the Vite server to create a new contact, let's use client side routing instead.

## Creating Contacts

We'll create new contacts by exporting an `action` in our root route, wiring it up to the route config, and changing our `<form>` to a React Router [`<Form>`][form].

👉 **Create the action and change `<form>` to `<Form>`**

```jsx filename=src/routes/root.jsx lines=[5,7,9-12,24-26]
import {
  Outlet,
  Link,
  useLoaderData,
  Form,
} from "react-router-dom";
import { getContacts, createContact } from "../contacts";

export async function action() {
  const contact = await createContact();
  return { contact };
}

/* other code */

export default function Root() {
  const { contacts } = useLoaderData();
  return (
    <>
      <div id="sidebar">
        <h1>React Router Contacts</h1>
        <div>
          {/* other code */}
          <Form method="post">
            <button type="submit">New</button>
          </Form>
        </div>

        {/* other code */}
      </div>
    </>
  );
}
```

👉 **Import and set the action on the route**

```jsx filename=src/main.jsx lines=[5,14]
/* other imports */

import Root, {
  loader as rootLoader,
  action as rootAction,
} from "./routes/root";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    loader: rootLoader,
    action: rootAction,
    children: [
      {
        path: "contacts/:contactId",
        element: <Contact />,
      },
    ],
  },
]);
```

That's it! Go ahead and click the "New" button and you should see a new record pop into the list 🥳

![Alt text](https://reactrouter.com/_docs/tutorial/08.webp "a title")

The `createContact` method just creates an empty contact with no name or data or anything. But it does still create a record, promise!

> 🧐 Wait a sec ... How did the sidebar update? Where did we call the `action`? Where's the code to refetch the data? Where are `useState`, `onSubmit` and `useEffect`?!

This is where the "old school web" programming model shows up. As we discussed earlier, [`<Form>`][form] prevents the browser from sending the request to the server and sends it to your route `action` instead. In web semantics, a POST usually means some data is changing. By convention, React Router uses this as a hint to automatically revalidate the data on the page after the action finishes. That means all of your `useLoaderData` hooks update and the UI stays in sync with your data automatically! Pretty cool.

## URL Params in Loaders

👉 **Click on the No Name record**

We should be seeing our old static contact page again, with one difference: the URL now has a real ID for the record.

![Alt text](https://reactrouter.com/_docs/tutorial/09.webp "a title")

Reviewing the route config, the route looks like this:

```jsx
[
  {
    path: "contacts/:contactId",
    element: <Contact />,
  },
];
```

Note the `:contactId` URL segment. The colon (`:`) has special meaning, turning it into a "dynamic segment". Dynamic segments will match dynamic (changing) values in that position of the URL, like the contact ID. We call these values in the URL "URL Params", or just "params" for short.

These [`params`][params] are passed to the loader with keys that match the dynamic segment. For example, our segment is named `:contactId` so the value will be passed as `params.contactId`.

These params are most often used to find a record by ID. Let's try it out.

👉 **Add a loader to the contact page and access data with `useLoaderData`**

```jsx filename=src/routes/contact.jsx lines=[1,2,4-6,9]
import { Form, useLoaderData } from "react-router-dom";
import { getContact } from "../contacts";

export async function loader({ params }) {
  return getContact(params.contactId);
}

export default function Contact() {
  const contact = useLoaderData();
  // existing code
}
```

👉 **Configure the loader on the route**

```jsx filename=src/main.jsx lines=[3,17]
/* existing code */
import Contact, {
  loader as contactLoader,
} from "./routes/contact";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    loader: rootLoader,
    action: rootAction,
    children: [
      {
        path: "contacts/:contactId",
        element: <Contact />,
        loader: contactLoader,
      },
    ],
  },
]);

/* existing code */
```

![Alt text](https://reactrouter.com/_docs/tutorial/10.webp "a title")

## Updating Data

Just like creating data, you update data with [`<Form>`][form]. Let's make a new route at `contacts/:contactId/edit`. Again, we'll start with the component and then wire it up to the route config.

👉 **Create the edit component**

```
touch src/routes/edit.jsx
```

👉 **Add the edit page UI**

Nothing we haven't seen before, feel free to copy/paste:

```jsx filename=src/routes/edit.jsx
import { Form, useLoaderData } from "react-router-dom";

export default function EditContact() {
  const contact = useLoaderData();

  return (
    <Form method="post" id="contact-form">
      <p>
        <span>Name</span>
        <input
          placeholder="First"
          aria-label="First name"
          type="text"
          name="first"
          defaultValue={contact.first}
        />
        <input
          placeholder="Last"
          aria-label="Last name"
          type="text"
          name="last"
          defaultValue={contact.last}
        />
      </p>
      <label>
        <span>Twitter</span>
        <input
          type="text"
          name="twitter"
          placeholder="@jack"
          defaultValue={contact.twitter}
        />
      </label>
      <label>
        <span>Avatar URL</span>
        <input
          placeholder="https://example.com/avatar.jpg"
          aria-label="Avatar URL"
          type="text"
          name="avatar"
          defaultValue={contact.avatar}
        />
      </label>
      <label>
        <span>Notes</span>
        <textarea
          name="notes"
          defaultValue={contact.notes}
          rows={6}
        />
      </label>
      <p>
        <button type="submit">Save</button>
        <button type="button">Cancel</button>
      </p>
    </Form>
  );
}
```

👉 **Add the new edit route**

```jsx filename=src/main.jsx lines=[2,17-21]
/* existing code */
import EditContact from "./routes/edit";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    loader: rootLoader,
    action: rootAction,
    children: [
      {
        path: "contacts/:contactId",
        element: <Contact />,
        loader: contactLoader,
      },
      {
        path: "contacts/:contactId/edit",
        element: <EditContact />,
        loader: contactLoader,
      },
    ],
  },
]);

/* existing code */
```

We want it to be rendered in the root route's outlet, so we made it a sibling to the existing child route.

(You might note we reused the `contactLoader` for this route. This is only because we're being lazy in the tutorial. There is no reason to attempt to share loaders among routes, they usually have their own.)

Alright, clicking the "Edit" button gives us this new UI:

![Alt text](https://reactrouter.com/_docs/tutorial/11.webp "a title")

## Updating Contacts with FormData

The edit route we just created already renders a form. All we need to do to update the record is wire up an action to the route. The form will post to the action and the data will be automatically revalidated.

👉 **Add an action to the edit module**

```jsx filename=src/routes/edit.jsx lines=[4,6,8-13]
import {
  Form,
  useLoaderData,
  redirect,
} from "react-router-dom";
import { updateContact } from "../contacts";

export async function action({ request, params }) {
  const formData = await request.formData();
  const updates = Object.fromEntries(formData);
  await updateContact(params.contactId, updates);
  return redirect(`/contacts/${params.contactId}`);
}

/* existing code */
```

👉 **Wire the action up to the route**

```jsx filename=src/main.jsx lines=[3,23]
/* existing code */
import EditContact, {
  action as editAction,
} from "./routes/edit";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    loader: rootLoader,
    action: rootAction,
    children: [
      {
        path: "contacts/:contactId",
        element: <Contact />,
        loader: contactLoader,
      },
      {
        path: "contacts/:contactId/edit",
        element: <EditContact />,
        loader: contactLoader,
        action: editAction,
      },
    ],
  },
]);

/* existing code */
```

Fill out the form, hit save, and you should see something like this! <small>(Except easier on the eyes and maybe less hairy.)</small>

![Alt text](https://reactrouter.com/_docs/tutorial/12.webp "a title")

## Mutation Discussion

> 😑 It worked, but I have no idea what is going on here...

Let's dig in a bit...

Open up `src/routes/edit.jsx` and look at the form elements. Notice how they each have a name:

```jsx lines=[5] filename=src/routes/edit.jsx
<input
  placeholder="First"
  aria-label="First name"
  type="text"
  name="first"
  defaultValue={contact.first}
/>
```

Without JavaScript, when a form is submitted, the browser will create [`FormData`][formdata] and set it as the body of the request when it sends it to the server. As mentioned before, React Router prevents that and sends the request to your action instead, including the [`FormData`][formdata].

Each field in the form is accessible with `formData.get(name)`. For example, given the input field from above, you could access the first and last names like this:

```jsx lines=[3,4]
export async function action({ request, params }) {
  const formData = await request.formData();
  const firstName = formData.get("first");
  const lastName = formData.get("last");
  // ...
}
```

Since we have a handful of form fields, we used [`Object.fromEntries`][fromentries] to collect them all into an object, which is exactly what our `updateContact` function wants.

```jsx
const updates = Object.fromEntries(formData);
updates.first; // "Some"
updates.last; // "Name"
```

Aside from `action`, none of these APIs we're discussing are provided by React Router: [`request`][request], [`request.formData`][requestformdata], [`Object.fromEntries`][fromentries] are all provided by the web platform.

After we finished the action, note the [`redirect`][redirect] at the end:

```jsx filename=src/routes/edit.jsx lines=[5]
export async function action({ request, params }) {
  const formData = await request.formData();
  const updates = Object.fromEntries(formData);
  await updateContact(params.contactId, updates);
  return redirect(`/contacts/${params.contactId}`);
}
```

Loaders and actions can both [return a `Response`][returningresponses] (makes sense, since they received a [`Request`][request]!). The [`redirect`][redirect] helper just makes it easier to return a [response][response] that tells the app to change locations.

Without client side routing, if a server redirected after a POST request, the new page would fetch the latest data and render. As we learned before, React Router emulates this model and automatically revalidates the data on the page after the action. That's why the sidebar automatically updates when we save the form. The extra revalidation code doesn't exist without client side routing, so it doesn't need to exist with client side routing either!

## Redirecting new records to the edit page

Now that we know how to redirect, let's update the action that creates new contacts to redirect to the edit page:

👉 **Redirect to the new record's edit page**

```jsx filename=src/routes/root.jsx lines=[6,11-12]
import {
  Outlet,
  Link,
  useLoaderData,
  Form,
  redirect,
} from "react-router-dom";
import { getContacts, createContact } from "../contacts";

export async function action() {
  const contact = await createContact();
  return redirect(`/contacts/${contact.id}/edit`);
}
```

Now when we click "New", we should end up on the edit page:

![Alt text](https://reactrouter.com/_docs/tutorial/13.webp "a title")

👉 **Add a handful of records**

I'm going to use the stellar lineup of speakers from the first Remix Conference 😁

![Alt text](https://reactrouter.com/_docs/tutorial/14.webp "a title")

## Active Link Styling

Now that we have a bunch of records, it's not clear which one we're looking at in the sidebar. We can use [`NavLink`][navlink] to fix this.

👉 **Use a `NavLink` in the sidebar**

```jsx filename=src/routes/root.jsx lines=[3,20-31]
import {
  Outlet,
  NavLink,
  useLoaderData,
  Form,
  redirect,
} from "react-router-dom";

export default function Root() {
  return (
    <>
      <div id="sidebar">
        {/* other code */}

        <nav>
          {contacts.length ? (
            <ul>
              {contacts.map((contact) => (
                <li key={contact.id}>
                  <NavLink
                    to={`contacts/${contact.id}`}
                    className={({ isActive, isPending }) =>
                      isActive
                        ? "active"
                        : isPending
                        ? "pending"
                        : ""
                    }
                  >
                    {/* other code */}
                  </NavLink>
                </li>
              ))}
            </ul>
          ) : (
            <p>{/* other code */}</p>
          )}
        </nav>
      </div>
    </>
  );
}
```

Note that we are passing a function to `className`. When the user is at the URL in the `NavLink`, then `isActive` will be true. When it's _about_ to be active (the data is still loading) then `isPending` will be true. This allows us to easily indicate where the user is, as well as provide immediate feedback on links that have been clicked but we're still waiting for data to load.

![Alt text](https://reactrouter.com/_docs/tutorial/15.webp "a title")

## Global Pending UI

As the user navigates the app, React Router will _leave the old page up_ as data is loading for the next page. You may have noticed the app feels a little unresponsive as you click between the list. Let's provide the user with some feedback so the app doesn't feel unresponsive.

React Router is managing all of the state behind the scenes and reveals the pieces of it you need to build dynamic web apps. In this case, we'll use the [`useNavigation`][usenavigation] hook.

👉 **`useNavigation` to add global pending UI**

```jsx filename=src/routes/root.jsx lines=[3,10,17-19]
import {
  // existing code
  useNavigation,
} from "react-router-dom";

// existing code

export default function Root() {
  const { contacts } = useLoaderData();
  const navigation = useNavigation();

  return (
    <>
      <div id="sidebar">{/* existing code */}</div>
      <div
        id="detail"
        className={
          navigation.state === "loading" ? "loading" : ""
        }
      >
        <Outlet />
      </div>
    </>
  );
}
```

[`useNavigation`][usenavigation] returns the current navigation state: it can be one of `"idle" | "submitting" | "loading"`.

In our case, we add a `"loading"` class to the main part of the app if we're not idle. The CSS then adds a nice fade after a short delay (to avoid flickering the UI for fast loads). You could do anything you want though, like show a spinner or loading bar across the top.

![Alt text](https://reactrouter.com/_docs/tutorial/16.webp "a title")

Note that our data model (`src/contact.js`) has a clientside cache, so navigating to the same contact is fast the second time. This behavior is _not_ React Router, it will re-load data for changing routes no matter if you've been there before or not. It does, however, avoid calling the loaders for _unchanging_ routes (like the list) during a navigation.

## Deleting Records

If we review code in the contact route, we can find the delete button looks like this:

```jsx filename=src/routes/contact.jsx lines=[3]
<Form
  method="post"
  action="destroy"
  onSubmit={(event) => {
    if (
      !confirm(
        "Please confirm you want to delete this record."
      )
    ) {
      event.preventDefault();
    }
  }}
>
  <button type="submit">Delete</button>
</Form>
```

Note the `action` points to `"destroy"`. Like `<Link to>`, `<Form action>` can take a _relative_ value. Since the form is rendered in `contact/:contactId`, then a relative action with `destroy` will submit the form to `contact/:contactId/destroy` when clicked.

At this point you should know everything you need to know to make the delete button work. Maybe give it a shot before moving on? You'll need:

1. A new route
2. An `action` at that route
3. `deleteContact` from `src/contacts.js`

👉 **Create the "destroy" route module**

```
touch src/routes/destroy.jsx
```

👉 **Add the destroy action**

```jsx filename=src/routes/destroy.jsx
import { redirect } from "react-router-dom";
import { deleteContact } from "../contacts";

export async function action({ params }) {
  await deleteContact(params.contactId);
  return redirect("/");
}
```

👉 **Add the destroy route to the route config**

```jsx filename=src/main.jsx lines=[2,10-13]
/* existing code */
import { action as destroyAction } from "./routes/destroy";

const router = createBrowserRouter([
  {
    path: "/",
    /* existing root route props */
    children: [
      /* existing routes */
      {
        path: "contacts/:contactId/destroy",
        action: destroyAction,
      },
    ],
  },
]);

/* existing code */
```

Alright, navigate to a record and click the "Delete" button. It works!

> 😅 I'm still confused why this all works

When the user clicks the submit button:

1. `<Form>` prevents the default browser behavior of sending a new POST request to the server, but instead emulates the browser by creating a POST request with client side routing
2. The `<Form action="destroy">` matches the new route at `"contacts/:contactId/destroy"` and sends it the request
3. After the action redirects, React Router calls all of the loaders for the data on the page to get the latest values (this is "revalidation"). `useLoaderData` returns new values and causes the components to update!

Add a form, add an action, React Router does the rest.

## Contextual Errors

Just for kicks, throw an error in the destroy action:

```jsx filename=src/routes/destroy.jsx lines=[2]
export async function action({ params }) {
  throw new Error("oh dang!");
  await deleteContact(params.contactId);
  return redirect("/");
}
```

![Alt text](https://reactrouter.com/_docs/tutorial/17.webp "a title")

Recognize that screen? It's our [`errorElement`][errorelement] from before. The user, however, can't really do anything to recover from this screen except to hit refresh.

Let's create a contextual error message for the destroy route:

```jsx filename=src/main.jsx lines=[6]
[
  /* other routes */
  {
    path: "contacts/:contactId/destroy",
    action: destroyAction,
    errorElement: <div>Oops! There was an error.</div>,
  },
];
```

Now try it again:

![Alt text](https://reactrouter.com/_docs/tutorial/18.webp "a title")

Our user now has more options than slamming refresh, they can continue to interact with the parts of the page that aren't having trouble 🙌

Because the destroy route has its own `errorElement` and is a child of the root route, the error will render there instead of the root. As you probably noticed, these errors bubble up to the nearest `errorElement`. Add as many or as few as you like, as long as you've got one at the root.

## Index Routes

When we load up the app, you'll notice a big blank page on the right side of our list.

![Alt text](https://reactrouter.com/_docs/tutorial/19.webp "a title")

When a route has children, and you're at the parent route's path, the `<Outlet>` has nothing to render because no children match. You can think of index routes as the default child route to fill in that space.

👉 **Create the index route module**

```
touch src/routes/index.jsx
```

👉 **Fill in the index component's elements**

Feel free to copy paste, nothing special here.

```jsx filename=src/routes/index.jsx
export default function Index() {
  return (
    <p id="zero-state">
      This is a demo for React Router.
      <br />
      Check out{" "}
      <a href="https://reactrouter.com">
        the docs at reactrouter.com
      </a>
      .
    </p>
  );
}
```

👉 **Configure the index route**

```jsx filename=src/main.jsx lines=[2,12]
// existing code
import Index from "./routes/index";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    loader: rootLoader,
    action: rootAction,
    children: [
      { index: true, element: <Index /> },
      /* existing routes */
    ],
  },
]);
```

Note the [`{ index:true }`][index] instead of [`{ path: "" }`][path]. That tells the router to match and render this route when the user is at the parent route's exact path, so there are no other child routes to render in the `<Outlet>`.

![Alt text](https://reactrouter.com/_docs/tutorial/20.webp "a title")

Voila! No more blank space. It's common to put dashboards, stats, feeds, etc. at index routes. They can participate in data loading as well.

## Cancel Button

On the edit page we've got a cancel button that doesn't do anything yet. We'd like it to do the same thing as the browser's back button.

We'll need a click handler on the button as well as [`useNavigate`][usenavigate] from React Router.

👉 **Add the cancel button click handler with `useNavigate`**

```jsx filename=src/routes/edit.jsx lines=[5,10,20-22]
import {
  Form,
  useLoaderData,
  redirect,
  useNavigate,
} from "react-router-dom";

export default function EditContact() {
  const contact = useLoaderData();
  const navigate = useNavigate();

  return (
    <Form method="post" id="contact-form">
      {/* existing code */}

      <p>
        <button type="submit">Save</button>
        <button
          type="button"
          onClick={() => {
            navigate(-1);
          }}
        >
          Cancel
        </button>
      </p>
    </Form>
  );
}
```

Now when the user clicks "Cancel", they'll be sent back one entry in the browser's history.

> 🧐 Why is there no `event.preventDefault` on the button?

A `<button type="button">`, while seemingly redundant, is the HTML way of preventing a button from submitting its form.

Two more features to go. We're on the home stretch!

## URL Search Params and GET Submissions

All of our interactive UI so far have been either links that change the URL or forms that post data to actions. The search field is interesting because it's a mix of both: it's a form but it only changes the URL, it doesn't change data.

Right now it's just a normal HTML `<form>`, not a React Router `<Form>`. Let's see what the browser does with it by default:

👉 **Type a name into the search field and hit the enter key**

Note the browser's URL now contains your query in the URL as [URLSearchParams][urlsearchparams]:

```
http://127.0.0.1:5173/?q=ryan
```

If we review the search form, it looks like this:

```jsx filename=src/routes/root.jsx lines=[1,7]
<form id="search-form" role="search">
  <input
    id="q"
    aria-label="Search contacts"
    placeholder="Search"
    type="search"
    name="q"
  />
  <div id="search-spinner" aria-hidden hidden={true} />
  <div className="sr-only" aria-live="polite"></div>
</form>
```

As we've seen before, browsers can serialize forms by the `name` attribute of it's input elements. The name of this input is `q`, that's why the URL has `?q=`. If we named it `search` the URL would be `?search=`.

Note that this form is different from the others we've used, it does not have `<form method="post">`. The default `method` is `"get"`. That means when the browser creates the request for the next document, it doesn't put the form data into the request POST body, but into the [`URLSearchParams`][urlsearchparams] of a GET request.

## GET Submissions with Client Side Routing

Let's use client side routing to submit this form and filter the list in our existing loader.

👉 **Change `<form>` to `<Form>`**

```jsx filename=src/routes/root.jsx lines=[1,11]
<Form id="search-form" role="search">
  <input
    id="q"
    aria-label="Search contacts"
    placeholder="Search"
    type="search"
    name="q"
  />
  <div id="search-spinner" aria-hidden hidden={true} />
  <div className="sr-only" aria-live="polite"></div>
</Form>
```

👉 **Filter the list if there are URLSearchParams**

```jsx filename=src/routes/root.jsx lines=[1,2-4]
export async function loader({ request }) {
  const url = new URL(request.url);
  const q = url.searchParams.get("q");
  const contacts = await getContacts(q);
  return { contacts };
}
```

![Alt text](https://reactrouter.com/_docs/tutorial/21.webp "a title")

Because this is a GET, not a POST, React Router _does not_ call the `action`. Submitting a GET form is the same as clicking a link: only the URL changes. That's why the code we added for filtering is in the `loader`, not the `action` of this route.

This also means it's a normal page navigation. You can click the back button to get back to where you were.

## Synchronizing URLs to Form State

There are a couple of UX issues here that we can take care of quickly.

1. If you click back after a search, the form field still has the value you entered even though the list is no longer filtered.
2. If you refresh the page after searching, the form field no longer has the value in it, even though the list is filtered

In other words, the URL and our form state are out of sync.

👉 **Return `q` from your loader and set it as the search field default value**

```jsx filename=src/routes/root.jsx lines=[7,11,26]
// existing code

export async function loader({ request }) {
  const url = new URL(request.url);
  const q = url.searchParams.get("q");
  const contacts = await getContacts(q);
  return { contacts, q };
}

export default function Root() {
  const { contacts, q } = useLoaderData();
  const navigation = useNavigation();

  return (
    <>
      <div id="sidebar">
        <h1>React Router Contacts</h1>
        <div>
          <Form id="search-form" role="search">
            <input
              id="q"
              aria-label="Search contacts"
              placeholder="Search"
              type="search"
              name="q"
              defaultValue={q}
            />
            {/* existing code */}
          </Form>
          {/* existing code */}
        </div>
        {/* existing code */}
      </div>
      {/* existing code */}
    </>
  );
}
```

That solves problem (2). If you refresh the page now, the input field will show the query.

![Alt text](https://reactrouter.com/_docs/tutorial/21.webp "a title")

Now for problem (1), clicking the back button and updating the input. We can bring in `useEffect` from React to manipulate the form's state in the DOM directly.

👉 **Synchronize input value with the URL Search Params**

```jsx filename=src/routes/root.jsx lines=[1,9-11]
import { useEffect } from "react";

// existing code

export default function Root() {
  const { contacts, q } = useLoaderData();
  const navigation = useNavigation();

  useEffect(() => {
    document.getElementById("q").value = q;
  }, [q]);

  // existing code
}
```

> 🤔 Shouldn't you use a controlled component and React State for this?

You could certainly do this as a controlled component, but you'll end up with more complexity for the same behavior. You don't control the URL, the user does with the back/forward buttons. There would be more synchronization points with a controlled component.

<details>
<summary>If you're still concerned, expand this to see what it would look like</summary>

Notice how controlling the input requires three points of synchronization now instead of just one. The behavior is identical but the code is more complex.

```jsx filename=src/routes/root.jsx lines=[1,6,9-11,25-28]
import { useEffect, useState } from "react";
// existing code

export default function Root() {
  const { contacts, q } = useLoaderData();
  const [query, setQuery] = useState(q);
  const navigation = useNavigation();

  useEffect(() => {
    setQuery(q);
  }, [q]);

  return (
    <>
      <div id="sidebar">
        <h1>React Router Contacts</h1>
        <div>
          <Form id="search-form" role="search">
            <input
              id="q"
              aria-label="Search contacts"
              placeholder="Search"
              type="search"
              name="q"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
              }}
            />
            {/* existing code */}
          </Form>
          {/* existing code */}
        </div>
        {/* existing code */}
      </div>
    </>
  );
}
```

</details>

## Submitting Forms `onChange`

We've got a product decision to make here. For this UI, we'd probably rather have the filtering happen on every key stroke instead of when the form is explicitly submitted.

We've seen `useNavigate` already, we'll use its cousin, [`useSubmit`][usesubmit], for this.

```jsx filename=src/routes/root.jsx lines=[4,10,25-27]
// existing code
import {
  // existing code
  useSubmit,
} from "react-router-dom";

export default function Root() {
  const { contacts, q } = useLoaderData();
  const navigation = useNavigation();
  const submit = useSubmit();

  return (
    <>
      <div id="sidebar">
        <h1>React Router Contacts</h1>
        <div>
          <Form id="search-form" role="search">
            <input
              id="q"
              aria-label="Search contacts"
              placeholder="Search"
              type="search"
              name="q"
              defaultValue={q}
              onChange={(event) => {
                submit(event.currentTarget.form);
              }}
            />
            {/* existing code */}
          </Form>
          {/* existing code */}
        </div>
        {/* existing code */}
      </div>
      {/* existing code */}
    </>
  );
}
```

Now as you type, the form is submitted automatically!

Note the argument to [`submit`][usesubmit]. We're passing in `event.currentTarget.form`. The `currentTarget` is the DOM node the event is attached to, and the `currentTarget.form` is the input's parent form node. The `submit` function will serialize and submit any form you pass to it.

## Adding Search Spinner

In a production app, it's likely this search will be looking for records in a database that is too large to send all at once and filter client side. That's why this demo has some faked network latency.

Without any loading indicator, the search feels kinda sluggish. Even if we could make our database faster, we'll always have the user's network latency in the way and out of our control. For a better UX, let's add some immediate UI feedback for the search. For this we'll use [`useNavigation`][usenavigation] again.

👉 **Add the search spinner**

```jsx filename=src/routes/root.jsx lines=[8-12,26,32]
// existing code

export default function Root() {
  const { contacts, q } = useLoaderData();
  const navigation = useNavigation();
  const submit = useSubmit();

  const searching =
    navigation.location &&
    new URLSearchParams(navigation.location.search).has(
      "q"
    );

  useEffect(() => {
    document.getElementById("q").value = q;
  }, [q]);

  return (
    <>
      <div id="sidebar">
        <h1>React Router Contacts</h1>
        <div>
          <Form id="search-form" role="search">
            <input
              id="q"
              className={searching ? "loading" : ""}
              // existing code
            />
            <div
              id="search-spinner"
              aria-hidden
              hidden={!searching}
            />
            {/* existing code */}
          </Form>
          {/* existing code */}
        </div>
        {/* existing code */}
      </div>
      {/* existing code */}
    </>
  );
}
```

![Alt text](https://reactrouter.com/_docs/tutorial/22.webp "a title")

The `navigation.location` will show up when the app is navigating to a new URL and loading the data for it. It then goes away when there is no pending navigation anymore.

## Managing the History Stack

Now that the form is submitted for every key stroke, if we type the characters "seba" and then delete them with backspace, we end up with 7 new entries in the stack 😂. We definitely don't want this

![Alt text](https://reactrouter.com/_docs/tutorial/23.webp "a title")

We can avoid this by _replacing_ the current entry in the history stack with the next page, instead of pushing into it.

👉 **Use `replace` in `submit`**

```jsx filename=src/routes/root.jsx lines=[16-19]
// existing code

export default function Root() {
  // existing code

  return (
    <>
      <div id="sidebar">
        <h1>React Router Contacts</h1>
        <div>
          <Form id="search-form" role="search">
            <input
              id="q"
              // existing code
              onChange={(event) => {
                const isFirstSearch = q == null;
                submit(event.currentTarget.form, {
                  replace: !isFirstSearch,
                });
              }}
            />
            {/* existing code */}
          </Form>
          {/* existing code */}
        </div>
        {/* existing code */}
      </div>
      {/* existing code */}
    </>
  );
}
```

We only want to replace search results, not the page before we started searching, so we do a quick check if this is the first search or not and then decide to replace.

Each key stroke no longer creates new entries, so the user can click back out of the search results without having to click it 7 times 😅.

## Mutations Without Navigation

So far all of our mutations (the times we change data) have used forms that navigate, creating new entries in the history stack. While these user flows are common, it's equally as common to want to change data _without_ causing a navigation.

For these cases, we have the [`useFetcher`][usefetcher] hook. It allows us to communicate with loaders and actions without causing a navigation.

The ★ button on the contact page makes sense for this. We aren't creating or deleting a new record, we don't want to change pages, we simply want to change the data on the page we're looking at.

👉 **Change the `<Favorite>` form to a fetcher form**

```jsx filename=src/routes/contact.jsx lines=[4,10,14,26]
import {
  useLoaderData,
  Form,
  useFetcher,
} from "react-router-dom";

// existing code

function Favorite({ contact }) {
  const fetcher = useFetcher();
  let favorite = contact.favorite;

  return (
    <fetcher.Form method="post">
      <button
        name="favorite"
        value={favorite ? "false" : "true"}
        aria-label={
          favorite
            ? "Remove from favorites"
            : "Add to favorites"
        }
      >
        {favorite ? "★" : "☆"}
      </button>
    </fetcher.Form>
  );
}
```

Might want to take a look at that form while we're here. As always, our form has fields with a `name` prop. This form will send [`formData`][formdata] with a `favorite` key that's either `"true" | "false"`. Since it's got `method="post"` it will call the action. Since there is no `<fetcher.Form action="...">` prop, it will post to the route where the form is rendered.

👉 **Create the action**

```jsx filename=src/routes/contact.jsx lines=[2,4-10]
// existing code
import { getContact, updateContact } from "../contacts";

export async function action({ request, params }) {
  let formData = await request.formData();
  return updateContact(params.contactId, {
    favorite: formData.get("favorite") === "true",
  });
}

export default function Contact() {
  // existing code
}
```

Pretty simple. Pull the form data off the request and send it to the data model.

👉 **Configure the route's new action**

```jsx filename=src/main.jsx lines=[4,20]
// existing code
import Contact, {
  loader as contactLoader,
  action as contactAction,
} from "./routes/contact";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    loader: rootLoader,
    action: rootAction,
    children: [
      { index: true, element: <Index /> },
      {
        path: "contacts/:contactId",
        element: <Contact />,
        loader: contactLoader,
        action: contactAction,
      },
      /* existing code */
    ],
  },
]);
```

Alright, we're ready to click the star next to the user's name!

![Alt text](https://reactrouter.com/_docs/tutorial/24.webp "a title")

Check that out, both stars automatically update. Our new `<fetcher.Form method="post">` works almost exactly like a the `<Form>` we've been using: it calls the action and then all data is revalidated automatically--even your errors will be caught the same way.

There is one key difference though, it's not a navigation--the URL doesn't change, the history stack is unaffected.

## Optimistic UI

You probably noticed the app felt kind of unresponsive when we clicked the the favorite button from the last section. Once again, we added some network latency because you're going to have it in the real world!

To give the user some feedback, we could put the star into a loading state with [`fetcher.state`][fetcherstate] (a lot like `navigation.state` from before), but we can do something even better this time. We can use a strategy called "optimistic UI"

The fetcher knows the form data being submitted to the action, so it's available to you on `fetcher.formData`. We'll use that to immediately update the star's state, even though the network hasn't finished. If the update eventually fails, the UI will revert to the real data.

👉 **Read the optimistic value from `fetcher.formData`**

```jsx filename=src/routes/contact.jsx lines=[7-9]
// existing code

function Favorite({ contact }) {
  const fetcher = useFetcher();

  let favorite = contact.favorite;
  if (fetcher.formData) {
    favorite = fetcher.formData.get("favorite") === "true";
  }

  return (
    <fetcher.Form method="post">
      <button
        name="favorite"
        value={favorite ? "false" : "true"}
        aria-label={
          favorite
            ? "Remove from favorites"
            : "Add to favorites"
        }
      >
        {favorite ? "★" : "☆"}
      </button>
    </fetcher.Form>
  );
}
```

If you click the button now you should see the star _immediately_ change to the new state. Instead of always rendering the actual data, we check if the fetcher has any `formData` being submitted, if so, we'll use that instead. When the action is done, the `fetcher.formData` will no longer exist and we're back to using the actual data. So even if you write bugs in your optimistic UI code, it'll eventually go back to the correct state 🥹

## Not Found Data

What happens if the contact we're trying to load doesn't exist?

![Alt text](https://reactrouter.com/_docs/tutorial/25.webp "a title")

Our root [`errorElement`][errorelement] is catching this unexpected error as we try to render a `null` contact. Nice the error was properly handled, but we can do better!

Whenever you have an expected error case in a loader or action–like the data not existing–you can `throw`. The call stack will break, React Router will catch it, and the error path is rendered instead. We won't even try to render a `null` contact.

👉 **Throw a 404 response in the loader**

```jsx filename=src/routes/contact.jsx lines=[3-8]
export async function loader({ params }) {
  const contact = await getContact(params.contactId);
  if (!contact) {
    throw new Response("", {
      status: 404,
      statusText: "Not Found",
    });
  }
  return contact;
}
```

![Alt text](https://reactrouter.com/_docs/tutorial/27.webp "a title")

Instead of hitting a render error with `Cannot read properties of null`, we avoid the component completely and render the error path instead, telling the user something more specific.

This keeps your happy paths, happy. Your route elements don't need to concern themselves with error and loading states.

## Pathless Routes

One last thing. The last error page we saw would be better if it rendered inside the root outlet, instead of the whole page. In fact, every error in all of our child routes would be better in the outlet, then the user has more options than hitting refresh.

We'd like it to look like this:

![Alt text](https://reactrouter.com/_docs/tutorial/26.webp "a title")

We could add the error element to every one of the child routes but, since it's all the same error page, this isn't recommended.

There's a cleaner way. Routes can be used _without_ a path, which lets them participate in the UI layout without requiring new path segments in the URL. Check it out:

👉 **Wrap the child routes in a pathless route**

```jsx filename=src/main.jsx lines=[9-21]
createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    loader: rootLoader,
    action: rootAction,
    errorElement: <ErrorPage />,
    children: [
      {
        errorElement: <ErrorPage />,
        children: [
          { index: true, element: <Index /> },
          {
            path: "contacts/:contactId",
            element: <Contact />,
            loader: contactLoader,
            action: contactAction,
          },
          /* the rest of the routes */
        ],
      },
    ],
  },
]);
```

When any errors are thrown in the child routes, our new pathless route will catch it and render, preserving the root route's UI!

## JSX Routes

And for our final trick, many folks prefer to configure their routes with JSX. You can do that with `createRoutesFromElements`. There is no functional difference between JSX or objects when configuring your routes, it's simply a stylistic preference.

```jsx
import {
  createRoutesFromElements,
  createBrowserRouter,
} from "react-router-dom";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path="/"
      element={<Root />}
      loader={rootLoader}
      action={rootAction}
      errorElement={<ErrorPage />}
    >
      <Route errorElement={<ErrorPage />}>
        <Route index element={<Index />} />
        <Route
          path="contacts/:contactId"
          element={<Contact />}
          loader={contactLoader}
          action={contactAction}
        />
        <Route
          path="contacts/:contactId/edit"
          element={<EditContact />}
          loader={contactLoader}
          action={editAction}
        />
        <Route
          path="contacts/:contactId/destroy"
          action={destroyAction}
        />
      </Route>
    </Route>
  )
);
```

---

That's it! Thanks for giving React Router a shot. We hope this tutorial gives you a solid start to build great user experiences. There's a lot more you can do with React Router, so make sure to check out all the APIs 😀

[vite]: https://vitejs.dev/guide/
[node]: https://nodejs.org
[createbrowserrouter]: ../routers/create-browser-router
[route]: ../route/route
[tutorial-css]: https://gist.githubusercontent.com/ryanflorence/ba20d473ef59e1965543fa013ae4163f/raw/499707f25a5690d490c7b3d54c65c65eb895930c/react-router-6.4-tutorial-css.css
[tutorial-data]: https://gist.githubusercontent.com/ryanflorence/1e7f5d3344c0db4a8394292c157cd305/raw/f7ff21e9ae7ffd55bfaaaf320e09c6a08a8a6611/contacts.js
[routeelement]: ../route/route#element
[jim]: https://blog.jim-nielsen.com/
[errorelement]: ../route/error-element
[userouteerror]: ../hooks/use-route-error
[isrouteerrorresponse]: ../utils/is-route-error-response
[outlet]: ../components/outlet
[link]: ../components/link
[setup]: #setup
[loader]: ../route/loader
[useloaderdata]: ../hooks/use-loader-data
[action]: ../route/action
[params]: ../route/loader#params
[form]: ../components/form
[request]: https://developer.mozilla.org/en-US/docs/Web/API/Request
[formdata]: https://developer.mozilla.org/en-US/docs/Web/API/FormData
[fromentries]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/fromEntries
[requestformdata]: https://developer.mozilla.org/en-US/docs/Web/API/Request/formData
[response]: https://developer.mozilla.org/en-US/docs/Web/API/Response
[redirect]: ../fetch/redirect
[returningresponses]: ../route/loader#returning-responses
[usenavigation]: ../hooks/use-navigation
[index]: ../route/route#index
[path]: ../route/route#path
[usenavigate]: ../hooks/use-navigate
[uselocation]: ../hooks/use-location
[urlsearchparams]: https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams
[usesubmit]: ../hooks/use-submit
[navlink]: ../components/nav-link
[usefetcher]: ../hooks/use-fetcher
[fetcherstate]: ../hooks/use-fetcher#fetcherstate

# FAQs

Here are some questions that people commonly have about React Router v6. You might also find what you're looking for in the [examples][examples].

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
[examples]: https://github.com/remix-run/react-router/tree/dev/examples

# Main Concepts

<docs-warning>This document needs to be updated for 6.4 data APIs</docs-warning>

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

- <a id="history">**History**</a> - An object that allows React Router to subscribe to changes in the [URL](#url) as well as providing APIs to manipulate the browser [history stack](#history-stack) programmatically.

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

Browsers let us persist information about a navigation by passing a value to `pushState`. When the user clicks back, the value on `history.state` changes to whatever was "pushed" before.

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
<PageLayout>
  <Privacy />
</PageLayout>
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

# Upgrading from v5

## Backwards Compatibility Package

Instead of upgrading and updating all of your code at once (which is incredibly difficult and prone to bugs), the backwards compatibility package enables you to upgrade one component, one hook, and one route at a time by running both v5 and v6 in parallel. Any code you haven't touched is still running the very same code it was before. Once all components are exclusively using the v6 APIs, your app no longer needs the compatibility package and is running on v6. The official guide can be found [here](https://github.com/remix-run/react-router/discussions/8753).

We recommend using the backwards compatibility package to upgrade apps that have more than a few routes. Otherwise, we hope this guide will help you do the upgrade all at once!

## Introduction

React Router version 6 introduces several powerful new features, as well as improved compatibility with the latest versions of React. It also introduces a few breaking changes from version 5. This document is a comprehensive guide on how to upgrade your v4/5 app to v6 while hopefully being able to ship as often as possible as you go.

The examples in this guide will show code samples of how you might have built something in a v5 app, followed by how you would accomplish the same thing in v6. There will also be an explanation of why we made this change and how it's going to improve both your code and the overall user experience of people who are using your app.

In general, the process looks like this:

1. [Upgrade to React v16.8 or greater](#upgrade-to-react-v168)
2. [Upgrade to React Router v5.1](#upgrade-to-react-router-v51)
   - [Remove `<Redirect>`s inside `<Switch>`](#remove-redirects-inside-switch)
   - [Refactor custom `<Route>`s](#refactor-custom-routes)
3. [Upgrade to React Router v6](#upgrade-to-react-router-v6)

The following is a detailed breakdown of each step that should help you migrate quickly and with confidence to v6.

## Upgrade to React v16.8

React Router v6 makes heavy use of [React hooks](https://reactjs.org/docs/hooks-intro.html), so you'll need to be on React 16.8 or greater before attempting the upgrade to React Router v6. The good news is that React Router v5 is compatible with React >= 15, so if you're on v5 (or v4) you should be able to upgrade React without touching any of your router code.

Once you've upgraded to React 16.8, **you should deploy your app**. Then you can come back later and pick up where you left off.

## Upgrade to React Router v5.1

It will be easier to make the switch to React Router v6 if you upgrade to v5.1 first. In v5.1, we released an enhancement to the handling of `<Route children>` elements that will help smooth the transition to v6. Instead of using `<Route component>` and `<Route render>` props, just use regular element `<Route children>` everywhere and use hooks to access the router's internal state.

```js
// v4 and v5 before 5.1
function User({ id }) {
  // ...
}

function App() {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/about" component={About} />
      <Route
        path="/users/:id"
        render={({ match }) => (
          <User id={match.params.id} />
        )}
      />
    </Switch>
  );
}

// v5.1 preferred style
function User() {
  let { id } = useParams();
  // ...
}

function App() {
  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route path="/about">
        <About />
      </Route>
      {/* Can also use a named `children` prop */}
      <Route path="/users/:id" children={<User />} />
    </Switch>
  );
}
```

You can read more about v5.1's hooks API and the rationale behind the move to regular elements [on our blog](https://reacttraining.com/blog/react-router-v5-1/).

In general, React Router v5.1 (and v6) favors elements over components (or "element types"). There are a few reasons for this, but we'll discuss more further down when we discuss v6's `<Route>` API.

When you use regular React elements you get to pass the props explicitly. This helps with code readability and maintenance over time. If you were using `<Route render>` to get a hold of the params, you can just
`useParams` inside your route component instead.

Along with the upgrade to v5.1, you should replace any usage of `withRouter` with hooks. You should also get rid of any "floating" `<Route>` elements that are not inside a `<Switch>`. Again, [the blog post about v5.1](https://reacttraining.com/blog/react-router-v5-1/) explains how to do this in greater detail.

In summary, to upgrade from v4/5 to v5.1, you should:

- Use `<Route children>` instead of `<Route render>` and/or `<Route component>`
  props
- Use [our hooks API](https://reacttraining.com/react-router/web/api/Hooks) to
  access router state like the current location and params
- Replace all uses of `withRouter` with hooks
- Replace any `<Route>`s that are not inside a `<Switch>` with `useRouteMatch`,
  or wrap them in a `<Switch>`

### Remove `<Redirect>`s inside `<Switch>`

Remove any `<Redirect>` elements that are directly inside a `<Switch>`.

If you want to redirect on the initial render, you should move the redirect logic to your server (we [wrote more about this here](https://gist.github.com/mjackson/b5748add2795ce7448a366ae8f8ae3bb)).

If you want to redirect client-side, move your `<Redirect>` into a `<Route render>` prop.

```tsx
// Change this:
<Switch>
  <Redirect from="about" to="about-us" />
</Switch>

// to this:
<Switch>
  <Route path="about" render={() => <Redirect to="about-us" />} />
</Switch>
```

Normal `<Redirect>` elements that are not inside a `<Switch>` are ok to remain. They will become `<Navigate>` elements in v6.

### Refactor custom `<Route>`s

Replace any elements inside a `<Switch>` that are not plain `<Route>` elements with a regular `<Route>`. This includes any `<PrivateRoute>`-style custom components.

You can [read more about the rationale behind this here](https://gist.github.com/mjackson/d54b40a094277b7afdd6b81f51a0393f), including some tips about how to use a `<Route render>` prop in v5 to achieve the same effect.

### Ship it!

Again, **once your app is upgraded to v5.1 you should test and deploy it**, and pick this guide back up when you're ready to continue.

## Upgrade to React Router v6

**Heads up:** This is the biggest step in the migration and will probably take the most time and effort.

For this step, you'll need to install React Router v6. If you're managing dependencies via npm:

```bash
$ npm install react-router-dom
# or, for a React Native app
$ npm install react-router-native
```

You'll also want to remove the `history` dependency from your package.json. The `history` library is a direct dependency of v6 (not a peer dep), so you won't ever import or use it directly. Instead, you'll use the `useNavigate()` hook for all navigation (see below).

### Upgrade all `<Switch>` elements to `<Routes>`

React Router v6 introduces a `Routes` component that is kind of like `Switch`, but a lot more powerful. The main advantages of `Routes` over `Switch` are:

- All `<Route>`s and `<Link>`s inside a `<Routes>` are relative. This leads to
  leaner and more predictable code in `<Route path>` and `<Link to>`
- Routes are chosen based on the best match instead of being traversed in order.
  This avoids bugs due to unreachable routes because they were defined later
  in your `<Switch>`
- Routes may be nested in one place instead of being spread out in different
  components. In small to medium-sized apps, this lets you easily see all your
  routes at once. In large apps, you can still nest routes in bundles that you
  load dynamically via `React.lazy`

In order to use v6, you'll need to convert all your `<Switch>` elements to `<Routes>`. If you already made the upgrade to v5.1, you're halfway there.

First, let's talk about relative routes and links in v6.

### Relative Routes and Links

In v5, you had to be very explicit about how you wanted to nest your routes and links. In both cases, if you wanted nested routes and links you had to build the `<Route path>` and `<Link to>` props from the parent route's `match.url` and `match.path` properties. Additionally, if you wanted to nest routes, you had to put them in the child route's component.

```js
// This is a React Router v5 app
import {
  BrowserRouter,
  Switch,
  Route,
  Link,
  useRouteMatch,
} from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/users">
          <Users />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

function Users() {
  // In v5, nested routes are rendered by the child component, so
  // you have <Switch> elements all over your app for nested UI.
  // You build nested routes and links using match.url and match.path.
  let match = useRouteMatch();

  return (
    <div>
      <nav>
        <Link to={`${match.url}/me`}>My Profile</Link>
      </nav>

      <Switch>
        <Route path={`${match.path}/me`}>
          <OwnUserProfile />
        </Route>
        <Route path={`${match.path}/:id`}>
          <UserProfile />
        </Route>
      </Switch>
    </div>
  );
}
```

This is the same app in v6:

```js
// This is a React Router v6 app
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
} from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="users/*" element={<Users />} />
      </Routes>
    </BrowserRouter>
  );
}

function Users() {
  return (
    <div>
      <nav>
        <Link to="me">My Profile</Link>
      </nav>

      <Routes>
        <Route path=":id" element={<UserProfile />} />
        <Route path="me" element={<OwnUserProfile />} />
      </Routes>
    </div>
  );
}
```

A few important things to notice about v6 in this example:

- `<Route path>` and `<Link to>` are relative. This means that they
  automatically build on the parent route's path and URL so you don't have to
  manually interpolate `match.url` or `match.path`
- `<Route exact>` is gone. Instead, routes with descendant routes (defined in
  other components) use a trailing `*` in their path to indicate they match
  deeply
- You may put your routes in whatever order you wish and the router will
  automatically detect the best route for the current URL. This prevents bugs
  due to manually putting routes in the wrong order in a `<Switch>`

You may have also noticed that all `<Route children>` from the v5 app changed to `<Route element>` in v6. Assuming you followed the upgrade steps to v5.1, this should be as simple as moving your route element from the child position to a named `element` prop.

<!-- (TODO: can we provide a codemod here?) -->

### Advantages of `<Route element>`

In the section about upgrading to v5.1, we promised that we'd discuss the advantages of using regular elements instead of components (or element types) for rendering. Let's take a quick break from upgrading and talk about that now.

For starters, we see React itself taking the lead here with the `<Suspense fallback={<Spinner />}>` API. The `fallback` prop takes a React element, not a component. This lets you easily pass whatever props you want to your `<Spinner>` from the component that renders it.

Using elements instead of components means we don't have to provide a `passProps`-style API so you can get the props you need to your elements. For example, in a component-based API there is no good way to pass props to the `<Profile>` element that is rendered when `<Route path=":userId" component={Profile} />` matches. Most React libraries who take this approach end up with either an API like `<Route component={Profile} passProps={{ animate: true }} />` or use a render prop or higher-order component.

Also, in case you didn't notice, in v4 and v5 `Route`'s rendering API became rather large. It went something like this:

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

Another important reason for using the `element` prop in v6 is that `<Route children>` is reserved for nesting routes. This is one of people's favorite features from v3 and `@reach/router`, and we're bringing it back in v6. Taking the code in the previous example one step further, we can hoist all `<Route>` elements into a single route config:

```js
// This is a React Router v6 app
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  Outlet,
} from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="users" element={<Users />}>
          <Route path="me" element={<OwnUserProfile />} />
          <Route path=":id" element={<UserProfile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

function Users() {
  return (
    <div>
      <nav>
        <Link to="me">My Profile</Link>
      </nav>

      <Outlet />
    </div>
  );
}
```

This step is optional of course, but it's really nice for small to medium sized apps that don't have thousands of routes.

Notice how `<Route>` elements nest naturally inside a `<Routes>` element. Nested routes build their path by adding to the parent route's path. We didn't need a trailing `*` on `<Route path="users">` this time because when the routes are defined in one spot the router is able to see all your nested routes.

You'll only need the trailing `*` when there is another `<Routes>` somewhere in that route's descendant tree. In that case, the descendant `<Routes>` will match on the portion of the pathname that remains (see the previous example for what this looks like in practice).

When using a nested config, routes with `children` should render an `<Outlet>` in order to render their child routes. This makes it easy to render layouts with nested UI.

### Note on `<Route path>` patterns

React Router v6 uses a simplified path format. `<Route path>` in v6 supports only 2 kinds of placeholders: dynamic `:id`-style params and `*` wildcards. A `*` wildcard may be used only at the end of a path, not in the middle.

All of the following are valid route paths in v6:

```
/groups
/groups/admin
/users/:id
/users/:id/messages
/files/*
/files/:id/*
```

The following RegExp-style route paths are **not valid** in v6:

```
/users/:id?
/tweets/:id(\d+)
/files/*/cat.jpg
/files-*
```

We added the dependency on path-to-regexp in v4 to enable more advanced pattern matching. In v6 we are using a simpler syntax that allows us to predictably parse the path for ranking purposes. It also means we can stop depending on path-to-regexp, which is nice for bundle size.

If you were using any of path-to-regexp's more advanced syntax, you'll have to remove it and simplify your route paths. If you were using the RegExp syntax to do URL param validation (e.g. to ensure an id is all numeric characters) please know that we plan to add some more advanced param validation in v6 at some point. For now, you'll need to move that logic to the component the route renders, and let it branch its rendered tree after you parse the params.

If you were using `<Route sensitive>` you should move it to its containing `<Routes caseSensitive>` prop. Either all routes in a `<Routes>` element are case-sensitive or they are not.

One other thing to notice is that all path matching in v6 ignores the trailing slash on the URL. In fact, `<Route strict>` has been removed and has no effect in v6. **This does not mean that you can't use trailing slashes if you need to.** Your app can decide to use trailing slashes or not, you just can't render two different UIs _client-side_ at `<Route path="edit">` and `<Route path="edit/">`. You can still render two different UIs at those URLs (though we wouldn't recommend it), but you'll have to do it server-side.

### Note on `<Link to>` values

In v5, a `<Link to>` value that does not begin with `/` was ambiguous; it depends on what the current URL is. For example, if the current URL is `/users`, a v5 `<Link to="me">` would render a `<a href="/me">`. However, if the current URL has a trailing slash, like `/users/`, the same `<Link to="me">` would render `<a href="/users/me">`. This makes it difficult to predict how links will behave, so in v5 we recommended that you build links from the root URL (using `match.url`) and not use relative `<Link to>` values.

React Router v6 fixes this ambiguity. In v6, a `<Link to="me">` will always render the same `<a href>`, regardless of the current URL.

For example, a `<Link to="me">` that is rendered inside a `<Route path="users">` will always render a link to `/users/me`, regardless of whether or not the current URL has a trailing slash.

When you'd like to link back "up" to parent routes, use a leading `..` segment in your `<Link to>` value, similar to what you'd do in a `<a href>`.

```tsx
function App() {
  return (
    <Routes>
      <Route path="users" element={<Users />}>
        <Route path=":id" element={<UserProfile />} />
      </Route>
    </Routes>
  );
}

function Users() {
  return (
    <div>
      <h2>
        {/* This links to /users - the current route */}
        <Link to=".">Users</Link>
      </h2>

      <ul>
        {users.map((user) => (
          <li>
            {/* This links to /users/:id - the child route */}
            <Link to={user.id}>{user.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function UserProfile() {
  return (
    <div>
      <h2>
        {/* This links to /users - the parent route */}
        <Link to="..">All Users</Link>
      </h2>

      <h2>
        {/* This links to /users/:id - the current route */}
        <Link to=".">User Profile</Link>
      </h2>

      <h2>
        {/* This links to /users/mj - a "sibling" route */}
        <Link to="../mj">MJ</Link>
      </h2>
    </div>
  );
}
```

It may help to think about the current URL as if it were a directory path on the filesystem and `<Link to>` like the `cd` command line utility.

```
// If your routes look like this
<Route path="app">
  <Route path="dashboard">
    <Route path="stats" />
  </Route>
</Route>

// and the current URL is /app/dashboard (with or without
// a trailing slash)
<Link to="stats">               => <a href="/app/dashboard/stats">
<Link to="../stats">            => <a href="/app/stats">
<Link to="../../stats">         => <a href="/stats">
<Link to="../../../stats">      => <a href="/stats">

// On the command line, if the current directory is /app/dashboard
cd stats                        # pwd is /app/dashboard/stats
cd ../stats                     # pwd is /app/stats
cd ../../stats                  # pwd is /stats
cd ../../../stats               # pwd is /stats
```

**Note**: The decision to ignore trailing slashes while matching and creating relative paths was not taken lightly by our team. We consulted with a number of our friends and clients (who are also our friends!) about it. We found that most of us don't even understand how plain HTML relative links are handled with the trailing slash. Most people guessed it worked like `cd` on the command line (it does not). Also, HTML relative links don't have the concept of nested routes, they only worked on the URL, so we had to blaze our own trail here a bit. `@reach/router` set this precedent and it has worked out well for a couple of years.

In addition to ignoring trailing slashes in the current URL, it is important to note that `<Link to="..">` will not always behave like `<a href="..">` when your `<Route path>` matches more than one segment of the URL. Instead of removing just one segment of the URL, **it will resolve based upon the parent route's path, essentially removing all path segments specified by that route**.

```tsx
function App() {
  return (
    <Routes>
      <Route path="users">
        <Route
          path=":id/messages"
          element={
            // This links to /users
            <Link to=".." />
          }
        />
      </Route>
    </Routes>
  );
}
```

This may seem like an odd choice, to make `..` operate on routes instead of URL segments, but it's a **huge** help when working with `*` routes where an indeterminate number of segments may be matched by the `*`. In these scenarios, a single `..` segment in your `<Link to>` value can essentially remove anything matched by the `*`, which lets you create more predictable links in `*` routes.

```tsx
function App() {
  return (
    <Routes>
      <Route path=":userId">
        <Route path="messages" element={<UserMessages />} />
        <Route
          path="files/*"
          element={
            // This links to /:userId/messages, no matter
            // how many segments were matched by the *
            <Link to="../messages" />
          }
        />
      </Route>
    </Routes>
  );
}
```

## Pass `<Link>` state as separate prop

The `Link` component in v6 accepts `state` as a separate prop instead of receiving it as part of the object passed to `to` so you'll need to update your `Link` components if they are using `state`:

```js
import { Link } from "react-router-dom";

// Change this:
<Link to={{ pathname: "/home", state: state }} />

// to this:
<Link to="/home" state={state} />
```

The state value is still retrieved in the linked component using `useLocation()`:

```js
function Home() {
  const location = useLocation();
  const state = location.state;
  return <div>Home</div>;
}
```

## Use `useRoutes` instead of `react-router-config`

All of the functionality from v5's `react-router-config` package has moved into core in v6. If you prefer/need to define your routes as JavaScript objects instead of using React elements, you're going to love this.

```js
function App() {
  let element = useRoutes([
    // These are the same as the props you provide to <Route>
    { path: "/", element: <Home /> },
    { path: "dashboard", element: <Dashboard /> },
    {
      path: "invoices",
      element: <Invoices />,
      // Nested routes use a children property, which is also
      // the same as <Route>
      children: [
        { path: ":id", element: <Invoice /> },
        { path: "sent", element: <SentInvoices /> },
      ],
    },
    // Not found routes work as you'd expect
    { path: "*", element: <NotFound /> },
  ]);

  // The returned element will render the entire element
  // hierarchy with all the appropriate context it needs
  return element;
}
```

Routes defined in this way follow all of the same semantics as `<Routes>`. In fact, `<Routes>` is really just a wrapper around `useRoutes`.

We encourage you to give both `<Routes>` and `useRoutes` a shot and decide for yourself which one you prefer to use. Honestly, we like and use them both.

If you had cooked up some of your own logic around data fetching and rendering server-side, we have a low-level `matchRoutes` function available as well similar to the one we had in react-router-config.

## Use `useNavigate` instead of `useHistory`

React Router v6 introduces a new navigation API that is synonymous with `<Link>` and provides better compatibility with suspense-enabled apps. We include both imperative and declarative versions of this API depending on your style and needs.

```js
// This is a React Router v5 app
import { useHistory } from "react-router-dom";

function App() {
  let history = useHistory();
  function handleClick() {
    history.push("/home");
  }
  return (
    <div>
      <button onClick={handleClick}>go home</button>
    </div>
  );
}
```

In v6, this app should be rewritten to use the `navigate` API. Most of the time this means changing `useHistory` to `useNavigate` and changing the `history.push` or `history.replace` callsite.

```js
// This is a React Router v6 app
import { useNavigate } from "react-router-dom";

function App() {
  let navigate = useNavigate();
  function handleClick() {
    navigate("/home");
  }
  return (
    <div>
      <button onClick={handleClick}>go home</button>
    </div>
  );
}
```

If you need to replace the current location instead of push a new one onto the history stack, use `navigate(to, { replace: true })`. If you need state, use `navigate(to, { state })`. You can think of the first argument to `navigate` as your `<Link to>` and the other arguments as the `replace` and `state` props.

If you prefer to use a declarative API for navigation (ala v5's `Redirect` component), v6 provides a `Navigate` component. Use it like:

```js
import { Navigate } from "react-router-dom";

function App() {
  return <Navigate to="/home" replace state={state} />;
}
```

**Note**: Be aware that the v5 `<Redirect />` uses `replace` logic by default (you may change it via `push` prop), on the other hand, the v6 `<Navigate />` uses `push` logic by default and you may change it via `replace` prop.

```js
// Change this:
<Redirect to="about" />
<Redirect to="home" push />

// to this:
<Navigate to="about" replace />
<Navigate to="home" />
```

If you're currently using `go`, `goBack` or `goForward` from `useHistory` to navigate backwards and forwards, you should also replace these with `navigate` with a numerical argument indicating where to move the pointer in the history stack. For example, here is some code using v5's `useHistory` hook:

```js
// This is a React Router v5 app
import { useHistory } from "react-router-dom";

function App() {
  const { go, goBack, goForward } = useHistory();

  return (
    <>
      <button onClick={() => go(-2)}>
        Go 2 pages back
      </button>
      <button onClick={goBack}>Go back</button>
      <button onClick={goForward}>Go forward</button>
      <button onClick={() => go(2)}>
        Go 2 pages forward
      </button>
    </>
  );
}
```

Here is the equivalent app with v6:

```js
// This is a React Router v6 app
import { useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate();

  return (
    <>
      <button onClick={() => navigate(-2)}>
        Go 2 pages back
      </button>
      <button onClick={() => navigate(-1)}>Go back</button>
      <button onClick={() => navigate(1)}>
        Go forward
      </button>
      <button onClick={() => navigate(2)}>
        Go 2 pages forward
      </button>
    </>
  );
}
```

Again, one of the main reasons we are moving from using the `history` API directly to the `navigate` API is to provide better compatibility with React suspense. React Router v6 uses the `useNavigation` hook at the root of your component hierarchy. This lets us provide a smoother experience when user interaction needs to interrupt a pending route navigation, for example when they click a link to another route while a previously-clicked link is still loading. The `navigate` API is aware of the internal pending navigation state and will do a REPLACE instead of a PUSH onto the history stack, so the user doesn't end up with pages in their history that never actually loaded.

_Note: The `<Redirect>` element from v5 is no longer supported as part of your route config (inside a `<Routes>`). This is due to upcoming changes in React that make it unsafe to alter the state of the router during the initial render. If you need to redirect immediately, you can either a) do it on your server (probably the best solution) or b) render a `<Navigate>` element in your route component. However, recognize that the navigation will happen in a `useEffect`._

Aside from suspense compatibility, `navigate`, like `Link`, supports relative navigation. For example:

```jsx
// assuming we are at `/stuff`
function SomeForm() {
  let navigate = useNavigate();
  return (
    <form
      onSubmit={async (event) => {
        let newRecord = await saveDataFromForm(
          event.target
        );
        // you can build up the URL yourself
        navigate(`/stuff/${newRecord.id}`);
        // or navigate relative, just like Link
        navigate(`${newRecord.id}`);
      }}
    >
      {/* ... */}
    </form>
  );
}
```

## Remove `<Link>` `component` prop

`<Link>` no longer supports the `component` prop for overriding the returned anchor tag. There are a few reasons for this.

First of all, a `<Link>` should pretty much always render an `<a>`. If yours does not, there's a good chance your app has some serious accessibility and usability problems, and that's no good. The browsers give us a lot of nice usability features with `<a>` and we want your users to get those for free!

That being said, maybe your app uses a CSS-in-JS library, or maybe you have a custom, fancy link component already in your design system that you'd like to render instead. The `component` prop may have worked well enough in a world before hooks, but now you can create your very own accessible `Link` component with just a few of our hooks:

```tsx
import { FancyPantsLink } from "@fancy-pants/design-system";
import {
  useHref,
  useLinkClickHandler,
} from "react-router-dom";

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
      <FancyPantsLink
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

If you're using `react-router-native`, we provide `useLinkPressHandler` that works basically the same way. Just call that hook's returned function in your `Link`'s `onPress` handler and you're all set.

## Rename `<NavLink exact>` to `<NavLink end>`

This is a simple renaming of a prop to better align with the common practices of other libraries in the React ecosystem.

## Remove `activeClassName` and `activeStyle` props from `<NavLink />`

As of `v6.0.0-beta.3`, the `activeClassName` and `activeStyle` props have been removed from `NavLinkProps`. Instead, you can pass a function to either `style` or `className` that will allow you to customize the inline styling or the class string based on the component's active state.

```diff tsx
<NavLink
  to="/messages"
- style={{ color: 'blue' }}
- activeStyle={{ color: 'green' }}
+ style={({ isActive }) => ({ color: isActive ? 'green' : 'blue' })}
>
  Messages
</NavLink>
```

```diff tsx
<NavLink
  to="/messages"
- className="nav-link"
- activeClassName="activated"
+ className={({ isActive }) => "nav-link" + (isActive ? " activated" : "")}
>
  Messages
</NavLink>
```

If you prefer to keep the v5 props, you can create your own `<NavLink />` as a wrapper component for a smoother upgrade path.

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

## Get `StaticRouter` from `react-router-dom/server`

The `StaticRouter` component has moved into a new bundle: `react-router-dom/server`.

```js
// change
import { StaticRouter } from "react-router-dom";
// to
import { StaticRouter } from "react-router-dom/server";
```

This change was made both to follow more closely the convention established by the `react-dom` package and to help users understand better what a `<StaticRouter>` is for and when it should be used (on the server).

## Replace `useRouteMatch` with `useMatch`

`useMatch` is very similar to v5's `useRouteMatch`, with a few key differences:

- It uses our new [path pattern matching algorithm](#note-on-route-path-patterns)
- The pattern argument is now required
- No longer accepts an array of patterns
- When passing a pattern as an object, some of the options have been renamed to better align with other APIs in v6
  - `useRouteMatch({ strict })` is now `useMatch({ end })`
  - `useRouteMatch({ sensitive })` is now `useMatch({ caseSensitive })`
- It returns a match object with a different shape

To see the exact API of the new `useMatch` hook and its type declaration, check out our [API Reference](../hooks/use-match).

<!-- TODO: Show examples for refactoring useRouteMatch -->

## Change the order of arguments passed to `matchPath`. Change pathPattern options.

Since version 6 the order of arguments passed to `matchPath` function has changed. Also pattern options has changed.

- first argument is pathPattern object, then comes pathname
- pathPattern doesn't include `exact` and `strict` options any more. New `caseSensitive` and `end` options has been added.

Please refactor it as follows:

Before:

```js
// This is a React Router v5 app
import { matchPath } from "react-router-dom";

const match = matchPath("/users/123", {
  path: "/users/:id",
  exact: true, // Optional, defaults to false
  strict: false, // Optional, defaults to false
});
```

After:

```js
// This is a React Router v6 app
import { matchPath } from "react-router-dom";

const match = matchPath(
  {
    path: "/users/:id",
    caseSensitive: false, // Optional, `true` == static parts of `path` should match case
    end: true, // Optional, `true` == pattern should match the entire URL pathname
  },
  "/users/123"
);
```

## `<Prompt>` is not currently supported

`<Prompt>` from v5 (along with `usePrompt` and `useBlocker` from the v6 betas) are not included in the current released version of v6. We decided we'd rather ship with what we have than take even more time to nail down a feature that isn't fully baked. We will absolutely be working on adding this back in to v6 at some point in the near future, but not for our first stable release of 6.x.

## What did we miss?

Despite our best attempts at being thorough, it's very likely that we missed something. If you follow this upgrade guide and find that to be the case, please let us know. We are happy to help you figure out what to do with your v5 code to be able to upgrade and take advantage of all of the cool stuff in v6.

Good luck 🤘

# Picking a Router

While your app will only use a single router, several routers are available depending on the environment your app is running in. This document should help you figure out which one to use.

## Using v6.4 Data APIs

In v6.4, new routers were introduced that support the new data APIs:

- [`createBrowserRouter`][createbrowserrouter]
- [`createMemoryRouter`][creatememoryrouter]
- [`createHashRouter`][createhashrouter]

The following routers do not support the data APIs:

- [`<BrowserRouter>`][browserrouter]
- [`<MemoryRouter>`][memoryrouter]
- [`<HashRouter>`][hashrouter]
- [`<NativeRouter>`][nativerouter]
- [`<StaticRouter>`][staticrouter]

We recommend updating your app to use one of the new routers from 6.4. The data APIs are currently not supported in React Native, but should be eventually.

The easiest way to quickly update to a v6.4 is to get the help from [`createRoutesFromElements`][createroutesfromelements] so you don't need to convert your `<Route>` elements to route objects.

```jsx
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />}>
      <Route path="dashboard" element={<Dashboard />} />
      {/* ... etc. */}
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
```

## Web Projects

We recommend all web projects use [`createBrowserRouter`][createbrowserrouter].

It uses the full URL instead of the hash urls (`#this/stuff`) common in web apps before `window.pushState` was standardized. Full URLs are better for SEO, better for server rendering, and are just more compatible with the rest of the web platform.

If you're hosting your app on a static file server, you'll need to configure it to send all requests to your `index.html` to avoid getting 404s.

If for some reason you can't use the full URL, [`createHashRouter`][createhashrouter] is the next best thing.

If you're not interested in the data APIs, you can continue to use [`<BrowserRouter>`][browserrouter] or, if you can't use full URLs, [`<HashRouter>`][hashrouter].

## Testing

Testing components that use React Router APIs is easiest with [`createMemoryRouter`][creatememoryrouter] or [`<MemoryRouter>`][memoryrouter] instead of the routers you use in your app that require DOM history APIs.

Some of the React Router APIs internally use `fetch`, which is only supported starting from Node.js v18. If your project uses v17 or lower, you should add a `fetch` polyfill manually. One way to do that, is to install [`whatwg-fetch`](https://www.npmjs.com/package/whatwg-fetch) and add it to your `jest.config.js` file like so:

```js
module.exports = {
  setupFiles: ["whatwg-fetch"],
  // ...rest of the config
};
```

## React Native

You will use [`<NativeRouter>`][nativerouter] from React Native projects.

The data APIs from v6.4 are currently not supported in React Native, but should be eventually.

[createbrowserrouter]: ./create-browser-router
[createhashrouter]: ./create-hash-router
[creatememoryrouter]: ./create-memory-router
[createroutesfromelements]: ../utils/create-routes-from-elements
[browserrouter]: ../router-components/browser-router
[memoryrouter]: ../router-components/memory-router
[hashrouter]: ../router-components/hash-router
[nativerouter]: ../router-components/native-router
[staticrouter]: ../router-components/static-router

# `createBrowserRouter`

This is the recommended router for all React Router web projects. It uses the [DOM History API][historyapi] to update the URL and manage the history stack.

It also enables the v6.4 data APIs like [loaders][loader], [actions][action], [fetchers][fetcher] and more.

```tsx lines=[4,11-24]
import * as React from "react";
import * as ReactDOM from "react-dom";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import Root, { rootLoader } from "./routes/root";
import Team, { teamLoader } from "./routes/team";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    loader: rootLoader,
    children: [
      {
        path: "team",
        element: <Team />,
        loader: teamLoader,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
```

## Type Declaration

```tsx
function createBrowserRouter(
  routes: RouteObject[],
  opts?: {
    basename?: string;
    window?: Window;
  }
): RemixRouter;
```

## `routes`

An array of [`Route`][route] objects with nested routes on the `children` property.

```jsx
createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    loader: rootLoader,
    children: [
      {
        path: "events/:id",
        element: <Event />,
        loader: eventLoader,
      },
    ],
  },
]);
```

## `basename`

The basename of the app for situations where you can't deploy to the root of the domain, but a sub directory.

```jsx
createBrowserRouter(routes, {
  basename: "/app",
});
```

The trailing slash will be respected when linking to the root:

```jsx
createBrowserRouter(routes, {
  basename: "/app",
});
<Link to="/" />; // results in <a href="/app" />

createBrowserRouter(routes, {
  basename: "/app/",
});
<Link to="/" />; // results in <a href="/app/" />
```

## `window`

Useful for environments like browser devtool plugins or testing to use a different window than the global `window`.

[loader]: ../route/loader
[action]: ../route/action
[fetcher]: ../hooks/use-fetcher
[browser-router]: ./browser-router
[form]: ../components/form
[route]: ../components/route
[routes]: ../components/routes
[historyapi]: https://developer.mozilla.org/en-US/docs/Web/API/History

# `createHashRouter`

This router is useful if you are unable to configure your web server to direct all traffic to your React Router application. Instead of using normal URLs, it will use the hash (#) portion of the URL to manage the "application URL".

<docs-warning>Using hash URLs is not recommended.</docs-warning>

Other than that, it is functionally the same as [`createBrowserRouter`][createbrowserrouter].

```tsx lines=[4,11]
import * as React from "react";
import * as ReactDOM from "react-dom";
import {
  createHashRouter,
  RouterProvider,
} from "react-router-dom";

import Root, { rootLoader } from "./routes/root";
import Team, { teamLoader } from "./routes/team";

const router = createHashRouter([
  {
    path: "/",
    element: <Root />,
    loader: rootLoader,
    children: [
      {
        path: "team",
        element: <Team />,
        loader: teamLoader,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
```

[createbrowserrouter]: ./create-browser-router

# `createMemoryRouter`

Instead of using the browsers history a memory router manages it's own history stack in memory. It's primarily useful for testing and component development tools like Storybook, but can also be used for running React Router in any non-browser environment.

```jsx lines=[2-3,24-27]
import {
  RouterProvider,
  createMemoryRouter,
} from "react-router-dom";
import * as React from "react";
import {
  render,
  waitFor,
  screen,
} from "@testing-library/react";
import "@testing-library/jest-dom";
import CalendarEvent from "./routes/event";

test("event route", async () => {
  const FAKE_EVENT = { name: "test event" };
  const routes = [
    {
      path: "/events/:id",
      element: <CalendarEvent />,
      loader: () => FAKE_EVENT,
    },
  ];

  const router = createMemoryRouter(routes, {
    initialEntries: ["/", "/events/123"],
    initialIndex: 1,
  });

  render(<RouterProvider router={router} />);

  await waitFor(() => screen.getByRole("heading"));
  expect(screen.getByRole("heading")).toHaveTextContent(
    FAKE_EVENT.name
  );
});
```

## Type Declaration

```tsx
function createMemoryRouter(
  routes: RouteObject[],
  opts?: {
    basename?: string;
    initialEntries?: InitialEntry[];
    initialIndex?: number;
    window?: Window;
  }
): RemixRouter;
```

## `initialEntries`

The initial entries in the history stack. This allows you to start a test (or an app) with multiple locations already in the history stack (for testing a back navigation, etc.)

```tsx
createMemoryRouter(routes, {
  initialEntries: ["/", "/events/123"],
});
```

## `initialIndex`

The initial index in the history stack to render. This allows you to start a test at a specific entry. It defaults to the last entry in `initialEntries`.

```tsx lines=[3]
createMemoryRouter(routes, {
  initialEntries: ["/", "/events/123"],
  initialIndex: 1, // start at "/events/123"
});
```

## Other props

For all other props, see [`createBrowserRouter`][createbrowserrouter]

[createbrowserrouter]: ./create-browser-router

# `<RouterProvider>`

All router objects are passed to this component to render your app and enable the rest of the APIs.

```jsx lines=[24]
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "about",
        element: <About />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider
    router={router}
    fallbackElement={<BigSpinner />}
  />
);
```

## `fallbackElement`

If you are not server rendering your app, `DataBrowserRouter` will initiate all matching route loaders when it mounts. During this time, you can provide a `fallbackElement` to give the user some indication that the app is working. Make that static hosting TTFB count!

```tsx
<RouterProvider
  router={router}
  fallbackElement={<SpinnerOfDoom />}
/>
```

# `<BrowserRouter>`

<details>
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

</details>

A `<BrowserRouter>` stores the current location in the browser's address bar using clean URLs and navigates using the browser's built-in history stack.

`<BrowserRouter window>` defaults to using the current [document's `defaultView`][defaultview], but it may also be used to track changes to another window's URL, in an `<iframe>`, for example.

```tsx
import * as React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

const root = createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    {/* The rest of your app goes here */}
  </BrowserRouter>
);
```

[defaultview]: https://developer.mozilla.org/en-US/docs/Web/API/Document/defaultView

# `<HashRouter>`

<details>
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

</details>

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

# `<MemoryRouter>`

<details>
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

</details>

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

<details>
  <summary>Type declaration</summary>

```tsx
declare function NativeRouter(
  props: NativeRouterProps
): React.ReactElement;

interface NativeRouterProps extends MemoryRouterProps {}
```

</details>

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

<details>
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

</details>

`<Router>` is the low-level interface that is shared by all router components (like `<BrowserRouter>` and `<StaticRouter>`). In terms of React, `<Router>` is a [context provider][context] that supplies routing information to the rest of the app.

You probably never need to render a `<Router>` manually. Instead, you should use one of the higher-level routers depending on your environment. You only ever need one router in a given app.

The `<Router basename>` prop may be used to make all routes and links in your app relative to a "base" portion of the URL pathname that they all share. This is useful when rendering only a portion of a larger app with React Router or when your app has multiple entry points. Basenames are not case-sensitive.

[context]: https://reactjs.org/docs/context.html#contextprovider

# `<StaticRouter>`

<details>
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

</details>

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

# `Route`

Routes are perhaps the most important part of a React Router app. They couple URL segments to components, data loading and data mutations. Through route nesting, complex application layouts and data dependencies become simple and declarative.

Routes are objects passed to the router creation functions:

```jsx
const router = createBrowserRouter([
  {
    // it renders this element
    element: <Team />,

    // when the URL matches this segment
    path: "teams/:teamId",

    // with this data loaded before rendering
    loader: async ({ request, params }) => {
      return fetch(
        `/fake/api/teams/${params.teamId}.json`,
        { signal: request.signal }
      );
    },

    // performing this mutation when data is submitted to it
    action: async ({ request }) => {
      return updateFakeTeam(await request.formData());
    },

    // and renders this element in case something went wrong
    errorElement: <ErrorBoundary />,
  },
]);
```

You can also declare your routes with JSX and [`createRoutesFromElements`][createroutesfromelements], the props to the element are identical to the properties of the route objects:

```jsx
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      element={<Team />}
      path="teams/:teamId"
      loader={async ({ params }) => {
        return fetch(
          `/fake/api/teams/${params.teamId}.json`
        );
      }}
      action={async ({ request }) => {
        return updateFakeTeam(await request.formData());
      }}
      errorElement={<ErrorBoundary />}
    />
  )
);
```

Neither style is discouraged and behavior is identical. For the majority of this doc we will use the JSX style because that's what most people are accustomed to in the context of React Router.

## Type declaration

```tsx
interface RouteObject {
  path?: string;
  index?: boolean;
  children?: React.ReactNode;
  caseSensitive?: boolean;
  id?: string;
  loader?: LoaderFunction;
  action?: ActionFunction;
  element?: React.ReactNode | null;
  errorElement?: React.ReactNode | null;
  handle?: RouteObject["handle"];
  shouldRevalidate?: ShouldRevalidateFunction;
}
```

## `path`

The path pattern to match against the URL to determine if this route matches a URL, link href, or form action.

### Dynamic Segments

If a path segment starts with `:` then it becomes a "dynamic segment". When the route matches the URL, the dynamic segment will be parsed from the URL and provided as `params` to other router APIs.

```tsx
<Route
  // this path will match URLs like
  // - /teams/hotspur
  // - /teams/real
  path="/teams/:teamId"
  // the matching param will be available to the loader
  loader={({ params }) => {
    console.log(params.teamId); // "hotspur"
  }}
  // and the action
  action={({ params }) => {}}
  element={<Team />}
/>;

// and the element through `useParams`
function Team() {
  let params = useParams();
  console.log(params.teamId); // "hotspur"
}
```

You can have multiple dynamic segments in one route path:

```tsx
<Route path="/c/:categoryId/p/:productId" />;
// both will be available
params.categoryId;
params.productId;
```

Dynamic segments cannot be "partial":

- 🚫 `"/teams-:teamId"`
- ✅ `"/teams/:teamId"`
- 🚫 `"/:category--:productId"`
- ✅ `"/:productSlug"`

You can still support URL patterns like that, you just have to do a bit of your own parsing:

```tsx
function Product() {
  const { productSlug } = useParams();
  const [category, product] = productSlug.split("--");
  // ...
}
```

### Optional Segments

You can make a route segment optional by adding a `?` to the end of the segment.

```tsx
<Route
  // this path will match URLs like
  // - /categories
  // - /en/categories
  // - /fr/categories
  path="/:lang?/categories"
  // the matching param might be available to the loader
  loader={({ params }) => {
    console.log(params["*"]); // "one/two"
  }}
  // and the action
  action={({ params }) => {}}
  element={<Categories />}
/>;

// and the element through `useParams`
function Categories() {
  let params = useParams();
  console.log(params.lang);
}
```

You can have optional static segments, too:

```jsx
<Route path="/project/task?/:taskId" />
```

### Splats

Also known as "catchall" and "star" segments. If a route path pattern ends with `/*` then it will match any characters following the `/`, including other `/` characters.

```tsx
<Route
  // this path will match URLs like
  // - /files
  // - /files/one
  // - /files/one/two
  // - /files/one/two/three
  path="/files/*"
  // the matching param will be available to the loader
  loader={({ params }) => {
    console.log(params["*"]); // "one/two"
  }}
  // and the action
  action={({ params }) => {}}
  element={<Team />}
/>;

// and the element through `useParams`
function Team() {
  let params = useParams();
  console.log(params["*"]); // "one/two"
}
```

You can destructure the `*`, you just have to assign it a new name. A common name is `splat`:

```tsx
let { org, "*": splat } = params;
```

### Layout Routes

Omitting the path makes this route a "layout route". It participates in UI nesting, but it does not add any segments to the URL.

```tsx
<Route
  element={
    <div>
      <h1>Layout</h1>
      <Outlet />
    </div>
  }
>
  <Route path="/" element={<h2>Home</h2>} />
  <Route path="/about" element={<h2>About</h2>} />
</Route>
```

In this example, `<h1>Layout</h1>` will be rendered along with each child route's `element` prop, via the layout route's [Outlet][outlet].

## `index`

Determines if the route is an index route. Index routes render into their parent's [Outlet][outlet] at their parent's URL (like a default child route).

```jsx [2]
<Route path="/teams" element={<Teams />}>
  <Route index element={<TeamsIndex />} />
  <Route path=":teamId" element={<Team />} />
</Route>
```

These special routes can be confusing to understand at first, so we have a guide dedicated to them here: [Index Route][indexroute].

## `children`

<docs-warning>(TODO: need to talk about nesting, maybe even a separate doc)</docs-warning>

## `caseSensitive`

Instructs the route to match case or not:

```jsx
<Route caseSensitive path="/wEll-aCtuA11y" />
```

- Will match `"wEll-aCtuA11y"`
- Will not match `"well-actua11y"`

## `loader`

The route loader is called before the route renders and provides data for the element through [`useLoaderData`][useloaderdata].

```tsx [3-5]
<Route
  path="/teams/:teamId"
  loader={({ params }) => {
    return fetchTeam(params.teamId);
  }}
/>;

function Team() {
  let team = useLoaderData();
  // ...
}
```

<docs-warning>If you are not using a data router like [`createBrowserRouter`][createbrowserrouter], this will do nothing</docs-warning>

Please see the [loader][loader] documentation for more details.

## `action`

The route action is called when a submission is sent to the route from a [Form][form], [fetcher][fetcher], or [submission][usesubmit].

```tsx [3-5]
<Route
  path="/teams/:teamId"
  action={({ request }) => {
    const formData = await request.formData();
    return updateTeam(formData);
  }}
/>
```

<docs-warning>If you are not using a data router like [`createBrowserRouter`][createbrowserrouter], this will do nothing</docs-warning>

Please see the [action][action] documentation for more details.

## `element`

The element to render when the route matches the URL.

```tsx
<Route path="/for-sale" element={<Properties />} />
```

## `errorElement`

When a route throws an exception while rendering, in a `loader` or in an `action`, this element will render instead of the normal `element`.

```tsx
<Route
  path="/for-sale"
  // if this throws an error while rendering
  element={<Properties />}
  // or this while loading properties
  loader={() => loadProperties()}
  // or this while creating a property
  action={async ({ request }) =>
    createProperty(await request.formData())
  }
  // then this element will render
  errorElement={<ErrorBoundary />}
/>
```

<docs-warning>If you are not using a data router like [`createBrowserRouter`][createbrowserrouter], this will do nothing</docs-warning>

Please see the [errorElement][errorelement] documentation for more details.

## `handle`

Any application-specific data. Please see the [useMatches][usematches] documentation for details and examples.

[remix]: https://remix.run
[indexroute]: ../start/concepts#index-routes
[outlet]: ../components/outlet
[useloaderdata]: ../hooks/use-loader-data
[loader]: ./loader
[action]: ./action
[errorelement]: ./error-element
[form]: ../components/form
[fetcher]: ../hooks/use-fetcher
[usesubmit]: ../hooks/use-submit
[createroutesfromelements]: ../utils/create-routes-from-elements
[createbrowserrouter]: ../routers/create-browser-router
[usematches]: ../hooks/use-matches


# `action`

Route actions are the "writes" to route [loader][loader] "reads". They provide a way for apps to perform data mutations with simple HTML and HTTP semantics while React Router abstracts away the complexity of asynchronous UI and revalidation. This gives you the simple mental model of HTML + HTTP (where the browser handles the asynchrony and revalidation) with the behavior and UX capabilities of modern SPAs.

<docs-error>This feature only works if using a data router like [`createBrowserRouter`][createbrowserrouter]</docs-error>

```tsx
<Route
  path="/song/:songId/edit"
  element={<EditSong />}
  action={async ({ params, request }) => {
    let formData = await request.formData();
    return fakeUpdateSong(params.songId, formData);
  }}
  loader={({ params }) => {
    return fakeGetSong(params.songId);
  }}
/>
```

Actions are called whenever the app sends a non-get submission ("post", "put", "patch", "delete") to your route. This can happen in a few ways:

```tsx
// forms
<Form method="post" action="/songs" />;
<fetcher.Form method="put" action="/songs/123/edit" />;

// imperative submissions
let submit = useSubmit();
submit(data, {
  method: "delete",
  action: "/songs/123",
});
fetcher.submit(data, {
  method: "patch",
  action: "/songs/123/edit",
});
```

## `params`

Route params are parsed from [dynamic segments][dynamicsegments] and passed to your action. This is useful for figuring out which resource to mutate:

```tsx
<Route
  path="/projects/:projectId/delete"
  action={({ params }) => {
    return fakeDeleteProject(params.projectId);
  }}
/>
```

## `request`

This is a [Fetch Request][request] instance being sent to your route. The most common use case is to parse the [FormData][formdata] from the request

```tsx
<Route
  action={async ({ request }) => {
    let formData = await request.formData();
    // ...
  }}
/>
```

> A Request?!

It might seem odd at first that actions receive a "request". Have you ever written this line of code?

```tsx [3]
<form
  onSubmit={(event) => {
    event.preventDefault();
    // ...
  }}
/>
```

What exactly are you preventing?

Without JavaScript, just plain HTML and an HTTP web server, that default event that was prevented is actually pretty great. Browsers will serialize all the data in the form into [`FormData`][formdata] and send it as the body of a new request to your server. Like the code above, React Router [`<Form>`][form] prevents the browser from sending that request and instead sends the request to your route action! This enables highly dynamic web apps with the simple model of HTML and HTTP.

Remember that the values in the `formData` are automatically serialized from the form submission, so your inputs need a `name`.

```tsx
<Form method="post">
  <input name="songTitle" />
  <textarea name="lyrics" />
  <button type="submit">Save</button>
</Form>;

// accessed by the same names
formData.get("songTitle");
formData.get("lyrics");
```

For more information on `formData` see [Working with FormData][workingwithformdata].

## Returning Responses

While you can return anything you want from an action and get access to it from [`useActionData`][useactiondata], you can also return a web [Response][response].

For more information, see the [loader documentation][returningresponses].

## Throwing in Actions

You can `throw` in your action to break out of the current call stack (stop running the current code) and React Router will start over down the "error path".

```tsx [10]
<Route
  action={async ({ params, request }) => {
    const res = await fetch(
      `/api/properties/${params.id}`,
      {
        method: "put",
        body: await request.formData(),
      }
    );
    if (!res.ok) throw res;
    return { ok: true };
  }}
/>
```

For more details and expanded use cases, read the [errorElement][errorelement] documentation.

[loader]: ./loader
[pickingarouter]: ../routers/picking-a-router
[dynamicsegments]: ./route#dynamic-segments
[formdata]: https://developer.mozilla.org/en-US/docs/Web/API/FormData
[request]: https://developer.mozilla.org/en-US/docs/Web/API/Request
[response]: https://developer.mozilla.org/en-US/docs/Web/API/Response
[url]: https://developer.mozilla.org/en-US/docs/Web/API/URL
[urlsearchparams]: https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams
[migratingtoremix]: ../guides/migrating-to-remix
[useloaderdata]: ../hooks/use-loader-data
[json]: ../fetch/json
[errorelement]: ./error-element
[form]: ../components/form
[workingwithformdata]: ../guides/form-data
[useactiondata]: ../hooks/use-action-data
[returningresponses]: ./loader#returning-responses
[createbrowserrouter]: ../routers/create-browser-router

# `errorElement`

When exceptions are thrown in [loaders][loader], [actions][action], or component rendering, instead of the normal render path for your Routes (`<Route element>`), the error path will be rendered (`<Route errorElement>`) and the error made available with [`useRouteError`][userouteerror].

<docs-error>This feature only works if using a data router like [`createBrowserRouter`][createbrowserrouter]</docs-error>

```tsx
<Route
  path="/invoices/:id"
  // if an exception is thrown here
  loader={loadInvoice}
  // here
  action={updateInvoice}
  // or here
  element={<Invoice />}
  // this will render instead of `element`
  errorElement={<ErrorBoundary />}
/>;

function Invoice() {
  return <div>Happy {path}</div>;
}

function ErrorBoundary() {
  let error = useRouteError();
  console.error(error);
  // Uncaught ReferenceError: path is not defined
  return <div>Dang!</div>;
}
```

## Bubbling

When a route does not have an `errorElement`, errors will bubble up through parent routes. This lets you get as granular or general as you like.

Put an `errorElement` at the top of your route tree and handle nearly every error in your app in one place. Or, put them on all of your routes and allow the parts of the app that don't have errors to continue to render normally. This gives the user more options to recover from errors instead of a hard refresh and 🤞.

### Default Error Element

<docs-warning>We recommend _always_ providing at least a root-level `errorElement` before shipping your application to production, because the UI of the default `errorElement` is ugly and not intended for end-user consumption.</docs-warning>

If you do not provide an `errorElement` in your route tree to handle a given error, errors will bubble up and be handled by a default `errorElement` which will print the error message and stack trace. Some folks have questioned why the stack trace shows up in production builds. Normally, you don't want to expose stack traces on your production sites for security reasons. However, this is more applicable to server-side errors (and Remix does indeed strip stack traces from server-side loader/action responses). In the case of client-side `react-router-dom` applications the code is already available in the browser anyway so any hiding is just security through obscurity. Furthermore, we would still want to expose the error in the console, so removing it from the UI display is still not hiding any information about the stack trace. Not showing it in the UI _and_ not logging it to to the console would mean that application developers have no information _at all_ about production bugs, which poses its own set of issues. So, again we recommend you always add a root level `errorElement` before deploying your site to production!

## Throwing Manually

While `errorElement` handles unexpected errors, it can also be used to handle exceptions you expect.

Particularly in loaders and actions, where you work with external data not in your control, you can't always plan on the data existing, the service being available, or the user having access to it. In these cases you can `throw` your own exceptions.

Here's a "not found" case in a [loader][loader]:

```tsx [4,7-9]
<Route
  path="/properties/:id"
  element={<PropertyForSale />}
  errorElement={<PropertyError />}
  loader={async ({ params }) => {
    const res = await fetch(`/api/properties/${params.id}`);
    if (res.status === 404) {
      throw new Response("Not Found", { status: 404 });
    }
    const home = await res.json();
    const descriptionHtml = parseMarkdown(
      data.descriptionMarkdown
    );
    return { home, descriptionHtml };
  }}
/>
```

As soon as you know you can't render the route with the data you're loading, you can throw to break the call stack. You don't have to worry about the rest of the work in the loader (like parsing the user's markdown bio) when it doesn't exist. Just throw and get out of there.

This also means you don't have to worry about a bunch of error branching code in your route component, it won't even try to render if you throw in the loader or action, instead your `errorElement` will render.

You can throw anything from a loader or action just like you can return anything: responses (like the previous example), errors, or plain objects.

## Throwing Responses

While you can throw anything and it will be provided back to you through [`useRouteError`][userouteerror], If you throw a [Response][response], React Router will automatically parse the response data before returning it to your components.

Additionally, [`isRouteErrorResponse`][isrouteerrorresponse] lets you check for this specific type in your boundaries. Coupled with [`json`][json], you can easily throw responses with some data and render different cases in your boundary:

```tsx
import { json } from "react-router-dom";

function loader() {
  const stillWorksHere = await userStillWorksHere();
  if (!stillWorksHere) {
    throw json(
      {
        sorry: "You have been fired.",
        hrEmail: "hr@bigco.com",
      },
      { status: 401 }
    );
  }
}

function ErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error) && error.status === 401) {
    // the response json is automatically parsed to
    // `error.data`, you also have access to the status
    return (
      <div>
        <h1>{error.status}</h1>
        <h2>{error.data.sorry}</h2>
        <p>
          Go ahead and email {error.data.hrEmail} if you
          feel like this is a mistake.
        </p>
      </div>
    );
  }

  // rethrow to let the parent error boundary handle it
  // when it's not a special case for this route
  throw error;
}
```

This makes it possible to create a general error boundary, usually on your root route, that handles many cases:

```tsx
function RootBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    if (error.status === 404) {
      return <div>This page doesn't exist!</div>;
    }

    if (error.status === 401) {
      return <div>You aren't authorized to see this</div>;
    }

    if (error.status === 503) {
      return <div>Looks like our API is down</div>;
    }

    if (error.status === 418) {
      return <div>🫖</div>;
    }
  }

  return <div>Something went wrong</div>;
}
```

## Abstractions

This pattern of throwing when you know you can't continue down the data loading path you're on makes it pretty simple to properly handle exceptional situations.

Imagine a function that gets the user's web token for authorized requests looking something like this:

```tsx
async function getUserToken() {
  const token = await getTokenFromWebWorker();
  if (!token) {
    throw new Response("", { status: 401 });
  }
  return token;
}
```

No matter which loader or action uses that function, it will stop executing code in the current call stack and send the app over to the error path instead.

Now let's add a function that fetches a project:

```tsx
function fetchProject(id) {
  const token = await getUserToken();
  const response = await fetch(`/projects/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (response.status === 404) {
    throw new Response("Not Found", { status: 404 });
  }

  // the fetch failed
  if (!response.ok) {
    throw new Error("Could not fetch project");
  }
}
```

Thanks to `getUserToken`, this code can assume it gets a token. If there isn't one, the error path will be rendered. Then if the project doesn't exist, no matter which loader is calling this function, it will throw a 404 over to the `errorElement`. Finally, if the fetch fails completely, it will send an error.

At any time you realize "I don't have what I need", you can simply `throw`, knowing that you're still rendering something useful for the end user.

Let's put it together into a route:

```tsx
<Route
  path="/"
  element={<Root />}
  errorElement={<RootBoundary />}
>
  <Route
    path="projects/:projectId"
    loader={({ params }) => fetchProject(params.projectId)}
    element={<Project />}
  />
</Route>
```

The project route doesn't have to think about errors at all. Between the loader utility functions like `fetchProject` and `getUserToken` throwing whenever something isn't right, and the `RootBoundary` handling all of the cases, the project route gets to focus strictly on the happy path.

[loader]: ./loader
[action]: ./action
[userouteerror]: ../hooks/use-route-error
[pickingarouter]: ../routers/picking-a-router
[response]: https://developer.mozilla.org/en-US/docs/Web/API/Response
[isrouteerrorresponse]: ../utils/is-route-error-response
[json]: ../fetch/json
[createbrowserrouter]: ../routers/create-browser-router

# `loader`

Each route can define a "loader" function to provide data to the route element before it renders.

<docs-warning>This feature only works if using a data router, see [Picking a Router][pickingarouter]</docs-warning>

```js [5-7,12-14]
createBrowserRouter([
  {
    element: <Teams />,
    path: "teams",
    loader: async () => {
      return fakeDb.from("teams").select("*");
    },
    children: [
      {
        element: <Team />,
        path: ":teamId",
        loader: async ({ params }) => {
          return fetch(`/api/teams/${params.teamId}.json`);
        },
      },
    ],
  },
]);
```

As the user navigates around the app, the loaders for the next matching branch of routes will be called in parallel and their data made available to components through [`useLoaderData`][useloaderdata].

## `params`

Route params are parsed from [dynamic segments][dynamicsegments] and passed to your loader. This is useful for figuring out which resource to load:

```tsx
createBrowserRouter([
  {
    path: "/teams/:teamId",
    loader: ({ params }) => {
      return fakeGetTeam(params.teamId);
    },
  },
]);
```

Note that the `:teamId` in the path is parsed as provided as `params.teamId` by the same name.

## `request`

This is a [Fetch Request][request] instance being made to your application.

```jsx
function loader({ request }) {}
```

> A request?!

It might seem odd at first that loaders receive a "request". Consider that `<Link>` does something like the following code and ask yourself, "what default behavior is being prevented here?".

```tsx [4]
<a
  href={props.to}
  onClick={(event) => {
    event.preventDefault();
    navigate(props.to);
  }}
/>
```

Without React Router, the browser would have made a <i>Request</i> to your server, but React Router prevented it! Instead of the browser sending the request to your server, React Router sends the request to your loaders.

The most common use case is creating a [URL][url] and reading the [URLSearchParams][urlsearchparams] from it:

```jsx
function loader({ request }) {
  const url = new URL(request.url);
  const searchTerm = url.searchParams.get("q");
  return searchProducts(searchTerm);
}
```

Note that the APIs here are not React Router specific, but rather standard web objects: [Request][request], [URL][url], [URLSearchParams][urlsearchparams].

## Returning Responses

While you can return anything you want from a loader and get access to it from [`useLoaderData`][useloaderdata], you can also return a web [Response][response].

This might not seem immediately useful, but consider `fetch`. Since the return value of `fetch` is a Response, and loaders understand responses, many loaders can return a simple fetch!

```tsx
// an HTTP/REST API
function loader({ request }) {
  return fetch("/api/teams.json", {
    signal: request.signal,
  });
}

// or even a graphql endpoint
function loader({ request, params }) {
  return fetch("/_gql", {
    signal: request.signal,
    method: "post",
    body: JSON.stringify({
      query: gql`...`,
      params: params,
    }),
  });
}
```

You can construct the response yourself as well:

```tsx [3-8]
function loader({ request, params }) {
  const data = { some: "thing" };
  return new Response(JSON.stringify(data), {
    status: 200,
    headers: {
      "Content-Type": "application/json; utf-8",
    },
  });
}
```

React Router will automatically call `response.json()` so your components don't need to parse it while rendering:

```tsx
function SomeRoute() {
  const data = useLoaderData();
  // { some: "thing" }
}
```

Using the [`json`][json] utility simplifies this so you don't have to construct them yourself. This next example is effectively the same as the previous example:

```jsx
import { json } from "react-router-dom";

function loader({ request, params }) {
  const data = { some: "thing" };
  return json(data, { status: 200 });
}
```

If you're planning an upgrade to Remix, returning responses from every loader will make the migration smoother.

## Throwing in Loaders

You can `throw` in your loader to break out of the current call stack (stop running the current code) and React Router will start over down the "error path".

```tsx [4]
function loader({ request, params }) {
  const res = await fetch(`/api/properties/${params.id}`);
  if (res.status === 404) {
    throw new Response("Not Found", { status: 404 });
  }
  return res.json();
}
```

For more details, read the [`errorElement`][errorelement] documentation.

[dynamicsegments]: ./route#dynamic-segments
[request]: https://developer.mozilla.org/en-US/docs/Web/API/Request
[response]: https://developer.mozilla.org/en-US/docs/Web/API/Response
[url]: https://developer.mozilla.org/en-US/docs/Web/API/URL
[urlsearchparams]: https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams
[migratingtoremix]: ../guides/migrating-to-remix
[useloaderdata]: ../hooks/use-loader-data
[json]: ../fetch/json
[errorelement]: ./error-element
[pickingarouter]: ../routers/picking-a-router


# `shouldRevalidate`

This function allows you opt-out of revalidation for a route's loader as an optimization.

<docs-warning>This feature only works if using a data router, see [Picking a Router][pickingarouter]</docs-warning>

There are several instances where data is revalidated, keeping your UI in sync with your data automatically:

- After an [`action`][action] is called from a [`<Form>`][form].
- After an [`action`][action] is called from a [`<fetcher.Form>`][fetcher]
- After an [`action`][action] is called from [`useSubmit`][usesubmit]
- After an [`action`][action] is called from a [`fetcher.submit`][fetcher]
- When the [URL params][params] change for an already rendered route
- When the URL Search params change
- When navigating to the same URL as the current URL

If you define `shouldRevalidate` on a route, it will first check the function before calling the route loader for new data. If the function returns `false`, then the loader _will not_ be called and the existing data for that loader will persist on the page.

```jsx lines=[5-9,14-15,21-22]
<Route
  path="meals-plans"
  element={<MealPlans />}
  loader={loadMealPlans}
  shouldRevalidate={({ currentUrl }) => {
    // only revalidate if the submission originates from
    // the `/meal-plans/new` route.
    return currentUrl.pathname === "/meal-plans/new";
  }}
>
  <Route
    path="new"
    element={<NewMealPlanForm />}
    // `loadMealPlans` will be revalidated after
    // this action...
    action={createMealPlan}
  />
  <Route
    path=":planId/meal"
    element={<Meal />}
    // ...but not this one because origin the URL
    // is not "/meal-plans/new"
    action={updateMeal}
  />
</Route>
```

Note that this is only for data that has already been loaded, is currently rendered, and will continue to be rendered at the new URL. Data for new routes and fetchers at the new URL will always be fetched initially.

<docs-warning>Using this API risks your UI getting out of sync with your data, use with caution!</docs-warning>

## Type Declaration

```ts
interface ShouldRevalidateFunction {
  (args: {
    currentUrl: URL;
    currentParams: AgnosticDataRouteMatch["params"];
    nextUrl: URL;
    nextParams: AgnosticDataRouteMatch["params"];
    formMethod?: Submission["formMethod"];
    formAction?: Submission["formAction"];
    formEncType?: Submission["formEncType"];
    formData?: Submission["formData"];
    actionResult?: DataResult;
    defaultShouldRevalidate: boolean;
  }): boolean;
}
```

[action]: ./action
[form]: ../components/form
[fetcher]: ../hooks/use-fetcher
[usesubmit]: ../hooks/use-submit
[loader]: ./loader
[useloaderdata]: ../hooks/use-loader-data
[params]: ./route#dynamic-segments
[pickingarouter]: ../routers/picking-a-router

# Components
## `<Await>`

Used to render [deferred][defer] values with automatic error handling. Make sure to review the [Deferred Data Guide][deferred guide] since there are a few APIs that work together with this component.

```jsx lines=[1,10-18]
import { Await, useLoaderData } from "react-router-dom";

function Book() {
  const { book, reviews } = useLoaderData();
  return (
    <div>
      <h1>{book.title}</h1>
      <p>{book.description}</p>
      <React.Suspense fallback={<ReviewsSkeleton />}>
        <Await
          resolve={reviews}
          errorElement={
            <div>Could not load reviews 😬</div>
          }
          children={(resolvedReviews) => (
            <Reviews items={resolvedReviews} />
          )}
        />
      </React.Suspense>
    </div>
  );
}
```

**Note:** `<Await>` expects to be rendered inside of a `<React.Suspense>` or `<React.SuspenseList>` parent to enable the fallback UI.

## Type declaration

```tsx
declare function Await(
  props: AwaitProps
): React.ReactElement;

interface AwaitProps {
  children: React.ReactNode | AwaitResolveRenderFunction;
  errorElement?: React.ReactNode;
  resolve: TrackedPromise | any;
}

interface AwaitResolveRenderFunction {
  (data: Awaited<any>): React.ReactElement;
}
```

## `children`

Can either be React elements or a function.

When using a function, the value is provided as the only parameter.

```tsx [2]
<Await resolve={reviewsPromise}>
  {(resolvedReviews) => <Reviews items={resolvedReviews} />}
</Await>
```

When using React elements, [`useAsyncValue`][useasyncvalue] will provide the data:

```tsx [2]
<Await resolve={reviewsPromise}>
  <Reviews />
</Await>;

function Reviews() {
  const resolvedReviews = useAsyncValue();
  return <div>{/* ... */}</div>;
}
```

## `errorElement`

The error element renders instead of the children when the promise rejects. You can access the error with [`useAsyncError`][useasyncerror].

If the promise rejects, you can provide an optional `errorElement` to handle that error in a contextual UI via the `useAsyncError` hook.

```tsx [3,9]
<Await
  resolve={reviewsPromise}
  errorElement={<ReviewsError />}
>
  <Reviews />
</Await>;

function ReviewsError() {
  const error = useAsyncError();
  return <div>{error.message}</div>;
}
```

If you do not provide an errorElement, the rejected value will bubble up to the nearest route-level [`errorElement`][routeerrorelement] and be accessible via the [`useRouteError`][userouteerror] hook.

## `resolve`

Takes a promise returned from a [deferred][defer] [loader][loader] value to be resolved and rendered.

```jsx [12,15,24,32-33]
import {
  defer,
  Route,
  useLoaderData,
  Await,
} from "react-router-dom";

// given this route
<Route
  loader={async () => {
    let book = await getBook();
    let reviews = getReviews(); // not awaited
    return defer({
      book,
      reviews, // this is a promise
    });
  }}
  element={<Book />}
/>;

function Book() {
  const {
    book,
    reviews, // this is the same promise
  } = useLoaderData();
  return (
    <div>
      <h1>{book.title}</h1>
      <p>{book.description}</p>
      <React.Suspense fallback={<ReviewsSkeleton />}>
        <Await
          // and is the promise we pass to Await
          resolve={reviews}
        >
          <Reviews />
        </Await>
      </React.Suspense>
    </div>
  );
}
```

[useloaderdata]: ../hooks/use-loader-data
[userouteerror]: ../hooks/use-route-error
[defer]: ../utils/defer
[deferred guide]: ../guides/deferred
[useasyncvalue]: ../hooks/use-async-value
[useasyncerror]: ../hooks/use-async-error
[routeerrorelement]: ../route/error-element
[loader]: ../route/loader

# `<Form>`

The Form component is a wrapper around a plain HTML [form][htmlform] that emulates the browser for client side routing and data mutations. It is _not_ a form validation/state management library like you might be used to in the React ecosystem (for that, we recommend the browser's built in [HTML Form Validation][formvalidation] and data validation on your backend server).

<docs-warning>This feature only works if using a data router, see [Picking a Router][pickingarouter]</docs-warning>

```tsx
import { Form } from "react-router-dom";

function NewEvent() {
  return (
    <Form method="post" action="/events">
      <input type="text" name="title" />
      <input type="text" name="description" />
      <button type="submit">Create</button>
    </Form>
  );
}
```

<docs-info>Make sure your inputs have names or else the `FormData` will not include that field's value.</docs-info>

All of this will trigger state updates to any rendered [`useNavigation`][usenavigation] hooks so you can build pending indicators and optimistic UI while the async operations are in-flight.

If the form doesn't _feel_ like navigation, you probably want [`useFetcher`][usefetcher].

## `action`

The url to which the form will be submitted, just like [HTML form action][htmlformaction]. The only difference is the default action. With HTML forms, it defaults to the full URL. With `<Form>`, it defaults to the relative URL of the closest route in context.

Consider the following routes and components:

```jsx
function ProjectsLayout() {
  return (
    <>
      <Form method="post" />
      <Outlet />
    </>
  );
}

function ProjectsPage() {
  return <Form method="post" />;
}

<DataBrowserRouter>
  <Route
    path="/projects"
    element={<ProjectsLayout />}
    action={ProjectsLayout.action}
  >
    <Route
      path=":projectId"
      element={<ProjectsPage />}
      action={ProjectsPage.action}
    />
  </Route>
</DataBrowserRouter>;
```

If the the current URL is `"/projects/123"`, the form inside the child
route, `ProjectsPage`, will have a default action as you might expect: `"/projects/123"`. In this case, where the route is the deepest matching route, both `<Form>` and plain HTML forms have the same result.

But the form inside of `ProjectsLayout` will point to `"/projects"`, not the full URL. In other words, it points to the matching segment of the URL for the route in which the form is rendered.

This helps with portability as well as co-location of forms and their action handlers when if you add some convention around your route modules.

If you need to post to a different route, then add an action prop:

```tsx
<Form action="/projects/new" method="post" />
```

**See also:**

- [Index Search Param][indexsearchparam] (index vs parent route disambiguation)

## `method`

This determines the [HTTP verb](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods) to be used. The same as plain HTML [form method][htmlform-method], except it also supports "put", "patch", and "delete" in addition to "get" and "post". The default is "get".

### GET submissions

The default method is "get". Get submissions _will not call an action_. Get submissions are the same as a normal navigation (user clicks a link) except the user gets to supply the search params that go to the URL from the form.

```tsx
<Form method="get" action="/products">
  <input
    aria-label="search products"
    type="text"
    name="q"
  />
  <button type="submit">Search</button>
</Form>
```

Let's say the user types in "running shoes" and submits the form. React Router emulates the browser and will serialize the form into [URLSearchParams][urlsearchparams] and then navigate the user to `"/products?q=running+shoes"`. It's as if you rendered a `<Link to="/products?q=running+shoes">` as the developer, but instead you let the user supply the query string dynamically.

Your route loader can access these values most conveniently by creating a new [`URL`][url] from the `request.url` and then load the data.

```tsx
<Route
  path="/products"
  loader={async ({ request }) => {
    let url = new URL(request.url);
    let searchTerm = url.searchParams.get("q");
    return fakeSearchProducts(searchTerm);
  }}
/>
```

### Mutation Submissions

All other methods are "mutation submissions", meaning you intend to change something about your data with POST, PUT, PATCH, or DELETE. Note that plain HTML forms only support "post" and "get", we tend to stick to those two as well.

When the user submits the form, React Router will match the `action` to the app's routes and call the `<Route action>` with the serialized [`FormData`][formdata]. When the action completes, all of the loader data on the page will automatically revalidate to keep your UI in sync with your data.

The method will be available on [`request.method`][requestmethod] inside the route action that is called. You can use this to instruct your data abstractions about the intent of the submission.

```tsx
<Route
  path="/projects/:id"
  element={<Project />}
  loader={async ({ params }) => {
    return fakeLoadProject(params.id);
  }}
  action={async ({ request, params }) => {
    switch (request.method) {
      case "PUT": {
        let formData = await request.formData();
        let name = formData.get("projectName");
        return fakeUpdateProject(name);
      }
      case "DELETE": {
        return fakeDeleteProject(params.id);
      }
      default: {
        throw new Response("", { status: 405 });
      }
    }
  }}
/>;

function Project() {
  let project = useLoaderData();

  return (
    <>
      <Form method="put">
        <input
          type="text"
          name="projectName"
          defaultValue={project.name}
        />
        <button type="submit">Update Project</button>
      </Form>

      <Form method="delete">
        <button type="submit">Delete Project</button>
      </Form>
    </>
  );
}
```

As you can see, both forms submit to the same route but you can use the `request.method` to branch on what you intend to do. After the actions completes, the `loader` will be revalidated and the UI will automatically synchronize with the new data.

## `replace`

Instructs the form to replace the current entry in the history stack, instead of pushing the new entry.

```tsx
<Form replace />
```

The default behavior is conditional on the form behavior:

- `method=get` forms default to `false`
- submission methods depend on the `formAction` and `action` behavior:
  - if your `action` throws, then it will default to `false`
  - if your `action` redirects to the current location, it defaults to `true`
  - if your `action` redirects elsewhere, it defaults to `false`
  - if your `formAction` is the current location, it defaults to `true`
  - otherwise it defaults to `false`

We've found with `get` you often want the user to be able to click "back" to see the previous search results/filters, etc. But with the other methods the default is `true` to avoid the "are you sure you want to resubmit the form?" prompt. Note that even if `replace={false}` React Router _will not_ resubmit the form when the back button is clicked and the method is post, put, patch, or delete.

In other words, this is really only useful for GET submissions and you want to avoid the back button showing the previous results.

## `relative`

By default, paths are relative to the route hierarchy, so `..` will go up one `Route` level. Occasionally, you may find that you have matching URL patterns that do not make sense to be nested, and you're prefer to use relative _path_ routing. You can opt into this behavior with `<Form to="../some/where" relative="path">`

## `reloadDocument`

Instructs the form to skip React Router and submit the form with the browser's built in behavior.

```tsx
<Form reloadDocument />
```

This is recommended over `<form>` so you can get the benefits of default and relative `action`, but otherwise is the same as a plain HTML form.

Without a framework like [Remix][remix], or your own server handling of posts to routes, this isn't very useful.

See also:

- [`useNavigation`][usenavigation]
- [`useActionData`][useactiondata]
- [`useSubmit`][usesubmit]

## `preventScrollReset`

If you are using [`<ScrollRestoration>`][scrollrestoration], this lets you prevent the scroll position from being reset to the top of the window when the form action redirects to a new location.

```tsx
<Form method="post" preventScrollReset={true} />
```

See also: [`<Link preventScrollReset>`][link-preventscrollreset]

# Examples

TODO: More examples

## Large List Filtering

A common use case for GET submissions is filtering a large list, like ecommerce and travel booking sites.

```tsx
function FilterForm() {
  return (
    <Form method="get" action="/slc/hotels">
      <select name="sort">
        <option value="price">Price</option>
        <option value="stars">Stars</option>
        <option value="distance">Distance</option>
      </select>

      <fieldset>
        <legend>Star Rating</legend>
        <label>
          <input type="radio" name="stars" value="5" />{" "}
          ★★★★★
        </label>
        <label>
          <input type="radio" name="stars" value="4" /> ★★★★
        </label>
        <label>
          <input type="radio" name="stars" value="3" /> ★★★
        </label>
        <label>
          <input type="radio" name="stars" value="2" /> ★★
        </label>
        <label>
          <input type="radio" name="stars" value="1" /> ★
        </label>
      </fieldset>

      <fieldset>
        <legend>Amenities</legend>
        <label>
          <input
            type="checkbox"
            name="amenities"
            value="pool"
          />{" "}
          Pool
        </label>
        <label>
          <input
            type="checkbox"
            name="amenities"
            value="exercise"
          />{" "}
          Exercise Room
        </label>
      </fieldset>
      <button type="submit">Search</button>
    </Form>
  );
}
```

When the user submits this form, the form will be serialized to the URL with something like this, depending on the user's selections:

```
/slc/hotels?sort=price&stars=4&amenities=pool&amenities=exercise
```

You can access those values from the `request.url`

```tsx
<Route
  path="/:city/hotels"
  loader={async ({ request }) => {
    let url = new URL(request.url);
    let sort = url.searchParams.get("sort");
    let stars = url.searchParams.get("stars");
    let amenities = url.searchParams.getAll("amenities");
    return fakeGetHotels({ sort, stars, amenities });
  }}
/>
```

**See also:**

- [useSubmit][usesubmit]

[usenavigation]: ../hooks/use-navigation
[useactiondata]: ../hooks/use-action-data
[formdata]: https://developer.mozilla.org/en-US/docs/Web/API/FormData
[usefetcher]: ../hooks/use-fetcher
[htmlform]: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form
[htmlformaction]: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form#attr-action
[htmlform-method]: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form#attr-method
[urlsearchparams]: https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams
[url]: https://developer.mozilla.org/en-US/docs/Web/API/URL
[usesubmit]: ../hooks/use-submit
[requestmethod]: https://developer.mozilla.org/en-US/docs/Web/API/Request/method
[remix]: https://remix.run
[formvalidation]: https://developer.mozilla.org/en-US/docs/Learn/Forms/Form_validation
[indexsearchparam]: ../guides/index-search-param
[pickingarouter]: ../routers/picking-a-router
[scrollrestoration]: ./scroll-restoration
[link-preventscrollreset]: ./link#preventscrollreset

# `<Link>`

<docs-info>This is the web version of `<Link>`. For the React Native version, [go here][link-native].</docs-info>

<details>
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
  preventScrollReset?: boolean;
  relative?: "route" | "path";
}

type To = string | Partial<Path>;
```

</details>

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

<docs-info>`<Link to>` with a `..` behaves differently from a normal `<a href>` when the current URL ends with `/`. `<Link to>` ignores the trailing slash, and removes one URL segment for each `..`. But an `<a href>` value handles `..` differently when the current URL ends with `/` vs when it does not.</docs-info>

## `relative`

By default, links are relative to the route hierarchy, so `..` will go up one `Route` level. Occasionally, you may find that you have matching URL patterns that do not make sense to be nested, and you'd prefer to use relative _path_ routing. You can opt into this behavior with `relative`:

```jsx
// Contact and EditContact do not share additional UI layout
<Route path="/" element={<Layout />}>
  <Route path="contacts/:id" element={<Contact />} />
  <Route
    path="contacts/:id/edit"
    element={<EditContact />}
  />
</Route>;

function EditContact() {
  // Since Contact is not a parent of EditContact we need to go up one level
  // in the path, instead of one level in the Route hierarchy
  return (
    <Link to=".." relative="path">
      Cancel
    </Link>
  );
}
```

## `preventScrollReset`

If you are using [`<ScrollRestoration>`][scrollrestoration], this lets you prevent the scroll position from being reset to the top of the window when the link is clicked.

```tsx
<Link to="?tab=one" preventScrollReset={true} />
```

This does not prevent the scroll position from being restored when the user comes back to the location with the back/forward buttons, it just prevents the reset when the user clicks the link.

An example when you might want this behavior is a list of tabs that manipulate the url search params that aren't at the top of the page. You wouldn't want the scroll position to jump up to the top because it might scroll the toggled content out of the viewport!

```
      ┌─────────────────────────┐
      │                         ├──┐
      │                         │  │
      │                         │  │ scrolled
      │                         │  │ out of view
      │                         │  │
      │                         │ ◄┘
    ┌─┴─────────────────────────┴─┐
    │                             ├─┐
    │                             │ │ viewport
    │   ┌─────────────────────┐   │ │
    │   │  tab   tab   tab    │   │ │
    │   ├─────────────────────┤   │ │
    │   │                     │   │ │
    │   │                     │   │ │
    │   │ content             │   │ │
    │   │                     │   │ │
    │   │                     │   │ │
    │   └─────────────────────┘   │ │
    │                             │◄┘
    └─────────────────────────────┘

```

## `replace`

The `replace` property can be used if you'd like to replace the current entry in the history stack via [`history.replaceState`][history-replace-state] instead of the default usage of [`history.pushState`][history-push-state].

## `state`

The `state` property can be used to set a stateful value for the new location which is stored inside [history state][history-state]. This value can subsequently be accessed via `useLocation()`.

```tsx
<Link to="new-path" state={{ some: "value" }} />
```

You can access this state value while on the "new-path" route:

```ts
let { state } = useLocation();
```

[link-native]: ./link-native
[scrollrestoration]: ./scroll-restoration
[history-replace-state]: https://developer.mozilla.org/en-US/docs/Web/API/History/replaceState
[history-push-state]: https://developer.mozilla.org/en-US/docs/Web/API/History/pushState
[history-state]: https://developer.mozilla.org/en-US/docs/Web/API/History/state

# `<Link>` (React Native)

<docs-info>This is the React Native version of `<Link>`. For the web version, [go here][link].</docs-info>

<details>
  <summary>Type declaration</summary>

```tsx
declare function Link(props: LinkProps): React.ReactElement;

interface LinkProps extends TouchableHighlightProps {
  children?: React.ReactNode;
  onPress?(event: GestureResponderEvent): void;
  replace?: boolean;
  state?: any;
  to: To;
}
```

</details>

A `<Link>` is an element that lets the user navigate to another view by tapping it, similar to how `<a>` elements work in a web app. In `react-router-native`, a `<Link>` renders a `TouchableHighlight`. To override default styling and behaviour, please refer to the [Props reference for `TouchableHighlight`](https://reactnative.dev/docs/touchablehighlight#props).

```tsx
import * as React from "react";
import { View, Text } from "react-native";
import { Link } from "react-router-native";

function Home() {
  return (
    <View>
      <Text>Welcome!</Text>
      <Link to="/profile">
        <Text>Visit your profile</Text>
      </Link>
    </View>
  );
}
```

[link]: ./link

# `<NavLink>`

<details>
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

</details>

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

<details>
  <summary>Type declaration</summary>

```tsx
declare function Navigate(props: NavigateProps): null;

interface NavigateProps {
  to: To;
  replace?: boolean;
  state?: any;
  relative?: RelativeRoutingType;
}
```

</details>

A `<Navigate>` element changes the current location when it is rendered. It's a component wrapper around [`useNavigate`][use-navigate], and accepts all the same arguments as props.

<docs-info>Having a component-based version of the `useNavigate` hook makes it easier to use this feature in a [`React.Component`](https://reactjs.org/docs/react-component.html) subclass where hooks are not able to be used.</docs-info>

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

<details>
  <summary>Type declaration</summary>

```tsx
interface OutletProps {
  context?: unknown;
}
declare function Outlet(
  props: OutletProps
): React.ReactElement | null;
```

</details>

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

# Route APIs

Because the API and use cases for `<Route />` includes data loading, mutations, and more, `<Route>` has its own documentation category.

Please refer to:

- [`<Route>`][route]
- [`loader`][loader]
- [`action`][action]
- [`errorElement`][errorelement]
- [`shouldRevalidate`][shouldrevalidate]

[route]: ../route/route
[loader]: ../route/loader
[action]: ../route/action
[errorelement]: ../route/error-element
[shouldrevalidate]: ../route/should-revalidate

# `<Routes>`

Rendered anywhere in the app, `<Routes>` will match a set of child routes from the current [location][location].

```tsx
interface RoutesProps {
  children?: React.ReactNode;
  location?: Partial<Location> | string;
}

<Routes location>
  <Route />
</Routes>;
```

<docs-info>If you're using a data router like [`createBrowserRouter`][createbrowserrouter] it is uncommon to use this component as it does not participate in data loading.</docs-info>

Whenever the location changes, `<Routes>` looks through all its child routes to find the best match and renders that branch of the UI. `<Route>` elements may be nested to indicate nested UI, which also correspond to nested URL paths. Parent routes render their child routes by rendering an [`<Outlet>`][outlet].

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

[location]: ../hook/location
[outlet]: ./outlet
[use-route]: ../hooks/use-routes
[createbrowserrouter]: ../routers/create-browser-router

# `<ScrollRestoration />`

This component will emulate the browser's scroll restoration on location changes after loaders have completed to ensure the scroll position is restored to the right spot, even across domains.

<docs-warning>This feature only works if using a data router, see [Picking a Router][pickingarouter]</docs-warning>

You should only render one of these and it's recommended you render it in the root route of your app:

```tsx [1,7]
import { ScrollRestoration } from "react-router-dom";

function RootRouteComponent() {
  return (
    <div>
      {/* ... */}
      <ScrollRestoration />
    </div>
  );
}
```

## `getKey`

Optional prop that defines the key React Router should use to restore scroll positions.

```tsx
<ScrollRestoration
  getKey={(location, matches) => {
    // default behavior
    return location.key;
  }}
/>
```

By default it uses `location.key`, emulating the browser's default behavior without client side routing. The user can navigate to the same URL multiple times in the stack and each entry gets its own scroll position to restore.

Some apps may want to override this behavior and restore position based on something else. Consider a social app that has four primary pages:

- "/home"
- "/messages"
- "/notifications"
- "/search"

If the user starts at "/home", scrolls down a bit, clicks "messages" in the navigation menu, then clicks "home" in the navigation menu (not the back button!) there will be three entries in the history stack:

```
1. /home
2. /messages
3. /home
```

By default, React Router (and the browser) will have two different scroll positions stored for `1` and `3` even though they have the same URL. That means as the user navigated from `2` → `3` the scroll position goes to the top instead of restoring to where it was in `1`.

A solid product decision here is to keep the users scroll position on the home feed no matter how they got there (back button or new link clicks). For this, you'd want to use the `location.pathname` as the key.

```tsx
<ScrollRestoration
  getKey={(location, matches) => {
    return location.pathname;
  }}
/>
```

Or you may want to only use the pathname for some paths, and use the normal behavior for everything else:

```tsx
<ScrollRestoration
  getKey={(location, matches) => {
    const paths = ["/home", "/notifications"];
    return paths.includes(location.pathname)
      ? // home and notifications restore by pathname
        location.pathname
      : // everything else by location like the browser
        location.key;
  }}
/>
```

## Preventing Scroll Reset

When navigation creates new scroll keys, the scroll position is reset to the top of the page. You can prevent the "scroll to top" behavior from your links and forms:

```tsx
<Link preventScrollReset={true} />
<Form preventScrollReset={true} />
```

See also: [`<Link preventScrollReset>`][preventscrollreset], [`<Form preventScrollReset>`][form-preventscrollreset]

## Scroll Flashing

Without a server side rendering framework like [Remix][remix], you may experience some scroll flashing on initial page loads. This is because React Router can't restore scroll position until your JS bundles have downloaded, data has loaded, and the full page has rendered (if you're rendering a spinner, the viewport is likely not the size it was when the scroll position was saved).

Server Rendering frameworks can prevent scroll flashing because they can send a fully formed document on the initial load, so scroll can be restored when the page first renders.

[remix]: https://remix.run
[preventscrollreset]: ../components/link#preventscrollreset
[form-preventscrollreset]: ../components/form#preventscrollreset
[pickingarouter]: ../routers/picking-a-router

# `useActionData`

This hook provides the returned value from the previous navigation's `action` result, or `undefined` if there was no submission.

```tsx
import { useActionData } from "react-router-dom";

function SomeComponent() {
  let actionData = useActionData();
  // ...
}
```

The most common use-case for this hook is form validation errors. If the form isn't right, you can return the errors and let the user try again:

```tsx lines=[2,8,47]
import {
  useActionData,
  Form,
  redirect,
} from "react-router-dom";

export default function SignUp() {
  const errors = useActionData();

  return (
    <Form method="post">
      <p>
        <input type="text" name="email" />
        {errors?.email && <span>{errors.email}</span>}
      </p>

      <p>
        <input type="text" name="password" />
        {errors?.password && <span>{errors.password}</span>}
      </p>

      <p>
        <button type="submit">Sign up</button>
      </p>
    </Form>
  );
}

export async function action({ request }) {
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");
  const errors = {};

  // validate the fields
  if (typeof email !== "string" || !email.includes("@")) {
    errors.email =
      "That doesn't look like an email address";
  }

  if (typeof password !== "string" || password.length < 6) {
    errors.password = "Password must be > 6 characters";
  }

  // return data if we have errors
  if (Object.keys(errors).length) {
    return errors;
  }

  // otherwise create the user and redirect
  await createUser(email, password);
  return redirect("/dashboard");
}
```

# `useAsyncError`

Returns the rejection value from the nearest [`<Await>`][await] component.

```tsx [4,12]
import { useAsyncError, Await } from "react-router-dom";

function ErrorElement() {
  const error = useAsyncError();
  return (
    <p>Uh Oh, something went wrong! {error.message}</p>
  );
}

<Await
  resolve={promiseThatRejects}
  errorElement={<ErrorElement />}
/>;
```

See the [Deferred Data Guide][deferred] and [`<Await>` docs][await docs] for more information.

[await docs]: ../components/await
[deferred]: ../guides/deferred

# `useAsyncValue`

Returns the resolved data from the nearest `<Await>` ancestor component.

```tsx
function ProductVariants() {
  const variants = useAsyncValue();
  return <div>{/* ... */}</div>;
}

// Await creates the context for the value
<Await resolve={somePromiseForProductVariants}>
  <ProductVariants />
</Await>;
```

See the [Deferred Data Guide][deferred] and [`<Await>` docs][await docs] for more information.

[await docs]: ../components/await
[deferred]: ../guides/deferred

# `useBeforeUnload`

This hook is just a helper around `window.onbeforeunload`. It can be useful to save important application state on the page (to something like the browser's local storage), before the user navigates away from your page. That way if they come back you can restore any stateful information (restore form input values, etc.)

```tsx lines=[1,7-11]
import { useBeforeUnload } from "react-router-dom";

function SomeForm() {
  const [state, setState] = React.useState(null);

  // save it off before users navigate away
  useBeforeUnload(
    React.useCallback(() => {
      localStorage.stuff = state;
    }, [state])
  );

  // read it in when they return
  React.useEffect(() => {
    if (state === null && localStorage.stuff != null) {
      setState(localStorage.stuff);
    }
  }, [state]);

  return <>{/*... */}</>;
}
```

# `useFetcher`

In HTML/HTTP, data mutations and loads are modeled with navigation: `<a href>` and `<form action>`. Both cause a navigation in the browser. The React Router equivalents are [`<Link>`][link] and [`<Form>`][form].

But sometimes you want to call a [`loader`][loader] outside of navigation, or call an [`action`][action] (and get the data on the page to revalidate) without changing the URL. Or you need to have multiple mutations in-flight at the same time.

Many interactions with the server aren't navigation events. This hook lets you plug your UI into your actions and loaders without navigating.

<docs-warning>This feature only works if using a data router, see [Picking a Router][pickingarouter]</docs-warning>

This is useful when you need to:

- fetch data not associated with UI routes (popovers, dynamic forms, etc.)
- submit data to actions without navigating (shared components like a newsletter sign ups)
- handle multiple concurrent submissions in a list (typical "todo app" list where you can click multiple buttons and all should be pending at the same time)
- infinite scroll containers
- and more!

If you're building a highly interactive, "app like" user interface, you will `useFetcher` often.

```tsx
import { useFetcher } from "react-router-dom";

function SomeComponent() {
  const fetcher = useFetcher();

  // call submit or load in a useEffect
  React.useEffect(() => {
    fetcher.submit(data, options);
    fetcher.load(href);
  }, [fetcher]);

  // build your UI with these properties
  fetcher.state;
  fetcher.formData;
  fetcher.formMethod;
  fetcher.formAction;
  fetcher.data;

  // render a form that doesn't cause navigation
  return <fetcher.Form />;
}
```

Fetchers have a lot of built-in behavior:

- Automatically handles cancellation on interruptions of the fetch
- When submitting with POST, PUT, PATCH, DELETE, the action is called first
  - After the action completes, the data on the page is revalidated to capture any mutations that may have happened, automatically keeping your UI in sync with your server state
- When multiple fetchers are inflight at once, it will
  - commit the freshest available data as they each land
  - ensure no stale loads override fresher data, no matter which order the responses return
- Handles uncaught errors by rendering the nearest `errorElement` (just like a normal navigation from `<Link>` or `<Form>`)
- Will redirect the app if your action/loader being called returns a redirect (just like a normal navigation from `<Link>` or `<Form>`)

## `fetcher.state`

You can know the state of the fetcher with `fetcher.state`. It will be one of:

- **idle** - nothing is being fetched.
- **submitting** - A route action is being called due to a fetcher submission using POST, PUT, PATCH, or DELETE
- **loading** - The fetcher is calling a loader (from a `fetcher.load`) or is being revalidated after a separate submission or `useRevalidator` call

## `fetcher.Form`

Just like `<Form>` except it doesn't cause a navigation. <small>(You'll get over the dot in JSX ... we hope!)</small>

```tsx
function SomeComponent() {
  const fetcher = useFetcher();
  return (
    <fetcher.Form method="post" action="/some/route">
      <input type="text" />
    </fetcher.Form>
  );
}
```

## `fetcher.load()`

Loads data from a route loader.

```tsx lines=[8]
import { useFetcher } from "react-router-dom";

function SomeComponent() {
  const fetcher = useFetcher();

  useEffect(() => {
    if (fetcher.state === "idle" && !fetcher.data) {
      fetcher.load("/some/route");
    }
  }, [fetcher]);

  return <div>{fetcher.data || "Loading..."}</div>;
}
```

Although a URL might match multiple nested routes, a `fetcher.load()` call will only call the loader on the leaf match (or parent of [index routes][indexsearchparam]).

If you find yourself calling this function inside of click handlers, you can probably simplify your code by using `<fetcher.Form>` instead.

<docs-info>Any `fetcher.load` calls that are active on the page will be re-executed as part of revalidation (either after a navigation submission, another fetcher submission, or a `useRevalidator()` call)</docs-info>

## `fetcher.submit()`

The imperative version of `<fetcher.Form>`. If a user interaction should initiate the fetch, you should use `<fetcher.Form>`. But if you, the programmer are initiating the fetch (not in response to a user clicking a button, etc.), then use this function.

For example, you may want to log the user out after a certain amount of idle time:

```tsx lines=[1,5,10-13]
import { useFetcher } from "react-router-dom";
import { useFakeUserIsIdle } from "./fake/hooks";

export function useIdleLogout() {
  const fetcher = useFetcher();
  const userIsIdle = useFakeUserIsIdle();

  useEffect(() => {
    if (userIsIdle) {
      fetcher.submit(
        { idle: true },
        { method: "post", action: "/logout" }
      );
    }
  }, [userIsIdle]);
}
```

If you want to submit to an index route, use the [`?index` param][indexsearchparam].

If you find yourself calling this function inside of click handlers, you can probably simplify your code by using `<fetcher.Form>` instead.

## `fetcher.data`

The returned data from the loader or action is stored here. Once the data is set, it persists on the fetcher even through reloads and resubmissions.

```tsx
function ProductDetails({ product }) {
  const fetcher = useFetcher();

  return (
    <details
      onToggle={(event) => {
        if (
          event.currentTarget.open &&
          fetcher.state === "idle" &&
          !fetcher.data
        ) {
          fetcher.load(`/product/${product.id}/details`);
        }
      }}
    >
      <summary>{product.name}</summary>
      {fetcher.data ? (
        <div>{fetcher.data}</div>
      ) : (
        <div>Loading product details...</div>
      )}
    </details>
  );
}
```

## `fetcher.formData`

When using `<fetcher.Form>` or `fetcher.submit()`, the form data is available to build optimistic UI.

```tsx
function TaskCheckbox({ task }) {
  let fetcher = useFetcher();

  // while data is in flight, use that to immediately render
  // the state you expect the task to be in when the form
  // submission completes, instead of waiting for the
  // network to respond. When the network responds, the
  // formData will no longer be available and the UI will
  // use the value in `task.status` from the revalidation
  let status =
    fetcher.formData?.get("status") || task.status;

  let isComplete = status === "complete";

  return (
    <fetcher.Form method="post">
      <button
        type="submit"
        name="status"
        value={isComplete ? "incomplete" : "complete"}
      >
        {isComplete ? "Mark Incomplete" : "Mark Complete"}
      </button>
    </fetcher.Form>
  );
}
```

## `fetcher.formAction`

Tells you the action url the form is being submitted to.

```tsx
<fetcher.Form action="/mark-as-read" />;

// when the form is submitting
fetcher.formAction; // "mark-as-read"
```

## `fetcher.formMethod`

Tells you the method of the form being submitted: get, post, put, patch, or delete.

```tsx
<fetcher.Form method="post" />;

// when the form is submitting
fetcher.formMethod; // "post"
```

[loader]: ../route/loader
[action]: ../route/action
[pickingarouter]: ../routers/picking-a-router
[indexsearchparam]: ../guides/index-search-param
[link]: ../components/link
[form]: ../components/form

# `useFetchers`

Returns an array of all inflight [fetchers][usefetcher] without their `load`, `submit`, or `Form` properties (can't have parent components trying to control the behavior of their children! We know from IRL experience that this is a fool's errand.)

<docs-warning>This feature only works if using a data router, see [Picking a Router][pickingarouter]</docs-warning>

```tsx
import { useFetchers } from "react-router-dom";

function SomeComp() {
  const fetchers = useFetchers();
  // array of inflight fetchers
}
```

This is useful for components throughout the app that didn't create the fetchers but want to use their submissions to participate in optimistic UI.

For example, imagine a UI where the sidebar lists projects, and the main view displays a list of checkboxes for the current project. The sidebar could display the number of completed and total tasks for each project.

```
+-----------------+----------------------------+
|                 |                            |
|   Soccer  (8/9) | [x] Do the dishes          |
|                 |                            |
| > Home    (2/4) | [x] Fold laundry           |
|                 |                            |
|                 | [ ] Replace battery in the |
|                 |     smoke alarm            |
|                 |                            |
|                 | [ ] Change lights in kids  |
|                 |     bathroom               |
|                 |                            |
+-----------------+----------------------------┘
```

When the user clicks a checkbox, the submission goes to the action to change the state of the task. Instead of creating a "loading state" we want to create an "optimistic UI" that will **immediately** update the checkbox to appear checked even though the server hasn't processed it yet. In the checkbox component, we can use `fetcher.submission`:

```tsx
function Task({ task }) {
  const { projectId, id } = task;
  const toggle = useFetcher();
  const checked = toggle.formData
    ? toggle.formData.get("complete") === "on"
    : task.complete;

  return (
    <toggle.Form
      method="put"
      action={`/projects/${projectId}/tasks/${id}`}
    >
      <input name="id" type="hidden" defaultValue={id} />
      <label>
        <input
          name="complete"
          type="checkbox"
          checked={checked}
          onChange={(e) => toggle.submit(e.target.form)}
        />
      </label>
    </toggle.Form>
  );
}
```

This awesome for the checkbox, but the sidebar will say 2/4 while the checkboxes show 3/4 when the user clicks on of them!

```
+-----------------+----------------------------+
|                 |                            |
|   Soccer  (8/9) | [x] Do the dishes          |
|                 |                            |
| > Home    (2/4) | [x] Fold laundry           |
|     WRONG! ^    |                            |
|          CLICK!-->[x] Replace battery in the |
|                 |     smoke alarm            |
|                 |                            |
|                 | [ ] Change lights in kids  |
|                 |     bathroom               |
|                 |                            |
+-----------------+----------------------------┘
```

Because routes are automatically revalidated, the sidebar will quickly update and be correct. But for a moment, it's gonna feel a little funny.

This is where `useFetchers` comes in. Up in the sidebar, we can access all the inflight fetcher states from the checkboxes - even though it's not the component that created them.

The strategy has three steps:

1. Find the submissions for tasks in a specific project
2. Use the `fetcher.formData` to immediately update the count
3. Use the normal task's state if it's not inflight

```tsx
function ProjectTaskCount({ project }) {
  let completedTasks = 0;
  const fetchers = useFetchers();

  // Find this project's fetchers
  const relevantFetchers = fetchers.filter((fetcher) => {
    return fetcher.formAction?.startsWith(
      `/projects/${project.id}/tasks/`
    );
  });

  // Store in a map for easy lookup
  const myFetchers = new Map(
    relevantFetchers.map(({ formData }) => [
      formData.get("id"),
      formData.get("complete") === "on",
    ])
  );

  // Increment the count
  for (const task of project.tasks) {
    if (myFetchers.has(task.id)) {
      if (myFetchers.get(task.id)) {
        // if it's being submitted, increment optimistically
        completedTasks++;
      }
    } else if (task.complete) {
      // otherwise use the real task's data
      completedTasks++;
    }
  }

  return (
    <small>
      {completedTasks}/{project.tasks.length}
    </small>
  );
}
```

It's a little bit of work, but it's mostly just asking React Router for the state it's tracking and doing an optimistic calculation based on it.

[usefetcher]: ./use-fetcher
[pickingarouter]: ../routers/picking-a-router

# `useFormAction`

<details>
  <summary>Type declaration</summary>

```tsx
declare function useFormAction(
  action?: string,
  { relative }: { relative?: RelativeRoutingType } = {}
): string;
```

</details>

This hook is used internally in [`<Form>`][form] to automatically resolve default and relative actions to the current route in context. While uncommon, you can use it directly to do things like compute the correct action for a `<button formAction>` to change the action of the button's `<Form>`. <small>(Yes, HTML buttons can change the action of their form!)</small>

```tsx
import { useFormAction } from "react-router-dom";

function DeleteButton() {
  return (
    <button
      formAction={useFormAction("destroy")}
      formMethod="post"
    >
      Delete
    </button>
  );
}
```

It's also useful for automatically resolving the action for [`submit`][usesubmit] and [`fetcher.submit`][usefetchersubmit].

```tsx
let submit = useSubmit();
let action = useFormAction();
submit(formData, { action });
```

[form]: ../components/form
[usesubmit]: ./use-submit
[usefetchersubmit]: ./use-fetcher#fetchersubmit

# `useHref`

<details>
  <summary>Type declaration</summary>

```tsx
declare function useHref(
  to: To,
  options?: { relative?: RelativeRoutingType }
): string;
```

</details>

The `useHref` hook returns a URL that may be used to link to the given `to` location, even outside of React Router.

> **Tip:**
>
> You may be interested in taking a look at the source for the `<Link>`
> component in `react-router-dom` to see how it uses `useHref` internally to
> determine its own `href` value.

# `useInRouterContext`

<details>
  <summary>Type declaration</summary>

```tsx
declare function useInRouterContext(): boolean;
```

</details>

The `useInRouterContext` hooks returns `true` if the component is being rendered in the context of a `<Router>`, `false` otherwise. This can be useful for some 3rd-party extensions that need to know if they are being rendered in the context of a React Router app.

# `useLinkClickHandler`

<details>
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
    options?: { relative?: RelativeRoutingType };
  }
): (event: React.MouseEvent<E, MouseEvent>) => void;
```

</details>

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

<details>
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

</details>

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

# `useLoaderData`

This hook provides the value returned from your route loader.

```tsx lines=[4,12]
import {
  createBrowserRouter,
  RouterProvider,
  useLoaderData,
} from "react-router-dom";

function loader() {
  return fetchFakeAlbums();
}

export function Albums() {
  const albums = useLoaderData();
  // ...
}

const router = createBrowserRouter([
  {
    path: "/",
    loader: loader,
    element: <Albums />,
  },
]);

ReactDOM.createRoot(el).render(
  <RouterProvider router={router} />
);
```

After route [actions][actions] are called, the data will be revalidated automatically and return the latest result from your loader.

Note that `useLoaderData` _does not initiate a fetch_. It simply reads the result of a fetch React Router manages internally, so you don't need to worry about it refetching when it re-renders for reasons outside of routing.

This also means data returned is stable between renders, so you can safely pass it to dependency arrays in React hooks like `useEffect`. It only changes when the loader is called again after actions or certain navigations. In these cases the identity will change (even if the values don't).

You can use this hook in any component or any custom hook, not just the Route element. It will return the data from the nearest route on context.

To get data from any active route on the page, see [`useRouteLoaderData`][routeloaderdata].

[actions]: ../components/route#action
[routeloaderdata]: ./use-route-loader-data

# `useLocation`

<details>
  <summary>Type declaration</summary>

```tsx
declare function useLocation(): Location;

interface Location extends Path {
  state: unknown;
  key: Key;
}
```

</details>

This hook returns the current [`location`][location] object. This can be useful if you'd like to perform some side effect whenever the current location changes.

```tsx
import * as React from 'react';
import { useLocation } from 'react-router-dom';

function App() {
  let location = useLocation();

  React.useEffect(() => {
    // Google Analytics
    ga('send', 'pageview');
  }, [location]);

  return (
    // ...
  );
}
```

[location]: ../utils/location

# `useMatch`

<details>
  <summary>Type declaration</summary>

```tsx
declare function useMatch<
  ParamKey extends ParamParseKey<Path>,
  Path extends string
>(
  pattern: PathPattern<Path> | Path
): PathMatch<ParamKey> | null;
```

</details>

Returns match data about a route at the given path relative to the current location.

See [`matchPath`][matchpath] for more information.

[matchpath]: ../utils/match-path

# `useMatches`

Returns the current route matches on the page. This is most useful for creating abstractions in parent layouts to get access to their child route's data.

```js
import { useMatches } from "react-router-dom";

function SomeComponent() {
  const matches = useMatches();
  // [match1, match2, ...]
}
```

A `match` has the following shape:

```js
{
  // route id
  id,

  // the portion of the URL the route matched
  pathname,

  // the data from the loader
  data,

  // the parsed params from the URL
  params,

  // the <Route handle> with any app specific data
  handle,
};
```

Pairing `<Route handle>` with `useMatches` gets very powerful since you can put whatever you want on a route `handle` and have access to `useMatches` anywhere.

<docs-warning>`useMatches` only works with a data router like [`createBrowserRouter`][createbrowserrouter], since they know the full route tree up front and can provide all of the current matches. Additionally, `useMatches` will not match down into any descendant route trees since the router isn't aware of the descendant routes.</docs-warning>

## Breadcrumbs

The proverbial use case here is adding breadcrumbs to a parent layout that uses data from the child routes.

```jsx filename=app.jsx
<Route element={<Root />}>
  <Route
    path="messages"
    element={<Messages />}
    loader={loadMessages}
    handle={{
      // you can put whatever you want on a route handle
      // here we use "crumb" and return some elements,
      // this is what we'll render in the breadcrumbs
      // for this route
      crumb: () => <Link to="/messages">Messages</Link>,
    }}
  >
    <Route
      path="conversation/:id"
      element={<Thread />}
      loader={loadThread}
      handle={{
        // `crumb` is your own abstraction, we decided
        // to make this one a function so we can pass
        // the data from the loader to it so that our
        // breadcrumb is made up of dynamic content
        crumb: (data) => <span>{data.threadName}</span>,
      }}
    />
  </Route>
</Route>
```

Now we can create a `Breadcrumbs` component that takes advantage of our home-grown `crumb` abstraction with `useMatches` and `handle`.

```tsx filename=components/breadcrumbs.jsx
function Breadcrumbs() {
  let matches = useMatches();
  let crumbs = matches
    // first get rid of any matches that don't have handle and crumb
    .filter((match) => Boolean(match.handle?.crumb))
    // now map them into an array of elements, passing the loader
    // data to each one
    .map((match) => match.handle.crumb(match.data));

  return (
    <ol>
      {crumbs.map((crumb, index) => (
        <li key={index}>{crumb}</li>
      ))}
    </ol>
  );
}
```

Now you can render `<Breadcrumbs/>` anywhere you want, probably in the root component.

[createbrowserrouter]: ../routers/create-browser-router

# `useNavigate`

<docs-warning>It's usually better to use [`redirect`][redirect] in loaders and actions than this hook</docs-warning>

The `useNavigate` hook returns a function that lets you navigate programmatically, for example in an effect:

```tsx
import { useNavigate } from "react-router-dom";

function useLogoutTimer() {
  const userIsInactive = useFakeInactiveUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (userIsInactive) {
      fake.logout();
      navigate("/session-timed-out");
    }
  }, [userIsInactive]);
}
```

## Type Declaration

```tsx
declare function useNavigate(): NavigateFunction;

interface NavigateFunction {
  (
    to: To,
    options?: {
      replace?: boolean;
      state?: any;
      relative?: RelativeRoutingType;
    }
  ): void;
  (delta: number): void;
}
```

The `navigate` function has two signatures:

- Either pass a `To` value (same type as `<Link to>`) with an optional second `{ replace, state }` arg or
- Pass the delta you want to go in the history stack. For example, `navigate(-1)` is equivalent to hitting the back button.

[redirect]: ../fetch/redirect

# `useNavigation`

This hook tells you everything you need to know about a page navigation to build pending navigation indicators and optimistic UI on data mutations. Things like:

- Global loading indicators
- Disabling forms while a mutation is happening
- Adding busy indicators to submit buttons
- Optimistically showing a new record while it's being created on the server
- Optimistically showing the new state of a record while it's being updated

<docs-warning>This feature only works if using a data router, see [Picking a Router][pickingarouter]</docs-warning>

```js
import { useNavigation } from "react-router-dom";

function SomeComponent() {
  const navigation = useNavigation();
  navigation.state;
  navigation.location;
  navigation.formData;
  navigation.formAction;
  navigation.formMethod;
}
```

## `navigation.state`

- **idle** - There is no navigation pending.
- **submitting** - A route action is being called due to a form submission using POST, PUT, PATCH, or DELETE
- **loading** - The loaders for the next routes are being called to render the next page

Normal navigations and GET form submissions transition through these states:

```
idle → loading → idle
```

Form submissions with POST, PUT, PATCH, or DELETE transition through these states:

```
idle → submitting → loading → idle
```

Here's a simple submit button that changes its text when the navigation state is changing:

```tsx
function SubmitButton() {
  const navigation = useNavigation();

  const text =
    navigation.state === "submitting"
      ? "Saving..."
      : navigation.state === "loading"
      ? "Saved!"
      : "Go";

  return <button type="submit">{text}</button>;
}
```

While `navigation.state` provides the high-level state of the active navigation, you can deduce more granular information by combining it with other `navigation` aspects:

```js
// Is this just a normal load?
let isNormalLoad =
  navigation.state === "loading" &&
  navigation.formData == null;

// Are we reloading after an action?
let isReloading =
  navigation.state === "loading" &&
  navigation.formData != null &&
  navigation.formAction === navigation.location.pathname;

// Are we redirecting after an action?
let isRedirecting =
  navigation.state === "loading" &&
  navigation.formData != null &&
  navigation.formAction !== navigation.location.pathname;
```

## `navigation.formData`

Any POST, PUT, PATCH, or DELETE navigation that started from a `<Form>` or `useSubmit` will have your form's submission data attached to it. This is primarily useful to build "Optimistic UI" with the `submission.formData` [`FormData`](https://developer.mozilla.org/en-US/docs/Web/API/FormData) object.

In the case of a GET form submission, `formData` will be empty and the data will be reflected in `navigation.location.search`.

## `navigation.location`

This tells you what the next [location][location] is going to be.

Note that this link will not appear "pending" if a form is being submitted to the URL the link points to, because we only do this for "loading" states. The form will contain the pending UI for when the state is "submitting", once the action is complete, then the link will go pending.

[location]: ../utils/location
[pickingarouter]: ../routers/picking-a-router

# `useNavigationType`

<details>
  <summary>Type declaration</summary>

```tsx
declare function useNavigationType(): NavigationType;

type NavigationType = "POP" | "PUSH" | "REPLACE";
```

</details>

This hook returns the current type of navigation or how the user came to the current page; either via a pop, push, or replace action on the history stack.

# `useOutlet`

<details>
  <summary>Type declaration</summary>

```tsx
declare function useOutlet(): React.ReactElement | null;
```

</details>

Returns the element for the child route at this level of the route hierarchy. This hook is used internally by [`<Outlet>`][outlet] to render child routes.

[outlet]: ../components/outlet

# `useOutletContext`

<details>
  <summary>Type declaration</summary>

```tsx
declare function useOutletContext<
  Context = unknown
>(): Context;
```

</details>

Often parent routes manage state or other values you want shared with child routes. You can create your own [context provider](https://reactjs.org/docs/context.html) if you like, but this is such a common situation that it's built-into `<Outlet />`:

```tsx lines=[3]
function Parent() {
  const [count, setCount] = React.useState(0);
  return <Outlet context={[count, setCount]} />;
}
```

```tsx lines=[4]
import { useOutletContext } from "react-router-dom";

function Child() {
  const [count, setCount] = useOutletContext();
  const increment = () => setCount((c) => c + 1);
  return <button onClick={increment}>{count}</button>;
}
```

If you're using TypeScript, we recommend the parent component provide a custom hook for accessing the context value. This makes it easier for consumers to get nice typings, control consumers, and know who's consuming the context value. Here's a more realistic example:

```tsx filename=src/routes/dashboard.tsx lines=[13, 19]
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

<details>
  <summary>Type declaration</summary>

```tsx
declare function useParams<
  K extends string = string
>(): Readonly<Params<K>>;
```

</details>

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

<details>
  <summary>Type declaration</summary>

```tsx
declare function useResolvedPath(
  to: To,
  options?: { relative?: RelativeRoutingType }
): Path;
```

</details>

This hook resolves the `pathname` of the location in the given `to` value against the pathname of the current location.

This is useful when building links from relative values. For example, check out the source to [`<NavLink>`][navlink] which calls `useResolvedPath` internally to resolve the full pathname of the page being linked to.

See [resolvePath][resolvepath] for more information.

[navlink]: ../components/nav-link
[resolvepath]: ../utils/resolve-path

# `useRevalidator`

This hook allows you to revalidate the data for any reason. React Router automatically revalidates the data after actions are called, but you may want to revalidate for other reasons like when focus returns to the window.

<docs-warning>This feature only works if using a data router, see [Picking a Router][pickingarouter]</docs-warning>

```tsx
import { useRevalidator } from "react-router-dom";

function WindowFocusRevalidator() {
  let revalidator = useRevalidator();

  useFakeWindowFocus(() => {
    revalidator.revalidate();
  });

  return (
    <div hidden={revalidator.state === "idle"}>
      Revalidating...
    </div>
  );
}
```

Again, React Router already revalidates the data on the page automatically in the vast majority of cases so this should rarely be needed. If you find yourself using this for normal CRUD operations on your data in response to user interactions, you're probably not taking advantage of the other APIs like [`<Form>`][form], [`useSubmit`][usesubmit], or [`useFetcher`][usefetcher] that do this automatically.

## `revalidator.state`

Tells you the state the revalidation is in, either `"idle"` or `"loading"`.

This is useful for creating loading indicators and spinners to let the user know the app is thinking.

## `revalidator.revalidate()`

This initiates a revalidation.

```tsx
function useLivePageData() {
  let revalidator = useRevalidator();
  let interval = useInterval(5000);

  useEffect(() => {
    if (revalidator.state === "idle") {
      revalidator.revalidate();
    }
  }, [interval]);
}
```

## Notes

While you can render multiple occurrences of `useRevalidator` at the same time, underneath it is a singleton. This means when one `revalidator.revalidate()` is called, all instances go into the `"loading"` state together (or rather, they all update to report the singleton state).

Race conditions are automatically handled when calling `revalidate()` when a revalidation is already in progress.

If a navigation happens while a revalidation is in flight, the revalidation will be cancelled and fresh data will be requested from all loaders for the next page.

[form]: ../components/form
[usefetcher]: ./use-fetcher
[usesubmit]: ./use-submit
[pickingarouter]: ../routers/picking-a-router

# `useRouteError`

Inside of an [`errorElement`][errorelement], this hook returns anything thrown during an action, loader, or rendering. Note that thrown responses have special treatment, see [`isRouteErrorResponse`][isrouteerrorresponse] for more information.

<docs-warning>This feature only works if using a data router, see [Picking a Router][pickingarouter]</docs-warning>

```jsx
function ErrorBoundary() {
  const error = useRouteError();
  console.error(error);
  return <div>{error.message}</div>;
}

<Route
  errorElement={<ErrorBoundary />}
  loader={() => {
    // unexpected errors in loaders/actions
    something.that.breaks();
  }}
  action={() => {
    // stuff you throw on purpose in loaders/actions
    throw new Response("Bad Request", { status: 400 });
  }}
  element={
    // and errors thrown while rendering
    <div>{breaks.while.rendering}</div>
  }
/>;
```

[errorelement]: ../route/error-element
[isrouteerrorresponse]: ../utils/is-route-error-response
[pickingarouter]: ../routers/picking-a-router

# `useRouteLoaderData`

This hook makes the data at any currently rendered route available anywhere in the tree. This is useful for components deep in the tree needing data from routes much farther up, as well as parent routes needing the data of child routes deeper in the tree.

<docs-warning>This feature only works if using a data router, see [Picking a Router][pickingarouter]</docs-warning>

```tsx
import { useRouteLoaderData } from "react-router-dom";

function SomeComp() {
  const user = useRouteLoaderData("root");
  // ...
}
```

React Router stores data internally with deterministic, auto-generated route ids, but you can supply your own route id to make this hook much easier to work with. Consider a router with a route that defines an id:

```tsx [6]
createBrowserRouter([
  {
    path: "/",
    loader: () => fetchUser(),
    element: <Root />,
    id: "root",
    children: [
      {
        path: "jobs/:jobId",
        loader: loadJob,
        element: <JobListing />,
      },
    ],
  },
]);
```

Now the user is available anywhere else in the app.

```tsx
const user = useRouteLoaderData("root");
```

The only data available is the routes that are currently rendered. If you ask for data from a route that is not currently rendered, the hook will return `undefined`.

[pickingarouter]: ../routers/picking-a-router

# `useRoutes`

<details>
  <summary>Type declaration</summary>

```tsx
declare function useRoutes(
  routes: RouteObject[],
  location?: Partial<Location> | string;
): React.ReactElement | null;
```

</details>

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

<docs-info>This is the web version of `useSearchParams`. For the React Native version, [go here][usesearchparams-native].</docs-info>

<details>
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
  nextInit?:
    | URLSearchParamsInit
    | ((prev: URLSearchParams) => URLSearchParamsInit),
  navigateOpts?: : NavigateOptions
) => void;

interface NavigateOptions {
  replace?: boolean;
  state?: any;
  preventScrollReset?: boolean;
}
```

</details>

The `useSearchParams` hook is used to read and modify the query string in the URL for the current location. Like React's own [`useState` hook][usestate], `useSearchParams` returns an array of two values: the current location's [search params][searchparams] and a function that may be used to update them. Just as React's [`useState` hook][usestate], `setSearchParams` also supports [functional updates][functional-updates]. Therefore, you may provide a function that takes a `searchParams` and returns an updated version.

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

<docs-info>The `setSearchParams` function works like [`navigate`][usenavigate], but only for the [search portion](https://developer.mozilla.org/en-US/docs/Web/API/Location/search) of the URL. Also note that the second arg to `setSearchParams` is the same type as the second arg to `navigate`.</docs-info>

[functional-updates]: https://reactjs.org/docs/hooks-reference.html#functional-updates
[searchparams]: https://developer.mozilla.org/en-US/docs/Web/API/URL/searchParams
[usesearchparams-native]: ./use-search-params-rn
[usestate]: https://reactjs.org/docs/hooks-reference.html#usestate
[usenavigate]: ./use-navigate

# `useSearchParams` (React Native)

<docs-info>This is the React Native version of `useSearchParams`. For the web version, [go here][usesearchparams].</docs-info>

<details>
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
  nextInit?:
    | URLSearchParamsInit
    | ((prev: URLSearchParams) => URLSearchParamsInit),
  navigateOpts?: : NavigateOptions
) => void;

interface NavigateOptions {
  replace?: boolean;
  state?: any;
  preventScrollReset?: boolean;
}
```

</details>

The `useSearchParams` hook is used to read and modify the query string in the URL for the current location. Like React's own [`useState` hook][usestate], `useSearchParams` returns an array of two values: the current location's [search params][searchparams] and a function that may be used to update them. Just as React's [`useState` hook][usestate], `setSearchParams` also supports [functional updates][functional-updates]. Therefore, you may provide a function that takes a `searchParams` and returns an updated version.

```tsx
import * as React from "react";
import { View, SearchForm, TextInput } from "react-native";
import { useSearchParams } from "react-router-native";

function App() {
  let [searchParams, setSearchParams] = useSearchParams();
  let [query, setQuery] = React.useState(
    searchParams.get("query")
  );

  function handleSubmit() {
    setSearchParams({ query });
  }

  return (
    <View>
      <SearchForm onSubmit={handleSubmit}>
        <TextInput value={query} onChangeText={setQuery} />
      </SearchForm>
    </View>
  );
}
```

[functional-updates]: https://reactjs.org/docs/hooks-reference.html#functional-updates
[searchparams]: https://developer.mozilla.org/en-US/docs/Web/API/URL/searchParams
[usesearchparams]: ./use-search-params
[usestate]: https://reactjs.org/docs/hooks-reference.html#usestate

# `useSubmit`

The imperative version of `<Form>` that let's you, the programmer, submit a form instead of the user.

<docs-warning>This feature only works if using a data router, see [Picking a Router][pickingarouter]</docs-warning>

For example, submitting the form every time a value changes inside the form:

```tsx [8]
import { useSubmit, Form } from "react-router-dom";

function SearchField() {
  let submit = useSubmit();
  return (
    <Form
      onChange={(event) => {
        submit(event.currentTarget);
      }}
    >
      <input type="text" name="search" />
      <button type="submit">Search</button>
    </Form>
  );
}
```

This can also be useful if you'd like to automatically sign someone out of your website after a period of inactivity. In this case, we've defined inactivity as the user hasn't navigated to any other pages after 5 minutes.

```tsx lines=[1,10,15]
import { useSubmit, useLocation } from "react-router-dom";
import { useEffect } from "react";

function AdminPage() {
  useSessionTimeout();
  return <div>{/* ... */}</div>;
}

function useSessionTimeout() {
  const submit = useSubmit();
  const location = useLocation();

  useEffect(() => {
    const timer = setTimeout(() => {
      submit(null, { method: "post", action: "/logout" });
    }, 5 * 60_000);

    return () => clearTimeout(timer);
  }, [submit, location]);
}
```

## Submit target

The first argument to submit accepts many different values.

You can submit any form or form input element:

```tsx
// input element events
<input onChange={(event) => submit(event.currentTarget)} />;

// React refs
let ref = useRef();
<button ref={ref} />;
submit(ref.current);
```

You can submit `FormData`:

```tsx
let formData = new FormData();
formData.append("cheese", "gouda");
submit(formData);
```

## Submit options

The second argument is a set of options that map directly to form submission attributes:

```tsx
submit(null, {
  action: "/logout",
  method: "post",
});

// same as
<Form action="/logout" method="post" />;
```

[pickingarouter]: ../routers/picking-a-router

# `json`

A shortcut for:

```jsx
new Response(JSON.stringify(someValue), {
  headers: {
    "Content-Type": "application/json; utf-8",
  },
});
```

Typically used in loaders:

```jsx
import { json } from "react-router-dom";

const loader = async () => {
  const data = getSomeData();
  return json(data);
};
```

See also:

- [Returning Responses from Loaders][responses]

[responses]: ../route/loader#returning-responses

# `redirect`

Because you can return or throw responses in loaders and actions, you can use `redirect` to redirect to another route.

```jsx
import { redirect } from "react-router-dom";

const loader = async () => {
  const user = await getUser();
  if (!user) {
    return redirect("/login");
  }
};
```

It's really just a shortcut for this:

```jsx
new Response("", {
  status: 302,
  headers: {
    Location: someUrl,
  },
});
```

It's recommended to use `redirect` in loaders and actions rather than `useNavigate` in your components when the redirect is in response to data.

See also:

- [Returning Responses from Loaders][responses]

## Type Declaration

```ts
type RedirectFunction = (
  url: string,
  init?: number | ResponseInit
) => Response;
```

## `url`

The URL to redirect to.

```js
redirect("/login");
```

## `init`

The [Response][response] options to be used in the response.

[responses]: ../route/loader#returning-responses
[response]: https://developer.mozilla.org/en-US/docs/Web/API/Response/Response

# `createRoutesFromChildren`

Alias for [`createRoutesFromElements`][createroutesfromelements]

[createroutesfromelements]: ./create-routes-from-elements

# `createRoutesFromElements`

`createRoutesFromElements` is a helper that creates route objects from `<Route>` elements. It's useful if you prefer to create your routes as JSX instead of objects.

```jsx
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

// You can do this:
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />}>
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="about" element={<About />} />
    </Route>
  )
);

// Instead of this:
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "about",
        element: <About />,
      },
    ],
  },
]);
```

It's also used internally by [`<Routes>`][routes] to generate a route objects from its [`<Route>`][route] children.

## Type declaration

```tsx
declare function createRoutesFromElements(
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

[routes]: ../components/routes
[route]: ../components/route

# `createSearchParams`

<details>
  <summary>Type declaration</summary>

```tsx
declare function createSearchParams(
  init?: URLSearchParamsInit
): URLSearchParams;
```

</details>

`createSearchParams` is a thin wrapper around [`new URLSearchParams(init)`](https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams/URLSearchParams) that adds support for using objects with array values. This is the same function that `useSearchParams` uses internally for creating `URLSearchParams` objects from `URLSearchParamsInit` values.

# `defer`

This utility allows you to defer values returned from loaders by passing promises instead of resolved values.

```jsx
function loader() {
  let product = await getProduct();
  let reviews = getProductReviews();
  return defer({ product, reviews });
}
```

See the [Deferred Guide][deferred guide] for more information.

[deferred guide]: ../guides/deferred

# `generatePath`

<details>
  <summary>Type declaration</summary>

```tsx
declare function generatePath<Path extends string>(
  path: Path,
  params?: {
    [key in PathParams<Path>]: string;
  }
): string;
```

</details>

`generatePath` interpolates a set of params into a route path string with `:id` and `*` placeholders. This can be useful when you want to eliminate placeholders from a route path so it matches statically instead of using a dynamic parameter.

```tsx
generatePath("/users/:id", { id: "42" }); // "/users/42"
generatePath("/files/:type/*", {
  type: "img",
  "*": "cat.jpg",
}); // "/files/img/cat.jpg"
```

# `isRouteErrorResponse`

This returns `true` if a [route error][routeerror] is a _route error response_.

```jsx
import { isRouteErrorResponse } from "react-router-dom";

function ErrorBoundary() {
  const error = useRouteError();
  if (isRouteErrorResponse(error)) {
    return (
      <div>
        <h1>Oops!</h1>
        <h2>{error.status}</h2>
        <p>{error.statusText}</p>
        {error.data?.message && <p>{error.data.message}</p>}
      </div>
    );
  } else {
    return <div>Oops</div>;
  }
}
```

When a response is thrown from an action or loader, it will be unwrapped into an `ErrorResponse` so that your component doesn't have to deal with the complexity of unwrapping it (which would require React state and effects to deal with the promise returned from `res.json()`)

```jsx
import { json } from "react-router-dom";

<Route
  errorElement={<ErrorBoundary />}
  action={() => {
    throw json(
      { message: "email is required" },
      { status: 400 }
    );
  }}
/>;

function ErrorBoundary() {
  const error = useRouteError();
  if (isRouteErrorResponse(error)) {
    error.status; // 400
    error.data; // { "message: "email is required" }
  }
}
```

<docs-info>If the user visits a route that does not match any routes in the app, React Router itself will throw a 404 response.</docs-info>

[routeerror]: ../hooks/use-route-error

# `Location`

The term "location" in React Router refers to [the `Location` interface](https://github.com/remix-run/history/blob/main/docs/api-reference.md#location) from the [history](https://github.com/remix-run/history) library.

<docs-info>The `history` package is React Router's only dependency and many of the core types in React Router come directly from that library including `Location`, `To`, `Path`, and others. You can read more about the history library in [its documentation](https://github.com/remix-run/history/tree/main/docs).</docs-info>

# `matchPath`

<details>
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

</details>

`matchPath` matches a route path pattern against a URL pathname and returns information about the match. This is useful whenever you need to manually run the router's matching algorithm to determine if a route path matches or not. It returns `null` if the pattern does not match the given pathname.

The [`useMatch` hook][usematch] uses this function internally to match a route path relative to the current location.

[usematch]: ../hooks/use-match

# `matchRoutes`

<details>
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

</details>

`matchRoutes` runs the route matching algorithm for a set of routes against a given [`location`][location] to see which routes (if any) match. If it finds a match, an array of `RouteMatch` objects is returned, one for each route that matched.

This is the heart of React Router's matching algorithm. It is used internally by [`useRoutes`][useroutes] and the [`<Routes>` component][routes] to determine which routes match the current location. It can also be useful in some situations where you want to manually match a set of routes.

[location]: ./location
[useroutes]: ../hooks/use-routes
[routes]: ../components/routes

# `renderMatches`

<details>
  <summary>Type declaration</summary>

```tsx
declare function renderMatches(
  matches: RouteMatch[] | null
): React.ReactElement | null;
```

</details>

`renderMatches` renders the result of `matchRoutes()` into a React element.

# `resolvePath`

<details>
  <summary>Type declaration</summary>

```tsx
declare function resolvePath(
  to: To,
  fromPathname?: string
): Path;

type To = string | Partial<Path>;

interface Path {
  pathname: string;
  search: string;
  hash: string;
}
```

</details>

`resolvePath` resolves a given `To` value into an actual `Path` object with an absolute `pathname`. This is useful whenever you need to know the exact path for a relative `To` value. For example, the `<Link>` component uses this function to know the actual URL it points to.

The [`useResolvedPath` hook][useresolvedpath] uses `resolvePath` internally to resolve the pathname. If `to` contains a pathname, it is resolved against the current route pathname. Otherwise, it is resolved against the current URL (`location.pathname`).

[useresolvedpath]: ../hooks/use-resolved-path

# Server-Side Rendering

<docs-warning>This doc needs updates for 6.4 and only applies to <=6.3</docs-warning>

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

# Data Library Integration

Since the release of v6.4 some folks wonder if React Router is attempting to replace libraries like [React Query][react-query], [useSwr][useswr], etc.

The answer is "nope!".

React Router's data APIs are about _when_ to load, mutate, and revalidate data, but not _how_ to do it. It's about the data lifecycle, not the actual implementation of data fetching, mutation, storage, and caching.

Considering that `<a href>` and `<form action>` are both navigation events, and both coupled to data (what data to show or what data to change), it makes sense that a client side router would help you with the _navigation state_ of both elements. But the actual data implementation is up to you.

The examples here were adapted from [TkDodo's blog][tkdodo], thank you for the great post!

## Loading Data

Instead of loading data in components, you use your data abstractions inside of loaders. Note that this loading happens outside of the React render lifecycle, so you can't use hooks like React Query's `useQuery`, you'll need to use the query client's methods directly.

```jsx lines=[4]
import { queryClient } from "./query-client";

export const loader = ({ params }) => {
  return queryClient.fetchQuery(queryKey, queryFn, {
    staleTime: 10000,
  });
};
```

If the query client throws errors correctly, then React Router's [`errorElement`][errorelement] will work the same.

Of course, you can use all of the features of the data library, like caching. Caching your data ensures that when the user clicks the back button to a page you've already seen, the data is loaded from the cache immediately. Sometimes caching is the right choice, sometimes you always want it fresh, but that's not a decision within the scope of React Router's data APIs.

React Router only retains the _current page's loaderData_. If users click "back", all loaders are called again. Without a data caching library like React Query (or HTTP cache headers on your JSON API to use the browser's own HTTP cache), your app will refetch all of the data again.

In this way, React Router is about _timing_, where React Query is about _caching_.

## Accessing Data in Components

While React Router's `useLoaderData` returns whatever you returned from your loader, you can use your data abstraction's hooks instead to get access to the full feature set of that package.

```diff
export default function SomeRouteComponent() {
- const data = useLoaderData();
+ const { data } = useQuery(someQueryKey);
}
```

## Invalidating Data in Mutations

Because most of these library's have some mechanism for caching, you'll need to invalidate those caches at some point.

The perfect place to invalidate those caches is in a React Router [action][action].

```jsx lines=[7]
import { queryClient } from "./query-client";

export const action = async ({ request, params }) => {
  const formData = await request.formData();
  const updates = Object.fromEntries(formData);
  await updateContact(params.contactId, updates);
  await queryClient.invalidateQueries(["contacts"]);
  return redirect(`/contacts/${params.contactId}`);
};
```

## Usage with `defer`

You can similarly take advantage of the deferred APIs:

```jsx lines=[2,10,14,28]
function loader() {
  return defer({
    // no await!
    someData: queryClient.fetchQuery("someKey", fn),
  });
}

function Comp() {
  // *do* useLoaderData for promise
  const { someData } = useLoaderData();
  return (
    <div>
      <h1>Something</h1>
      <Await
        resolve={someData}
        errorElement={<div>Oops!</div>}
      >
        <SomeView />
      </Await>
    </div>
  );
}

function SomeView() {
  // instead of accessing with useAsyncValue
  // const someData = useAsyncValue();
  // `useQuery` as usual
  const { data } = useQuery("someKey");
  // ...
}
```

## The Overlap

Hooks like `useQuery` often return pending and error states you can use to branch your UI. With React Router, you can keep all of that branching out of your happy path components and rely on [`errorElement`][errorelement], [`useNavigation`][usenavigation], and [`Await`][await] instead.

## Conclusion

With all of these APIs working together, you can now use [`useNavigation`][usenavigation] from React Router to build pending states, optimistic UI, and more. Use React Router for timing of data loading, mutations, and navigation state, then use libraries like React Query for the actual implementation of loading, invalidating, storage, and caching.

[react-query]: https://tanstack.com/query/v4/
[useswr]: https://swr.vercel.app/
[errorelement]: ../route/error-element
[action]: ../route/action
[tkdodo]: https://tkdodo.eu/blog/react-query-meets-react-router
[usenavigation]: ../hooks/use-navigation
[await]: ../components/await

# Deferred Data Guide

## The problem

Imagine a scenario where one of your routes' loaders needs to retrieve some data that for one reason or another is quite slow. For example, let's say you're showing the user the location of a package that's being delivered to their home:

```jsx
import { json, useLoaderData } from "react-router-dom";
import { getPackageLocation } from "./api/packages";

async function loader({ params }) {
  const packageLocation = await getPackageLocation(
    params.packageId
  );

  return json({ packageLocation });
}

function PackageRoute() {
  const data = useLoaderData();
  const { packageLocation } = data;

  return (
    <main>
      <h1>Let's locate your package</h1>
      <p>
        Your package is at {packageLocation.latitude} lat
        and {packageLocation.longitude} long.
      </p>
    </main>
  );
}
```

We'll assume that `getPackageLocation` is slow. This will lead to initial page load times and transitions to that route to take as long as the slowest bit of data. There are a few things you can do to optimize this and improve the user experience:

- Speed up the slow thing (😅).
- Parallelize data loading with `Promise.all` (we have nothing to parallelize in our example, but it might help a bit in other situations).
- Add a global transition spinner (helps a bit with UX).
- Add a localized skeleton UI (helps a bit with UX).

If these approaches don't work well, then you may feel forced to move the slow data out of the `loader` into a component fetch (and show a skeleton fallback UI while loading). In this case you'd render the fallback UI on mount and fire off the fetch for the data. This is actually not so terrible from a DX standpoint thanks to [`useFetcher`][usefetcher]. And from a UX standpoint this improves the loading experience for both client-side transitions as well as initial page load. So it does seem to solve the problem.

But it's still sub optimal in most cases (especially if you're code-splitting route components) for two reasons:

1. Client-side fetching puts your data request on a waterfall: document -> JavaScript -> Lazy Loaded Route -> data fetch
2. Your code can't easily switch between component fetching and route fetching (more on this later).

## The solution

React Router takes advantage of React 18's Suspense for data fetching using the [`defer` Response][defer response] utility and [`<Await />`][await] component / [`useAsyncValue`][useasyncvalue] hook. By using these APIs, you can solve both of these problems:

1. Your data is no longer on a waterfall: document -> JavaScript -> Lazy Loaded Route & data (in parallel)
2. Your can easily switch between rendering the fallback and waiting for the data

Let's take a dive into how to accomplish this.

### Using `defer`

Start by adding `<Await />` for your slow data requests where you'd rather render a fallback UI. Let's do that for our example above:

```jsx lines=[3,9,13-15,24-40]
import {
  Await,
  defer,
  useLoaderData,
} from "react-router-dom";
import { getPackageLocation } from "./api/packages";

async function loader({ params }) {
  const packageLocationPromise = getPackageLocation(
    params.packageId
  );

  return defer({
    packageLocation: packageLocationPromise,
  });
}

export default function PackageRoute() {
  const data = useLoaderData();

  return (
    <main>
      <h1>Let's locate your package</h1>
      <React.Suspense
        fallback={<p>Loading package location...</p>}
      >
        <Await
          resolve={data.packageLocation}
          errorElement={
            <p>Error loading package location!</p>
          }
        >
          {(packageLocation) => (
            <p>
              Your package is at {packageLocation.latitude}{" "}
              lat and {packageLocation.longitude} long.
            </p>
          )}
        </Await>
      </React.Suspense>
    </main>
  );
}
```

<details>
  <summary>Alternatively, you can use the `useAsyncValue` hook:</summary>

If you're not jazzed about bringing back render props, you can use a hook, but you'll have to break things out into another component:

```jsx lines=[11, 16, 23-31]
export default function PackageRoute() {
  const data = useLoaderData();

  return (
    <main>
      <h1>Let's locate your package</h1>
      <React.Suspense
        fallback={<p>Loading package location...</p>}
      >
        <Await
          resolve={data.packageLocation}
          errorElement={
            <p>Error loading package location!</p>
          }
        >
          <PackageLocation />
        </Await>
      </React.Suspense>
    </main>
  );
}

function PackageLocation() {
  const packageLocation = useAsyncValue();
  return (
    <p>
      Your package is at {packageLocation.latitude} lat and{" "}
      {packageLocation.longitude} long.
    </p>
  );
}
```

</details>

## Evaluating the solution

So rather than waiting for the component before we can trigger the fetch request, we start the request for the slow data as soon as the user starts the transition to the new route. This can significantly speed up the user experience for slower networks.

Additionally, the API that React Router exposes for this is extremely ergonomic. You can literally switch between whether something is going to be deferred or not based on whether you include the `await` keyword:

```tsx
return defer({
  // not deferred:
  packageLocation: await packageLocationPromise,
  // deferred:
  packageLocation: packageLocationPromise,
});
```

Because of this, you can A/B test deferring, or even determine whether to defer based on the user or data being requested:

```tsx
async function loader({ request, params }) {
  const packageLocationPromise = getPackageLocation(
    params.packageId
  );
  const shouldDefer = shouldDeferPackageLocation(
    request,
    params.packageId
  );

  return defer({
    packageLocation: shouldDefer
      ? packageLocationPromise
      : await packageLocationPromise,
  });
}
```

That `shouldDeferPackageLocation` could be implemented to check the user making the request, whether the package location data is in a cache, the status of an A/B test, or whatever else you want. This is pretty sweet 🍭

## FAQ

### Why not defer everything by default?

The React Router defer API is another lever React Router offers to give you a nice way to choose between trade-offs. Do you want the page to render more quickly? Defer stuff. Do you want a lower CLS (Content Layout Shift)? Don't defer stuff. You want a faster render, but also want a lower CLS? Defer just the slow and unimportant stuff.

It's all trade-offs, and what's neat about the API design is that it's well suited for you to do easy experimentation to see which trade-offs lead to better results for your real-world key indicators.

### When does the `<Suspense/>` fallback render?

The `<Await />` component will only throw the promise up the `<Suspense>` boundary on the initial render of the `<Await />` component with an unsettled promise. It will not re-render the fallback if props change. Effectively, this means that you _will not_ get a fallback rendered when a user submits a form and loader data is revalidated. You _will_ get a fallback rendered when the user navigates to the same route with different params (in the context of our above example, if the user selects from a list of packages on the left to find their location on the right).

This may feel counter-intuitive at first, but stay with us, we really thought this through and it's important that it works this way. Let's imagine a world without the deferred API. For those scenarios you're probably going to want to implement Optimistic UI for form submissions/revalidation.

When you decide you'd like to try the trade-offs of `defer`, we don't want you to have to change or remove those optimizations because we want you to be able to easily switch between deferring some data and not deferring it. So, we ensure that your existing optimistic states work the same way. If we didn't do this, then you could experience what we call "Popcorn UI" where submissions of data trigger the fallback loading state instead of the optimistic UI you'd worked hard on.

So just keep this in mind: **Deferred is 100% only about the initial load of a route and its params.**

[link]: ../components/link
[usefetcher]: ../hooks/use-fetcher
[defer response]: ../utils/defer
[await]: ../components/await
[useasyncvalue]: ../hooks/use-async-value

# Working With FormData

<docs-info>TODO: This document is a stub</docs-info>

A common trick is to turn the entire formData into an object with [`Object.fromEntries`][object-fromentries]:

```tsx
const data = Object.fromEntries(await request.formData());
data.songTitle;
data.lyrics;
```

[object-fromentries]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/fromEntries

# Index Query Param

You may find a wild `?index` appear in the URL of your app when submitting forms.

Because of nested routes, multiple routes in your route hierarchy can match the URL. Unlike navigations where all matching route loaders are called to build up the UI, when a form is submitted _only one action is called_.

Because index routes share the same URL as their parent, the `?index` param lets you disambiguate between the two.

For example, consider the following router and forms:

```jsx
createBrowserRouter([
  {
    path: "/projects",
    element: <ProjectsLayout />,
    action: ProjectsLayout.action,
    children: [
      {
        index: true,
        element: <ProjectsIndex />,
        action: ProjectsPage.action,
      },
    ],
  },
]);

<Form method="post" action="/projects" />;
<Form method="post" action="/projects?index" />;
```

The `?index` param will submit to the index route, the action without the index param will submit to the parent route.

When a `<Form>` is rendered in an index route without an `action`, the `?index` param will automatically be appended so that the form posts to the index route. The following form, when submitted, will post to `/projects?index` because it is rendered in the context of the projects index route:

```tsx
function ProjectsIndex() {
  return <Form method="post" />;
}
```

If you moved the code to the `ProjectsLayout` route, it would instead post to `/projects`.

This applies to `<Form>` and all of its cousins:

```tsx
let submit = useSubmit();
submit({}, { action: "/projects" });
submit({}, { action: "/projects?index" });

let fetcher = useFetcher();
fetcher.submit({}, { action: "/projects" });
fetcher.submit({}, { action: "/projects?index" });
<fetcher.Form action="/projects" />;
<fetcher.Form action="/projects?index" />;
<fetcher.Form />; // defaults to the route in context
```

# Pending UI

React Router has APIs to help you build the user experience you're after when asynchronous things are happening with:

- [useNavigation][use-navigation]
- [useFetcher][use-navigation]
- [Outlet][outlet]

# Data Synchronization

React Router not only keeps your UI in sync with the URL, but also your data. It does this with several APIs

- [loader][loader]
- [action][action]
- [Form][form]
- [useFetcher][use-fetcher]
