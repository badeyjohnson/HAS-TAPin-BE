exports.up = function(knex, Promise) {
  return knex.schema.createTable('booklet', bookletTable => {
    bookletTable
      .string('version')
      .primary()
      .unique();
    bookletTable.text('content').notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('booklet');
};
