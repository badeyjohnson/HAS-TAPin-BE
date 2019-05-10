exports.up = function(knex, Promise) {
  return knex.schema.createTable('jobs_users', jobsUsersTable => {
    jobsUsersTable.increments('join_id').primary();
    jobsUsersTable.integer('job_no').references('jobs.job_no');
    jobsUsersTable.string('email').references('users.email');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('jobs_users');
};
