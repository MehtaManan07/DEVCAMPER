const fs = require("fs");
const mongoose = require("mongoose");
const colors = require("colors");
const dotenv = require("dotenv");

dotenv.config({ path: "./config/.env" });

const Bootcamp = require("./models/Bootcamp");
const Course = require("./models/Course");
const User = require("./models/User");
const Review = require("./models/Review");

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

// Read json file
const bootcamps = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/bootcamps.json`, "utf-8")
);
const courses = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/courses.json`, "utf-8")
);
const users = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/users.json`, "utf-8")
);
const reviews = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/reviews.json`, "utf-8")
);

// import to db
const importData = async () => {
  try {
    await Bootcamp.create(bootcamps);
    await User.create(users);
    await Course.create(courses);
    await Review.create(reviews);
    console.log("Data imported".bgGreen);
    process.exit(0)
  } catch (error) {
    console.error("Error:\n", error);
    process.exit(1)
  }
};

// import to db
const deleteData = async () => {
  try {
    await Bootcamp.deleteMany();
    await User.deleteMany();
    await Course.deleteMany();
    await Review.deleteMany()
    console.log("Data deleted".bgRed);
    process.exit(0)
  } catch (error) {
    console.error("Error:\n", error);
    process.exit(1)
  }
};

if(process.argv[2] === "-i") {
    importData()
} else if(process.argv[2] === "-d") {
    deleteData()
}