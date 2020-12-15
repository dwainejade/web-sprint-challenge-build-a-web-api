const { Router } = require("express");
const express = require("express");
const router = express.Router();
const actions = require("../actions/actions-model");
const { validateActionId, validateActionData } = require("./actions-middleware")

// GET ALL ACTIONS
router.get("/actions", (req, res) => {
    actions.get()
        .then((action) => {
            res.json(action)
        })
        .catch(() => {
            res.status(500).json({
                message: "There was an error retrieving this action.",
            })
        })
})

// GET ACTIONS BY ID
router.get("/actions/:id", (req, res) => {
    actions.get(req.params.id)
        .then((action) => {
            res.json(action)
        })
        .catch(() => {
            res.status(500).json({
                message: `There was an error retrieving action ${req.params.id} .`,
            })
        })
})

// POST ACTION
router.post("/actions", validateActionData, (req, res) => {
    actions
        .insert(req.body)
        .then((action) => {
            res.status(201).json(action);
        })
        .catch(() => {
            res.status(500).json({
                message: "Error creating action. Please try again.",
            });
        });
});

// DELETE ACTION
router.delete("/actions/:id", validateActionId, (req, res) => {
    actions.remove(req.params.id)
        .then((action)=>{
            res.json({
                message: `Action ${req.params.id} was succesfully deleted`
            })
        })
        .catch(() => {
            res.status(500).json({
                message: "Error deleting action. Please try again.",
            });
        });
})

// UPDATE ACTION
router.put("/actions/:id", validateActionData, (req, res)=>{
    actions.update(req.params.id, req.body)
        .then((action)=>{
            res.json(action)
        })
        .catch(() => {
            res.status(500).json({
                message: "Error updating action. Please try again.",
            });
        });
})

module.exports = router;
