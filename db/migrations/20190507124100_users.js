exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', usersTable => {
    usersTable
      .string('email')
      .primary()
      .unique();
    usersTable.string('first_name').notNullable();
    usersTable.string('last_name').notNullable();
    usersTable.string('password').notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users');
};
