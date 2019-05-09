exports.up = function(knex, Promise) {
  return knex.schema.createTable('jobs', jobsTable => {
    jobsTable
      .integer('job_no')
      .primary()
      .unique();
    jobsTable.string('job_name').notNullable();
    jobsTable.string('pm_first_name').notNullable();
    jobsTable.string('pm_last_name').notNullable();
    jobsTable.string('pm_email').notNullable();
    jobsTable.bigInteger('pm_number').notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('jobs');
};
