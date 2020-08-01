const express = require("express");
const dotenv = require("dotenv");
const colors = require("colors");
const morgan = require("morgan");

// Load env vars
dotenv.config({ path: "./server/config/.env" });

const connectDB = require("./server/config/db"); // load database
const app = express();

connectDB();

// Dev logging middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use("/api/v1", require("./server/routes/Bootcamps"));

const PORT = process.env.PORT || 5000;
const server = app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.blue.bold
  )
);

// Handle unhandled promise rejections
process.on("unhandledRejection", (err, promise) => {
  console.log(`Unhandled rejection error: ${err.message}`.red.bold);
  // close server and exit process
  server.close(() => process.exit(1));
});
