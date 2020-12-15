const express = require('express')
const cors = require("cors")

const server = express();

server.use(express.json());
server.use(cors())

server.get("/", (req, res) => {
    res.json({
        message: "Started from the bottom",
    });
});