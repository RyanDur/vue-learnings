const {testApplication} = require('../helpers');
const {app} = require('../../src/app');

describe('the menu', () => {

  beforeEach((done) => {
    const menuCommand = jasmine.createSpyObj('MenuCommand', ['getMenu']);
    menuCommand.getMenu.and.returnValue(Promise.resolve({games: ['Battleship', 'Tic-Tac-Toe']}));
    testApplication({app}).render({menuCommand});
    done();
  });

  describe('on load', () => {
    it('should have a menu', () => {
      expect(document.querySelector('#menu')).toBeTruthy();
    });

    it('should contain game choices', () => {
      expect(Array.from(document.querySelectorAll('.game-choice')).map(el => el.innerText))
        .toEqual(['Battleship', 'Tic-Tac-Toe'])
    })
  });
});