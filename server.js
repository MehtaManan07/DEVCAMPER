const express = require("express");
const dotenv = require("dotenv");
const colors = require('colors');
const morgan = require("morgan");

// Load env vars
dotenv.config({ path: './server/config/config.env' })

const connectDB = require("./server/config/db"); // connect database
const app = express()

app.use('/api/v1',require("./server/routes/Bootcamps"))

const PORT = process.env.PORT || 5000
app.listen(PORT, console.log(`Server running on port ${PORT}`))