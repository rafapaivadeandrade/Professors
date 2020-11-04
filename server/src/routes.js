const express = require("express");
const { celebrate, Joi } = require("celebrate");
const multer = require("multer");
const multerConfig = require("./config/multer");
const routes = express.Router();
const upload = multer(multerConfig);
const middleware = require("../src/middleware/auth");
const classesController = require("../src/controllers/classesController");
const connectionsController = require("../src/controllers/connectionsController");
const userController = require("./controllers/userController");

routes.post("/forgotPassword", userController.forgot);
routes.post("/resetPassword/:token", userController.reset);

routes.post("/register", upload.single("avatar"), userController.create);
routes.post("/login", userController.auth);
routes.put(
  "/user/:user_id/:class_id",
  upload.single("avatar"),
  middleware,
  userController.update
);
routes.get("/user/:user_id", middleware, userController.userData);
routes.get("/user/:user_id/schedule", userController.userDataSchedule);
routes.get("/totalUsers", middleware, userController.totalTeachers);
routes.get("/teachers", middleware, userController.teachers);

routes.post("/classes", classesController.create);
routes.get("/pageClasses", classesController.classes);
routes.get("/classes", middleware, classesController.index);

routes.get("/connections", middleware, connectionsController.index);
routes.post("/connections", connectionsController.create);

module.exports = routes;
