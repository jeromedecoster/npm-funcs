# npm-funcs

> A very limited subset of npm functions I use every day

## Install

```bash
npm i npm-funcs
```

Package [on npm](https://www.npmjs.com/package/npm-funcs)

## API

* [dependencies](#dependenciesname-latest)
* [dependents](#dependentsname)
* [downloads](#downloadsname-latest)
* [packages](#packagesname)
* [versions](#versionsname-latest)

#### dependencies(name, [latest])

Get the depencies of a npm package

| Argument | Action |
| :------ | :------- |
| **name** | the package `name` |
| **latest** | optional `latest`, default to `false`. If `true`, return only infos for latest version |

Return a Promise. The resolve function receive a JSON as described below

```js
const dependencies = require('npm-funcs/dependencies')

/*
{
  name: 'object-funcs',
  versions: {
    '0.0.0': {},
    '0.1.0': { 'is-funcs': '^0.2.1' },
    '0.1.1': { 'is-funcs': '^0.3.1' },
    '0.2.0': { 'is-funcs': '^0.4.1' },
    '0.2.1': { 'is-funcs': '^0.4.1' },
    '0.3.0': { 'is-funcs': '^0.5.0' },
    '0.4.0': { 'is-funcs': '^0.5.0' }
  },
  latest: {
    version: '0.4.0',
    dependencies: {
      'is-funcs': '^0.5.0'
    }
  }
}
*/
dependencies('object-funcs')
.then(function(data) {
  console.log(data)
})
```

With option `latest` to `true`

```js
const dependencies = require('npm-funcs/dependencies')

/*
{
  name: 'object-funcs',
  version: '0.4.0',
  dependencies: {
    'is-funcs': '^0.5.0'
  }
}
*/
dependencies('object-funcs', true)
.then(function(data) {
  console.log(data)
})
```

#### dependents(name)

Get some relation infos on all packages that dependend of a specific npm package

| Argument | Action |
| :------ | :------- |
| **name** | the package `name` |

Return a Promise. The resolve function receive a JSON as described below

For each dependent package, return some properties

| Property | Action |
| :------ | :------- |
| **version** | the current `version` of the dependent package |
| **dependency** | the `dependency` range declared in dependent package `package.json` file |
| **outdated** | indicates if the `dependency` range satisfies the current version – semver relation |

```js
const dependents = require('npm-funcs/dependents')

/*
{
  name: 'is-funcs',
  version: '0.5.1',
  packages: {
    'dom-funcs': {
      version: '0.1.0',
      dependency: '^0.5.1',
      outdated: false
    },
    'fold-notifier': {
      version: '0.1.0',
      dependency: '^0.3.2',
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

#### downloads(name, [latest])

Get the downloads count of a npm package

| Argument | Action |
| :------ | :------- |
| **name** | the package `name` |
| **latest** | optional `latest`, default to `false`. If `true`, return only infos for latest download day |

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
  latest: {
    date: '2016-07-22',
    downloads: 12
  },
  total: 864
}
*/
downloads('is-funcs')
.then(function(data) {
  console.log(data)
})
```

With option `latest` to `true`

```js
const downloads = require('npm-funcs/downloads')

/*
{
  name: 'is-funcs',
  date: '2016-07-22',
  downloads: 12,
  total: 864
}
*/
downloads('is-funcs', true)
.then(function(data) {
  console.log(data)
})
```

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

#### versions(name, [latest])

Get the versions of a npm package

| Argument | Action |
| :------ | :------- |
| **name** | the package `name` |
| **latest** | optional `latest`, default to `false`. If `true`, return only infos for latest version |

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
  latest: {
    version: '0.5.1',
    date: '2016-07-13'
  },
  count: 11
}
*/
versions('is-funcs')
.then(function(data) {
  console.log(data)
})
```

With option `latest` to `true`

```js
const versions = require('npm-funcs/versions')

/*
{
  name: 'is-funcs',
  version: '0.5.1',
  date: '2016-07-13'
  count: 11
}
*/
versions('is-funcs', true)
.then(function(data) {
  console.log(data)
})
```

## License

MIT
