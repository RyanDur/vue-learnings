const {testBrowser} = require('./helpers');

describe('the menu page', () => {
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

    it('should contain game choices', async () => {
      expect(await await page.evaluate(() => {
        return Array.from(document.querySelectorAll('.game-choice')).map(el => el.innerText);
      })).toEqual(['Battleship', 'Tic-Tac-Toe'])
    })
  });
});