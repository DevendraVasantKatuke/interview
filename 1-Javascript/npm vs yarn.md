## Common NPM commands in Yarn

|NPM Command | Yarn Command| Description (_wherever necessary_)|
|:---|:---|---|
|npm install|yarn <br/> yarn install|Will install packages listed in the `package.json` file|
|npm install `pkg-name` <br/> npm install --save `pkg-name`| yarn add `pkg-name`|By default Yarn adds the `pgk-name` to `package.json` and `yarn.lock` files|
|npm install `pkg-name@1.0.0` | yarn add `pgk-name@1.0.0`|
|npm install `pkg-name` --save-dev| yarn add `pkg-name` --dev|
|npm install `pkg-name` --peer| yarn add `pkg-name`--peer|
|npm install `pkg-name` --optional| yarn add --optional|
|npm install -g `pkg-name`| yarn global add `pkg-name`| Careful, yarn add global `pkg-name` adds packages `global` and `pkg-name` locally! |
|npm update | yarn upgrade| Note: It's called **upgrade** in yarn|
|npm uninstall `pkg-name`| yarn remove `pkg-name`|
|npm run `script-name`| yarn run `script-name`|
|npm init | yarn init|
|npm pack | yarn pack| Creates a compressed gzip archive of the package dependencies|
|npm link | yarn link|
|npm outdated | yarn outdated|
|npm publish | yarn publish|
|npm run | yarn run|
|npm cache clean | yarn cache clean|
|npm login | yarn login (and logout)|
|npm test | yarn test|
|npm install --production | yarn --production|
|npm  --version | yarn version|
|npm  info | yarn info|


### New Commands in Yarn
|Yarn Command | Description|
|---|---|
|yarn why `pkg-name` | Builds a dependency graph on why this package is being used|
|yarn clean | Frees up space by removing unnecessary files and folders from dependencies|
|yarn licenses ls | Inspect the licenses of your dependencies|
|yarn licenses generate-disclaimer | Automatically create your license dependency disclaimer|

---
title: npm vs Yarn Command Translation Cheat Sheet
subtitle: CLI commands comparison
author: yarn
date: February 15, 2020
source: https://yarnpkg.com/en/docs/migrating-from-npm
---

# npm vs Yarn Command Translation Cheat Sheet

|                    npm                    |               Yarn              |
|-------------------------------------------|---------------------------------|
| `npm init`                                | `yarn init`                     |
| `npm install`                             | `yarn install`                  |
| `(N/A)`                                   | `yarn install --flat`           |
| `(N/A)`                                   | `yarn install --har`            |
| `(N/A)`                                   | `yarn install --no-lockfile`    |
| `(N/A)`                                   | `yarn install --pure-lockfile`  |
| `npm install [package]`                   | `(N/A)`                         |
| `npm install --save [package]`            | `yarn add [package]`            |
| `npm install --save-dev [package]`        | `yarn add [package] --dev`      |
| `(N/A)`                                   | `yarn add [package] --peer`     |
| `npm install --save-optional [package]`   | `yarn add [package] --optional` |
| `npm install --save-exact [package]`      | `yarn add [package] --exact`    |
| `(N/A)`                                   | `yarn add [package] --tilde`    |
| `npm install --global [package]`          | `yarn global add [package]`     |
| `npm update --global`                     | `yarn global upgrade`           |
| `npm rebuild`                             | `yarn add --force`              |
| `npm uninstall [package]`                 | `(N/A)`                         |
| `npm uninstall --save [package]`          | `yarn remove [package]`         |
| `npm uninstall --save-dev [package]`      | `yarn remove [package]`         |
| `npm uninstall --save-optional [package]` | `yarn remove [package]`         |
| `npm cache clean`                         | `yarn cache clean`              |
| `rm -rf node_modules && npm install`      | `yarn upgrade`                  |
| `npm version major`                       | `yarn version --major`          |
| `npm version minor`                       | `yarn version --minor`          |
| `npm version patch`                       | `yarn version --patch`          |