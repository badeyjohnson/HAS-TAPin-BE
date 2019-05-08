exports.up = function(knex, Promise) {
  return knex.schema.createTable('answers_options', riskLevelTable => {
    riskLevelTable.increments('answers_options_id').primary();
    riskLevelTable.string('answer', 4);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('answers_options');
};
