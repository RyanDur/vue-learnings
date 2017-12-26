const {defer} = require('../../helpers');
const {MenuResponseSuccess} = require('../../../fake/responses/menuResponse');
const {MenuCommand} = require('../../../src/core/commands');
import 'jasmine-ajax'


describe('the menu command', () => {
  let subject;

  beforeEach(() => {
    jasmine.Ajax.install();
    subject = MenuCommand({endpoint: '/api/get-me-a-menu'})
  });

  afterEach(() => {
    jasmine.Ajax.uninstall();
  });

  describe('on success', () => {

    it('should create the correct request', async (done) => {
      subject.getMenu().then(done);

      defer(async () => {
        const request = jasmine.Ajax.requests.mostRecent();
        expect(request.url).toBe('http://localhost:7771/api/get-me-a-menu');
        expect(request.method).toBe('GET');

        await request.respondWith(response(MenuResponseSuccess));
      })
    });

    it('should return a list of games', (done) => {
      subject.getMenu().then(data => {
        expect(data.games).toEqual(['Battleship', 'Tic-Tac-Toe']);
      }).then(done);

      defer(async () => {
        const request = jasmine.Ajax.requests.mostRecent();
        await request.respondWith(response(MenuResponseSuccess));
      })
    })
  });

  const response = (resp) => ({
    "status": 200,
    "contentType": 'application/json',
    "responseText": JSON.stringify(resp)
  });
});