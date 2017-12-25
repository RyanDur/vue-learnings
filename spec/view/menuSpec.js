const testApplication = require('../helpers/renderApp');
const {app} = require('../../src/app');

describe('the menu', () => {

  beforeEach(() => {
    testApplication({app}).render({});
  });

  describe('on load', () => {
    it('should have a menu', () => {
      expect(document.querySelector('#menu')).toBeTruthy();
    })
  });
});