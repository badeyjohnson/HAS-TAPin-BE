/* eslint-disable no-unused-expressions */
const bcrypt = require('bcrypt');
const { expect } = require('chai');
const { formatUsers, formatMaps, formatPDF } = require('../utils/utils');

describe('Utils', () => {
  describe('#formatUsers', () => {
    it('tests a hash of a password is produced from an inputted password', () => {
      const input = [
        {
          email: 'jonny.bravo@arup.com',
          firstName: 'jonny',
          lastName: 'bravo',
          password: 'jonny123'
        }
      ];
      const password = 'jonny123';
      const passwordFalse = 'jonny123123';
      const storedInput = formatUsers(input);
      const match = bcrypt.compareSync(password, storedInput[0].password);
      const matchFalse = bcrypt.compareSync(
        passwordFalse,
        storedInput[0].password
      );
      expect(match).be.true;
      expect(matchFalse).be.false;
    });
  });
  describe('#formatMaps', () => {
    it('tests coordinates are returned as string', () => {
      const coord = [
        {
          site_id: 1,
          coordinates: [
            [-87.359296, 35.00118],
            [-85.606675, 34.984749],
            [-85.431413, 34.124869],
            [-85.184951, 32.859696],
            [-85.069935, 32.580372],
            [-84.960397, 32.421541],
            [-85.004212, 32.322956],
            [-84.889196, 32.262709],
            [-85.058981, 32.13674],
            [-85.053504, 32.01077],
            [-88.241084, 33.796253],
            [-88.098683, 34.891641],
            [-88.202745, 34.995703],
            [-87.359296, 35.00118]
          ]
        }
      ];
      const formatted = formatMaps(coord);
      expect(formatted[0].coordinates).to.be.a('string');
    });
    it('tests multiple coordinates are returned as string', () => {
      const coord = [
        {
          site_id: 1,
          coordinates: [
            [-87.359296, 35.00118],
            [-85.606675, 34.984749],
            [-85.431413, 34.124869],
            [-85.184951, 32.859696],
            [-85.069935, 32.580372],
            [-84.960397, 32.421541],
            [-85.004212, 32.322956],
            [-84.889196, 32.262709],
            [-85.058981, 32.13674],
            [-85.053504, 32.01077],
            [-88.241084, 33.796253],
            [-88.098683, 34.891641],
            [-88.202745, 34.995703],
            [-87.359296, 35.00118]
          ]
        },
        {
          site_id: 1,
          coordinates: [
            [-87.359296, 35.00118],
            [-85.606675, 34.984749],
            [-85.431413, 34.124869],
            [-85.184951, 32.859696],
            [-85.069935, 32.580372],
            [-84.960397, 32.421541],
            [-85.004212, 32.322956],
            [-84.889196, 32.262709],
            [-85.058981, 32.13674],
            [-85.053504, 32.01077],
            [-88.241084, 33.796253],
            [-88.098683, 34.891641],
            [-88.202745, 34.995703],
            [-87.359296, 35.00118]
          ]
        }
      ];
      const formatted = formatMaps(coord);
      formatted.forEach(element => {
        expect(element.coordinates).to.be.a('string');
      });
    });
  });
  describe('#formatPDF', () => {
    it('converts pdf into a storeable format', () => {
      expect(formatPDF()).to.be.a('string');
    });
  });
});
