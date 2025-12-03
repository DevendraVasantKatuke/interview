##### Exponentiation Operator
```javascript
let squared = 2 ** 2; // same as: 2 * 2
let cubed = 2 ** 3; // same as: 2 * 2 * 2

let a = 2;
a **= 2; // same as: a = a * a;

let b = 3;
b **= 3; // same as: b = b * b * b;
```
##### Async Functions
Instead of async function/await, the following are options:
```javascript
function^/await
function!/yield
function!/await
function^/yield
```
##### Object Rest/Spread
Rest Properties:
```javascript
let { x, y, ...z } = { x: 1, y: 2, a: 3, b: 4 };
x; // 1
y; // 2
z; // { a: 3, b: 4 }
```
Spread Properties:
```javascript
let n = { x, y, ...z };
n; // { x: 1, y: 2, a: 3, b: 4 }
```
##### Dynamic Import
**`import()` enables lazy-loading modules upon navigation in a very simple single-page application:**
```html
<!DOCTYPE html>
<nav>
  <a href="books.html" data-entry-module="books">Books</a>
  <a href="movies.html" data-entry-module="movies">Movies</a>
  <a href="video-games.html" data-entry-module="video-games">Video Games</a>
</nav>

<main>Content will load here!</main>

<script>
  const main = document.querySelector("main");
  for (const link of document.querySelectorAll("nav > a")) {
    link.addEventListener("click", e => {
      e.preventDefault();

      import(`./section-modules/${link.dataset.entryModule}.js`)
        .then(module => {
          module.loadPageInto(main);
        })
        .catch(err => {
          main.textContent = err.message;
        });
    });
  }
</script>
```
Note the differences here compared to the usual `import` declaration:

* `import()` can be used from scripts, not just from modules.
* If `import()` is used in a module, it can occur anywhere at any level, and is not hoisted.
* `import()` accepts arbitrary strings (with runtime-determined template strings shown here), not just static string literals.
* The presence of `import()` in the module does not establish a dependency which must be fetched and evaluated before the containing module is evaluated.
* `import()` does not establish a dependency which can be statically analyzed. (However, implementations may still be able to perform speculative fetching in simpler cases like `import("./foo.js")`.)

**Using host-specific mechanisms**
```javascript
function importModule(url) {
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    const tempGlobal = "__tempModuleLoadingVariable" + Math.random().toString(32).substring(2);
    script.type = "module";
    script.textContent = `import * as m from "${url}"; window.${tempGlobal} = m;`;

    script.onload = () => {
      resolve(window[tempGlobal]);
      delete window[tempGlobal];
      script.remove();
    };

    script.onerror = () => {
      reject(new Error("Failed to load module script with URL " + url));
      delete window[tempGlobal];
      script.remove();
    };

    document.documentElement.appendChild(script);
  });
}
```