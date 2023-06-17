import express from "express"
import userController from "../controllers/userController";
import courseController from "../controllers/courseController"
import lessonController from "../controllers/lessonController"
import middleware from "../controllers/middleware"
let router = express.Router();
let initWebRoutes = (app) => {

    //user API 
    router.post("/sign-up",userController.signUp)

    router.post("/sign-in",userController.signIn)

    router.get("/profile",userController.profile)

    router.delete("/delete-user",userController.deleteUser)

    //course API 

    router.post("/create-course",courseController.createNewCourse)

    router.get("/get-course",courseController.getCourse)

    router.delete("/delete-course",courseController.deleteCourse)

    //lesson API 

    router.post("/create-lesson",lessonController.createLesson)

    router.get("/get-lesson",lessonController.getLesson)

    router.delete("/delete-lesson",lessonController.deleteLesson)
    

    //test

    router.get("/testToken",middleware.testToken)

    router.get("/checkToken",middleware.testCheck)


    //test nginx

  router.get("/test",(req,res) => {
    res.send("test nginx success")
  })


    return app.use('/',router);
}
module.exports = initWebRoutes;