const express = require("express")
const router = express.Router()
const projects = require("../projects/projects-model")
const { validateProjectId, validateProjectData } = require("./projects-middleware")

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

// GET PROJECT BY ID
router.get("/projects/:id", validateProjectId, (req, res) => {
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

// DELETE PROJECT
router.delete("/projects/:id", validateProjectId, (req, res) => {
    projects.remove(req.params.id)
        .then((project) => {
            res.json({
                message: "Project successfully deleted.",
            });
        })
        .catch((err) => {
            res.status(500).json({
                message: "Error deleting project. Please try again.",
            });
        });
});

// UPDATE PROJECT
router.put("/projects/:id", validateProjectId, validateProjectData, (req, res) => {
    projects.update(req.params.id, req.body)
        .then((project) => {
            res.json(project);
        })
        .catch((err) => {
            res.status(500).json({
                message: "Error updating project. Please try again.",
            });
        });
}
);

// GET PROJECT ACTIONS
router.get("/projects/:id/actions", validateProjectId, (req, res) => {
    projects
        .getProjectActions(req.params.id)
        .then((actions) => {
            res.json(actions);
        })
        .catch((err) => {
            res.status(500).json({
                message: "There was an error retrieving this project's actions.",
            });
        });
});


module.exports = router