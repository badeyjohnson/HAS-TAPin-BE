exports.up = function(knex, Promise) {
  return knex.schema.createTable('site_specific', siteSpecficTable => {
    siteSpecficTable.increments('site_specific_id').primary();
    siteSpecficTable.integer('site_id').unsigned();
    siteSpecficTable.foreign('site_id').references('sites.site_id');
    siteSpecficTable.string('user').references('users.email');
    siteSpecficTable.timestamp('created_at').defaultTo(knex.fn.now());
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('site_specific');
};
