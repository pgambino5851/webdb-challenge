const knex = require('knex');
const dbConfig = require("../knexfile");
const db = knex(dbConfig.development);
const mappers = require('./mappers');

module.exports = {
    getProjectActions,
    get
}

function get(id) {
    let query = db('projects');
  
    if (id) {
      query.where('projects.id', id).first();
  
      const promises = [query, this.getProjectActions(id)]; // [ projects, actions ]
  
      return Promise.all(promises).then(function(results) {
        let [project, actions] = results;
  
        if (project) {
          project.actions = actions;
  
          return mappers.projectToBody(project);
        } else {
          return null;
        }
      });
    }
  
    return query.then(projects => {
      return projects.map(project => mappers.projectToBody(project));
    });
  }

  function getProjectActions(projectId) {
    return db('actions')
      .where('project_id', projectId)
      .then(actions => actions.map(action => mappers.actionToBody(action)));
  }
  