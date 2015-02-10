'use strict';

var userPromise = null;

//obscure to avoid browserify
function grequire(moduleName) {
  return require(moduleName);
}

// Registers a favorite implementation: get will return that value
exports.use = function setPromise(Promise) {
  userPromise = Promise;
};

// Window, global -> PromiseImpl
exports.get = function getPromise(w, g) {
  if (userPromise) return userPromise;

  if (w && w.Promise) return w.Promise;
  if (g && g.Promise) return g.Promise;

  //browser window
  if (w && w.document && w.navigator) {
    //if Q is available, use it
    if (w.Q && w.Q.Promise) return w.Q.Promise;
    if (w.Q && w.Q.promise) return w.Q.promise;

    return null;
  }

  // use _global.require so browserify doesn't attempt to load these
  try { return grequire('es6-promise').Promise; } catch(err) {}
  try { return grequire('es6-promises'); } catch(err) {}
  try { return grequire('bluebird'); } catch(err) {}
  try {
    //wrap Q
    var q = grequire('q');
    if (q.Promise) return q.Promise; //latest
    if (q.promise) return q.promise; //older
  } catch(err) {}

  return null;
};
