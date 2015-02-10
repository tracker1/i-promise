'use strict';

//get the promise implementation, if available
module.exports = require('./config').get(
  this.window, // browser
  typeof global !== undefined && global || this // node
);
