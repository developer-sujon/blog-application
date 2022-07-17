//external Lib  imports
const express = require("express");
const morgan = require("morgan");
const dotenv = require("dotenv");
const multer = require("multer");
const path = require("path");
require("express-async-errors");
const app = new express();

dotenv.config({ path: path.join(__dirname, "./.env") });

//internal imports
const connectDB = require("./src/confiq/db");
const { checkLogin } = require("./src/middleware/authVerify");

//imports routes
const userRoutes = require("./src/routes/userRoutes");
const postRoutes = require("./src/routes/postRoutes");
const categoryRoutes = require("./src/routes/categoryRoutes");
const tagRoutes = require("./src/routes/tagRoutes");

//security lib imports
const cors = require("cors");
const hpp = require("hpp");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const expressMongoSanitize = require("express-mongo-sanitize");
const xssClean = require("xss-clean");

//security middleware emplement
app.use(cors());
app.use(hpp());
app.use(helmet());
app.use(expressMongoSanitize());
app.use(xssClean());

//default middleware emplement
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

// Apply the rate limiting middleware to all requests

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10000,
  standardHeaders: true,
  legacyHeaders: false,
});

app.use(limiter);

const MONGODB_CONNECTION_URL = process.env.MONGODB_CONNECTION_URL;
const DB_OPTIONS = {
  //user: process.env.MONGODB_DATABASE_USERNAME,
  //pass: process.env.MONGODB_DATABASE_PASSWORD,
  dbName: "mern-blog",
  autoIndex: true,
};

//connection database
connectDB(MONGODB_CONNECTION_URL, DB_OPTIONS);
app.use(express.static("client/build"));

const upload = multer({ dest: "uploads/" }).single("demo_image");

app.post("/api/v1/upload", (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      res.status(400).send("Something went wrong!");
    }
    res.send(req.file);
  });
});

// Routing Implement
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/post", postRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/tag", tagRoutes);

app.use("/images", express.static(path.join(__dirname, "/uploads")));

// Add React Front End Routing
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "client", "build", "uploads"));
});

// Default Error Handler
app.use((err, req, res, next) => {
  console.log(err);

  const message = err.message ? err.message : "There was an server side error!";
  const status = err.status ? err.status : 500;
  res.status(status).send({ message });
});

module.exports = app;
