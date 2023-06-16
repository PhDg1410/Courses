import db from '../models/index'
import lessonHandler from "../services/lessonHandler"
import jwt from 'jsonwebtoken'
import cookieParser from 'cookie-parser'
import user from '../models/user'
// import logError from "../log/logError"

require("dotenv").config()

//create lesson

let createLesson = async (req,res) => {
    try{
        let lesson = await lessonHandler.createNewLesson(req.body)
        if(lesson){
            res.status(200).json(lesson)
        }
    }catch(e){
        // logError.logger.error(e, { functionName: createLesson.name });
        res.status(500).json({
            "errorCode":6,
            "status":"Internal Server"
        })
    }

}


//create lesson 

let getLesson = async (req,res) => {
    try{
        let lessonid = req.query.id
        let lesson = await lessonHandler.getLessonById(lessonid)
        res.status(200).json(lesson)
    }catch(e){
        // logError.logger.error(e, { functionName: getLesson.name });
        res.status(200).json({
            "errorCode":6,
            "status":"Internal Server"
        })
    }
}

//delete lesson 

let deleteLesson = async(req,res) => {
    try{
        let lessonid = req.body.id
        let isSuccess = await lessonHandler.deleteLessonById(lessonid)
        res.status(200).json(isSuccess)
    }catch(e){
        // logError.logger.error(e, { functionName: deleteLesson.name });
        console.log(e)
        res.status(200).json({
            "errorCode":6,
            "status":"Internal Server"
        })
    }
}




module.exports = {
    createLesson:createLesson,
    getLesson:getLesson,
    deleteLesson:deleteLesson
    
}