import express from "express"
import userController from "../controllers/userController";
import courseController from "../controllers/courseController"
import lessonController from "../controllers/lessonController"
import middleware from "../controllers/middleware"
let router = express.Router();
let initWebRoutes = (app) => {

    //user API 
    router.post("/api/sign-up",userController.signUp)

    router.post("/api/sign-in",userController.signIn)

    router.get("/api/profile",userController.profile)

    router.delete("/api/delete-user",userController.deleteUser)

    //course API 

    router.post("/api/create-course",courseController.createNewCourse)

    router.get("/api/get-course",courseController.getCourse)

    router.delete("/api/delete-course",courseController.deleteCourse)

    //lesson API 

    router.post("/api/create-lesson",lessonController.createLesson)

    router.get("/api/get-lesson",lessonController.getLesson)

    router.delete("/api/delete-lesson",lessonController.deleteLesson)
    

    


    return app.use('/',router);
}
module.exports = initWebRoutes;