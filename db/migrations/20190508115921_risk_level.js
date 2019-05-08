exports.up = function(knex, Promise) {
  return knex.schema.createTable('risk_level', riskLevelTable => {
    riskLevelTable.increments('risk_level_id').primary();
    riskLevelTable.string('risk', 1);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('risk_level');
};
