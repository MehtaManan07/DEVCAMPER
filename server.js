const express = require("express");
const dotenv = require("dotenv");
const colors = require("colors");
const path = require("path");
const fileupload = require("express-fileupload");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");

// Load env vars
dotenv.config({ path: "./server/config/.env" });

const connectDB = require("./server/config/db"); // load database
const errorHandler = require("./server/middlewares/error"); // error handler import
const app = express();

//body-parser
app.use(express.json());

//cookie-parser
app.use(cookieParser());

connectDB();

// Dev logging middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// File uploading
app.use(fileupload());

// Set static folder
app.use(express.static(path.join(`${__dirname}/client/src/`, "public")));

app.use("/api/v1/bootcamps", require("./server/routes/bootcamps"));
app.use("/api/v1/courses", require("./server/routes/courses"));
app.use("/api/v1/auth", require("./server/routes/auth"));
app.use("/api/v1/users", require("./server/routes/users"));
app.use(errorHandler);

const port = process.env.PORT || 5000;
const server = app.listen(
  port,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${port}`.blue.bold
  )
);

// Handle unhandled promise rejections
process.on("unhandledRejection", (err, promise) => {
  console.log(`Unhandled rejection error: ${err.message}`.red.bold);
  // close server and exit process
  server.close(() => process.exit(1));
});
