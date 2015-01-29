i-promise
=========

When calling this module a [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) library will be returned if one is available.

This module will not declare any dependencies, you should install a fallback library downstream if needed.

## Install

`npm install --save i-promise`

## Use

```
var Promise = require('i-promise');
if (!Promise) throw new Error('No ES6 Promise Library Available.');

return Promise.resolve('success')
```

## Notes

In a browser (via browserify), it will return either `window.Promise`, `window.Q.Promise` or `window.Q.promise` in that order, you should have an [es6-promise shim](https://github.com/paulmillr/es6-shim/) or the [Q library](https://github.com/kriskowal/q) loaded globally in the browser if you need promises in older browsers.

In node, attempts to use the following will be made.

* native `Promise` (newer versions of node.js)
* [es6-promise](https://www.npmjs.org/package/es6-promise)
* [es6-promises](https://www.npmjs.org/package/es6-promises)
* [bluebird](https://www.npmjs.org/package/bluebird)
* [q](https://www.npmjs.org/package/q) (`Promise` then `promise`)

## Preferring user implementation over native

Default behavior is to always favor native implementation if found. You can still favor the implementation of your choice without overriding global `Promise`:

```js
require('i-promise/config').use(MyPromiseImplementation);
```

You must run this code **before** any call to `require('i-promise')`.
