"use strict";

var _express = _interopRequireDefault(require("express"));
var _userController = _interopRequireDefault(require("../controllers/userController"));
var _courseController = _interopRequireDefault(require("../controllers/courseController"));
var _lessonController = _interopRequireDefault(require("../controllers/lessonController"));
var _middleware = _interopRequireDefault(require("../controllers/middleware"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var router = _express["default"].Router();
var initWebRoutes = function initWebRoutes(app) {
  //user API 
  router.post("/api/sign-up", _userController["default"].signUp);
  router.post("/api/sign-in", _userController["default"].signIn);
  router.get("/api/profile", _userController["default"].profile);
  router["delete"]("/api/delete-user", _userController["default"].deleteUser);

  //course API 

  router.post("/api/create-course", _courseController["default"].createNewCourse);
  router.get("/api/get-course", _courseController["default"].getCourse);
  router["delete"]("/api/delete-course", _courseController["default"].deleteCourse);

  //lesson API 

  router.post("/api/create-lesson", _lessonController["default"].createLesson);
  router.get("/api/get-lesson", _lessonController["default"].getLesson);
  router["delete"]("/api/delete-lesson", _lessonController["default"].deleteLesson);

  //test

  router.get("/testToken", _middleware["default"].testToken);
  router.get("/checkToken", _middleware["default"].testCheck);

  //test nginx

  router.get("/api/test", function (req, res) {
    res.send("test nginx success");
  });
  return app.use('/', router);
};
module.exports = initWebRoutes;