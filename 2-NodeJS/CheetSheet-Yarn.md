### npm equivalents
```
npm											yarn
npm init									yarn init
npm install									yarn
npm install gulp --save						yarn add gulp
npm install gulp --save-dev --save-exact	yarn add gulp --dev --exact
npm install -g gulp							yarn global add gulp
npm update									yarn upgrade
./node_modules/.bin/gulp					yarn run gulp
```

### yarn install
```
--no-lockfile
--pure-lockfile
--frozen-lockfile
--silent
--offline
--update-checksums
--check-files
--flat
--force
--ignore-scripts
--modules-folder <path>
--production[=true|false]
// These options are available for yarn install.
```

### yarn add
```
--dev
--peer
--optional
--exact
--tilde
// These options are available for yarn add.
```

### Workspaces
In package.json:
```
"workspaces": [
  "packages/*"
]
jest/
├─ package.json
└─ packages/
   ├─ jest-matcher-utils/
   │  └─ package.json
   └─ jest-diff/
      └─ package.json

// (New in 1.0) Allows monorepos to share packages with each other.
```

### Selective version resolution
// In package.json:
```
"resolutions": {
	"**/sass-brunch/node-sass": "4.5.2"
}
```
(New in 1.0) Allows you to specify versions for sub-dependencies.
```

###Create
```
yarn create react-app hello
```