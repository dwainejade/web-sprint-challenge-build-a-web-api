const express = require("express")
const router = express.Router()
const projects = require("../projects/projects-model")
const { validateProjectId, validateProjectData } = require("./middleware")

// GET ALL PROJECTS
router.get("/projects", (req, res) => {
    projects.get()
        .then((project) => {
            res.json(project)
        })
        .catch(() => {
            res.status(500).json({
                message: "There was an error retrieving this project.",
            })
        })
})

// POST PROJECT
router.post("/projects", validateProjectData, (req, res) => {
    projects.insert(req.body)
        .then((project) => {
            res.status(201).json(project)
        })
        .catch(() => {
            res.status(500).json({
                message: "There was an error retrieving this project.",
            })
        })
})

// GET PROJECT BY ID
router.get("/projects/:id", (req, res) => {
    projects.get(req.params.id)
        .then((project) => {
            res.json(project)
        })
        .catch(() => {
            res.status(500).json({
                message: "There was an error retrieving this project.",
            })
        })
})

// GET PROJECTS
router.get("/projects/:id/actions", validateProjectId, (req, res) => {
    projects.getProjectActions(req.params.id)
        .then((actions) => {
            res.json(actions)
        })
        .catch((err) => {
            res.status(500).json({
                message: "There was an error retrieving this project's actions.",
            })
        })
})

module.exports = router