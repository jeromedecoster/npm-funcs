# npm-funcs

> A very limited subset of npm functions I use every day

## Install

```bash
npm i npm-funcs
```

Package [on npm](https://www.npmjs.com/package/npm-funcs)

## API

* [dependencies](#dependenciesname)
* [dependents](#dependentsname)
* [downloads](#downloadsname)
* [packages](#packagesname)
* [version](#versionname)
* [versions](#versionsname)

#### dependencies(name)

Get some infos about the dependencies of a npm package

| Argument | Action |
| :------ | :------- |
| **name** | the package `name` |

Return a Promise. The resolve function receive a JSON as described below

For each package in the dependencies section, returns some properties

| Property | Action |
| :------ | :------- |
| **version** | the current `version` of the package |
| **range** | the dependency `range` declared in the `package.json` file |
| **outdated** | indicates if the dependency `range` does not satisfies the current `version` – [semver satisfies](https://github.com/npm/node-semver) |


```js
const dependencies = require('npm-funcs/dependencies')

/*
{
  name: 'object-funcs',
  version: '0.4.0',
  dependencies: {
    'is-funcs': {
      version: '0.5.1',
      range: '^0.5.0',
      outdated: false
    }
  }
}
*/
dependencies('object-funcs')
.then(function(data) {
  console.log(data)
})
```

---

#### dependents(name)

Get relational infos on all packages that depend of a specific npm package

| Argument | Action |
| :------ | :------- |
| **name** | the package `name` |

Return a Promise. The resolve function receive a JSON as described below

For each dependent package, returns some properties

| Property | Action |
| :------ | :------- |
| **version** | the current `version` of the dependent package |
| **range** | the dependency `range` declared in the dependent package `package.json` file |
| **outdated** | indicates if the dependency `range` does not satisfies the current `version` – [semver satisfies](https://github.com/npm/node-semver) |

```js
const dependents = require('npm-funcs/dependents')

/*
{
  name: 'is-funcs',
  version: '0.5.1',
  dependents: {
    'dom-funcs': {
      version: '0.1.0',
      range: '^0.5.1',
      outdated: false
    },
    'fold-notifier': {
      version: '0.1.0',
      range: '^0.3.2',
      outdated: true
    },
    '//': '// 4 more objects...'
  },
  count: 6
}
*/
dependents('is-funcs')
.then(function(data) {
  console.log(data)
})
```

---

#### downloads(name)

Get the downloads statistics of a npm package

| Argument | Action |
| :------ | :------- |
| **name** | the package `name` |

Return a Promise. The resolve function receive a JSON as described below

```js
const downloads = require('npm-funcs/downloads')

/*
{
  name: 'is-funcs',
  downloads: {
    '2016-07-08': 84,
    '2016-07-09': 15,
    '//': '// more lines...'
  },
  total: 864
}
*/
downloads('is-funcs')
.then(function(data) {
  console.log(data)
})
```

---

#### packages(name)

Get the packages of a npm author

| Argument | Action |
| :------ | :------- |
| **name** | the author `name` |

Return a Promise. The resolve function receive a JSON as described below

```js
const packages = require('npm-funcs/packages')

/*
{
  name: 'jeromedecoster',
  packages: {
    'is-funcs': { version: '0.5.1', date: '2016-07-13' },
    'object-funcs': { version: '0.4.0', date: '2016-07-12' },
    '//': '// 30 more lines...'
  },
  count: 32
}
*/
packages('jeromedecoster')
.then(function(data) {
  console.log(data)
})
```

---

#### versions(name)

Get all the versions of a npm package

| Argument | Action |
| :------ | :------- |
| **name** | the package `name` |

Return a Promise. The resolve function receive a JSON as described below

```js
const versions = require('npm-funcs/versions')

/*
{
  name: 'is-funcs',
  versions: {
    '0.0.0': '2016-05-27',
    '0.1.0': '2016-05-31',
    '0.2.0': '2016-06-08',
    '0.2.1': '2016-06-08',
    '0.3.0': '2016-06-13',
    '0.3.1': '2016-06-14',
    '0.3.2': '2016-06-17',
    '0.4.0': '2016-07-01',
    '0.4.1': '2016-07-03',
    '0.5.0': '2016-07-08',
    '0.5.1': '2016-07-13'
  },
  count: 11
}
*/
versions('is-funcs')
.then(function(data) {
  console.log(data)
})
```

---

#### version(name)

Get the latest version of a npm package

```js
const version = require('npm-funcs/version')

/*
{
  name: 'is-funcs',
  version: '0.5.1'
}
*/
version('is-funcs')
.then(function(data) {
  console.log(data)
})
```

## License

MIT
