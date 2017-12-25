const JasmineConsoleReporter = require('jasmine-console-reporter');
const reporter = new JasmineConsoleReporter({
  colors: 1,           // (0|false)|(1|true)|2
  cleanStack: 1,       // (0|false)|(1|true)|2|3
  verbosity: 4,        // (0|false)|1|2|(3|true)|4
  listStyle: 'indent', // "flat"|"indent"
  activity: false
});
jasmine.getEnv().clearReporters();
jasmine.getEnv().addReporter(reporter);

const testBrowser = require('./testBrowser');

module.exports = {
  testBrowser
};