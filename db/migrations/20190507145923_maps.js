exports.up = function(knex, Promise) {
  return knex.schema.createTable('maps', mapsTable => {
    mapsTable.increments('map_id').primary();
    mapsTable.integer('site_id').unsigned();
    mapsTable.foreign('site_id').references('sites.site_id');
    mapsTable.text('coordinates').notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('maps');
};
