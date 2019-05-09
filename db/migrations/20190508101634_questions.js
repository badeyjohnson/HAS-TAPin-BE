exports.up = function(knex, Promise) {
  return knex.schema.createTable('questions', questionsTable => {
    questionsTable.increments('question_id').primary();
    questionsTable.text('question').notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('questions');
};
