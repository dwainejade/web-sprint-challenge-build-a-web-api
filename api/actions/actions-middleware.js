const actions = require("./actions-model");


module.exports = {
    validateActionData,
    validateActionId
}
// CHECK FOR ACTION WITH ID
function validateActionId(req, res, next) {
    actions
        .get(req.params.id)
        .then((action) => {
            if (action) {
                req.action = action;
                next();
            } else {
                res.status(404).json({
                    message: `No action ${req.params.id} can not be found.`,
                });
            }
        })
        .catch(() => {
            res.status(500).json({
                message: `There was an error retrieving action ${req.params.id}.`,
            });
        });
}

// CHECK THAT DATA IS FILLED CORRECTLY
function validateActionData(req, res, next) {
    if (!req.body.project_id || !req.body.description || !req.body.notes) {
        res.status(400).json({
            message: "Please include project_id, action description and action notes .",
        });
    } else {
        next();
    }
}