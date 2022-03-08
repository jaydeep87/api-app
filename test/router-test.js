const request = require('supertest');
const app = require('../app').appInit();
// const appServer = require('../bin/www');

// appServer.startup();
/* global it, before, describe, expect */
describe('CMS API Test.', () => {
  it('0.2 Server endpoint should be running.', (done) => {
    let isSuccess = false;
    request(app).get('/')
      .end((err, res) => {
        if (res) isSuccess = true;
        done();
      });
    it('isSuccess should be true', () => {
      expect(isSuccess).toBe(true);
    });
  });
});
