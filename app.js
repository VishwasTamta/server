const express = require("express");
const Folder = require("./routes/folder");
const bodyParser = require("body-parser");
const path = require("path");
const mongoose = require("mongoose");
const User = require("./models/user");

const app = express();

const mongodb = "mongodb://127.0.0.1:27017/demo";

app.use(bodyParser.json());

app.use("/folders", express.static(path.join(__dirname, "folders")));

app.use((req, res, next) => {
  const allowedOrigins = ["http://localhost:3000"];
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }
  // res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, DELETE, PATCH"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.get("/getMongoData", async (req, res, next) => {
  try {
    const users = await User.find();
    if (users?.length <= 0) {
      const error = new Error("User not found!");
      error.status = 404;
      throw error;
    }
    res.json({ message: "Users fetched successfully!", users });
  } catch (err) {
    if (!err.status) {
      err.status = 500;
    }
    next(err);
  }
});

app.use((error, req, res, next) => {
  console.log(error);
  const status = error.status || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message: message, data: data, status: status });
});

app.use("/folder", Folder);

mongoose
  .connect(mongodb)
  .then(() => console.log("Mongodb Connected successfully!"))
  .catch((err) => console.log(err));

app.listen(8080, () => {
  console.log("Server started on port 8080");
});
