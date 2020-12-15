require("dotenv").config();
const express = require("express");
const welcomeRouter = require("./welcome/welcomeRouter")
const projectsRouter = require("./api/projects/projects-router");
const actionsRouter = require("./api/actions/actions-router");

const server = express();
const port = process.env.PORT || 5000;

server.use(express.json());
server.use(welcomeRouter);
server.use(projectsRouter);
server.use(actionsRouter);

server.get("/", (req, res) => {
    res.json({
        message: "Started from the bottom",
    });
});

server.listen(port, () => {
    console.log(`server is on and popping ${port}`)
})