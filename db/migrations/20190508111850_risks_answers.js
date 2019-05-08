exports.up = function(knex, Promise) {
  return knex.schema.createTable('risks_answers', risksAnswersTable => {
    risksAnswersTable.integer('question_id').unsigned();
    risksAnswersTable
      .foreign('question_id')
      .references('questions.question_id');
    risksAnswersTable
      .foreign('site_specific_id')
      .references('site_specific.site_specific_id');
    risksAnswersTable.string('Mitigation Measures / Additional Information');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('risks_answers');
};
