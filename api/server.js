const express = require('express')
const cors = require("cors")
const welcomeRouter = require("../welcome/welcomeRouter")
const actionsRouter = require("./actions/actions-router")
const projectsRouter = require("./projects/projects-router");

const server = express();

server.use(express.json());
server.use(cors())
server.use(welcomeRouter);
server.use(projectsRouter);
server.use(actionsRouter);

server.get("/", (req, res) => {
    res.json({
        message: "Started from the bottom",
    });
});