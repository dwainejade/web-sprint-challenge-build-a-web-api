const express = require("express");
const router = express.Router();
const actions = require("../actions/actions-model");

// GET ALL ACTIONS
router.get("/actions", (req, res) => {
    actions
        .get()
        .then((action) => {
            res.json(action);
        })
        .catch(() => {
            res.status(500).json({
                message: "There was an error retrieving this action.",
            });
        });
});



module.exports = router;
