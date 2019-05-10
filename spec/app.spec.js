process.env.NODE_ENV = 'test';

const chai = require('chai');

const { expect } = chai;
const supertest = require('supertest');

const app = require('../app');
const connection = require('../db/connection');

const request = supertest(app);

describe('/api', () => {
  beforeEach(() => connection.seed.run());
  after(() => {
    connection.destroy();
  });
  describe('/jobs', () => {
    describe('DEFAULT BEHAVIOUR', () => {
      it('GET status:200 returns all users', () => {
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
    describe('/:email', () => {
      describe('DEFAULT BEHAVIOUR', () => {
        it('GET status:200 a user based on user id', () => {
          return request
            .get('/api/users/jonny.bravo@arup.com')
            .expect(200)
            .then(({ body: { user } }) => {
              expect(user).to.contain.keys(
                'email',
                'first_name',
                'last_name',
                'password'
              );
            });
        });
      });
      describe('/:email/jobs', () => {
        describe('DEFAULT BEHAVIOUR', () => {
          it('GET status:200 a users jobs based on user id', () => {
            return request
              .get('/api/users/jonny.bravo@arup.com/jobs')
              .expect(200)
              .then(({ body: { jobs } }) => {
                jobs.forEach(jobs => {
                  expect(jobs).to.contain.keys(
                    'job_no',
                    'job_name',
                    'pm_first_name',
                    'pm_last_name',
                    'pm_email',
                    'pm_number'
                  );
                });
              });
          });
          it('POST status:200 adds a job', () => {
            const newJob = {
              job_no: 101010,
              job_name: 'thisIsANewJob',
              pm_first_name: 'firstname-d',
              pm_last_name: 'lastname-d',
              pm_email: 'test-d@newJob.com',
              pm_number: '1234567'
            };
            return request
              .post('/api/users/jonny.bravo@arup.com/jobs')
              .send(newJob)
              .expect(202)
              .then(({ body: { response } }) => {
                expect(response).to.equal('Job created');
              })
              .then(() => {
                return request
                  .get('/api/users/jonny.bravo@arup.com/jobs')
                  .expect(200)
                  .then(({ body: { jobs } }) => {
                    expect(jobs).to.have.length(3);
                  });
              });
          });
        });
        describe('/:email/jobs/link', () => {
          describe('DEFAULT BEHAVIOUR', () => {
            it('POST status:202 adds a existing job to a user', () => {
              const newLink = { job_no: 123123 };
              return request
                .post('/api/users/jonny.bravo@arup.com/jobs/link')
                .send(newLink)
                .expect(202)
                .then(({ body: { response } }) => {
                  expect(response).to.equal('Job added to user');
                })
                .then(() => {
                  return request
                    .get('/api/users/jonny.bravo@arup.com/jobs')
                    .expect(200)
                    .then(({ body: { jobs } }) => {
                      expect(jobs).to.have.length(3);
                    });
                });
            });
          });
          describe('ERROR HANDLING', () => {
            it('POST status:400 job does not exist to a user', () => {
              const newLink = { job_no: 9999123 };
              return request
                .post('/api/users/jonny.bravo@arup.com/jobs/link')
                .send(newLink)
                .expect(400)
                .then(({ body: { response } }) => {
                  expect(response).to.equal('Job not found');
                });
            });
          });
        });
      });
    });
  });
});
