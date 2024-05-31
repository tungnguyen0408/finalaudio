import express from "express";
const path = require("path");
let configViewEngine = (app) => {
  app.use(express.static("./src/public"));
  app.use("/uploads", express.static(path.join(__dirname, "../../uploads")));
  app.set("view engine", "ejs");
  app.set("views", "./src/views");
};

module.exports = configViewEngine;
