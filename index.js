const express = require("express");
const projectsRouter = require("./api/projects/projects-router");
const actionsRouter = require("./api/actions/actions-router");

const server = express();
const port = 5000;

server.use(express.json());
server.use("/",projectsRouter);
server.use("/",actionsRouter);

server.get("/", (req, res) => {
    res.json({
        message: "Started from the bottom",
    });
});

server.listen(port, () => {
    console.log(`server is on and popping ${port}`)
})