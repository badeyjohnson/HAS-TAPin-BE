exports.up = function(knex, Promise) {
  return knex.schema.createTable('answers_options', riskLevelTable => {
    riskLevelTable.increments('answers_options_id').primary();
    riskLevelTable.string('answer', 1);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('answers_options');
};
