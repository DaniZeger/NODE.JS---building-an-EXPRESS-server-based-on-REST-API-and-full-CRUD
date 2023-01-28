const express = require("express")
const server = express()
const port = 3000
const carRouters = require("./routes/carRouters.js")
const cors = require("cors")
require("./dal/dal.js")

server.use(cors())
server.use(express.json())

server.use("/api/cars", carRouters)

server.listen(port, () => {
    console.log(`Listening to ${port}`);
})