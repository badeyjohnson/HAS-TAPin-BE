process.env.NODE_ENV = 'test';

const chai = require('chai');

const { expect } = chai;
const supertest = require('supertest');

const app = require('../app');
const connection = require('../db/connection');

const request = supertest(app);

// request(app);

describe('/api', () => {
  beforeEach(() => connection.seed.run());
  after(() => {
    connection.destroy();
  });
  describe('/users', () => {
    describe('DEFAULT BEHAVIOUR', () => {
      it('GETs status:200 returns all users', () => {
        return request
          .get('/api/users')
          .expect(200)
          .then(({ body: { users } }) => {
            users.forEach(user => {
              expect(user).to.contain.keys(
                'email',
                'first_name',
                'last_name',
                'password'
              );
            });
          });
      });
    });
  });
});
