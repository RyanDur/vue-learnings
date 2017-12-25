const Path = require('path');
const express = require('express');
const {backend} = require('../../../fake/backend');
const puppeteer = require('puppeteer/node6/Launcher');

const testBrowser = ({headless = true, slowMo = 0}) => {
  let browser;
  let originalTimeout;
  let fakeBackendHandle;
  let appServerHandle;
  let page;
  const app = express();
  app.use(express.static(Path.join(__dirname, '..', '..', '..', 'dist')));

  return {
    setup: async () => {

      originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
      jasmine.DEFAULT_TIMEOUT_INTERVAL = 30000;
      await new Promise((resolve) => {
        fakeBackendHandle = backend.listen(7771, () => {
          appServerHandle = app.listen(7770, () => {
            resolve()
          })
        })
      });

      browser = await puppeteer.launch({
        headless,
        slowMo,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
      });

      page = await browser.newPage();
      await page.goto('http://localhost:7770/index.html');
      return page;
    },
    tearDown: async () => {
      jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
      appServerHandle.close();
      fakeBackendHandle.close();

      try {
        await browser.close();
      } catch (err) {
        console.log(err);
      }
    }
  }
};

module.exports = testBrowser;