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
  describe('/users', () => {
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
    describe('/users/:email', () => {
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
      describe('/users/:email/jobs', () => {
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
        describe('/users/:email/jobs/link', () => {
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
  describe('/jobs', () => {
    describe('DEFAULT BEHAVIOUR', () => {
      it('GET status:200 returns all jobs', () => {
        return request
          .get('/api/jobs')
          .expect(200)
          .then(({ body: { jobs } }) => {
            jobs.forEach(job => {
              expect(job).to.contain.keys(
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
    });
    describe('/jobs/:job_no', () => {
      describe('DEFAULT BEHAVIOUR', () => {
        it('GET status:200 a job based on job number', () => {
          return request
            .get('/api/jobs/123456')
            .expect(200)
            .then(({ body: { job } }) => {
              expect(job).to.contain.keys(
                'job_no',
                'job_name',
                'pm_first_name',
                'pm_last_name',
                'pm_email',
                'pm_number'
              );
            });
        });
        describe('/jobs/:job_no/sites', () => {
          describe('DEFAULT BEHAVIOUR', () => {
            it('GET status:200 a jobs sites based on job id', () => {
              return request
                .get('/api/jobs/123456/sites')
                .expect(200)
                .then(({ body: { sites } }) => {
                  sites.forEach(site => {
                    expect(site).to.contain.keys(
                      'site_id',
                      'job_no',
                      'site_name',
                      'site_description'
                    );
                  });
                });
            });
            it('POST status:200 adds a site', () => {
              const newSite = {
                site_name: 'test-site',
                site_description: 'dry'
              };
              return request
                .post('/api/jobs/123456/sites')
                .send(newSite)
                .expect(202)
                .then(({ body: { response } }) => {
                  expect(response).to.equal('Site created');
                })
                .then(() => {
                  return request
                    .get('/api/jobs/123456/sites')
                    .expect(200)
                    .then(({ body: { sites } }) => {
                      expect(sites).to.have.length(5);
                    });
                });
            });
          });
        });
      });
    });
  });
  describe.only('/sites', () => {
    describe('DEFAULT BEHAVIOUR', () => {
      it('GET status:200 returns all sites', () => {
        return request
          .get('/api/sites')
          .expect(200)
          .then(({ body: { sites } }) => {
            sites.forEach(site => {
              expect(site).to.contain.keys(
                'site_id',
                'job_no',
                'site_name',
                'site_description'
              );
            });
          });
      });
    });
    describe('/sites/:site_id', () => {
      describe('DEFAULT BEHAVIOUR', () => {
        it('GET status:200 a site based on site number', () => {
          return request
            .get('/api/sites/1')
            .expect(200)
            .then(({ body: { site } }) => {
              expect(site).to.eql({
                site_id: 1,
                job_no: 123456,
                site_name: 'site a',
                site_description: 'wet'
              });
            });
        });
        describe('/sites/:site_id/:site_specific_id', () => {
          describe('DEFAULT BEHAVIOUR', () => {
            it('GET status:200 a risk assessments based on risk assessment id', () => {
              return request
                .get('/api/sites/1/1')
                .expect(200)
                .then(({ body: { riskAssessment } }) => {
                  expect(riskAssessment[0]).to.include.keys(
                    'answer',
                    'created_at',
                    'job_no',
                    'mitigation_Measures',
                    'multi_option',
                    'risk',
                    'site_description',
                    'site_id',
                    'site_name',
                    'site_specific_id',
                    'user',
                    'question'
                  );
                });
            });
          });
        });
        describe('/sites/:site_id/risk_assessments', () => {
          describe('DEFAULT BEHAVIOUR', () => {
            it('GET status:200 a sites risk assessments based on site id', () => {
              return request
                .get('/api/sites/1/risk_assessments')
                .expect(200)
                .then(({ body: { riskAssessments } }) => {
                  expect(riskAssessments).to.have.length(2);
                  expect(riskAssessments[0]).to.include({
                    site_id: 1,
                    job_no: 123456,
                    site_name: 'site a',
                    site_description: 'wet',
                    site_specific_id: 1,
                    user: 'jonny.bravo@arup.com'
                  });
                });
            });
          });
          // it('POST status:200 adds a site', () => {
          //   const newSite = {
          //     site_name: 'test-site',
          //     site_description: 'dry'
          //   };
          //   return request
          //     .post('/api/jobs/123456/sites')
          //     .send(newSite)
          //     .expect(202)
          //     .then(({ body: { response } }) => {
          //       expect(response).to.equal('Site created');
          //     })
          //     .then(() => {
          //       return request
          //         .get('/api/jobs/123456/sites')
          //         .expect(200)
          //         .then(({ body: { sites } }) => {
          //           expect(sites).to.have.length(5);
          //         });
          //     });
          // });
          // });
        });
      });
    });
  });
});
