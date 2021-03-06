const projects = require("./projects-model");


module.exports = {
    validateProjectData,
    validateProjectId
}
// CHECK FOR PROJECT WITH ID
function validateProjectId(req, res, next) {
    projects
        .get(req.params.id)
        .then((project) => {
            if (project) {
                req.project = project;
                next();
            } else {
                res.status(404).json({
                    message: `No project ${req.params.id} can not be found.`,
                });
            }
        })
        .catch((err) => {
            res.status(500).json({
                message: `There was an error retrieving project ${req.params.id}.`,
            });
        });
}

// CHECK THAT DATA IS FILLED CORRECTLY
function validateProjectData(req, res, next) {
    if (!req.body.name || !req.body.description) {
        res.status(400).json({
            message: "Missing name or description data.",
        });
    } else {
        next();
    }
}