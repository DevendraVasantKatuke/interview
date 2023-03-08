# Philosophy

We've worked on a lot of different types of websites: static sites for credit card companies, social media platforms, learning management systems, content management systems, and e-commerce to name a few. We've also trained hundreds of development teams with our training company, [React Training][react-training]. These teams build websites we all use regularly. Based on our personal development experience and our clients' products, we built Remix to be able to handle the dynamic nature of both the front end and the back end of a web project.

The Remix philosophy can be summed up in four points:

1. Embrace the server/client model, including separation of source code from content/data.
2. Work with, not against, the foundations of the web: Browsers, HTTP, and HTML. It’s always been good and it's gotten _really good_ in the last few years.
3. Use JavaScript to augment the user experience by emulating browser behavior.
4. Don't over-abstract the underlying technologies

## Server/Client Model

You can make your server fast, but you can't control the user's network.

With today's web infrastructure you don't need static files to make your server fast. What you can't make fast is the user's network. The only thing you can do is **decrease the amount of stuff you send over the network**. Less JavaScript, less JSON, less CSS. This is easiest when you have a server that you can move the code to, and a framework that favors progressive enhancement.

There are a lot of ways Remix helps you send less stuff over the network and we hope to talk about all of them, but for now here's one: fetching a list of records.

Consider [the Github Gist API][the-github-gist-api]. This payload is 75kb unpacked and 12kb over the network compressed. If you fetch it in the browser, you make the user download all of it. It might look like this:

```tsx
export default function Gists() {
  const gists = useSomeFetchWrapper(
    "https://api.github.com/gists"
  );
  if (!gists) {
    return <Skeleton />;
  }
  return (
    <ul>
      {gists.map((gist) => (
        <li key={gist.id}>
          <a href={gist.html_url}>
            {gist.description}, {gist.owner.login}
          </a>
          <ul>
            {Object.keys(gist.files).map((key) => (
              <li key={key}>{key}</li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  );
}
```

With Remix, you can filter down the data _on the server_ before sending it to the user:

```tsx
import { json } from "@remix-run/node"; // or cloudflare/deno

export async function loader() {
  const res = await fetch("https://api.github.com/gists");
  const gists = await res.json();

  return json(
    gists.map((gist) => ({
      description: gist.description,
      url: gist.html_url,
      files: Object.keys(gist.files),
      owner: gist.owner.login,
    }))
  );
}

export default function Gists() {
  const gists = useLoaderData<typeof loader>();

  return (
    <ul>
      {gists.map((gist) => (
        <li key={gist.id}>
          <a href={gist.url}>
            {gist.description}, {gist.owner}
          </a>
          <ul>
            {gist.files.map((key) => (
              <li key={key}>{key}</li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  );
}
```

This drops the payload from 12kB compressed, 75kB total to 1.8kB compressed, 3.8kB total. That's 20x smaller! We also don't need to ship all the skeleton UI because Remix fetches (and can prefetch) this data before the page is rendered. This is just one example of how embracing the server/client model helps us speed up our apps _by sending less_ over the user's network.

## Web Standards, HTTP, and HTML

These technologies have been around for a long time. They're solid. Remix embraces them completely. Combining HTTP Caching, Remix's focus on URLs for assets, dynamic server rendering, and HTML features like `<link rel=prefetch>`, you have all the tools to make your app snappy. Browsers and HTML got really good in the 20+ years we've been using it.

We try to keep the Remix API to a minimum, and instead work with web standards. For example, instead of inventing our own `req/res` API, or even using Node's API, Remix (and your Remix apps) work with the [Web Fetch API][web-fetch-api] objects. This means as you get good at Remix, you're really just getting good at web standards like , ,  and . All of these are already in your browser, now they're on your server no matter where you deploy to.

When doing data mutations, we augmented HTML forms. When we prefetch data and assets for the next page, we use `<link rel="prefetch">` and let the browser deal with all of the complexity of caching a resource. If the browser has an API for a use case, Remix uses it.

## Progressive Enhancement

While most recent frameworks only have read APIs for data, Remix has both read and write. HTML `<form>` has been the staple for data mutations since the 90s. Remix embraces and augments that API. This enables the data layer of a Remix app to function with _or without_ JavaScript on the page.

Adding JavaScript allows Remix to speed up the user experience in two ways on a page transition:

1. Not downloading and evaluating JavaScript and CSS assets
2. Only fetching data for the parts of the layout that change

Also, with JavaScript on the page, Remix can provide the developer with APIs to make the UX nicer on page transitions:

1. Add nicer pending UI than the browser's spinning favicon
2. Add optimistic UI on data actions (create, read, update, delete, etc.)

Finally, since data mutation is built into Remix, it knows when to refetch data that could have been changed after a mutation, ensuring different parts of your page don’t get out of sync.

The point is not so much to make the app work without JavaScript, it's more about keeping the simpler client/server model. Being able to leave JavaScript at the door is a nice side-effect.

## Don’t Over Abstract

Remix's job is to cross the center of the stack and then get out of your way. We avoid as many "Remixisms" as possible and instead make it easier to use the standard APIs the web already has.

This one is more for us. We've been educators for the 5 years before Remix. Our tagline is _Build Better Websites_. We also think of it with a little extra on the end: _Build Better Websites, Sometimes with Remix_. If you get good at Remix, you will accidentally get good at web development in general.

Remix's APIs make it convenient to use the fundamental Browser/HTTP/JavaScript, but those technologies are not hidden from you.

For example, getting CSS on specific layouts in your app is done with a route module method named `links`, where you return an array of objects with the values of an HTML `<link>` tag. We abstract enough to optimize your app's performance (they're objects so we can dedupe them, preload them), without hiding the underlying technology. Learn how to prefetch assets in Remix with `links`, and you've learned how to prefetch assets in any website.

Get good at Remix, get good at the web.

# Technical Explanation

This document hopes to answer the question: "What _is_ Remix?" Remix is four things:

1. A compiler
2. A server-side HTTP handler
3. A server framework
4. A browser framework

When all four of these things know about each other, you can do some pretty interesting things.

We often describe Remix as "a compiler for React Router" because everything about Remix takes advantage of nested routes. App developers add files to `app/routes/*` and then Remix takes off from there.

## Compiler

Everything in Remix starts with the compiler: `remix build`. Using [esbuild][esbuild], this creates a few things:

1. A server HTTP handler, usually in `server/build/index.js` (it's configurable) that includes all routes and modules together to be able to render on the server and handle any other server-side requests for resources.
2. A browser build, usually in `public/build/*`. This includes automatic code splitting by route, fingerprinted asset imports (like CSS and images), etc. Anything needed to run an application in the browser.
3. An asset manifest. Both the client and the server use this manifest to know the entire dependency graph. This is useful for preloading resources in the initial server render as well as prefetching them for client-side transitions. This is how Remix is able to eliminate the render+fetch waterfalls so common in web apps today.

With these build artifacts, an application can be deployed to any hosting service that runs JavaScript.

## HTTP Handler and Adapters

While Remix runs on the server, it is not actually a server. It's just a handler that is given to an actual JavaScript server.

It's built on the [Web Fetch API][fetch] instead of Node.js. This enables Remix to run in any Node.js server like [Vercel][vercel], [Netlify][netlify], [Architect][arc], etc. as well as non-Node.js environments like [Cloudflare Workers][cf] and [Deno Deploy][deno].

This is what Remix looks like when running in an express app:

```js
const express = require("express");
const remix = require("@remix-run/express");

const app = express();

app.all(
  "*",
  remix.createRequestHandler({ build: require("./build") })
);
```

Express (or Node.js) is the actual server, Remix is just a handler on that server. The `"@remix-run/express"` package is called an adapter. Remix handlers are server agnostic. Adapters make them work for a specific server by converting the server's request/response API into the Fetch API on the way in, and then adapting the Fetch Response coming from Remix into the server's response API. Here's some pseudo code of what an adapter does:

```ts
export function createRequestHandler({ build }) {
  // creates a Fetch API request handler from the server build
  let handleRequest = createRemixRequestHandler(build);

  // returns an express.js specific handler for the express server
  return async (req, res) => {
    // adapts the express.req to a Fetch API request
    let request = createRemixRequest(req);

    // calls the app handler and receives a Fetch API response
    let response = await handleRequest(request);

    // adapts the Fetch API response to the express.res
    sendRemixResponse(res, response);
  };
}
```

Real adapters do a bit more than that, but that's the gist of it. Not only does this enable you to deploy Remix anywhere, but it also lets you incrementally adopt it in an existing JavaScript server since you can have routes outside of Remix that your server continues to handle before getting to Remix.

Additionally, if Remix doesn't have an adapter for your server already, you can look at the source of one of the adapters and build your own.

## Server Framework

If you're familiar with server-side MVC web frameworks like Rails and Laravel, Remix is the View and Controller, but it leaves the Model up to you. There are a lot of great databases, ORMs, mailers, etc. in the JavaScript ecosystem to fill that space. Remix also has helpers around the Fetch API for cookie and session management.

Instead of having a split between View and Controller, Remix Route modules take on both responsibilities.

Most server-side frameworks are "model focused". A controller manages _multiple URLs_ for a single model.

Remix is _UI focused_. Routes can handle an entire URL or just a segment of the URL. When a route maps to just a segment, the nested URL segments become nested layouts in the UI. In this way, each layout (view) can be its own controller and then Remix will aggregate the data and components to build the complete UI.

More often than not, a Remix route module can contain both the UI and the interactions with the models in the same file, which leads to really nice developer ergonomics and productivity.

Route modules have three primary exports: `loader`, `action`, and `default` (component).

```tsx
// Loaders only run on the server and provide data
// to your component on GET requests
export async function loader() {
  return json(await db.projects.findAll());
}

// Actions only run on the server and handle POST
// PUT, PATCH, and DELETE. They can also provide data
// to the component
export async function action({ request }: ActionArgs) {
  const form = await request.formData();
  const errors = validate(form);
  if (errors) {
    return json({ errors });
  }
  await createProject({ title: form.get("title") });
  return json({ ok: true });
}

// The default export is the component that will be
// rendered when a route matches the URL. This runs
// both on the server and the client
export default function Projects() {
  const projects = useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>();

  return (
    <div>
      {projects.map((project) => (
        <Link key={project.slug} to={project.slug}>
          {project.title}
        </Link>
      ))}

      <Form method="post">
        <input name="title" />
        <button type="submit">Create New Project</button>
      </Form>
      {actionData?.errors ? (
        <ErrorMessages errors={actionData.errors} />
      ) : null}

      {/* outlets render the nested child routes
          that match the URL deeper than this route,
          allowing each layout to co-locate the UI and
          controller code in the same file */}
      <Outlet />
    </div>
  );
}
```

You can actually use Remix as just a server-side framework without using any browser JavaScript at all. The route conventions for data loading with `loader`, mutations with `action` and HTML forms, and components that render at URLs, can provide the core feature set of a lot of web projects.

In this way, **Remix scales down**. Not every page in your application needs a bunch of JavaScript in the browser and not every user interaction requires any extra flair than the browser's default behaviors. In Remix you can build it the simple way first, and then scale up without changing the fundamental model. Additionally, the majority of the app works before JavaScript loads in the browser, which makes Remix apps resilient to choppy network conditions by design.

If you're not familiar with traditional back-end web frameworks, you can think of Remix routes as React components that are already their own API route and already know how to load and submit data to themselves on the server.

## Browser Framework

Once Remix has served the document to the browser, it "hydrates" the page with the browser build's JavaScript modules. This is where we talk a lot about Remix "emulating the browser".

When the user clicks a link, instead of making a round trip to the server for the entire document and all of the assets, Remix simply fetches the data for the next page and updates the UI. This has many performance benefits over making a full-document request:

1. Assets don't need to be re-downloaded (or pulled from cache)
2. Assets don't need to be parsed by the browser again.
3. The data fetched is much smaller than the entire document (sometimes orders of magnitude)

Remix also has some built in optimizations for client-side navigation. It knows which layouts will persist between the two URLs, so it only fetches the data for the ones that are changing. A full document request would require all data to be fetched on the server, wasting resources on your back end and slowing down your app.

This approach also has UX benefits like not resetting the scroll position of a sidebar nav and allowing you to move focus to something that makes more sense than the top of the document.

Remix can also prefetch all resources for a page when the user is about to click a link. The browser framework knows about the compiler's asset manifest. It can match the URL of the link, read the manifest, and then prefetch all data, JavaScript modules, and even CSS resources for the next page. This is how Remix apps feel fast even when networks are slow.

Remix then provides client side APIs so you can create rich user experiences without changing the fundamental model of HTML and browsers.

Taking our route module from before, here are a few small, but useful UX improvements to the form that you can only do with JavaScript in the browser:

1. Disable the button when the form is being submitted
2. Focus the input when server-side form validation fails
3. Animate in the error messages

```tsx
export default function Projects() {
  const projects = useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>();
  const { state } = useTransition();
  const busy = state === "submitting";
  const inputRef = React.useRef();

  React.useEffect(() => {
    if (actionData.errors) {
      inputRef.current.focus();
    }
  }, [actionData]);

  return (
    <div>
      {projects.map((project) => (
        <Link key={project.slug} to={project.slug}>
          {project.title}
        </Link>
      ))}

      <Form method="post">
        <input ref={inputRef} name="title" />
        <button type="submit" disabled={busy}>
          {busy ? "Creating..." : "Create New Project"}
        </button>
      </Form>

      {actionData?.errors ? (
        <FadeIn>
          <ErrorMessages errors={actionData.errors} />
        </FadeIn>
      ) : null}

      <Outlet />
    </div>
  );
}
```

What's most interesting about this code sample is that it is **only additive**. The entire interaction is still fundamentally the same thing.

Because Remix reaches into the controller level of the backend, it can do this seamlessly.

And while it doesn't reach as far back into the stack as server-side frameworks like Rails and Laravel, it does reach way farther up the stack into the browser to make the transition from the back end to the front end seamless.

For example. Building a plain HTML form and server-side handler in a back-end heavy web framework is just as easy to do as it is in Remix. But as soon as you want to cross over into an experience with animated validation messages, focus management, and pending UI, it requires a fundamental change in the code. Typically people build an API route and then bring in a splash of client-side JavaScript to connect the two. With Remix you simply add some code around the existing "server side view" without changing how it works fundamentally.

We borrowed an old term and called this Progressive Enhancement in Remix. Start small with a plain HTML form (Remix scales down) and then scale the UI up when you have the time and ambition.

# Remix Stacks

Remix Stacks is a feature of the Remix CLI that allows you to generate a Remix project quickly and easily. There are several built-in and official stacks that are full-blown applications. You can also make your own (read more below).

[Read the feature announcement blog post][read-the-feature-announcement-blog-post] and [watch Remix Stacks videos on YouTube][watch-remix-stacks-videos-on-you-tube].

The built-in official stacks come ready with common things you need for a production application including:

- Database
- Automatic deployment pipelines
- Authentication
- Testing
- Linting/Formatting/TypeScript

What you're left with is everything completely set up for you to just get to work building whatever amazing web experience you want to build with Remix. Here are the built-in official stacks:

- [The Blues Stack][the-blues-stack]: Deployed to the edge (distributed) with a long-running Node.js server and PostgreSQL database. Intended for large and fast production-grade applications serving millions of users.
- [The Indie Stack][the-indie-stack]: Deployed to a long-running Node.js server with a persistent SQLite database. This stack is great for websites with dynamic data that you control (blogs, marketing, content sites). It's also a perfect, low-complexity bootstrap for MVPs, prototypes, and proof-of-concepts that can later be updated to the Blues stack easily.
- [The Grunge Stack][the-grunge-stack]: Deployed to a serverless function running Node.js with DynamoDB for persistence. Intended for folks who want to deploy a production-grade application on AWS infrastructure serving millions of users.

Yes, these are named after music genres. 🤘 Rock on.

There will be more stacks available in the future. And you can make your own (and we strongly encourage it)!

## Custom Stacks

The Remix CLI will help you get started with one of these built-in stacks, but if you want, you can create your own stack and the Remix CLI will help you get started with that stack. There are several ways to do this, but the most straightforward is to create a GitHub repo:

```
npx create-remix@latest --template my-username/my-repo
```

Custom stacks give an enormous amount of power and flexibility, and we hope you create your own that suites the preferences of you and your organization (feel free to fork ours!).

`<docs-success>`Yes, we do recommend that you name your own stack after a music sub-genre (not "rock" but "indie"!). In the future, we will have a page where you can list your open-source stacks for others to learn and discover. For now, please add the `<a href="https://github.com/topics/remix-stack"><code>`remix-stack`</code></a>` tag to your repo!`</docs-success>`

### `--template`

The template option can be any of the following values:

- The name of a stack in the remix-run GH org (e.g. `blues-stack`)
- A GH username/repo combo (e.g. `mcansh/snkrs`)
- A file path to a directory on disk (e.g. `/my/remix-stack`)
- A path to a tarball on disk (e.g. `/my/remix-stack.tar.gz`)
- A URL to a tarball (e.g. `https://example.com/remix-stack.tar.gz`)
- A file URL (e.g. `file:///Users/michael/remix-stack.tar.gz`)

Additionally, if your stack is in a private GitHub repo, you can pass a GitHub token via the `--token` cli flag:

```
npx create-remix@latest --template your-private/repo --token yourtoken
```

The [token just needs ][repo access token].

### Custom Template Tips

#### Dependency versions

If you set the any dependencies in package.json to `*`, the Remix CLI will change it to a semver caret of the latest released version:

```diff
-   "remix": "*",
+   "remix": "^1.2.3",
```

This allows you to not have to regularly update your template to the latest version of that specific package. Of course you do not have to put `*` if you'd prefer to manually manage the version for that package.

#### Customize Initialization

If the template has a `remix.init/index.js` file at the root then that file will be executed after the project has been generated and dependencies have been installed. This gives you a chance to do anything you'd like as part of the initialization of your template. For example, in the blues stack, the `app` property has to be globally unique so we use the `remix.init/index.js` file to change it to the name of the directory that was created for the project + a couple random characters.

You could even use `remix.init/index.js` to ask further questions of the developer for additional configuration (using something like [inquirer][inquirer]). Of course, sometimes you'll need dependencies installed to do this, but those deps are only useful during initialization. So, you can also create a `remix.init/package.json` with dependencies and the Remix CLI will install those dependencies before running your script.

After the init script has been run, it is deleted so you don't need to worry about it cluttering up the finished codebase.

#### Remove TypeScript

If there's a `tsconfig.json` file in the root of the project, the Remix CLI will ask whether the user wants the TypeScript automatically removed from the template. We don't recommend this, but some folks just really want to write regular JavaScript.

# Frequently Asked Questions

## How can I have a parent route loader validate the user and protect all child routes?

You can't 😅. During a client-side transition, to make your app as speedy as possible, Remix will call all of your loaders _in parallel_, in separate fetch requests. Each one of them needs to have its own authentication check.

This is probably not different than what you were doing before Remix, it might just be more obvious now. Outside of Remix, when you make multiple fetches to your "API Routes", each of those endpoints needs to validate the user session. In other words, Remix route loaders are their own "API Route" and must be treated as such.

We recommend you create a function that validates the user session that can be added to any routes that require it.

```tsx
import {
  createCookieSessionStorage,
  redirect,
} from "@remix-run/node"; // or cloudflare/deno

// somewhere you've got a session storage
const { getSession } = createCookieSessionStorage();

export async function requireUserSession(request) {
  // get the session
  const cookie = request.headers.get("cookie");
  const session = await getSession(cookie);

  // validate the session, `userId` is just an example, use whatever value you
  // put in the session when the user authenticated
  if (!session.has("userId")) {
    // if there is no user session, redirect to login
    throw redirect("/login");
  }

  return session;
}
```

And now in any loader or action that requires a user session, you can call the function.

```tsx
export async function loader({ request }: LoaderArgs) {
  // if the user isn't authenticated, this will redirect to login
  const session = await requireUserSession(request);

  // otherwise the code continues to execute
  const projects = await fakeDb.projects.scan({
    userId: session.get("userId"),
  });
  return json(projects);
}
```

Even if you don't need the session information, the function will still protect the route:

```tsx
export async function loader({ request }: LoaderArgs) {
  await requireUserSession(request);
  // continue
}
```

## How do I handle multiple forms in one route?

[Watch on YouTube][watch-on-you-tube]

In HTML, forms can post to any URL with the action prop and the app will navigate there:

```jsx
<Form action="/some/where" />
```

In Remix the action defaults to the route that the form is rendered in, making it easy to co-locate the UI and the server code that handles it. Developers often wonder how you can handle multiple actions in this scenario. You have two choices:

1. Send a form field to determine the action you want to take
2. Post to a different route and redirect back to the original

We find option (1) to be the simplest because you don't have to mess around with sessions to get validation errors back to the UI.

HTML buttons can send a value, so it's the easiest way to implement this:

```tsx
export async function action({ request }: ActionArgs) {
  let formData = await request.formData();
  let intent = formData.get("intent");
  switch (intent) {
    case "update": {
      // do your update
      return updateProjectName(formData.get("name"));
    }
    case "delete": {
      // do your delete
      return deleteStuff(formData);
    }
    default: {
      throw new Error("Unexpected action");
    }
  }
}

export default function Projects() {
  let project = useLoaderData<typeof loader>();
  return (
    <>
      <h2>Update Project</h2>
      <Form method="post">
        <label>
          Project name:{" "}
          <input
            type="text"
            name="name"
            defaultValue={project.name}
          />
        </label>
        <button type="submit" name="intent" value="update">
          Update
        </button>
      </Form>

      <Form method="post">
        <button type="submit" name="intent" value="delete">
          Delete
        </button>
      </Form>
    </>
  );
}
```

## How can I have structured data in a form?

If you're used to doing fetches with a content type of `application/json`, you may wonder how forms fit into this.  is a bit different than JSON.

- It can't have nested data, it's just "key value".
- It _can_ have multiple entries on one key, unlike JSON.

If you're wanting to send structured data simply to post arrays, you can use the same key on multiple inputs:

```jsx
<Form method="post">
  <p>Select the categories for this video:</p>
  <label>
    <input type="checkbox" name="category" value="comedy" />{" "}
    Comedy
  </label>
  <label>
    <input type="checkbox" name="category" value="music" />{" "}
    Music
  </label>
  <label>
    <input type="checkbox" name="category" value="howto" />{" "}
    How-To
  </label>
</Form>
```

Each checkbox has the name: "category". Since `FormData` can have multiple values on the same key, you don't need JSON for this. Access the checkbox values with `formData.getAll()` in your action.

```tsx
export async function action({ request }: ActionArgs) {
  const formData = await request.formData();
  let categories = formData.getAll("category");
  // ["comedy", "music"]
}
```

Using the same input name and `formData.getAll()` covers most cases for wanting to submit structured data in your forms.

If you still want to submit nested structures as well, you can use non-standard form-field naming conventions and the  package from npm:

```tsx
<>
  // arrays with []
  <input name="category[]" value="comedy" />
  <input name="category[]" value="comedy" />
  // nested structures parentKey[childKey]
  <input name="user[name]" value="Ryan" />
</>
```

And then in your action:

```tsx
import queryString from "query-string";

// in your action:
export async function action({ request }: ActionArgs) {
  // use `request.text()`, not `request.formData` to get the form data as a url
  // encoded form query string
  let formQueryString = await request.text();

  // parse it into an object
  let obj = queryString.parse(formQueryString);
}
```

Some folks even dump their JSON into a hidden field. Note that this approach won't work with progressive enhancement. If that's not important to your app, this is an easy way to send structured data.

```tsx
<input
  type="hidden"
  name="json"
  value={JSON.stringify(obj)}
/>
```

And then parse it in the action:

```tsx
export async function action({ request }: ActionArgs) {
  let formData = await request.formData();
  let obj = JSON.parse(formData.get("json"));
}
```

Again, `formData.getAll()` is often all you need, we encourage you to give it a shot!

## What's the difference between `CatchBoundary` & `ErrorBoundary`?

Error boundaries render when your application throws an error and you had no clue it was going to happen. Most apps just go blank or have spinners spin forever. In remix the error boundary renders and you have granular control over it.

Catch boundaries render when you decide in a loader that you can't proceed down the happy path to render the UI you want (auth required, record not found, etc.), so you throw a response and let some catch boundary up the tree handle it.

# Gotchas

As we've built Remix, we've been laser focused on production results and scalability for your users and team working in it. Because of this, some developer-experience and ecosystem-compatibility issues exist that we haven't smoothed over yet.

This document should help you get over these bumps.

## Server Code in Client Bundles

You may run into this strange error in the browser. It almost always means that server code made it into browser bundles.

```
TypeError: Cannot read properties of undefined (reading 'root')
```

For example, you can't import "fs-extra" directly into a route module:

```jsx
import { json } from "@remix-run/node"; // or cloudflare/deno
import fs from "fs-extra";

export async function loader() {
  return json(await fs.pathExists("../some/path"));
}

export default function SomeRoute() {
  // ...
}
```

To fix it, move the import into a different module named `*.server.js` or `*.server.ts` and import from there. In our example here, we create a new file at `utils/fs-extra.server.js`:

```js
export { default } from "fs-extra";
```

And then change our import in the route to the new "wrapper" module:

```jsx
import { json } from "@remix-run/node"; // or cloudflare/deno

import fs from "~/utils/fs-extra.server";

export async function loader() {
  return json(await fs.pathExists("../some/path"));
}

export default function SomeRoute() {
  // ...
}
```

Even better, send a PR to the project to add `"sideEffects": false` to their package.json so that bundlers that tree shake know they can safely remove the code from browser bundles.

Similarly, you may run into the same error if you call a function at the top-level scope of your route module that depends on server-only code.

For example, [Remix upload handlers like ][remix-upload-handlers-like-unstable-create-file-upload-handler-and-unstable-create-memory-upload-handler] use Node globals under the hood and should only be called on the server. You can call either of these functions in a `*.server.js` or `*.server.ts` file, or you can move them into your route's `action` or `loader` function.

So instead of doing:

```jsx
import { unstable_createFileUploadHandler } from "@remix-run/node"; // or cloudflare/deno

const uploadHandler = unstable_createFileUploadHandler({
  maxPartSize: 5_000_000,
  file: ({ filename }) => filename,
});

export async function action() {
  // use `uploadHandler` here ...
}
```

You should be doing:

```jsx
import { unstable_createFileUploadHandler } from "@remix-run/node"; // or cloudflare/deno

export async function action() {
  const uploadHandler = unstable_createFileUploadHandler({
    maxPartSize: 5_000_000,
    file: ({ filename }) => filename,
  });

  // use `uploadHandler` here ...
}
```

> Why does this happen?

Remix uses "tree shaking" to remove server code from browser bundles. Anything inside of Route module `loader`, `action`, and `headers` exports will be removed. It's a great approach but suffers from ecosystem compatibility.

When you import a third-party module, Remix checks the `package.json` of that package for `"sideEffects": false`. If that is configured, Remix knows it can safely remove the code from the client bundles. Without it, the imports remain because code may depend on the module's side effects (like setting global polyfills, etc.).

## Importing ESM Packages

You may try importing an ESM-only package into your app and see an error like this when server rendering:

```
Error [ERR_REQUIRE_ESM]: require() of ES Module /app/node_modules/dot-prop/index.js from /app/project/build/index.js not supported.
Instead change the require of /app/project/node_modules/dot-prop/index.js in /app/project/build/index.js to a dynamic import() which is available in all CommonJS modules.
```

To fix it, add the ESM package to the `serverDependenciesToBundle` option in your `remix.config.js` file.

In our case here, we're using the `dot-prop` package, so we would do it like this:

```js
/** @type {import('@remix-run/dev').AppConfig} */
module.exports = {
  serverDependenciesToBundle: ["dot-prop"],
  // ...
};
```

> Why does this happen?

Remix compiles your server build to CJS and doesn't bundle your node modules. CJS modules can't import ESM modules.

Adding packages to `serverDependenciesToBundle` tells Remix to bundle the ESM module directly into the server build instead of requiring it at runtime.

> Isn't ESM the future?

Yes! Our plan is to allow you to compile your app to ESM on the server. However, that will come with the reverse problem of not being able to import some CommonJS modules that are incompatible with being imported from ESM! So even when we get there, we may still need this configuration.

You may ask why we don't just bundle everything for the server. We could, but that will slow down builds and make production stack traces all point to a single file for your entire app. We don't want to do that. We know we can smooth this over eventually without making that tradeoff.

With major deployment platforms now supporting ESM server side, we're confident the future is brighter than the past here. We're still working on a solid dev experience for ESM server builds, our current approach relies on some things that you can't do in ESM. We'll get there.

## `typeof window` checks

Because the same JavaScript code can run in the browser as well as the server, sometimes you need to have a part of your code that only runs in one context or the other:

```ts
if (typeof window === "undefined") {
  // running in a server environment
} else {
  // running in a browser environment
}
```

This works fine in a Node.js environment, however, Deno actually supports `window`! So if you really want to check whether you're running in the browser, it's better to check for `document` instead:

```ts
if (typeof document === "undefined") {
  // running in a server environment
} else {
  // running in a browser environment
}
```

This will work for all JS environments (Node.js, Deno, Workers, etc.).

## Browser extensions injecting code

You may run into this warning in the browser:

```
Warning: Did not expect server HTML to contain a <script> in <html>.
```

This is a hydration warning from React, and is most likely due to one of your browser extensions injecting scripts into the server-rendered HTML, creating a difference with the resulting HTML.

Check out the page in incognito mode, the warning should disappear.

## CSS bundle being incorrectly tree-shaken

When using [CSS bundling features][css-bundling] in combination with `export *` (e.g. when using an index file like `components/index.ts` that re-exports from all sub-directories) you may find that styles from the re-exported modules are missing from the build output.

This is due to an [issue with esbuild's CSS tree shaking][esbuild-css-tree-shaking-issue]. As a workaround, you should use named re-exports instead.

```diff
-export * from "./Button";
+export { Button } from "./Button";
```

Note that, even if this issue didn't exist, we'd still recommend using named re-exports! While it may introduce a bit more boilerplate, you get explicit control over the module's public interface rather than inadvertently exposing everything.

# entry.client

Remix uses `app/entry.client.tsx` (or `.jsx`) as the entry point for the browser bundle. This module gives you full control over the "hydrate" step after JavaScript loads into the document.

Typically this module uses `ReactDOM.hydrate` to re-hydrate the markup that was already generated on the server in your [server entry module][server-entry-module].

Here's a basic example:

```tsx
import { hydrate } from "react-dom";
import { RemixBrowser } from "@remix-run/react";

hydrate(<RemixBrowser />, document);
```

This is the first piece of code that runs in the browser. As you can see, you have full control here. You can initialize client side libraries, setup things like `window.history.scrollRestoration`, etc.

# entry.server

Remix uses `app/entry.server.tsx` (or `.jsx`) to generate the HTTP response when rendering on the server. The `default` export of this module is a function that lets you create the response, including HTTP status, headers, and HTML, giving you full control over the way the markup is generated and sent to the client.

This module should render the markup for the current page using a `<RemixServer>` element with the `context` and `url` for the current request. This markup will (optionally) be re-hydrated once JavaScript loads in the browser using the [browser entry module][browser-entry-module].

You can also export an optional `handleDataRequest` function that will allow you to modify the response of a data request. These are the requests that do not render HTML, but rather return the loader and action data to the browser once client-side hydration has occurred.

Here's a basic example:

```tsx
import { renderToString } from "react-dom/server";
import type {
  EntryContext,
  HandleDataRequestFunction,
} from "@remix-run/node"; // or cloudflare/deno
import { RemixServer } from "@remix-run/react";

export default function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext
) {
  const markup = renderToString(
    <RemixServer context={remixContext} url={request.url} />
  );

  responseHeaders.set("Content-Type", "text/html");

  return new Response("<!DOCTYPE html>" + markup, {
    status: responseStatusCode,
    headers: responseHeaders,
  });
}

// this is an optional export
export const handleDataRequest: HandleDataRequestFunction =
  (
    response: Response,
    // same args that get passed to the action or loader that was called
    { request, params, context }
  ) => {
    response.headers.set("x-custom", "yay!");
    return response;
  };
```

# remix.config.js

This file has a few build and development configuration options, but does not actually run on your server.

```tsx
/** @type {import('@remix-run/dev').AppConfig} */
module.exports = {
  appDirectory: "app",
  assetsBuildDirectory: "public/build",
  ignoredRouteFiles: ["**/.*"],
  publicPath: "/build/",
  routes(defineRoutes) {
    return defineRoutes((route) => {
      route("/somewhere/cool/*", "catchall.tsx");
    });
  },
  serverBuildPath: "build/index.js",
  serverBuildTarget: "node-cjs",
};
```

## appDirectory

The path to the `app` directory, relative to remix.config.js. Defaults to
`"app"`.

```js
// default
exports.appDirectory = "./app";

// custom
exports.appDirectory = "./elsewhere";
```

## assetsBuildDirectory

The path to the browser build, relative to remix.config.js. Defaults to
"public/build". Should be deployed to static hosting.

## cacheDirectory

The path to a directory Remix can use for caching things in development,
relative to `remix.config.js`. Defaults to `".cache"`.

## devServerBroadcastDelay

The delay, in milliseconds, before the dev server broadcasts a reload event.
There is no delay by default.

## devServerPort

The port number to use for the dev websocket server. Defaults to 8002.

## ignoredRouteFiles

This is an array of globs (via [minimatch][minimatch]) that Remix will match to
files while reading your `app/routes` directory. If a file matches, it will be
ignored rather than treated like a route module. This is useful for ignoring
dotfiles (like `.DS_Store` files) or CSS/test files you wish to colocate.

## publicPath

The URL prefix of the browser build with a trailing slash. Defaults to
`"/build/"`. This is the path the browser will use to find assets.

## routes

A function for defining custom routes, in addition to those already defined
using the filesystem convention in `app/routes`. Both sets of routes will be merged.

```tsx
exports.routes = async (defineRoutes) => {
  // If you need to do async work, do it before calling `defineRoutes`, we use
  // the call stack of `route` inside to set nesting.

  return defineRoutes((route) => {
    // A common use for this is catchall routes.
    // - The first argument is the React Router path to match against
    // - The second is the relative filename of the route handler
    route("/some/path/*", "catchall.tsx");

    // if you want to nest routes, use the optional callback argument
    route("some/:path", "some/route/file.js", () => {
      // - path is relative to parent path
      // - filenames are still relative to the app directory
      route("relative/path", "some/other/file");
    });
  });
};
```

## server

A server entrypoint, relative to the root directory that becomes your server's
main module. If specified, Remix will compile this file along with your
application into a single file to be deployed to your server. This file can use
either a `.js` or `.ts` file extension.

## serverBuildDirectory

`<docs-warning>`This option is deprecated and will likely be removed in a future
stable release. Use  instead.`</docs-warning>`

The path to the server build, relative to `remix.config.js`. Defaults to
"build". This needs to be deployed to your server.

## serverBuildPath

The path to the server build file, relative to `remix.config.js`. This file
should end in a `.js` extension and should be deployed to your server.

If omitted, the default build path will be based on your
.

## serverBuildTarget

The target of the server build. Defaults to `"node-cjs"`.

The `serverBuildTarget` can be one of the following:

- 
- 
- 
- 
- 
- 
- 

## serverDependenciesToBundle

A list of regex patterns that determines if a module is transpiled and included in the server bundle. This can be useful when consuming ESM only packages in a CJS build, or when consuming packages with [CSS side-effect imports][css-side-effect-imports].

For example, the `unified` ecosystem is all ESM-only. Let's also say we're using a `@sindresorhus/slugify` which is ESM-only as well. Here's how you would be able to consume those packages in a CJS app without having to use dynamic imports:

```ts
/** @type {import('@remix-run/dev').AppConfig} */
module.exports = {
  appDirectory: "app",
  assetsBuildDirectory: "public/build",
  publicPath: "/build/",
  serverBuildDirectory: "build",
  ignoredRouteFiles: ["**/.*"],
  serverDependenciesToBundle: [
    /^rehype.*/,
    /^remark.*/,
    /^unified.*/,
    "@sindresorhus/slugify",
  ],
};
```

## watchPaths

An array, string, or async function that defines custom directories, relative to the project root, to watch while running [remix dev][remix-dev]. These directories are in addition to .

```tsx
exports.watchPaths = async () => {
  return ["./some/path/*"];
};

// also valid
exports.watchPaths = ["./some/path/*"];
```

## File Name Conventions

There are a few conventions that Remix uses you should be aware of.

`<docs-info>`[Dilum Sanjaya][dilum-sanjaya] made [an awesome visualization][an-awesome-visualization] of how routes in the file system map to the URL in your app that might help you understand these conventions.`</docs-info>`

# Root Route

FIXME: This is mostly the wrong doc, right code.

These components are to be used once inside your root route (`root.tsx`). They include everything Remix figured out or built in order for your page to render properly.

```tsx
import type {
  LinksFunction,
  MetaFunction,
} from "@remix-run/node"; // or cloudflare/deno
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";

import globalStylesheetUrl from "./global-styles.css";

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: globalStylesheetUrl }];
};

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "My Amazing App",
  viewport: "width=device-width,initial-scale=1",
});

export default function App() {
  return (
    <html lang="en">
      <head>
        {/* All meta exports on all routes will go here */}
        <Meta />

        {/* All link exports on all routes will go here */}
        <Links />
      </head>
      <body>
        {/* Child routes go here */}
        <Outlet />

        {/* Manages scroll position for client-side transitions */}
        {/* If you use a nonce-based content security policy for scripts, you must provide the `nonce` prop. Otherwise, omit the nonce prop as shown here. */}
        <ScrollRestoration />

        {/* Script tags go here */}
        {/* If you use a nonce-based content security policy for scripts, you must provide the `nonce` prop. Otherwise, omit the nonce prop as shown here. */}
        <Scripts />

        {/* Sets up automatic reload when you change code */}
        {/* and only does anything during development */}
        {/* If you use a nonce-based content security policy for scripts, you must provide the `nonce` prop. Otherwise, omit the nonce prop as shown here. */}
        <LiveReload />
      </body>
    </html>
  );
}
```

You can pass extra props to `<Scripts />` like `<Scripts crossOrigin />` for hosting your static assets on a different server than your app.

The example above renders several `<script />` tags into the resulting HTML. While this usually just works, you might have configured a [content security policy for scripts][csp] that prevents these `<script />` tags from being executed. In particular, to support [content security policies with nonce-sources for scripts][csp-nonce], the `<Scripts />`, `<LiveReload />` and `<ScrollRestoration />` components support a `nonce` property, e.g.`<Script nonce={nonce}/>`. The provided nonce is subsequently passed to the `<script />` tag rendered into the HTML by these components, allowing the scripts to be executed in accordance with your CSP policy.

See also:

- 
- 

# Route File Naming

Setting up routes in Remix is as simple as creating files in your `app` directory. These are the conventions you should know to understand how routing in Remix works.

Please note that you can use either `.js`, `.jsx` or `.tsx` file extensions depending on whether or not you use TypeScript. We'll stick with `.tsx` in the examples to avoid duplication.

## Root Route

<!-- prettier-ignore -->

```markdown
app/
├── routes/
└── root.tsx
```

The file in `app/root.tsx` is your root layout, or "root route" (very sorry for those of you who pronounce those words the same way!). It works just like all other routes:

- You can export a , , , , or  function
- You can export an  or 
- Your default export is the layout component that renders the rest of your app in an 

## Basic Routes

Any JavaScript or TypeScript files in the `app/routes/` directory will become routes in your application. The filename maps to the route's URL pathname, except for `index.tsx` which maps to the root pathname.

<!-- prettier-ignore -->

```markdown
app/
├── routes/
│   ├── about.tsx
│   └── index.tsx
└── root.tsx
```

| URL        | Matched Route            |
| ---------- | ------------------------ |
| `/`      | `app/routes/index.tsx` |
| `/about` | `app/routes/about.tsx` |

The default export in this file is the component that is rendered at that route and will render within the `<Outlet />` rendered by the root route.

## Dynamic Route Parameters

<!-- prettier-ignore -->

```markdown
app/
├── routes/
│   ├── blog/
│   │   ├── $postId.tsx
│   │   ├── categories.tsx
│   │   └── index.tsx
│   ├── about.tsx
│   └── index.tsx
└── root.tsx
```

<details>

<summary>URL Route Matches</summary>

| URL                  | Matched Route                      |
| -------------------- | ---------------------------------- |
| `/blog`            | `app/routes/blog/index.tsx`      |
| `/blog/categories` | `app/routes/blog/categories.tsx` |
| `/blog/my-post`    | `app/routes/blog/$postId.tsx`    |

</details>

Routes that begin with a `$` character indicate the name of a dynamic segment of the URL. It will be parsed and passed to your loader and action data as a value on the `param` object.

For example: `app/routes/blog/$postId.tsx` will match the following URLs:

- `/blog/my-story`
- `/blog/once-upon-a-time`
- `/blog/how-to-ride-a-bike`

On each of these pages, the dynamic segment of the URL path is the value of the parameter. There can be multiple parameters active at any time (as in `/dashboard/:client/invoices/:invoiceId` [view example app][view-example-app]) and all parameters can be accessed within components via  and within loaders/actions via the argument's  property:

```tsx
import type {
  ActionArgs,
  LoaderArgs,
} from "@remix-run/node"; // or cloudflare/deno
import { useParams } from "@remix-run/react";

export const loader = async ({ params }: LoaderArgs) => {
  console.log(params.postId);
};

export const action = async ({ params }: ActionArgs) => {
  console.log(params.postId);
};

export default function PostRoute() {
  const params = useParams();
  console.log(params.postId);
}
```

Nested routes can also contain dynamic segments by using the `$` character in the parent's directory name. For example, `app/routes/blog/$postId/edit.tsx` might represent the editor page for blog entries.

See the [routing guide][routing-guide] for more information.

## Optional Segments

Wrapping a route segment in parens will make the segment optional.

<!-- prettier-ignore -->

```markdown
app/
├── routes/
│   ├── ($lang)/
│   │   ├── $pid.tsx
│   │   ├── categories.tsx
│   │   └── index.tsx
│   └── index.tsx
└── root.tsx
```

<details>

<summary>URL Route Matches</summary>

| URL                          | Matched Route                         |
| ---------------------------- | ------------------------------------- |
| `/categories`              | `app/routes/($lang)/categories.tsx` |
| `/en/categories`           | `app/routes/($lang)/categories.tsx` |
| `/fr/categories`           | `app/routes/($lang)/categories.tsx` |
| `/american-flag-speedo`    | `app/routes/($lang)/$pid.tsx`       |
| `/en/american-flag-speedo` | `app/routes/($lang)/$pid.tsx`       |
| `/fr/american-flag-speedo` | `app/routes/($lang)/$pid.tsx`       |

</details>

## Layout Routes

<!-- prettier-ignore -->

```markdown
app/
├── routes/
│   ├── blog/
│   │   ├── $postId.tsx
│   │   ├── categories.tsx
│   │   └── index.tsx
│   ├── about.tsx
│   ├── blog.tsx
│   └── index.tsx
└── root.tsx
```

<details>

<summary>URL Route Matches</summary>

| URL                  | Matched Route                      | Layout                  |
| -------------------- | ---------------------------------- | ----------------------- |
| `/`                | `app/routes/index.tsx`           | `app/root.tsx`        |
| `/about`           | `app/routes/about.tsx`           | `app/root.tsx`        |
| `/blog`            | `app/routes/blog/index.tsx`      | `app/routes/blog.tsx` |
| `/blog/categories` | `app/routes/blog/categories.tsx` | `app/routes/blog.tsx` |
| `/blog/my-post`    | `app/routes/blog/$postId.tsx`    | `app/routes/blog.tsx` |

</details>

In the example above, the `blog.tsx` is a "layout route" for everything within the `blog` directory (`blog/index.tsx` and `blog/categories.tsx`). When a route has the same name as its directory (`routes/blog.tsx` and `routes/blog/`), it becomes a layout route for all of the routes inside that directory ("child routes"). Similar to your [root route][root-route], the parent route should render an `<Outlet />` where the child routes should appear. This is how you can create multiple levels of persistent layout nesting associated with URLs.

## Pathless Layout Routes

<!-- prettier-ignore -->

```markdown
app/
├── routes/
│   ├── __app/
│   │   ├── dashboard.tsx
│   │   └── $userId/
│   │       └── profile.tsx
│   └── __marketing
│   │   ├── index.tsx
│   │   └── product.tsx
│   ├── __app.tsx
│   └── __marketing.tsx
└── root.tsx
```

<details>

<summary>URL Route Matches</summary>

| URL                 | Matched Route                            | Layout                         |
| ------------------- | ---------------------------------------- | ------------------------------ |
| `/`               | `app/routes/__marketing/index.tsx`     | `app/routes/__marketing.tsx` |
| `/product`        | `app/routes/__marketing/product.tsx`   | `app/routes/__marketing.tsx` |
| `/dashboard`      | `app/routes/__app/dashboard.tsx`       | `app/routes/__app.tsx`       |
| `/chance/profile` | `app/routes/__app/$userId/profile.tsx` | `app/routes/__app.tsx`       |

</details>

You can also create layout routes _without adding segments to the URL_ by prepending the directory and associated parent route file with double underscores: `__`.

For example, all of your marketing pages could be in `app/routes/__marketing/*` and then share a layout by creating `app/routes/__marketing.tsx`. A route `app/routes/__marketing/product.tsx` would be accessible at the `/product` URL because `__marketing` won't add segments to the URL, just UI hierarchy.

`<docs-warning>`Be careful, pathless layout routes introduce the possibility of URL conflicts`</docs-warning>`

## Dot Delimiters

<!-- prettier-ignore -->

```markdown
app/
├── routes/
│   ├── blog/
│   │   ├── $postId.tsx
│   │   ├── categories.tsx
│   │   └── index.tsx
│   ├── about.tsx
│   ├── blog.authors.tsx
│   ├── blog.tsx
│   └── index.tsx
└── root.tsx
```

<details>

<summary>URL Route Matches</summary>

| URL                  | Matched Route                      | Layout                  |
| -------------------- | ---------------------------------- | ----------------------- |
| `/blog`            | `app/routes/blog/index.tsx`      | `app/routes/blog.tsx` |
| `/blog/categories` | `app/routes/blog/categories.tsx` | `app/routes/blog.tsx` |
| `/blog/authors`    | `app/routes/blog.authors.tsx`    | `app/root.tsx`        |

</details>

By creating a file with `.` characters between segments, you can create a nested URL without nested layouts. For example, a file `app/routes/blog.authors.tsx` will route to the pathname `/blog/authors`, but it will not share a layout with routes in the `app/routes/blog/` directory.

## Splat Routes

<!-- prettier-ignore -->

```markdown
app/
├── routes/
│   ├── blog/
│   │   ├── $postId.tsx
│   │   ├── categories.tsx
│   │   └── index.tsx
│   ├── $.tsx
│   ├── about.tsx
│   ├── blog.authors.tsx
│   ├── blog.tsx
│   └── index.tsx
└── root.tsx
```

<details>

<summary>URL Route Matches</summary>

| URL                 | Matched Route                 | Layout                  |
| ------------------- | ----------------------------- | ----------------------- |
| `/`               | `app/routes/index.tsx`      | `app/root.tsx`        |
| `/blog`           | `app/routes/blog/index.tsx` | `app/routes/blog.tsx` |
| `/somewhere-else` | `app/routes/$.tsx`          | `app/root.tsx`        |

</details>

Files that are named `$.tsx` are called "splat" (or "catch-all") routes. These routes will map to any URL not matched by other route files in the same directory.

Similar to dynamic route parameters, you can access the value of the matched path on the splat route's `params` with the `"*"` key.

```tsx
import type {
  ActionArgs,
  LoaderArgs,
} from "@remix-run/node"; // or cloudflare/deno
import { useParams } from "@remix-run/react";

export const loader = async ({ params }: LoaderArgs) => {
  console.log(params["*"]);
};

export const action = async ({ params }: ActionArgs) => {
  console.log(params["*"]);
};

export default function PostRoute() {
  const params = useParams();
  console.log(params["*"]);
}
```

## Escaping special characters

Because some characters have special meaning, you must use our escaping syntax if you want those characters to actually appear in the route. For example, if I wanted to make a [Resource Route][resource-route] for a `/sitemap.xml`, I could name the file `app/routes/[sitemap.xml].tsx`. So you simply wrap any part of the filename with brackets and that will escape any special characters.

<docs-info>
  Note, you could even do `app/routes/sitemap[.]xml.tsx` if you wanted to only wrap the part that needs to be escaped. It makes no difference. Choose the one you like best.
</docs-info>

## v2 Route Convention

The Route file naming convention is changing in v2 to make file organization simpler and make co-location of modules used by your routes simpler. You can opt-in to the new convention today, [see the Route Convention v2 page][routeconvention-v2] but you don't need to today, or ever if you don't want to.

# Route File Naming (v2)

You can opt-in to the new route file naming convention with a future flag in Remix config. It will be the default behavior in the future when v2 ships. For background on this change, [see the RFC][flatroutes-rfc].

```js
module.exports = {
  future: {
    v2_routeConvention: true,
  },
};
```

We encourage you to make this change early so upgrading is easy. We'll be providing a helper function to use the old convention in v2 if you prefer it.

---

While you can configure routes in [remix.config.js][remix-config], most routes are created with this file system convention. Add a file, get a route.

Please note that you can use either `.jsx` or `.tsx` file extensions. We'll stick with `.tsx` in the examples to avoid duplication.

## Root Route

<!-- prettier-ignore -->

```markdown
app/
├── routes/
└── root.tsx
```

The file in `app/root.tsx` is your root layout, or "root route" (very sorry for those of you who pronounce those words the same way!). It works just like all other routes so you can export a , , etc.

The root route typically looks something like this. It serves as the root layout of the entire app, all other routes will render inside the `<Outlet />`.

```jsx
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";

export default function Root() {
  return (
    <html lang="en">
      <head>
        <Links />
        <Meta />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
```

## Basic Routes

Any JavaScript or TypeScript files in the `app/routes/` directory will become routes in your application. The filename maps to the route's URL pathname, except for `_index.tsx` which is the [index route][index-route] for the [root route][root-route].

<!-- prettier-ignore -->

```markdown
app/
├── routes/
│   ├── _index.tsx
│   └── about.tsx
└── root.tsx
```

| URL        | Matched Routes |
| ---------- | -------------- |
| `/`      | `_index.tsx` |
| `/about` | `about.tsx`  |

Note that these routes will be rendered in the outlet of `app/root.tsx` because of [nested routing][nested-routing].

## Dot Delimiters

Adding a `.` to a route filename will create a `/` in the URL.

<!-- prettier-ignore -->

```markdown
app/
├── routes/
│   ├── _index.tsx
│   ├── about.tsx
│   ├── concerts.trending.tsx
│   ├── concerts.salt-lake-city.tsx
│   └── concerts.san-diego.tsx
└── root.tsx
```

| URL                          | Matched Route                   |
| ---------------------------- | ------------------------------- |
| `/concerts/trending`       | `concerts.trending.tsx`       |
| `/concerts/salt-lake-city` | `concerts.salt-lake-city.tsx` |
| `/concerts/san-diego`      | `concerts.san-diego.tsx`      |

The dot delimiter also creates nesting, see the [nesting section][nested-routes] for more information.

## Dynamic Segments

Usually your URLs aren't static but data-driven. Dynamic segments allow you to match segments of the URL and use that value in your code. You create them with the `$` prefix.

<!-- prettier-ignore -->

```markdown
app/
├── routes/
│   ├── _index.tsx
│   ├── about.tsx
│   ├── concerts.$city.tsx
│   └── concerts.trending.tsx
└── root.tsx
```

| URL                          | Matched Route             |
| ---------------------------- | ------------------------- |
| `/concerts/trending`       | `concerts.trending.tsx` |
| `/concerts/salt-lake-city` | `concerts.$city.tsx`    |
| `/concerts/san-diego`      | `concerts.$city.tsx`    |

Remix will parse the value from the URL and pass it to various APIs. We call these values "URL Parameters". The most useful places to access the URL params are in [loaders][loader] and [actions][action].

```jsx
export function loader({ params }) {
  return fakeDb.getAllConcertsForCity(params.city);
}
```

You'll note the property name on the `params` object maps directly to the name of your file: `$city.tsx` becomes `params.city`.

Routes can have multiple dynamic segments, like `concerts.$city.$date`, both are accessed on the params object by name:

```jsx
export function loader({ params }) {
  return fake.db.getConcerts({
    date: params.date,
    city: params.city,
  });
}
```

See the [routing guide][routing-guide] for more information.

## Nested Routes

Nested Routing is the general idea of coupling segments of the URL to component hierarchy and data. You can read more about it in the [Routing Guide][nested-routing].

You create nested routes with [dot delimiters][dot-delimiters]. If the filename before the `.` matches another route filename, it automatically becomes a child route to the matching parent. Consider these routes:

<!-- prettier-ignore -->

```markdown
app/
├── routes/
│   ├── _index.tsx
│   ├── about.tsx
│   ├── concerts._index.tsx
│   ├── concerts.$city.tsx
│   ├── concerts.trending.tsx
│   └── concerts.tsx
└── root.tsx
```

All of the routes that start with `concerts.` will be child routes of `concerts.tsx` and render inside the parent route's [outlet][outlet].

| URL                          | Matched Route             | Layout           |
| ---------------------------- | ------------------------- | ---------------- |
| `/`                        | `_index.tsx`            | `root.tsx`     |
| `/about`                   | `about.tsx`             | `root.tsx`     |
| `/concerts`                | `concerts._index.tsx`   | `concerts.tsx` |
| `/concerts/trending`       | `concerts.trending.tsx` | `concerts.tsx` |
| `/concerts/salt-lake-city` | `concerts.$city.tsx`    | `concerts.tsx` |

Note you typically want to add an index route when you add nested routes so that something renders inside the parent's outlet when users visit the parent URL directly.

## Nested URLs without Layout Nesting

Sometimes you want the URL to be nested but you don't want the automatic layout nesting. You can opt-out of nesting with a trailing underscore on the parent segment:

<!-- prettier-ignore -->

```markdown
app/
├── routes/
│   ├── _index.tsx
│   ├── about.tsx
│   ├── concerts.$city.tsx
│   ├── concerts.trending.tsx
│   ├── concerts.tsx
│   └── concerts_.mine.tsx
└── root.tsx
```

| URL                          | Matched Route             | Layout           |
| ---------------------------- | ------------------------- | ---------------- |
| `/`                        | `_index.tsx`            | `root.tsx`     |
| `/concerts/mine`           | `concerts_.mine.tsx`    | `root.tsx`     |
| `/concerts/trending`       | `concerts.trending.tsx` | `concerts.tsx` |
| `/concerts/salt-lake-city` | `concerts.$city.tsx`    | `concerts.tsx` |

Note that `/concerts/mine` does not nest with `concerts.tsx` anymore, but `root.tsx`. The `trailing_` underscore creates a path segment, but it does not create layout nesting.

Think of the `trailing_` underscore as the long bit at the end of your parent's signature, writing you out of the will, removing the segment that follows from the layout nesting.

## Nested Layouts without Nested URLs

We call these `<a name="pathless-routes"><b>`Pathless Routes`</b></a>`

Sometimes you want to share a layout with a group of routes without adding any path segments to the URL. A common example is a set of authentication routes that have a different header/footer than the public pages or the logged in app experience. You can do this with a `_leading` underscore.

<!-- prettier-ignore -->

```markdown
app/
├── routes/
│   ├── _auth.login.tsx
│   ├── _auth.register.tsx
│   ├── _auth.tsx
│   ├── _index.tsx
│   ├── concerts.$city.tsx
│   └── concerts.tsx
└── root.tsx
```

| URL                          | Matched Route          | Layout           |
| ---------------------------- | ---------------------- | ---------------- |
| `/`                        | `_index.tsx`         | `root.tsx`     |
| `/login`                   | `_auth.login.tsx`    | `_auth.tsx`    |
| `/register`                | `_auth.register.tsx` | `_auth.tsx`    |
| `/concerts/salt-lake-city` | `concerts.$city.tsx` | `concerts.tsx` |

Think of the `_leading` underscore as a blanket you're pulling over the filename, hiding the filename from the URL.

## Optional Segments

Wrapping a route segment in parentheses will make the segment optional.

<!-- prettier-ignore -->

```markdown
app/
├── routes/
│   ├── ($lang)._index.tsx
│   ├── ($lang).$productId.tsx
│   └── ($lang).categories.tsx
└── root.tsx
```

| URL                          | Matched Route              |
| ---------------------------- | -------------------------- |
| `/`                        | `($lang)._index.tsx`     |
| `/categories`              | `($lang).categories.tsx` |
| `/en/categories`           | `($lang).categories.tsx` |
| `/fr/categories`           | `($lang).categories.tsx` |
| `/american-flag-speedo`    | `($lang).$productId.tsx` |
| `/en/american-flag-speedo` | `($lang).$productId.tsx` |
| `/fr/american-flag-speedo` | `($lang).$productId.tsx` |

## Splat Routes

While [dynamic segments][dynamic-segments] match a single path segment (the stuff between two `/` in a url), a splat route will match the rest of a URL, including the slashes.

<!-- prettier-ignore -->

```markdown
app/
├── routes/
│   ├── _index.tsx
│   ├── $.tsx
│   ├── about.tsx
│   └── files.$.tsx
└── root.tsx
```

| URL                                            | Matched Route   |
| ---------------------------------------------- | --------------- |
| `/`                                          | `_index.tsx`  |
| `/beef/and/cheese`                           | `$.tsx`       |
| `/files`                                     | `files.$.tsx` |
| `/files/talks/remix-conf_old.pdf`            | `files.$.tsx` |
| `/files/talks/remix-conf_final.pdf`          | `files.$.tsx` |
| `/files/talks/remix-conf-FINAL-MAY_2022.pdf` | `files.$.tsx` |

Similar to dynamic route parameters, you can access the value of the matched path on the splat route's `params` with the `"*"` key.

```tsx
export function loader({ params }) {
  let filePath = params["*"];
  return fake.getFileInfo(filePath);
}
```

## Escaping Special Characters

If you want one of the special characters Remix uses for these route conventions to actually be a part of the URL, you can escape the conventions with `[]` characters.

| Filename                                               | URL                   |
| ------------------------------------------------------ | --------------------- |
| `routes/sitemap[.]xml.tsx`                           | `/sitemap.xml`      |
| `routes/[sitemap.xml].tsx`                           | `/sitemap.xml`      |
| `routes/weird-url.[_index].tsx`                      | `/weird-url/_index` |
| `routes/dolla-bills-[$].tsx`    | `/dolla-bills-$` |                       |
| `routes/[[so-weird]].tsx`                            | `/[so-weird]`       |

## Folders for Organization

Routes can also be folders with a conventional node module resolution `index.tsx` file inside defining the route module. The rest of the files in the folder will not become routes. This allows you to organize your code closer to the routes that use them instead of repeating the feature names across other folders.

`<docs-info>`The files inside a folder have no meaning for the route paths, the route path is completely defined by the folder name`</docs-info>`

Consider these routes:

```
routes/
  _landing.about.tsx
  _landing._index.tsx
  _landing.tsx
  app._index.tsx
  app.projects.tsx
  app.tsx
  app_.projects.$id.roadmap.tsx
```

Some, or all of them can be folders holding their own modules inside:

```
routes/
  _landing.about/
    index.tsx
    employee-profile-card.tsx
    get-employee-data.server.tsx
    team-photo.jpg
  _landing._index/
    index.tsx
    scroll-experience.tsx
  _landing/
    index.tsx
    header.tsx
    footer.tsx
  app._index/
    index.tsx
    stats.tsx
  app.projects/
    index.tsx
    project-card.tsx
    get-projects.server.tsx
    project-buttons.tsx
  app/
    index.tsx
    primary-nav.tsx
    footer.tsx
  app_.projects.$id.roadmap/
    index.tsx
    chart.tsx
    update-timeline.server.tsx
  contact-us.tsx
```

Note that `app/index.tsx` is _not_ the the "index route" for `app/`. It is the node module resolution "index module" for the folder `routes/app/`. The index route for `app/` is `app._index/index.tsx`. The only thing that contributes to the route path is the folder name.

```
# these are the same route:
routes/app.tsx
routes/app/index.tsx

# as are these
routes/app._index.tsx
routes/app._index/index.tsx
```

In other words `_index` has meaning for Remix index routes, `index` has node module resolution meaning and creates index modules.

## Scaling

Our general recommendation for scale is to make every route a folder and put the modules used exclusively by that route in the folder, then put the shared modules outside of routes folder elsewhere. This has a couple benefits:

- Easy to identify shared modules, so tread lightly when changing them
- Easy to organize and refactor the modules for a specific route without creating "file organization fatigue" and cluttering up other parts of the app

## More Flexibility

While we like this file convention, we recognize that at a certain scale many organizations won't like it. You can always define your routes programmatically in the [remix config][remix-config].

There's also the [Flat Routes][flat-routes] third-party package with configurable options beyond the defaults in Remix.

# `action`

`<docs-success>`Watch the `<a href="https://www.youtube.com/playlist?list=PLXoynULbYuEDG2wBFSZ66b85EIspy3fy6">`📼 Remix Singles`</a>`: `<a href="https://www.youtube.com/watch?v=Iv25HAHaFDs&list=PLXoynULbYuEDG2wBFSZ66b85EIspy3fy6">`Data Mutations with Form + action`</a>` and `<a href="https://www.youtube.com/watch?v=w2i-9cYxSdc&list=PLXoynULbYuEDG2wBFSZ66b85EIspy3fy6">`Multiple Forms and Single Button Mutations`</a></docs-success>`

Like `loader`, action is a server-only function to handle data mutations and other actions. If a non-GET request is made to your route (POST, PUT, PATCH, DELETE) then the action is called before the loaders.

Actions have the same API as loaders, the only difference is when they are called.

This enables you to co-locate everything about a data set in a single route module: the data read, the component that renders the data, and the data writes:

```tsx
import type { ActionArgs } from "@remix-run/node"; // or cloudflare/deno
import { json, redirect } from "@remix-run/node"; // or cloudflare/deno
import { Form } from "@remix-run/react";

import { TodoList } from "~/components/TodoList";
import { fakeCreateTodo, fakeGetTodos } from "~/utils/db";

export async function loader() {
  return json(await fakeGetTodos());
}

export async function action({ request }: ActionArgs) {
  const body = await request.formData();
  const todo = await fakeCreateTodo({
    title: body.get("title"),
  });
  return redirect(`/todos/${todo.id}`);
}

export default function Todos() {
  const data = useLoaderData<typeof loader>();
  return (
    <div>
      <TodoList todos={data} />
      <Form method="post">
        <input type="text" name="title" />
        <button type="submit">Create Todo</button>
      </Form>
    </div>
  );
}
```

When a POST is made to a URL, multiple routes in your route hierarchy will match the URL. Unlike a GET to loaders, where all of them are called to build the UI, _only one action is called_.

`<docs-info>`The route called will be the deepest matching route, unless the deepest matching route is an "index route". In this case, it will post to the parent route of the index (because they share the same URL, the parent wins).`</docs-info>`

If you want to post to an index route use `?index` in the action: `<Form action="/accounts?index" method="post" />`

| action url          | route action                 |
| ------------------- | ---------------------------- |
| `/accounts?index` | `routes/accounts/index.js` |
| `/accounts`       | `routes/accounts.js`       |

Also note that forms without an action prop (`<Form method="post">`) will automatically post to the same route within which they are rendered, so using the `?index` param to disambiguate between parent and index routes is only useful if you're posting to an index route from somewhere besides the index route itself. If you're posting from the index route to itself, or from the parent route to itself, you don't need to define a `<Form action>` at all, just omit it: `<Form method="post">`.

See also:

- 
- 
- [ query param][index query param]

# `CatchBoundary`

A `CatchBoundary` is a React component that renders whenever an action or loader throws a `Response`.

**Note:** We use the word "catch" to represent the codepath taken when a `Response` type is thrown; you thought about bailing from the "happy path". This is different from an uncaught error you did not expect to occur.

A Remix `CatchBoundary` component works just like a route component, but instead of `useLoaderData` you have access to `useCatch`. When a response is thrown in an action or loader, the `CatchBoundary` will be rendered in its place, nested inside parent routes.

A `CatchBoundary` component has access to the status code and thrown response data through `useCatch`.

```tsx
import { useCatch } from "@remix-run/react";

export function CatchBoundary() {
  const caught = useCatch();

  return (
    <div>
      <h1>Caught</h1>
      <p>Status: {caught.status}</p>
      <pre>
        <code>{JSON.stringify(caught.data, null, 2)}</code>
      </pre>
    </div>
  );
}
```

# Route Component

The default export of a route module defines the component that will render when the route matches.

```tsx
export default function MyRouteComponent() {
  return (
    <div>
      <h1>Look ma!</h1>
      <p>I'm still using React after like 8 years.</p>
    </div>
  );
}
```

# `ErrorBoundary`

An `ErrorBoundary` is a React component that renders whenever there is an error anywhere on the route, either during rendering or during data loading.

**Note:** We use the word "error" to mean an uncaught exception; something you didn't anticipate happening. This is different from other types of "errors" that you are able to recover from easily, for example a 404 error where you can still show something in the user interface to indicate you weren't able to find some data.

A Remix `ErrorBoundary` component works just like normal React [error boundaries][error-boundaries], but with a few extra capabilities. When there is an error in your route component, the `ErrorBoundary` will be rendered in its place, nested inside any parent routes. `ErrorBoundary` components also render when there is an error in the `loader` or `action` functions for a route, so all errors for that route may be handled in one spot.

An `ErrorBoundary` component receives one prop: the `error` that occurred.

```tsx
export function ErrorBoundary({ error }) {
  return (
    <div>
      <h1>Error</h1>
      <p>{error.message}</p>
      <p>The stack trace is:</p>
      <pre>{error.stack}</pre>
    </div>
  );
}
```

# `handle`

Exporting a handle allows you to create application conventions with the `useMatches()` hook. You can put whatever values you want on it:

```js
export const handle = {
  its: "all yours",
};
```

This is almost always used in conjunction with `useMatches`. To see what kinds of things you can do with it, refer to  for more information.

# `headers`

Each route can define its own HTTP headers. One of the common headers is the `Cache-Control` header that indicates to browser and CDN caches where and for how long a page is able to be cached.

```tsx
export function headers({
  actionHeaders,
  loaderHeaders,
  parentHeaders,
}: {
  actionHeaders: Headers;
  loaderHeaders: Headers;
  parentHeaders: Headers;
}) {
  return {
    "X-Stretchy-Pants": "its for fun",
    "Cache-Control": "max-age=300, s-maxage=3600",
  };
}
```

Usually your data is a better indicator of your cache duration than your route module (data tends to be more dynamic than markup), so the `action`'s & `loader`'s headers are passed in to `headers()` too:

```tsx
export function headers({
  loaderHeaders,
}: {
  loaderHeaders: Headers;
}) {
  return {
    "Cache-Control": loaderHeaders.get("Cache-Control"),
  };
}
```

Note: `actionHeaders` & `loaderHeaders` are an instance of the [Web Fetch API][headers] `Headers` class.

Because Remix has nested routes, there's a battle of the headers to be won when nested routes match. In this case, the deepest route wins. Consider these files in the routes directory:

```
├── users.tsx
└── users
    ├── $userId.tsx
    └── $userId
        └── profile.tsx
```

If we are looking at `/users/123/profile` then three routes are rendering:

```tsx
<Users>
  <UserId>
    <Profile />
  </UserId>
</Users>
```

If all three define `headers`, the deepest module wins, in this case `profile.tsx`.

We don't want surprise headers in your responses, so it's your job to merge them if you'd like. Remix passes in the `parentHeaders` to your `headers` function. So `users.tsx` headers get passed to `$userId.tsx`, and then `$userId.tsx` headers are passed to `profile.tsx` headers.

That is all to say that Remix has given you a very large gun with which to shoot your foot. You need to be careful not to send a `Cache-Control` from a child route module that is more aggressive than a parent route. Here's some code that picks the least aggressive caching in these cases:

```tsx
import parseCacheControl from "parse-cache-control";

export function headers({
  loaderHeaders,
  parentHeaders,
}: {
  loaderHeaders: Headers;
  parentHeaders: Headers;
}) {
  const loaderCache = parseCacheControl(
    loaderHeaders.get("Cache-Control")
  );
  const parentCache = parseCacheControl(
    parentHeaders.get("Cache-Control")
  );

  // take the most conservative between the parent and loader, otherwise
  // we'll be too aggressive for one of them.
  const maxAge = Math.min(
    loaderCache["max-age"],
    parentCache["max-age"]
  );

  return {
    "Cache-Control": `max-age=${maxAge}`,
  };
}
```

All that said, you can avoid this entire problem by _not defining headers in parent routes_ and only in leaf routes. Every layout that can be visited directly will likely have an "index route". If you only define headers on your leaf routes, not your parent routes, you will never have to worry about merging headers.

Note that you can also add headers in your `entry.server` file for things that should be global, for example:

```tsx
import { renderToString } from "react-dom/server";
import { RemixServer } from "@remix-run/react";
import type { EntryContext } from "@remix-run/node"; // or cloudflare/deno

export default function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext
) {
  const markup = renderToString(
    <RemixServer context={remixContext} url={request.url} />
  );

  responseHeaders.set("Content-Type", "text/html");
  responseHeaders.set("X-Powered-By", "Hugs");

  return new Response("<!DOCTYPE html>" + markup, {
    status: responseStatusCode,
    headers: responseHeaders,
  });
}
```

Just keep in mind that doing this will apply to _all_ document requests, but does not apply to `data` requests (for client-side transitions for example). For those, use .

# `links`

The links function defines which `<link>` elements to add to the page when the user visits a route.

```tsx
import type { LinksFunction } from "@remix-run/node"; // or cloudflare/deno

export const links: LinksFunction = () => {
  return [
    {
      rel: "icon",
      href: "/favicon.png",
      type: "image/png",
    },
    {
      rel: "stylesheet",
      href: "https://example.com/some/styles.css",
    },
    { page: "/users/123" },
    {
      rel: "preload",
      href: "/images/banner.jpg",
      as: "image",
    },
  ];
};
```

There are two types of link descriptors you can return:

#### `HtmlLinkDescriptor`

This is an object representation of a normal `<link {...props} />` element. [View the MDN docs for the link API][link tag].

The `links` export from a route should return an array of `HtmlLinkDescriptor` objects.

Examples:

```tsx
import type { LinksFunction } from "@remix-run/node"; // or cloudflare/deno

import stylesHref from "../styles/something.css";

export const links: LinksFunction = () => {
  return [
    // add a favicon
    {
      rel: "icon",
      href: "/favicon.png",
      type: "image/png",
    },

    // add an external stylesheet
    {
      rel: "stylesheet",
      href: "https://example.com/some/styles.css",
      crossOrigin: "true",
    },

    // add a local stylesheet, remix will fingerprint the file name for
    // production caching
    { rel: "stylesheet", href: stylesHref },

    // prefetch an image into the browser cache that the user is likely to see
    // as they interact with this page, perhaps they click a button to reveal in
    // a summary/details element
    {
      rel: "prefetch",
      as: "image",
      href: "/img/bunny.jpg",
    },

    // only prefetch it if they're on a bigger screen
    {
      rel: "prefetch",
      as: "image",
      href: "/img/bunny.jpg",
      media: "(min-width: 1000px)",
    },
  ];
};
```

#### `PageLinkDescriptor`

These descriptors allow you to prefetch the resources for a page the user is likely to navigate to. While this API is useful, you might get more mileage out of `<Link prefetch="render">` instead. But if you'd like, you can get the same behavior with this API.

```js
export function links() {
  return [{ page: "/posts/public" }];
}
```

This loads up the JavaScript modules, loader data, and the stylesheets (defined in the `links` exports of the next routes) into the browser cache before the user even navigates there.

`<docs-warning>`Be careful with this feature. You don't want to download 10MB of JavaScript and data for pages the user probably won't ever visit.`</docs-warning>`

# `loader`

`<docs-success>`Watch the `<a href="https://www.youtube.com/playlist?list=PLXoynULbYuEDG2wBFSZ66b85EIspy3fy6">`📼 Remix Single`</a>`: `<a href="https://www.youtube.com/watch?v=NXqEP_PsPNc&list=PLXoynULbYuEDG2wBFSZ66b85EIspy3fy6">`Loading data into components`</a></docs-success>`

Each route can define a "loader" function that provides data to the route when rendering.

```tsx
import { json } from "@remix-run/node"; // or cloudflare/deno

export const loader = async () => {
  return json({ ok: true });
};
```

This function is only ever run on the server. On the initial server render it will provide data to the HTML document, On navigations in the browser, Remix will call the function via  from the browser.

This means you can talk directly to your database, use server-only API secrets, etc. Any code that isn't used to render the UI will be removed from the browser bundle.

Using the database ORM Prisma as an example:

```tsx
import { useLoaderData } from "@remix-run/react";

import { prisma } from "../db";

export async function loader() {
  return json(await prisma.user.findMany());
}

export default function Users() {
  const data = useLoaderData<typeof loader>();
  return (
    <ul>
      {data.map((user) => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}
```

Because `prisma` is only used in the loader it will be removed from the browser bundle by the compiler, as illustrated by the highlighted lines.

## Type Safety

You can get type safety over the network for your loader and component with `LoaderArgs` and `useLoaderData<typeof loader>`.

```tsx
import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

export async function loader(args: LoaderArgs) {
  return json({ name: "Ryan", date: new Date() });
}

export default function SomeRoute() {
  const data = useLoaderData<typeof loader>();
}
```

- `data.name` will know that it's a string
- `data.date` will also know that it's a string even though we passed a date object to `json`. When data is fetched for client transitions, the values are serialized over the network with `JSON.stringify`, and the types are aware of that

## `params`

Route params are defined by route file names. If a segment begins with `$` like `$invoiceId`, the value from the URL for that segment will be passed to your loader.

```tsx
// if the user visits /invoices/123
export async function loader({ params }: LoaderArgs) {
  params.invoiceId; // "123"
}
```

Params are mostly useful for looking up records by ID:

```tsx
// if the user visits /invoices/123
export async function loader({ params }: LoaderArgs) {
  const invoice = await fakeDb.getInvoice(params.invoiceId);
  if (!invoice) throw new Response("", { status: 404 });
  return json(invoice);
}
```

## `request`

This is a [Fetch Request][request] instance. You can read the MDN docs to see all of its properties.

The most common use cases in loaders are reading headers (like cookies) and URL [URLSearchParams][urlsearchparams] from the request:

```tsx
export async function loader({ request }: LoaderArgs) {
  // read a cookie
  const cookie = request.headers.get("Cookie");

  // parse the search params for `?q=`
  const url = new URL(request.url);
  const query = url.searchParams.get("q");
}
```

## `context`

This is the context passed in to your server adapter's `getLoadContext()` function. It's a way to bridge the gap between the adapter's request/response API with your Remix app.

`<docs-info>`This API is an escape hatch, it’s uncommon to need it`</docs-info>`

Using the express adapter as an example:

```js
const {
  createRequestHandler,
} = require("@remix-run/express");

app.all(
  "*",
  createRequestHandler({
    getLoadContext(req, res) {
      // this becomes the loader context
      return { expressUser: req.user };
    },
  })
);
```

And then your loader can access it.

```tsx
export async function loader({ context }: LoaderArgs) {
  const { expressUser } = context;
  // ...
}
```

## Returning Response Instances

You need to return a [Fetch Response][response] from your loader.

```tsx
export async function loader() {
  const users = await db.users.findMany();
  const body = JSON.stringify(users);
  return new Response(body, {
    headers: {
      "Content-Type": "application/json",
    },
  });
}
```

Using the `json` helper simplifies this, so you don't have to construct them yourself, but these two examples are effectively the same!

```tsx
import { json } from "@remix-run/node"; // or cloudflare/deno

export const loader = async () => {
  const users = await fakeDb.users.findMany();
  return json(users);
};
```

You can see how `json` just does a little of the work to make your loader a lot cleaner. You can also use the `json` helper to add headers or a status code to your response:

```tsx
import { json } from "@remix-run/node"; // or cloudflare/deno

export const loader = async ({ params }: LoaderArgs) => {
  const user = await fakeDb.project.findOne({
    where: { id: params.id },
  });

  if (!user) {
    return json("Project not found", { status: 404 });
  }

  return json(user);
};
```

See also:

- 
- [MDN Response Docs][response]

## Throwing Responses in Loaders

Along with returning responses, you can also throw `Response` objects from your loaders. This allows you to break through the call stack and do one of two things:

- Redirect to another URL
- Show an alternate UI with contextual data through the `CatchBoundary`

Here is a full example showing how you can create utility functions that throw responses to stop code execution in the loader and show an alternative UI.

```ts
import { json } from "@remix-run/node"; // or cloudflare/deno
import type { ThrownResponse } from "@remix-run/react";

export type InvoiceNotFoundResponse = ThrownResponse<
  404,
  string
>;

export function getInvoice(id, user) {
  const invoice = db.invoice.find({ where: { id } });
  if (invoice === null) {
    throw json("Not Found", { status: 404 });
  }
  return invoice;
}
```

```ts
import { redirect } from "@remix-run/node"; // or cloudflare/deno

import { getSession } from "./session";

export async function requireUserSession(request) {
  const session = await getSession(
    request.headers.get("cookie")
  );
  if (!session) {
    // You can throw our helpers like `redirect` and `json` because they
    // return `Response` objects. A `redirect` response will redirect to
    // another URL, while other  responses will trigger the UI rendered
    // in the `CatchBoundary`.
    throw redirect("/login", 302);
  }
  return session.get("user");
}
```

```tsx
import type { LoaderArgs } from "@remix-run/node"; // or cloudflare/deno
import { json } from "@remix-run/node"; // or cloudflare/deno
import type { ThrownResponse } from "@remix-run/react";
import { useCatch, useLoaderData } from "@remix-run/react";

import { requireUserSession } from "~/http";
import { getInvoice } from "~/db";
import type { InvoiceNotFoundResponse } from "~/db";

type InvoiceCatchData = {
  invoiceOwnerEmail: string;
};

type ThrownResponses =
  | InvoiceNotFoundResponse
  | ThrownResponse<401, InvoiceCatchData>;

export const loader = async ({
  params,
  request,
}: LoaderArgs) => {
  const user = await requireUserSession(request);
  const invoice = getInvoice(params.invoiceId);

  if (!invoice.userIds.includes(user.id)) {
    throw json(
      { invoiceOwnerEmail: invoice.owner.email },
      { status: 401 }
    );
  }

  return json(invoice);
};

export default function InvoiceRoute() {
  const invoice = useLoaderData<Invoice>();
  return <InvoiceView invoice={invoice} />;
}

export function CatchBoundary() {
  // this returns { data, status, statusText }
  const caught = useCatch<ThrownResponses>();

  switch (caught.status) {
    case 401:
      return (
        <div>
          <p>You don't have access to this invoice.</p>
          <p>
            Contact {caught.data.invoiceOwnerEmail} to get
            access
          </p>
        </div>
      );
    case 404:
      return <div>Invoice not found!</div>;
  }

  // You could also `throw new Error("Unknown status in catch boundary")`.
  // This will be caught by the closest `ErrorBoundary`.
  return (
    <div>
      Something went wrong: {caught.status}{" "}
      {caught.statusText}
    </div>
  );
}
```

# `meta`

The meta export defines object representations of `<meta>` tags for a route. These tags are important for SEO, browser behavior, and more.

The meta export will set meta tags for your html document. We highly recommend setting the title and description on every route besides layout routes (their index route will set the meta).

```tsx
import type { MetaFunction } from "@remix-run/node"; // or cloudflare/deno

export const meta: MetaFunction = () => {
  return {
    title: "Something cool",
    description:
      "This becomes the nice preview on search results.",
  };
};
```

`<docs-warning>`The `meta` function _may_ run on the server (e.g. the initial page load) or the client (e.g. a client navigation), so you cannot access server-specific data like `process.env.NODE_ENV` directly. If you need server-side data in `meta`, get the data in the `loader` and access it via the `meta` function's `data` parameter.`</docs-warning>`

There are a few special cases (read about those below). In the case of nested routes, the meta tags are merged automatically, so parent routes can add meta tags without the child routes needing to copy them.

## `HtmlMetaDescriptor`

This is an object representation and abstraction of a `<meta {...props}>` element and its attributes. [View the MDN docs for the meta API][mdn-meta].

The `meta` export from a route should return a single `HtmlMetaDescriptor` object.

Almost every `meta` element takes a `name` and `content` attribute, with the exception of [OpenGraph tags][open-graph-tags] which use `property` instead of `name`. In either case, the attributes represent a key/value pair for each tag. Each pair in the `HtmlMetaDescriptor` object represents a separate `meta` element, and Remix maps each to the correct attributes for that tag.

The `meta` object can also hold a `title` reference which maps to the [HTML ][html-title-element].

As a convenience, `charset: "utf-8"` will render a `<meta charset="utf-8">`.

As a last option, you can also pass an object of attribute/value pairs as the value. This can be used as an escape-hatch for meta tags like the [ tag][http-equiv-tag] which uses `http-equiv` instead of `name`.

Examples:

```tsx
import type { MetaFunction } from "@remix-run/node"; // or cloudflare/deno

export const meta: MetaFunction = () => ({
  // Special cases
  charset: "utf-8", // <meta charset="utf-8">
  "og:image": "https://josiesshakeshack.com/logo.jpg", // <meta property="og:image" content="https://josiesshakeshack.com/logo.jpg">
  title: "Josie's Shake Shack", // <title>Josie's Shake Shack</title>

  // name => content
  description: "Delicious shakes", // <meta name="description" content="Delicious shakes">
  viewport: "width=device-width,initial-scale=1", // <meta name="viewport" content="width=device-width,initial-scale=1">

  // <meta {...value}>
  refresh: {
    httpEquiv: "refresh",
    content: "3;url=https://www.mozilla.org",
  }, // <meta http-equiv="refresh" content="3;url=https://www.mozilla.org">
});
```

## Page context in `meta` function

`meta` function is passed an object that has following data:

- `data` is whatever exported by `loader` function
- `location` is a `window.location`-like object that has some data about the current route
- `params` is an object containing route params
- `parentsData` is a hashmap of all the data exported by `loader` functions of current route and all of its parents

```tsx
export const meta: MetaFunction<typeof loader> = ({
  data,
  params,
}) => {
  if (!data) {
    return {
      title: "Missing Shake",
      description: `There is no shake with the ID of ${params.shakeId}. 😢`,
    };
  }

  const { shake } = data;
  return {
    title: `${shake.name} milkshake`,
    description: shake.summary,
  };
};
```

To infer types for `parentsData`, provide a mapping from the route's file path (relative to `app/`) to that route loader type:

```tsx
export const loader = async () => {
  return json({ salesCount: 1074 });
};
```

```tsx
import type { loader as salesLoader } from "../../sales";

export const loader = async () => {
  return json({ name: "Customer name" });
};

const meta: MetaFunction<
  typeof loader,
  { "routes/sales": typeof salesLoader }
> = ({ data, parentsData }) => {
  const { name } = data;
  //      ^? string
  const { salesCount } = parentsData["routes/sales"];
  //      ^? number
};
```

---

# `meta@v2`

`<docs-info>`Meta is changing in v2, you can opt in to the new API today, [see the meta v2 section][meta-v2], but you don't have to until you're ready.`</docs-info>`

You can enable the new meta API with a future flag in `remix.config.js`.

```js
module.exports = {
  future: {
    v2_meta: true,
  },
};
```

The meta export allows you to add `<meta>` tags for every route in your app, including nested routes. These tags are important for SEO, browser behavior, and more.

```tsx
import type { V2_MetaFunction } from "@remix-run/node"; // or cloudflare/deno

export const meta: V2_MetaFunction = () => {
  return [
    {
      title: "New Remix App",
    },
    {
      name: "description",
      content: "This app is a wildly dynamic web app",
    },
  ];
};
```

Meta functions return an array of `V2_HtmlMetaDescriptor` objects. These objects map one-to-one with normal HTML meta tags:

```tsx
const description = {
  name: "description",
  content: "This is my website description",
};
// becomes
<meta
  name="description"
  content="This is my website description"
/>;

const ogTitle = {
  property: "og:title",
  content: "My Website Title",
};
// becomes
<meta property="og:title" content="My Website Title" />;
```

The one exception is the `title` tag since it's not a `<meta>` tag but acts as one.

```tsx
const title = {
  title: "My highly dynamic web *APP* with deep sessions",
};
// becomes
<title>
  My highly dynamic web *APP* with deep sessions
</title>;
```

## `matches`

This is a list of the current route matches. You have access to many things, particularly the meta from the parent matches and data.

It's most useful for merging the parent meta into the child meta since the child meta value is what will be used:

```tsx
export const meta: V2_MetaFunction = ({ matches }) => {
  let parentMeta = matches.map((match) => match.meta ?? []);
  return [...parentMeta, { title: "Projects" }];
};
```

## `data`

This is the data from your loader.

```tsx
export async function loader({ params }: LoaderArgs) {
  return json({
    task: await getTask(params.projectId, params.taskId),
  });
}

export const meta: V2_MetaFunction<typeof loader> = ({
  data,
}) => {
  return [{ title: data.task.name }];
};
```

## `parentsData`

Often you'll need the data from a parent route, you can look it up by route ID on `parentsData`.

```tsx
import type { loader as projectDetailsLoader } from "../../../$pid";

export async function loader({ params }: LoaderArgs) {
  return json({ task: await getTask(params.tid) });
}

export const meta: V2_MetaFunction<
  typeof loader,
  { "routes/project/$pid": typeof projectDetailsLoader }
> = ({ data, parentsData }) => {
  let project = parentsData["routes/project/$pid"].project;
  let task = data.task;
  return [{ title: `${project.name}: ${task.name}` }];
};
```

## `params`

The route URL params. See [Dynamic Segments in the Routing Guide][url-params].

## Gotchas with `meta` and Nested Routes

Because multiple nested routes render at the same time, there is some merging that needs to happen to determine the meta tags that ultimately render. Remix gives you complete control over this merge because there is no obvious default.

Remix will take the last matching route with a meta export and use that. This allows you to override things like `title`, remove things like `og:image` that the parent route added, or keep everything from the parent and add new meta for the child route.

This can get quite tricky when you're new.

Consider a route like `/projects/123`, there are likely three matching routes: `root.tsx`, `projects.tsx`, and `projects/$id.tsx`. All three may export meta descriptors.

```tsx
export const meta: V2_MetaFunction = () => {
  return [
    {
      name: "viewport",
      content: "width=device-width,initial-scale=1",
    },
    { title: "New Remix App" },
  ];
};
```

```tsx
export const meta: V2_MetaFunction = () => {
  return [{ title: "Projects" }];
};
```

```tsx
export const meta: V2_MetaFunction<typeof loader> = ({
  data,
}) => {
  return [{ title: data.project.name }];
};
```

With this code, we will lose the `viewport` meta tag at `/projects` and `/projects/123` because only the last meta is used and the code doesn't merge with the parent.

### Global Meta

Nearly every app will have global meta like the `viewport` and `charSet`. We recommend using normal `<meta>` tags inside of the [root route][root-route] instead of the `meta` export so you simply don't have to deal with merging:

```tsx
import {
  Meta,
  Links,
  Scripts,
  Outlet,
} from "@remix-run/react";

export default function Root() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1"
        />
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />
        <Scripts />
      </body>
    </html>
  );
}
```

### Avoid Meta in Parent Routes

You can also avoid the merge problem by simply not exporting meta that you want to override from parent routes. Instead of defining meta on the parent route, use the [index route][index-route]. This way you can avoid complex merge logic for things like the title. Otherwise you will need to find the parent title descriptor and replace it with the child's title. It's much easier to simply not need to override by using index routes.

### Merging with Parent Meta

Usually you only need to add meta to what the parent has already defined. You can merge parent meta with the spread operator and the  arg:

```tsx
export const meta: V2_MetaFunction = ({ matches }) => {
  let parentMeta = matches.map((match) => match.meta ?? []);
  return [...parentMeta, { title: "Projects" }];
};
```

Note that this _will not_ override something like `title`. This is only additive.

### Meta Merging helper

If you can't avoid the merge problem with global meta or index routes, we've created a helper that you can put in your app that can override and append to parent meta easily.

- [View Gist for ][merge-meta]

# `shouldRevalidate`

This function lets apps optimize which routes data should be reloaded after actions and for client-side navigations.

```ts
import type { ShouldRevalidateFunction } from "@remix-run/react";

export const shouldRevalidate: ShouldRevalidateFunction = ({
  actionResult,
  currentParams,
  currentUrl,
  defaultShouldRevalidate,
  formAction,
  formData,
  formEncType,
  formMethod,
  nextParams,
  nextUrl,
}) => {
  return true;
};
```

`<docs-warning>`This feature is an `<i>`additional`</i>` optimization. In general, Remix's design already optimizes which loaders need to be called and when. When you use this feature you risk your UI getting out of sync with your server. Use with caution!`</docs-warning>`

During client-side transitions, Remix will optimize reloading of routes that are already rendering, like not reloading layout routes that aren't changing. In other cases, like form submissions or search param changes, Remix doesn't know which routes need to be reloaded, so it reloads them all to be safe. This ensures your UI always stays in sync with the state on your server.

This function lets apps further optimize by returning `false` when Remix is about to reload a route. If you define this function on a route module, Remix will defer to your function on every navigation and every revalidation after an action is called. Again, this makes it possible for your UI to get out of sync with your server if you do it wrong, so be careful.

## `actionResult`

When a submission causes the revalidation this will be the result of the action—either action data or an error if the action failed. It's common to include some information in the action result to instruct `shouldRevalidate` to revalidate or not.

```tsx
export async function action() {
  await saveSomeStuff();
  return { ok: true };
}

export function shouldRevalidate({
  actionResult,
  defaultShouldRevalidate,
}) {
  if (actionResult?.ok) {
    return false;
  }
  return defaultShouldRevalidate;
}
```

## `defaultShouldRevalidate`

By default, Remix doesn't call every loader all of the time. There are reliable optimizations it can make by default. For example, only loaders with changing params are called. Consider navigating from the following URL to the one below it:

- `/projects/123/tasks/abc`
- `/projects/123/tasks/def`

Remix will only call the loader for `tasks/def` because the param for `projects/123` didn't change.

It's safest to always return `defaultShouldRevalidate` after you've done your specific optimizations that return `false`, otherwise your UI might get out of sync with your data on the server.

```tsx
export function shouldRevalidate({
  defaultShouldRevalidate,
}) {
  if (whateverConditionsYouCareAbout) {
    return false;
  }

  return defaultShouldRevalidate;
}
```

This is more dangerous, but YOLO:

```tsx
export function shouldRevalidate() {
  return whateverConditionsYouCareAbout;
}
```

## `currentParams`

These are the [URL params][url-params] from the URL that can be compared to the `nextParams` to decide if you need to reload or not. Perhaps you're using only a partial piece of the param for data loading, you don't need to revalidate if a superfluous part of the param changed.

For instance, consider an event slug with the id and an human-friendly title:

- `/events/blink-182-united-center-saint-paul--ae3f9`
- `/events/blink-182-little-caesars-arena-detroit--e87ad`

```jsx
export async function loader({ params }) {
  let id = params.slug.split("--")[1];
  return loadEvent(id);
}

export async function shouldRevalidate({
  currentParams,
  nextParams,
  defaultShouldRevalidate,
}) {
  let currentId = currentParams.slug.split("--")[1];
  let nextID = nextParams.slug.split("--")[1];
  if (currentId !== nextID) {
    return true;
  }

  return defaultShouldRevalidate;
}
```

## `currentUrl`

This is the url the navigation started from.

## `nextParams`

In the case of navigation, these are the [URL params][url-params] from the next location the user is requesting. Some revalidations are not navigation, so it will simply be the same as `currentParams`.

## `nextUrl`

In the case of navigation, this the URL the user is requesting. Some revalidations are not navigation, so it will simply be the same as `currentUrl`.

## `formMethod`

The method (probably `"GET"` or `"POST"`) used from the form submission that triggered the revalidation.

## `formAction`

The form action (`<Form action="/somewhere">`) that triggered the revalidation.

## `formData`

The data submitted with the form that triggered the revalidation.

## Use Cases

### Never reloading the root

It's common for root loaders to return data that never changes, like environment variables to be sent to the client app. In these cases you never need the root loader to be called again. For this case, you can simply `return false`.

```tsx
export const loader = async () => {
  return json({
    ENV: {
      CLOUDINARY_ACCT: process.env.CLOUDINARY_ACCT,
      STRIPE_PUBLIC_KEY: process.env.STRIPE_PUBLIC_KEY,
    },
  });
};

export const shouldRevalidate = () => false;
```

With this in place, Remix will no longer make a request to your root loader for any reason, not after form submissions, not after search param changes, etc.

### Ignoring search params

Another common case is when you've got nested routes and a child component has a feature that uses the search params in the URL, like a search page or some tabs with state you want to keep in the search params.

Consider these routes:

```
└── $projectId.tsx
    └── activity.tsx
```

And let's say the UI looks something like this:

```
+------------------------------+
|    Project: Design Revamp    |
+------------------------------+
|  Tasks | Collabs | >ACTIVITY |
+------------------------------+
|  Search: _____________       |
|                              |
|  - Ryan added an image       |
|                              |
|  - Michael commented         |
|                              |
+------------------------------+
```

The `activity.tsx` loader can use the search params to filter the list, so visiting a URL like `/projects/design-revamp/activity?search=image` could filter the list of results. Maybe it looks something like this:

```tsx
export async function loader({
  params,
  request,
}: LoaderArgs) {
  const url = new URL(request.url);
  return json(
    await exampleDb.activity.findAll({
      where: {
        projectId: params.projectId,
        name: {
          contains: url.searchParams.get("search"),
        },
      },
    })
  );
}
```

This is great for the activity route, but Remix doesn't know if the parent loader, `$projectId.tsx` _also_ cares about the search params. That's why Remix does the safest thing and reloads all the routes on the page when the search params change.

In this UI, that's wasted bandwidth for the user, your server, and your database because `$projectId.tsx` doesn't use the search params. Consider that our loader for `$projectId.tsx` looks something like this:

```tsx
export async function loader({ params }: LoaderArgs) {
  let data = await fakedb.findProject(params.projectId);
  return json(data);
}
```

There are a lot of ways to do this, and the rest of the code in the app matters, but ideally you don't think about the UI you're trying to optimize (the search params changing) but instead look at the values your loader cares about. In our case, it only cares about the projectId, so we can check two things:

- did the params stay the same?
- was it a GET and not a mutation?

If the params didn't change, and we didn't do a POST, then we know our loader will return the same data it did last time, so we can opt-out of the revalidation when the child route changes the search params.

```tsx
export function shouldRevalidate({
  currentParams,
  nextParams,
  formMethod,
  defaultShouldRevalidate,
}) {
  if (
    formMethod === "GET" &&
    currentParams.projectId === nextParams.projectId
  ) {
    return false;
  }

  return defaultShouldRevalidate;
}
```

# `<Await>`

The `<Await>` component is responsible for resolving promises accessed from . This can be thought of as a thin wrapper around React Error Boundaries with support for handling SSR that will suspend to resolve the data of a deferred loader value.

`<Await>` can be used to resolve the deferred value in one of two ways:

Directly as a render function:

```tsx
<Suspense>
  <Await resolve={deferredValue}>
    {(data) => <p>{data}</p>}
  </Await>
</Suspense>
```

Or indirectly via the `useAsyncValue` hook:

```tsx
function Accessor() {
  const value = useAsyncValue();
  return <p>{value}</p>;
}
// ...
<Suspense>
  <Await resolve={deferredValue}>
    <Accessor />
  </Await>
</Suspense>;
```

`<Await>` is paired with  in your loader. Returning a deferred value from your loader will put Remix in streaming mode and allow you to render fallbacks with `<Suspense>`. A full example can be found in the [streaming guide][streaming-guide].

# `<Form>`

`<docs-info>`This component is simply a re-export of [React Router's ][rr-form].`</docs-info>`

`<docs-success>`Watch the `<a href="https://www.youtube.com/playlist?list=PLXoynULbYuEDG2wBFSZ66b85EIspy3fy6">`📼 Remix Singles`</a>`: `<a href="https://www.youtube.com/watch?v=Iv25HAHaFDs&list=PLXoynULbYuEDG2wBFSZ66b85EIspy3fy6">`Data Mutations with Form + action`</a>`, `<a href="https://www.youtube.com/watch?v=w2i-9cYxSdc&list=PLXoynULbYuEDG2wBFSZ66b85EIspy3fy6">`Multiple Forms and Single Button Mutations`</a>` and `<a href="https://www.youtube.com/watch?v=bMLej7bg5Zo&list=PLXoynULbYuEDG2wBFSZ66b85EIspy3fy6">`Clearing Inputs After Form Submissions`</a></docs-success>`

The `<Form>` component is a declarative way to perform data mutations: creating, updating, and deleting data. While it might be a mind-shift to think about these tasks as "navigation", it's how the web has handled mutations since before JavaScript was created!

```tsx
import { Form } from "@remix-run/react";

function NewEvent() {
  return (
    <Form method="post" action="/events">
      <input type="text" name="title" />
      <input type="text" name="description" />
    </Form>
  );
}
```

- Whether JavaScript is on the page or not, your data interactions created with `<Form>` and `action` will work.
- After a `<Form>` submission, all of the loaders on the page will be reloaded. This ensures that any updates to your data are reflected in the UI.
- `<Form>` automatically serializes your form's values (identically to the browser when not using JavaScript).
- You can build "optimistic UI" and pending indicators with .

## `action`

Most of the time you can omit this prop. Forms without an action prop (`<Form method="post">`) will automatically post to the same route within which they are rendered. This makes collocating your component, your data reads, and your data writes a snap.

If you need to post to a different route, then add an action prop:

```tsx
<Form action="/projects/new" method="post" />
```

When a POST is made to a URL, multiple routes in your route hierarchy will match the URL. Unlike a GET to loaders, where all of them are called to build the UI, _only one action is called_. The route called will be the deepest matching route, unless the deepest matching route is an "index route". In this case, it will post to the parent route of the index route (because they share the same URL).

If you want to post to an index route use `?index` in the action: `<Form action="/accounts?index" method="post" />`

| action url          | route action                 |
| ------------------- | ---------------------------- |
| `/accounts?index` | `routes/accounts/index.js` |
| `/accounts`       | `routes/accounts.js`       |

See also:

- [ query param][index query param]

## `method`

This determines the [HTTP verb][http-verb] to be used: get, post, put, patch, delete. The default is "get".

```tsx
<Form method="post" />
```

Native `<form>` only supports get and post, so if you want your form to work with JavaScript on or off the page you'll need to stick with those two.

Without JavaScript, Remix will turn non-get requests into "post", but you'll still need to instruct your server with a hidden input like `<input type="hidden" name="_method" value="delete" />`. If you always include JavaScript, you don't need to worry about this.

`<docs-info>`We generally recommend sticking with "get" and "post" because the other verbs are not supported by HTML`</docs-info>`

## `encType`

Defaults to `application/x-www-form-urlencoded`, use `multipart/form-data` for file uploads.

## `replace`

```tsx
<Form replace />
```

Instructs the form to replace the current entry in the history stack, instead of pushing the new entry. If you expect a form to be submitted multiple times you may not want the user to have to click "back" for every submission to get to the previous page.

`<docs-warning>`This has no effect without JavaScript on the page.`</docs-warning>`

## `reloadDocument`

If true, it will submit the form with the browser instead of JavaScript, even if JavaScript is on the page.

```tsx
<Form reloadDocument />
```

`<docs-info>`This is recommended over `<code>`\<form>`</code></docs-info>`

When the `action` prop is omitted, `<Form>` and `<form>` will sometimes call different actions depending on what the current URL is.

- `<form>` uses the current URL as the default which can lead to surprising results: forms inside parent routes will post to the child action if you're at the child's URL and the parents action when you're at the parent's URL. This means as the user navigates, the form's behavior changes.
- `<Form>` will always post to the route's action, independent of the URL. A form in a parent route will always post to the parent, even if you're at the child's URL.

`<docs-info>`For more information and usage, please refer to the [React Router ][rr-form].`</docs-info>`

See also:

- 
- 
- 

# `<Link>`

This component renders an anchor tag and is the primary way the user will navigate around your website. Anywhere you would have used `<a href="...">` you should now use `<Link to="..."/>` to get all the performance benefits of client-side routing in Remix.

```tsx
import { Link } from "@remix-run/react";

export default function GlobalNav() {
  return (
    <nav>
      <Link to="/dashboard">Dashboard</Link>{" "}
      <Link to="/account">Account</Link>{" "}
      <Link to="/support">Support</Link>
    </nav>
  );
}
```

## `prefetch`

In the effort to remove all loading states from your UI, `Link` can automatically prefetch all the resources the next page needs: JavaScript modules, stylesheets, and data. This prop controls if and when that happens.

```tsx
<>
  <Link /> {/* defaults to "none" */}
  <Link prefetch="none" />
  <Link prefetch="intent" />
  <Link prefetch="render" />
</>
```

- **"none"** - Default behavior. This will prevent any prefetching from happening. This is recommended when linking to pages that require a user session that the browser won't be able to prefetch anyway.
- **"intent"** - Recommended if you want to prefetch. Fetches when Remix thinks the user intends to visit the link. Right now the behavior is simple: if they hover or focus the link it will prefetch the resources. In the future we hope to make this even smarter. Links with large click areas/padding get a bit of a head start. It is worth noting that when using `prefetch="intent"`, `<link rel="prefetch">` elements will be inserted on hover/focus and removed if the `<Link>` loses hover/focus. Without proper `cache-control` headers on your loaders, this could result in repeated prefetch loads if a user continually hovers on and off a link.
- **"render"** - Fetches when the link is rendered.

`<docs-error>`You may need to use the `<code>`:last-of-type`</code>` selector instead of `<code>`:last-child`</code>` when styling child elements inside of your links`</docs-error>`

Remix uses the browser's cache for prefetching with HTML `<link rel="prefetch"/>` tags, which provides a lot of subtle benefits (like respecting HTTP cache headers, doing the work in browser idle time, using a different thread than your app, etc.) but the implementation might mess with your CSS since the link tags are rendered inside of your anchor tag. This means `a *:last-child {}` style selectors won't work. You'll need to change them to `a *:last-of-type {}` and you should be good. We will eventually get rid of this limitation.

## React Router `<Link/>`

This component is a wrapper around [React Router ][rr-link]. It has the same API except for Remix's `prefetch` addition. For more information and advanced usage, refer to the [React Router docs][rr-link].

# `<Links />`

The `<Links/>` component renders all of the `<link>` tags created by your route module  export. You should render it inside the `<head>` of your HTML, usually in `app/root.tsx`.

```tsx
import { Links } from "@remix-run/react";

export default function Root() {
  return (
    <html>
      <head>
        <Links />
      </head>
      <body></body>
    </html>
  );
}
```

# `<LiveReload />`

This component connects your app to the Remix asset server and automatically reloads the page when files change in development. In production it renders `null`, so you can safely render it always in your root route.

```tsx
import { LiveReload } from "@remix-run/react";

export default function Root() {
  return (
    <html>
      <head />
      <body>
        <LiveReload />
      </body>
    </html>
  );
}
```

# `<Meta />`

This component renders all of the `<meta>` tags created by your route module  export. You should render it inside the `<head>` of your HTML, usually in `app/root.tsx`.

```tsx
import { Meta } from "@remix-run/react";

export default function Root() {
  return (
    <html>
      <head>
        <Meta />
      </head>
      <body></body>
    </html>
  );
}
```

# `<NavLink>`

A `<NavLink>` is a special kind of `<Link>` that knows whether or not it is "active". This is useful when building a navigation menu, such as a breadcrumb or a set of tabs where you'd like to show which of them is currently selected. It also provides useful context for assistive technology like screen readers.

By default, an `active` class is added to a `<NavLink>` component when it is active. You can pass a function as children to customize the content of the `<NavLink>` component based on their active state, specially useful to change styles on internal elements.

```tsx
import { NavLink } from "@remix-run/react";

function NavList() {
  // This styling will be applied to a <NavLink> when the
  // route that it links to is currently selected.
  const activeStyle = {
    textDecoration: "underline",
  };
  const activeClassName = "underline";
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

If the `end` prop is used, it will ensure this component isn't matched as "active" when its descendant paths are matched. For example, to render a link that is only active at the website root and not any other URLs, you can use:

```tsx
<NavLink to="/" end>
  Home
</NavLink>
```

# `<PrefetchPageLinks />`

This component enables prefetching of all assets for a page to enable an instant navigation to that page. It does this by rendering `<link rel="prefetch">` and `<link rel="modulepreload"/>` tags for all the assets (data, modules, css) of a given page.

`<Link rel="prefetch">` uses this internally, but you can render it to prefetch a page for any other reason.

```tsx
<PrefetchPageLinks page="/absolute/path/to/your-path" />
```

**Note:** You need to use an absolute path.

# `<Scripts />`

This component renders the client runtime of your app. You should render it inside the `<body>` of your HTML, usually in `app/root.tsx`.

```tsx
import { Scripts } from "@remix-run/react";

export default function Root() {
  return (
    <html>
      <head />
      <body>
        <Scripts />
      </body>
    </html>
  );
}
```

If you don't render the `<Scripts/>` component, your app will still work like a traditional web app without JavaScript, relying solely on HTML and browser behaviors. That's cool, but we personally have bigger goals than spinning favicons, so we recommend adding JavaScript to your app 😎

# `<ScrollRestoration>`

This component will emulate the browser's scroll restoration on location changes after loaders have completed. This ensures the scroll position is restored to the right spot, at the right time, even across domains.

You should only render one of these, right before the `<Scripts/>` component.

```tsx
import {
  ScrollRestoration,
  Scripts,
} from "@remix-run/react";

export default function Root() {
  return (
    <html>
      <body>
        {/* ... */}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
```

## React Router `<ScrollRestoration/>`

This is a wrapper around [React Router ][rr-scrollrestoration]. Because Remix server renders your app's HTML, it can restore scroll positions before JavaScript even loads, avoiding the janky "scroll jump" typically found in SPAs. Other than that, it is identical to the React Router version.

For advanced usage, see the [React Router ScrollRestoration docs][rr-scrollrestoration].

# `useActionData`

`<docs-info>`This hook is simply a re-export of [React Router's ][rr-useactiondata].`</docs-info>`

This hook returns the JSON parsed data from your route action. It returns `undefined` if there hasn't been a submission at the current location yet.

```tsx
import type { ActionArgs } from "@remix-run/node"; // or cloudflare/deno
import { json } from "@remix-run/node"; // or cloudflare/deno
import { Form, useActionData } from "@remix-run/react";

export async function action({ request }: ActionArgs) {
  const body = await request.formData();
  const name = body.get("visitorsName");
  return json({ message: `Hello, ${name}` });
}

export default function Invoices() {
  const data = useActionData<typeof action>();
  return (
    <Form method="post">
      <p>
        <label>
          What is your name?
          <input type="text" name="visitorsName" />
        </label>
      </p>
      <p>{data ? data.message : "Waiting..."}</p>
    </Form>
  );
}
```

The most common use-case for this hook is form validation errors. If the form isn't right, you can simply return the errors and let the user try again (instead of pushing all the errors into sessions and back out of the loader).

```tsx
import type { ActionArgs } from "@remix-run/node"; // or cloudflare/deno
import { json, redirect } from "@remix-run/node"; // or cloudflare/deno
import { Form, useActionData } from "@remix-run/react";

export async function action({ request }: ActionArgs) {
  const form = await request.formData();
  const email = form.get("email");
  const password = form.get("password");
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
    return json(errors, { status: 422 });
  }

  // otherwise create the user and redirect
  await createUser(form);
  return redirect("/dashboard");
}

export default function Signup() {
  const errors = useActionData<typeof action>();

  return (
    <>
      <h1>Signup</h1>
      <Form method="post">
        <p>
          <input type="text" name="email" />
          {errors?.email ? (
            <span>{errors.email}</span>
          ) : null}
        </p>
        <p>
          <input type="text" name="password" />
          {errors?.password ? (
            <span>{errors.password}</span>
          ) : null}
        </p>
        <p>
          <button type="submit">Sign up</button>
        </p>
      </Form>
    </>
  );
}
```

#### Notes about resubmissions

When using `<Form>` (instead of `<form>` or `<Form reloadDocument>`), Remix _does not_ follow the browser's behavior of resubmitting forms when the user clicks back, forward, or refreshes into the location.

`<docs-info>`Remix client-side navigation does not resubmit forms on pop events like browsers.`</docs-info>`

Form submissions are navigation events in browsers (and Remix), which means users can click the back button into a location that had a form submission _and the browser will resubmit the form_. You usually don't want this to happen.

For example, consider this user flow:

1. The user lands at `/buy`
2. They submit a form to `/checkout`
3. They click a link to `/order/123`

The history stack looks like this, where "\*" is the current entry:

```
GET /buy > POST /checkout > *GET /order/123
```

Now consider the user clicks the back button 😨

```
GET /buy - *POST /checkout < GET /order/123
```

The browser will repost the same information and likely charge their credit card again. You usually don't want this.

The decades-old best practice is to redirect in the POST request. This way the location disappears from the browser's history stack and the user can't "back into it" anymore.

```
GET /buy > POST /checkout, Redirect > GET /order/123
```

This results in a history stack that looks like this:

```
GET /buy - *GET /order/123
```

Now the user can click back without resubmitting the form.

**When you should worry about this**

Usually your actions will either return validation issues or redirect, and then your data and your user's are safe no matter how the form is submitted. But to go into further detail, if you're using:

- `<form>`
- `<Form reloadDocument>`
- You're not rendering `<Scripts/>`
- The user has JavaScript disabled

The browser will resubmit the form in these situations unless you redirect from the action. If these are cases you want to support, we recommend you follow the age-old best practice of redirecting from actions.

If you're using `<Form>` and don't care to support the cases above, you don't need to redirect from your actions. However, if you don't redirect from an action, make sure reposting the same information isn't dangerous to your data or your visitors because you can't control if they have JavaScript enabled or not.

`<docs-info>`In general, if the form validation fails, return data from the action and render it in the component. But, once you actually change data (in your database, or otherwise), you should redirect.`</docs-info>`

`<docs-info>`For more information and usage, please refer to the [React Router ][rr-useactiondata].`</docs-info>`

See also:

- 
- 

# `useBeforeUnload`

`<docs-info>`This hook is simply a re-export of [React Router's ][rr-usebeforeunload].`</docs-info>`

This hook is just a helper around `window.onbeforeunload`.

When users click links to pages they haven't visited yet, Remix loads the code-split modules for that page. If you deploy in the middle of a user's session, and you or your host removes the old files from the server (many do 😭), then Remix's requests for those modules will fail. Remix recovers by automatically reloading the browser at the new URL. This should start over from the server with the latest version of your application. Most of the time this works out great, and user doesn't even know anything happened.

In this situation, you may need to save important application state on the page (to something like the browser's local storage), because the automatic page reload will lose any state you had.

Remix or not, this is a good practice. The user can change the url, accidentally close the browser window, etc.

```tsx
import { useBeforeUnload } from "@remix-run/react";

function SomeForm() {
  const [state, setState] = React.useState(null);

  // save it off before the automatic page reload
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

`<docs-info>`For more information and usage, please refer to the [React Router ][rr-usebeforeunload].`</docs-info>`

# `useFetcher`

`<docs-success>`Watch the `<a href="https://www.youtube.com/playlist?list=PLXoynULbYuEDG2wBFSZ66b85EIspy3fy6">`📼 Remix Singles`</a>`: `<a href="https://www.youtube.com/watch?v=vTzNpiOk668&list=PLXoynULbYuEDG2wBFSZ66b85EIspy3fy6">`Concurrent Mutations w/ useFetcher`</a>` and `<a href="https://www.youtube.com/watch?v=EdB_nj01C80&list=PLXoynULbYuEDG2wBFSZ66b85EIspy3fy6">`Optimistic UI`</a></docs-success>`

In HTML/HTTP, data mutations and loads are modeled with navigation: `<a href>` and `<form action>`. Both cause a navigation in the browser. The Remix equivalents are `<Link>` and `<Form>`.

But sometimes you want to call a loader outside of navigation, or call an action (and get the routes to reload) but you don't want the URL to change. Many interactions with the server aren't navigation events. This hook lets you plug your UI into your actions and loaders without navigating.

This is useful when you need to:

- fetch data not associated with UI routes (popovers, dynamic forms, etc.)
- submit data to actions without navigating (shared components like a newsletter sign ups)
- handle multiple concurrent submissions in a list (typical "todo app" list where you can click multiple buttons and all be pending at the same time)
- infinite scroll containers
- and more!

It is common for Remix newcomers to see this hook and think it is the primary way to interact with the server for data loading and updates--because it looks like what you might have done outside of Remix. If your use case can be modeled as "navigation", it's recommended you use one of the core data APIs before reaching for `useFetcher`:

- 
- 
- 
- 

If you're building a highly interactive, "app-like" user interface, you will use `useFetcher` often.

```tsx
import { useFetcher } from "@remix-run/react";

function SomeComponent() {
  const fetcher = useFetcher();

  // trigger the fetch with these
  <fetcher.Form {...formOptions} />;

  useEffect(() => {
    fetcher.submit(data, options);
    fetcher.load(href);
  }, [fetcher]);

  // build UI with these
  fetcher.state;
  fetcher.type;
  fetcher.submission;
  fetcher.data;
}
```

Notes about how it works:

- Automatically handles cancellation of the fetch at the browser level
- When submitting with POST, PUT, PATCH, DELETE, the action is called first
  - After the action completes, the loaders on the page are reloaded to capture any mutations that may have happened, automatically keeping your UI in sync with your server state
- When multiple fetchers are inflight at once, it will
  - commit the freshest available data as they each land
  - ensure no stale loads override fresher data, no matter which order the responses return
- Handles uncaught errors by rendering the nearest `ErrorBoundary` (just like a normal navigation from `<Link>` or `<Form>`)
- Will redirect the app if your action/loader being called returns a redirect (just like a normal navigation from `<Link>` or `<Form>`)

#### `fetcher.state`

You can know the state of the fetcher with `fetcher.state`. It will be one of:

- **idle** - Nothing is being fetched.
- **submitting** - A form has been submitted. If the method is GET, then the route loader is being called. If POST, PUT, PATCH, or DELETE, then the route action is being called.
- **loading** - The loaders for the routes are being reloaded after an action submission.

#### `fetcher.type`

This is the type of state the fetcher is in. It's like `fetcher.state`, but more granular. Depending on the fetcher's state, the types can be the following:

- `state === "idle"`

  - **init** - The fetcher isn't doing anything currently and hasn't done anything yet.
  - **done** - The fetcher isn't doing anything currently, but it has completed a fetch and you can safely read the `fetcher.data`.
- `state === "submitting"`

  - **actionSubmission** - A form has been submitted with POST, PUT, PATCH, or DELETE, and the action is being called.
  - **loaderSubmission** - A form has been submitted with GET and the loader is being called.
- `state === "loading"`

  - **actionReload** - The action from an "actionSubmission" returned data and the loaders on the page are being reloaded.
  - **actionRedirect** - The action from an "actionSubmission" returned a redirect and the page is transitioning to the new location.
  - **normalLoad** - A route's loader is being called without a submission (`fetcher.load()`).

#### `fetcher.submission`

When using `<fetcher.Form>` or `fetcher.submit()`, the form submission is available to build optimistic UI.

It is not available when the fetcher state is "idle" or "loading".

#### `fetcher.data`

The returned response data from your loader or action is stored here. Once the data is set, it persists on the fetcher even through reloads and resubmissions (like calling `fetcher.load()` again after having already read the data).

#### `fetcher.Form`

Just like `<Form>` except it doesn't cause a navigation. (You'll get over the dot in JSX, don't worry.)

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

#### `fetcher.submit()`

Just like `useSubmit` except it doesn't cause a navigation.

```tsx
function SomeComponent() {
  const fetcher = useFetcher();

  const onClick = () =>
    fetcher.submit({ some: "values" }, { method: "post" });

  // ...
}
```

Although a URL matches multiple Routes in a remix router hierarchy, a `fetcher.submit()` call will only call the action on the deepest matching route, unless the deepest matching route is an "index route". In this case, it will post to the parent route of the index route (because they share the same URL).

If you want to submit to an index route use `?index` in the URL:

```js
fetcher.submit(
  { some: "values" },
  { method: "post", action: "/accounts?index" }
);
```

See also:

- [ query param][index query param]

#### `fetcher.load()`

Loads data from a route loader.

```tsx
function SomeComponent() {
  const fetcher = useFetcher();

  useEffect(() => {
    if (fetcher.type === "init") {
      fetcher.load("/some/route");
    }
  }, [fetcher]);

  fetcher.data; // the data from the loader
}
```

Although a URL matches multiple Routes in a remix router hierarchy, a `fetcher.load()` call will only call the loader on the deepest matching route, unless the deepest matching route is an "index route". In this case, it will load the parent route of the index route (because they share the same URL).

If you want to load an index route use `?index` in the URL:

```js
fetcher.load("/some/route?index");
```

See also:

- [ query param][index query param]

#### Examples

`<docs-success>`Watch the `<a href="https://www.youtube.com/playlist?list=PLXoynULbYuEDG2wBFSZ66b85EIspy3fy6">`📼 Remix Single`</a>`: `<a href="https://www.youtube.com/watch?v=jd_bin5HPrw&list=PLXoynULbYuEDG2wBFSZ66b85EIspy3fy6">`Remix Newsletter Signup Form`</a></docs-success>`

**Newsletter Signup Form**

Perhaps you have a persistent newsletter signup at the bottom of every page on your site. This is not a navigation event, so useFetcher is perfect for the job. First, you create a Resource Route:

```tsx
export async function action({ request }: ActionArgs) {
  const email = (await request.formData()).get("email");
  try {
    await subscribe(email);
    return json({ error: null, ok: true });
  } catch (error) {
    return json({ error: error.message, ok: false });
  }
}
```

Then, somewhere else in your app (your root layout in this example), you render the following component:

```tsx
// ...

function NewsletterSignup() {
  const newsletter = useFetcher();
  const ref = useRef();

  useEffect(() => {
    if (newsletter.type === "done" && newsletter.data.ok) {
      ref.current.reset();
    }
  }, [newsletter]);

  return (
    <newsletter.Form
      ref={ref}
      method="post"
      action="/newsletter/subscribe"
    >
      <p>
        <input type="text" name="email" />{" "}
        <button
          type="submit"
          disabled={newsletter.state === "submitting"}
        >
          Subscribe
        </button>
      </p>

      {newsletter.type === "done" ? (
        newsletter.data.ok ? (
          <p>Thanks for subscribing!</p>
        ) : newsletter.data.error ? (
          <p data-error>{newsletter.data.error}</p>
        ) : null
      ) : null}
    </newsletter.Form>
  );
}
```

`<docs-info>`You can still provide a no-JavaScript experience`</docs-info>`

Because `useFetcher` doesn't cause a navigation, it won't automatically work if there is no JavaScript on the page like a normal Remix `<Form>` will, because the browser will still navigate to the form's action.

If you want to support a no JavaScript experience, just export a component from the route with the action.

```tsx
export async function action({ request }: ActionArgs) {
  // just like before
}

export default function NewsletterSignupRoute() {
  const newsletter = useActionData<typeof action>();
  return (
    <Form method="post" action="/newsletter/subscribe">
      <p>
        <input type="text" name="email" />{" "}
        <button type="submit">Subscribe</button>
      </p>

      {newsletter.data.ok ? (
        <p>Thanks for subscribing!</p>
      ) : newsletter.data.error ? (
        <p data-error>{newsletter.data.error}</p>
      ) : null}
    </Form>
  );
}
```

- When JS is on the page, the user will subscribe to the newsletter and the page won't change, they'll just get a solid, dynamic experience.
- When JS is not on the page, they'll be transitioned to the signup page by the browser.

You could even refactor the component to take props from the hooks and reuse it:

```tsx
import { Form, useFetcher } from "@remix-run/react";

// used in the footer
export function NewsletterSignup() {
  const newsletter = useFetcher();
  return (
    <NewsletterForm
      Form={newsletter.Form}
      data={newsletter.data}
      state={newsletter.state}
      type={newsletter.type}
    />
  );
}

// used here and in the route
export function NewsletterForm({
  Form,
  data,
  state,
  type,
}) {
  // refactor a bit in here, just read from props instead of useFetcher
}
```

And now you could reuse the same form, but it gets data from a different hook for the no-js experience:

```tsx
import { Form } from "@remix-run/react";

import { NewsletterForm } from "~/NewsletterSignup";

export default function NewsletterSignupRoute() {
  const data = useActionData<typeof action>();
  return (
    <NewsletterForm
      Form={Form}
      data={data}
      state="idle"
      type="done"
    />
  );
}
```

**Mark Article as Read**

Imagine you want to mark that an article has been read by the current user, after they've been on the page for a while and scrolled to the bottom. You could make a hook that looks something like this:

```tsx
function useMarkAsRead({ articleId, userId }) {
  const marker = useFetcher();

  useSpentSomeTimeHereAndScrolledToTheBottom(() => {
    marker.submit(
      { userId },
      {
        method: "post",
        action: `/article/${articleID}/mark-as-read`,
      }
    );
  });
}
```

**User Avatar Details Popup**

Anytime you show the user avatar, you could put a hover effect that fetches data from a loader and displays it in a popup.

```tsx
export async function loader({ params }: LoaderArgs) {
  return json(
    await fakeDb.user.find({ where: { id: params.id } })
  );
}

function UserAvatar({ partialUser }) {
  const userDetails = useFetcher<typeof loader>();
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    if (showDetails && userDetails.type === "init") {
      userDetails.load(`/users/${user.id}/details`);
    }
  }, [showDetails, userDetails]);

  return (
    <div
      onMouseEnter={() => setShowDetails(true)}
      onMouseLeave={() => setShowDetails(false)}
    >
      <img src={partialUser.profileImageUrl} />
      {showDetails ? (
        userDetails.type === "done" ? (
          <UserPopup user={userDetails.data} />
        ) : (
          <UserPopupLoading />
        )
      ) : null}
    </div>
  );
}
```

**Async Reach UI Combobox**

If the user needs to select a city, you could have a loader that returns a list of cities based on a query and plug it into a Reach UI combobox:

```tsx
export async function loader({ request }: LoaderArgs) {
  const url = new URL(request.url);
  return json(
    await searchCities(url.searchParams.get("city-query"))
  );
}

function CitySearchCombobox() {
  const cities = useFetcher<typeof loader>();

  return (
    <cities.Form method="get" action="/city-search">
      <Combobox aria-label="Cities">
        <div>
          <ComboboxInput
            name="city-query"
            onChange={(event) =>
              cities.submit(event.target.form)
            }
          />
          {cities.state === "submitting" ? (
            <Spinner />
          ) : null}
        </div>

        {cities.data ? (
          <ComboboxPopover className="shadow-popup">
            {cities.data.error ? (
              <p>Failed to load cities :(</p>
            ) : cities.data.length ? (
              <ComboboxList>
                {cities.data.map((city) => (
                  <ComboboxOption
                    key={city.id}
                    value={city.name}
                  />
                ))}
              </ComboboxList>
            ) : (
              <span>No results found</span>
            )}
          </ComboboxPopover>
        ) : null}
      </Combobox>
    </cities.Form>
  );
}
```

# `useFetchers`

Returns an array of all inflight fetchers.

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
  const toggle = useFetcher();
  const checked = toggle.submission
    ? // use the optimistic version
      Boolean(toggle.submission.formData.get("complete"))
    : // use the normal version
      task.complete;

  const { projectId, id } = task;
  return (
    <toggle.Form
      method="put"
      action={`/project/${projectId}/tasks/${id}`}
    >
      <label>
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => toggle.submit(e.target.form)}
        />
      </label>
    </toggle.Form>
  );
}
```

This is awesome for the checkbox, but the sidebar will say 2/4 while the checkboxes show 3/4 when the user clicks one of them!

```
+-----------------+----------------------------+
|                 |                            |
|   Soccer  (8/9) | [x] Do the dishes          |
|                 |                            |
| > Home    (2/4) | [x] Fold laundry           |
|                 |                            |
|          CLICK!-->[x] Replace battery in the |
|                 |     smoke alarm            |
|                 |                            |
|                 | [ ] Change lights in kids  |
|                 |     bathroom               |
|                 |                            |
+-----------------+----------------------------┘
```

Because Remix will automatically reload the routes, the sidebar will quickly update and be correct. But for a moment, it's gonna feel a little funny.

This is where `useFetchers` comes in. Up in the sidebar, we can access all the inflight fetcher states from the checkboxes - even though it's not the component that created them.

The strategy has three steps:

1. Find the submissions for tasks in a specific project
2. Use the `fetcher.submission.formData` to immediately update the count
3. Use the normal task's state if it's not inflight

Here's some sample code:

```js
function ProjectTaskCount({ project }) {
  const fetchers = useFetchers();
  let completedTasks = 0;

  // 1) Find my task's submissions
  const myFetchers = new Map();
  for (const f of fetchers) {
    if (
      f.submission &&
      f.submission.action.startsWith(
        `/projects/${project.id}/task`
      )
    ) {
      const taskId = f.submission.formData.get("id");
      myFetchers.set(
        parseInt(taskId),
        f.submission.formData.get("complete") === "on"
      );
    }
  }

  for (const task of project.tasks) {
    // 2) use the optimistic version
    if (myFetchers.has(task.id)) {
      if (myFetchers.get(task.id)) {
        completedTasks++;
      }
    }
    // 3) use the normal version
    else if (task.complete) {
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

# `useFormAction`

`<docs-info>`This hook is simply a re-export of [React Router's ][rr-useformaction].`</docs-info>`

Resolves the value of a `<form action>` attribute using React Router's relative paths. This can be useful when computing the correct action for a `<button formAction>`, for example, when a `<button>` changes the action of its `<form>`.

```tsx
function SomeComponent() {
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

(Yes, HTML buttons can change the action of their form!)

`<docs-info>`For more information and usage, please refer to the [React Router ][rr-useformaction].`</docs-info>`

# `useLoaderData`

`<docs-info>`This hook is simply a re-export of [React Router's ][rr-useloaderdata].`</docs-info>`

`<docs-success>`Watch the `<a href="https://www.youtube.com/playlist?list=PLXoynULbYuEDG2wBFSZ66b85EIspy3fy6">`📼 Remix Single`</a>`: `<a href="https://www.youtube.com/watch?v=NXqEP_PsPNc&list=PLXoynULbYuEDG2wBFSZ66b85EIspy3fy6">`Loading data into components`</a></docs-success>`

This hook returns the JSON parsed data from your route loader function.

```tsx
import { json } from "@remix-run/node"; // or cloudflare/deno
import { useLoaderData } from "@remix-run/react";

export async function loader() {
  return json(await fakeDb.invoices.findAll());
}

export default function Invoices() {
  const invoices = useLoaderData<typeof loader>();
  // ...
}
```

`<docs-info>`For more information and usage, please refer to the [React Router ][rr-useloaderdata].`</docs-info>`

# `useMatches`

Returns the current route matches on the page. This is useful for creating layout abstractions with your current routes.

```js
function SomeComponent() {
  const matches = useMatches();

  // ...
}
```

`matches` has the following shape:

```js
[
  { id, pathname, data, params, handle }, // root route
  { id, pathname, data, params, handle }, // layout route
  { id, pathname, data, params, handle }, // child route
  // etc.
];
```

Remix knows all of your route matches and data at the top of the React element tree. That's how we can:

- add meta tags to the top of the document even though they are defined in nested routes lower in the tree
- add `<link>` tags to assets at the top of the document even though ...
- add `<script>` bundles for each route at the top of the document ...

Pairing route `handle` with `useMatches`, you can build your own, similar conventions to Remix's built-in `<Meta>`, `<Links>`, and `<Scripts>` components.

Let's consider building some breadcrumbs. If a route wants to participate in these breadcrumbs at the top of the root layout, it normally can't because it renders down low in the tree.

You can put whatever you want on a route `handle`. Here we'll use `breadcrumb`. It's not a Remix thing, it's whatever you want. Here it's added to a parent route:

1. Add the breadcrumb handle to the parent route

   ```tsx
   // routes/parent.tsx
   export const handle = {
     breadcrumb: () => <Link to="/parent">Some Route</Link>,
   };
   ```
2. We can do the same for a child route

   ```tsx
   // routes/parent/child.tsx
   export const handle = {
     breadcrumb: () => (
       <Link to="/parent/child">Child Route</Link>
     ),
   };
   ```
3. Now we can put it all together in our root route with `useMatches`.

   ```tsx
   import {
     Links,
     Scripts,
     useLoaderData,
     useMatches,
   } from "@remix-run/react";

   export default function Root() {
     const matches = useMatches();

     return (
       <html lang="en">
         <head>
           <Links />
         </head>
         <body>
           <header>
             <ol>
               {matches
                 // skip routes that don't have a breadcrumb
                 .filter(
                   (match) =>
                     match.handle && match.handle.breadcrumb
                 )
                 // render breadcrumbs!
                 .map((match, index) => (
                   <li key={index}>
                     {match.handle.breadcrumb(match)}
                   </li>
                 ))}
             </ol>
           </header>

           <Outlet />
         </body>
       </html>
     );
   }
   ```

Notice that we're passing the `match` to breadcrumbs. We didn't use it, but we could have used `match.data` to use our route's data in the breadcrumb.

Another common use case is [enabling JavaScript for some routes and not others][disabling-javascript].

Once again, `useMatches` with `handle` is a great way for routes to participate in rendering abstractions at the top of element tree, above where the route is actually rendered.

For an example of how to share loader data via `useMatches`, check out [the sharing loader data example in the remix repo][example-sharing-loader-data].

# `useNavigation`

`<docs-info>`This hook is simply a re-export of [React Router ][rr-usenavigation].`</docs-info>`

```tsx
import { useNavigation } from "@remix-run/react";

function SomeComponent() {
  const navigation = useNavigation();
  navigation.state;
  navigation.location;
  navigation.formData;
  navigation.formAction;
  navigation.formMethod;
}
```

`<docs-info>`For more information and usage, please refer to the [React Router ][rr-usenavigation].`</docs-info>`

# `useRevalidator`

`<docs-info>`This hook is simply a re-export of [React Router's ][rr-userevalidator].`</docs-info>`

This hook allows you to revalidate the data for any reason. React Router automatically revalidates the data after actions are called, but you may want to revalidate for other reasons like when focus returns to the window.

```jsx
import { useRevalidator } from "@remix-run/react";

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

`<docs-info>`For more information and usage, please refer to the [React Router ][rr-userevalidator].`</docs-info>`

# `useRouteLoaderData`

`<docs-info>`This hook is simply a re-export of [React Router ][rr-userouteloaderdata].`</docs-info>`

Pass in a route ID and it will return the loader data for that route.

```tsx
import { useRouteLoaderData } from "@remix-run/react";

function SomeComponent() {
  const { user } = useRouteLoaderData("root");
}
```

Remix creates the route IDs automatically. They are simply the path of the route file relative to the app folder without the extension.

| Route Filename                                        | Route ID           |
| ----------------------------------------------------- | ------------------ |
| `app/root.tsx`                                      | `"root"`         |
| `app/routes/teams.tsx`                              | `"routes/teams"` |
| `app/routes/teams.$id.jsx` | `"routes/teams.$id"` |                    |

`<docs-info>`For more information and usage, please refer to the [React Router ][rr-userouteloaderdata].`</docs-info>`

# `useSubmit`

`<docs-info>`This hook is simply a re-export of [React Router's ][rr-usesubmit].`</docs-info>`

Returns the function that may be used to submit a `<form>` (or some raw `FormData`) to the server using the same process that `<Form>` uses internally `onSubmit`. If you're familiar with React Router's `useNavigate`, you can think about this as the same thing but for `<Form>` instead of `<Link>`.

This is useful whenever you need to programmatically submit a form. For example, you may wish to save a user preferences form whenever any field changes.

```tsx
import type { ActionArgs } from "@remix-run/node"; // or cloudflare/deno
import { json } from "@remix-run/node"; // or cloudflare/deno
import { useSubmit, useTransition } from "@remix-run/react";

export async function loader() {
  return json(await getUserPreferences());
}

export async function action({ request }: ActionArgs) {
  await updatePreferences(await request.formData());
  return redirect("/prefs");
}

function UserPreferences() {
  const submit = useSubmit();
  const transition = useTransition();

  function handleChange(event) {
    submit(event.currentTarget, { replace: true });
  }

  return (
    <Form method="post" onChange={handleChange}>
      <label>
        <input type="checkbox" name="darkMode" value="on" />{" "}
        Dark Mode
      </label>
      {transition.state === "submitting" ? (
        <p>Saving...</p>
      ) : null}
    </Form>
  );
}
```

This can also be useful if you'd like to automatically sign someone out of your website after a period of inactivity. In this case, we've defined inactivity as the user hasn't navigated to any other pages after 5 minutes.

```tsx
import { useSubmit, useTransition } from "@remix-run/react";
import { useEffect } from "react";

function AdminPage() {
  useSessionTimeout();
  return <div>{/* ... */}</div>;
}

function useSessionTimeout() {
  const submit = useSubmit();
  const transition = useTransition();

  useEffect(() => {
    const timer = setTimeout(() => {
      submit(null, { method: "post", action: "/logout" });
    }, 5 * 60_000);

    return () => clearTimeout(timer);
  }, [submit, transition]);
}
```

`<docs-info>`For more information and usage, please refer to the [React Router ][rr-usesubmit].`</docs-info>`

# `useTransition`

`<docs-success>`Watch the `<a href="https://www.youtube.com/playlist?list=PLXoynULbYuEDG2wBFSZ66b85EIspy3fy6">`📼 Remix Singles`</a>`: `<a href="https://www.youtube.com/watch?v=y4VLIFjFq8k&list=PLXoynULbYuEDG2wBFSZ66b85EIspy3fy6">`Pending UI`</a>`, `<a href="https://www.youtube.com/watch?v=bMLej7bg5Zo&list=PLXoynULbYuEDG2wBFSZ66b85EIspy3fy6">`Clearing Inputs After Form Submissions`</a>`, and `<a href="https://www.youtube.com/watch?v=EdB_nj01C80&list=PLXoynULbYuEDG2wBFSZ66b85EIspy3fy6">`Optimistic UI`</a></docs-success>`

This hook tells you everything you need to know about a page transition to build pending navigation indicators and optimistic UI on data mutations. Things like:

- Global loading spinners
- Spinners on clicked links
- Disabling forms while the mutation is happening
- Adding spinners to submit buttons
- Optimistically showing a new record while it's being created on the server
- Optimistically showing the new state of a record while it's being updated

```js
import { useTransition } from "@remix-run/react";

function SomeComponent() {
  const transition = useTransition();
  transition.state;
  transition.type;
  transition.submission;
  transition.location;
}
```

## `transition.state`

You can know the state of the transition with `transition.state`. It will be one of:

- **idle** - There is no transition pending.
- **submitting** - A form has been submitted. If GET, then the route loader is being called. If POST, PUT, PATCH, DELETE, then the route action is being called.
- **loading** - The loaders for the next routes are being called to render the next page.

Normal navigation's transition as follows:

```
idle → loading → idle
```

GET form submissions transition as follows:

```
idle → submitting → idle
```

Form submissions with POST, PUT, PATCH, or DELETE transition as follows:

```
idle → submitting → loading → idle
```

```tsx
function SubmitButton() {
  const transition = useTransition();

  const text =
    transition.state === "submitting"
      ? "Saving..."
      : transition.state === "loading"
      ? "Saved!"
      : "Go";

  return <button type="submit">{text}</button>;
}
```

## `transition.type`

Most pending UI only cares about `transition.state`, but the transition can tell you even more information on `transition.type`.

Remix calls your route loaders at various times, like on normal link clicks or after a form submission completes. If you'd like to build pending indication that is more granular than "loading" and "submitting", use the `transition.type`.

Depending on the transition state, the types can be the following:

- `state === "idle"`

  - **idle** - The type is always idle when there's not a pending navigation.
- `state === "submitting"`

  - **actionSubmission** - A form has been submitted with POST, PUT, PATCH, or DELETE, and the action is being called
  - **loaderSubmission** - A form has been submitted with GET and the loader is being called
- `state === "loading"`

  - **loaderSubmissionRedirect** - A "loaderSubmission" was redirected by the loader and the next routes are being loaded
  - **actionRedirect** - An "actionSubmission" was redirected by the action and the next routes are being loaded
  - **actionReload** - The action from an "actionSubmission" returned data and the loaders on the page are being reloaded
  - **fetchActionRedirect** - An action [fetcher][usefetcher] redirected and the next routes are being loaded
  - **normalRedirect** - A loader from a normal navigation (or redirect) redirected to a new location and the new routes are being loaded
  - **normalLoad** - A normal load from a normal navigation

```tsx
function SubmitButton() {
  const transition = useTransition();

  const loadTexts = {
    actionRedirect: "Data saved, redirecting...",
    actionReload: "Data saved, reloading fresh data...",
  };

  const text =
    transition.state === "submitting"
      ? "Saving..."
      : transition.state === "loading"
      ? loadTexts[transition.type] || "Loading..."
      : "Go";

  return <button type="submit">{text}</button>;
}
```

## `transition.submission`

Any transition that started from a `<Form>` or `useSubmit` will have your form's submission attached to it. This is primarily useful to build "Optimistic UI" with the `submission.formData`  object.

TODO: Example

## `transition.location`

This tells you what the next location is going to be. It's most useful when matching against the next URL for custom links and hooks.

For example, this `Link` knows when its page is loading and about to become active:

```tsx
import { Link, useResolvedPath } from "@remix-run/react";

function PendingLink({ to, children }) {
  const transition = useTransition();
  const path = useResolvedPath(to);

  const isPending =
    transition.state === "loading" &&
    transition.location.pathname === path.pathname;

  return (
    <Link
      data-pending={isPending ? "true" : null}
      to={to}
      children={children}
    />
  );
}
```

Note that this link will not appear "pending" if a form is being submitted to the URL the link points to, because we only do this for "loading" states. The form will contain the pending UI for when the state is "submitting", once the action is complete, then the link will go pending.

## v2 deprecation

This API will be removed in v2 in favor of . You can start using the new `useNavigation` hook today to make upgrading in the future easy, but you can keep using `useTransition` before v2.

# Cookies

A [cookie][cookie] is a small piece of information that your server sends someone in a HTTP response that their browser will send back on subsequent requests. This technique is a fundamental building block of many interactive websites that adds state so you can build authentication (see [sessions][sessions]), shopping carts, user preferences, and many other features that require remembering who is "logged in".

Remix's `Cookie` interface provides a logical, reusable container for cookie metadata.

## Using cookies

While you may create these cookies manually, it is more common to use a [session storage][sessions].

In Remix, you will typically work with cookies in your `loader` and/or `action` functions (see `<Link to="../mutations">`mutations`</Link>`), since those are the places where you need to read and write data.

Let's say you have a banner on your e-commerce site that prompts users to check out the items you currently have on sale. The banner spans the top of your homepage, and includes a button on the side that allows the user to dismiss the banner so they don't see it for at least another week.

First, create a cookie:

```js
import { createCookie } from "@remix-run/node"; // or cloudflare/deno

export const userPrefs = createCookie("user-prefs", {
  maxAge: 604_800, // one week
});
```

Then, you can `import` the cookie and use it in your `loader` and/or `action`. The `loader` in this case just checks the value of the user preference so you can use it in your component for deciding whether to render the banner. When the button is clicked, the `<form>` calls the `action` on the server and reloads the page without the banner.

**Note:** We recommend (for now) that you create all the cookies your app needs in `app/cookies.js` and `import` them into your route modules. This allows the Remix compiler to correctly prune these imports out of the browser build where they are not needed. We hope to eventually remove this caveat.

```tsx
import type {
  ActionArgs,
  LoaderArgs,
} from "@remix-run/node"; // or cloudflare/deno
import { json, redirect } from "@remix-run/node"; // or cloudflare/deno
import {
  useLoaderData,
  Link,
  Form,
} from "@remix-run/react";

import { userPrefs } from "~/cookies";

export async function loader({ request }: LoaderArgs) {
  const cookieHeader = request.headers.get("Cookie");
  const cookie =
    (await userPrefs.parse(cookieHeader)) || {};
  return json({ showBanner: cookie.showBanner });
}

export async function action({ request }: ActionArgs) {
  const cookieHeader = request.headers.get("Cookie");
  const cookie =
    (await userPrefs.parse(cookieHeader)) || {};
  const bodyParams = await request.formData();

  if (bodyParams.get("bannerVisibility") === "hidden") {
    cookie.showBanner = false;
  }

  return redirect("/", {
    headers: {
      "Set-Cookie": await userPrefs.serialize(cookie),
    },
  });
}

export default function Home() {
  const { showBanner } = useLoaderData<typeof loader>();

  return (
    <div>
      {showBanner ? (
        <div>
          <Link to="/sale">Don't miss our sale!</Link>
          <Form method="post">
            <input
              type="hidden"
              name="bannerVisibility"
              value="hidden"
            />
            <button type="submit">Hide</button>
          </Form>
        </div>
      ) : null}
      <h1>Welcome!</h1>
    </div>
  );
}
```

## Cookie attributes

Cookies have [several attributes][cookie-attrs] that control when they expire, how they are accessed, and where they are sent. Any of these attributes may be specified either in `createCookie(name, options)`, or during `serialize()` when the `Set-Cookie` header is generated.

```js
const cookie = createCookie("user-prefs", {
  // These are defaults for this cookie.
  domain: "remix.run",
  path: "/",
  sameSite: "lax",
  httpOnly: true,
  secure: true,
  expires: new Date(Date.now() + 60_000),
  maxAge: 60,
});

// You can either use the defaults:
cookie.serialize(userPrefs);

// Or override individual ones as needed:
cookie.serialize(userPrefs, { sameSite: "strict" });
```

Please read [more info about these attributes][cookie-attrs] to get a better understanding of what they do.

## Signing cookies

It is possible to sign a cookie to automatically verify its contents when it is received. Since it's relatively easy to spoof HTTP headers, this is a good idea for any information that you do not want someone to be able to fake, like authentication information (see [sessions][sessions]).

To sign a cookie, provide one or more `secrets` when you first create the cookie:

```js
const cookie = createCookie("user-prefs", {
  secrets: ["s3cret1"],
});
```

Cookies that have one or more `secrets` will be stored and verified in a way that ensures the cookie's integrity.

Secrets may be rotated by adding new secrets to the front of the `secrets` array. Cookies that have been signed with old secrets will still be decoded successfully in `cookie.parse()`, and the newest secret (the first one in the array) will always be used to sign outgoing cookies created in `cookie.serialize()`.

```ts
export const cookie = createCookie("user-prefs", {
  secrets: ["n3wsecr3t", "olds3cret"],
});
```

```tsx
import { cookie } from "~/cookies";

export async function loader({ request }: LoaderArgs) {
  const oldCookie = request.headers.get("Cookie");
  // oldCookie may have been signed with "olds3cret", but still parses ok
  const value = await cookie.parse(oldCookie);

  new Response("...", {
    headers: {
      // Set-Cookie is signed with "n3wsecr3t"
      "Set-Cookie": await cookie.serialize(value),
    },
  });
}
```

## `createCookie`

Creates a logical container for managing a browser cookie from the server.

```ts
import { createCookie } from "@remix-run/node"; // or cloudflare/deno

const cookie = createCookie("cookie-name", {
  // all of these are optional defaults that can be overridden at runtime
  domain: "remix.run",
  expires: new Date(Date.now() + 60_000),
  httpOnly: true,
  maxAge: 60,
  path: "/",
  sameSite: "lax",
  secrets: ["s3cret1"],
  secure: true,
});
```

To learn more about each attribute, please see the [MDN Set-Cookie docs][cookie-attrs].

## `isCookie`

Returns `true` if an object is a Remix cookie container.

```ts
import { isCookie } from "@remix-run/node"; // or cloudflare/deno
const cookie = createCookie("user-prefs");
console.log(isCookie(cookie));
// true
```

## Cookie API

A cookie container is returned from `createCookie` and has a handful of properties and methods.

```ts
const cookie = createCookie(name);
cookie.name;
cookie.parse();
// etc.
```

### `cookie.name`

The name of the cookie, used in `Cookie` and `Set-Cookie` HTTP headers.

### `cookie.parse()`

Extracts and returns the value of this cookie in a given `Cookie` header.

```js
const value = await cookie.parse(
  request.headers.get("Cookie")
);
```

### `cookie.serialize()`

Serializes a value and combines it with this cookie's options to create a `Set-Cookie` header, suitable for use in an outgoing `Response`.

```js
new Response("...", {
  headers: {
    "Set-Cookie": await cookie.serialize({
      showBanner: true,
    }),
  },
});
```

### `cookie.isSigned`

Will be `true` if the cookie uses any `secrets`, `false` otherwise.

```js
let cookie = createCookie("user-prefs");
console.log(cookie.isSigned); // false

cookie = createCookie("user-prefs", {
  secrets: ["soopersekrit"],
});
console.log(cookie.isSigned); // true
```

### `cookie.expires`

The `Date` on which this cookie expires. Note that if a cookie has both `maxAge` and `expires`, this value will be the date at the current time plus the `maxAge` value since `Max-Age` takes precedence over `Expires`.

```js
const cookie = createCookie("user-prefs", {
  expires: new Date("2021-01-01"),
});

console.log(cookie.expires); // "2020-01-01T00:00:00.000Z"
```

# `defer`

This is a shortcut for creating a streaming/deferred response. It assumes you are using `utf-8` encoding. From a developer perspective it behaves just like , but with the ability to transport promises to your UI components.

```ts
import { defer } from "@remix-run/node"; // or cloudflare/deno

export const loader = async () => {
  const aStillRunningPromise = loadSlowDataAsync();

  // So you can write this without awaiting the promise:
  return defer({
    critical: "data",
    slowPromise: aStillRunningPromise,
  });
};
```

You can also pass a status code and headers:

```ts
export const loader = async () => {
  const aStillRunningPromise = loadSlowDataAsync();

  return defer(
    {
      critical: "data",
      slowPromise: aStillRunningPromise,
    },
    {
      status: 418,
      headers: {
        "Cache-Control": "no-store",
      },
    }
  );
};
```

# `json`

This is a shortcut for creating `application/json` responses. It assumes you are using `utf-8` encoding.

```tsx
import { json } from "@remix-run/node"; // or cloudflare/deno

export const loader = async () => {
  // So you can write this:
  return json({ any: "thing" });

  // Instead of this:
  return new Response(JSON.stringify({ any: "thing" }), {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
  });
};
```

You can also pass a status code and headers:

```tsx
export const loader = async () => {
  return json(
    { not: "coffee" },
    {
      status: 418,
      headers: {
        "Cache-Control": "no-store",
      },
    }
  );
};
```

# `unstable_parseMultipartFormData`

Allows you to handle multipart forms (file uploads) for your app.

Would be useful to understand [the Browser File API][the-browser-file-api] to know how to use this API.

It's to be used in place of `request.formData()`.

```diff
- const formData = await request.formData();
+ const formData = await unstable_parseMultipartFormData(request, uploadHandler);
```

For example:

```tsx
export const action = async ({ request }: ActionArgs) => {
  const formData = await unstable_parseMultipartFormData(
    request,
    uploadHandler // <-- we'll look at this deeper next
  );

  // the returned value for the file field is whatever our uploadHandler returns.
  // Let's imagine we're uploading the avatar to s3,
  // so our uploadHandler returns the URL.
  const avatarUrl = formData.get("avatar");

  // update the currently logged in user's avatar in our database
  await updateUserAvatar(request, avatarUrl);

  // success! Redirect to account page
  return redirect("/account");
};

export default function AvatarUploadRoute() {
  return (
    <Form method="post" encType="multipart/form-data">
      <label htmlFor="avatar-input">Avatar</label>
      <input id="avatar-input" type="file" name="avatar" />
      <button>Upload</button>
    </Form>
  );
}
```

### `uploadHandler`

The `uploadHandler` is the key to the whole thing. It's responsible for what happens to the multipart/form-data parts as they are being streamed from the client. You can save it to disk, store it in memory, or act as a proxy to send it somewhere else (like a file storage provider).

Remix has two utilities to create `uploadHandler`s for you:

- `unstable_createFileUploadHandler`
- `unstable_createMemoryUploadHandler`

These are fully featured utilities for handling fairly simple use cases. It's not recommended to load anything but quite small files into memory. Saving files to disk is a reasonable solution for many use cases. But if you want to upload the file to a file hosting provider, then you'll need to write your own.

# `redirect`

This is a shortcut for sending 30x responses.

```tsx
import { redirect } from "@remix-run/node"; // or cloudflare/deno

export const action = async () => {
  const userSession = await getUserSessionOrWhatever();

  if (!userSession) {
    return redirect("/login");
  }

  return json({ ok: true });
};
```

By default, it sends 302, but you can change it to whichever redirect status code you'd like:

```ts
redirect(path, 301);
redirect(path, 303);
```

You can also send a `ResponseInit` to set headers, like committing a session.

```ts
redirect(path, {
  headers: {
    "Set-Cookie": await commitSession(session),
  },
});

redirect(path, {
  status: 302,
  headers: {
    "Set-Cookie": await commitSession(session),
  },
});
```

Of course, you can do redirects without this helper if you'd rather build it up yourself:

```ts
// this is a shortcut...
return redirect("/else/where", 303);

// ...for this
return new Response(null, {
  status: 303,
  headers: {
    Location: "/else/where",
  },
});
```

And you can throw redirects to break through the call stack and redirect right away:

```ts
if (!session) {
  throw redirect("/login", 302);
}
```

# Sessions

Sessions are an important part of websites that allow the server to identify requests coming from the same person, especially when it comes to server-side form validation or when JavaScript is not on the page. Sessions are a fundamental building block of many sites that let users "log in", including social, e-commerce, business, and educational websites.

In Remix, sessions are managed on a per-route basis (rather than something like express middleware) in your `loader` and `action` methods using a "session storage" object (that implements the `SessionStorage` interface). Session storage understands how to parse and generate cookies, and how to store session data in a database or filesystem.

Remix comes with several pre-built session storage options for common scenarios, and one to create your own:

- `createCookieSessionStorage`
- `createMemorySessionStorage`
- `createFileSessionStorage` (node)
- `createWorkersKVSessionStorage` (Cloudflare Workers)
- `createArcTableSessionStorage` (architect, Amazon DynamoDB)
- custom storage with `createSessionStorage`

## Using Sessions

This is an example of a cookie session storage:

```js
// app/sessions.js
import { createCookieSessionStorage } from "@remix-run/node"; // or cloudflare/deno

const { getSession, commitSession, destroySession } =
  createCookieSessionStorage({
    // a Cookie from `createCookie` or the CookieOptions to create one
    cookie: {
      name: "__session",

      // all of these are optional
      domain: "remix.run",
      // Expires can also be set (although maxAge overrides it when used in combination).
      // Note that this method is NOT recommended as `new Date` creates only one date on each server deployment, not a dynamic date in the future!
      //
      // expires: new Date(Date.now() + 60_000),
      httpOnly: true,
      maxAge: 60,
      path: "/",
      sameSite: "lax",
      secrets: ["s3cret1"],
      secure: true,
    },
  });

export { getSession, commitSession, destroySession };
```

We recommend setting up your session storage object in `app/sessions.js` so all routes that need to access session data can import from the same spot (also, see our [Route Module Constraints][constraints]).

The input/output to a session storage object are HTTP cookies. `getSession()` retrieves the current session from the incoming request's `Cookie` header, and `commitSession()`/`destroySession()` provide the `Set-Cookie` header for the outgoing response.

You'll use methods to get access to sessions in your `loader` and `action` functions.

A login form might look something like this:

```tsx
import type {
  ActionArgs,
  LoaderArgs,
} from "@remix-run/node"; // or cloudflare/deno
import { json, redirect } from "@remix-run/node"; // or cloudflare/deno
import { useLoaderData } from "@remix-run/react";

import { getSession, commitSession } from "../sessions";

export async function loader({ request }: LoaderArgs) {
  const session = await getSession(
    request.headers.get("Cookie")
  );

  if (session.has("userId")) {
    // Redirect to the home page if they are already signed in.
    return redirect("/");
  }

  const data = { error: session.get("error") };

  return json(data, {
    headers: {
      "Set-Cookie": await commitSession(session),
    },
  });
}

export async function action({ request }: ActionArgs) {
  const session = await getSession(
    request.headers.get("Cookie")
  );
  const form = await request.formData();
  const username = form.get("username");
  const password = form.get("password");

  const userId = await validateCredentials(
    username,
    password
  );

  if (userId == null) {
    session.flash("error", "Invalid username/password");

    // Redirect back to the login page with errors.
    return redirect("/login", {
      headers: {
        "Set-Cookie": await commitSession(session),
      },
    });
  }

  session.set("userId", userId);

  // Login succeeded, send them to the home page.
  return redirect("/", {
    headers: {
      "Set-Cookie": await commitSession(session),
    },
  });
}

export default function Login() {
  const { currentUser, error } =
    useLoaderData<typeof loader>();

  return (
    <div>
      {error ? <div className="error">{error}</div> : null}
      <form method="POST">
        <div>
          <p>Please sign in</p>
        </div>
        <label>
          Username: <input type="text" name="username" />
        </label>
        <label>
          Password:{" "}
          <input type="password" name="password" />
        </label>
      </form>
    </div>
  );
}
```

And then a logout form might look something like this:

```tsx
import { getSession, destroySession } from "../sessions";

export const action = async ({ request }: ActionArgs) => {
  const session = await getSession(
    request.headers.get("Cookie")
  );
  return redirect("/login", {
    headers: {
      "Set-Cookie": await destroySession(session),
    },
  });
};

export default function LogoutRoute() {
  return (
    <>
      <p>Are you sure you want to log out?</p>
      <Form method="post">
        <button>Logout</button>
      </Form>
      <Link to="/">Never mind</Link>
    </>
  );
}
```

`<docs-warning>`It's important that you logout (or perform any mutation for that matter) in an `action` and not a `loader`. Otherwise you open your users to [Cross-Site Request Forgery][csrf] attacks. Also, Remix only re-calls `loaders` when `actions` are called.`</docs-warning>`

## Session Gotchas

Because of nested routes, multiple loaders can be called to construct a single page. When using `session.flash()` or `session.unset()`, you need to be sure no other loaders in the request are going to want to read that, otherwise you'll get race conditions. Typically if you're using flash, you'll want to have a single loader read it, if another loader wants a flash message, use a different key for that loader.

## `createSession`

TODO:

## `isSession`

Returns `true` if an object is a Remix session.

```js
import { isSession } from "@remix-run/node"; // or cloudflare/deno

const sessionData = { foo: "bar" };
const session = createSession(sessionData, "remix-session");
console.log(isSession(session));
// true
```

## `createSessionStorage`

Remix makes it easy to store sessions in your own database if needed. The `createSessionStorage()` API requires a `cookie` (or options for creating a cookie, see [cookies][cookies]) and a set of create, read, update, and delete (CRUD) methods for managing the session data. The cookie is used to persist the session ID.

The following example shows how you could do this using a generic database client:

```js
import { createSessionStorage } from "@remix-run/node"; // or cloudflare/deno

function createDatabaseSessionStorage({
  cookie,
  host,
  port,
}) {
  // Configure your database client...
  const db = createDatabaseClient(host, port);

  return createSessionStorage({
    cookie,
    async createData(data, expires) {
      // `expires` is a Date after which the data should be considered
      // invalid. You could use it to invalidate the data somehow or
      // automatically purge this record from your database.
      const id = await db.insert(data);
      return id;
    },
    async readData(id) {
      return (await db.select(id)) || null;
    },
    async updateData(id, data, expires) {
      await db.update(id, data);
    },
    async deleteData(id) {
      await db.delete(id);
    },
  });
}
```

And then you can use it like this:

```js
const { getSession, commitSession, destroySession } =
  createDatabaseSessionStorage({
    host: "localhost",
    port: 1234,
    cookie: {
      name: "__session",
      sameSite: "lax",
    },
  });
```

The `expires` argument to `createData` and `updateData` is the same `Date` at which the cookie itself expires and is no longer valid. You can use this information to automatically purge the session record from your database to save on space, or to ensure that you do not otherwise return any data for old, expired cookies.

## `createCookieSessionStorage`

For purely cookie-based sessions (where the session data itself is stored in the session cookie with the browser, see [cookies][cookies]) you can use `createCookieSessionStorage()`.

The main advantage of cookie session storage is that you don't need any additional backend services or databases to use it. It can also be beneficial in some load-balanced scenarios. However, cookie-based sessions may not exceed the browser's max-allowed cookie length (typically 4kb).

The downside is that you have to `commitSession` in almost every loader and action. If your loader or action changes the session at all, it must be committed. That means if you `session.flash` in an action, and then `session.get` in another, you must commit it for that flashed message to go away. With other session storage strategies you only have to commit it when it's created (the browser cookie doesn't need to change because it doesn't store the session data, just the key to find it elsewhere).

```js
import { createCookieSessionStorage } from "@remix-run/node"; // or cloudflare/deno

const { getSession, commitSession, destroySession } =
  createCookieSessionStorage({
    // a Cookie from `createCookie` or the same CookieOptions to create one
    cookie: {
      name: "__session",
      secrets: ["r3m1xr0ck5"],
      sameSite: "lax",
    },
  });
```

## `createMemorySessionStorage`

This storage keeps all the cookie information in your server's memory.

`<docs-error>`This should only be used in development. Use one of the other methods in production.`</docs-error>`

```js
import {
  createCookie,
  createMemorySessionStorage,
} from "@remix-run/node"; // or cloudflare/deno

// In this example the Cookie is created separately.
const sessionCookie = createCookie("__session", {
  secrets: ["r3m1xr0ck5"],
  sameSite: true,
});

const { getSession, commitSession, destroySession } =
  createMemorySessionStorage({
    cookie: sessionCookie,
  });

export { getSession, commitSession, destroySession };
```

## `createFileSessionStorage` (node)

For file-backed sessions, use `createFileSessionStorage()`. File session storage requires a file system, but this should be readily available on most cloud providers that run express, maybe with some extra configuration.

The advantage of file-backed sessions is that only the session ID is stored in the cookie while the rest of the data is stored in a regular file on disk, ideal for sessions with more than 4kb of data.

`<docs-info>`If you are deploying to a serverless function, ensure you have access to a persistent file system. They usually don't have one without extra configuration.`</docs-info>`

```js
import {
  createCookie,
  createFileSessionStorage,
} from "@remix-run/node"; // or cloudflare/deno

// In this example the Cookie is created separately.
const sessionCookie = createCookie("__session", {
  secrets: ["r3m1xr0ck5"],
  sameSite: true,
});

const { getSession, commitSession, destroySession } =
  createFileSessionStorage({
    // The root directory where you want to store the files.
    // Make sure it's writable!
    dir: "/app/sessions",
    cookie: sessionCookie,
  });

export { getSession, commitSession, destroySession };
```

## `createWorkersKVSessionStorage` (Cloudflare Workers)

For [Cloudflare Workers KV][cloudflare-kv] backed sessions, use `createWorkersKVSessionStorage()`.

The advantage of KV backed sessions is that only the session ID is stored in the cookie while the rest of the data is stored in a globally-replicated, low-latency data store with exceptionally high-read volumes with low-latency.

```js
import {
  createCookie,
  createWorkersKVSessionStorage,
} from "@remix-run/cloudflare";

// In this example the Cookie is created separately.
const sessionCookie = createCookie("__session", {
  secrets: ["r3m1xr0ck5"],
  sameSite: true,
});

const { getSession, commitSession, destroySession } =
  createWorkersKVSessionStorage({
    // The KV Namespace where you want to store sessions
    kv: YOUR_NAMESPACE,
    cookie: sessionCookie,
  });

export { getSession, commitSession, destroySession };
```

## `createArcTableSessionStorage` (architect, Amazon DynamoDB)

For [Amazon DynamoDB][amazon-dynamo-db] backed sessions, use `createArcTableSessionStorage()`.

The advantage of DynamoDB backed sessions is that only the session ID is stored in the cookie while the rest of the data is stored in a globally replicated, low-latency data store with exceptionally high read volumes with low-latency.

```
# app.arc
sessions
  _idx *String
  _ttl TTL
```

```js
import {
  createCookie,
  createArcTableSessionStorage,
} from "@remix-run/architect";

// In this example the Cookie is created separately.
const sessionCookie = createCookie("__session", {
  secrets: ["r3m1xr0ck5"],
  maxAge: 3600,
  sameSite: true,
});

const { getSession, commitSession, destroySession } =
  createArcTableSessionStorage({
    // The name of the table (should match app.arc)
    table: "sessions",
    // The name of the key used to store the session ID (should match app.arc)
    idx: "_idx",
    // The name of the key used to store the expiration time (should match app.arc)
    ttl: "_ttl",
    cookie: sessionCookie,
  });

export { getSession, commitSession, destroySession };
```

## Session API

After retrieving a session with `getSession`, the returned session object has a handful of methods and properties:

```tsx
export async function action({ request }: ActionArgs) {
  const session = await getSession(
    request.headers.get("Cookie")
  );
  session.get("foo");
  session.has("bar");
  // etc.
}
```

### `session.has(key)`

Returns `true` if the session has a variable with the given `name`.

```js
session.has("userId");
```

### `session.set(key, value)`

Sets a session value for use in subsequent requests:

```js
session.set("userId", "1234");
```

### `session.flash(key, value)`

Sets a session value that will be unset the first time it is read. After that, it's gone. Most useful for "flash messages" and server-side form validation messages:

```tsx
import { commitSession, getSession } from "../sessions";

export async function action({
  params,
  request,
}: ActionArgs) {
  const session = await getSession(
    request.headers.get("Cookie")
  );
  const deletedProject = await archiveProject(
    params.projectId
  );

  session.flash(
    "globalMessage",
    `Project ${deletedProject.name} successfully archived`
  );

  return redirect("/dashboard", {
    headers: {
      "Set-Cookie": await commitSession(session),
    },
  });
}
```

Now we can read the message in a loader.

`<docs-info>`You must commit the session whenever you read a `flash`. This is different than what you might be used to, where some type of middleware automatically sets the cookie header for you.`</docs-info>`

```tsx
import { json } from "@remix-run/node"; // or cloudflare/deno
import {
  Meta,
  Links,
  Scripts,
  Outlet,
} from "@remix-run/react";

import { getSession, commitSession } from "./sessions";

export async function loader({ request }: LoaderArgs) {
  const session = await getSession(
    request.headers.get("Cookie")
  );
  const message = session.get("globalMessage") || null;

  return json(
    { message },
    {
      headers: {
        // only necessary with cookieSessionStorage
        "Set-Cookie": await commitSession(session),
      },
    }
  );
}

export default function App() {
  const { message } = useLoaderData<typeof loader>();

  return (
    <html>
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        {message ? (
          <div className="flash">{message}</div>
        ) : null}
        <Outlet />
        <Scripts />
      </body>
    </html>
  );
}
```

### `session.get()`

Accesses a session value from a previous request:

```js
session.get("name");
```

### `session.unset()`

Removes a value from the session.

```js
session.unset("name");
```

`<docs-info>`When using cookieSessionStorage, you must commit the session whenever you `unset</docs-info>`

```tsx
export async function loader({ request }: LoaderArgs) {
  // ...

  return json(data, {
    headers: {
      "Set-Cookie": await commitSession(session),
    },
  });
}
```

# `unstable_createFileUploadHandler`

A Node.js upload handler that will write parts with a filename to disk to keep them out of memory, parts without a filename will not be parsed. Should be composed with another upload handler.

**Example:**

```tsx
export const action = async ({ request }: ActionArgs) => {
  const uploadHandler = unstable_composeUploadHandlers(
    unstable_createFileUploadHandler({
      maxPartSize: 5_000_000,
      file: ({ filename }) => filename,
    }),
    // parse everything else into memory
    unstable_createMemoryUploadHandler()
  );
  const formData = await unstable_parseMultipartFormData(
    request,
    uploadHandler
  );

  const file = formData.get("avatar");

  // file is a "NodeOnDiskFile" which implements the "File" API
  // ... etc
};
```

**Options:**

| Property           | Type              | Default                          | Description                                                                                                                                                       |
| ------------------ | ----------------- | -------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| avoidFileConflicts | boolean           | true                             | Avoid file conflicts by appending a timestamp on the end of the filename if it already exists on disk                                                             |
| directory          | string\| Function | os.tmpdir()                      | The directory to write the upload.                                                                                                                                |
| file               | Function          | () =>`upload_${random}.${ext}` | The name of the file in the directory. Can be a relative path, the directory structure will be created if it does not exist.                                      |
| maxPartSize        | number            | 3000000                          | The maximum upload size allowed (in bytes). If the size is exceeded a MaxPartSizeExceededError will be thrown.                                                    |
| filter             | Function          | OPTIONAL                         | A function you can write to prevent a file upload from being saved based on filename, content type, or field name. Return `false` and the file will be ignored. |

The function API for `file` and `directory` are the same. They accept an `object` and return a `string`. The object it accepts has `filename`, `name`, and `contentType` (all strings). The `string` returned is the path.

The `filter` function accepts an `object` and returns a `boolean` (or a promise that resolves to a `boolean`). The object it accepts has the `filename`, `name`, and `contentType` (all strings). The `boolean` returned is `true` if you want to handle that file stream.

# `unstable_createMemoryUploadHandler`

**Example:**

```tsx
export const action = async ({ request }: ActionArgs) => {
  const uploadHandler = unstable_createMemoryUploadHandler({
    maxPartSize: 500_000,
  });
  const formData = await unstable_parseMultipartFormData(
    request,
    uploadHandler
  );

  const file = formData.get("avatar");

  // file is a "File" (https://mdn.io/File) polyfilled for node
  // ... etc
};
```

**Options:** The only options supported are `maxPartSize` and `filter` which work the same as in `unstable_createFileUploadHandler` above. This API is not recommended for anything at scale, but is a convenient utility for simple use cases and as a fallback for another handler.

# Remix CLI

The Remix CLI comes from the `@remix-run/dev` package. It also includes the compiler. Make sure it is in your `package.json` `devDependencies` so it doesn't get deployed to your server.

To get a full list of available commands and flags, run:

```sh
npx @remix-run/dev -h
```

## `remix create`

`remix create` will create a new Remix project. Without passing arguments, this command will launch an interactive CLI to configure the new project and set it up in a given directory. Optionally you can pass the desired directory path as an argument and a starter template with the `--template` flag.

```sh
remix create <projectDir>
```

### `remix create --template`

A valid template can be:

- a directory located in the [ folder of the Remix repository][templates-folder-of-the-remix-repository]
- a local file path to a directory of files
- a local file path to a tarball
- the name of a `:username/:repo` on GitHub
- the URL of a remote tarball

```sh
remix create ./my-app --template fly
remix create ./my-app --template /path/to/remix-template
remix create ./my-app --template /path/to/remix-template.tar.gz
remix create ./my-app --template remix-run/grunge-stack
remix create ./my-app --template :username/:repo
remix create ./my-app --template https://github.com/:username/:repo
remix create ./my-app --template https://github.com/:username/:repo/tree/:branch
remix create ./my-app --template https://github.com/:username/:repo/archive/refs/tags/:tag.tar.gz
remix create ./my-app --template https://github.com/:username/:repo/releases/latest/download/:tag.tar.gz
remix create ./my-app --template https://example.com/remix-template.tar.gz
```

<aside aria-label="Private GitHub repo templates">
<docs-info>

To create a new project from a template in a private GitHub repo, pass the `--token` flag a personal access token with access to that repo.

</docs-info>
</aside>

## `remix build`

Builds your app for production. This command will set `process.env.NODE_ENV` to `production` and minify the output for deployment.

```sh
remix build
```

### `remix build --sourcemap`

Generates sourcemaps for the production build.

## `remix watch`

Watches your application files and builds your app for development when changes are made.

```sh
remix watch
```

## `remix dev`

The same as `watch`, but also boots the [Remix App Server][remix-app-server] in development mode if it's installed.

```sh
remix dev
```

### `remix dev --debug`

Attaches a [Node inspector][node-inspector] to develop your app in debug mode.

### `remix dev --port`

Launches the app server on a given port.

By default, the port is set to `3000`. If port `3000` is unavailable, the `dev` command will attempt to find another port that is open. Using the `--port` flag will only attempt to launch the server at the given port; if the port is unavailable, the app will not start.

```sh
remix dev --port 4001
```

Alternatively, a port can be assigned to the `PORT` environment variable.

# Server Adapters

## Official Adapters

Idiomatic Remix apps can generally be deployed anywhere because Remix adapt's the server's request/response to the [Web Fetch API][web-fetch-api]. It does this through adapters. We maintain a few adapters:

- `@remix-run/architect`
- `@remix-run/cloudflare-pages`
- `@remix-run/cloudflare-workers`
- `@remix-run/express`
- `@remix-run/netlify`
- `@remix-run/vercel`

These adapters are imported into your server's entry and are not used inside of your Remix app itself.

If you initialized your app with `npx create-remix@latest` with something other than the built-in Remix App Server, you will note a `server/index.js` file that imports and uses one of these adapters.

`<docs-info>`If you're using the built-in Remix App Server, you don't interact with this API`</docs-info>`

Each adapter has the same API. In the future we may have helpers specific to the platform you're deploying to.

## Community Adapters

-  - For [Google Cloud][google-cloud-functions] and [Firebase][firebase-functions] functions.

## Creating an Adapter

### `createRequestHandler`

Creates a request handler for your server to serve the app. This is the ultimate entry point of your Remix application.

```ts
const {
  createRequestHandler,
} = require("@remix-run/{adapter}");
createRequestHandler({ build, getLoadContext });
```

Here's a full example with express:

```ts
const express = require("express");
const {
  createRequestHandler,
} = require("@remix-run/express");

const app = express();

// needs to handle all verbs (GET, POST, etc.)
app.all(
  "*",
  createRequestHandler({
    // `remix build` and `remix dev` output files to a build directory, you need
    // to pass that build to the request handler
    build: require("./build"),

    // return anything you want here to be available as `context` in your
    // loaders and actions. This is where you can bridge the gap between Remix
    // and your server
    getLoadContext(req, res) {
      return {};
    },
  })
);
```

Here's an example with Architect (AWS):

```ts
const {
  createRequestHandler,
} = require("@remix-run/architect");
exports.handler = createRequestHandler({
  build: require("./build"),
});
```

Here's an example with Vercel:

```ts
const {
  createRequestHandler,
} = require("@remix-run/vercel");
module.exports = createRequestHandler({
  build: require("./build"),
});
```

Here's an example with Netlify:

```ts
const path = require("path");
const {
  createRequestHandler,
} = require("@remix-run/netlify");

const BUILD_DIR = path.join(process.cwd(), "netlify");

function purgeRequireCache() {
  // purge require cache on requests for "server side HMR" this won't let
  // you have in-memory objects between requests in development,
  // netlify typically does this for you, but we've found it to be hit or
  // miss and some times requires you to refresh the page after it auto reloads
  // or even have to restart your server
  for (const key in require.cache) {
    if (key.startsWith(BUILD_DIR)) {
      delete require.cache[key];
    }
  }
}

exports.handler =
  process.env.NODE_ENV === "production"
    ? createRequestHandler({ build: require("./build") })
    : (event, context) => {
        purgeRequireCache();
        return createRequestHandler({
          build: require("./build"),
        })(event, context);
      };
```

Here's an example with the simplified Cloudflare Workers API:

```ts
import { createEventHandler } from "@remix-run/cloudflare-workers";

import * as build from "../build";

addEventListener("fetch", createEventHandler({ build }));
```

Here's an example with the lower-level Cloudflare Workers API:

```ts
import {
  createRequestHandler,
  handleAsset,
} from "@remix-run/cloudflare-workers";

import * as build from "../build";

const handleRequest = createRequestHandler({ build });

const handleEvent = async (event: FetchEvent) => {
  let response = await handleAsset(event, build);

  if (!response) {
    response = await handleRequest(event);
  }

  return response;
};

addEventListener("fetch", (event) => {
  try {
    event.respondWith(handleEvent(event));
  } catch (e: any) {
    if (process.env.NODE_ENV === "development") {
      event.respondWith(
        new Response(e.message || e.toString(), {
          status: 500,
        })
      );
    }

    event.respondWith(
      new Response("Internal Error", { status: 500 })
    );
  }
});
```

# Remix App Server

While you can bring your own server, Remix ships with a built-in, production-ready application server.

```sh
remix-serve <server-build-path>
```

Depending on `process.env.NODE_ENV`, the server will boot in development or production mode.

The `server-build-path` needs to point to the `serverBuildDirectory` defined in `remix.config.js`.

Because only the build artifacts (`build/`, `public/build/`) need to be deployed to production, the `remix.config.js` is not guaranteed to be available in production, so you need to tell Remix where your server build is with this option.

In development, `remix-serve` will ensure the latest code is run by purging the require cache for every request. This has some effects on your code you might need to be aware of:

- Any values in the module scope will be "reset"

  ```tsx
  // this will be reset for every request because the module cache was
  // cleared and this will be required brand new
  const cache = new Map();

  export async function loader({ params }: LoaderArgs) {
    if (cache.has(params.foo)) {
      return json(cache.get(params.foo));
    }

    const record = await fakeDb.stuff.find(params.foo);
    cache.set(params.foo, record);
    return json(record);
  }
  ```

  If you need a workaround for preserving cache in development, you can store it in the global variable.

  ```tsx
  // since the cache is stored in global it will only
  // be recreated when you restart your dev server.
  const cache = () => {
    if (!global.uniqueCacheName) {
      global.uniqueCacheName = new Map();
    }

    return global.uniqueCacheName;
  };

  export async function loader({ params }: LoaderArgs) {
    if (cache.has(params.foo)) {
      return json(cache.get(params.foo));
    }

    const record = await fakeDb.stuff.find(params.foo);
    cache.set(params.foo, record);
    return json(record);
  }
  ```
- Any **module side effects** will remain in place! This may cause problems, but should probably be avoided anyway.

  ```tsx
  import { json } from "@remix-run/node"; // or cloudflare/deno

  // this starts running the moment the module is imported
  setInterval(() => {
    console.log(Date.now());
  }, 1000);

  export async function loader() {
    // ...
  }
  ```

  If you need to write your code in a way that has these types of module side-effects, you should set up your own [@remix-run/express][remix-run-express] server and a tool in development like pm2-dev or nodemon to restart the server on file changes instead.

In production this doesn't happen. The server boots up and that's the end of it.

# `@remix-run/node`

This package contains utilities and polyfills for Node.js.

`<docs-info>`Most of the time you will never be importing from this package directly as it's used internally by adapters such as `@remix-run/express`.`</docs-info>`

## Polyfills

Since Remix relies on browser API's such as fetch that are not natively available in Node.js you may find that your unit tests fail without these globals when running with tools such as Jest.

Your testing framework should provide you with a hook or location to polyfill globals / mock out API's; here you can add the following lines to install the globals that Remix relies on:

```ts
import { installGlobals } from "@remix-run/node"; // or cloudflare/deno

// This installs globals such as "fetch", "Response", "Request" and "Headers".
installGlobals();
```

<docs-info>
  Keep in mind that we install these for you automatically in your actual app, so you should only need to do this in your test environment.
</docs-info>

# Asset URL Imports

Any files inside the `app` folder can be imported into your modules. Remix will:

1. Copy the file to your browser build directory
2. Fingerprint the file for long-term caching
3. Return the public URL to your module to be used while rendering

It's most common for stylesheets, but can used for anything.

```tsx
import type { LinksFunction } from "@remix-run/node"; // or cloudflare/deno

import styles from "./styles/app.css";
import banner from "./images/banner.jpg";

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: styles }];
};

export default function Page() {
  return (
    <div>
      <h1>Some Page</h1>
      <img src={banner} />
    </div>
  );
}
```

# React Router v6

Remix is built on top of React Router v6. Here are the most common APIs that you'll use in your Remix app:

- 
- 
- 
- 
- 

Most of the other APIs are either used internally by Remix or just aren't commonly needed in your app.

# Web Fetch API

When browsers added `window.fetch`, they also add three other objects: `Headers`, `Request`, and `Response`. Remix is built upon this API.

When you do this:

```js
const res = await fetch(url);
```

That `res` is an instance of `Response`. And you can make a response yourself:

```js
const res = new Response(
  JSON.stringify({ hello: "there" })
);
const json = await res.json();
console.log(json);
// { hello: "there" }
```

Rather than pick a server-side API, Remix adopts the Web Fetch API for all http handling. Note that our deployment wrappers like `@remix-run/express` are simply adapters between the deployment server's API and the Web API. `@remix-run/express` interprets a Web API Response that you return from a loader or your server entry into an express response.

While you can use these APIs directly in Remix, you'll typically use response helpers instead:

- [json][json]
- [redirect][redirect]

## Globally Available

Remix adds `Request`, `Response`, `Headers`, and `fetch` to your loader's global context, so you can use them anywhere just like in the browser. We figure if `"what".blink()` made it into the global context of node, we can add these browser globals to make Remix a little nicer to work with.

## MDN Docs

[https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API][https-developer-mozilla-org-en-us-docs-web-api-fetch-api]

# Accessibility

Accessibility in a Remix app looks a lot like accessibility on the web in general. Using proper semantic markup and following the [Web Content Accessibility Guidelines (WCAG)][wcag] will get you most of the way there.

Remix makes certain accessibility practices the default where possible and provides APIs to help where it's not. We are actively exploring and developing new APIs to make this even easier in the future.

## Links

The [ component][link] renders a standard anchor tag, meaning that you get its accessibility behaviors from the browser for free!

Remix also provides the  which behaves the same as `<Link>`, but it also provides context for assistive technology when the link points to the current page. This is useful for building navigation menus or breadcrumbs.

## Routing

If you are rendering  in your app, there are some important things to consider to make client-side routing more accessible for your users.

With a traditional multi-page website we don't have to think about route changes too much. Your app renders an anchor tag, and the browser handles the rest. If your users disable JavaScript, your Remix app should already work this way by default!

When the client scripts in Remix are loaded, React Router takes control of routing and prevents the browser's default behavior. Remix doesn't make any assumptions about your UI as the route changes. There are some important features you'll want to consider as a result, including:

- **Focus management:** What element receives focus when the route changes? This is important for keyboard users and can be helpful for screen-reader users.
- **Live-region announcements:** Screen-reader users also benefit from announcements when a route has changed. You may want to also notify them during certain transition states depending on the nature of the change and how long loading is expected to take.

In 2019, [Marcy Sutton led and published findings from user research][marcy-sutton-led-and-published-findings-from-user-research] to help developers build accessible client-side routing experiences. We encourage you to read the article in detail. We are actively investigating and testing internal solutions as well as new APIs to simplify this process.

# API Routes

You might be used to building React apps that don't run on the server, or least not very much of it does, so it's backed by a set of API routes. In Remix, most of your routes are both your UI and your API, so Remix in the browser knows how to talk to itself on the server.

In general, you don't need the concept of "API Routes" at all. But we knew you'd come poking around with this term, so here we are!

## Routes Are Their Own API

Consider this route:

```tsx
export async function loader() {
  return json(await getTeams());
}

export default function Teams() {
  return (
    <TeamsView teams={useLoaderData<typeof loader>()} />
  );
}
```

Whenever the user clicks a link to `<Link to="/teams" />`, Remix in the browser will perform the fetch to the server to get the data from the `loader` and render the route. The entire task of loading data into components has been taken care of. You don't need API routes for data requirements of your route components, they are already their own API.

## Call Loaders Outside of Navigation

There are times, however, that you want to get the data from a loader but not because the user is visiting the route, but the current page needs that route's data for some reason. A very clear example is a `<Combobox>` component that queries the database for records and suggests them to the user.

You can `useFetcher` for cases like this. And once again, since Remix in the browser knows about Remix on the server, you don't have to do much to get the data. Remix's error handling kicks in, and race conditions, interruptions, and fetch cancellations are handled for you, too.

For example, you could have a route to handle the search:

```tsx
export async function loader({ request }: LoaderArgs) {
  const url = new URL(request.url);
  return json(
    await searchCities(url.searchParams.get("q"))
  );
}
```

And then `useFetcher` along with Reach UI's combobox input:

```tsx
function CitySearchCombobox() {
  const cities = useFetcher();

  return (
    <cities.Form method="get" action="/city-search">
      <Combobox aria-label="Cities">
        <div>
          <ComboboxInput
            name="q"
            onChange={(event) =>
              cities.submit(event.target.form)
            }
          />
          {cities.state === "submitting" ? (
            <Spinner />
          ) : null}
        </div>

        {cities.data ? (
          <ComboboxPopover className="shadow-popup">
            {cities.data.error ? (
              <p>Failed to load cities :(</p>
            ) : cities.data.length ? (
              <ComboboxList>
                {cities.data.map((city) => (
                  <ComboboxOption
                    key={city.id}
                    value={city.name}
                  />
                ))}
              </ComboboxList>
            ) : (
              <span>No results found</span>
            )}
          </ComboboxPopover>
        ) : null}
      </Combobox>
    </cities.Form>
  );
}
```

## Resource Routes

In other cases, you may need routes that are part of your application, but aren't part of your application's UI. Maybe you want a loader that renders a report as a PDF:

```tsx
export async function loader({ params }: LoaderArgs) {
  const report = await getReport(params.id);
  const pdf = await generateReportPDF(report);
  return new Response(pdf, {
    status: 200,
    headers: {
      "Content-Type": "application/pdf",
    },
  });
}
```

If a route is not called by Remix UI (like `<Link>` or `useFetcher`), and does not export a default component, it is now a general purpose Resource Route. If called with `GET`, the loader's response is returned. If called with `POST`, `PUT`, `PATCH`, or `DELETE`, the action's response is returned.

Here are a handful of use cases to get you thinking.

- JSON API for a mobile app that reuses server-side code with the Remix UI
- Dynamically generating PDFs
- Dynamically generating social images for blog posts or other pages
- Webhooks for other services

You can read more in the [Resource Routes][resource-routes] docs.

# Backend For Your Frontend

While Remix can serve as your fullstack application, it also fits perfectly into the "Backend for your Frontend" architecture.

The BFF strategy employs a web server with a job scoped to serving the frontend web app and connecting it to the services it needs: your database, mailer, job queues, existing backend APIs (REST, GraphQL), etc. Instead of your UI integrating directly from the browser to these services, it connects to the BFF and the BFF connects to your services.

Mature apps already have a lot of backend application code in Ruby, Elixir, PHP, etc. and there's no reason to justify migrating it all to a server-side JavaScript runtime just to get the benefits of Remix. Instead, you can use your Remix app as a backend for your frontend.

Because Remix polyfills the Web Fetch API, you can use `fetch` right from your loaders and actions to your backend.

```tsx
import type { LoaderArgs } from "@remix-run/node"; // or cloudflare/deno
import { json } from "@remix-run/node"; // or cloudflare/deno
import escapeHtml from "escape-html";

export async function loader({ request }: LoaderArgs) {
  let apiUrl = "http://api.example.com/some-data.json";
  let res = await fetch(apiUrl, {
    headers: {
      Authorization: `Bearer ${process.env.API_TOKEN}`,
    },
  });

  let data = await res.json();

  let prunedData = data.map((record) => {
    return {
      id: record.id,
      title: record.title,
      formattedBody: escapeHtml(record.content),
    };
  });
  return json(prunedData);
}
```

There are several benefits of this approach vs. fetching directly from the browser. The highlighted lines above show how you can:

1. Simplify third party integrations and keep tokens and secrets out of client bundles.
2. Prune the data down to send less kB over the network, speeding up your app significantly.
3. Move a lot of code from browser bundles to the server, like `escapeHtml`, which speeds up your app. Additionally, moving code to the server usually makes your code easier to maintain since server-side code doesn't have to worry about UI states for async operations.

Again, Remix can be used as your only server by talking directly to the database and other services with server-side JavaScript APIs, but it also works perfectly as a backend for your frontend. Go ahead and keep your existing API server for application logic and let Remix connect the UI to it.

# Browser Support

Remix only runs in browsers that support [ES Modules][esm-browsers].

Usually teams are concerned about IE11 support when asking this question. Note that [Microsoft itself has stopped supporting this browser][msie] for their web applications and it's probably time for you, too.

However, thanks to first-class support for [Progressive Enhancement][pe], Remix apps can support browsers as old as Netscape 1.0! This works because Remix is built on the foundations of the web: HTML, HTTP, and browser behavior. By following Remix conventions, your app can work at a baseline level for IE11, while still providing a highly-interactive SPA experience for modern browsers. It doesn't take much effort on your part to achieve this, either.

Here's how it works. The Remix `<Scripts/>` component renders module script tags like this:

```html
<script type="module" src="..." />
```

Older browsers ignore it because they don't understand the `type`, so no JavaScript is loaded. Links, loaders, forms, and actions still work because they are built on the foundations of HTML, HTTP and browser behavior. Modern browsers will load the scripts, providing enhanced SPA behavior with faster transitions and the enhanced UX of your application code.

## Does Remix implement CSRF protection?

Remix cookies are configured to `SameSite=Lax` by default which is a platform built-in protection against CSRF, if you need to support old browsers (IE11 or older) that doesn't support `SameSite=Lax` you would have to implement CSRF protection yourself or use a library that implements it.

# Data Loading

One of the primary features of Remix is simplifying interactions with the server to get data into components. When you follow these conventions, Remix can automatically:

- Server render your pages
- Be resilient to network conditions when JavaScript fails to load
- Make optimizations as the user interacts with your site to make it fast by only loading data for the changing parts of the page
- Fetch data, JavaScript modules, CSS and other assets in parallel on transitions, avoiding render+fetch waterfalls that lead to choppy UI
- Ensure the data in the UI is in sync with the data on the server by revalidating after [actions][action]
- Excellent scroll restoration on back/forward clicks (even across domains)
- Handle server-side errors with [error boundaries][error-boundary]
- Enable solid UX for "Not Found" and "Unauthorized" with [catch boundaries][catch-boundary]
- Help you keep the happy path of your UI happy

## Basics

Each route module can export a component and a .  will provide the loader's data to your component:

```tsx
import { json } from "@remix-run/node"; // or cloudflare/deno
import { useLoaderData } from "@remix-run/react";

export const loader = async () => {
  return json([
    { id: "1", name: "Pants" },
    { id: "2", name: "Jacket" },
  ]);
};

export default function Products() {
  const products = useLoaderData<typeof loader>();
  return (
    <div>
      <h1>Products</h1>
      {products.map((product) => (
        <div key={product.id}>{product.name}</div>
      ))}
    </div>
  );
}
```

The component renders on the server and in the browser. The loader _only runs on the server_. That means our hard-coded products array doesn't get included in the browser bundles and it's safe to use server-only for APIs and SDKs for things like database, payment processing, content management systems, etc.

If your server-side modules end up in client bundles, move the imports for those modules to a file named `{something}.server.ts` with the `.server.ts` suffix to ensure they are excluded.

## Route Params

When you name a file with `$` like `routes/users/$userId.tsx` and `routes/users/$userId/projects/$projectId.tsx` the dynamic segments (the ones starting with `$`) will be parsed from the URL and passed to your loader on a `params` object.

```tsx
import type { LoaderArgs } from "@remix-run/node"; // or cloudflare/deno

export const loader = async ({ params }: LoaderArgs) => {
  console.log(params.userId);
  console.log(params.projectId);
};
```

Given the following URLs, the params would be parsed as follows:

| URL                               | `params.userId` | `params.projectId` |
| --------------------------------- | ----------------- | -------------------- |
| `/users/123/projects/abc`       | `"123"`         | `"abc"`            |
| `/users/aec34g/projects/22cba9` | `"aec34g"`      | `"22cba9"`         |

These params are most useful for looking up data:

```tsx
import type { LoaderArgs } from "@remix-run/node"; // or cloudflare/deno
import { json } from "@remix-run/node"; // or cloudflare/deno

export const loader = async ({ params }: LoaderArgs) => {
  return json(
    await fakeDb.project.findMany({
      where: {
        userId: params.userId,
        projectId: params.projectId,
      },
    })
  );
};
```

### Param Type Safety

Because these params come from the URL and not your source code, you can't know for sure if they will be defined. That's why the types on the param's keys are `string | undefined`. It's good practice to validate before using them, especially in TypeScript to get type safety. Using `invariant` makes it easy.

```tsx
import type { LoaderArgs } from "@remix-run/node"; // or cloudflare/deno
import invariant from "tiny-invariant";

export const loader = async ({ params }: LoaderArgs) => {
  invariant(params.userId, "Expected params.userId");
  invariant(params.projectId, "Expected params.projectId");

  params.projectId; // <-- TypeScript now knows this is a string
};
```

While you may be uncomfortable throwing errors like this with `invariant` when it fails, remember that in Remix you know the user will end up in the [error boundary][error-boundary] where they can recover from the problem instead of a broken UI.

## External APIs

Remix polyfills the `fetch` API on your server so it's very easy to fetch data from existing JSON APIs. Instead of managing state, errors, race conditions, and more yourself, you can do the fetch from your loader (on the server) and let Remix handle the rest.

```tsx
import { json } from "@remix-run/node"; // or cloudflare/deno
import { useLoaderData } from "@remix-run/react";

export async function loader() {
  const res = await fetch("https://api.github.com/gists");
  return json(await res.json());
}

export default function GistsRoute() {
  const gists = useLoaderData<typeof loader>();
  return (
    <ul>
      {gists.map((gist) => (
        <li key={gist.id}>
          <a href={gist.html_url}>{gist.id}</a>
        </li>
      ))}
    </ul>
  );
}
```

This is great when you already have an API to work with and don't care or need to connect directly to your data source in your Remix app.

## Databases

Since Remix runs on your server, you can connect directly to a database in your route modules. For example, you could connect to a Postgres database with [Prisma][prisma].

```tsx
import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();
export { db };
```

And then your routes can import it and make queries against it:

```tsx
import type { LoaderArgs } from "@remix-run/node"; // or cloudflare/deno
import { json } from "@remix-run/node"; // or cloudflare/deno
import { useLoaderData } from "@remix-run/react";

import { db } from "~/db.server";

export const loader = async ({ params }: LoaderArgs) => {
  return json(
    await db.product.findMany({
      where: {
        categoryId: params.categoryId,
      },
    })
  );
};

export default function ProductCategory() {
  const products = useLoaderData<typeof loader>();
  return (
    <div>
      <p>{products.length} Products</p>
      {/* ... */}
    </div>
  );
}
```

If you are using TypeScript, you can use type inference to use Prisma Client generated types when calling `useLoaderData`. This allows better type safety and intellisense when writing code that uses the loaded data.

```tsx
import type { LoaderArgs } from "@remix-run/node"; // or cloudflare/deno
import { json } from "@remix-run/node"; // or cloudflare/deno
import { useLoaderData } from "@remix-run/react";

import { db } from "~/db.server";

async function getLoaderData(productId: string) {
  const product = await db.product.findUnique({
    where: {
      id: productId,
    },
    select: {
      id: true,
      name: true,
      imgSrc: true,
    },
  });

  return product;
}

export const loader = async ({ params }: LoaderArgs) => {
  return json(await getLoaderData(params.productId));
};

export default function Product() {
  const product = useLoaderData<typeof loader>();
  return (
    <div>
      <p>Product {product.id}</p>
      {/* ... */}
    </div>
  );
}
```

## Cloudflare KV

If you picked Cloudflare Pages or Workers as your environment, [Cloudflare Key Value][cloudflare-kv] storage allows you to persist data at the edge as if it were a static resource.

For Pages, to start with local development, you need to add a `--kv` parameter with a name of your namespace to the package.json task, so it would look like this:

```
"dev:wrangler": "cross-env NODE_ENV=development wrangler pages dev ./public --kv PRODUCTS_KV"
```

For the Cloudflare Workers environment you'll need to [do some other configuration][cloudflare-kv-setup].

This enables you to use the `PRODUCTS_KV` in a loader context (KV stores are added to loader context automatically by the Cloudflare Pages adapter):

```tsx
import type { LoaderArgs } from "@remix-run/cloudflare";
import { json } from "@remix-run/cloudflare";
import { useLoaderData } from "@remix-run/react";

export const loader = async ({
  context,
  params,
}: LoaderArgs) => {
  return json(
    await context.PRODUCTS_KV.get(
      `product-${params.productId}`,
      { type: "json" }
    )
  );
};

export default function Product() {
  const product = useLoaderData<typeof loader>();
  return (
    <div>
      <p>Product</p>
      {product.name}
    </div>
  );
}
```

## Not Found

While loading data it's common for a record to be "not found". As soon as you know you can't render the component as expected, `throw` a response and Remix will stop executing code in the current loader and switch over to the nearest [catch boundary][catch-boundary].

```tsx
export const loader = async ({
  params,
  request,
}: LoaderArgs) => {
  const product = await db.product.findOne({
    where: { id: params.productId },
  });

  if (!product) {
    // we know we can't render the component
    // so throw immediately to stop executing code
    // and show the not found page
    throw new Response("Not Found", { status: 404 });
  }

  const cart = await getCart(request);
  return json({
    product,
    inCart: cart.includes(product.id),
  });
};
```

## URL Search Params

URL Search Params are the portion of the URL after a `?`. Other names for this are "query string", "search string", or "location search". You can access the values by creating a URL out of the `request.url`:

```tsx
import type { LoaderArgs } from "@remix-run/node"; // or cloudflare/deno
import { json } from "@remix-run/node"; // or cloudflare/deno

export const loader = async ({ request }: LoaderArgs) => {
  const url = new URL(request.url);
  const term = url.searchParams.get("term");
  return json(await fakeProductSearch(term));
};
```

There are a few web platform types at play here:

- The  object has a `url` property
- [URL constructor][url] that parses the URL string into an object
- `url.searchParams` is an instance of [URLSearchParams][url-search-params], which is a parsed version of the location search string that makes it easy to read and manipulate the search string

Given the following URLs, the search params would be parsed as follows:

| URL                               | `url.searchParams.get("term")` |
| --------------------------------- | -------------------------------- |
| `/products?term=stretchy+pants` | `"stretchy pants"`             |
| `/products?term=`               | `""`                           |
| `/products`                     | `null`                         |

### Data Reloads

When multiple nested routes are rendering and the search params change, all of the routes will be reloaded (instead of just the new or changed routes). This is because search params are a cross-cutting concern and could effect any loader. If you would like to prevent some of your routes from reloading in this scenario, use [shouldReload][should-reload].

### Search Params in Components

Sometimes you need to read and change the search params from your component instead of your loaders and actions. There are handful of ways to do this depending on your use case.

**Setting Search Params**

Perhaps the most common way to set search params is letting the user control them with a form:

```tsx
export default function ProductFilters() {
  return (
    <Form method="get">
      <label htmlFor="nike">Nike</label>
      <input
        type="checkbox"
        id="nike"
        name="brand"
        value="nike"
      />

      <label htmlFor="adidas">Adidas</label>
      <input
        type="checkbox"
        id="adidas"
        name="brand"
        value="adidas"
      />

      <button type="submit">Update</button>
    </Form>
  );
}
```

If the user only has one selected:

- [X] Nike
- [ ] Adidas

Then the URL will be `/products/shoes?brand=nike`

If the user has both selected:

- [X] Nike
- [X] Adidas

Then the url will be: `/products/shoes?brand=nike&brand=adidas`

Note that `brand` is repeated in the URL search string since both checkboxes were named `"brand"`. In your loader you can get access to all of those values with 

```tsx
import type { LoaderArgs } from "@remix-run/node"; // or cloudflare/deno
import { json } from "@remix-run/node"; // or cloudflare/deno

export async function loader({ request }: LoaderArgs) {
  const url = new URL(request.url);
  const brands = url.searchParams.getAll("brand");
  return json(await getProducts({ brands }));
}
```

**Linking to Search Params**

As the developer, you can control the search params by linking to URLs with search strings in them. The link will replace the current search string in the URL (if there is one) with what is in the link:

```tsx
<Link to="?brand=nike">Nike (only)</Link>
```

**Reading Search Params in Components**

In addition to reading search params in loaders, you often need access to them in components, too:

```tsx
import { useSearchParams } from "@remix-run/react";

export default function ProductFilters() {
  const [searchParams] = useSearchParams();
  const brands = searchParams.getAll("brand");

  return (
    <Form method="get">
      <label htmlFor="nike">Nike</label>
      <input
        type="checkbox"
        id="nike"
        name="brand"
        value="nike"
        defaultChecked={brands.includes("nike")}
      />

      <label htmlFor="adidas">Adidas</label>
      <input
        type="checkbox"
        id="adidas"
        name="brand"
        value="adidas"
        defaultChecked={brands.includes("adidas")}
      />

      <button type="submit">Update</button>
    </Form>
  );
}
```

You might want to auto submit the form on any field change, for that there is :

```tsx
import {
  useSubmit,
  useSearchParams,
} from "@remix-run/react";

export default function ProductFilters() {
  const submit = useSubmit();
  const [searchParams] = useSearchParams();
  const brands = searchParams.getAll("brand");

  return (
    <Form
      method="get"
      onChange={(e) => submit(e.currentTarget)}
    >
      {/* ... */}
    </Form>
  );
}
```

**Setting Search Params Imperatively**

While uncommon, you can also set searchParams imperatively at any time for any reason. The use cases here are slim, so slim we couldn't even come up with a good one, but here's a silly example:

```tsx
import { useSearchParams } from "@remix-run/react";

export default function ProductFilters() {
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const id = setInterval(() => {
      setSearchParams({ now: Date.now() });
    }, 1000);
    return () => clearInterval(id);
  }, [setSearchParams]);

  // ...
}
```

### Search Params and Controlled Inputs

Often you want to keep some inputs, like checkboxes, in sync with the search params in the URL. This can get a little tricky with React's controlled component concept.

This is only needed if the search params can be set in two ways and we want the inputs to stay in sync with the search params. For example, both the `<input type="checkbox">` and the `Link` can change the brand in this component:

```tsx
import { useSearchParams } from "@remix-run/react";

export default function ProductFilters() {
  const [searchParams] = useSearchParams();
  const brands = searchParams.getAll("brand");

  return (
    <Form method="get">
      <p>
        <label htmlFor="nike">Nike</label>
        <input
          type="checkbox"
          id="nike"
          name="brand"
          value="nike"
          defaultChecked={brands.includes("nike")}
        />
        <Link to="?brand=nike">(only)</Link>
      </p>

      <button type="submit">Update</button>
    </Form>
  );
}
```

If the user clicks the checkbox and submits the form, the URL updates and the checkbox state changes too. But if the user clicks the link _only the url will update and not the checkbox_. That's not what we want. You may be familiar with React's controlled components here and think to switch it to `checked` instead of `defaultChecked`:

```tsx
<input
  type="checkbox"
  id="adidas"
  name="brand"
  value="adidas"
  checked={brands.includes("adidas")}
/>
```

Now we have the opposite problem: clicking the link updates both the URL and the checkbox state but _the checkbox no longer works_ because React prevents the state from changing until the URL that controls it changes--and it never will because we can't change the checkbox and resubmit the form.

React wants you to control it with some state but we want the user to control it until they submit the form, and then we want the URL to control it when it changes. So we're in this "sorta-controlled" spot.

You have two choices, and what you pick depends on the user experience you want.

**First Choice**: The simplest thing is to auto-submit the form when the user clicks the checkbox:

```tsx
import {
  useSubmit,
  useSearchParams,
} from "@remix-run/react";

export default function ProductFilters() {
  const submit = useSubmit();
  const [searchParams] = useSearchParams();
  const brands = searchParams.getAll("brand");

  return (
    <Form method="get">
      <p>
        <label htmlFor="nike">Nike</label>
        <input
          type="checkbox"
          id="nike"
          name="brand"
          value="nike"
          onChange={(e) => submit(e.currentTarget.form)}
          checked={brands.includes("nike")}
        />
        <Link to="?brand=nike">(only)</Link>
      </p>

      {/* ... */}
    </Form>
  );
}
```

(If you are also auto submitting on the form `onChange`, make sure to `e.stopPropagation()` so the event doesn't bubble up to the form, otherwise you'll get double submissions on every click of the checkbox.)

**Second Choice**: If you want the input to be "semi controlled", where the checkbox reflects the URL state, but the user can also toggle it on and off before submitting the form and changing the URL, you'll need to wire up some state. It's a bit of work but straightforward:

- Initialize some state from the search params
- Update the state when the user clicks the checkbox so the box changes to "checked"
- Update the state when the search params change (the user submitted the form or clicked the link) to reflect what's in the url search params

```tsx
import {
  useSubmit,
  useSearchParams,
} from "@remix-run/react";

export default function ProductFilters() {
  const submit = useSubmit();
  const [searchParams] = useSearchParams();
  const brands = searchParams.getAll("brand");

  const [nikeChecked, setNikeChecked] = React.useState(
    // initialize from the URL
    brands.includes("nike")
  );

  // Update the state when the params change
  // (form submission or link click)
  React.useEffect(() => {
    setNikeChecked(brands.includes("nike"));
  }, [brands, searchParams]);

  return (
    <Form method="get">
      <p>
        <label htmlFor="nike">Nike</label>
        <input
          type="checkbox"
          id="nike"
          name="brand"
          value="nike"
          onChange={(e) => {
            // update checkbox state w/o submitting the form
            setNikeChecked(true);
          }}
          checked={nikeChecked}
        />
        <Link to="?brand=nike">(only)</Link>
      </p>

      {/* ... */}
    </Form>
  );
}
```

You might want to make an abstraction for checkboxes like this:

```tsx
<div>
  <SearchCheckbox name="brand" value="nike" />
  <SearchCheckbox name="brand" value="reebok" />
  <SearchCheckbox name="brand" value="adidas" />
</div>;

function SearchCheckbox({ name, value }) {
  const [searchParams] = useSearchParams();
  const all = searchParams.getAll(name);
  const [checked, setChecked] = React.useState(
    all.includes(value)
  );

  React.useEffect(() => {
    setChecked(all.includes(value));
  }, [all, searchParams, value]);

  return (
    <input
      type="checkbox"
      name={name}
      value={value}
      checked={checked}
      onChange={(e) => setChecked(e.target.checked)}
    />
  );
}
```

**Option 3**: We said there were only two options, but there is a third unholy option that might tempt you if you know React pretty well. You might want to blow away the input and remount it with `key` prop shenanigans. While clever, this will cause accessibility issues as the user will lose focus when React removes the node from the document after they click it.

`<docs-error>`Don't do this, it will cause accessibility issues`</docs-error>`

```tsx
<input
  type="checkbox"
  id="adidas"
  name="brand"
  value="adidas"
  key={"adidas" + brands.includes("adidas")}
  defaultChecked={brands.includes("adidas")}
/>
```

## Remix Optimizations

Remix optimizes the user experiences by only loading the data for the parts of the page that are changing on navigation. For example, consider the UI you're using right now in these docs. The navbar on the side is in a parent route that fetched the dynamically-generated menu of all the docs, and the child route fetched the document you're reading right now. If you click a link in the sidebar, Remix knows that the parent route will remain on the page - but the child route's data will change because the url param for the document will change. With this insight, Remix _will not refetch the parent route's data_.

Without Remix the next question is "how do I reload all of the data?". This is built into Remix as well. Whenever an [action][action] is called (the user submitted a form or you, the programmer, called `submit` from `useSubmit`), Remix will automatically reload all of the routes on the page to capture any changes that might have happened.

You don't have to worry about expiring caches or avoid overfetching data as the user interacts with your app, it's all automatic.

There are three cases where Remix will reload all of your routes:

- After an action (forms, `useSubmit`, )
- If the url search params change (any loader could use them)
- The user clicks a link to the exact same URL they are already at (this will also replace the current entry in the history stack)

All of these behaviors emulate the browser's default behavior. In these cases, Remix doesn't know enough about your code to optimize the data loading, but you can optimize it yourself with [unstable_shouldReload][should-reload].

## Data Libraries

Thanks to Remix's data conventions and nested routes, you'll usually find you don't need to reach for client side data libraries like React Query, SWR, Apollo, Relay, urql and others. If you're using global state management libraries like redux, primarily for interacting with data on the server, it's also unlikely you'll need those.

Of course, Remix doesn't prevent you from using them (unless they require bundler integration). You can bring whatever React data libraries you like and use them wherever you think they'll serve your UI better than the Remix APIs. In some cases you can use Remix for the initial server render and then switch over to your favorite library for the interactions afterward.

That said, if you bring an external data library and sidestep Remix's own data conventions, Remix can no longer automatically

- Server render your pages
- Be resilient to network conditions when JavaScript fails to load
- Make optimizations as the user interacts with your site to make it fast by only loading data for the changing parts of the page
- Fetch data, JavaScript modules, CSS and other assets in parallel on transitions, avoiding render+fetch waterfalls that lead to choppy UI
- Ensure the data in the UI is in sync with the data on the server by revalidating after actions
- Excellent scroll restoration on back/forward clicks (even across domains)
- Handle server-side errors with [error boundaries][error-boundary]
- Enable solid UX for "Not Found" and "Unauthorized" with [catch boundaries][catch-boundary]
- Help you keep the happy path of your UI happy.

Instead you'll need to do extra work to provide a good user experience.

Remix is designed to meet any user experience you can design. While it's unexpected that you _need_ an external data library, you might still _want_ one and that's fine!

As you learn Remix, you'll find you shift from thinking in client state to thinking in URLs, and you'll get a bunch of stuff for free when you do.

## Gotchas

Loaders are only called on the server, via `fetch` from the browser, so your data is serialized with `JSON.stringify` and sent over the network before it makes it to your component. This means your data needs to be serializable. For example:

`<docs-error>`This won't work!`</docs-error>`

```tsx
export async function loader() {
  return {
    date: new Date(),
    someMethod() {
      return "hello!";
    },
  };
}

export default function RouteComp() {
  const data = useLoaderData<typeof loader>();
  console.log(data);
  // '{"date":"2021-11-27T23:54:26.384Z"}'
}
```

Not everything makes it! Loaders are for _data_, and data needs to be serializable.

Some databases (like [FaunaDB][fauna]) return objects with methods that you'll want to be careful to serialize before returning from your loader. Usually this isn't a problem, but it's good to understand that your data is traveling over the network.

Additionally, Remix will call your loaders for you, in no case should you ever try to call your loader directly:

`<docs-error>`This will not work`</docs-error>`

```tsx
export const loader = async () => {
  return json(await fakeDb.products.findMany());
};

export default function RouteComp() {
  const data = loader();
  // ...
}
```

# Data Writes

Data writes (some people call these mutations) in Remix are built on top of two fundamental web APIs: `<form>` and HTTP. We then use progressive enhancement to enable optimistic UI, loading indicators, and validation feedback--but the programming model is still built on HTML forms.

When the user submits a form, Remix will:

1. Call the action for the form
2. Reload all of the data for all of the routes on the page

Many times people reach for global state management libraries in React like redux, data libs like apollo, and fetch wrappers like React Query in order to help manage getting server state into your components and keeping the UI in sync with it when the user changes it. Remix's HTML based API replaces the majority of use cases for these tools. Remix knows how to load the data as well as how to revalidate it after it changes when you use standard HTML APIs.

There are a few ways to call an action and get the routes to revalidate:

- 
- 
- 

This guide only covers `<Form>`. We suggest you read the docs for the other two after this guide to get a sense of how to use them. Most of this guide applies to `useSubmit` but `useFetcher` is a bit different.

## Plain HTML Forms

After teaching workshops with our company `<a href="https://reacttraining.com">`React Training`</a>` for years, we've learned that a lot of newer web developers (though no fault of their own) don't actually know how `<form>` works!

Since Remix `<Form>` works identically to `<form>` (with a couple of extra goodies for optimistic UI etc.), we're going to brush up on plain ol' HTML forms, so you can learn both HTML and Remix at the same time.

### HTML Form HTTP Verbs

Native forms support two HTTP verbs: `GET` and `POST`. Remix uses these verbs to understand your intent. If it's a GET, Remix will figure out what parts of the page are changing and only fetch the data for the changing layouts, and use the cached data for the layouts that don't change. When it's a POST, Remix will reload all data to ensure it captures the update from the server. Let's take a look at both.

### HTML Form GET

A `GET` is just a normal navigation where the form data is passed in the URL search params. You use it for normal navigation, just like `<a>` except the user gets to provide the data in the search params through the form. Aside from search pages, its use with `<form>` is pretty rare.

Consider this form:

```html
<form method="get" action="/search">
  <label>Search <input name="term" type="text" /></label>
  <button type="submit">Search</button>
</form>
```

When the user fills it out and clicks submit, the browser automatically serializes the form values into a URL search param string and navigates to the form's `action` with the query string appended. Let's say the user typed in "remix". The browser would navigate to `/search?term=remix`. If we changed the input to `<input name="q"/>` then the form would navigate to `/search?q=remix`.

It's the same behavior as if we had created this link:

```html
<a href="/search?term=remix">Search for "remix"</a>
```

With the unique difference that the **user** got to supply the information.

If you have more fields, the browser will add them:

```html
<form method="get" action="/search">
  <fieldset>
    <legend>Brand</legend>
    <label>
      <input name="brand" value="nike" type="checkbox" />
      Nike
    </label>
    <label>
      <input name="brand" value="reebok" type="checkbox" />
      Reebok
    </label>
    <label>
      <input name="color" value="white" type="checkbox" />
      White
    </label>
    <label>
      <input name="color" value="black" type="checkbox" />
      Black
    </label>
    <button type="submit">Search</button>
  </fieldset>
</form>
```

Depending on which checkboxes the user clicks, the browser will navigate to URLs like:

```
/search?brand=nike&color=black
/search?brand=nike&brand=reebok&color=white
```

### HTML Form POST

When you want to create, delete, or update data on your website, a form post is the way to go. And we don't just mean big forms like a user profile edit page. Even "Like" buttons can be handled with a form.

Let's consider a "new project" form.

```html
<form method="post" action="/projects">
  <label><input name="name" type="text" /></label>
  <label><textarea name="description"></textarea></label>
  <button type="submit">Create</button>
</form>
```

When the user submits this form, the browser will serialize the fields into a request "body" (instead of URL search params) and "POST" it to the server. This is still a normal navigation as if the user clicked a link. The difference is two-fold: the user provided the data for the server and the browser sent the request as a "POST" instead of a "GET".

The data is made available to the server's request handler so you can create the record. After that, you return a response. In this case, you'd probably redirect to the newly-created project. A remix action would look something like this:

```tsx
export async function action({ request }: ActionArgs) {
  const body = await request.formData();
  const project = await createProject(body);
  return redirect(`/projects/${project.id}`);
}
```

The browser started at `/projects/new`, then posted to `/projects` with the form data in the request, then the server redirected the browser to `/projects/123`. While this is all happening, the browser goes into its normal "loading" state: the address progress bar fills up, the favicon turns into a spinner, etc. It's actually a decent user experience.

If you're newer to web development, you may not have ever used a form this way. Lots of folks have always done:

```js
<form
  onSubmit={(event) => {
    event.preventDefault();
    // good luck!
  }}
/>
```

If this is you, you're going to be delighted when you see just how easy mutations can be when you just use what browsers (and Remix) have built in!

## Remix Mutation, Start to Finish

We're going to build a mutation from start to finish with:

1. JavaScript optional
2. Validation
3. Error handling
4. Progressively-enhanced loading indicators
5. Progressively-enhanced error display

You use the Remix `<Form>` component for data mutations the same way you use HTML forms. The difference is now you get access to pending form state to build a nicer user experience: like contextual loading indicators and "optimistic UI".

Whether you use `<form>` or `<Form>` though, you write the very same code. You can start with a `<form>` and then graduate it to `<Form>` without changing anything. After that, add in the special loading indicators and optimistic UI. However, if you're not feeling up to it, or deadlines are tight, just use a `<form>` and let the browser handle the user feedback! Remix `<Form>` is the realization of "progressive enhancement" for mutations.

### Building the form

Let's start with our project form from earlier but make it usable:

Let's say you've got the route `app/routes/projects/new.js` with this form in it:

```tsx
export default function NewProject() {
  return (
    <form method="post" action="/projects/new">
      <p>
        <label>
          Name: <input name="name" type="text" />
        </label>
      </p>
      <p>
        <label>
          Description:
          <br />
          <textarea name="description" />
        </label>
      </p>
      <p>
        <button type="submit">Create</button>
      </p>
    </form>
  );
}
```

Now add the route action. Any form submissions that are "post" will call your data "action". Any "get" submissions (`<Form method="get">`) will be handled by your "loader".

```tsx
import type { ActionArgs } from "@remix-run/node"; // or cloudflare/deno
import { redirect } from "@remix-run/node"; // or cloudflare/deno

// Note the "action" export name, this will handle our form POST
export const action = async ({ request }: ActionArgs) => {
  const formData = await request.formData();
  const project = await createProject(formData);
  return redirect(`/projects/${project.id}`);
};

export default function NewProject() {
  // ... same as before
}
```

And that's it! Assuming `createProject` does what we want it to, that's all you have to do. Note that no matter what kind of SPA you may have built in the past, you always need a server-side action and a form to get data from the user. The difference with Remix is **that's all you need** (and that's how the web used to be, too.)

Of course, we started complicating things to try to create better user experiences than the default browser behavior. Keep going, we'll get there, but we won’t have to change any of the code we've already written to get the core functionality.

### Form Validation

It's common to validate forms both client-side and server-side. It's also (unfortunately) common to only validate client-side, which leads to various issues with your data that we don't have time to get into right now. Point is, if you're validating in only one place, do it on the server. You'll find with Remix that's the only place you care to anymore (the less you send to the browser the better!).

We know, we know, you want to animate in nice validation errors and stuff. We'll get to that. But right now we're just building a basic HTML form and user flow. We'll keep it simple first, then make it fancy.

Back in our action, maybe we have an API that returns validation errors like this.

```tsx
const [errors, project] = await createProject(formData);
```

If there are validation errors, we want to go back to the form and display them.

```tsx
import { json, redirect } from "@remix-run/node"; // or cloudflare/deno

export const action = async ({ request }: ActionArgs) => {
  const formData = await request.formData();
  const [errors, project] = await createProject(formData);

  if (errors) {
    const values = Object.fromEntries(formData);
    return json({ errors, values });
  }

  return redirect(`/projects/${project.id}`);
};
```

Just like `useLoaderData` returns the values from the `loader`, `useActionData` will return the data from the action. It will only be there if the navigation was a form submission, so you always have to check if you've got it or not.

```tsx
import type { ActionArgs } from "@remix-run/node"; // or cloudflare/deno
import { json, redirect } from "@remix-run/node"; // or cloudflare/deno
import { useActionData } from "@remix-run/react";

export const action = async ({ request }: ActionArgs) => {
  // ...
};

export default function NewProject() {
  const actionData = useActionData<typeof action>();

  return (
    <form method="post" action="/projects/new">
      <p>
        <label>
          Name:{" "}
          <input
            name="name"
            type="text"
            defaultValue={actionData?.values.name}
          />
        </label>
      </p>

      {actionData?.errors.name ? (
        <p style={{ color: "red" }}>
          {actionData.errors.name}
        </p>
      ) : null}

      <p>
        <label>
          Description:
          <br />
          <textarea
            name="description"
            defaultValue={actionData?.values.description}
          />
        </label>
      </p>

      {actionData?.errors.description ? (
        <p style={{ color: "red" }}>
          {actionData.errors.description}
        </p>
      ) : null}

      <p>
        <button type="submit">Create</button>
      </p>
    </form>
  );
}
```

Notice how we add `defaultValue` to all of our inputs. Remember, this is regular HTML `<form>`, so it's just normal browser/server stuff happening. We're getting the values back from the server so the user doesn't have to re-type what they had.

You can ship this code as-is. The browser will handle the pending UI and interruptions for you. Enjoy your weekend and make it fancy on Monday.

### Graduate to `<Form>` and add pending UI

Let's use progressive enhancement to make this UX a bit more fancy. By changing it from `<form>` to `<Form>`, Remix will emulate the browser behavior with `fetch`. It will also give you access to the pending form data so you can build pending UI.

```tsx
import { json, redirect } from "@remix-run/node"; // or cloudflare/deno
import { useActionData, Form } from "@remix-run/react";

// ...

export default function NewProject() {
  const actionData = useActionData<typeof action>();

  return (
    // note the capital "F" <Form> now
    <Form method="post">{/* ... */}</Form>
  );
}
```

`<docs-error>`HOLD UP! If all you do is change your form to Form, you made the UX a little worse!`</docs-error>`

If you don't have the time or drive to do the rest of the job here, use `<Form reloadDocument>`. This lets the browser continue to handle the pending UI state (spinner in the favicon of the tab, progress bar in the address bar, etc.) If you simply use `<Form>` without implementing pending UI, the user will have no idea anything is happening when they submit a form.

`<docs-info>`We recommend always using capital-F Form, and if you want to let the browser handle the pending UI, use the `<code>`\<Form reloadDocument>`</code>` prop.`</docs-info>`

Now let's add some pending UI so the user has a clue something happened when they submit. There's a hook called `useTransition`. When there is a pending form submission, Remix will give you the serialized version of the form as a `<a href="https://developer.mozilla.org/en-US/docs/Web/API/FormData">FormData``</a>` object. You'll be most interested in the `<a href="https://developer.mozilla.org/en-US/docs/Web/API/FormData/get">formData.get()``</a>` method.

```tsx
import { json, redirect } from "@remix-run/node"; // or cloudflare/deno
import {
  useActionData,
  Form,
  useTransition,
} from "@remix-run/react";

// ...

export default function NewProject() {
  // when the form is being processed on the server, this returns different
  // transition states to help us build pending and optimistic UI.
  const transition = useTransition();
  const actionData = useActionData<typeof action>();

  return (
    <Form method="post">
      <fieldset
        disabled={transition.state === "submitting"}
      >
        <p>
          <label>
            Name:{" "}
            <input
              name="name"
              type="text"
              defaultValue={
                actionData
                  ? actionData.values.name
                  : undefined
              }
            />
          </label>
        </p>

        {actionData && actionData.errors.name ? (
          <p style={{ color: "red" }}>
            {actionData.errors.name}
          </p>
        ) : null}

        <p>
          <label>
            Description:
            <br />
            <textarea
              name="description"
              defaultValue={
                actionData
                  ? actionData.values.description
                  : undefined
              }
            />
          </label>
        </p>

        {actionData && actionData.errors.description ? (
          <p style={{ color: "red" }}>
            {actionData.errors.description}
          </p>
        ) : null}

        <p>
          <button type="submit">
            {transition.state === "submitting"
              ? "Creating..."
              : "Create"}
          </button>
        </p>
      </fieldset>
    </Form>
  );
}
```

Pretty slick! Now when the user clicks "Create", the inputs go disabled, and the submit button's text changes. The whole operation should be faster now too since there's just one network request happening instead of a full page reload (which involves potentially more network requests, reading assets from the browser cache, parsing JavaScript, parsing CSS, etc.).

We didn't do much with `transition` on this page, but it's got all the information about the submission on `transition.submission`, including all of the values being processed on the server on `submission.formData`.

### Animating in the Validation Errors

Now that we're using JavaScript to submit this page, our validation errors can be animated in because the page is stateful. First we'll make a fancy component that animates height and opacity:

```tsx
function ValidationMessage({ error, isSubmitting }) {
  const [show, setShow] = useState(!!error);

  useEffect(() => {
    const id = setTimeout(() => {
      const hasError = !!error;
      setShow(hasError && !isSubmitting);
    });
    return () => clearTimeout(id);
  }, [error, isSubmitting]);

  return (
    <div
      style={{
        opacity: show ? 1 : 0,
        height: show ? "1em" : 0,
        color: "red",
        transition: "all 300ms ease-in-out",
      }}
    >
      {error}
    </div>
  );
}
```

Now we can wrap our old error messages in this new fancy component, and even turn the borders of our fields red that have errors:

```tsx
export default function NewProject() {
  const transition = useTransition();
  const actionData = useActionData<typeof action>();

  return (
    <Form method="post">
      <fieldset
        disabled={transition.state === "submitting"}
      >
        <p>
          <label>
            Name:{" "}
            <input
              name="name"
              type="text"
              defaultValue={
                actionData
                  ? actionData.values.name
                  : undefined
              }
              style={{
                borderColor: actionData?.errors.name
                  ? "red"
                  : "",
              }}
            />
          </label>
        </p>

        {actionData?.errors.name ? (
          <ValidationMessage
            isSubmitting={transition.state === "submitting"}
            error={actionData?.errors?.name}
          />
        ) : null}

        <p>
          <label>
            Description:
            <br />
            <textarea
              name="description"
              defaultValue={actionData?.values.description}
              style={{
                borderColor: actionData?.errors.description
                  ? "red"
                  : "",
              }}
            />
          </label>
        </p>

        <ValidationMessage
          isSubmitting={transition.state === "submitting"}
          error={actionData?.errors.description}
        />

        <p>
          <button type="submit">
            {transition.state === "submitting"
              ? "Creating..."
              : "Create"}
          </button>
        </p>
      </fieldset>
    </Form>
  );
}
```

Boom! Fancy UI without having to change anything about how we communicate with the server. It's also resilient to network conditions that prevent JS from loading.

### Review

- First we built the project form without JavaScript in mind. A simple form, posting to a server-side action. Welcome to 1998.
- Once that worked, we used JavaScript to submit the form by changing `<form>` to `<Form>`, but we didn't have to do anything else!
- Now that there was a stateful page with React, we added loading indicators and animation for the validation errors by simply asking Remix for the state of the transition.

From your components perspective, all that happened was the `useTransition` hook caused a state update when the form was submitted, and then another state update when the data came back. Of course, a lot more happened inside of Remix, but as far as your component is concerned, that's it. Just a couple of state updates. This makes it really easy to dress up any user flow.

## See also

- [Form][form]
- [useTransition][use-transition]
- [Actions][actions]
- [Loaders][loaders]
- 
- 

# Deployment

Remix maintains a few starter templates to help you deploy to various servers right from the start. You should be able to initialize your app and get it live within a couple of minutes.

Running `npx create-remix@latest` will prompt you to pick a deployment target:

```sh
npx create-remix@latest
? Where do you want to deploy? (Use arrow keys)
❯ Remix App Server
  Architect
  Cloudflare Workers
  Fly.io
  Netlify
  Vercel
```

Each target has unique file structures, configuration files, cli commands that need to be run, server environment variables to be set etc. Because of this, it's important to read the README.md to deploy the app. It's got all of the steps you need to take to get your app live within minutes.

`<docs-info>`After initializing an app, make sure to read the README.md`</docs-info>`

Additionally, Remix doesn't abstract over your infrastructure, so the templates don't hide anything about where you're deploying to (you may want other functions besides the Remix app!). You're welcome to tweak the configuration to suit your needs. Remix runs on your server, but it is not your server.

In a nutshell: if you want to deploy your app, Read the manual 😋

# Disabling JavaScript

Do you ever look at a page on your site and think "why are we loading all of this JavaScript? There's nothing on this page but links!" This may seem a little odd for a JavaScript framework, but you can easily turn off JavaScript with a boolean and your data loading, links, and even forms will still work.

Here's how we like to do it:

Open up each route module you want to include JavaScript for and add a "handle". This is a way for you to provide any kind of meta information about a route to the parent route (as you'll see in a moment).

```js
export const handle = { hydrate: true };
```

Now open `root.tsx`, bring in `useMatches` and add this:

```tsx
import {
  Meta,
  Links,
  Scripts,
  Outlet,
  useMatches,
} from "@remix-run/react";

export default function App() {
  const matches = useMatches();

  // If at least one route wants to hydrate, this will return true
  const includeScripts = matches.some(
    (match) => match.handle?.hydrate
  );

  // then use the flag to render scripts or not
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />
        {/* include the scripts, or not! */}
        {includeScripts ? <Scripts /> : null}
      </body>
    </html>
  );
}
```

All of your data loading will still work on the server render, and all of your `<Link>`s render normal `<a>` underneath, so they will continue to work.

On any page, at anytime, you can flip between plain HTML and full client-side transitions.

If you need one tiny bit of interactivity, use a `<script dangerouslySetInnerHTML>`.

```tsx
return (
  <>
    <select id="qty">
      <option>1</option>
      <option>2</option>
      <option value="contact">
        Contact Sales for more
      </option>
    </select>

    <script
      dangerouslySetInnerHTML={{
        __html: `
          document.addEventListener('DOMContentLoaded', () => {
            document.getElementById('qty').onchange = (event) => {
              if (event.target.value === "contact") {
                window.location.assign("/contact")
              }
            }
          });
        `,
      }}
    />
  </>
);
```

# Environment Variables

Remix does not do anything directly with environment variables (except during local development), but there are some patterns we find useful that we'll share in this guide.

Environment Variables are values that live on the server that your application can use. You may be familiar with the ubiquitous `NODE_ENV`. Your deployment server probably automatically sets that to "production".

`<docs-warning>`Running `remix build` compiles using the value of `process.env.NODE_ENV` if it corresponds with a valid mode: "production", "development" or "test". If the value of `process.env.NODE_ENV` is invalid, "production" is used as a default.`</docs-warning>`

Here are some example environment variables you might find in the wild:

- `DATABASE_URL`: The URL for a Postgres Database
- `STRIPE_PRIVATE_KEY`: The key a checkout workflow will use on the server
- `STRIPE_PUBLIC_KEY`: The key a checkout workflow will use on the browser

If your experience with web development is primarily with the JS frameworks in the last few years, you might think of these as something for your build to use. While they can be useful for bundling code, traditionally those are "build arguments" not environment variables. Environment variables are most useful _at runtime on the server_. For example, you can change an environment variable to change the behavior of your app without rebuilding or even redeploying.

## Server Environment Variables

### Local Development

If you're using the `remix dev` server to run your project locally, it has built-in support for [dotenv][dotenv].

First, create an `.env` file in the root of your project:

```sh
touch .env
```

`<docs-error>`Do not commit your `<code>`.env`</code>` file to git, the point is that it contains secrets!`</docs-error>`

Edit your `.env` file.

```
SOME_SECRET=super-secret
```

Then, when running `remix dev` you will be able to access those values in your loaders/actions:

```js
export async function loader() {
  console.log(process.env.SOME_SECRET);
}
```

If you're using the `@remix-run/cloudflare-pages` adapter, env variables work a little differently. Since Cloudflare Pages are powered by Functions, you'll need to define your local environment variables in the  file. It has the same syntax as `.env` example file mentioned above.

Then, in your `loader` functions, you can access environment variables directly on `context`:

```tsx
export const loader = async ({ context }: LoaderArgs) => {
  console.log(context.SOME_SECRET);
};
```

Note that `.env` files are only for development. You should not use them in production, so Remix doesn't load them when running `remix serve`. You'll need to follow your host's guides on adding secrets to your production server, via the links below.

### Production

Environment variables when deployed to production will be handled by your host, for example:

- [Netlify][netlify]
- [Fly.io][fly-io]
- [Cloudflare Pages][cloudflare-pages]
- [Cloudflare Workers][cloudflare-workers]
- [Vercel][vercel]
- [Architect][architect]

## Browser Environment Variables

Some folks ask if Remix can let them put environment variables into browser bundles. It's a common strategy in build-heavy frameworks. However, this approach is a problem for a few reasons:

1. It's not really an environment variable. You have to know which server you're deploying to at build time.
2. You can't change the values without a rebuild and redeploy.
3. It's easy to accidentally leak secrets into publicly accessible files!

Instead we recommend keeping all of your environment variables on the server (all the server secrets as well as the stuff your JavaScript in the browser needs) and exposing them to your browser code through `window.ENV`. Since you always have a server, you don't need this information in your bundle, your server can provide the client-side environment variables in the loaders.

1. **Return `ENV` for the client from the root loader** - Inside your loader you can access your server's environment variables. Loaders only run on the server and are never bundled into your client-side JavaScript.

   ```tsx
   export async function loader() {
     return json({
       ENV: {
         STRIPE_PUBLIC_KEY: process.env.STRIPE_PUBLIC_KEY,
         FAUNA_DB_URL: process.env.FAUNA_DB_URL,
       },
     });
   }

   export function Root() {
     return (
       <html lang="en">
         <head>
           <Meta />
           <Links />
         </head>
         <body>
           <Outlet />
           <Scripts />
         </body>
       </html>
     );
   }
   ```
2. **Put `ENV` on window** - This is how we hand off the values from the server to the client. Make sure to put this before `<Scripts/>`

   ```tsx
   export async function loader() {
     return json({
       ENV: {
         STRIPE_PUBLIC_KEY: process.env.STRIPE_PUBLIC_KEY,
       },
     });
   }

   export function Root() {
     const data = useLoaderData<typeof loader>();
     return (
       <html lang="en">
         <head>
           <Meta />
           <Links />
         </head>
         <body>
           <Outlet />
           <script
             dangerouslySetInnerHTML={{
               __html: `window.ENV = ${JSON.stringify(
                 data.ENV
               )}`,
             }}
           />
           <Scripts />
         </body>
       </html>
     );
   }
   ```
3. **Access the values**

   ```tsx
   import { loadStripe } from "@stripe/stripe-js";

   export async function redirectToStripeCheckout(
     sessionId
   ) {
     const stripe = await loadStripe(
       window.ENV.STRIPE_PUBLIC_KEY
     );
     return stripe.redirectToCheckout({ sessionId });
   }
   ```

# Error Handling

Remix sets a new precedent in web application error handling that you are going to love. Remix automatically catches most errors in your code, on the server or in the browser, and renders the closest  to where the error occurred. If you're familiar with React's `componentDidCatch` and `getDerivedStateFromError` class component hooks, it's just like that but with some extra handling for errors on the server.

Remix will automatically catch errors and render the nearest error boundary for errors thrown while:

- rendering in the browser
- rendering on the server
- in a loader during the initial server-rendered document request
- in an action during the initial server-rendered document request
- in a loader during a client-side transition in the browser (Remix serializes the error and sends it over the network to the browser)
- in an action during a client-side transition in the browser

## Root Error Boundary

If you used one of the starter templates you should already have an [error boundary][error-boundary] in your `root.{tsx|jsx}` file. You’ll want to edit that right away because that’s what your users will see whenever an uncaught error is thrown.

```tsx
export function ErrorBoundary({ error }) {
  console.error(error);
  return (
    <html>
      <head>
        <title>Oh no!</title>
        <Meta />
        <Links />
      </head>
      <body>
        {/* add the UI you want your users to see */}
        <Scripts />
      </body>
    </html>
  );
}
```

You'll want to make sure to still render the Scripts, Meta, and Links components because the whole document will mount and unmount when the root error boundary is rendered.

## Nested Error Boundaries

Each route in the hierarchy is a potential error boundary. If a nested route exports an error boundary, then any errors below it will be caught and rendered there. This means that the rest of the surrounding UI in the parent routes _continue to render normally_ so the user is able to click another link and not lose any client-side state they might have had.

For example, consider these routes:

```sh
routes
├── sales
│   ├── invoices
│   │   └── $invoiceId.js
│   └── invoices.js
└── sales.js
```

If `$invoiceId.js` exports an `ErrorBoundary` and an error is thrown in its component, loader, or action, the rest of the app renders normally and only the invoice section of the page renders the error.

![error in a nested route where the parent route's navigation renders normally](https://remix.run/docs-images/error-boundary.png)

If a route doesn't have an error boundary, the error "bubbles up" to the closest error boundary, all the way to the root, so you don't have to add error boundaries to every route--only when you want to add that extra touch to your UI.

# File Uploads

`<docs-warning>`This doc is a WIP: It was extracted from the API docs for file uploads so it's a bit out of context. We intend to re-write this as a general guide on file uploads.`</docs-warning>`

Most of the time, you'll probably want to proxy the file to a file host.

**Example:**

```tsx
import type {
  ActionArgs,
  UploadHandler,
} from "@remix-run/node"; // or cloudflare/deno
import {
  unstable_composeUploadHandlers,
  unstable_createMemoryUploadHandler,
  unstable_parseMultipartFormData,
} from "@remix-run/node"; // or cloudflare/deno
import { writeAsyncIterableToWritable } from "@remix-run/node"; // `writeAsyncIterableToWritable` is a Node-only utility
import type {
  UploadApiOptions,
  UploadApiResponse,
  UploadStream,
} from "cloudinary";
import cloudinary from "cloudinary";

async function uploadImageToCloudinary(
  data: AsyncIterable<Uint8Array>
) {
  const uploadPromise = new Promise<UploadApiResponse>(
    async (resolve, reject) => {
      const uploadStream =
        cloudinary.v2.uploader.upload_stream(
          {
            folder: "remix",
          },
          (error, result) => {
            if (error) {
              reject(error);
              return;
            }
            resolve(result);
          }
        );
      await writeAsyncIterableToWritable(
        data,
        uploadStream
      );
    }
  );

  return uploadPromise;
}

export const action = async ({ request }: ActionArgs) => {
  const userId = getUserId(request);

  const uploadHandler = unstable_composeUploadHandlers(
    // our custom upload handler
    async ({ name, contentType, data, filename }) => {
      if (name !== "img") {
        return undefined;
      }
      const uploadedImage = await uploadImageToCloudinary(
        data
      );
      return uploadedImage.secure_url;
    },
    // fallback to memory for everything else
    unstable_createMemoryUploadHandler()
  );

  const formData = await unstable_parseMultipartFormData(
    request,
    uploadHandler
  );

  const imageUrl = formData.get("avatar");

  // because our uploadHandler returns a string, that's what the imageUrl will be.
  // ... etc
};
```

The `UploadHandler` function accepts a number of parameters about the file:

| Property    | Type                          | Description                                                                    |
| ----------- | ----------------------------- | ------------------------------------------------------------------------------ |
| name        | string                        | The field name (comes from your HTML form field "name" value)                  |
| data        | AsyncIterable`<Uint8Array>` | The iterable of the file bytes                                                 |
| filename    | string                        | The name of the file that the user selected for upload (like `rickroll.mp4`) |
| contentType | string                        | The content type of the file (like `videomp4`)                               |

Your job is to do whatever you need with the `data` and return a value that's a valid \[`FormData`]\[form-data] value: \[`File`]\[the-browser-file-api], `string`, or `undefined` to skip adding it to the resulting FormData.

### Upload Handler Composition

We have the built-in `unstable_createFileUploadHandler` and `unstable_createMemoryUploadHandler` and we also expect more upload handler utilities to be developed in the future. If you have a form that needs to use different upload handlers, you can compose them together with a custom handler, here's a theoretical example:

```tsx
import type { UploadHandler } from "@remix-run/node"; // or cloudflare/deno
import { unstable_createFileUploadHandler } from "@remix-run/node"; // or cloudflare/deno
import { createCloudinaryUploadHandler } from "some-handy-remix-util";

export const standardFileUploadHandler =
  unstable_createFileUploadHandler({
    directory: "public/calendar-events",
  });

export const cloudinaryUploadHandler =
  createCloudinaryUploadHandler({
    folder: "/my-site/avatars",
  });

export const fileUploadHandler: UploadHandler = (args) => {
  if (args.name === "calendarEvent") {
    return standardFileUploadHandler(args);
  } else if (args.name === "eventBanner") {
    return cloudinaryUploadHandler(args);
  }
  return undefined;
};
```

# MDX

While we believe that a strong separation of data and display is important, we understand that formats that mix the two such as [MDX][mdx] (Markdown with embedded JSX components) have become a popular and powerful authoring format for developers.

`<docs-warning>`Rather than compiling your content at build-time like this document demonstrates, it's typically better UX and DX if you do this at runtime via something like `<a href="https://github.com/kentcdodds/mdx-bundler">`mdx-bundler`</a>`. It's also much more customizable and powerful. However, if you prefer to do this compilation at build-time, continue reading.`</docs-warning>`

Remix has built-in support for using MDX at build-time in two ways:

- You can use a `.mdx` file as one of your route modules
- You can `import` a `.mdx` file into one of your route modules (in `app/routes`)

## Routes

The simplest way to get started with MDX in Remix is to create a route module. Just like `.js` and `.ts` files in your `app/routes` directory, `.mdx` (and `.md`) files will participate in automatic file system based routing.

MDX routes allow you to define both meta and headers as if they were a code based route:

```md
---
meta:
  title: My First Post
  description: Isn't this awesome?
headers:
  Cache-Control: no-cache
---

# Hello Content!
```

The lines in the document above between the `---` are called "frontmatter". You can think of them like metadata for your document, formatted as [YAML][yaml].

You can reference your frontmatter fields through the global `attributes` variable in your MDX:

```mdx
---
componentData:
  label: Hello, World!
---

import SomeComponent from "~/components/some-component";

# Hello MDX!

<SomeComponent {...attributes.componentData} />
```

### Example

By creating a `app/routes/posts/first-post.mdx` we can start writing a blog post:

```mdx
---
meta:
  title: My First Post
  description: Isn't this just awesome?
---

# Example Markdown Post

You can reference your frontmatter data through "attributes". The title of this post is {attributes.meta.title}!
```

### Advanced Example

You can even export all the other things in this module that you can in regular route modules in your mdx files like `loader`, `action`, and `handle`:

```mdx
---
meta:
  title: My First Post
  description: Isn't this awesome?

headers:
  Cache-Control: no-cache

handle:
  someData: abc
---

import styles from "./first-post.css";

export const links = () => [
  { rel: "stylesheet", href: styles },
];

import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

export const loader = async () => {
  return json({ mamboNumber: 5 });
};

export function ComponentUsingData() {
  const { mamboNumber } = useLoaderData<typeof loader>();
  return <div id="loader">Mambo Number: {mamboNumber}</div>;
}

# This is some markdown!

<ComponentUsingData />
```

## Modules

Besides just route level MDX, you can also import these files anywhere yourself as if it were a regular JavaScript module.

When you `import` a `.mdx` file, the exports of the module are:

- **default**: The react component for consumption
- **attributes**: The frontmatter data as an object
- **filename**: The basename of the source file (e.g. "first-post.mdx")

```tsx
import Component, {
  attributes,
  filename,
} from "./first-post.mdx";
```

## Example Blog Usage

The following example demonstrates how you might build a simple blog with MDX, including individual pages for the posts themselves and an index page that shows all posts.

In `app/routes/index.jsx`:

```tsx
import { json } from "@remix-run/node"; // or cloudflare/deno
import { Link, useLoaderData } from "@remix-run/react";

// Import all your posts from the app/routes/posts directory. Since these are
// regular route modules, they will all be available for individual viewing
// at /posts/a, for example.
import * as postA from "./posts/a.mdx";
import * as postB from "./posts/b.md";
import * as postC from "./posts/c.md";

function postFromModule(mod) {
  return {
    slug: mod.filename.replace(/\.mdx?$/, ""),
    ...mod.attributes.meta,
  };
}

export async function loader() {
  // Return metadata about each of the posts for display on the index page.
  // Referencing the posts here instead of in the Index component down below
  // lets us avoid bundling the actual posts themselves in the bundle for the
  // index page.
  return json([
    postFromModule(postA),
    postFromModule(postB),
    postFromModule(postC),
  ]);
}

export default function Index() {
  const posts = useLoaderData<typeof loader>();

  return (
    <ul>
      {posts.map((post) => (
        <li key={post.slug}>
          <Link to={post.slug}>{post.title}</Link>
          {post.description ? (
            <p>{post.description}</p>
          ) : null}
        </li>
      ))}
    </ul>
  );
}
```

Clearly this is not a scalable solution for a blog with thousands of posts. Realistically speaking, writing is hard, so if your blog starts to suffer from too much content, that's an awesome problem to have. If you get to 100 posts (congratulations!), we suggest you rethink your strategy and turn your posts into data stored in a database so that you don't have to rebuild and redeploy your blog every time you fix a typo. You can even keep using MDX with [MDX Bundler][mdx-bundler].

## Advanced Configuration

If you wish to configure your own remark plugins you can do so through the `remix.config.js`'s `mdx` export:

```js
const {
  remarkMdxFrontmatter,
} = require("remark-mdx-frontmatter");

// can be an sync / async function or an object
exports.mdx = async (filename) => {
  const [rehypeHighlight, remarkToc] = await Promise.all([
    import("rehype-highlight").then((mod) => mod.default),
    import("remark-toc").then((mod) => mod.default),
  ]);

  return {
    remarkPlugins: [remarkToc],
    rehypePlugins: [rehypeHighlight],
  };
};
```

# Migrating from React Router

`<docs-info>`If you want a TL;DR version along with a repo outlining a simplified migration, check out our `<a href="https://github.com/kentcdodds/incremental-react-router-to-remix-upgrade-path">`example React Router-to-Remix repo`</a>`.`</docs-info>`

# Migrating your React Router App to Remix

Millions of React applications deployed worldwide are powered by [React Router][react-router]. Chances are you've shipped a few of them! Because Remix is built on top of React Router, we have worked to make migration an easy process you can work through iteratively to avoid huge refactors.

If you aren't already using React Router, we think there are several compelling reasons to reconsider! History management, dynamic path matching, nested routing, and much more. Take a look at the [React Router docs][react-router-docs] and see all what we have to offer.

## Ensure your app uses React Router v6

If you are using an older version of React Router, the first step is to upgrade to v6. Check out the [migration guide from v5 to v6][migration-guide-from-v5-to-v6] and our [backwards compatibility package][backwards-compatibility-package] to upgrade your app to v6 quickly and iteratively.

## Installing Remix

First, you'll need a few of our packages to build on Remix. Follow the instructions below, running all commands from the root of your project.

```shell
npm install @remix-run/react @remix-run/node @remix-run/serve
npm install -D @remix-run/dev
```

## Creating server and browser entrypoints

Most React Router apps run primarily in the browser. The server's only job is to send a single static HTML page while React Router manages the route-based views client-side. These apps generally have a browser entrypoint file like a root `index.js` that looks something like this:

```jsx
import * as ReactDOM from "react-dom";

import App from "./App";

ReactDOM.render(<App />, document.getElementById("app"));
```

Server-rendered React apps are a little different. The browser script is not rendering your app, but is "hydrating" the DOM provided by the server. Hydration is the process of mapping the elements in the DOM to their React component counterparts and setting up event listeners so that your app is interactive.

Let's start by creating two new files:

- `app/entry.server.jsx` (or `entry.server.tsx`)
- `app/entry.client.jsx` (or `entry.client.tsx`)

`<docs-info>`All of your app code in Remix will live in an `app` directory by convention. If your existing app uses a directory with the same name, rename it to something like `src` or `old-app` to differentiate as we migrate to Remix.`</docs-info>`

```js
import { RemixServer } from "@remix-run/react";
import { renderToString } from "react-dom/server";

export default function handleRequest(
  request,
  responseStatusCode,
  responseHeaders,
  remixContext
) {
  let markup = renderToString(
    <RemixServer context={remixContext} url={request.url} />
  );
  responseHeaders.set("Content-Type", "text/html");
  return new Response("<!DOCTYPE html>" + markup, {
    status: responseStatusCode,
    headers: responseHeaders,
  });
}
```

If you are using React 17, your client entrypoint will look like this:

```js
import { RemixBrowser } from "@remix-run/react";
import { hydrate } from "react-dom";

hydrate(<RemixBrowser />, document);
```

In React 18, you'll use `hydrateRoot` instead of `hydrate`.

```js
import { RemixBrowser } from "@remix-run/react";
import { hydrateRoot } from "react-dom/client";

hydrateRoot(document, <RemixBrowser />);
```

## Creating The `root` route

We mentioned that Remix is built on top of React Router. Your app likely renders a `BrowserRouter` with your routes defined in JSX `Route` components. We don't need to do that in Remix, but more on that later. For now we need to provide the lowest level route our Remix app needs to work.

The root route (or the "root root" if you're Wes Bos) is responsible for providing the structure of the application. Its default export is a component that renders the full HTML tree that every other route loads and depends on. Think of it as the scaffold or shell of your app.

In a client-rendered app, you will have an index HTML file that includes the DOM node for mounting your React app. The root route will render markup that mirrors the structure of this file.

Create a new file called `root.jsx` (or `root.tsx`) in your `app` directory. The contents of that file will vary, but let's assume that your `index.html` looks something like this:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <link rel="icon" href="/favicon.ico" />
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1"
    />
    <meta name="theme-color" content="#000000" />
    <meta
      name="description"
      content="My beautiful React app"
    />
    <link rel="apple-touch-icon" href="/logo192.png" />
    <link rel="manifest" href="/manifest.json" />
    <title>My React App</title>
  </head>
  <body>
    <noscript
      >You need to enable JavaScript to run this
      app.</noscript
    >
    <div id="root"></div>
  </body>
</html>
```

In your `root.jsx`, export a component that mirrors its structure:

```js
import { Outlet } from "@remix-run/react";

export default function Root() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        />
        <meta name="theme-color" content="#000000" />
        <meta
          name="description"
          content="My beautiful React app"
        />
        <link rel="apple-touch-icon" href="/logo192.png" />
        <link rel="manifest" href="/manifest.json" />
        <title>My React App</title>
      </head>
      <body>
        <div id="root">
          <Outlet />
        </div>
      </body>
    </html>
  );
}
```

Notice a few things here:

- We got rid of the `noscript` tag. We're server rendering now, which means users who disable JavaScript will still be able to see our app (and over time, as you make [a few tweaks to improve progressive enhancement][a-few-tweaks-to-improve-progressive-enhancement], much of your app should still work).
- Inside of the root element we render an `Outlet` component from `@remix-run/react`. This is the same component that you would normally use to render your matched route in a React Router app; it serves the same function here, but it's adapted for the router in Remix.

`<docs-warning><strong>`Important:`</strong>` be sure to delete the `index.html` from your `public` directory after you've created your root route. Keeping the file around may cause your server to send that HTML instead of your Remix app when accessing the `/` route.`</docs-warning>`

## Adapting your existing app code

First, move the root of your existing React code into your `app` directory. So if your root app code lives in an `src` directory in the project root, it should now be in `app/src`.

We also suggest renaming this directory to make it clear that this is your old code so that, eventually, you can delete it after migrating all of its contents. The beauty of this approach is that you don't have to do it all at once for your app to run as usual. In our demo project we name this directory `old-app`.

Lastly, in your root `App` component (the one that would have been mounted to the `root` element), remove the `<BrowserRouter>` from React Router. Remix takes care of this for you without needing to render the provider directly.

## Creating a catch-all route

Remix needs routes beyond the root route to know what to render in `<Outlet />`. Fortunately you already render `<Route>` components in your app, and Remix can use those as you migrate to use our [routing conventions][routing-conventions].

To start, create a new directory in `app` called `routes`. In that directory, create a file called `$.jsx`. This is called [a ][a-catch-all-route] and it will be useful to let your old app handle routes that you haven't moved into the `routes` directory yet.

Inside of your `$.jsx` file, all we need to do is export the code from our old root `App`:

```js
export { default } from "~/old-app/app";
```

## Replacing the bundler with Remix

Remix provides its own bundler and CLI tools for development and building your app. Chances are your app used something like Create React App to bootstrap, or perhaps you have a custom build set up with Webpack.

In your `package.json` file, update your scripts to use `remix` commands instead of your current build and dev scripts.

```json
{
  "scripts": {
    "build": "remix build",
    "dev": "remix dev",
    "start": "remix-serve build"
  }
}
```

And poof! Your app is now server-rendered and your build went from 90 seconds to 0.5 seconds ⚡

## Creating your routes

Over time you'll want to migrate the routes rendered by React Router's `<Route>` components into their own route files. The filenames and directory structure outlined in our [routing conventions][routing-conventions] will guide this migration.

The default export in your route file is the component rendered in the `<Outlet />`. So if you have a route in your `App` that looks like this:

```jsx
function About() {
  return (
    <main>
      <h1>About us</h1>
      <PageContent />
    </main>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/about" element={<About />} />
    </Routes>
  );
}
```

Your route file should look like this:

```jsx
export default function About() {
  return (
    <main>
      <h1>About us</h1>
      <PageContent />
    </main>
  );
}
```

Once you create this file, you can delete the `<Route>` component from your `App`. After all of your routes have been migrated you can delete `<Routes>` and ultimately all of the code in `old-app`.

## Gotchas and next steps

At this point you _might_ be able to say you are done with the initial migration. Congrats! However Remix does things a bit differently than your typical React app. If it didn't, why would we have bothered building it in the first place? 😅

### Unsafe browser references

A common pain-point in migrating a client-rendered codebase to a server-rendered one is that you may have references to browser APIs in code that runs on the server. A common example can be found when initializing values in state:

```jsx
function Count() {
  let [count, setCount] = React.useState(
    () => localStorage.getItem("count") || 0
  );

  React.useEffect(() => {
    localStorage.setItem("count", count);
  }, [count]);

  return (
    <div>
      <h1>Count: {count}</h1>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  );
}
```

In this example, `localStorage` is used as a global store to persist some data across page reloads. We update `localStorage` with the current value of `count` in `useEffect`, which is perfectly safe because `useEffect` is only ever called in the browser! However initializing state based on `localStorage` is a problem, as this callback is executed on both the server and in the browser.

Your go-to solution may be to check for the `window` object and only run the callback in the browser. However this can lead to another problem, which is the dreaded [hydration mismatch][hydration-mismatch]. React relies on markup rendered by the server to be identical to what is rendered during client hydration. This ensures that `react-dom` knows how to match DOM elements with their corresponding React components so that it can attach event listeners and perform updates as state changes. So if local storage gives us a different value than whatever we initiate on the server, we'll have a new problem to deal with.

#### Client-only components

One potential solution here is using a different caching mechanism that can be used on the server and passed to the component via props passed from a route's [loader data][loader-data]. But if it isn't crucial for your app to render the component on the server, a simpler solution may be to skip rendering altogether on the server and wait until hydration is complete to render it in the browser.

```jsx
// We can safely track hydration in memory state
// outside of the component because it is only
// updated once after the version instance of
// `SomeComponent` has been hydrated. From there,
// the browser takes over rendering duties across
// route changes and we no longer need to worry
// about hydration mismatches until the page is
// reloaded and `isHydrating` is reset to true.
let isHydrating = true;

function SomeComponent() {
  let [isHydrated, setIsHydrated] = React.useState(
    !isHydrating
  );

  React.useEffect(() => {
    isHydrating = false;
    setIsHydrated(true);
  }, []);

  if (isHydrated) {
    return <Count />;
  } else {
    return <SomeFallbackComponent />;
  }
}
```

To simplify this solution, we recommend the using the [ component][client-only-component] in the  community package. An example of its usage can be found in the [ repository][examples-repository].

### `React.lazy` and `React.Suspense`

If you are lazy-loading components with  and , you may run into issues depending on the version of React you are using. Until React 18, this would not work on the server as `React.Suspense` was originally implemented as a browser-only feature.

If you are using React 17, you have a few options:

- Upgrade to React 18
- Use the [client-only approach][client-only-approach] outlined above
- Use an alternative lazy-loading solution such as [Loadable Components][loadable-components]
- Remove `React.lazy` and `React.Suspense` altogether

Keep in mind that Remix automatically handles code-splitting for all your routes that it manages, so as you move things into the `routes` directory you should rarely—if ever—need to use `React.lazy` manually.

### Configuration

Further configuration is optional, but the following may be helpful to optimize your development workflow.

#### `remix.config.js`

Every Remix app accepts a `remix.config.js` file in the project root. While its settings are optional, we recommend you include a few of them for clarity's sake. See the [docs on configuration][docs-on-configuration] for more information about all available options.

```js
/** @type {import('@remix-run/dev').AppConfig} */
module.exports = {
  appDirectory: "app",
  ignoredRouteFiles: ["**/.*"],
  assetsBuildDirectory: "public/build",
};
```

#### `jsconfig.json` or `tsconfig.json`

If you are using TypeScript, you likely already have a `tsconfig.json` in your project. `jsconfig.json` is optional but provides helpful context for many editors. These are the minimal settings we recommend including in your language configuration.

`<docs-info>`Remix uses the `<code>`~~/\_`</code>` path alias to easily import modules from the root no matter where your file lives in the project. If you change the `appDirectory` in your `remix.config.js`, you'll need to update your path alias for `<code>`~~/\_`</code>` as well.`</docs-info>`

```json
{
  "compilerOptions": {
    "jsx": "react-jsx",
    "resolveJsonModule": true,
    "baseUrl": ".",
    "paths": {
      "~/*": ["./app/*"]
    }
  }
}
```

```json
{
  "include": ["remix.env.d.ts", "**/*.ts", "**/*.tsx"],
  "compilerOptions": {
    "lib": ["DOM", "DOM.Iterable", "ES2019"],
    "isolatedModules": true,
    "esModuleInterop": true,
    "jsx": "react-jsx",
    "resolveJsonModule": true,
    "moduleResolution": "node",
    "baseUrl": ".",
    "noEmit": true,
    "paths": {
      "~/*": ["./app/*"]
    }
  }
}
```

If you are using TypeScript, you also need to create the `remix.env.d.ts` file in the root of your project with the appropriate global type references.

```ts
/// <reference types="@remix-run/dev" />
/// <reference types="@remix-run/node" />
```

### A note about non-standard imports

At this point, you _might_ be able to run your app with no changes. If you are using Create React App or a highly-configured Webpack app, you likely use `import` to include non-JavaScript modules like stylesheets and images.

Remix does not support most non-standard imports, and we think for good reason. Below is a non-exhaustive list of some of the differences you'll encounter in Remix, and how to refactor as you migrate.

#### Asset imports

Many bundlers use plugins to allow importing various assets like images and fonts. These typically come into your component as string representing the filepath of the asset.

```js
import logo from "./logo.png";

export function Logo() {
  return <img src={logo} alt="My logo" />;
}
```

In Remix, this works basically the same way. For assets like fonts that are loaded by a `<link>` element, you'll generally import these in a route module and include the filename in an object returned by a `links` function. [See our docs on route ][see-our-docs-on-route-links-for-more-information]

#### SVG imports

Create React App and some Webpack plugins allow you to import SVG files as a React component. This is a common use case for SVG files, but it's not supported by default in Remix.

```js
// This will not work in Remix!
import MyLogo from "./logo.svg";

export function Logo() {
  return <MyLogo />;
}
```

If you want to use SVG files as React components, you'll need to first create the components and import them directly. [React SVGR][react-svgr] is a great toolset that can help you generate these components from the [command line][command-line] or in an [online playground][online-playground] if you prefer to copy and paste.

```svg
<svg xmlns="http://www.w3.org/2000/svg" class="icon" viewBox="0 0 20 20" fill="currentColor">
  <path fill-rule="evenodd" clip-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" />
</svg>
```

```jsx
export default function Icon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon"
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z"
      />
    </svg>
  );
}
```

#### CSS imports

Create React App and many Webpack plugins support importing CSS in your components in many ways. While this is common practice in the React ecosystem, it's not supported the same way in Remix for a few different reasons. We'll discuss this in depth in the next section, but for now just know that you need to import your stylesheets in route modules. Importing stylesheets directly in non-route components is not currently supported.

[Read more about route styles and why Remix does things a bit differently.][read-more-about-route-styles-and-why-remix-does-things-a-bit-differently]

### Route styles

Let's talk a bit more about styles. Remix does not handle CSS imports the same way your bundler likely does, and we think that's for a good reason.

Assume you have a plain CSS import in your `App` component:

```jsx
import { Outlet } from "react-router-dom";

import Logo from "./logo";
import SiteNav from "./site-nav";
import "./styles.css";

export default function App() {
  return (
    <div>
      <header>
        <Logo />
        <SiteNav />
      </header>
      <main>
        <Outlet />
      </main>
      <footer>© Remix Software</footer>
    </div>
  );
}
```

While this is a convenient API, consider a few questions:

- How do the styles actually end up on the page? Do you get a `<link />` or an inline `<style />` in the `<head>`?
- If other components also import CSS, where do they end up in relation other component styles? This has important implications on how the styles are applied due to the cascading nature of CSS.
- As the styles are static assets, are we caching them? Can they be preloaded or lazy loaded?

The answer to all of these questions is up to your bundler, _not you_. We think there's a better way, and it's one that happens to be as old as HTML2: `<link rel="stylesheet" />`.

<docs-info>

**Note:** Remix does not currently support CSS processing directly. If you use preprocessors like Sass, Less, or PostCSS, you can run those as a separate process in development.

We do process [CSS Modules][css-modules], but support is currently [opt-in behind a feature flag][css-modules].

</docs-info>

### Route `links` exports

In Remix, stylesheets can only be loaded from route component files. Importing them does not do anything magical with your styles, rather it returns a URL that can be used to load the stylesheet as you see fit. You can render the stylesheet directly in your component or use our [ export][see-our-docs-on-route-links-for-more-information].

Let's move our app's stylesheet and a few other assets to the `links` function in our root route:

```jsx
import { Links } from "@remix-run/react";

import App from "./app";
import stylesheetUrl from "./styles.css";

export function links() {
  // `links` returns an array of objects whose
  // properties map to the `<link />` component props
  return [
    { rel: "icon", href: "/favicon.ico" },
    { rel: "apple-touch-icon", href: "/logo192.png" },
    { rel: "manifest", href: "/manifest.json" },
    { rel: "stylesheet", href: stylesheetUrl },
  ];
}

export default function Root() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        />
        <meta name="theme-color" content="#000000" />
        <meta
          name="description"
          content="Web site created using create-react-app"
        />
        <Links />
        <title>React App</title>
      </head>
      <body>
        <App />
      </body>
    </html>
  );
}
```

You'll notice on line 32 that we've rendered a `<Links />` component that replaced all of our individual `<link />` components. This is inconsequential if we only ever use links in the root route, but all child routes may export their own links that will also be rendered here. The `links` function can also return a [ object][page-link-descriptor-object] that allows you to prefetch the resources for a page the user is likely to navigate to.

If you currently inject `<link />` tags into your page client-side in your existing route components, either directly or via an abstraction like , you can stop doing that and instead use the `links` export. You get to delete a lot of code and possibly a dependency or two!

### Rendering components in `<head>`

Just as a `<link>` is rendered inside your route component and ultimately rendered in your root `<Links />` component, your app may use some injection trickery to render additional components in the document `<head>`. Often this is done to change the document's `<title>` or `<meta>` tags.

Similar to `links`, each route can also export a `meta` function that—you guessed it—returns a value responsible for rendering `<meta>` tags for that route. This is useful because each route often has its own.

The API is slightly different for `meta`. Instead of an array, it returns an object where the keys represent the meta `name` attribute (or `property` in the case of OpenGraph tags) and the value is the `content` attribute. The object can also accept a `title` property that renders a `<title />` component specifically for that route.

```jsx
export function meta() {
  return {
    title: "About Us",
    "og:title": "About Us",
    description: "Doin hoodrat stuff with our friends",
    "og:description": "Doin hoodrat stuff with our friends",
    "og:image:url": "https://remix.run/og-image.png",
    "og:image:alt": "Just doin a bunch of hoodrat stuff",
  };
}

export default function About() {
  return (
    <main>
      <h1>About us</h1>
      <PageContent />
    </main>
  );
}
```

Again—no more weird dances to get meta into your routes from deep in the component tree. Export them at the route level and let the server handle it. ✨

### Updating imports

Remix re-exports everything you get from `react-router-dom` and we recommend that you update your imports to get those modules from `@remix-run/react`. In many cases, those components are wrapped with additional functionality and features specifically optimized for Remix.

**Before:**

```jsx
import { Link, Outlet } from "react-router-dom";
```

**After:**

```jsx
import { Link, Outlet } from "@remix-run/react";
```

## Final Thoughts

While we've done our best to provide a comprehensive migration guide, it's important to note that we built Remix from the ground up with a few key principles that differ significantly from how many React apps are currently built. While your app will likely run at this point, as you dig through our docs and explore our APIs, we think you'll be able to drastically reduce the complexity of your code and improve the end-user experience of your app. It might take a bit of time to get there, but you can eat that elephant one bite at a time.

Now then, go off and _remix your app_. We think you'll like what you build along the way! 💿

### Further reading

- [Remix philosophy][remix-philosophy]
- [Remix technical explanation][remix-technical-explanation]
- [Data loading in Remix][data-loading-in-remix]
- [Routing in Remix][routing-in-remix]
- [Styling in Remix][styling-in-remix]
- [Frequently asked questions][frequently-asked-questions]
- [Common "gotchas"][common-gotchas]

# Module Constraints

In order for Remix to run your app in both the server and browser environments, your application modules and third-party dependencies need to be careful about **module side effects**.

- **Server-only code** - Remix will remove server-only code but it can't if you have module side effects that use server-only code.
- **Browser-only code** - Remix renders on the server so your modules can't have module side effects or first-rendering logic that call browser-only APIs

## Server Code Pruning

The Remix compiler will automatically remove server code from the browser bundles. Our strategy is actually pretty straightforward, but requires you to follow some rules.

1. It creates a "proxy" module in front of your route module
2. The proxy module only imports the browser specific exports

Consider a route module that exports `loader`, `meta`, and a component:

```tsx
import { json } from "@remix-run/node"; // or cloudflare/deno
import { useLoaderData } from "@remix-run/react";

import PostsView from "../PostsView";
import { prisma } from "../db";

export async function loader() {
  return json(await prisma.post.findMany());
}

export function meta() {
  return { title: "Posts" };
}

export default function Posts() {
  const posts = useLoaderData<typeof loader>();
  return <PostsView posts={posts} />;
}
```

The server needs everything in this file but the browser only needs the component and `meta`. In fact, it'll be completely broken if it includes the `prisma` module in the browser bundle. That thing is full of node-only APIs!

To remove the server code from the browser bundles, the Remix compiler creates a proxy module in front of your route and bundles that instead. The proxy for this route would look like:

```ts
export { meta, default } from "./routes/posts.tsx";
```

The compiler will now analyze the code in `routes/posts.tsx` and only keep code that's inside of `meta` and the component. The result is something like this:

```tsx
import { useLoaderData } from "@remix-run/react";

import PostsView from "../PostsView";

export function meta() {
  return { title: "Posts" };
}

export default function Posts() {
  const posts = useLoaderData<typeof loader>();
  return <PostsView posts={posts} />;
}
```

Pretty slick! This is now safe to bundle up for the browser. So what's the problem?

### No Module Side Effects

If you're unfamiliar with side effects, you're not alone! We'll help you identify them now.

Simply put, a **side effect** is any code that might _do something_. A **module side effect** is any code that might _do something when a module is loaded_.

`<docs-info>`A module side effect is code that executes by simply importing a module`</docs-info>`

Taking our code from earlier, we saw how the compiler can remove the exports and their imports that aren't used. But if we add this seemingly harmless line of code your app will break!

```tsx
import { json } from "@remix-run/node"; // or cloudflare/deno
import { useLoaderData } from "@remix-run/react";

import PostsView from "../PostsView";
import { prisma } from "../db";

console.log(prisma);

export async function loader() {
  return json(await prisma.post.findMany());
}

export function meta() {
  return { title: "Posts" };
}

export default function Posts() {
  const posts = useLoaderData<typeof loader>();
  return <PostsView posts={posts} />;
}
```

That `console.log` _does something_. The module is imported and then immediately logs to the console. The compiler won't remove it because it has to run when the module is imported. It will bundle something like this:

```tsx
import { useLoaderData } from "@remix-run/react";

import PostsView from "../PostsView";
import { prisma } from "../db"; //😬

console.log(prisma); //🥶

export function meta() {
  return { title: "Posts" };
}

export default function Posts() {
  const posts = useLoaderData<typeof loader>();
  return <PostsView posts={posts} />;
}
```

The loader is gone but the prisma dependency stayed! Had we logged something harmless like `console.log("hello!")` it would be fine. But we logged the `prisma` module so the browser's gonna have a hard time with that.

To fix this, remove the side effect by simply moving the code _into the loader_.

```tsx
import { json } from "@remix-run/node"; // or cloudflare/deno
import { useLoaderData } from "@remix-run/react";

import PostsView from "../PostsView";
import { prisma } from "../db";

export async function loader() {
  console.log(prisma);
  return json(await prisma.post.findMany());
}

export function meta() {
  return { title: "Posts" };
}

export default function Posts() {
  const posts = useLoaderData<typeof loader>();
  return <PostsView posts={posts} />;
}
```

This is no longer a module side effect (runs when the module is imported), but rather a side effect of the loader (runs when the loader is called). The compiler will now remove both the loader _and the prisma import_ because it isn't used anywhere else in the module.

Occasionally, the build may have trouble tree-shaking code that should only run on the server. If this happens, you can use the convention of naming a file with the extension `.server` before the file type, for example `db.server.ts`. Adding `.server` to the filename is a hint to the compiler to not worry about this module or its imports when bundling for the browser.

### Higher Order Functions

Some Remix newcomers try to abstract their loaders with "higher order functions". Something like this:

```js
import { redirect } from "@remix-run/node"; // or cloudflare/deno

export function removeTrailingSlash(loader) {
  return function (arg) {
    const { request } = arg;
    const url = new URL(request.url);
    if (
      url.pathname !== "/" &&
      url.pathname.endsWith("/")
    ) {
      return redirect(request.url.slice(0, -1), {
        status: 308,
      });
    }
    return loader(arg);
  };
}
```

And then try to use it like this:

```js
import { removeTrailingSlash } from "~/http";

export const loader = removeTrailingSlash(({ request }) => {
  return { some: "data" };
});
```

You can probably now see that this is a module side effect so the compiler can't prune out the `removeTrailingSlash` code.

This type of abstraction is introduced to try to return a response early. Since you can throw a Response in a loader, we can make this simpler and remove the module side effect at the same time so that the server code can be pruned:

```js
import { redirect } from "@remix-run/node"; // or cloudflare/deno

export function removeTrailingSlash(url) {
  if (url.pathname !== "/" && url.pathname.endsWith("/")) {
    throw redirect(request.url.slice(0, -1), {
      status: 308,
    });
  }
}
```

And then use it like this:

```tsx
import { json } from "@remix-run/node"; // or cloudflare/deno

import { removeTrailingSlash } from "~/http";

export const loader = async ({ request }: LoaderArgs) => {
  removeTrailingSlash(request.url);
  return json({ some: "data" });
};
```

It reads much nicer as well when you've got a lot of these:

```tsx
// this
export const loader = async ({ request }: LoaderArgs) => {
  return removeTrailingSlash(request.url, () => {
    return withSession(request, (session) => {
      return requireUser(session, (user) => {
        return json(user);
      });
    });
  });
};
```

```tsx
// vs. this
export const loader = async ({ request }: LoaderArgs) => {
  removeTrailingSlash(request.url);
  const session = await getSession(request);
  const user = await requireUser(session);
  return json(user);
};
```

If you want to do some extra-curricular reading, google around for "push vs. pull API". The ability to throw responses changes the model from a "push" to a "pull". This is the same reason folks prefer async/await over callbacks, and React hooks over higher order components and render props.

## Browser-Only Code on the Server

Unlike the browser bundles, Remix doesn't try to remove _browser only code_ from the server bundle because the route modules require every export to render on the server. This means it's your job to be mindful of code that should only execute in the browser.

`<docs-error>`This will break your app:`</docs-error>`

```js
import { loadStripe } from "@stripe/stripe-js";

const stripe = await loadStripe(window.ENV.stripe);

export async function redirectToStripeCheckout(sessionId) {
  return stripe.redirectToCheckout({ sessionId });
}
```

`<docs-info>`You need to avoid any browser-only module side effects like accessing window or initializing APIs in the module scope.`</docs-info>`

### Initializing Browser-Only APIs

The most common scenario is initializing a third-party API when your module is imported. There are a couple ways to easily deal with this.

#### Document Guard

This ensures the library is only initialized if there is a `document`, meaning you're in the browser. We recommend `document` over `window` because server runtimes like Deno have a global `window` available.

```js
import firebase from "firebase/app";

if (typeof document !== "undefined") {
  firebase.initializeApp(document.ENV.firebase);
}

export { firebase };
```

#### Lazy Initialization

This strategy defers initialization until the library is actually used:

```js
import { loadStripe } from "@stripe/stripe-js";

export async function redirectToStripeCheckout(sessionId) {
  const stripe = await loadStripe(window.ENV.stripe);
  return stripe.redirectToCheckout({ sessionId });
}
```

You may want to avoid initializing the library multiple times by storing it in a module-scoped variable.

```js
import { loadStripe } from "@stripe/stripe-js";

let _stripe;
async function getStripe() {
  if (!_stripe) {
    _stripe = await loadStripe(window.ENV.stripe);
  }
  return _stripe;
}

export async function redirectToStripeCheckout(sessionId) {
  const stripe = await getStripe();
  return stripe.redirectToCheckout({ sessionId });
}
```

`<docs-info>`While none of these strategies remove browser modules from the server bundle, it's okay because the APIs are only called inside of event handlers and effects, which are not module side effects.`</docs-info>`

### Rendering with Browser Only APIs

Another common case is code that calls browser-only APIs while rendering. When server rendering in React (not just Remix), this must be avoided because the APIs don't exist on the server.

`<docs-error>`This will break your app because the server will try to use local storage`</docs-error>`

```js
function useLocalStorage(key) {
  const [state, setState] = useState(
    localStorage.getItem(key)
  );

  const setWithLocalStorage = (nextState) => {
    setState(nextState);
  };

  return [state, setWithLocalStorage];
}
```

You can fix this by moving the code into `useEffect`, which only runs in the browser.

```jsx
function useLocalStorage(key) {
  const [state, setState] = useState(null);

  useEffect(() => {
    setState(localStorage.getItem(key));
  }, [key]);

  const setWithLocalStorage = (nextState) => {
    setState(nextState);
  };

  return [state, setWithLocalStorage];
}
```

Now `localStorage` is not being accessed on the initial render, which will work for the server. In the browser, that state will fill in immediately after hydration. Hopefully it doesn't cause a big content layout shift though! If it does, maybe move that state into your database or a cookie so you can access it server side.

### `useLayoutEffect`

If you use this hook React will warn you about using it on the server.

This hook is great when you're setting state for things like:

- The position of an element when it pops up (like a menu button)
- The scroll position in response to user interactions

The point is to perform the effect at the same time as the browser paint so that you don't see the popup show up at `0,0` and then bounce into place. Layout effects let the paint and the effect happen at the same time to avoid this kind of flashing.

It is **not** good for setting state that is rendered inside of elements. Just make sure you aren't using the state set in a `useLayoutEffect` in your elements and you can ignore React's warning.

If you know you're calling `useLayoutEffect` correctly and just want to silence the warning, a popular solution in libraries is to create your own hook that doesn't call anything on the server. `useLayoutEffect` only runs in the browser anyway, so this should do the trick. **Please use this carefully, because the warning is there for a good reason!**

```js
import * as React from "react";

const canUseDOM = !!(
  typeof window !== "undefined" &&
  window.document &&
  window.document.createElement
);

const useLayoutEffect = canUseDOM
  ? React.useLayoutEffect
  : () => {};
```

### Third-Party Module Side Effects

Some third party libraries have their own module side effects that are incompatible with React server rendering. Usually it's trying to access `window` for feature detection.

These libraries are incompatible with server rendering in React and therefore incompatible with Remix. Fortunately, very few third party libraries in the React ecosystem do this.

We recommend finding an alternative. But if you can't, we recommend using [patch-package][patch-package] to fix it up in your app.

# Not Found (404) Handling

When a document isn't found on a web server, it should send a [404 status code][404-status-code]. This indicates to machines that the document is not there: search engines won't index it, CDNS won't cache it, etc. Most SPAs today just serve everything as 200 whether the page exists or not, but for you that stops today!

There are two primary cases where a Remix site should send a 404:

- The URL doesn't match any routes in the app
- Your loader didn't find any data

The first case is already handled by Remix, you don't have to throw a response yourself. It knows your routes so it knows if nothing matched (_consider using a [Splat Route][splat-route] to handle this case_). The second case is up to you, but it's really easy.

## How to Send a 404

As soon as you know you don't have what the user is looking for you should _throw a response_.

```tsx
export async function loader({ params }: LoaderArgs) {
  const page = await db.page.findOne({
    where: { slug: params.slug },
  });

  if (!page) {
    throw new Response("Not Found", {
      status: 404,
    });
  }

  return json(page);
}
```

Remix will catch the response and send your app down the [Catch Boundary][catch-boundary] path. It's actually exactly like Remix's automatic [error handling][errors], but instead of exporting an `ErrorBoundary`, you export a `CatchBoundary`.

What's nice about throwing a response is that code in your loader _stops executing_. The rest of your code doesn't have to deal with the chance that the page is defined or not (this is especially handy for TypeScript).

Throwing also ensures that your route component doesn't render if the loader wasn't successful. Your route components only have to consider the "happy path". They don't need pending states, error states, or in our case here, not-found states.

## Root Catch Boundary

You probably already have one at the root of your app. This will handle all thrown responses that weren't handled in a nested route (more on that in a sec). Here's a sample:

```tsx
export function CatchBoundary() {
  const caught = useCatch();
  return (
    <html>
      <head>
        <title>Oops!</title>
        <Meta />
        <Links />
      </head>
      <body>
        <h1>
          {caught.status} {caught.statusText}
        </h1>
        <Scripts />
      </body>
    </html>
  );
}
```

## Nested Catch Boundaries

Just like [errors][errors], nested routes can export their own catch boundary to handle the 404 UI without taking down all of the parent layouts around it, and add some nice UX touches right in context. Bots are happy, SEO is happy, CDNs are happy, users are happy, and your code stays in context, so it seems like everybody involved is happy with this.

```tsx
import type { LoaderArgs } from "@remix-run/node"; // or cloudflare/deno
import {
  Form,
  useLoaderData,
  useParams,
} from "@remix-run/react";

export async function loader({ params }: LoaderArgs) {
  const page = await db.page.findOne({
    where: { slug: params.slug },
  });

  if (!page) {
    throw new Response("Not Found", {
      status: 404,
    });
  }

  return json(page);
}

export function CatchBoundary() {
  const params = useParams();
  return (
    <div>
      <h2>We couldn't find that page!</h2>
      <Form action="../create">
        <button
          type="submit"
          name="slug"
          value={params.slug}
        >
          Create {params.slug}?
        </button>
      </Form>
    </div>
  );
}

export default function Page() {
  return <PageView page={useLoaderData<typeof loader>()} />;
}
```

As you can probably tell, this mechanism isn't just limited to 404s. You can throw any response from a loader or action to send your app down the catch boundary path. For more information, check out the [Catch Boundary][catch-boundary] docs.

# Optimistic UI

Optimistic UI is a pattern to avoid showing busy spinners in your UI and make your application feel like it's responding instantly to user interactions that change data on the server. Even though it will take some time to make it to the server to be processed, we often have enough information in the UI that sent it to fake it. If for some reason it fails, we can then notify the user that there was a problem. In the vast majority of cases, it doesn't fail, and the app can respond instantly to the user's interactions.

Remix can help you build optimistic UI with  and .

## Strategy

1. User submits a form (or you do with  or ).
2. Remix makes the submission and its data immediately available to you on  or .
3. App uses  to render an optimistic version of _what it will render_ when the submission completes successfully.
4. Remix automatically revalidates all the data.
   - If successful, the user doesn't even notice.
   - If it fails, the page data is automatically in sync with the server so the UI reverts automatically.
   - App notifies the user of a problem (which is also likely automatic in Remix with [error boundaries][error-boundary]).

## Example

Consider the workflow for viewing and creating a new project. The project route loads the project and renders it.

```tsx
import type { LoaderArgs } from "@remix-run/node"; // or cloudflare/deno
import { json } from "@remix-run/node"; // or cloudflare/deno
import { useLoaderData } from "@remix-run/react";

import { ProjectView } from "~/components/project";

export async function loader({ params }: LoaderArgs) {
  return json(await findProject(params.id));
}

export default function ProjectRoute() {
  const project = useLoaderData<typeof loader>();
  return <ProjectView project={project} />;
}
```

One of the critical pieces here is that the project route renders a reusable component like `<ProjectView>`, because we'll be using it later for our optimistic version. Perhaps it looks like this:

```tsx
export function ProjectView({ project }) {
  return (
    <div>
      <h2>{project.title}</h2>
      <p>{project.description}</p>
      <ul>
        {project.tasks.map((task) => (
          <li key={task.id}>{task.name}</li>
        ))}
      </ul>
    </div>
  );
}
```

Now we can get to the fun part. Here's what a "new project" route might look like:

```tsx
import type { ActionArgs } from "@remix-run/node"; // or cloudflare/deno
import { redirect } from "@remix-run/node"; // or cloudflare/deno
import { Form } from "@remix-run/react";

import { createProject } from "~/utils";

export const action = async ({ request }: ActionArgs) => {
  const body = await request.formData();
  const newProject = Object.fromEntries(body);
  const project = await createProject(newProject);
  return redirect(`/projects/${project.id}`);
};

export default function NewProject() {
  return (
    <>
      <h2>New Project</h2>
      <Form method="post">
        <label>
          Title: <input name="title" type="text" />
        </label>
        <label htmlFor="description">Description:</label>
        <textarea name="description" id="description" />
        <button type="submit">Create Project</button>
      </Form>
    </>
  );
}
```

At this point, typically you'd render a busy spinner on the page while the user waits for the project to be sent to the server, added to the database, and sent back to the browser and then redirected to the project. Remix makes that pretty easy:

```tsx
import type { ActionArgs } from "@remix-run/node"; // or cloudflare/deno
import { redirect } from "@remix-run/node"; // or cloudflare/deno
import { Form, useNavigation } from "@remix-run/react";

import { createProject } from "~/utils";

export const action = async ({ request }: ActionArgs) => {
  const body = await request.formData();
  const newProject = Object.fromEntries(body);
  const project = await createProject(newProject);
  return redirect(`/projects/${project.id}`);
};

export default function NewProject() {
  const navigation = useNavigation();
  return (
    <>
      <h2>New Project</h2>
      <Form method="post">
        <label>
          Title: <input name="title" type="text" />
        </label>
        <label htmlFor="description">Description:</label>
        <textarea name="description" id="description" />
        <button
          type="submit"
          disabled={navigation.state === "submitting"}
        >
          {navigation.state === "submitting"
            ? "Creating project..."
            : "Create Project"}
        </button>
      </Form>
    </>
  );
}
```

Since we know that almost every time this form is submitted it's going to succeed, we can just skip the busy spinners and show the UI as we know it's going to be: the `<ProjectView>`.

```tsx
import type { ActionArgs } from "@remix-run/node"; // or cloudflare/deno
import { redirect } from "@remix-run/node"; // or cloudflare/deno
import { Form, useNavigation } from "@remix-run/react";

import { ProjectView } from "~/components/project";
import { createProject } from "~/utils";

export const action = async ({ request }: ActionArgs) => {
  const body = await request.formData();
  const newProject = Object.fromEntries(body);
  const project = await createProject(newProject);
  return redirect(`/projects/${project.id}`);
};

export default function NewProject() {
  const navigation = useNavigation();
  return navigation.formData ? (
    <ProjectView
      project={Object.fromEntries(navigation.formData)}
    />
  ) : (
    <>
      <h2>New Project</h2>
      <Form method="post">
        <label>
          Title: <input name="title" type="text" />
        </label>
        <label htmlFor="description">Description:</label>
        <textarea name="description" id="description" />
        <button type="submit">Create Project</button>
      </Form>
    </>
  );
}
```

When the user clicks "Create Project" the UI immediately changes to the `<ProjectView />` while Remix posts the form to the server. When the server succeeds, the app is redirected to the project route. Because they show the same component (`<ProjectView>`), the only thing the user might notice is the URL changed.

One of the hardest parts about implementing optimistic UI is how to handle failures and notify the user. In Remix this happens automatically. In the unlikely event that our server-side action fails, Remix will automatically render the nearest [error boundary][error-boundary] to tell the user something is wrong. The action won't even make it to the `redirect`, so the user didn't actually go anywhere. You can even export an error boundary on the new project route to have more contextual information, but there's nothing wrong with letting some other boundary catch it.

## Maintain Form State

If you want to have more control over the UI when an error occurs and put the user right back where they were without losing any state, you can catch your own error and send it down through action data.

```tsx
import type { ActionArgs } from "@remix-run/node"; // or cloudflare/deno
import { json, redirect } from "@remix-run/node"; // or cloudflare/deno
import {
  Form,
  useActionData,
  useNavigation,
} from "@remix-run/react";

import { ProjectView } from "~/components/project";
import { createProject } from "~/utils";

export const action = async ({ request }: ActionArgs) => {
  const body = await request.formData();
  const newProject = Object.fromEntries(body);
  try {
    const project = await createProject(newProject);
    return redirect(`/projects/${project.id}`);
  } catch (error: unknown) {
    console.error(error);
    return json("Sorry, we couldn't create the project", {
      status: 500,
    });
  }
};

export default function NewProject() {
  const error = useActionData<typeof action>();
  const navigation = useNavigation();

  return navigation.formData ? (
    <ProjectView
      project={Object.fromEntries(navigation.formData)}
    />
  ) : (
    <>
      <h2>New Project</h2>
      <Form method="post">
        <label>
          Title: <input name="title" type="text" />
        </label>
        <label htmlFor="description">Description:</label>
        <textarea name="description" id="description" />
        <button type="submit">Create Project</button>
      </Form>
      {error ? <p>{error}</p> : null}
    </>
  );
}
```

Now in the rare case of an error on the server, the UI reverts back to the form, all the state is still there and they have an error message. Nearly every other time, however, the UI responds instantly to the user, even though it's doing work in the background.

## Client-side Validation

For this to work best, you'll want a bit of client-side validation so that form-validation issues on the server don't cause the app to flash between optimistic UI and validation messages. Fortunately, [HTML usually has everything you need][html-input] built-in. The browser will validate the fields before the form is even submitted to the server to avoid sending bad data and getting flashes of optimistic UI.

```tsx
import type { ActionArgs } from "@remix-run/node"; // or cloudflare/deno
import { json, redirect } from "@remix-run/node"; // or cloudflare/deno
import {
  Form,
  useActionData,
  useNavigation,
} from "@remix-run/react";

import { ProjectView } from "~/components/project";
import { createProject } from "~/utils";

export const action = async ({ request }: ActionArgs) => {
  const body = await request.formData();
  const newProject = Object.fromEntries(body);
  try {
    const project = await createProject(newProject);
    return redirect(`/projects/${project.id}`);
  } catch (e: unknown) {
    console.error(e);
    return json("Sorry, we couldn't create the project", {
      status: 500,
    });
  }
};

export default function NewProject() {
  const error = useActionData<typeof action>();
  const navigation = useNavigation();

  return navigation.formData ? (
    <ProjectView
      project={Object.fromEntries(navigation.formData)}
    />
  ) : (
    <>
      <h2>New Project</h2>
      <Form method="post">
        <label>
          40 Title:{" "}
          <input
            minLength={3}
            name="title"
            required
            type="text"
          />
        </label>
        <label htmlFor="description">Description:</label>
        <textarea name="description" id="description" />
        <button type="submit">Create Project</button>
      </Form>
      {error ? <p>{error}</p> : null}
    </>
  );
}
```

# Performance

`<docs-warning>`This document is in draft, we will be adding more practical information soon, but we wanted to communicate our approach early.`</docs-warning>`

Instead of prescribing a precise architecture with all of its constraints like SSG, Remix is designed to encourage you to leverage the performance characteristics of distributed computing.

The fastest thing to send to a user is, of course, a static document on a CDN that's close to the user. Until recently, servers pretty much only ran in one region of the world, which made for slow responses everywhere else. This is perhaps one reason SSG gained so much popularity, it allowed developers to essentially "cache" their data into HTML documents and then distribute them across the world. It comes with a lot of tradeoffs too: build times, build complexity, duplicate websites for translations, can't use it for authenticated user experiences, can't use it for very large and dynamic data sources (like our project [unpkg.com][unpkg-com]!) to name a few.

## The Edge

(No, not the U2 guy.)

Today, there are a lot of exciting things happening with distributed computing "at the edge". Computing "at the edge" generally means running code on servers close to users instead of just one place (like the US East Coast). We're not only seeing more of this, but we're seeing distributed databases moving to the edge as well. We've been anticipating all of this for a while, that's why Remix is designed the way it is.

With distributed servers and databases running at the edge, it's now possible to serve dynamic content at speeds comparable to static files. **You can make your server fast, but you can't do anything about the users network**. The only thing left to do is get code out of your browser bundles and onto the server, sending fewer bytes over the network, and provide unparalleled web performance. That's what Remix is designed to do.

## This Website + Fly.io

This very website has a time to first byte that's hard to beat. For most people in the world it's under 100ms. We can fix a typo in the docs and within a minute or two the site is updated across the world without a rebuild, without a redeploy, and without HTTP caching.

We accomplished this with distributed systems. The app runs in several regions on [Fly][fly] around the world so it's close to you. Each instance has its own SQLite database. When the app boots, it fetches tarballs from the Remix source repository on GitHub, processes the markdown docs into HTML and then inserts them into the SQLite database.

The code involved is actually really similar to what a Gatsby site might do at build time in `gatsby-node.js` or `getStaticProps` in Next.js. The idea is to take the slow parts (fetching docs from GitHub, processing markdown) and cache it (SSG caches into HTML, this website caches into SQLite on the server).

When users request a page, the app queries its local SQLite database and sends the page. Our server is done with these requests in a few milliseconds. What's most interesting about this architecture is that we don't have to sacrifice speed for freshness. When we edit a doc on GitHub, a GitHub action calls a webhook on the nearest app instance, which then replays that request to all of the other instances across the world. Then they all pull the new tarball from GitHub and sync their database with the docs just like they did when they booted. The docs are updated within a minute or two across the world.

But this is just one approach that we wanted to explore.

## Cloudflare Workers

[Remix Cloudflare Workers Demo][remix-cloudflare-workers-demo]

Cloudflare has been pushing the boundaries of edge computing for a while now and Remix is positioned to take full advantage of it. You can see our demo's response times are the same as serving static files but the features it demonstrates are definitely not static!

Not only does Cloudflare run the app close to the user, they also have persistent storage systems like [KV][kv] and [Durable Objects][durable-objects] to allow SSG-level speed without the handcuffs of coupling data to deploys and bespoke, incremental-builder backends.

There are other similar platforms that we've got plans to support soon.

## Other Technologies

Here are some other technologies to help speed up your servers:

- [FaunaDB][fauna-db] - A distributed database that runs close to your users
- [LRU Cache][lru-cache] - An in-memory cache that automatically clears out more space when it gets full
- [Redis][redis] - A tried and true server-side cache

# Resource Routes

Resource Routes are not part of your application UI, but are still part of your application. They can send any kind of Response.

Most routes in Remix are UI Routes, or routes that actually render a component. But routes don't always have to render components. There are a handful of cases where you want to use route as a general-purpose endpoint to your website. Here are a few examples:

- JSON API for a mobile app that reuses server-side code with the Remix UI
- Dynamically generating PDFs
- Dynamically generating social images for blog posts or other pages
- Webhooks for other services like Stripe or GitHub
- a CSS file that dynamically renders custom properties for a user's preferred theme

## Creating Resource Routes

If a route doesn't export a default component, it can be used as a Resource Route. If called with `GET`, the loader's response is returned and none of the parent route loaders are called either (because those are needed for the UI, but this is not the UI). If called with `POST`, the action's response is called.

For example, consider a UI Route that renders a report, note the link:

```tsx
export async function loader({ params }: LoaderArgs) {
  return json(await getReport(params.id));
}

export default function Report() {
  const report = useLoaderData<typeof loader>();
  return (
    <div>
      <h1>{report.name}</h1>
      <Link to="pdf" reloadDocument>
        View as PDF
      </Link>
      {/* ... */}
    </div>
  );
}
```

It's linking to a PDF version of the page. To make this work we can create a Resource Route below it. Notice that it has no component: that makes it a Resource Route.

```tsx
export async function loader({ params }: LoaderArgs) {
  const report = await getReport(params.id);
  const pdf = await generateReportPDF(report);
  return new Response(pdf, {
    status: 200,
    headers: {
      "Content-Type": "application/pdf",
    },
  });
}
```

When the user clicks the link from the UI route, they will navigate to the PDF.

## Linking to Resource Routes

`<docs-error>`It’s imperative that you use `<code>`reloadDocument`</code>` on any Links to Resource Routes`</docs-error>`

There's a subtle detail to be aware of when linking to resource routes. You need to link to it with `<Link reloadDocument>` or a plain `<a href>`. If you link to it with a normal `<Link to="pdf">` without `reloadDocument`, then the resource route will be treated as a UI route. Remix will try to get the data with `fetch` and render the component. Don't sweat it too much, you'll get a helpful error message if you make this mistake.

## URL Escaping

You'll probably want to add a file extension to your resource routes. This is tricky because one of Remix's route file naming conventions is that `.` becomes `/` so you can nest the URL without nesting the UI.

To add a `.` to a route's path, use the `[]` escape characters. Our PDF route file name would change like so:

```sh
# original
# /reports/123/pdf
app/routes/reports/$id/pdf.ts

# with a file extension
# /reports/123.pdf
app/routes/reports/$id[.pdf].ts

# or like this, the resulting URL is the same
app/routes/reports/$id[.]pdf.ts
```

## Handling different request methods

To handle `GET` requests export a loader function:

```tsx
import type { LoaderArgs } from "@remix-run/node"; // or cloudflare/deno
import { json } from "@remix-run/node"; // or cloudflare/deno

export const loader = async ({ request }: LoaderArgs) => {
  // handle "GET" request

  return json({ success: true }, 200);
};
```

To handle `POST`, `PUT`, `PATCH` or `DELETE` requests export an action function:

```tsx
import type { ActionArgs } from "@remix-run/node"; // or cloudflare/deno

export const action = async ({ request }: ActionArgs) => {
  switch (request.method) {
    case "POST": {
      /* handle "POST" */
    }
    case "PUT": {
      /* handle "PUT" */
    }
    case "PATCH": {
      /* handle "PATCH" */
    }
    case "DELETE": {
      /* handle "DELETE" */
    }
  }
};
```

## Webhooks

Resource routes can be used to handle webhooks. For example, you can create a webhook that receives notifications from GitHub when a new commit is pushed to a repository:

```tsx
import type { ActionArgs } from "@remix-run/node"; // or cloudflare/deno
import { json } from "@remix-run/node"; // or cloudflare/deno
import crypto from "crypto";

export const action = async ({ request }: ActionArgs) => {
  if (request.method !== "POST") {
    return json({ message: "Method not allowed" }, 405);
  }
  const payload = await request.json();

  /* Validate the webhook */
  const signature = request.headers.get(
    "X-Hub-Signature-256"
  );
  const generatedSignature = `sha256=${crypto
    .createHmac("sha256", process.env.GITHUB_WEBHOOK_SECRET)
    .update(JSON.stringify(payload))
    .digest("hex")}`;
  if (signature !== generatedSignature) {
    return json({ message: "Signature mismatch" }, 401);
  }

  /* process the webhook (e.g. enqueue a background job) */

  return json({ success: true }, 200);
};
```

# Routing

Routing is possibly the most important concept to understand in Remix. Everything starts with your routes: the compiler, the initial request, and almost every user interaction afterward.

Here's some vocabulary this document will be using regularly. They may not all make sense to you at first, but as you read the document they are here for your reference.

<docs-info>

**Nested Routes** - The general idea of routes mapping to segments of the URL allowing the full URL to map to a hierarchy of route components and data dependencies that can be known before rendering.

**URL** - The full path in the address bar of the user's web browser. A single URL can match multiple routes. It's common in other frameworks to use the words "route" and "url" interchangeably, but they are different things in Remix.

**Route** or Route Module - A JavaScript module with conventional exports (`loader`, `action`, `default` component, etc.) that is coupled to one or many URL segments. Because a Route module maps to only a segment of the URL, multiple routes can be rendered at a single URL. The component hierarchy will map to the URL segment hierarchy.

**Path** or Route Path - The segment of the URL an individual route maps to, defined by the conventional file name in the `app/routes` directory.

**Parent Layout Route** or Parent Route - A route that renders its component as the layout above a set of child routes through `<Outlet>`.

**Pathless Layout Route** or Pathless Route - A route that does not add segments to the URL but does add component layout hierarchy when its child routes match.

**Child Route** - A route that renders inside of a parent route's `<Outlet>` when its path matches the URL.

**Index Route** - A route that shares the same URL as the parent route but renders as the default child route inside of `<Outlet>`.

**Dynamic Segment** - A segment of the route path that is parsed from the URL and its value provided to the app, like the ID of a record or slug for a post.

**Splat** - A trailing wildcard on a route path that will match anything (including subsequent `/`) and provided to the app.

**Outlet** - A component rendered inside of a parent route that shows where to render the matching child route

</docs-info>

## What is Nested Routing?

Nested Routing is the general idea of coupling segments of the URL to component hierarchy in the UI. We've found that in almost every case, segments of the URL determine:

- The layouts to render on the page
- The code-split JavaScript bundles to load
- The data dependencies of those layouts

Let's consider a UI to help us out. Hover or tap each button to see how each segment of the URL maps to three things: a component layout, a JavaScript bundle, and a piece of data.

![](data:image/png;base64,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)

As the user clicks between links in the sidebar, the sidebar persists while the main content changes. Likewise, as they click between the Sales page top nav (Overview, Subscriptions, Invoices, etc.) both the sidebar and the top nav persist while the secondary content changes, and so on down the layout hierarchy.

In Remix, all of these "boxes" are a **Route**, defined by a **Route Module** in your app.

## Defining Routes

The primary way to define a route is to create a new file in `app/routes/*`. The routes for the UI example above would look something like this:

```
app
├── root.jsx
└── routes
    ├── accounts.jsx
    ├── dashboard.jsx
    ├── expenses.jsx
    ├── index.jsx
    ├── reports.jsx
    ├── sales
    │   ├── customers.jsx
    │   ├── deposits.jsx
    │   ├── index.jsx
    │   ├── invoices
    │   │   ├── $invoiceId.jsx
    │   │   └── index.jsx
    │   ├── invoices.jsx
    │   └── subscriptions.jsx
    └── sales.jsx
```

- `root.jsx` is the "root route" that serves as the layout for the entire application. Every route will render inside of its `<Outlet/>`.
- Note that there are files that match the same name as a folder, this indicates a component layout hierarchy. For example, `sales.jsx` is the **parent route** for all of the **child routes** inside of `app/routes/sales/*`. When a route inside of the sales directory matches, it will render inside of the `sales.jsx` route's `<Outlet>`
- The `index.jsx` routes will render inside of the parent `<Outlet>` when the url is only as deep as the parent's path (like `example.com/sales` instead of `example.com/sales/customers`)

## Rendering Route Layout Hierarchies

Let's consider the URL is `/sales/invoices/102000`. The following routes all match that URL:

- `root.jsx`
- `routes/sales.jsx`
- `routes/sales/invoices.jsx`
- `routes/sales/invoices/$invoiceId.jsx`

When the user visits this page, Remix will render the components in this hierarchy:

```jsx
<Root>
  <Sales>
    <Invoices>
      <InvoiceId />
    </Invoices>
  </Sales>
</Root>
```

You'll note that the component hierarchy is perfectly mapped to the file system hierarchy in `routes`. By looking at the files, you can anticipate how they will render.

```
app
├── root.jsx
└── routes
    ├── sales
    │   ├── invoices
    │   │   └── $invoiceId.jsx
    │   └── invoices.jsx
    └── sales.jsx
```

If the URL is `/accounts`, the UI hierarchy changes to this:

```jsx
<Root>
  <Accounts />
</Root>
```

It's partly your job to make this work. You need to render an `<Outlet/>` to continue the rendering of the route hierarchy from the parent routes. `root.jsx` renders the main layout, sidebar, and then an outlet for the child routes to continue rendering through:

```jsx
import { Outlet } from "@remix-run/react";

export default function Root() {
  return (
    <Document>
      <Sidebar />
      <Outlet />
    </Document>
  );
}
```

Next up is the sales route, which also renders an outlet for its child routes (all of the routes inside of `app/routes/sales/*.jsx`).

```jsx
import { Outlet } from "@remix-run/react";

export default function Sales() {
  return (
    <div>
      <h1>Sales</h1>
      <SalesNav />
      <Outlet />
    </div>
  );
}
```

And so on down the route tree. This is a powerful abstraction that makes something previously complex very simple.

## Index Routes

Index routes are often difficult to understand at first. It's easiest to think of them as _the default child route_ for a parent route. When there is no child route to render, we render the index route.

Consider the URL `example.com/sales`. If our app didn't have an index route at `app/routes/sales/index.jsx` the UI would look like this!

![asdas](data:image/png;base64,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tDQnWgAAoC5Lo0C0NCdaAACgLkujQLQ0J1oAAKAuS6NAtDQnWgAAoC5Lo0C0NCdaAACgLkujQLQ0J1oAAKAuS6OgYbQ8/PDDJ3zmrLPOWrBgwYEDB/K2qt27d48bN27GjBm5fsiaNWviOPE714/agGdpQbQAAEBdlkZB22gZM2ZM/F68ePEPf/jDUaNGzZ079+DBg3lzmWgBAIAvlSyNgrbRcvrpp2/evDmWDxw4MHXq1HPOOSdm8OvWrTvzzDOjQMaOHfv4449HxvS2nHLKKYsWLXr33XcjJ6688sqLL744Nl5++eWxpYuW22+/PUaOHj163rx5cczYftVVV0UOxZZZs2bt378/NsZNsRqDL7jggq1bt3Y7xtlPOumkWO7OFQN+8YtfnHfeeaIFAACOuyyNgmMULeGJJ5448cQTV61aNWnSpDlz5uzatWvy5Mnnn3/+jh07Lrzwwssuu+ztt9+eP3/+pZde+uqrr0a0nHXWWUuXLr3rrruiSRYsWNC1RyRKdMj06dPjUM8+++z1118fw9avXx8HjyaJM8by+PHjly1btnHjxu985ztRMt2O3//+9+No27dvj5KJk27YsOHee++NI4sWAAA47rI0Co51tLz44ou7d++O5VtuueWcc86JAdEPN9544+jRoyNmIk4iXfp+cCt2jzFxqK49nnnmmdgYQTJ27Nh58+b1hu3du3fixIk//vGP9+/fH1Vz3333TZkyJTImjrlixYrejt3RHnrooVh+9913vdMCAAAjQZZGwbH+eFhES/z+/ve/v2TJkjvuuKMbEKWxcuXK6dOnR4qcffbZ69evH3K0LFq0KNLo5ptvjlaJLb1oid17RxMtAAAwomRpFBzrL+K/8MILERWx5YMPPrjyyisjIZ577rkrrrhizpw5ER733Xdf3BqZUYqW0sfDli5detJJJ91///0RQt/+9rd37NixYcOG2LFftLz//vs+HgYAACNNlkZB22iJWuice+65CxcuPHDgwL59+6655prYcvbZZ99www3RFZs2bVq0aNEpp5wSG7tv2L/99tulaImNMbIbFkeLOLnoootie+TH1KlT4+BxtDhybLnsssvipn7RElavXj127NgYP23atHPOOUe0AADAcZelUdAwWio++uijTz75JFcOOXjw4J49e6JDcv1IfPjhhx9//HGuHDpUHD9XRgDRAgAA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DkyZMuWcc86JKXu3JRIiWmLOnDkvvfTSueeee8IJJ4wePXrevHkxMloiSia2RORMnTp13759+/fvj/aIAbFx/PjxkS4xbPbs2THg7LPPvuGGGyrRsmnTphgzZsyYl19+OY7fHeSUU06JIjp48GB3MceSaAEAgLosjYK2X8SviDKJDsmVQz788MOPP/44Vw6JATEsV4bqk08++eCDD+J3rh9zogUAAOqyNAqOW7R8eYgWAACoy9IoEC3NiRYAAKjL0igQLc2JFgAAqMvSKBAtzYkWAACoy9IoEC3NiRYAAKjL0igQLc2JFgAAqMvSKBAtzYkWAACoy9IoEC3NiRYAAKjL0ihoFS379u175513du3aFVP2L6S4a3EHB/NvX8bgfCoAAICBZGkUDH+0HDhwIGbz3cz+yyDubL9/2r+fGJNPBQAAMJAsjYLhj5YvVbF04i7nnR9IDMinAgAAGEiWRsEwR8u+ffu6efyXTeVzYnFrPhUAAMBAsjQKhjlaDn+b5a233tq2bVv8zvUvqMqbLXFrPhUAAMBAsjQKhjla+n7z/s033/zFL34R40844YT4ffvtt8eWvK2Pu+6662/+5m/WrFmT63+c4o7nQ3CYuDWfCgAAYCCHOqNomKOlm8F3Hnvssb/8y7+88cYbly1bNmXKlL/+679+8skn87Y+vhjREvIhOEzclE8FAAAwkCyNgobREjXyjW984ze/+U0sv/nmm5s2bdq+ffvatWvHjRvX972XXrRs2LDhkksu6XtTb0vEz3XXXbdt27buyCNTPgSHiZvyqQAAAAZyqDOKGkZL9MlZZ50VvXHuuefOnj37tdde27Fjxw033PCTn/xk/fr1t9122+mnnx5jumhZtWrVj370o7/7u79bvXr1I4888s1vfvOxxx6bMWPGaaed9vTTTy9fvnz8+PGPPvpoHnpEyofgMHFTPhUAAMBAsjQKGkZL2LZt28MPP3zZZZfFXmeccUYESWyJJpk+ffr5559/wgknPPnkk120LFmy5Lvf/e7f//3fT506dfLkyTH4pptuin2jecaNG3fLLbfEvjt37szjjkj5EBwmbsqnAgAAGEgXGiUNoyWSY+7cudu3b4/lVatWnXbaadEhkSURJ/fff/+8efMOj5Zrr7124We6SonfUSzRLVEvDz74YHfkkSkfgsPETflUAAAAA8nSKGgYLXfccUeUxowZM6JApkyZEstz5sw588wzZ82a9frrr0+ePLlvtHQfD/ve9763du3aZcuWjR8//r777ps5c+all176wgsvxJZonjhUHnpEyofgMHFTPhUAAMBAsjQKGkZLlMlNN930V3/1VxEn8TuSY9u2bdOnT496GTNmzHXXXdc3WtasWRNxMmHChNgYA6688sqNGzf2vrUfLrnkkg0bNuShR6R8CA4TN+VTAQAADCRLo6Dtd1rC4f+45JuH5Mphtm/f/sYbb+TKIbGl+4zZCJcPwWHipnwqAACAgWRpFAxztPT9xyW/VPzjkgAAMGRZGgXDHC3vvPNON4n/sok7ng/BYeLWfCoAAICBZGkUDHO07Nu3r5vEf9nEHc+H4DBxaz4VAADAQLI0CoY5WsKX8M2WytssIQbkUwEAAAwkS6Ng+KPlwIEDX6puiTsbdznv/EBiTD4VAADAQLI0CoY/Wjr79u2L2fwX+Hv5cdfiDlY+FdYTg/OpAAAABpKlUdAqWugRLQAAUJelUSBamhMtAABQl6VRIFqaEy0AAFCXpVEgWpoTLQAAUJelUSBamhMtAABQl6VRIFqaEy0AAFCXpVEgWpoTLQAAUJelUdAwWh5++OET+hg3btzu3bvzti8T0QIAAHVZGgVto2XMmDHxe9Uh69at++ijj/K2LxPRAgAAdVkaBW2j5fTTT9+8eXOu/9u/7dy58zvf+c6sWbOiXuJ3LL/66qvjxo2bNGnSxIkTTzjhhMsvv/zdd989cODAvHnzRo8ePWrUqKuuuiq2rFmzJm6dNm3aKaecEtvj1hgT22N8bI9hU6dO3bdvX2/LSSeddM899ww4Ji/lGBItAABQl6VR0DZaIhW+/e1v/90hd955Z2x84oknzjjjjMcee2zs2LGxvHv37oiWs846a+3atbEasXHHHXfEwpgxY+L31q1bJ0yYEK2yevXqLmmeeeaZ+P2tb31rx44dMTIO8tJLL73yyisXXnjhkiVLrr/++vPPP3/jxo1Lly6NIyxfvrzfmGXLlnXXdiyJFgAAqMvSKGgbLSeeeOKNN9546yGLFy+OjR988ME//uM/RoHE71juomX69OkHDx7cu3fvxIkTJ02a9E//9E+RMTNnzoy9Lr744uiQiJDYZc2aNd1huzdw4oARRePHj48cilB555134lAxPvaKfeMIs2bN6jfmk08+OXRpx5RoAQCAuiyNgmP68bAwyGiJzIhQ6X0ZZuXKlYdHSxRIdEjUSAyOMvnVr34Vh5o6dWq3V+gqpe+YJ554oruMY0m0AABAXZZGwbH+In6XHBEPZ5xxxoIFCyofD4toeeutt2688cYpU6asWLGiX7REisydO/fKK6/csWPH+vXrx44dO3v27Ouvv37ChAlbt26NLRdeeOFjjz3Wb0wcvLu2Y0m0AABAXZZGQdtoidLoiTiJcjj77LMjJD755JP43fsi/g9+8IOLLrooxlx+6Iv4+/fvnzVr1ujRo2PLueeeG3t1X8Tv905LxMn48eN/f+jPdow46Y4zatSoq6+++r333jt8THdtx5JoAQCAuiyNgobRMhjdOy0zZszI9T4OHDgwmL/s68NDcuWQWP34449z5ZDDxxxLogUAAOqyNApGbrR8YYgWAACoy9IoOM7R8sknn7z//vt79+7N9S8i0QIAAHVZGgXHOVq+DEQLAADUZWkUiJbmRAsAANRlaRSIluZECwAA1GVpFIiW5kQLAADUZWkUiJbmRAsAANRlaRSIluZECwAA1GVpFIiW5kQLAADUZWkUiJbmRAsAANRlaRSIluZECwAA1GVpFIiW5kQLAADUZWkUiJbmRAsAANRlaRQ0jJaHH374hM+MHTt2wYIFBw4cyNuO2o4dO5599tk9e/bk+ggmWgAAoC5Lo6BttIwZMyZ+r1ix4rrrrhs1atTy5cvztqMWhz399NM3b96c6yOYaAEAgLosjYK20dLrio0bN44dOza2vPvuu5dffvkJJ5xw0kkn3XPPPQcOHOiGzZgxI7accsopixYtOnjwYAy76qqronNGjx49a9as/fv3r1mzJvaaOnVqDLv33nsPvX/ze7F93bp1Z555Ziz3du8uYIQQLQAAUJelUdA2WiJUXnjhhV27dt15550RFb/+9a+vv/76888/Pxpm6dKlY8aMWb58eQyLm6ZPn75169YIlW9961tbtmyJYWedddb69eufeOKJqJQY00XL97///dgxDhjd0h38nXfeufDCCy+77LK33357/vz5l1566c6dO/MKRgbRAgAAdVkaBcfoOy2jRo2aOnXqG2+8MW7cuIsvvvjWW2+dOXNmZMmsWbO6tomMiV0iSGLwkiVLYtiMGTNiy969eydOnPjjH/945cqVcdMzzzxz6Nj//TbOxx9/fOONN44ePXrSpEkLFiyIdOkGjByiBQAA6rI0Co7FOy1PPvlkRMvChQt3794dNRL1suoz0SpHFC1r1qw5dOw/+OzZ/v3749bp06fHcc4+++zXX3+9GzNCiBYAAKjL0ig4Ft9p+fDDDydNmjR+/Pg333zz+uuvnzBhwtatW9evX3/hhRf++te/jmFRI6WPh0XGnHTSSffff3/38bBetCxYsODEE09cvHjxzp07r7jiijlz5kTe3HfffbHxxRdf7MaMEKIFAADqsjQKjtEX8V944YXuC/Svv/76RRddFPkxatSoq6+++r333uveaZk8efLo0aN736TfsWNHb9jUqVP37dvXL1p27drVDXjqqadil9gxluMI8+bNG8a/WHlYiBYAAKjL0ihoGC0VH3744ccff9wt922bfvoOq4vO2bNnz0jLlY5oAQCAuiyNguMTLX1VouWLQbQAAEBdlkbB8Y+WDz/88P333x+Zb5IMC9ECAAB1WRoFxz9avvBECwAA1GVpFIiW5kQLAADUZWkUiJbmRAsAANRlaRSIluZECwAA1GVpFIiW5kQLAADUZWkUiJbmRAsAANRlaRSIluZECwAA1GVpFIiW5kQLAADUZWkUiJbmRAsAANRlaRSIluZECwAA1GVpFIiW5kQLAADUZWkUiJbmRAsAANRlaRSIluZECwAA1GVpFIiW5kQLAADUZWkUiJbmRAsAANRlaRSIluZECwAA1GVpFIiW5kQLAADUZWkUiJbmRAsAANRlaRSIluZECwAA1GVpFIiW5kQLAADUZWkUiJbmRAsAANRlaRSIluZECwAA1GVpFIiW5kQLAADUZWkUiJbmRAsAANRlaRSIluZECwAA1GVpFIiW5kQLAADUZWkUiJbmRAsAANRlaRSIluZECwAA1GVpFIiW5kQLAADUZWkUiJbmRAsAANRlaRSIluZECwAA1GVpFIiW5kQLAADUZWkUiJbmRAsAANRlaRSIluZECwAA1GVpFIiW5kQLAADUZWkUiJbmRAsAANRlaRSIluZECwAA1GVpFIiW5kQLAADUZWkUiJbmRAsAANRlaRSIluZECwAA1GVpFIiW5kQLAADUZWkUiJbmRAsAANRlaRSIluZECwAA1GVpFIiW5kQLAADUZWkUiJbmRAsAANRlaRSIluZECwAA1GVpFIiW5kQLAADUZWkUiJbmRAsAANRlaRSIluZECwAA1GVpFIiW5kQLAADUZWkUiJbmRAsAANRlaRSIluZECwAA1GVpFIiW5kQLAADUZWkUiJbmRAsAANRlaRSIluZECwAA1GVpFIiW5kQLAADUZWkUiJbmRAsAANRlaRSIluZECwAA1GVpFIiW5kQLAADUZWkUiJbmRAsAANRlaRSIluZECwAA1GVpFIiW5kQLAADUZWkUiJbmRAsAANRlaRSIluZECwAA1GVpFIiW5kQLAADUZWkUiJbmRAsAANRlaRSIluZECwAA1GVpFIiW5kQLAADUZWkUiJbmRAsAANRlaRSIluZECwAA1GVpFIiW5kQLAADUZWkUiJbmRAsAANRlaRSIluZECwAA1GVpFIiW5kQLAADUZWkUiJbmRAsAANRlaRSIluZECwAA1GVpFIiW5kQLAADUZWkUiJbmRAsAANRlaRSIluZECwAA1GVpFIiW5kQLAADUZWkUiJbmRAsAANRlaRSIluZECwAA1GVpFIiW5kQLAADUZWkUiJbmRAsAANRlaRSIluZECwAA1GVpFIiW5kQLAADUZWkUiJbmRAsAANRlaRSIluZECwAA1GVpFIiW5kQLAADUZWkUiJbmRAsAANRlaRSIluZECwAA1GVpFIiW5kQLAADUZWkUiJbmRAsAANRlaRSIluZECwAA1GVpFIiW5kQLAADUZWkUiJbmRAsAANRlaRSIluZECwAA1GVpFIiW5kQLAADUZWkUiJbmRAsAANRlaRSIluZECwAA1GVpFIiW5kQLAADUZWkUiJbmRAsAANRlaRSIluZECwAA1GVpFIiW5kQLAADUZWkUiJbmRAsAANRlaRSIluZECwAA1GVpFIiW5kQLAADUZWkUiJbmRAsAANRlaRSIluZECwAA1GVpFIiW5kQLAADUZWkUiJbmRAsAANRlaRSIluZECwAA1GVpFIiW5kQLAADUZWkUiJbmRAsAANRlaRSIluZECwAA1GVpFIiW5kQLAADUZWkUiJbmRAsAANRlaRSIluZECwAA1GVpFIiW5kQLAADUZWkUiJbmRAsAANRlaRSIluZECwAA1GVpFIiW5kQLAADUZWkUiJbmRAsAANRlaRSIluZECwAA1GVpFIiW5kQLAADUZWkUiJbmRAsAANRlaRSIluZECwAA1GVpFIiW5kQLAADUZWkUiJbmRAsAANRlaRSIluZECwAA1GVpFIiW5kQLAADUZWkUiJbmRAsAANRlaRSIluZECwAA1GVpFIiW5kQLAADUZWkUiJbmRAsAANRlaRSIluZECwAA1GVpFIiW5kQLAADUZWkUiJbmRAsAANRlaRSIluZECwAA1GVpFIiW5kQLAADUZWkUiJbmRAsAANRlaRSIluZECwAA1GVpFIiW5kQLAADUZWkUiJbmRAsAANRlaRSIluZECwAA1GVpFIiW5kQLAADUZWkUiJbmRAsAANRlaRSIluZECwAA1GVpFIiW5kQLAADUZWkUiJbmRAsAANRlaRSIluZECwAA1GVpFIiW5kQLAADUZWkUiJbmRAsAANRlaRSIluZECwAA1GVpFIiW5kQLAADUZWkUiJbmRAsAANRlaRSIluZECwAA1GVpFIiW5kQLAADUZWkUiJbmRAsAANRlaRSIluZECwAA1GVpFIiW5kQLAADUZWkUiJbmRAsAANRlaRSIluZECwAA1GVpFIiW5kQLAADUZWkUiJbmRAsAANRlaRSIluZECwAA1GVpFIiW5kQLAADUZWkUiJbmRAsAANRlaRSIluZECwAA1GVpFIiW5kQLAADUZWkUiJbmRAsAANRlaRSIluZECwAA1GVpFIiW5kQLAADUZWkUiJbmRAsAANRlaRSIluZECwAA1GVpFIiW5kQLAADUZWkUiJbmRAsAANRlaRSIluZECwAA1GVpFIiW5kQLAADUZWkUiJbmRAsAANRlaRSIluZECwAA1GVpFIiW5kQLAADUZWkUiJbmRAsAANRlaRSIluZECwAA1GVpFIiW5kQLAADUZWkUiJbmRAsAANRlaRSIluZECwAA1GVpFIiW5kQLAADUZWkUiJbmRAsAANRlaRSIluZECwAA1GVpFIiW5kQLAADUZWkUiJbmRAsAANRlaRSIluZECwAA1GVpFIiW5kQLAADUZWkUiJbmRAsAANRlaRSIluZECwAA1GVpFIiW5kQLAADUZWkUiJbmRAsAANRlaRSIluZECwAA1GVpFIiW5kQLAADUZWkUiJbmRAsAANRlaRSIluZECwAA1GVpFIiW5kQLAADUZWkUiJbmRAsAANRlaRSIluZECwAA1GVpFIiW5kQLAADUZWkUiJbmRAsAANRlaRSIluZECwAA1GVpFIiW5kQLAADUZWkUiJbmRAsAANRlaRSIluZECwAA1GVpFIiW5kQLAADUZWkUiJbmRAsAANRlaRSIluZECwAA1GVpFIiW5kQLAADUZWkUiJbmRAsAANRlaRSIluZECwAA1GVpFIiW5kQLAADUZWkUiJbmRAsAANRlaRSIluZECwAA1GVpFIiW5kQLAADUZWkUiJbmRAsAANRlaRSIluZECwAA1GVpFIiW5kQLAADUZWkUiJbmRAsAANRlaRSIluZECwAA1GVpFIiW5kQLAADUZWkUiJbmRAsAANRlaRSIluZECwAA1GVpFIiW5kQLAADUZWkUiJbmRAsAANRlaRSIluZECwAA1GVpFIiW5kQLAADUZWkUiJbmRAsAANRlaRSIluZECwAA1GVpFIiW5kQLAADUZWkUiJbmRAsAANRlaRSIluZECwAA1GVpFIiW5kQLAADUZWkUiJbmRAsAANRlaRSIluZECwAA1GVpFIiW5kQLAADUZWkUiJbmRAsAANRlaRSIluZECwAA1GVpFIiW5kQLAADUZWkUiJbmRAsAANRlaRSIluZECwAA1GVpFIiW5kQLAADUZWkUiJbmRAsAANRlaRSIluZECwAA1GVpFIiW5kQLAADUZWkUiJbmRAsAANRlaRSIluZECwAA1GVpFIiW5kQLAADUZWkUiJbmRAsAANRlaRSIluZECwAA1GVpFIiW5kQLAADUZWkUiJbmRAsAANRlaRSIluZECwAA1GVpFIiW5kQLAADUZWkUiJbmRAsAANRlaRSIluZECwAA1GVpFIiW5kQLAADUZWkUiJbmRAsAANRlaRSIluZECwAA1GVpFIiW5kQLAADUZWkUiJbmRAsAANRlaRSIluZECwAA1GVpFIiW5kQLAADUZWkUiJbmRAsAANRlaRSIluZECwAA1GVpFIiW5kQLAADUZWkUiJbmRAsAANRlaRSIluZECwAA1GVpFIiW5kQLAADUZWkUiJbmRAsAANRlaRSIluZECwAA1GVpFIiW5kQLAADUZWkUiJbmRAsAANRlaRSIluZECwAA1GVpFIiW5kQLAADUZWkUiJbmRAsAANRlaRSIluZECwAA1GVpFIiW5kQLAADUZWkUiJbmRAsAANRlaRSIluZECwAA1GVpFIiW5kQLAADUZWkUiJbmRAsAANRlaRSIluZECwAA1GVpFIiW5kQLAADUZWkUiJbmRAsAANRlaRSIluZECwAA1GVpFIiW5kQLAADUZWkUiJbmRAsAANRlaRSIluZECwAA1GVpFIiW5kQLAADUZWkUiJbmRAsAANRlaRSIluZECwAA1GVpFIiW5kQLAADUZWkUiJbmRAsAANRlaRSIluZECwAA1GVpFIiW5kQLAADUZWkUiJbmRAsAANRlaRSIluZECwAA1GVpFIiW5kQLAADUZWkUiJbmRAsAANRlaRSIluZECwAA1GVpFIiW5kQLAADUZWkUiJbmRAsAANRlaRSIluZECwAA1GVpFIiW5kQLAADUZWkUiJbmRAsAANRlaRSIluZECwAA1GVpFIiW5kQLAADUZWkUiJbmRAsAANRlaRSIluZECwAA1GVpFIiW5kQLAADUZWkUiJbmRAsAANRlaRSIluZECwAA1GVpFIiW5kQLAADUZWkUiJbmRAsAANRlaRSIluZECwAA1GVpFIiW5kQLAADUZWkUiJbmRAsAANRlaRSIluZECwAA1GVpFIiW5kQLAADUZWkUiJbmRAsAANRlaRSIluZECwAA1GVpFIiW5kQLAADUZWkUiJbmRAsAANRlaRSIluZECwAA1GVpFIiW5kQLAADUZWkUiJbmRAsAANRlaRSIluZECwAA1GVpFIiW5kQLAADUZWkUiJbmRAsAANRlaRSIluZECwAA1GVpFIiW5kQLAADUZWkUiJbmRAsAANRlaRSIluZECwAA1GVpFIiW5kQLAADUZWkUiJbmRAsAANRlaRSIluZECwAA1GVpFIiW5kQLAADUZWkUiJbmRAsAANRlaRSIluZECwAA1GVpFIiW5kQLAADUZWkUiJbmRAsAANRlaRSIluZECwAA1GVpFIiW5kQLAADUZWkUiJbmRAsAANRlaRSIluZECwAA1GVpFIiW5kQLAADUZWkUiJbmRAsAANRlaRSIluZECwAA1GVpFIiW5kQLAADUZWkUiJbmRAsAANRlaRSIluZECwAA1GVpFIiW5kQLAADUZWkUiJbmRAsAANRlaRSIluZECwAA1GVpFIiW5kQLAADUZWkUiJbmRAsAANRlaRSIluZECwAA1GVpFIiW5kQLAADUZWkUiJbmRAsAANRlaRSIluZECwAA1GVpFIiW5kQLAADUZWkUiJbmRAsAANRlaRSIluZECwAA1GVpFIiW5kQLAADUZWkUiJbmRAsAANRlaRSIluZECwAA1GVpFIiW5kQLAADUZWkUiJbmRAsAANRlaRSIluZECwAA1GVpFIiW5kQLAADUZWkUiJbmRAsAANRlaRSIluZECwAA1GVpFIiW5kQLAADUZWkUiJbmRAsAANRlaRSIluZECwAA1GVpFIiW5kQLAADUZWkUiJbmRAsAANRlaRSIluZECwAA1GVpFIiW5kQLAADUZWkUiJbmRAsAANRlaRSIluZECwAA1GVpFIiW5kQLAABUfPrpp1kaBUOJlv379+d8nEEQLQAAULFly5YsjYKhRMuqVatyPs4giBYAAKiYPXt2lkbBUKIleLNl8EQLAACUfO7bLGGI0XLppZfqlkESLQAAMKAolu9+97vZGGVDjJbOqlWrpMvnEi0AANDXp59+GrnyuZ8K6zmqaAEAAGhNtAAAACOaaAEAAEY00QIAAIxoogUAABjRRAsAADCi/Xe0hIiWb3zjG3kLAADACNA/Wv7iL/4ibwEAABgB+kfLV77ylbwFAABgBOgfLd5sAQAARpQBouVP//RPdQsAADASRJsMEC2dr3zlK3Gz7+UDAADHXpRI9EhUSbTJH0RL6Iql538CAAAcD9kkf/In/z9KEtfltSLhqgAAAABJRU5ErkJggg==)

And index is the thing you render to fill in that empty space when none of the child routes match.

`<docs-error>`Index Routes cannot have child routes`</docs-error>`

Index routes are "leaf routes". They're the end of the line. If you think you need to add child routes to an index route, that usually means your layout code (like a shared nav) needs to move out of the index route and into the parent route.

This usually comes up when folks are just getting started with Remix and put their global nav in `app/routes/index.jsx`. Move that global nav up into `app/root.jsx`. Everything inside of `app/routes/*` is already a child of `root.tsx`.

### What is the `?index` query param?

You may notice an `?index` query parameter showing up on your URLs from time to time, particularly when you are submitting a `<Form>` from an index route. This is required to differentiate index routes from their parent layout routes. Consider the following structure, where a URL such as `/sales/invoices` would be ambiguous. Is that referring to the `routes/sales/invoices.jsx` file? Or is it referring to the `routes/sales/invoices/index.jsx` file? In order to avoid this ambiguity, Remix uses the `?index` parameter to indicate when a URL refers to the index route instead of the layout route.

```
└── app
    ├── root.jsx
    └── routes
        ├── sales
        │   ├── invoices
        │   │   └── index.jsx   <-- /sales/invoices?index
        │   └── invoices.jsx    <-- /sales/invoices
```

This is handled automatically for you when you submit from a `<Form>` contained within either the layout route or the index route. But if you are submitting forms to different routes, or using `fetcher.submit`/`fetcher.load` you may need to be aware of this URL pattern so you can target the correct route.

## Nested URLs without nesting layouts

Sometimes you want to add nesting to the URL (slashes) but you don't want to create UI hierarchy. Consider an edit page for an invoice:

- We want the URL to be `/sales/invoices/:invoiceId/edit`
- We **don't** want it nested inside of any of the components except the root so the user (and our designer) has plenty of room to edit the invoice

In other words, we don't want this:

```jsx
<Root>
  <Sales>
    <Invoices>
      <InvoiceId>
        <EditInvoice />
      </InvoiceId>
    </Invoices>
  </Sales>
</Root>
```

We want this:

```jsx
<Root>
  <EditInvoice />
</Root>
```

So, if we want a flat UI hierarchy, we create a flat filename--we use `"."` to create segments instead of folders. This defines URL nesting _without creating component nesting_.

```
└── app
    ├── root.jsx
    └── routes
        ├── sales
        │   ├── invoices
        │   │   └── $invoiceId.jsx
        │   └── invoices.jsx
        ├── sales.invoices.$invoiceId.edit.jsx 👈 not nested
        └── sales.jsx
```

Just for absolute clarity, if the url is "example.com/sales/invoices/2000/edit", we'll get this UI hierarchy that matches the file system hierarchy:

```jsx
<Root>
  <EditInvoice />
</Root>
```

If we remove "edit" from the URL like this: "example.com/sales/invoices/2000", then we get all of the hierarchy again:

```jsx
<Root>
  <Sales>
    <Invoices>
      <InvoiceId />
    </Invoices>
  </Sales>
</Root>
```

- Nested files: layout nesting + nested urls
- Flat files: no layout nesting + nested urls

You can introduce nesting or non-nesting at any level of your routes, like `app/routes/invoices/$id.edit.js`, which matches the URL `/invoices/123/edit` but does not create nesting inside of `$id.js`.

## Pathless Layout Routes

Now for the inverse use case, sometimes you want to share a layout for a set of routes _but you don't want to add any segments to the URL_. You can do this with a **pathless layout route**.

Consider we want to add some authentication routes, with a UI hierarchy like this:

```jsx
<Root>
  <Auth>
    <Login />
  </Auth>
</Root>
```

At first, you might think to just create an `auth` parent route and put the child routes inside to get the layout nesting:

```
app
├── root.jsx
└── routes
    ├── auth
    │   ├── login.jsx
    │   ├── logout.jsx
    │   └── signup.jsx
    └── auth.jsx
```

We have the right UI hierarchy, but we probably don't actually want each of the URLs to be prefixed with `/auth` like `/auth/login`. We just want `/login`.

You can remove the URL nesting, but keep the UI nesting, by adding two underscores to the route and folder name:

```
app
├── root.jsx
└── routes
    ├── __auth
    │   ├── login.jsx
    │   ├── logout.jsx
    │   └── signup.jsx
    └── __auth.jsx
```

And that's it! When the URL matches `/login` the UI hierarchy will be same as before.

## Dynamic Segments

Prefixing a file name with `$` will make that route path a **dynamic segment**. This means Remix will match any value in the URL for that segment and provide it to your app.

For example, the `$invoiceId.jsx` route. When the url is `/sales/invoices/102000`, Remix will provide the string value `102000` to your loaders, actions, and components by the same name as the filename segment:

```tsx
import { useParams } from "@remix-run/react";

export async function loader({ params }: LoaderArgs) {
  const id = params.invoiceId;
}

export async function action({ params }: ActionArgs) {
  const id = params.invoiceId;
}

export default function Invoice() {
  const params = useParams();
  const id = params.invoiceId;
}
```

Route can have multiple params, and params can be folders as well.

```
app
├── root.jsx
└── routes
    ├── projects
    │   ├── $projectId
    │   │   └── $taskId.jsx
    │   └── $projectId.jsx
    └── projects.jsx
```

If the URL is `/projects/123/abc` then the params will be as follows:

```jsx
params.projectId; // "123"
params.taskId; // "abc"
```

## Splats

Naming a file `$.jsx` will make that route path a **splat route**. This means Remix will match any value in the URL for rest of the URL to the end. Unlike **dynamic segments**, a splat won't stop matching at the next `/`, it will capture everything.

Consider the following routes:

```
app
├── root.jsx
└── routes
    ├── files
    │   ├── $.jsx
    │   ├── mine.jsx
    │   └── recent.jsx
    └── files.jsx
```

When the URL is `example.com/files/images/work/flyer.jpg`. The splat param will capture the trailing segments of the URL and be available to your app on `params["*"]`

```tsx
export async function loader({ params }: LoaderArgs) {
  params["*"]; // "images/work/flyer.jpg"
}
```

You can add splats at any level of your route hierarchy. Any sibling routes will match first (like `/files/mine`).

It's common to add a `routes/$.jsx` file build custom 404 pages with data from a loader (without it, Remix renders your root `CatchBoundary` with no ability to load data for the page when the URL doesn't match any routes).

## Conclusion

Nested routes are an incredibly powerful abstraction. Layouts are shared automatically and each route is only concerned with its slice of the data on the page. Additionally, because of this convention, Remix is able to make a ton of optimizations, automatically turning what feels like a server side app from the developer's perspective into a turbocharged SPA for the user.

Happy routing!

# Streaming

Remix supports the [web streaming API][web-streaming-api] as a first-class citizen. Additionally, JavaScript server runtimes have support for streaming responses to the client.

`<docs-warning>`NOTE: Deferred UX goals rely on streaming responses. Some popular hosts do not support streaming responses. In general, any host built around AWS Lambda does not support streaming and any bare metal / VM provider will. Make sure your hosting platform supports before using this API.`</docs-warning>`

## The problem

Imagine a scenario where one of your routes' loaders needs to retrieve some data that for one reason or another is quite slow. For example, let's say you're showing the user the location of a package that's being delivered to their home:

```tsx
import type { LoaderArgs } from "@remix-run/node"; // or cloudflare/deno
import { json } from "@remix-run/node"; // or cloudflare/deno
import { useLoaderData } from "@remix-run/react";

import { getPackageLocation } from "~/models/packages";

export async function loader({ params }: LoaderArgs) {
  const packageLocation = await getPackageLocation(
    params.packageId
  );

  return json({ packageLocation });
}

export default function PackageRoute() {
  const { packageLocation } =
    useLoaderData<typeof loader>();

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

We'll assume that `getPackageLocation` is slow. This will lead to initial page load times and transitions to that route to take as long as the slowest bit of data. Before reaching for rendering a fallback we recommend exploring ways to speed up that slow data, though not always possible here are a few things to explore first:

- Speed up the slow thing (😅).
  - Optimize DB queries.
  - Add caching (LRU, Redis, etc).
  - Use a different data source.
- Load data concurrently loading with `Promise.all` (we have nothing to make concurrent in our example, but it might help a bit in other situations).

If initial page load is not a critical metric for your application, you can also explore the following options that can improve the perceived performance of your application client side only:

- Use the [ prop on ][link].
- Add a global transition spinner.
- Add a localized skeleton UI.

If these approaches don't work well, then you may feel forced to move the slow data out of the Remix loader into a client-side fetch (and show a skeleton fallback UI while loading). In this case you'd render the fallback UI on the server render and fire off the fetch for the data on the client. This is actually not so terrible from a DX standpoint thanks to . And from a UX standpoint this improves the loading experience for both client-side transitions as well as initial page load. So it does seem to solve the problem.

But it's still sub-optimal for two reasons:

1. Client-side fetching puts your data request on a waterfall: document -> JavaScript -> data fetch
2. Your code can't easily switch between client-side fetching and server-side rendering (more on this later).

## The solution

Remix takes advantage of React 18's streaming and server-side support for `<Suspense />` boundaries using the [ Response][defer] utility and  component /  hook. By using these APIs, you can solve both of these problems:

1. Your data is no longer on a waterfall: document & data (in parallel) -> JavaScript
2. Your can easily switch between streaming and waiting for the data

![Graphs showing how document and slow data requests sent over the same response significantly speed up the largest contentful paint][graphs-showing-how-document-and-slow-data-requests-sent-over-the-same-response-significantly-speed-up-the-largest-contentful-paint]

Let's take a dive into how to accomplish this.

### Enable React 18 Streaming

First, to enable streaming with React 18, you'll update your `entry.server.tsx` file to use `renderToPipeableStream`. Here's a simple (and incomplete) version of that:

```tsx
import { PassThrough } from "stream";
import { renderToPipeableStream } from "react-dom/server";
import { RemixServer } from "@remix-run/react";
import { Response } from "@remix-run/node"; // or cloudflare/deno
import type {
  EntryContext,
  Headers,
} from "@remix-run/node"; // or cloudflare/deno

export default function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext
) {
  return new Promise((resolve) => {
    const { pipe } = renderToPipeableStream(
      <RemixServer
        context={remixContext}
        url={request.url}
      />,
      {
        onShellReady() {
          const body = new PassThrough();

          responseHeaders.set("Content-Type", "text/html");

          resolve(
            new Response(body, {
              status: responseStatusCode,
              headers: responseHeaders,
            })
          );
          pipe(body);
        },
      }
    );
  });
}
```

<details>
  <summary>For a more complete example, expand this</summary>

This handles errors and properly disables streaming for bots which you typically want to force waiting so you can display all the content for SEO purposes.

```tsx
import { PassThrough } from "stream";
import { renderToPipeableStream } from "react-dom/server";
import { RemixServer } from "@remix-run/react";
import { Response } from "@remix-run/node"; // or cloudflare/deno
import type {
  EntryContext,
  Headers,
} from "@remix-run/node"; // or cloudflare/deno
import isbot from "isbot";

const ABORT_DELAY = 5000;

export default function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext
) {
  // If the request is from a bot, we want to wait for the full
  // response to render before sending it to the client. This
  // ensures that bots can see the full page content.
  if (isbot(request.headers.get("user-agent"))) {
    return serveTheBots(
      request,
      responseStatusCode,
      responseHeaders,
      remixContext
    );
  }

  return serveBrowsers(
    request,
    responseStatusCode,
    responseHeaders,
    remixContext
  );
}

function serveTheBots(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext
) {
  return new Promise((resolve, reject) => {
    const { pipe, abort } = renderToPipeableStream(
      <RemixServer
        context={remixContext}
        url={request.url}
        abortDelay={ABORT_DELAY}
      />,
      {
        // Use onAllReady to wait for the entire document to be ready
        onAllReady() {
          responseHeaders.set("Content-Type", "text/html");
          let body = new PassThrough();
          pipe(body);
          resolve(
            new Response(body, {
              status: responseStatusCode,
              headers: responseHeaders,
            })
          );
        },
        onShellError(err: unknown) {
          reject(err);
        },
      }
    );
    setTimeout(abort, ABORT_DELAY);
  });
}

function serveBrowsers(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext
) {
  return new Promise((resolve, reject) => {
    let didError = false;
    const { pipe, abort } = renderToPipeableStream(
      <RemixServer
        context={remixContext}
        url={request.url}
        abortDelay={ABORT_DELAY}
      />,
      {
        // use onShellReady to wait until a suspense boundary is triggered
        onShellReady() {
          responseHeaders.set("Content-Type", "text/html");
          let body = new PassThrough();
          pipe(body);
          resolve(
            new Response(body, {
              status: didError ? 500 : responseStatusCode,
              headers: responseHeaders,
            })
          );
        },
        onShellError(err: unknown) {
          reject(err);
        },
        onError(err: unknown) {
          didError = true;
          console.error(err);
        },
      }
    );
    setTimeout(abort, ABORT_DELAY);
  });
}
```

</details>

Then on the client you need to make sure you're hydrating properly with the React 18 `hydrateRoot` API:

```tsx
import { RemixBrowser } from "@remix-run/react";
import { hydrateRoot } from "react-dom/client";

hydrateRoot(document, <RemixBrowser />);
```

With just that in place, you're unlikely to see any significant performance improvement. But with that alone you can now use  to SSR components but delay hydration on the client. This can open up network bandwidth for more critical things like styles, images, and fonts leading to a better LCP and TTI.

### Using `defer`

With React streaming set up, now you can start adding `Await` usage for your slow data requests where you'd rather render a fallback UI. Let's do that for our example above:

```tsx
import { Suspense } from "react";
import type { LoaderArgs } from "@remix-run/node"; // or cloudflare/deno
import { defer } from "@remix-run/node"; // or cloudflare/deno
import { Await, useLoaderData } from "@remix-run/react";

import { getPackageLocation } from "~/models/packages";

export function loader({ params }: LoaderArgs) {
  const packageLocationPromise = getPackageLocation(
    params.packageId
  );

  return defer({
    packageLocation: packageLocationPromise,
  });
}

export default function PackageRoute() {
  const data = useLoaderData<typeof loader>();

  return (
    <main>
      <h1>Let's locate your package</h1>
      <Suspense
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
      </Suspense>
    </main>
  );
}
```

<details>
  <summary>Alternatively, you can use the `useAsyncValue` hook:</summary>

If you're not jazzed about bringing back render props, you can use a hook, but you'll have to break things out into another component:

```tsx
import type { SerializedFrom } from "@remix-run/node"; // or cloudflare/deno

export default function PackageRoute() {
  const data = useLoaderData<typeof loader>();

  return (
    <main>
      <h1>Let's locate your package</h1>
      <Suspense
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
      </Suspense>
    </main>
  );
}

function PackageLocation() {
  const packageLocation =
    useAsyncValue<
      SerializedFrom<typeof loader>["packageLocation"]
    >();

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

So rather than waiting for the whole `document -> JavaScript -> hydrate -> request` cycle, with streaming we start the request for the slow data as soon as the document request comes in. This can significantly speed up the user experience.

Remix treats any `Promise` values as deferred data. These will be streamed to the client as each `Promise` resolves. If you'd like to prevent streaming for critical data, just use `await` and it will be included in the initial presentation of the document to the user.

```tsx
return defer({
  // critical data (not deferred):
  packageLocation: await packageLocationPromise,
  // non-critical data (deferred):
  packageLocation: packageLocationPromise,
});
```

Because of this, you can A/B test deferring, or even determine whether to defer based on the user or data being requested:

```tsx
export async function loader({
  request,
  params,
}: LoaderArgs) {
  const packageLocationPromise = getPackageLocation(
    params.packageId
  );
  const shouldDefer = await shouldDeferPackageLocation(
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

Also, because this happens at request time (even on client transitions), makes use of the URL via nested routing (rather than requiring you to render before you know what data to fetch), and it's all just regular HTTP, we can prefetch and cache the response! Meaning client-side transitions can be _much_ faster (in fact, there are plenty of situations when the user may never be presented with the fallback at all).

Another thing that's not immediately recognizable is if your server can finish loading deferred data before the client can load the JavaScript and hydrate, the server will stream down the HTML and add it to the document _before React hydrates_, thereby increasing performance for those on slow networks. This works even if you never add `<Scripts />` to the page thanks to React 18's support for out-of-order streaming.

## FAQ

### Why not defer everything by default?

The Remix defer API is another lever Remix offers to give you a nice way to choose between trade-offs. Do you want a better TTFB (Time to first byte)? Defer stuff. Do you want a low CLS (Content Layout Shift)? Don't defer stuff. You want a better TTFB, but also want a lower CLS? Defer just the slow and unimportant stuff.

It's all trade-offs, and what's neat about the API design is that it's well suited for you to do easy experimentation to see which trade-offs lead to better results for your real-world key indicators.

### When does the fallback render?

The `<Await />` component will only throw the promise up the `<Suspense>` boundary on the initial render of the `<Await />` component with an unsettled promise. It will not re-render the fallback if props change. Effectively, this means that you _will not_ get a fallback rendered when a user submits a form and loader data is revalidated. You _will_ get a fallback rendered when the user navigates to the same route with different params (in the context of our above example, if the user selects from a list of packages on the left to find their location on the right).

This may feel counter-intuitive at first, but stay with us, we really thought this through and it's important that it works this way. Let's imagine a world without the deferred API. For those scenarios you're probably going to want to implement Optimistic UI for form submissions/revalidation.

When you decide you'd like to try the trade-offs of `defer`, we don't want you to have to change or remove those optimizations because we want you to be able to easily switch between deferring some data and not deferring it. So we ensure that your existing optimistic states work the same way. If we didn't do this, then you could experience what we call "Popcorn UI" where submissions of data trigger the fallback loading state instead of the optimistic UI you'd worked hard on.

So just keep this in mind: **Deferred is 100% only about the initial load of a route and it's params.**

# Styling

The primary way to style in Remix (and the web) is to add a `<link rel="stylesheet">` to the page. In Remix, you can add these links via the [Route Module ][route-module-links] at route layout boundaries. When the route is active, the stylesheet is added to the page. When the route is no longer active, the stylesheet is removed.

```js
export function links() {
  return [
    {
      rel: "stylesheet",
      href: "https://unpkg.com/modern-css-reset@1.4.0/dist/reset.min.css",
    },
  ];
}
```

Each nested route's `links` are merged (parents first) and rendered as `<link>` tags by the `<Links/>` you rendered in `app/root.js` in the head of the document.

```tsx
import { Links } from "@remix-run/react";
// ...
export default function Root() {
  return (
    <html>
      <head>
        <Links />
        {/* ... */}
      </head>
      {/* ... */}
    </html>
  );
}
```

You can also import CSS files directly into your modules and Remix will:

1. Copy the file to your browser build directory
2. Fingerprint the file for long-term caching
3. Return the public URL to your module to be used while rendering

```tsx
// ...
import styles from "~/styles/global.css";
// styles is now something like /build/global-AE33KB2.css

export function links() {
  return [{ rel: "stylesheet", href: styles }];
}
```

## CSS Ecosystem and Performance

`<docs-info>`We are still researching how best to support, and be supported by, the various styling libraries without sacrificing the user's network tab or creating a maintenance burden for Remix.`</docs-info>`

In today's ecosystem there are dozens of approaches and frameworks for styling. Remix supports many of them out of the box, but the frameworks that require direct integration with our compiler and expect Remix to automatically inject styles onto the page don't work right now.

We recognize that not being able to use your favorite CSS framework is a bummer. If yours isn't supported right now, we hope you'll find some of the approaches in this document equally as productive. We also recognize that supporting a variety of tools is critical for migration paths to Remix.

Here's some background on where we're at.

In general, stylesheets added to the page with `<link>` tend to provide the best user experience:

- The URL is cacheable in browsers and CDNs
- The URL can be shared across pages in the app
- The stylesheet can be loaded in parallel with the JavaScript bundles
- Remix can prefetch CSS assets when the user is about to visit a page with `<Link rel="prefetch">`.
- Changes to components don't break the cache for the styles
- Changes to the styles don't break the cache for the JavaScript

Therefore, CSS support in Remix boils down to one thing: it needs to create a CSS file you can add to the page with `<link rel="stylesheet">`. This seems like a reasonable request of a CSS framework--to generate a CSS file. Remix isn't against the frameworks that can't do this, it's just too early for us to add extension points to the compiler. Additionally, adding support directly inside of Remix is not tenable with the vast number of libraries out there.

Remix also supports "runtime" frameworks like styled components where styles are evaluated at runtime but don't require any kind of bundler integration--though we would prefer your stylesheets had a URL instead of being injected into style tags.

All this is to say that **we're still researching how best to integrate and work with the frameworks that require compiler integration**. With Remix's unique ability to prefetch, add, and remove CSS for partial UI on the page, we anticipate CSS frameworks will have some new ideas on how to support building actual CSS files to better support Remix and the performance of websites using them.

The two most popular approaches in the Remix community are route-based stylesheets and [Tailwind][tailwind]. Both have exceptional performance characteristics. In this document, we'll show how to use these two approaches as well as a few more.

## Regular Stylesheets

Remix makes writing plain CSS a viable option even for apps with a lot of UI. In our experience, writing plain CSS had maintenance issues for a few reasons. It was difficult to know:

- how and when to load CSS, so it was usually all loaded on every page
- if the class names and selectors you were using were accidentally styling other UI in the app
- if some rules weren't even used anymore as the CSS source code grew over time

Remix alleviates these issues with route-based stylesheets. Nested routes can each add their own stylesheets to the page and Remix will automatically prefetch, load, and unload them with the route. When the scope of concern is limited to just the active routes, the risks of these problems are reduced significantly. The only chances for conflicts are with the parent routes' styles (and even then, you will likely see the conflict since the parent route is also rendering).

### Route Styles

Each route can add style links to the page, for example:

```tsx
import styles from "~/styles/dashboard.css";

export function links() {
  return [{ rel: "stylesheet", href: styles }];
}
```

```tsx
import styles from "~/styles/accounts.css";

export function links() {
  return [{ rel: "stylesheet", href: styles }];
}
```

```tsx
import styles from "~/styles/sales.css";

export function links() {
  return [{ rel: "stylesheet", href: styles }];
}
```

Given these routes, this table shows which CSS will apply at specific URLs:

| URL                 | Stylesheets     |
| ------------------- | --------------- |
| /dashboard          | - dashboard.css |
|                     |                 |
| /dashboard/accounts | - dashboard.css |
|                     | - accounts.css  |
|                     |                 |
| /dashboard/sales    | - dashboard.css |
|                     | - sales.css     |

It's subtle, but this little feature removes a lot of the difficulty when styling your app with plain stylesheets.

### Shared Component Styles

Websites large and small usually have a set of shared components used throughout the rest of the app: buttons, form elements, layouts, etc. When using plain style sheets in Remix there are two approaches we recommend.

#### Shared stylesheet

The first approach is very simple. Put them all in a `shared.css` file included in `app/root.tsx`. That makes it easy for the components themselves to share CSS code (and your editor to provide intellisense for things like [custom properties][custom-properties]), and each component already needs a unique module name in JavaScript anyway, so you can scope the styles to a unique class name or data attribute:

```css
/* scope with class names */
.PrimaryButton {
  /* ... */
}

.TileGrid {
  /* ... */
}

/* or scope with data attributes to avoid concatenating
   className props, but it's really up to you */
[data-primary-button] {
  /* ... */
}

[data-tile-grid] {
  /* ... */
}
```

While this file may become large, it'll be at a single URL that will be shared by all routes in the app.

This also makes it easy for routes to adjust the styles of a component without needing to add an official new variant to the API of that component. You know it won't affect the component anywhere but the `/accounts` routes.

```css
.PrimaryButton {
  background: blue;
}
```

#### Surfacing Styles

A second approach is to write individual css files per component and then "surface" the styles up to the routes that use them.

Perhaps you have a `<Button>` in `app/components/button/index.js` with styles at `app/components/button/styles.css` as well as a `<PrimaryButton>` that extends it.

Note that these are not routes, but they export `links` functions as if they were. We'll use this to surface their styles to the routes that use them.

```css
[data-button] {
  border: solid 1px;
  background: white;
  color: #454545;
}
```

```tsx
import styles from "./styles.css";

export const links = () => [
  { rel: "stylesheet", href: styles },
];

export const Button = React.forwardRef(
  ({ children, ...props }, ref) => {
    return <button {...props} ref={ref} data-button />;
  }
);
Button.displayName = "Button";
```

And then a `<PrimaryButton>` that extends it:

```css
[data-primary-button] {
  background: blue;
  color: white;
}
```

```tsx
import { Button, links as buttonLinks } from "../button";
import styles from "./styles.css";

export const links = () => [
  ...buttonLinks(),
  { rel: "stylesheet", href: styles },
];

export const PrimaryButton = React.forwardRef(
  ({ children, ...props }, ref) => {
    return (
      <Button {...props} ref={ref} data-primary-button />
    );
  }
);
PrimaryButton.displayName = "PrimaryButton";
```

Note that the primary button's `links` include the base button's links. This way consumers of `<PrimaryButton>` don't need to know its dependencies (just like JavaScript imports).

Because these buttons are not routes, and therefore not associated with a URL segment, Remix doesn't know when to prefetch, load, or unload the styles. We need to "surface" the links up to the routes that use the components.

Consider that `routes/index.js` uses the primary button component:

```tsx
import styles from "~/styles/index.css";
import {
  PrimaryButton,
  links as primaryButtonLinks,
} from "~/components/primary-button";

export function links() {
  return [
    ...primaryButtonLinks(),
    { rel: "stylesheet", href: styles },
  ];
}
```

Now Remix can prefetch, load, and unload the styles for `button.css`, `primary-button.css`, and the route's `index.css`.

An initial reaction to this is that routes have to know more than you want them to. Keep in mind that each component must be imported already, so it's not introducing a new dependency, just some boilerplate to get the assets. For example, consider a product category page like this:

```tsx
import type { LoaderArgs } from "@remix-run/node"; // or cloudflare/deno
import { json } from "@remix-run/node"; // or cloudflare/deno
import { useLoaderData } from "@remix-run/react";

import { TileGrid } from "~/components/tile-grid";
import { ProductTile } from "~/components/product-tile";
import { ProductDetails } from "~/components/product-details";
import { AddFavoriteButton } from "~/components/add-favorite-button";
import styles from "~/styles/$category.css";

export function links() {
  return [{ rel: "stylesheet", href: styles }];
}

export async function loader({ params }: LoaderArgs) {
  return json(
    await getProductsForCategory(params.category)
  );
}

export default function Category() {
  const products = useLoaderData<typeof loader>();
  return (
    <TileGrid>
      {products.map((product) => (
        <ProductTile key={product.id}>
          <ProductDetails product={product} />
          <AddFavoriteButton id={product.id} />
        </ProductTile>
      ))}
    </TileGrid>
  );
}
```

The component imports are already there, we just need to surface the assets:

```js
import {
  TileGrid,
  links as tileGridLinks,
} from "~/components/tile-grid";
import {
  ProductTile,
  links as productTileLinks,
} from "~/components/product-tile";
import {
  ProductDetails,
  links as productDetailsLinks,
} from "~/components/product-details";
import {
  AddFavoriteButton,
  links as addFavoriteLinks,
} from "~/components/add-favorite-button";
import styles from "~/styles/$category.css";

export function links() {
  return [
    ...tileGridLinks(),
    ...productTileLinks(),
    ...productDetailsLinks(),
    ...addFavoriteLinks(),
    { rel: "stylesheet", href: styles },
  ];
}

// ...
```

While that's a bit of boilerplate it enables a lot:

- You control your network tab, and CSS dependencies are clear in the code
- Co-located styles with your components
- The only CSS ever loaded is the CSS that's used on the current page
- When your components aren't used by a route, their CSS is unloaded from the page
- Remix will prefetch the CSS for the next page with 
- When one component's styles change, browser and CDN caches for the other components won't break because they are all have their own URLs.
- When a component's JavaScript changes but its styles don't, the cache is not broken for the styles

#### Asset Preloads

Since these are just `<link>` tags, you can do more than stylesheet links, like adding asset preloads for SVG icon backgrounds of your elements:

```css
[data-copy-to-clipboard] {
  background: url("/icons/clipboard.svg");
}
```

```tsx
import styles from "./styles.css";

export const links = () => [
  {
    rel: "preload",
    href: "/icons/clipboard.svg",
    as: "image",
    type: "image/svg+xml",
  },
  { rel: "stylesheet", href: styles },
];

export const CopyToClipboard = React.forwardRef(
  ({ children, ...props }, ref) => {
    return (
      <Button {...props} ref={ref} data-copy-to-clipboard />
    );
  }
);
CopyToClipboard.displayName = "CopyToClipboard";
```

Not only will this make the asset high priority in the network tab, but Remix will turn that `preload` into a `prefetch` when you link to the page with , so the SVG background is prefetched, in parallel, with the next route's data, modules, stylesheets, and any other preloads.

### Link Media Queries

Using plain stylesheets and `<link>` tags also opens up the ability to decrease the amount of CSS your user's browser has to process when it paints the screen. Link tags support `media`, so you can do the following:

```tsx
export function links() {
  return [
    {
      rel: "stylesheet",
      href: mainStyles,
    },
    {
      rel: "stylesheet",
      href: largeStyles,
      media: "(min-width: 1024px)",
    },
    {
      rel: "stylesheet",
      href: xlStyles,
      media: "(min-width: 1280px)",
    },
    {
      rel: "stylesheet",
      href: darkStyles,
      media: "(prefers-color-scheme: dark)",
    },
  ];
}
```

## Tailwind CSS

Perhaps the most popular way to style a Remix application in the community is to use Tailwind CSS. It has the benefits of inline-style collocation for developer ergonomics and is able to generate a CSS file for Remix to import. The generated CSS file generally caps out around 8-10kb, even for large applications. Load that file into the `root.tsx` links and be done with it. If you don't have any CSS opinions, this is a great approach.

First install a couple of dev dependencies:

```sh
npm install -D npm-run-all tailwindcss
```

Secondly, initialize a Tailwind config file:

```sh
npx tailwindcss init
```

Now we can tell it which files to generate classes from:

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{ts,tsx,jsx,js}"],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

Update the package scripts to generate the Tailwind file during dev and for the production build

```json
{
  // ...
  "scripts": {
    "build": "run-s \"build:*\"",
    "build:css": "npm run generate:css -- --minify",
    "build:remix": "remix build",
    "dev": "run-p \"dev:*\"",
    "dev:css": "npm run generate:css -- --watch",
    "dev:remix": "remix dev",
    "generate:css": "npx tailwindcss -o ./app/tailwind.css",
    "start": "remix-serve build"
  }
  // ...
}
```

Finally, import the generated CSS file into your app:

```tsx
import type { LinksFunction } from "@remix-run/node"; // or cloudflare/deno

// ...

import styles from "./tailwind.css";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: styles },
];
```

If you want to use Tailwind's `@apply` method to extract custom classes, create a css file in the root directory, eg `./styles/tailwind.css`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer components {
  .custom-class {
    @apply ...;
  }
}
```

Then alter how Tailwind is generating your css:

```json
{
  // ...
  "scripts": {
    "build": "run-s \"build:*\"",
    "build:css": "npm run generate:css -- --minify",
    "build:remix": "remix build",
    "dev": "run-p \"dev:*\"",
    "dev:css": "npm run generate:css -- --watch",
    "dev:remix": "remix dev",
    "generate:css": "npx tailwindcss -i ./styles/tailwind.css -o ./app/tailwind.css",
    "start": "remix-serve build"
  }
  // ...
}
```

It isn't required, but it's recommended to add the generated file to your `.gitignore` list:

```sh
node_modules

/.cache
/build
/public/build
.env

/app/tailwind.css
```

If you're using VS Code, it's recommended you install the [Tailwind IntelliSense extension][tailwind-intelli-sense-extension] for the best developer experience.

## Remote Stylesheets

You can load stylesheets from any server, here's an example of loading a modern css reset from unpkg.

```ts
import type { LinksFunction } from "@remix-run/node"; // or cloudflare/deno

export const links: LinksFunction = () => {
  return [
    {
      rel: "stylesheet",
      href: "https://unpkg.com/modern-css-reset@1.4.0/dist/reset.min.css",
    },
  ];
};
```

## PostCSS

While not built into Remix's compiler, it is straightforward to use PostCSS and add whatever syntax sugar you'd like to your stylesheets, here's the gist of it:

1. Use `postcss` cli directly alongside Remix
2. Build CSS into the Remix app directory from a styles source directory
3. Import your stylesheet to your modules like any other stylesheet

Here's how to set it up:

1. Install the dev dependencies in your app:

   ```sh
   npm install -D postcss-cli postcss autoprefixer
   ```
2. Add `postcss.config.js` in the Remix root.

   ```js
   module.exports = {
     plugins: {
       autoprefixer: {},
     },
   };
   ```
3. Add stylesheets to a `styles/` folder _next to `app/`_, we'll point postcss at this folder to build _into_ the `app/styles` folder next.

   ```sh
   mkdir styles
   touch styles/app.css
   ```
4. Add some scripts to your `package.json`

   ```json
   {
     "scripts": {
       "dev:css": "postcss styles --base styles --dir app/styles -w",
       "build:css": "postcss styles --base styles --dir app/styles --env production"
     }
   }
   ```

   These commands will process files from `./styles` into `./app/styles` where your Remix modules can import them.

   ```
   .
   ├── app
   │   └── styles (processed files)
   │       ├── app.css
   │       └── routes
   │           └── index.css
   └── styles (source files)
       ├── app.css
       └── routes
           └── index.css
   ```

   We recommend adding `app/styles` to your `.gitignore`.
5. Use it! When you're developing styles, open a terminal tab and run your new watch script:

   ```sh
   npm run dev:css
   ```

   When you're building for production, run

   ```sh
   npm run build:css
   ```

   Then import like any other css file:

   ```tsx
   import type { LinksFunction } from "@remix-run/node"; // or cloudflare/deno

   import styles from "./styles/app.css";

   export const links: LinksFunction = () => {
     return [{ rel: "stylesheet", href: styles }];
   };
   ```

You might want to use something like `concurrently` to avoid needing two terminal tabs to watch your CSS and run `remix dev`.

```sh
npm add -D concurrently
```

```json
{
  "scripts": {
    "dev": "concurrently \"npm run dev:css\" \"remix dev\""
  }
}
```

## CSS Preprocessors

You can use CSS preprocessors like LESS and SASS. Doing so requires running an additional build process to convert these files to CSS files. This can be done via the command line tools provided by the preprocessor or any equivalent tool.

Once converted to CSS by the preprocessor, the generated CSS files can be imported into your components via the [Route Module ][route-module-links] function, just like any other CSS file in Remix.

To ease development with CSS preprocessors you can add npm scripts to your `package.json` that generate CSS files from your SASS or LESS files. These scripts can be run in parallel alongside any other npm scripts that you run for developing a Remix application.

An example using SASS.

1. First you'll need to install the tool your preprocess uses to generate CSS files.

```sh
npm add -D sass
```

2. Add an npm script to your `package.json`'s `script` section' that uses the installed tool to generate CSS files.

```json
{
  // ...
  "scripts": {
    // ...
    "sass": "sass --watch app/:app/"
  }
  // ...
}
```

The above example assumes SASS files will be stored somewhere in the `app` folder.

The `--watch` flag included above will keep `sass` running as an active process, listening for changes to or for any new SASS files. When changes are made to the source file, `sass` will regenerate the CSS file automatically. Generated CSS files will be stored in the same location as their source files.

3. Run the npm script.

```sh
npm run sass
```

This will start the `sass` process. Any new SASS files, or changes to existing SASS files, will be detected by the running process.

You might want to use something like `concurrently` to avoid needing two terminal tabs to generate your CSS files and also run `remix dev`.

```sh
npm add -D concurrently
```

```json
{
  "scripts": {
    "dev": "concurrently \"npm run sass\" \"remix dev\""
  }
}
```

Running `npm run dev` will run the specified commands in parallel in a single terminal window.

## CSS-in-JS libraries

You can use CSS-in-JS libraries like Styled Components. Some of them require a "double render" in order to extract the styles from the component tree during the server render. It's unlikely this will affect performance in a significant way; React is pretty fast.

Here's some sample code to show how you might use Styled Components with Remix (you can also [find a runnable example in the Remix examples repository][styled-components-example]):

1. First you'll need to put a placeholder in your root component to control where the styles are inserted.

   ```tsx
   import type { MetaFunction } from "@remix-run/node"; // or cloudflare/deno
   import {
     Links,
     LiveReload,
     Meta,
     Outlet,
     Scripts,
     ScrollRestoration,
   } from "@remix-run/react";

   export const meta: MetaFunction = () => ({
     charset: "utf-8",
     viewport: "width=device-width,initial-scale=1",
   });

   export default function App() {
     return (
       <html lang="en">
         <head>
           <Meta />
           <Links />
           {typeof document === "undefined"
             ? "__STYLES__"
             : null}
         </head>
         <body>
           <Outlet />
           <ScrollRestoration />
           <Scripts />
           <LiveReload />
         </body>
       </html>
     );
   }
   ```
2. Your `entry.server.tsx` will look something like this:

   ```tsx
   import { renderToString } from "react-dom/server";
   import { RemixServer } from "@remix-run/react";
   import type { EntryContext } from "@remix-run/node"; // or cloudflare/deno
   import { ServerStyleSheet } from "styled-components";

   export default function handleRequest(
     request: Request,
     responseStatusCode: number,
     responseHeaders: Headers,
     remixContext: EntryContext
   ) {
     const sheet = new ServerStyleSheet();

     let markup = renderToString(
       sheet.collectStyles(
         <RemixServer
           context={remixContext}
           url={request.url}
         />
       )
     );
     const styles = sheet.getStyleTags();
     markup = markup.replace("__STYLES__", styles);

     responseHeaders.set("Content-Type", "text/html");

     return new Response("<!DOCTYPE html>" + markup, {
       status: responseStatusCode,
       headers: responseHeaders,
     });
   }
   ```

Other CSS-in-JS libraries will have a similar setup. If you've got a CSS framework working well with Remix, please [contribute an example][examples]!

NOTE: You may run into hydration warnings when using Styled Components. Hopefully [this issue][styled-components-issue] will be fixed soon.

## CSS Bundling

`<docs-warning>`CSS-bundling features are unstable and currently only available behind feature flags. We're confident in the use cases they solve, but the API and implementation may change in the future.`</docs-warning>`

`<docs-warning>`When using CSS-bundling features, you should avoid using `export *` due to an [issue with esbuild's CSS tree shaking][esbuild-css-tree-shaking-issue].`</docs-warning>`

Many common approaches to CSS within the React community are only possible when bundling CSS, meaning that the CSS files you write during development are collected into a separate bundle as part of the build process.

When using CSS-bundling features, the Remix compiler will generate a single CSS file containing all bundled styles in your application. Note that any [regular stylesheet imports][regular-stylesheet-imports] will remain as separate files.

Unlike many other tools in the React ecosystem, we do not insert the CSS bundle into the page automatically. Instead, we ensure that you always have control over the link tags on your page. This lets you decide where the CSS file is loaded relative to other stylesheets in your app.

To get access to the CSS bundle, first install the `@remix-run/css-bundle` package.

```sh
npm install @remix-run/css-bundle
```

Then, import `cssBundleHref` and add it to a link descriptor—most likely in `root.tsx` so that it applies to your entire application.

```tsx
import type { LinksFunction } from "@remix-run/node"; // or cloudflare/deno
import { cssBundleHref } from "@remix-run/css-bundle";

export const links: LinksFunction = () => {
  return [
    ...(cssBundleHref
      ? [{ rel: "stylesheet", href: cssBundleHref }]
      : []),
    // ...
  ];
};
```

With this link tag inserted into the page, you're now ready to start using the various CSS bundling features built into Remix.

### CSS Modules

`<docs-warning>`This feature is unstable and currently only available behind a feature flag. We're confident in the use cases it solves but the API and implementation may change in the future.`</docs-warning>`

First, ensure you've set up [CSS bundling][css-bundling] in your application.

Then, to enable [CSS Modules][CSS Modules], set the `future.unstable_cssModules` feature flag in `remix.config.js`.

```js
/** @type {import('@remix-run/dev').AppConfig} */
module.exports = {
  future: {
    unstable_cssModules: true,
  },
  // ...
};
```

With this feature flag enabled, you can now opt into CSS Modules via the `.module.css` file name convention. For example:

```css
.root {
  border: solid 1px;
  background: white;
  color: #454545;
}
```

```tsx
import styles from "./styles.module.css";

export const Button = React.forwardRef(
  ({ children, ...props }, ref) => {
    return (
      <button
        {...props}
        ref={ref}
        className={styles.root}
      />
    );
  }
);
Button.displayName = "Button";
```

### Vanilla Extract

`<docs-warning>`This feature is unstable and currently only available behind a feature flag. We're confident in the use cases it solves, but the API and implementation may change in the future.`</docs-warning>`

[Vanilla Extract][vanilla-extract] is a zero-runtime CSS-in-TypeScript (or JavaScript) library that lets you use TypeScript as your CSS preprocessor. Styles are written in separate `*.css.ts` (or `*.css.js`) files and all code within them is executed during the build process rather than in your user's browser. If you want to keep your CSS bundle size to a minimum, Vanilla Extract also provides an official library called [Sprinkles][sprinkles] that lets you define a custom set of utility classes and a type-safe function for accessing them at runtime.

First, ensure you've set up [CSS bundling][css-bundling] in your application.

Next, install Vanilla Extract's core styling package as a dev dependency.

```sh
npm install -D @vanilla-extract/css
```

Then, to enable Vanilla Extract, set the `future.unstable_vanillaExtract` feature flag in `remix.config.js`.

```js
/** @type {import('@remix-run/dev').AppConfig} */
module.exports = {
  future: {
    unstable_vanillaExtract: true,
  },
  // ...
};
```

With this feature flag enabled, you can now opt into Vanilla Extract via the `.css.ts`/`.css.js` file name convention. For example:

```ts
import { style } from "@vanilla-extract/css";

export const root = style({
  border: "solid 1px",
  background: "white",
  color: "#454545",
});
```

```tsx
import * as styles from "./styles.css"; // Note that `.ts` is omitted here

export const Button = React.forwardRef(
  ({ children, ...props }, ref) => {
    return (
      <button
        {...props}
        ref={ref}
        className={styles.root}
      />
    );
  }
);
Button.displayName = "Button";
```

### CSS Side-Effect Imports

`<docs-warning>`This feature is unstable and currently only available behind a feature flag. We're confident in the use cases it solves, but the API and implementation may change in the future.`</docs-warning>`

Some NPM packages use side-effect imports of plain CSS files (e.g. `import "./styles.css"`) to declare the CSS dependencies of JavaScript files. If you want to consume one of these packages, first ensure you've set up [CSS bundling][css-bundling] in your application.

Then, set the `future.unstable_cssSideEffectImports` feature flag in `remix.config.js`.

```js
/** @type {import('@remix-run/dev').AppConfig} */
module.exports = {
  future: {
    unstable_cssSideEffectImports: true,
  },
  // ...
};
```

Finally, since JavaScript runtimes don't support importing CSS in this way, you'll also need to add any relevant packages to the  option in your `remix.config.js` file. This ensures that any CSS imports are compiled out of your code before running it on the server. For example, to use React Spectrum:

```js
/** @type {import('@remix-run/dev').AppConfig} */
module.exports = {
  serverDependenciesToBundle: [
    /^@adobe\/react-spectrum/,
    /^@react-spectrum/,
    /^@spectrum-icons/,
  ],
  future: {
    unstable_cssSideEffectImports: true,
  },
  // ...
};
```

# TypeScript

Remix seamlessly supports both JavaScript and TypeScript. If you name a file with a `.ts` or `.tsx` extension, it will treat it as TypeScript (`.tsx` is for TypeScript files [with JSX][with-jsx] in them). But it isn't required. You can write all your files as `.js` files if you don't want TypeScript.

The Remix compiler will not do any type checking (it simply removes the types). If you want to do type checking, you'll want to use TypeScript's `tsc` CLI yourself. A common solution is to add a `typecheck` script to your package.json:

```json
{
  "name": "remix-app",
  "private": true,
  "sideEffects": false,
  "scripts": {
    "build": "remix build",
    "dev": "remix dev",
    "start": "remix-serve build",
    "typecheck": "tsc"
  },
  "dependencies": {
    "@remix-run/node": "latest",
    "@remix-run/react": "latest",
    "@remix-run/serve": "latest",
    "react": "^17.0.2",
    "react-dom": "^17.0.2"
  },
  "devDependencies": {
    "@remix-run/dev": "latest",
    "@remix-run/eslint-config": "latest",
    "@types/react": "^17.0.38",
    "@types/react-dom": "^17.0.11",
    "eslint": "^8.23.1",
    "typescript": "^4.7.4"
  },
  "engines": {
    "node": ">=14"
  }
}
```

Then you can run that script as part of continuous integration, alongside your tests.

Remix has TypeScript type definitions built-in as well. The starter templates create a `remix.env.d.ts` file that is referenced by the `tsconfig.json`:

```json
{
  "include": ["remix.env.d.ts", "**/*.ts", "**/*.tsx"],
  "compilerOptions": {
    "lib": ["DOM", "DOM.Iterable", "ES2019"],
    "isolatedModules": true,
    "esModuleInterop": true,
    "jsx": "react-jsx",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "target": "ES2019",
    "strict": true,
    "allowJs": true,
    "forceConsistentCasingInFileNames": true,
    "baseUrl": ".",
    "paths": {
      "~/*": ["./app/*"]
    },

    // Remix takes care of building everything in `remix build`.
    "noEmit": true
  }
}
```

```ts
/// <reference types="@remix-run/dev" />
/// <reference types="@remix-run/node" />
```

`<docs-info>`Note that the types referenced in `remix.env.d.ts` will depend on which environment you're running your app in. For example, there are different globals available in Cloudflare`</docs-info>`

# Cache Control

## In Routes Modules

Each route can also define its http headers. This is mostly important for http caching. Remix doesn't rely on building your website into static files to be uploaded to a CDN for performance, instead we rely on cache headers. The end result of either approach is the same: a static document on a CDN. [Check out this video for more information on that][check-out-this-video-for-more-information-on-that].

Usually, the difficulty with cache headers is configuring them. In Remix we've made it easy. Just export a `headers` function from your route.

```tsx
export function headers() {
  return {
    "Cache-Control": "public, max-age=300, s-maxage=3600",
  };
}

export function meta() {
  /* ... */
}

export default function Gists() {
  /* ... */
}
```

The max-age tells the user's browser to cache this for 300 seconds, or 5 minutes. That means if they click back or on a link to the same page again within 5 minutes, the browser won't even make a request for the page, it will use the cache.

The s-maxage tells the CDN to cache it for an hour. Here's what it looks like when the first person visits our website:

1. Request comes in to the website, which is really the CDN
2. CDN doesn't have the document cached, so it makes a request to our server (the "origin server").
3. Our server builds the page and sends it to the CDN
4. The CDN caches it and sends it to the visitor.

Now, when the next person visits our page, it looks like this:

1. Request comes to the CDN
2. CDN has the document cached already and sends it right away without ever touching our origin server!

We have a lot more to say about caching in the [CDN Caching][cdn-caching] guide, make sure to read it sometime.

## In Loaders

We saw that our routes can define their cache control, so why does it matter for loaders? It matters for two reasons:

First, your data usually knows better what the cache control should be than your route because the data changes more often than the markup. Because of this, the loader's headers are passed to the route's header function.

Open up `app/routes/gists.ts` and update your headers function like so:

```tsx
export function headers({
  loaderHeaders,
}: {
  loaderHeaders: Headers;
}) {
  return {
    "Cache-Control": loaderHeaders.get("Cache-Control"),
  };
}
```

The `loaderHeaders` object is an instance of the [Web Fetch API Headers constructor][web-fetch-api-headers-constructor]

Now when the browser or a CDN wants to cache our page, it gets the headers from our data source, which is usually what you want. Note in our case we're actually just using headers GitHub sent in the response from our fetch!

The second reason this matters is that Remix calls your loaders via `fetch` in the browser on client-side transitions. By returning good cache headers here, when the user clicks back/forward or visits the same page multiple times, the browser won't actually make another request for the data but will use a cached version instead. This greatly speeds up a website's performance, even for pages that you can't cache on a CDN. A lot of React apps rely on a JavaScript cache, but browser caches already work great!

[react-training]: https://reacttraining.com
[the-github-gist-api]: https://api.github.com/gists
[web-fetch-api]: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API
[request]: https://developer.mozilla.org/en-US/docs/Web/API/Request
[response]: https://developer.mozilla.org/en-US/docs/Web/API/Response
[url-search-params]: https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams
[url]: https://developer.mozilla.org/en-US/docs/Web/API/URL
[esbuild]: https://esbuild.github.io/
[cf]: https://workers.cloudflare.com/
[deno]: https://deno.com/deploy/docs
[fetch]: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API
[vercel]: https://vercel.com
[netlify]: https://netlify.com
[arc]: https://arc.codes
[repo access token]: https://github.com/settings/tokens/new?description=Remix%20Private%20Stack%20Access&scopes=repo
[inquirer]: https://npm.im/inquirer
[read-the-feature-announcement-blog-post]: /blog/remix-stacks
[watch-remix-stacks-videos-on-you-tube]: https://www.youtube.com/playlist?list=PLXoynULbYuEC8-gJCqyXo94RufAvSA6R3
[the-blues-stack]: https://github.com/remix-run/blues-stack
[the-indie-stack]: https://github.com/remix-run/indie-stack
[the-grunge-stack]: https://github.com/remix-run/grunge-stack
[form-data]: https://developer.mozilla.org/en-US/docs/Web/API/FormData
[query-string]: https://www.npmjs.com/package/query-string
[ramda]: https://www.npmjs.com/package/ramda
[watch-on-you-tube]: https://www.youtube.com/watch?v=w2i-9cYxSdc&ab_channel=Remix
[esbuild]: https://esbuild.github.io/
[remix-upload-handlers-like-unstable-create-file-upload-handler-and-unstable-create-memory-upload-handler]: ../utils/parse-multipart-form-data#uploadhandler
[css-bundling]: ../guides/styling#css-bundling
[esbuild-css-tree-shaking-issue]: https://github.com/evanw/esbuild/issues/1370
[server-entry-module]: ./entry.server
[browser-entry-module]: ./entry.client
[minimatch]: https://www.npmjs.com/package/minimatch
[server-build-path]: #serverbuildpath
[server-build-target]: #serverbuildtarget
[arc]: https://arc.codes
[cloudflare-pages]: https://pages.cloudflare.com
[cloudflare-workers]: https://workers.cloudflare.com
[deno]: https://deno.land
[netlify]: https://www.netlify.com
[node-cjs]: https://nodejs.org/en
[vercel]: https://vercel.com
[dilum-sanjaya]: https://twitter.com/DilumSanjaya
[an-awesome-visualization]: https://remix-routing-demo.netlify.app
[remix-dev]: ../other-api/dev#remix-dev
[app-directory]: #appDirectory
[css-side-effect-imports]: ../guides/styling#css-side-effect-imports
[csp]: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy/script-src
[csp-nonce]: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy/Sources#sources
[meta]: ../route/meta
[links]: ../route/links
[loader]: ../route/loader
[action]: ../route/action
[meta]: ../route/meta
[headers]: ../routes/headers
[links]: ../route/links
[error-boundary]: ../route/error-boundary
[catch-boundary]: ../route/catch-boundary
[outlet]: ../components/outlet
[view-example-app]: https://github.com/remix-run/examples/tree/main/multiple-params
[use-params]: https://reactrouter.com/hooks/use-params
[params]: ../route/loader#params
[routing-guide]: ../guides/routing
[root-route]: #root-route
[resource-route]: ../guides/resource-routes
[routeconvention-v2]: ./route-files-v2
[flatroutes-rfc]: https://github.com/remix-run/remix/discussions/4482
[loader]: ../route/loader
[action]: ../route/action
[outlet]: ../components/outlet
[routing-guide]: ../guides/routing
[root-route]: #root-route
[resource-route]: ../guides/resource-routes
[routeconvention-v2]: ./route-files-v2
[flatroutes-rfc]: https://github.com/remix-run/remix/discussions/4482
[root-route]: #root-route
[index-route]: ../guides/routing#index-routes
[nested-routing]: ../guides/routing#what-is-nested-routing
[nested-routes]: #nested-routes
[remix-config]: ./remix-config#routes
[dot-delimiters]: #dot-delimiters
[dynamic-segments]: #dynamic-segments
[remix-config]: ./remix-config#routes
[flat-routes]: https://github.com/kiliman/remix-flat-routes
[form]: ../components/form
[form action]: ../components/form#action
[index query param]: ../guides/routing#what-is-the-index-query-param
[error-boundaries]: https://reactjs.org/docs/error-boundaries.html
[use-matches]: ../hooks/use-matches
[headers]: https://developer.mozilla.org/en-US/docs/Web/API/Headers
[handledatarequest]: ../file-conventions/entry.server
[link tag]: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/link
[fetch]: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API
[request]: https://developer.mozilla.org/en-US/docs/Web/API/Request
[response]: https://developer.mozilla.org/en-US/docs/Web/API/Response
[urlsearchparams]: https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams
[headers]: ../route/headers
[mdn-meta]: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meta
[open-graph-tags]: https://ogp.me
[html-title-element]: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/title
[http-equiv-tag]: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meta#attr-http-equiv
[meta-v2]: #metav2
[root-route]: ../file-conventions/root
[matches]: #matches
[index-route]: ../guides/routing#index-routes
[merge-meta]: https://gist.github.com/ryanflorence/ec1849c6d690cfbffcb408ecd633e069
[url-params]: ../guides/routing#dynamic-segments
[url-params]: ../guides/routing#dynamic-segments
[defer]: ../utils/defer
[streaming-guide]: ../guides/streaming
[useloaderdata]: ../hooks/use-loader-data
[index query param]: ../guides/routing#what-is-the-index-query-param
[usetransition]: ../hooks/use-transition
[useactiondata]: ../hooks/use-action-data
[usesubmit]: ../hooks/use-submit
[http-verb]: https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods
[rr-form]: https://reactrouter.com/components/form
[rr-link]: https://reactrouter.com/en/main/components/link
[links]: ../route/links
[meta]: ../route/meta
[meta]: ../route/meta
[rr-scrollrestoration]: https://reactrouter.com/en/main/components/scroll-restoration
[action]: ../route/action
[usetransition]: ../hooks/use-transition
[rr-useactiondata]: https://reactrouter.com/hooks/use-action-data
[rr-usebeforeunload]: https://reactrouter.com/hooks/use-before-unload
[form]: ../components/form
[index query param]: ../guides/routing#what-is-the-index-query-param
[usetransition]: ./use-transition
[useactiondata]: ./use-action-data
[useloaderdata]: ./use-loader-data
[rr-useformaction]: https://reactrouter.com/hooks/use-form-action
[rr-useloaderdata]: https://reactrouter.com/hooks/use-loader-data
[disabling-javascript]: ../guides/disabling-javascript
[example-sharing-loader-data]: https://github.com/remix-run/examples/tree/main/sharing-loader-data
[rr-usenavigation]: https://reactrouter.com/hooks/use-navigation
[rr-userevalidator]: https://reactrouter.com/hooks/use-revalidator
[rr-userouteloaderdata]: https://reactrouter.com/hooks/use-route-loader-data
[rr-usesubmit]: https://reactrouter.com/hooks/use-submit
[usefetcher]: ./use-fetcher
[form-data]: https://developer.mozilla.org/en-US/docs/Web/API/FormData
[use-navigation]: ./use-navigation
[sessions]: ./sessions
[cookie]: https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies
[cookie-attrs]: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie#attributes
[json]: ./json
[the-browser-file-api]: https://developer.mozilla.org/en-US/docs/Web/API/File
[cookies]: ./cookies
[constraints]: ../guides/constraints
[csrf]: https://developer.mozilla.org/en-US/docs/Glossary/CSRF
[cloudflare-kv]: https://developers.cloudflare.com/workers/learning/how-kv-works
[amazon-dynamo-db]: https://docs.aws.amazon.com/amazondynamodb/latest/developerguide
[remix-app-server]: ./serve
[node-inspector]: https://nodejs.org/en/docs/guides/debugging-getting-started
[templates-folder-of-the-remix-repository]: https://github.com/remix-run/remix/tree/main/templates
[web-fetch-api]: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API
[remix-google-cloud-functions]: https://github.com/penx/remix-google-cloud-functions
[google-cloud-functions]: https://cloud.google.com/functions
[firebase-functions]: https://firebase.google.com/docs/functions
[remix-run-express]: adapter#createrequesthandler
[outlet]: ../components/outlet
[use-location]: https://reactrouter.com/hooks/use-location
[use-navigate]: https://reactrouter.com/hooks/use-navigate
[use-params]: https://reactrouter.com/hooks/use-params
[use-resolved-path]: https://reactrouter.com/hooks/use-resolved-path
[json]: ../utils/json
[redirect]: ../utils/redirect
[https-developer-mozilla-org-en-us-docs-web-api-fetch-api]: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API
[link]: ../components/link
[navlink]: ../components/nav-link
[scripts]: ../components/scripts
[wcag]: https://www.w3.org/WAI/standards-guidelines/wcag/
[marcy-sutton-led-and-published-findings-from-user-research]: https://www.gatsbyjs.com/blog/2019-07-11-user-testing-accessible-client-routing
[resource-routes]: ./resource-routes
[pe]: https://en.wikipedia.org/wiki/Progressive_enhancement
[esm-browsers]: https://caniuse.com/es6-module
[msie]: https://techcommunity.microsoft.com/t5/microsoft-365-blog/microsoft-365-apps-say-farewell-to-internet-explorer-11-and/ba-p/1591666
[action]: ../route/action
[catch-boundary]: ../route/catch-boundary
[cloudflare-kv-setup]: https://developers.cloudflare.com/workers/cli-wrangler/commands#kv
[cloudflare-kv]: https://developers.cloudflare.com/workers/learning/how-kv-works
[error-boundary]: ../route/error-boundary
[fauna]: https://fauna.com
[fetcher-submit]: ../hooks/use-fetcher#fetchersubmit
[loader]: ../route/loader
[prisma]: https://prisma.io
[request]: https://developer.mozilla.org/en-US/docs/Web/API/Request
[search-params-getall]: https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams/getAll
[should-reload]: ../route/should-reload
[url-search-params]: https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams
[url]: https://developer.mozilla.org/en-US/docs/Web/API/URL
[use-submit]: ../hooks/use-submit
[useloaderdata]: ../hooks/use-loader-data
[form]: ../components/form
[use-submit]: ../hooks/use-submit
[use-fetcher]: ../hooks/use-fetcher
[use-transition]: ../hooks/use-transition
[actions]: ../route/action
[loaders]: ../route/loader
[dotenv]: https://www.npmjs.com/package/dotenv
[netlify]: https://docs.netlify.com/configure-builds/environment-variables
[fly-io]: https://fly.io/docs/reference/secrets
[cloudflare-pages]: https://developers.cloudflare.com/pages/platform/build-configuration/#environment-variables
[cloudflare-workers]: https://developers.cloudflare.com/workers/platform/environment-variables
[vercel]: https://vercel.com/docs/environment-variables
[architect]: https://arc.codes/docs/en/reference/cli/env
[dev-vars]: https://developers.cloudflare.com/pages/platform/functions/#adding-environment-variables-locally
[error-boundary]: ../route/error-boundary
[error-in-a-nested-route-where-the-parent-route-s-navigation-renders-normally]: /docs-images/error-boundary.png
[mdx]: https://mdxjs.com
[yaml]: https://yaml.org
[mdx-bundler]: https://github.com/kentcdodds/mdx-bundler
[react-router]: https://reactrouter.com
[react-router-docs]: https://reactrouter.com/start/concepts
[migration-guide-from-v5-to-v6]: https://reactrouter.com/upgrading/v5
[backwards-compatibility-package]: https://www.npmjs.com/package/react-router-dom-v5-compat
[a-few-tweaks-to-improve-progressive-enhancement]: ../pages/philosophy#progressive-enhancement
[routing-conventions]: ./routing
[a-catch-all-route]: ./routing#splats
[hydration-mismatch]: https://reactjs.org/docs/react-dom.html#hydrate
[loader-data]: ../route/loader
[client-only-component]: https://github.com/sergiodxa/remix-utils/blob/main/src/react/client-only.tsx
[remix-utils]: https://www.npmjs.com/package/remix-utils
[examples-repository]: https://github.com/remix-run/examples/blob/main/client-only-components/app/routes/index.tsx
[react-lazy]: https://reactjs.org/docs/code-splitting.html#reactlazy
[react-suspense]: https://reactjs.org/docs/react-api.html#reactsuspense
[client-only-approach]: #client-only-components
[loadable-components]: https://loadable-components.com/docs/loadable-vs-react-lazy
[docs-on-configuration]: ../file-conventions/remix-config
[see-our-docs-on-route-links-for-more-information]: ../route/links
[react-svgr]: https://react-svgr.com
[command-line]: https://react-svgr.com/docs/cli
[online-playground]: https://react-svgr.com/playground
[read-more-about-route-styles-and-why-remix-does-things-a-bit-differently]: #route-stylesheets
[page-link-descriptor-object]: ../route/links#pagelinkdescriptor
[react-helmet]: https://www.npmjs.com/package/react-helmet
[remix-philosophy]: ../pages/philosophy
[remix-technical-explanation]: ../pages/technical-explanation
[data-loading-in-remix]: ./data-loading
[routing-in-remix]: ./routing
[styling-in-remix]: ./styling
[frequently-asked-questions]: ../pages/faq
[common-gotchas]: ../pages/currently
[css-modules]: ./styling#css-modules
[patch-package]: https://www.npmjs.com/package/patch-package
[catch-boundary]: ../route/catch-boundary
[errors]: ./errors
[404-status-code]: https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/404
[splat-route]: ./routing#splats
[use-fetcher]: ../hooks/use-fetcher
[fetcher-submit]: ../hooks/use-fetcher#fetchersubmit
[fetcher-submission]: ../hooks/use-fetcher#fetchersubmission
[use-navigation]: https://reactrouter.com/hooks/use-navigation
[navigation-formdata]: https://reactrouter.com/hooks/use-navigation#navigationformdata
[use-submit]: ../hooks/use-submit
[error-boundary]: ../route/error-boundary
[form-data]: https://developer.mozilla.org/en-US/docs/Web/API/FormData
[html-input]: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/text#additional_attributes
[unpkg-com]: https://unpkg.com
[fly]: https://fly.io
[remix-cloudflare-workers-demo]: https://remix-cloudflare-demo.jacob-ebey.workers.dev
[kv]: https://developers.cloudflare.com/workers/learning/how-kv-works
[durable-objects]: https://blog.cloudflare.com/introducing-workers-durable-objects
[fauna-db]: https://fauna.com
[lru-cache]: https://www.npmjs.com/package/lru-cache
[redis]: https://www.npmjs.com/package/redis
[await]: ../components/await
[defer]: ../utils/defer
[link]: ../components/link
[usefetcher]: ../hooks/use-fetcher
[useasyncvalue]: ../api/remix#useasyncvalue
[react-lazy]: https://reactjs.org/docs/code-splitting.html#reactlazy
[web-streaming-api]: https://developer.mozilla.org/en-US/docs/Web/API/Streams_API
[graphs-showing-how-document-and-slow-data-requests-sent-over-the-same-response-significantly-speed-up-the-largest-contentful-paint]: https://user-images.githubusercontent.com/12063586/179609347-36bd7d32-c8af-4e24-9e89-06d9abc0a19f.svg
[custom-properties]: https://developer.mozilla.org/en-US/docs/Web/CSS/--*
[link]: ../components/link
[route-module-links]: ../route/links
[styled-components-example]: https://github.com/remix-run/examples/tree/main/styled-components
[examples]: https://github.com/remix-run/examples
[styled-components-issue]: https://github.com/styled-components/styled-components/issues/3660
[tailwind]: https://tailwindcss.com
[tailwind-intelli-sense-extension]: https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss
[esbuild-css-tree-shaking-issue]: https://github.com/evanw/esbuild/issues/1370
[css modules]: https://github.com/css-modules/css-modules
[regular-stylesheet-imports]: #regular-stylesheets
[server-dependencies-to-bundle]: ../file-conventions/remix-config#serverdependenciestobundle
[css-bundling]: #css-bundling
[vanilla-extract]: https://vanilla-extract.style
[sprinkles]: https://vanilla-extract.style/documentation/packages/sprinkles
[with-jsx]: https://www.typescriptlang.org/docs/handbook/jsx.html
[check-out-this-video-for-more-information-on-that]: https://youtu.be/bfLFHp7Sbkg
[cdn-caching]: ../guides/caching
[web-fetch-api-headers-constructor]: https://developer.mozilla.org/en-US/docs/Web/API/Headers
