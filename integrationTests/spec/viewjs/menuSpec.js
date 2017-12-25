const {testBrowser} = require('../helpers');

describe('menu page', () => {
  const {setup, tearDown} = testBrowser({headless: true, slowMo: 0});
  let page;

  beforeEach(async () => {
    page = await setup();
  });

  afterEach(async () => {
    await tearDown();
  });

  describe('on load', () => {
    it('should have a menu', async () => {
      expect(await page.$('#menu')).toBeTruthy();
    });
  });
});