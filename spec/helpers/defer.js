const defer = (deferredFunction, timeout = 0) => {
  setTimeout(() => {
    deferredFunction();
  }, timeout);
};

module.exports = defer;