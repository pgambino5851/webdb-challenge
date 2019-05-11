
exports.up = function(knex, Promise) {
    return knex.schema.createTable('actions', tbl => {
        
        tbl.increments(); 
        tbl.string('description', 128).notNullable().unique();
        tbl.string('notes', 255)
        tbl.boolean('completed')
        tbl.timestamps(true, true); 
        tbl
        .integer('project_id')
        .unsigned()
        .references('id')
        .inTable('projects')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
    })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('cohorts')
};
