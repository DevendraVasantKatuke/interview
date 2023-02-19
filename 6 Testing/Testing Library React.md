# Introduction
The `@testing-library` family of packages helps you test UI components in a user-centric way.

The more your tests resemble the way your software is used, the more confidence they can give you.

## The problem
You want to write maintainable tests that give you high confidence that your components are working for your users. As a part of this goal, you want your tests to avoid including implementation details so refactors of your components (changes to implementation but not functionality) don't break your tests and slow you and your team down.

## The solution
The core library, `DOM Testing Library`, is a light-weight solution for testing web pages by querying and interacting with DOM nodes (whether simulated with `JSDOM/Jest` or in the browser). The main utilities it provides involve querying the DOM for nodes in a way that's similar to how the user finds elements on the page. In this way, the library helps ensure your tests give you confidence that your application will work when a real user uses it.

The core library has been wrapped to provide ergonomic APIs for several frameworks, including `React`, `Angular`, and `Vue`. There is also a plugin to use testing-library queries for end-to-end tests in `Cypress` and an implementation for `React Native`.

## What this library is not
1. A test runner or framework
2. Specific to a testing framework
`DOM Testing Library` works with any environment that provides DOM APIs, such as Jest, Mocha + JSDOM, or a real browser.

## What you should avoid with Testing Library
Testing Library encourages you to avoid testing implementation details like the internals of a component you're testing (though it's still possible). The Guiding Principles of this library emphasize a focus on tests that closely resemble how your web pages are interacted by the users.

You may want to avoid the following implementation details:

1. Internal state of a component
2. Internal methods of a component
3. Lifecycle methods of a component
4. Child components

# Guiding Principles
The more your tests resemble the way your software is used, the more confidence they can give you.

We try to only expose methods and utilities that encourage you to write tests that closely resemble how your web pages are used.

Utilities are included in this project based on the following guiding principles:

1. If it relates to rendering components, then it should deal with DOM nodes rather than component instances, and it should not encourage dealing with component instances.
2. It should be generally useful for testing the application components in the way the user would use it. We are making some trade-offs here because we're using a computer and often a simulated browser environment, but in general, utilities should encourage tests that use the components the way they're intended to be used.
3. Utility implementations and APIs should be simple and flexible.

At the end of the day, what we want is for this library to be pretty light-weight, simple, and understandable.

# FAQ
1. Can I write unit tests with this library?

Definitely yes! You can write unit, integration, and end-to-end tests with this library.

As you write your tests, keep in mind:

The more your tests resemble the way your software is used, the more confidence they can give you. - 17 Feb 2018

2. What if my app is localized and I don't have access to the text in test?

This is fairly common. Our first bit of advice is to try to get the default text used in your tests. That will make everything much easier (more than just using this utility). If that's not possible, then you're probably best to just stick with `data-testids` (which is not bad anyway).

3. I really don't like data-testids, but none of the other queries make sense. Do I have to use a data-testid?

Definitely not. That said, a common reason people don't like the `data-testid` attribute is they're concerned about shipping that to production. I'd suggest that you probably want some simple E2E tests that run in production on occasion to make certain that things are working smoothly. In that case the `data-testid` attributes will be very useful. Even if you don't run these in production, you may want to run some E2E tests that run on the same code you're about to ship to production. In that case, the `data-testid` attributes will be valuable there as well.

All that said, if you really don't want to ship `data-testid` attributes, then you can use this simple babel plugin to remove them.

If you don't want to use them at all, then you can simply use regular DOM methods and properties to query elements off your container.
```
const firstLiInDiv = container.querySelector('div li')
const allLisInDiv = container.querySelectorAll('div li')
const rootElement = container.firstChild
```

4. What if I’m iterating over a list of items that I want to put the data-testid="item" attribute on. How do I distinguish them from each other?

You can make your selector just choose the one you want by including :nth-child in the selector.
```
const thirdLiInUl = container.querySelector('ul > li:nth-child(3)')
```

Or you could use `getAllByRole` to query the `listitem` role and access the index in question:
```
const items = [
  /* your items */
]
const {container} = render(/* however you render this stuff */)
const thirdItem = getAllByRole(container, 'listitem')[2]
```

5. Help! I can't access component methods or the component instance!

This is intentional.

We want you to focus on testing the output and functionality of the component as it is observed by the user and to avoid worrying about the implementation details of the component.

We believe this leads to less brittle and more meaningful test code.

Please refer to the Guiding Principles of this testing library for more info.