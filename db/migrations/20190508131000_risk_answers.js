exports.up = function(knex, Promise) {
  return knex.schema.createTable('risks_answers', risksAnswersTable => {
    risksAnswersTable.integer('question_id').unsigned();
    risksAnswersTable.integer('site_specific_id').unsigned();
    risksAnswersTable.integer('answers_options').unsigned();
    risksAnswersTable.integer('risk_level').unsigned();
    risksAnswersTable
      .foreign('question_id')
      .references('questions.question_id');
    risksAnswersTable
      .foreign('site_specific_id')
      .references('site_specific.site_specific_id');
    risksAnswersTable
      .foreign('answers_options')
      .references('answers_options.answers_options_id');
    risksAnswersTable.string('mitigation_Measures');
    risksAnswersTable
      .foreign('risk_level')
      .references('risk_level.risk_level_id');
    risksAnswersTable.text('mutili_option');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('risks_answers');
};
