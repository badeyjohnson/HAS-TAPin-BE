exports.up = function(knex, Promise) {
  return knex.schema.createTable('sites', sitesTable => {
    sitesTable.increments('site_id').primary();
    sitesTable.integer('job_no').references('jobs.job_no');
    sitesTable.string('site_name').notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('sites');
};
