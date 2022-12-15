const express = require("express");
const cors = require("cors");
const cookeiParser = require("cookie-parser");
const bodyParser = require("body-parser");
const path = require("path");

const env = process.env.NODE_ENV;
if (env !== "PRODUCTION")
  require("dotenv").config({ path: "backend/config/config.env" });

const errorMiddleware = require("./utils/error");

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"],
    credentials: true,
  })
);
app.use(cookeiParser());
app.use(bodyParser.urlencoded({ extended: true }));

const dataRoute = require("./dataRoute");
app.use("/api/v2/", dataRoute);

app.use(express.static(path.join(__dirname, "../frontend/build")));
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"));
});

app.use(errorMiddleware);

module.exports = app;
