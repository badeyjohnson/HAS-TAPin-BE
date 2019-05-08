exports.up = function(knex, Promise) {
  return knex.schema.createTable('site_users', siteUsersTable => {
    siteUsersTable.increments('site_users').primary();
    siteUsersTable.integer('site_id').unsigned();
    siteUsersTable.foreign('site_id').references('sites.site_id');
    siteUsersTable.string('arup_staff').notNullable();
    siteUsersTable.bigInteger('mobile_no').notNullable();
    siteUsersTable.string('activities').notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('site_users');
};
