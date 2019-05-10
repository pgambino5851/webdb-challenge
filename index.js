const express = require('express');
const knex = require('knex');
const projectHelper = require('./helpers/projectModel')
const server = express();

server.listen(5000, () => {
    console.log("Server running on port 5000")
})



const dbConfig = require("./knexfile");
const db = knex(dbConfig.development);

server.use(express.json());

server.get('/api/projects', (req, res) => {
    db('projects')
    .then(projects => {
        res.status(200).json(projects)
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({errorMessage: error})
    })
})

server.get('/api/actions', (req, res) => {
    db('actions')
    .then(actions => {
        res.status(200).json(actions)
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({errorMessage: error})
    })
})

server.get('/api/projects/:id', (req, res) => {
    const projectId = req.params.id;
    projectHelper.get(projectId)
    .then(project => {
        if(!project) {
            res.status(404).json({message: "The project with the specified ID does not exist."})
            return;
        }
        res.status(200).json(project)
    })
    .catch(err => {
        res.status(500).json({error: err})
    })
})

server.post('/api/projects', (req, res) => {
    const { name } = req.body
    if(!name) {
      res.status(400).json("Please provide a name for the project");
      return;
    }
    db('projects').insert(req.body, 'id')
    .then(result => {
      res.status(200).json(result);
    })
    .catch(err => {
      res.status(500).json({error: err})
    })
  })


  server.post('/api/actions', (req, res) => {
    const { description, project_id } = req.body
    if(!description || !project_id) {
      res.status(400).json("Please provide a description and a related project_id for the action");
      return;
    }
    db('actions').insert(req.body, 'id')
    .then(result => {
      res.status(200).json(result);
    })
    .catch(err => {
      res.status(500).json({error: err})
    })
  })