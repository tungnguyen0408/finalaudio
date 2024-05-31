import express from "express";
import homeController from "../controllers/homeController";
const upload = require("../config/multerConfig.js");
let router = express.Router();
let initWebRoutes = (app) => {
  router.get("/", homeController.getHomePage);
  router.get("/formUploadMusic", homeController.formUploadMusic);
  router.post("/upload", upload.single("songFile"), homeController.uploadSong);
  router.get("/pageMusic/:songId", homeController.getPageMusic);

  return app.use("/", router);
};

module.exports = initWebRoutes;
